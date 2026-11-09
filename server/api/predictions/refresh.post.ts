import type { H3Event } from 'h3'
import { runDailyPredictionRefresh } from '~/server/utils/dailyPredictions/refreshService'
import { getManilaDateStr } from '~/server/utils/dailyPredictions/time'

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)
  const body = await readBody(event).catch(() => ({}))

  const token = (query.token || query.secret || getHeader(event, 'x-cron-token') || body?.token) as string | undefined
  const expectedSecret = process.env.PREDICTIONS_CRON_TOKEN || process.env.CRON_SECRET || 'bybet-daily-refresh-2026'

  // If secret configured, verify
  if (expectedSecret && token !== expectedSecret) {
    const isLocal = event.node.req.socket.remoteAddress === '127.0.0.1' || event.node.req.socket.remoteAddress === '::1'
    if (!isLocal) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid cron token',
      })
    }
  }

  const dateStr = typeof body?.date === 'string' && body.date.match(/^\d{4}-\d{2}-\d{2}$/)
    ? body.date
    : (typeof query.date === 'string' && query.date.match(/^\d{4}-\d{2}-\d{2}$/) ? query.date : getManilaDateStr())

  const force = Boolean(body?.force || query.force === 'true')

  const result = await runDailyPredictionRefresh({
    dateStr,
    force,
  })

  return {
    success: result.success,
    date: result.date,
    footballCount: result.footballCount,
    basketballCount: result.basketballCount,
    total: result.total,
    error: result.error,
  }
})
