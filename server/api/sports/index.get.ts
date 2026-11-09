import type { H3Event } from 'h3'
import { getLiveInplayEvents } from '~/server/utils/kadarioApi'
import { createOddsApi } from '~/server/utils/oddsApi'
import type { Sport, SportsEvent } from '~/types/sports'
import { getSampleSportsData } from '~/data/sports'

export default defineEventHandler(async (event: H3Event): Promise<{ sports: Sport[]; events: SportsEvent[] }> => {
  const query = getQuery(event)
  const mode = typeof query.mode === 'string' ? query.mode : 'league'
  const sport = typeof query.sport === 'string' ? query.sport : ''
  const requestedSports = typeof query.sports === 'string'
    ? [...new Set(query.sports.split(',').filter(Boolean))] : undefined
  const multipleLeagues = ['upcoming', 'prematch'].includes(mode) && requestedSports !== undefined
  const range: Record<string, string> = {}
  for (const key of ['commenceTimeFrom', 'commenceTimeTo']) {
    if (query[key] == null) continue
    const value = query[key]
    if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid match time range' })
    }
    range[key] = new Date(value).toISOString().replace(/\.\d{3}Z$/, 'Z')
  }
  if (range.commenceTimeFrom && range.commenceTimeTo && range.commenceTimeFrom > range.commenceTimeTo) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid match time range' })
  }
  const inRange = (match: SportsEvent) => (!range.commenceTimeFrom || Date.parse(match.commence_time) >= Date.parse(range.commenceTimeFrom))
    && (!range.commenceTimeTo || Date.parse(match.commence_time) <= Date.parse(range.commenceTimeTo))
  const config = useRuntimeConfig(event)
  if (String(config.useOddsApi) !== 'true') {
    if (multipleLeagues) {
      return { sports: [], events: requestedSports!.flatMap(key => getSampleSportsData({ mode, sport: key }).events).filter(inRange) }
    }
    const sample = getSampleSportsData({ mode, sport })
    return { ...sample, events: sample.events.filter(inRange) }
  }

  if (mode === 'inplay') {
    const kadarioEvents = await getLiveInplayEvents(config.kadarioApi, config.kadarioSite, config.livestreamApi as string | undefined)
    
    // Filter out tennis and baseball from Kadario to avoid duplicates and fulfill requirement
    const otherEvents = kadarioEvents.filter((event: SportsEvent) => {
      const key = event.sport_key.toLowerCase()
      return !key.startsWith('tennis') && key !== 'baseball_mlb'
    })

    const odds = createOddsApi(config.oddsApi, config.oddsApiKey)
    const oddsSports = ['tennis', 'baseball_mlb']
    const oddsEvents: SportsEvent[] = []
    const now = Date.now()
    
    for (const sportKey of oddsSports) {
      try {
        const events = await odds.leagueOdds(sportKey)
        oddsEvents.push(...events.filter((event: SportsEvent) => 
          Date.parse(event.commence_time) <= now && !event.completed
        ))
      } catch (e) {
        console.error(`Error fetching inplay events for ${sportKey}:`, e)
      }
    }

    return { 
      sports: [], 
      events: [...otherEvents, ...oddsEvents].sort((a, b) => Date.parse(b.commence_time) - Date.parse(a.commence_time)) 
    }
  }
  const odds = createOddsApi(config.oddsApi, config.oddsApiKey)
  if (mode === 'league') return { sports: await odds.sports(), events: [] }
  if (multipleLeagues) {
    if (!requestedSports!.length) return { sports: [], events: [] }
    const allowedKeys = new Set(requestedSports!)
    const events: SportsEvent[] = []
    const keys = [...allowedKeys]
    // Each selected league reuses the shared fixture cache; date bounds are applied locally.
    for (let index = 0; index < keys.length; index += 4) {
      const batch = await Promise.all(keys.slice(index, index + 4).map(key => odds.leagueOdds(key, range)))
      events.push(...batch.flat().filter((event: SportsEvent) => allowedKeys.has(event.sport_key) && inRange(event)))
    }
    return { sports: [], events: events.sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time)) }
  }
  if (!sport) return { sports: [], events: [] }

  if (mode === 'outright') {
    const sports = await odds.sports()
    if (!sports.some(item => item.key === sport && item.active && item.has_outrights)) {
      return { sports: [], events: [] }
    }
    const events = await odds.odds(sport, true)
    return { sports: [], events: events.map(item => ({
      ...item,
      home_team: item.home_team ?? null,
      away_team: item.away_team ?? null,
      bookmakers: (item.bookmakers ?? []).map(bookmaker => ({
        ...bookmaker,
        markets: bookmaker.markets.filter(market => market.key === 'outrights' && market.outcomes.length > 0),
      })).filter(bookmaker => bookmaker.markets.length > 0),
    })).filter(item => item.bookmakers.length > 0) }
  }
  if (mode === 'league-odds') {
    return { sports: [], events: await odds.leagueOdds(sport) }
  }
  if (['upcoming', 'prematch'].includes(mode)) {
    return { sports: [], events: (await odds.leagueOdds(sport, range)).filter(inRange) }
  }
  return { sports: [], events: [] }
})
