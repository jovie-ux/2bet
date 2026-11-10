import type { LiveStream } from './livestream'

export interface Sport {
  key: string
  group: string
  title: string
  description: string
  active: boolean
  has_outrights: boolean
  country?: string
  logo?: string
}
export interface SportsEvent {
  leagueId?: string
  clock?: string
  clockUpdatedAt?: number
  homeScore?: number
  awayScore?: number
  scoreAvailable?: boolean
  probability?: LiveStream['probability']
  sources?: LiveStream['sources']
  thumbnail?: string
  sport?: string
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string | null
  away_team: string | null
  home_team_logo?: string
  away_team_logo?: string
  competition_logo?: string
  home?: { name?: string; logo?: string; score?: number }
  away?: { name?: string; logo?: string; score?: number }
  completed?: boolean
  scores?: { name: string; score: string }[] | null
  bookmakers?: {
    key: string
    title: string
    markets: { key: string; outcomes: { name: string; price: number; point?: number }[] }[]
  }[]
}

