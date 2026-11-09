import type { H3Event } from 'h3'
import { EXPERT_PREDICTORS, type Prediction, type PredictionOption, type PredictionsResponse } from '~/data/predictions'
import { getActiveUpcomingPredictions } from '~/server/utils/dailyPredictions/storage'
import { runDailyPredictionRefresh } from '~/server/utils/dailyPredictions/refreshService'
import { hashString } from '~/server/utils/dailyPredictions/marketGrouping'
import type { DailyPredictionRecord } from '~/server/types/dailyPredictions'
import {
  formatManilaTime,
  formatPublishedDate,
  getManilaDateStr,
  toManilaIsoString,
} from '~/server/utils/dailyPredictions/time'

function toMarketLabel(market: string): '1X2' | 'Over / Under' | 'Handicap' {
  const m = market.toLowerCase().trim()
  if (m === '1x2') return '1X2'
  if (m === 'ou') return 'Over / Under'
  return 'Handicap'
}

function clampHitRate(rate: number): number {
  if (rate >= 50) {
    return Math.round((36.0 + (rate % 13.5)) * 10) / 10
  }
  return rate
}

export function buildMarketOptions(record: DailyPredictionRecord): PredictionOption[] {
  // 1. Try parsing pre-stored options from market_group_ids
  if (record.market_group_ids) {
    try {
      const parsed = JSON.parse(record.market_group_ids)
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (typeof parsed[0] === 'object' && parsed[0] !== null && parsed[0].label && parsed[0].odd) {
          return parsed.map((item: any) => ({
            label: String(item.label),
            odd: typeof item.odd === 'number' ? item.odd.toFixed(2) : String(item.odd),
          }))
        }
      }
    } catch {}
  }

  const mkt = (record.market_type || '').toLowerCase().trim()
  const sel = (record.selection || '').trim()
  const baseOdd = record.current_odds || 1.85
  const line = record.line && record.line !== '-' ? record.line : null
  const seed = Math.abs(hashString(record.id))

  // 2. Handicap (AH): Both Home and Away should have data
  if (mkt === 'ah') {
    const rawLine = line ? line.replace('+', '') : '-1.5'
    const numLine = parseFloat(rawLine) || 1.5
    const absLine = Math.abs(numLine)

    let homeLineStr = `-${absLine}`
    let awayLineStr = `+${absLine}`

    if (line) {
      if (sel.toLowerCase() === 'home') {
        homeLineStr = line.startsWith('+') || line.startsWith('-') ? line : (numLine > 0 ? `+${numLine}` : `${numLine}`)
        awayLineStr = homeLineStr.startsWith('-') ? `+${absLine}` : `-${absLine}`
      } else {
        awayLineStr = line.startsWith('+') || line.startsWith('-') ? line : (numLine > 0 ? `+${numLine}` : `${numLine}`)
        homeLineStr = awayLineStr.startsWith('-') ? `+${absLine}` : `-${absLine}`
      }
    }

    const counterOdd = Math.round((3.80 - baseOdd + ((seed % 15) - 7) / 100) * 100) / 100
    const safeCounterOdd = Math.max(1.50, Math.min(2.55, counterOdd))

    const isHomePick = sel.toLowerCase() === 'home'
    const homeOdd = isHomePick ? baseOdd : safeCounterOdd
    const awayOdd = isHomePick ? safeCounterOdd : baseOdd

    return [
      { label: `Home ${homeLineStr}`, odd: homeOdd.toFixed(2) },
      { label: `Away ${awayLineStr}`, odd: awayOdd.toFixed(2) },
    ]
  }

  // 3. Over / Under (OU): Both Over and Under should have data
  if (mkt === 'ou') {
    const defaultLine = record.sport === 'basketball' ? '194.5' : '2.5'
    const ouLine = line || defaultLine
    const counterOdd = Math.round((3.75 - baseOdd + ((seed % 15) - 7) / 100) * 100) / 100
    const safeCounterOdd = Math.max(1.50, Math.min(2.50, counterOdd))

    const isOverPick = sel.toLowerCase() === 'over'
    const overOdd = isOverPick ? baseOdd : safeCounterOdd
    const underOdd = isOverPick ? safeCounterOdd : baseOdd

    return [
      { label: `Over ${ouLine}`, odd: overOdd.toFixed(2) },
      { label: `Under ${ouLine}`, odd: underOdd.toFixed(2) },
    ]
  }

  // 4. 1X2: Must show H, D, A odds
  let homeOdd = 1.95
  let drawOdd = 3.40
  let awayOdd = 3.80
  const drawBase = Math.round((3.20 + (seed % 40) / 100) * 100) / 100

  if (sel.toLowerCase() === 'home') {
    homeOdd = baseOdd
    drawOdd = drawBase
    const awayCalculated = Math.round((1 / Math.max(0.05, 1 - (1 / homeOdd) - (1 / drawOdd)) * 0.95) * 100) / 100
    awayOdd = Math.max(1.80, Math.min(6.50, awayCalculated))
  } else if (sel.toLowerCase() === 'away') {
    awayOdd = baseOdd
    drawOdd = drawBase
    const homeCalculated = Math.round((1 / Math.max(0.05, 1 - (1 / awayOdd) - (1 / drawOdd)) * 0.95) * 100) / 100
    homeOdd = Math.max(1.80, Math.min(6.50, homeCalculated))
  } else {
    // Draw pick
    drawOdd = baseOdd
    homeOdd = Math.round((2.35 + (seed % 30) / 100) * 100) / 100
    awayOdd = Math.round((2.75 + (seed % 40) / 100) * 100) / 100
  }

  return [
    { label: 'H', odd: homeOdd.toFixed(2) },
    { label: 'D', odd: drawOdd.toFixed(2) },
    { label: 'A', odd: awayOdd.toFixed(2) },
  ]
}

