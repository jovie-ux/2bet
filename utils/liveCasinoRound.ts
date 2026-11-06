// Local presentation timing only; these values do not represent live table rounds.
export const LIVE_CASINO_COUNTDOWN_MS = 25_000
export const LIVE_CASINO_DEALING_MS = 12_000
export const LIVE_CASINO_CYCLE_MS = LIVE_CASINO_COUNTDOWN_MS + LIVE_CASINO_DEALING_MS

export interface LiveCasinoRoundState {
  phase: 'countdown' | 'dealing'
  secondsRemaining: number
  progress: number
  round: number
  elapsedInPhaseMs: number
}

const getTableOffset = (tableId: string): number => {
  let hash = 0
  for (const character of tableId) hash = (Math.imul(hash, 31) + character.charCodeAt(0)) >>> 0
  return (hash % (LIVE_CASINO_CYCLE_MS / 1_000)) * 1_000
}

export const getLiveCasinoRoundState = (tableId: string, elapsedMs: number): LiveCasinoRoundState => {
  const elapsed = Number.isFinite(elapsedMs) ? Math.max(0, elapsedMs) : 0
  const tableElapsed = elapsed + getTableOffset(tableId)
  const position = tableElapsed % LIVE_CASINO_CYCLE_MS
  const round = Math.floor(tableElapsed / LIVE_CASINO_CYCLE_MS)

  if (position < LIVE_CASINO_COUNTDOWN_MS) {
    return {
      phase: 'countdown',
      secondsRemaining: Math.ceil((LIVE_CASINO_COUNTDOWN_MS - position) / 1_000),
      progress: (LIVE_CASINO_COUNTDOWN_MS - position) / LIVE_CASINO_COUNTDOWN_MS,
      round,
      elapsedInPhaseMs: position,
    }
  }

  return {
    phase: 'dealing',
    secondsRemaining: 0,
    progress: 0,
    round,
    elapsedInPhaseMs: position - LIVE_CASINO_COUNTDOWN_MS,
  }
}
