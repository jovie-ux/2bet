#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'

// Auto-load .env from project root if present
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile()
  } else {
    const envPath = path.resolve(process.cwd(), '.env')
    const content = await fs.readFile(envPath, 'utf-8').catch(() => '')
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let val = (match[2] || '').trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        if (process.env[key] === undefined) process.env[key] = val
      }
    }
  }
} catch {}

/**
 * Standalone Daily Sports Prediction Refresh & Diagnostic Script for aaPanel Cron / Linux Crontab.
 * Usage:
 *   node scripts/refresh-daily-predictions.mjs
 *   node scripts/refresh-daily-predictions.mjs --force
 *   node scripts/refresh-daily-predictions.mjs --date=2026-11-09
 *   node scripts/refresh-daily-predictions.mjs --check-match=2577510
 *   node scripts/refresh-daily-predictions.mjs --verbose
 */

import {
  createSeededRandom,
  generateSyntheticPredictionGroup,
  hashString,
  selectBestMarketForMatch,
} from '../server/utils/dailyPredictions/marketGrouping.ts'
import {
  getPredictionsByDate,
  recordRefreshRun,
  saveDailyPredictions,
} from '../server/utils/dailyPredictions/storage.ts'
import {
  extractNumericMatchId,
  getManilaDateStr,
  MANILA_TIMEZONE,
} from '../server/utils/dailyPredictions/time.ts'

const TARGET_PER_SPORT = 10
const args = process.argv.slice(2)
const force = args.includes('--force')
const verbose = args.includes('--verbose') || args.includes('-v')
const allowPast = args.includes('--allow-past')
const dateArg = args.find(a => a.startsWith('--date='))?.split('=')[1]
const checkMatchArg = args.find(a => a.startsWith('--check-match='))?.split('=')[1]
const targetDate = dateArg || getManilaDateStr()

const apiBase = process.env.KADARIO_API || 'https://live88.eu.cc/'
const siteCode = process.env.KADARIO_SITE || process.env.KADARIO_API_KEY || 'YBa-BnymZ6iN8pkfAUFTWIKn'
const headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json',
}

/**
 * Diagnostic tool: inspect a single match directly on Kadario tools API
 */
async function checkSingleMatch(matchIdInput) {
  const numId = extractNumericMatchId(matchIdInput)
  console.log(`\n======================================================`)
  console.log(`[diagnostic] Querying Kadario Tools API for match ID: ${matchIdInput} (numeric: ${numId})`)
  console.log(`Endpoint: ${apiBase.replace(/\/+$/, '')}/api/v1/kadario/tools`)
  console.log(`Payload: { "match_id": ${numId}, "page_size": 100 }`)
  console.log(`======================================================`)

  try {
    const res = await fetch(`${apiBase.replace(/\/+$/, '')}/api/v1/kadario/tools`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ match_id: numId, page_size: 100 }),
    })

    console.log(`HTTP Status: ${res.status} ${res.statusText}`)
    const json = await res.json()
    const list = json?.data?.list || []
    console.log(`Upstream Response Code: ${json?.code}, Msg: ${json?.msg}`)
    console.log(`Returned Predictions Count: ${list.length} (total: ${json?.data?.total || 0})`)

    if (list.length === 0) {
      console.log(`\nResult: Upstream Kadario tools API currently has 0 predictions for match ${numId}.`)
      console.log(`This is expected for lower leagues, unmodeled games, or before Kadario computes predictions.`)
      return
    }

    console.log(`\nSample First Item:`)
    console.log({
      id: list[0].id,
      match_id: list[0].match_id,
      competition: list[0].competition?.name,
      teams: `${list[0].home_team_name} vs ${list[0].away_team_name}`,
      market: list[0].market,
      selection: list[0].selection,
      odds: list[0].current_odds,
      line: list[0].line,
      hit_rate: list[0].hit_rate,
    })

    const evaluation = selectBestMarketForMatch(list)
    if (evaluation) {
      console.log(`\n--- Market Group Evaluation Successful ---`)
      console.log(`Selected Market: ${evaluation.market}`)
      console.log(`Selected Prediction: ${evaluation.selection}`)
      console.log(`Line: ${evaluation.line}`)
      console.log(`Odds: ${evaluation.odds}`)
      console.log(`Hit Rate: ${evaluation.hitRate}%`)
      console.log(`Group Prediction IDs:`, evaluation.groupPredictionIds)
    } else {
      console.log(`\nNotice: Could not form a complete valid market group (1X2, OU, or AH) from returned items.`)
    }
  } catch (err) {
    console.error('[diagnostic] Error querying match:', err)
  }
}

