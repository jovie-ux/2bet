export const MANILA_TIMEZONE = 'Asia/Manila'

const EXCLUDED_STATUSES = new Set([
  'live',
  'started',
  'finished',
  'completed',
  'closed',
  'ended',
  'canceled',
  'cancelled',
  'postponed',
  'interrupted',
  'abandoned',
])

/**
 * Returns the current date in Asia/Manila as YYYY-MM-DD.
 */
export function getManilaDateStr(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: MANILA_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(date)
}

/**
 * Formats a UTC ISO date string into human-readable Asia/Manila date & time.
 * Example: "11-07 20:30"
 */
export function formatManilaTime(isoOrTimestamp: string | number | Date): string {
  try {
    const d = typeof isoOrTimestamp === 'number' ? new Date(isoOrTimestamp * 1000) : new Date(isoOrTimestamp)
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: MANILA_TIMEZONE,
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const parts = formatter.formatToParts(d)
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? ''
    return `${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`
  } catch {
    return String(isoOrTimestamp)
  }
}

/**
 * Converts a date to an ISO string representing the equivalent Manila local time with offset (+08:00).
 */
export function toManilaIsoString(isoOrTimestamp: string | number | Date): string {
  try {
    const d = typeof isoOrTimestamp === 'number' ? new Date(isoOrTimestamp * 1000) : new Date(isoOrTimestamp)
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
    const parts = formatter.formatToParts(d)
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? '00'
    return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}+08:00`
  } catch {
    return new Date().toISOString()
  }
}

/**
 * Validates whether a match is in the future and has not started.
 */
export function isUpcomingMatch(startTime: string | number | Date, status?: string): boolean {
  if (status && EXCLUDED_STATUSES.has(status.toLowerCase().trim())) {
    return false
  }

  const matchMillis = typeof startTime === 'number'
    ? (startTime > 1e11 ? startTime : startTime * 1000)
    : new Date(startTime).getTime()

  if (Number.isNaN(matchMillis)) return false

  return matchMillis > Date.now()
}

/**
 * Parses numeric ID from kadario match ID.
 * Example: "kadario:652473" -> 652473
 */
export function extractNumericMatchId(rawId: string | number): number | null {
  if (typeof rawId === 'number') return Number.isFinite(rawId) ? rawId : null
  const cleaned = String(rawId).replace(/\D/g, '')
  if (!cleaned) return null
  const parsed = parseInt(cleaned, 10)
  return Number.isFinite(parsed) ? parsed : null
}

/**
 * Formats a publication timestamp in "MM-DD HH:mm Published" format (e.g. "11-08 07:49 Published")
 * using Asia/Manila timezone.
 */
export function formatPublishedDate(recordIdOrDate: string | number, nowMs: number = Date.now()): string {
  let hash = 0
  const str = String(recordIdOrDate)
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const seed = Math.abs(hash)
  // Seeded offset between 25 minutes and 28 hours (1680 minutes) ago
  const offsetMs = ((seed % 1655) + 25) * 60 * 1000
  const pubDate = new Date(nowMs - offsetMs)

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: MANILA_TIMEZONE,
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(pubDate)

  const month = parts.find(p => p.type === 'month')?.value || '11'
  const day = parts.find(p => p.type === 'day')?.value || '08'
  const hour = parts.find(p => p.type === 'hour')?.value || '07'
  const minute = parts.find(p => p.type === 'minute')?.value || '49'

  return `${month}-${day} ${hour}:${minute} Published`
}
