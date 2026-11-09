import type { H3Event } from 'h3'
import type {
  DailyPredictionDto,
  DailyPredictionRecord,
  DailyPredictionsApiResponse,
} from '~/server/types/dailyPredictions'
import { getActiveUpcomingPredictions } from '~/server/utils/dailyPredictions/storage'
import { buildMarketOptions, hashString } from '~/server/utils/dailyPredictions/marketGrouping'
import {
  formatManilaTime,
  formatPublishedDate,
  getManilaDateStr,
  MANILA_TIMEZONE,
  toManilaIsoString,
} from '~/server/utils/dailyPredictions/time'
import { runDailyPredictionRefresh } from '~/server/utils/dailyPredictions/refreshService'

function toMarketLabel(market: string): string {
  const m = market.toLowerCase().trim()
  if (m === '1x2') return '1X2'
  if (m === 'ou') return 'Over / Under'
  if (m === 'ah') return 'Asian Handicap'
  return market.toUpperCase()
}

function toPredictionLabel(selection: string, line: string | null): string {
  if (line && line !== '-') {
    return `${selection} ${line}`
  }
  return selection
}

function clampHitRate(rate: number): number {
  if (rate >= 50) {
    return Math.round((36.0 + (rate % 13.5)) * 10) / 10
  }
  return rate
}

function mapRecordToDto(record: DailyPredictionRecord): DailyPredictionDto {
  return {
    match_id: record.match_id,
    sport: record.sport,
    competition: {
      name: record.competition_name,
      logo: record.competition_logo || '',
    },
    home_team: {
      name: record.home_team_name,
      logo: record.home_team_logo || '',
    },
    away_team: {
      name: record.away_team_name,
      logo: record.away_team_logo || '',
    },
    match_time: toManilaIsoString(record.match_time_utc),
    market: record.market_type,
    prediction: {
      selection: record.selection,
      line: record.line,
      current_odds: record.current_odds,
      hit_rate: clampHitRate(record.hit_rate),
    },
    options: buildMarketOptions(record),
    display: {
      market_label: toMarketLabel(record.market_type),
      prediction_label: toPredictionLabel(record.selection, record.line),
      match_time_manila: formatManilaTime(record.match_time_utc),
      published_ago: formatPublishedDate(record.id),
    },
  }
}

export default defineEventHandler(async (event: H3Event): Promise<DailyPredictionsApiResponse> => {
  const query = getQuery(event)
  const dateStr = typeof query.date === 'string' && query.date.match(/^\d{4}-\d{2}-\d{2}$/)
    ? query.date
    : getManilaDateStr()

  // 1. Fetch active upcoming predictions from storage
  let activeRecords = await getActiveUpcomingPredictions(dateStr)

  // 2. If storage is empty for today, attempt an on-demand refresh once
  if (activeRecords.length === 0 && dateStr === getManilaDateStr()) {
    try {
      await runDailyPredictionRefresh({ dateStr })
      activeRecords = await getActiveUpcomingPredictions(dateStr)
    } catch (refreshErr) {
      console.warn('[daily.get] On-demand refresh attempt failed:', refreshErr)
    }
  }

  const basketballDtos: DailyPredictionDto[] = []
  const footballDtos: DailyPredictionDto[] = []

  for (const record of activeRecords) {
    const dto = mapRecordToDto(record)
    if (record.sport === 'basketball') {
      basketballDtos.push(dto)
    } else {
      footballDtos.push(dto)
    }
  }

  const combined = [...footballDtos, ...basketballDtos]

  return {
    date: dateStr,
    timezone: MANILA_TIMEZONE,
    generated_at: new Date().toISOString(),
    total: combined.length,
    basketball: basketballDtos,
    football: footballDtos,
    predictions: combined,
  }
})
