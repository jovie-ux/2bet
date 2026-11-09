import type {
  DailyPredictionRecord,
  PredictionRefreshRun,
  SportType,
} from '~/server/types/dailyPredictions'
import {
  createSeededRandom,
  generateSyntheticPredictionGroup,
  hashString,
  selectBestMarketForMatch,
} from '~/server/utils/dailyPredictions/marketGrouping'
import { fetchDailySchedule, type NormalizedScheduleMatch } from '~/server/utils/dailyPredictions/scheduler'
import { fetchKadarioPredictionsForMatch } from '~/server/utils/dailyPredictions/kadarioTools'
import {
  getPredictionsByDate,
  recordRefreshRun,
  saveDailyPredictions,
} from '~/server/utils/dailyPredictions/storage'
import { getManilaDateStr } from '~/server/utils/dailyPredictions/time'

const TARGET_PER_SPORT = 10
let isRefreshInProgress = false

export interface RefreshResult {
  success: boolean
  date: string
  footballCount: number
  basketballCount: number
  total: number
  error?: string
}

/**
 * Shuffles an array deterministically using a seeded PRNG.
 */
function seededShuffle<T>(array: T[], seedStr: string): T[] {
  const result = [...array]
  const rng = createSeededRandom(hashString(seedStr))
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

/**
 * Executes the daily prediction refresh workflow for a specified date (defaults to today in Manila).
 */
export async function runDailyPredictionRefresh(options?: {
  dateStr?: string
  force?: boolean
  apiBase?: string
  siteCode?: string
}): Promise<RefreshResult> {
  if (isRefreshInProgress) {
    return {
      success: false,
      date: options?.dateStr || getManilaDateStr(),
      footballCount: 0,
      basketballCount: 0,
      total: 0,
      error: 'Refresh already in progress',
    }
  }

  isRefreshInProgress = true
  const dateStr = options?.dateStr || getManilaDateStr()
  const startedAt = new Date().toISOString()
  const runId = `run-${dateStr}-${Date.now()}`

  const runRecord: PredictionRefreshRun = {
    id: runId,
    prediction_date: dateStr,
    started_at: startedAt,
    finished_at: null,
    status: 'running',
    football_count: 0,
    basketball_count: 0,
    error_summary: null,
  }

  await recordRefreshRun(runRecord)

  try {
    const config = useRuntimeConfig()
    const apiBase = options?.apiBase || String(config.kadarioApi || 'https://live88.eu.cc/')
    const siteCode = options?.siteCode || String(config.kadarioSite || 'YBa-BnymZ6iN8pkfAUFTWIKn')

    // 1. Check existing stored predictions for today
    const existing = await getPredictionsByDate(dateStr)
    const existingMap = new Map<string, DailyPredictionRecord>()
    for (const p of existing) {
      existingMap.set(p.match_id, p)
    }

    const existingFootball = existing.filter(p => p.sport === 'football')
    const existingBasketball = existing.filter(p => p.sport === 'basketball')

    // If not forcing and both sports already have 10 valid predictions, return current snapshot
    if (!options?.force && existingFootball.length >= TARGET_PER_SPORT && existingBasketball.length >= TARGET_PER_SPORT) {
      runRecord.finished_at = new Date().toISOString()
      runRecord.status = 'completed'
      runRecord.football_count = existingFootball.length
      runRecord.basketball_count = existingBasketball.length
      await recordRefreshRun(runRecord)
      isRefreshInProgress = false
      return {
        success: true,
        date: dateStr,
        footballCount: existingFootball.length,
        basketballCount: existingBasketball.length,
        total: existingFootball.length + existingBasketball.length,
      }
    }

    // 2. Fetch schedules for Football & Basketball
    const [rawFootballSchedule, rawBasketballSchedule] = await Promise.all([
      fetchDailySchedule(apiBase, siteCode, 'football', dateStr),
      fetchDailySchedule(apiBase, siteCode, 'basketball', dateStr),
    ])

    const sportsToProcess: Array<{ sport: SportType; schedule: NormalizedScheduleMatch[]; existing: DailyPredictionRecord[] }> = [
      { sport: 'football', schedule: rawFootballSchedule, existing: existingFootball },
      { sport: 'basketball', schedule: rawBasketballSchedule, existing: existingBasketball },
    ]

    const newRecordsToSave: DailyPredictionRecord[] = []

    for (const { sport, schedule, existing: sportExisting } of sportsToProcess) {
      // Retain already selected matches for the day unless forced
      const selectedMatches: DailyPredictionRecord[] = options?.force ? [] : [...sportExisting]
      const selectedIds = new Set(selectedMatches.map(m => m.match_id))

      if (selectedMatches.length >= TARGET_PER_SPORT) {
        continue
      }

      // Randomize eligible schedule matches deterministically by date + sport
      const eligiblePool = schedule.filter(m => !selectedIds.has(m.matchId))
      const shuffled = seededShuffle(eligiblePool, `${dateStr}-${sport}`)

      // Traverse candidates until 10 valid predictions or pool exhausted
      for (const candidate of shuffled) {
        if (selectedMatches.length >= TARGET_PER_SPORT) break

        try {
          let rawItems: any[] = []
          try {
            rawItems = await fetchKadarioPredictionsForMatch(apiBase, candidate.numericId)
          } catch {
            rawItems = []
          }

          // Seed random market choice per match
          const matchRng = createSeededRandom(hashString(`${dateStr}-${candidate.matchId}`))
          let bestGroup = null

          if (rawItems && rawItems.length > 0) {
            bestGroup = selectBestMarketForMatch(rawItems, matchRng)
          }

          // If upstream returns 0 predictions or no valid market group, generate fallback prediction
          if (!bestGroup) {
            bestGroup = generateSyntheticPredictionGroup(candidate, sport, matchRng)
          }

          if (!bestGroup) continue

          const nowIso = new Date().toISOString()

          // Enrich logos or league if available from tools items
          const compLogo = bestGroup.selectedItem.competition?.logo || candidate.competition.logo || ''
          const compName = bestGroup.selectedItem.competition?.name || candidate.competition.name || ''
          const homeLogo = bestGroup.selectedItem.home_team?.logo || candidate.homeTeam.logo || ''
          const awayLogo = bestGroup.selectedItem.away_team?.logo || candidate.awayTeam.logo || ''

          const optionsList = (bestGroup.items || []).map(it => {
            let label = it.selection
            if (bestGroup.market === '1x2') {
              if (it.selection.toLowerCase() === 'home') label = 'H'
              else if (it.selection.toLowerCase() === 'draw') label = 'D'
              else if (it.selection.toLowerCase() === 'away') label = 'A'
            } else if (bestGroup.market === 'ou') {
              label = `${it.selection} ${it.line || ''}`.trim()
            } else if (bestGroup.market === 'ah') {
              label = `${it.selection} ${it.line || ''}`.trim()
            }
            return {
              label,
              odd: parseFloat(String(it.current_odds || '1.85')).toFixed(2),
            }
          })

          const record: DailyPredictionRecord = {
            id: `dsp-${dateStr}-${sport}-${candidate.numericId}`,
            prediction_date: dateStr,
            sport,
            match_id: candidate.matchId,
            match_numeric_id: candidate.numericId,
            competition_name: compName,
            competition_logo: compLogo,
            home_team_name: candidate.homeTeam.name,
            home_team_logo: homeLogo,
            away_team_name: candidate.awayTeam.name,
            away_team_logo: awayLogo,
            match_time_utc: candidate.matchTimeUtc,
            market_type: bestGroup.market,
            prediction_id: bestGroup.selectedItem.id,
            selection: bestGroup.selection,
            current_odds: bestGroup.odds,
            line: bestGroup.line,
            hit_rate: bestGroup.hitRate,
            market_group_ids: JSON.stringify(optionsList.length > 0 ? optionsList : bestGroup.groupPredictionIds),
            source_status: candidate.status,
            created_at: nowIso,
            updated_at: nowIso,
          }

          selectedMatches.push(record)
          newRecordsToSave.push(record)
          selectedIds.add(candidate.matchId)
        } catch (matchErr) {
          console.warn(`[refreshService] Error processing match ${candidate.matchId}:`, matchErr)
        }
      }
    }

    // 3. Atomically save newly found daily predictions
    if (newRecordsToSave.length > 0) {
      await saveDailyPredictions(dateStr, newRecordsToSave, !!options?.force)
    }

    // 4. Calculate final totals for today
    const finalStored = await getPredictionsByDate(dateStr)
    const finalFootballCount = finalStored.filter(p => p.sport === 'football').length
    const finalBasketballCount = finalStored.filter(p => p.sport === 'basketball').length

    const isPartial = finalFootballCount < TARGET_PER_SPORT || finalBasketballCount < TARGET_PER_SPORT
    runRecord.finished_at = new Date().toISOString()
    runRecord.status = isPartial ? 'partial' : 'completed'
    runRecord.football_count = finalFootballCount
    runRecord.basketball_count = finalBasketballCount
    runRecord.error_summary = isPartial
      ? `Completed with partial matches: ${finalFootballCount} football, ${finalBasketballCount} basketball.`
      : null

    await recordRefreshRun(runRecord)
    isRefreshInProgress = false

    return {
      success: true,
      date: dateStr,
      footballCount: finalFootballCount,
      basketballCount: finalBasketballCount,
      total: finalFootballCount + finalBasketballCount,
      error: runRecord.error_summary || undefined,
    }
  } catch (err: any) {
    console.error('[refreshService] Refresh job failed:', err)
    runRecord.finished_at = new Date().toISOString()
    runRecord.status = 'failed'
    runRecord.error_summary = err?.message || String(err)
    await recordRefreshRun(runRecord)
    isRefreshInProgress = false

    return {
      success: false,
      date: dateStr,
      footballCount: 0,
      basketballCount: 0,
      total: 0,
      error: err?.message || String(err),
    }
  }
}
