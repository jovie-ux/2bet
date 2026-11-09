export function sportsTimeRange(mode: string, date: string | undefined, hours: string | undefined, now: number) {
  const iso = (value: number) => new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z')
  if (mode === 'upcoming') {
    const duration = hours ? Number.parseInt(hours, 10) : 336
    return { commenceTimeFrom: iso(now), commenceTimeTo: iso(now + duration * 3600000) }
  }
  if (mode === 'prematch') {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
    const [month, day, year] = (date ?? '').split('-')
    const start = Date.parse(`${date ? `${year}-${month}-${day}` : today}T00:00:00+08:00`)
    return { commenceTimeFrom: iso(start), commenceTimeTo: iso(start + (date ? 1 : 7) * 86400000 - 1000) }
  }
  return {}
}
