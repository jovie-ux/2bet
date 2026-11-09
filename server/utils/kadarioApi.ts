import type { SportsEvent } from '~/types/sports'
import type { LiveStream, LiveStreamCatalog } from '~/types/livestream'

interface ApiResponse<T> {
  code: number
  data: T
}

interface GamePreview {
  id: string
  thumbnail?: string
  iframe?: { src?: string; title?: string }
}

interface GamesCatalog {
  categories: { subcategories: { live?: GamePreview[]; schedule?: GamePreview[] }[] }[]
}

interface HoopsLiveStream {
  streamName?: string
  appName?: string
  streamType?: number
  quality?: string
  language?: string
  pushing?: boolean
  playbackUrl?: string
  previewUrl?: string
}

interface HoopsLiveGame {
  matchId: string
  streamId: string
  sport: string
  phase: string
  leagueId?: string
  leagueName?: string
  leagueNames?: { zh?: string; zhHant?: string; en?: string }
  thirdId?: string
  home: {
    id?: string
    name: string
    names?: { zh?: string; zhHant?: string; en?: string }
    logo?: string
    score?: number
  }
  away: {
    id?: string
    name: string
    names?: { zh?: string; zhHant?: string; en?: string }
    logo?: string
    score?: number
  }
  homeName?: string
  awayName?: string
  homeScore?: number
  awayScore?: number
  status?: string
  statusId?: number
  matchTime?: number
  startsAt?: string
  hasLive?: boolean
  streams?: HoopsLiveStream[]
}

interface HoopsLiveData {
  sport: string
  phase: string
  count: number
  games: HoopsLiveGame[]
}

function parseTeamName(team?: { name?: string; names?: { en?: string; zh?: string; zhHant?: string } }, fallback = 'Team'): string {
  if (!team) return fallback
  if (team.names?.en?.trim()) return team.names.en.trim()
  if (team.name) {
    const parts = team.name.split('|').map(s => s.trim()).filter(Boolean)
    if (parts.length > 0) return parts[parts.length - 1]
    return team.name
  }
  return fallback
}

function parseLeagueName(game: HoopsLiveGame): string {
  if (game.leagueNames?.en?.trim()) return game.leagueNames.en.trim()
  if (game.leagueName) {
    const parts = game.leagueName.split('|').map(s => s.trim()).filter(Boolean)
    if (parts.length > 0) return parts[parts.length - 1]
    return game.leagueName
  }
  return game.sport
    ? game.sport.charAt(0).toUpperCase() + game.sport.slice(1)
    : 'Live match'
}

function normalizeBasketballClock(status?: string): string | undefined {
  if (!status) return status

  const phases: Array<[RegExp, string]> = [
    [/^第(?:一|1)(?:节|節)/, '1Q'],
    [/^第(?:二|2)(?:节|節)/, '2Q'],
    [/^第(?:三|3)(?:节|節)/, '3Q'],
    [/^第(?:四|4)(?:节|節)/, '4Q'],
    [/^上半(?:场|場)/, '1st Half'],
    [/^下半(?:场|場)/, '2nd Half'],
    [/^(?:中场|中場|半场|半場)/, 'Half Time'],
    [/^(?:加时赛?|加時賽?|延长赛?|延長賽?)/, 'OT'],
  ]

  const phase = phases.find(([pattern]) => pattern.test(status))
  return phase ? status.replace(phase[0], phase[1]) : status
}