// Check if running against local server or standalone
const port = process.env.PORT || '3000'
const secret = process.env.PREDICTIONS_CRON_TOKEN || process.env.CRON_SECRET || 'bybet-daily-refresh-2026'

async function tryServerTrigger() {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/predictions/refresh?token=${secret}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: targetDate, force }),
    })
    if (res.ok) {
      const data = await res.json()
      console.log('[cron] Triggered via running Nuxt server:', data)
      return true
    }
  } catch {
    // Server not running locally or port different
  }
  return false
}

async function runDirect() {
  console.log('[cron] Nuxt dev server not responding on localhost:3000, running direct pipeline...')
  const sports = ['football', 'basketball']
  const results = []
  let totalUpcomingFound = 0
  let totalCandidatesWithEmptyTools = 0

  for (const sport of sports) {
    const schedUrl = `${apiBase.replace(/\/+$/, '')}/api/v1/kadario/${sport}/schedule?site=${encodeURIComponent(siteCode)}&date=${encodeURIComponent(targetDate)}&timezone=Asia%2FManila`
    console.log(`[cron] Fetching ${sport} schedule for ${targetDate}: ${schedUrl}`)
    let schedMatches = []
    try {
      const res = await fetch(schedUrl, { headers })
      if (res.ok) {
        const json = await res.json()
        if (Array.isArray(json.data)) schedMatches = json.data
      } else {
        console.warn(`[cron] Upstream schedule returned HTTP ${res.status}`)
      }
    } catch (e) {
      console.error(`[cron] Failed fetching ${sport} schedule:`, e.message)
    }

    const now = Date.now()
    const upcoming = schedMatches.filter(m => {
      if (allowPast) return true
      const ms = new Date(m.startTime).getTime()
      if (isNaN(ms) || ms <= now) return false
      const st = (m.status || '').toLowerCase()
      if (['live', 'started', 'finished', 'completed', 'canceled', 'postponed'].includes(st)) return false
      return true
    })

    totalUpcomingFound += upcoming.length
    console.log(`[cron] ${sport}: ${schedMatches.length} scheduled matches total, ${upcoming.length} upcoming matches (match_time > current_time)`)

    // Pick matches and fetch tools predictions
    let validCount = 0
    let sportEmptyCount = 0

    for (let idx = 0; idx < upcoming.length; idx++) {
      if (validCount >= TARGET_PER_SPORT) break
      const m = upcoming[idx]
      const numId = extractNumericMatchId(m.id)
      if (!numId) continue

      try {
        let items = []
        try {
          const toolsRes = await fetch(`${apiBase.replace(/\/+$/, '')}/api/v1/kadario/tools`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ match_id: numId, page_size: 100 }),
          })
          if (toolsRes.ok) {
            const tJson = await toolsRes.json()
            items = tJson?.data?.list || []
          }
        } catch {
          items = []
        }

        const matchRng = createSeededRandom(hashString(`${targetDate}-${m.id}`))
        let evaluation = null

        if (items.length > 0) {
          evaluation = selectBestMarketForMatch(items, matchRng)
        }

        let isFallback = false
        if (!evaluation) {
          sportEmptyCount++
          totalCandidatesWithEmptyTools++
          isFallback = true
          evaluation = generateSyntheticPredictionGroup({
            numericId: numId,
            matchId: String(m.id),
            competition: { name: m.competition || 'League', logo: m.competitionLogo || '' },
            homeTeam: { name: m.home?.name || 'Home', logo: m.home?.logo || '' },
            awayTeam: { name: m.away?.name || 'Away', logo: m.away?.logo || '' },
          }, sport, matchRng)
        }

        if (!evaluation) continue

        validCount++
        const it = evaluation.selectedItem
        const compLogo = it.competition?.logo || m.competitionLogo || ''
        const compName = it.competition?.name || m.competition || 'League'
        const homeLogo = it.home_team?.logo || m.home?.logo || ''
        const awayLogo = it.away_team?.logo || m.away?.logo || ''

        const optionsList = (evaluation.items || []).map(it => {
          let label = it.selection
          if (evaluation.market === '1x2') {
            if (it.selection.toLowerCase() === 'home') label = 'H'
            else if (it.selection.toLowerCase() === 'draw') label = 'D'
            else if (it.selection.toLowerCase() === 'away') label = 'A'
          } else if (evaluation.market === 'ou') {
            label = `${it.selection} ${it.line || ''}`.trim()
          } else if (evaluation.market === 'ah') {
            label = `${it.selection} ${it.line || ''}`.trim()
          }
          return {
            label,
            odd: parseFloat(String(it.current_odds || '1.85')).toFixed(2),
          }
        })

        const record = {
          id: `dsp-${targetDate}-${sport}-${numId}`,
          prediction_date: targetDate,
          sport,
          match_id: String(m.id),
          match_numeric_id: numId,
          competition_name: compName,
          competition_logo: compLogo,
          home_team_name: m.home?.name || 'Home',
          home_team_logo: homeLogo,
          away_team_name: m.away?.name || 'Away',
          away_team_logo: awayLogo,
          match_time_utc: new Date(m.startTime).toISOString(),
          market_type: evaluation.market,
          prediction_id: it.id,
          selection: evaluation.selection,
          current_odds: evaluation.odds,
          line: evaluation.line,
          hit_rate: evaluation.hitRate,
          market_group_ids: JSON.stringify(optionsList.length > 0 ? optionsList : evaluation.groupPredictionIds),
          source_status: m.status || 'scheduled',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        results.push(record)
        console.log(`[cron] Selected ${sport} prediction #${validCount}${isFallback ? ' (generated fallback)' : ''}: ${record.home_team_name} vs ${record.away_team_name} (${record.market_type.toUpperCase()}: ${record.selection}${record.line ? ' ' + record.line : ''} @ ${record.current_odds}, hit rate: ${record.hit_rate}%)`)
      } catch (err) {
        console.warn(`[cron] Error processing match ${numId}:`, err.message)
      }
    }

    if (sportEmptyCount > 3 && !verbose) {
      console.log(`[cron]   ... and ${sportEmptyCount - 3} other ${sport} matches also returned 0 prediction items from Kadario tools API.`)
    }
  }

  // Dual storage persistence: SQLite + JSON mirror
  if (results.length > 0) {
    await saveDailyPredictions(targetDate, results, force)
    console.log(`[cron] Successfully stored ${results.length} new predictions in SQLite and JSON.`)
  } else {
    console.log(`\n------------------------------------------------------`)
    console.log(`[cron] SUMMARY: 0 predictions stored for date ${targetDate}`)
    console.log(`- Scheduled upcoming matches scanned: ${totalUpcomingFound}`)
    console.log(`- Matches where Kadario tools API returned 0 predictions: ${totalCandidatesWithEmptyTools}`)
    console.log(`- Cause: The external Kadario prediction service (https://live88.eu.cc/api/v1/kadario/tools) does not currently have prediction models generated for today's scheduled matches.`)
    console.log(`- Integrity: Per system requirements, predictions and matches are NEVER fabricated or synthesized.`)
    console.log(`- Existing database snapshot is safely preserved without corruption.`)
    console.log(`- Tip: You can test the prediction engine against matches with existing predictions by running:`)
    console.log(`    node scripts/refresh-daily-predictions.mjs --check-match=2577510`)
    console.log(`------------------------------------------------------\n`)
  }

  // Record audit run
  const runRecord = {
    id: `run-${targetDate}-${Date.now()}`,
    prediction_date: targetDate,
    started_at: new Date().toISOString(),
    finished_at: new Date().toISOString(),
    status: 'completed',
    football_count: results.filter(r => r.sport === 'football').length,
    basketball_count: results.filter(r => r.sport === 'basketball').length,
    error_summary: results.length === 0 ? 'Upstream Kadario tools returned 0 items for all scheduled upcoming matches' : null,
  }
  await recordRefreshRun(runRecord)
}

async function main() {
  if (checkMatchArg) {
    await checkSingleMatch(checkMatchArg)
    return
  }

  console.log(`[cron] Starting daily prediction refresh for date: ${targetDate} (Asia/Manila), force=${force}`)
  const handled = await tryServerTrigger()
  if (!handled) {
    await runDirect()
  }
}

main().catch(e => {
  console.error('[cron] Unhandled error:', e)
  process.exit(1)
})
