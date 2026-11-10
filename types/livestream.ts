export interface LiveStream {
  id: string
  leagueId?: string
  competition?: string
  sport?: string
  clock?: string
  probability?: { home?: number | null; draw?: number | null; away?: number | null }
  startTime?: string
  status?: string
  home: { name: string; logo?: string; score?: number; accent?: string }
  away: { name: string; logo?: string; score?: number; accent?: string }
  homeScore?: number
  awayScore?: number
  scoreAvailable?: boolean
  thumbnail?: string
  iframe?: { src: string; title: string }
  sources?: { type?: string; url?: string; fallbackUrl?: string }[]
  hasStream?: boolean
}

export interface LiveStreamCatalog {
  enabled: boolean
  results: LiveStream[]
}