function mapHoopsGameToLiveStream(game: HoopsLiveGame, site: string, origin: string): LiveStream {
  const homeName = parseTeamName(game.home, 'Home')
  const awayName = parseTeamName(game.away, 'Away')
  const competition = parseLeagueName(game)
  const streamId = game.streamId || game.matchId
  const embedUrl = `${origin}/embed/live/${encodeURIComponent(streamId)}?site=${encodeURIComponent(site)}`

  const sources = (game.streams ?? [])
    .filter(s => Boolean(s.playbackUrl))
    .map(s => ({
      type: 'hls',
      url: s.playbackUrl!,
      fallbackUrl: s.previewUrl,
    }))

  const homeScore = typeof game.homeScore === 'number' ? game.homeScore : game.home?.score
  const awayScore = typeof game.awayScore === 'number' ? game.awayScore : game.away?.score
  const scoreAvailable = typeof homeScore === 'number' && typeof awayScore === 'number'

  const cfStream = sources.find(s => s.url && s.url.includes('cloudflarestream.com'))
  const cfMatch = cfStream?.url ? cfStream.url.match(/(https:\/\/[^/]+\.cloudflarestream\.com\/[a-zA-Z0-9]+)/) : null
  const videoThumbnail = cfMatch ? `${cfMatch[1]}/thumbnails/thumbnail.jpg` : undefined

  return {
    id: streamId,
    leagueId: game.leagueId,
    competition,
    sport: game.sport || 'basketball',
    clock: game.sport === 'basketball' ? normalizeBasketballClock(game.status) : game.status,
    startTime: game.startsAt || (game.matchTime ? new Date(game.matchTime * 1000).toISOString() : new Date().toISOString()),
    status: 'live',
    home: { name: homeName, logo: game.home?.logo, score: homeScore },
    away: { name: awayName, logo: game.away?.logo, score: awayScore },
    homeScore,
    awayScore,
    scoreAvailable,
    thumbnail: videoThumbnail || game.home?.logo || game.away?.logo
      || `/images/sports/category-banners/background-${game.sport === 'football' ? 'football' : 'basketball'}.png`,
    iframe: {
      src: embedUrl,
      title: `${homeName} vs ${awayName} (${competition})`,
    },
    sources: sources.length > 0 ? sources : undefined,
    hasStream: Boolean(game.hasLive || sources.length > 0),
  }
}

export async function getKadarioCatalog(
  api: string,
  site: string,
  previews = false,
  liveSports: readonly string[] = ['basketball'],
): Promise<LiveStreamCatalog> {
  const baseURL = `${api.replace(/\/+$/, '').replace(/\/api\/v1$/, '')}/api/v1`

  async function request<T>(path: string, query?: Record<string, string>): Promise<T> {
    const response = await $fetch<ApiResponse<T>>(path, {
      baseURL, query, timeout: 15000, retry: 0,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    })
    if (![0, 200].includes(response.code) || !response.data) {
      throw new Error('Invalid livestream response')
    }
    return response.data
  }

  const origin = new URL(baseURL).origin

  // 1. Primary: fetch the requested Hoopslive live-sport feeds.
  const liveFeeds = await Promise.allSettled(liveSports.map(sport =>
    request<HoopsLiveData>(`/hoopslive/${encodeURIComponent(sport)}/games/live`, { site }),
  ))
  const liveGames = liveFeeds.flatMap((feed, index) => {
    if (feed.status === 'fulfilled') {
      return Array.isArray(feed.value?.games) ? feed.value.games : []
    }
    console.warn(`[livestream] Error requesting ${liveSports[index]} Hoopslive API:`, feed.reason)
    return []
  })
  if (liveGames.length > 0) {
    return {
      enabled: true,
      results: liveGames.map(game => mapHoopsGameToLiveStream(game, site, origin)),
    }
  }

  // 2. Fallback: legacy livestream catalog
  try {
    const settings = await request<{ features?: { live?: boolean } }>(`/sites/${encodeURIComponent(site)}`).catch(() => ({ features: { live: true } }))
    if (settings.features?.live !== true) return { enabled: false, results: [] }

    const catalog = await request<{ results: LiveStream[] }>('/livestream', {
      site: site, segment: 'live',
    })
    if (!Array.isArray(catalog.results)) throw new Error('Invalid livestream catalog')
    if (!previews) return { enabled: true, results: catalog.results }

    const games = await request<GamesCatalog>(`/sites/${encodeURIComponent(site)}/games`).catch(() => null)
    const gamePreviews = new Map(games?.categories?.flatMap(category =>
      category.subcategories.flatMap(group => [...(group.live ?? []), ...(group.schedule ?? [])]),
    ).map(game => [game.id, game]) ?? [])

    function resolveUrl(value?: string) {
      if (!value) return undefined
      try {
        const url = new URL(value, origin)
        return url.protocol === 'https:' ? url.href : undefined
      } catch { return undefined }
    }

    return {
      enabled: true,
      results: catalog.results.map(stream => {
        const game = gamePreviews.get(stream.id)
        const embedUrl = `${origin}/embed/live/${encodeURIComponent(stream.id)}?site=${encodeURIComponent(site)}`
        return {
          ...stream,
          thumbnail: resolveUrl(game?.thumbnail),
          iframe: {
            src: embedUrl,
            title: game?.iframe?.title || `${stream.home?.name || 'Live'} vs ${stream.away?.name || 'Match'}`,
          },
        }
      }),
    }
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Livestream service unavailable' })
  }
}