export default defineEventHandler(async (event: H3Event): Promise<PredictionsResponse> => {
  const today = getManilaDateStr()
  let records = await getActiveUpcomingPredictions(today)

  if (records.length === 0) {
    try {
      await runDailyPredictionRefresh({ dateStr: today })
      records = await getActiveUpcomingPredictions(today)
    } catch (err) {
      console.warn('[predictions.get] Refresh attempt error:', err)
    }
  }

  const predictions: Prediction[] = records.map((record, index) => {
    const predictor = EXPERT_PREDICTORS[index % EXPERT_PREDICTORS.length]

    return {
      id: record.id,
      matchId: record.match_id,
      predictorId: predictor.id,
      predictorName: predictor.predictorName,
      predictorAvatar: predictor.predictorAvatar,
      publishedAgo: formatPublishedDate(record.id),
      hitRate: clampHitRate(record.hit_rate),
      winStreak: predictor.winStreak || `${Math.max(3, Math.floor(clampHitRate(record.hit_rate) / 12))} Wins`,
      marketType: toMarketLabel(record.market_type),
      sport: record.sport === 'football' ? 'soccer' : 'basketball',
      league: record.competition_name,
      competitionLogo: record.competition_logo || '',
      matchTime: formatManilaTime(record.match_time_utc),
      matchTimeUtc: record.match_time_utc,
      homeTeam: record.home_team_name,
      homeTeamLogo: record.home_team_logo || '',
      awayTeam: record.away_team_name,
      awayTeamLogo: record.away_team_logo || '',
      selection: record.selection,
      line: record.line,
      currentOdds: record.current_odds,
      options: buildMarketOptions(record),
    }
  })

  const now = new Date()
  const commenceTimeFrom = toManilaIsoString(now)
  const commenceTimeTo = toManilaIsoString(new Date(now.getTime() + 24 * 60 * 60 * 1000))

  return {
    predictions,
    commenceTimeFrom,
    commenceTimeTo,
  }
})
