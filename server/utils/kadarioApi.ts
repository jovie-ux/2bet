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
  matchId?: string
  streamId?: string
  sport?: string
  phase?: string
  leagueId?: string
  leagueName?: string
  leagueNames?: { zh?: string; zhHant?: string; en?: string }
  thirdId?: string
  home?: {
    id?: string
    name?: string
    names?: { zh?: string; zhHant?: string; en?: string }
    logo?: string
    score?: number
  }
  away?: {
    id?: string
    name?: string
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

function parseLocalizedName(names?: { zh?: string; zhHant?: string; en?: string }, rawName?: string): string {
  if (names?.en?.trim()) return names.en.trim()
  if (rawName) {
    const parts = rawName.split('|').map(s => s.trim()).filter(Boolean)
    if (parts.length > 0) return parts[parts.length - 1]
  }
  return rawName || ''
}

function formatGameClock(status?: string): string {
  if (!status) return ''
  return status
    .replace('第一节', 'Q1')
    .replace('第二节', 'Q2')
    .replace('第三节', 'Q3')
    .replace('第四节', 'Q4')
    .replace('加时', 'OT')
    .replace(/中场|半场/, 'Half Time')
    .replace(/完赛|结束/, 'FT')
    .replace('未开赛', 'Upcoming')
    .trim()
}

export async function getKadarioCatalog(api: string, site: string, previews = false, livestreamUrl?: string): Promise<LiveStreamCatalog> {
  const targetUrl = livestreamUrl || 'https://live88.eu.cc/api/v1/hoopslive/basketball/games/live?site=YBa-BnymZ6iN8pkfAUFTWIKn'

  try {
    const response = await $fetch<{ code: number; data?: { games?: HoopsLiveGame[] } }>(targetUrl, {
      timeout: 15000,
      retry: 1,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    })

    if (response && response.code === 0 && Array.isArray(response.data?.games)) {
      const results: LiveStream[] = response.data.games.map(game => {
        const homeName = parseLocalizedName(game.home?.names, game.home?.name || game.homeName) || 'Home'
        const awayName = parseLocalizedName(game.away?.names, game.away?.name || game.awayName) || 'Away'
        const competition = parseLocalizedName(game.leagueNames, game.leagueName) || 'Basketball'
        const isLocal = (url?: string) => !url || url.includes('127.0.0.1') || url.includes('localhost')
        const sources: { type: string; url: string; fallbackUrl?: string }[] = []
        for (const s of game.streams ?? []) {
          const primary = !isLocal(s.playbackUrl) ? s.playbackUrl : (!isLocal(s.previewUrl) ? s.previewUrl : undefined)
          if (primary) {
            const fallback = !isLocal(s.previewUrl) && s.previewUrl !== primary ? s.previewUrl : undefined
            sources.push({
              type: 'hls',
              url: primary,
              ...(fallback ? { fallbackUrl: fallback } : {}),
            })
          }
        }

        const streamId = game.matchId || game.streamId || String(game.thirdId || Math.random())
        const embedUrl = `https://live88.eu.cc/embed/live/${encodeURIComponent(streamId)}?site=${encodeURIComponent(site)}`

        return {
          id: game.matchId || streamId,
          leagueId: game.leagueId,
          home: {
            id: game.home?.id,
            name: homeName,
            logo: game.home?.logo,
          },
          away: {
            id: game.away?.id,
            name: awayName,
            logo: game.away?.logo,
          },
          status: game.phase === 'live' || game.hasLive ? 'live' : 'upcoming',
          clock: formatGameClock(game.status),
          homeScore: game.homeScore ?? game.home?.score,
          awayScore: game.awayScore ?? game.away?.score,
          scoreAvailable: typeof (game.homeScore ?? game.home?.score) === 'number',
          startTime: game.startsAt || (game.matchTime ? new Date(game.matchTime * 1000).toISOString() : undefined),
          sources,
          hasStream: Boolean(sources.length > 0),
          iframe: {
            src: embedUrl,
            title: `${homeName} vs ${awayName}`,
          },
          thumbnail: game.home?.logo || game.away?.logo,
          competition,
          sport: game.sport || 'basketball',
        }
      })

      return {
        enabled: true,
        results,
      }
    }
  } catch (err) {
    console.warn('[livestream] Error fetching from hoopslive endpoint, falling back to legacy kadario catalog:', err)
  }

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

  try {
    // The public site and catalog endpoints do not require an API key.
    const settings = await request<{ features?: { live?: boolean } }>(`/sites/${encodeURIComponent(site)}`)
    if (settings.features?.live !== true) return { enabled: false, results: [] }

    const catalog = await request<{ results: LiveStream[] }>('/livestream', {
      site: site, segment: 'live',
    })
    if (!Array.isArray(catalog.results)) throw new Error('Invalid livestream catalog')
    if (!previews) return { enabled: true, results: catalog.results }
    // Preview metadata is optional: an unavailable games feed must not stop playback.
    const games = await request<GamesCatalog>(`/sites/${encodeURIComponent(site)}/games`).catch(() => null)
    const gamePreviews = new Map(games?.categories?.flatMap(category =>
      category.subcategories.flatMap(group => [...(group.live ?? []), ...(group.schedule ?? [])]),
    ).map(game => [game.id, game]) ?? [])
    const origin = new URL(baseURL).origin
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

export async function getLiveInplayEvents(api: string, site: string, livestreamUrl?: string): Promise<SportsEvent[]> {
  const catalog = await getKadarioCatalog(api, site, false, livestreamUrl)
  const matches = catalog.results as LiveMatch[]
  return matches
    .filter(match => match.status === 'live' && match.home?.name && match.away?.name && Number.isFinite(Date.parse(match.startTime ?? '')))
    .map(match => ({
      id: match.id,
      leagueId: match.leagueId,
      sources: match.sources,
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