type LiveMatch = LiveStream & { leagueId?: string; competition?: string; sport?: string }

// Kadario's `nba`/`pba` fields identify a sport, not necessarily the NBA league.
// Match competition names explicitly before applying Odds API tournament filters.
function kadarioTournamentKey(match: LiveMatch) {
  const name = (match.competition ?? '').toLowerCase().trim()
  const aliases: Record<string, string> = {
    'nba': 'basketball_nba', 'national basketball association': 'basketball_nba',
    'wnba': 'basketball_wnba', 'nbl': 'basketball_nbl',
    'premier league': 'soccer_epl', 'english premier league': 'soccer_epl', 'epl': 'soccer_epl',
    'bundesliga': 'soccer_germany_bundesliga', 'serie a': 'soccer_italy_serie_a',
    'champions league': 'soccer_uefa_champs_league', 'uefa champions league': 'soccer_uefa_champs_league',
    'europa league': 'soccer_uefa_europa_league', 'uefa europa league': 'soccer_uefa_europa_league',
    'mlb': 'baseball_mlb', 'major league baseball': 'baseball_mlb',
  }
  if (aliases[name]) return aliases[name]
  if (/^(atp|wta)\b/.test(name)) return `tennis_${name.replace(/[^a-z0-9]+/g, '_')}`
  const sportPrefix = (match.sport || 'basketball').toLowerCase().replace(/[^a-z0-9]/g, '')
  const leagueSuffix = (match.leagueId || name || 'live').toLowerCase().replace(/[^a-z0-9]+/g, '_')
  return `${sportPrefix}_${leagueSuffix}`
}

export async function getLiveInplayEvents(api: string, site: string): Promise<SportsEvent[]> {
  const catalog = await getKadarioCatalog(api, site, false, ['basketball', 'football'])
  const matches = catalog.results as LiveMatch[]
  return matches
    .filter(match => match.status === 'live' && match.home?.name && match.away?.name && Number.isFinite(Date.parse(match.startTime ?? '')))
    .map(match => ({
      id: match.id,
      leagueId: match.leagueId,
      sources: match.sources,
      thumbnail: match.thumbnail,
      clock: match.clock,
      clockUpdatedAt: Date.now(),
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      scoreAvailable: match.scoreAvailable,
      probability: match.probability,
      sport: match.sport,
      sport_key: kadarioTournamentKey(match),
      sport_title: match.competition || 'Live match',
      commence_time: match.startTime!,
      home_team: match.home.name,
      away_team: match.away.name,
      completed: false,
      // Keep live games without published scores; do not invent zero scores.
      scores: match.scoreAvailable === false ? [] : [
        ...(typeof match.homeScore === 'number' ? [{ name: match.home.name, score: String(match.homeScore) }] : []),
        ...(typeof match.awayScore === 'number' ? [{ name: match.away.name, score: String(match.awayScore) }] : []),
      ],
    }))
    .sort((a, b) => Date.parse(b.commence_time) - Date.parse(a.commence_time))
}
