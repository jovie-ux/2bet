import type { SportsEvent } from '~/types/sports'

export function matchesSportsSelection(
  event: SportsEvent,
  selectedSports: string[],
  selectedTournaments: Record<string, string[]> = {},
) {
  const aliases: Record<string, string> = {
    football: 'Soccer', soccer: 'Soccer', basketball: 'Basketball', nba: 'Basketball', pba: 'Basketball',
    tennis: 'Tennis', atp: 'Tennis', wta: 'Tennis', baseball: 'Baseball', mlb: 'Baseball',
  }
  const group = aliases[(event.sport || event.sport_key.split('_')[0] || '').toLowerCase()]
  if (!group) return false
  const normalizedSelectedSports = selectedSports.map(s => aliases[s.toLowerCase()] || s)
  if (!normalizedSelectedSports.includes(group)) return false
  const keys = selectedTournaments[group] ?? []
  if (keys.length === 0) return true
  if (keys.some(key => key.endsWith('*') ? event.sport_key.startsWith(key.slice(0, -1)) : event.sport_key === key)) {
    return true
  }
  // If the event has a numeric league ID from a live stream feed and none of the configured tournament keys are numeric,
  // allow the live match for the sport.
  const isNumericLeague = /^\d+$/.test(event.sport_key) || Boolean(event.leagueId)
  const hasNumericFilter = keys.some(key => /^\d+$/.test(key))
  if (isNumericLeague && !hasNumericFilter) {
    return true
  }
  return false
}

