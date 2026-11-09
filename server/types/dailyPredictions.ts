export type SportType = 'football' | 'basketball'
export type MarketType = '1x2' | 'ou' | 'ah'

export interface DailyPredictionRecord {
  id: string
  prediction_date: string // YYYY-MM-DD in Asia/Manila
  sport: SportType
  match_id: string // original e.g. "kadario:2577510"
  match_numeric_id: number // e.g. 2577510
  competition_name: string
  competition_logo: string
  home_team_name: string
  home_team_logo: string
  away_team_name: string
  away_team_logo: string
  match_time_utc: string // ISO string
  market_type: MarketType
  prediction_id: number
  selection: string // "Home", "Away", "Draw", "Over", "Under"
  current_odds: number
  line: string | null
  hit_rate: number
  market_group_ids: string // JSON array of prediction IDs in group
  source_status: string // e.g. "scheduled"
  created_at: string
  updated_at: string
}

export interface PredictionRefreshRun {
  id: string
  prediction_date: string
  started_at: string
  finished_at: string | null
  status: 'running' | 'completed' | 'failed' | 'partial'
  football_count: number
  basketball_count: number
  error_summary: string | null
}

export interface RawScheduleTeam {
  id?: string
  name: string
  shortName?: string
  initials?: string
  accent?: string
  logo?: string
}

export interface RawScheduleMatch {
  id: string // e.g. "kadario:2577510"
  leagueId?: string
  home: RawScheduleTeam
  away: RawScheduleTeam
  status: string // "scheduled", "live", "finished", etc.
  clock?: string
  homeScore?: number
  awayScore?: number
  startTime: string // ISO string
  competition: string
  sport: string
}

export interface RawKadarioToolItem {
  id: number
  sport_type: number // 1: football, 2: basketball
  match_id: number
  competition_id?: number
  competition?: { id?: number; name?: string; logo?: string }
  home_team?: { id?: number; name?: string; logo?: string }
  away_team?: { id?: number; name?: string; logo?: string }
  home_team_name?: string
  away_team_name?: string
  match_time?: number
  market: string // "1X2", "OU", "AH", "ML", etc.
  selection: string // "Home", "Away", "Draw", "Over", "Under"
  current_odds: string | number
  line: string
  hit_rate: string | number
  probability?: string | number
  confidence?: string
}

export interface ValidMarketGroup {
  market: MarketType
  items: RawKadarioToolItem[]
  selectedItem: RawKadarioToolItem
  selection: string
  line: string | null
  odds: number
  hitRate: number
  displayPrediction: string
  groupPredictionIds: number[]
}

export interface DailyPredictionDto {
  match_id: string
  sport: SportType
  competition: {
    name: string
    logo: string
  }
  home_team: {
    name: string
    logo: string
  }
  away_team: {
    name: string
    logo: string
  }
  match_time: string
  market: MarketType
  prediction: {
    selection: string
    line: string | null
    current_odds: number
    hit_rate: number
  }
  options?: Array<{ label: string; odd: string }>
  display: {
    market_label: string
    prediction_label: string
    match_time_manila: string
    published_ago?: string
  }
}

export interface DailyPredictionsApiResponse {
  date: string
  timezone: string
  generated_at: string
  total: number
  basketball: DailyPredictionDto[]
  football: DailyPredictionDto[]
  predictions?: DailyPredictionDto[] // Flat convenience list
}
