import type {
  RawScheduleMatch,
  SportType,
} from '~/server/types/dailyPredictions'
import {
  extractNumericMatchId,
  isUpcomingMatch,
} from '~/server/utils/dailyPredictions/time'

interface KadarioScheduleResponse {
  code: number
  msg?: string
  data?: RawScheduleMatch[]
}

export interface NormalizedScheduleMatch {
  sport: SportType
  matchId: string
  numericId: number
  competition: {
    name: string
    logo: string
  }
  homeTeam: {
    name: string
    logo: string
  }
  awayTeam: {
    name: string
    logo: string
  }
  matchTimeUtc: string
  status: string
}

const DEFAULT_TIMEOUT_MS = 15000

/**
 * Fetches the daily schedule for a sport (football or basketball) in Asia/Manila.
 */
export async function fetchDailySchedule(
  apiBase: string,
  siteCode: string,
  sport: SportType,
  dateStr: string,
): Promise<NormalizedScheduleMatch[]> {
  const url = `${apiBase.replace(/\/+$/, '')}/api/v1/kadario/${sport}/schedule?site=${encodeURIComponent(siteCode)}&date=${encodeURIComponent(dateStr)}&timezone=Asia%2FManila`

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

    const res = await fetch(url, { headers, signal: controller.signal })
      .finally(() => clearTimeout(timeoutId))

    if (!res.ok) {
      console.warn(`[scheduler] Failed to fetch ${sport} schedule: HTTP ${res.status}`)
      return []
    }

    const json = await res.json() as KadarioScheduleResponse
    if (!json || !Array.isArray(json.data)) {
      console.warn(`[scheduler] Invalid ${sport} schedule response format`)
      return []
    }

    const normalized: NormalizedScheduleMatch[] = []
    const seenNumericIds = new Set<number>()

    for (const raw of json.data) {
      if (!raw || !raw.id) continue
      const numericId = extractNumericMatchId(raw.id)
      if (!numericId || seenNumericIds.has(numericId)) continue
      seenNumericIds.add(numericId)

      // Only upcoming matches
      if (!isUpcomingMatch(raw.startTime, raw.status)) continue

      const homeName = raw.home?.name || raw.home?.shortName || 'Home Team'
      const awayName = raw.away?.name || raw.away?.shortName || 'Away Team'
      const compName = raw.competition || 'League'

      normalized.push({
        sport,
        matchId: raw.id,
        numericId,
        competition: {
          name: compName,
          logo: '', // Will be enriched from prediction tools or fallback
        },
        homeTeam: {
          name: homeName,
          logo: raw.home?.logo || '',
        },
        awayTeam: {
          name: awayName,
          logo: raw.away?.logo || '',
        },
        matchTimeUtc: new Date(raw.startTime).toISOString(),
        status: raw.status || 'scheduled',
      })
    }

    return normalized
  } catch (err: any) {
    console.error(`[scheduler] Error fetching ${sport} schedule:`, err?.message || err)
    return []
  }
}
