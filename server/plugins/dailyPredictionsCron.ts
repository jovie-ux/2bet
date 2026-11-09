import { runDailyPredictionRefresh } from '~/server/utils/dailyPredictions/refreshService'
import { getPredictionsByDate } from '~/server/utils/dailyPredictions/storage'
import { getManilaDateStr, MANILA_TIMEZONE } from '~/server/utils/dailyPredictions/time'

/**
 * Calculates milliseconds until next 00:05:00 in Asia/Manila timezone.
 */
function getMillisUntilNextManila0005(): number {
  const now = new Date()
  // Current date parts in Manila
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: MANILA_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '0'

  const year = parseInt(get('year'), 10)
  const month = parseInt(get('month'), 10)
  const day = parseInt(get('day'), 10)
  const hour = parseInt(get('hour'), 10)
  const minute = parseInt(get('minute'), 10)

  // Target today 00:05 or tomorrow 00:05
  let targetDay = day
  if (hour > 0 || (hour === 0 && minute >= 5)) {
    targetDay += 1
  }

  // Target time in Manila UTC representation (+08:00)
  const targetUtcMs = Date.UTC(year, month - 1, targetDay, 0, 5, 0) - (8 * 60 * 60 * 1000)
  const diff = targetUtcMs - now.getTime()
  return diff > 0 ? diff : 24 * 60 * 60 * 1000
}

export default defineNitroPlugin(() => {
  // 1. Initial background check on server start (delayed slightly so server finishes binding)
  setTimeout(async () => {
    try {
      const today = getManilaDateStr()
      const existing = await getPredictionsByDate(today)
      if (existing.length === 0) {
        console.log(`[dailyPredictionsCron] No predictions found for today (${today}), triggering initial refresh...`)
        const res = await runDailyPredictionRefresh({ dateStr: today })
        console.log(`[dailyPredictionsCron] Initial refresh result:`, res)
      } else {
        console.log(`[dailyPredictionsCron] Existing predictions found for ${today}: ${existing.length} records.`)
      }
    } catch (err) {
      console.warn('[dailyPredictionsCron] Startup check error:', err)
    }
  }, 3000)

  // 2. Schedule recurring timer for 00:05 Asia/Manila
  function scheduleNextDailyRun() {
    const delay = getMillisUntilNextManila0005()
    const hours = (delay / 3600000).toFixed(2)
    console.log(`[dailyPredictionsCron] Next scheduled daily refresh in ${hours} hours (at 00:05 Asia/Manila).`)

    setTimeout(async () => {
      try {
        const today = getManilaDateStr()
        console.log(`[dailyPredictionsCron] Running scheduled daily refresh for ${today}...`)
        const res = await runDailyPredictionRefresh({ dateStr: today, force: true })
        console.log(`[dailyPredictionsCron] Scheduled refresh complete:`, res)
      } catch (err) {
        console.error('[dailyPredictionsCron] Scheduled refresh failed:', err)
      } finally {
        scheduleNextDailyRun()
      }
    }, delay)
  }

  scheduleNextDailyRun()
})
