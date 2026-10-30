import type { Sport, SportsEvent } from '~/types/sports'

// Share cached responses and in-flight requests across server handlers.
const cache = new Map<string, { data: unknown; expiry: number }>()
const pending = new Map<string, Promise<unknown>>()

export function createOddsApi(api: string, apiKey: string) {
  const baseURL = `${api.replace(/\/+$/, '').replace(/\/sports$/, '')}/`
  const bookmakers = 'betrivers,betonlineag'
  

  async function request<T>(path: string, query: Record<string, string> = {}, ttl = 60000): Promise<T> {
    if (!apiKey) throw createError({ statusCode: 503, statusMessage: 'Sports API key is not configured' })
    
    const cacheKey = JSON.stringify([baseURL, apiKey, path, query])
    const cached = cache.get(cacheKey)
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T
    }

    const existing = pending.get(cacheKey)
    if (existing) return existing as Promise<T>
    const promise = (async () => {
      try {
        const data = await $fetch<T>(path, { baseURL, query: { apiKey, ...query }, timeout: 15000, retry: 0 }) as T
        for (const [key, entry] of cache) if (entry.expiry <= Date.now()) cache.delete(key)
        cache.set(cacheKey, { data, expiry: Date.now() + ttl })
        return data
      } catch {
        throw createError({ statusCode: 502, statusMessage: 'Sports data is temporarily unavailable' })
      } finally {
        pending.delete(cacheKey)
      }
    })()
    pending.set(cacheKey, promise)
    return promise
  }

  const upcoming = (range: Record<string, string> = {}) => request<SportsEvent[]>('sports/upcoming/odds', {
    regions: 'us',
    bookmakers,
    markets: 'h2h,spreads,totals',
    oddsFormat: 'decimal',
    ...range,
  }, 5 * 60 * 1000)

  // Cache the full tournament once so every tab and time filter can reuse it.
  const leagueOdds = async (sport: string, range: Record<string, string> = {}) => {
    const events = await request<SportsEvent[]>(`sports/${encodeURIComponent(sport)}/odds/`, {
      regions: 'us', bookmakers,
      markets: /^(soccer|tennis)_/.test(sport) ? 'h2h' : 'h2h,spreads,totals',
      oddsFormat: 'decimal',
    }, 10 * 60 * 1000)
    return events.filter((event: SportsEvent) =>
      (!range.commenceTimeFrom || Date.parse(event.commence_time) >= Date.parse(range.commenceTimeFrom))
      && (!range.commenceTimeTo || Date.parse(event.commence_time) <= Date.parse(range.commenceTimeTo)),
    )
  }

  return {
    sports: () => request<Sport[]>('sports/', {}, 3600000), // Cache sports list for 1 hour
    upcoming,
    leagueOdds,
    odds: async (sport: string, outright = false) => outright
      ? request<SportsEvent[]>(`sports/${encodeURIComponent(sport)}/odds/`, {
        regions: 'us', bookmakers, markets: 'outrights', oddsFormat: 'decimal',
      }, 60000)
      : leagueOdds(sport),
  }
}
