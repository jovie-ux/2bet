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

export const hashString = (input: string): number => {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (Math.imul(hash, 31) + input.charCodeAt(i)) >>> 0
  }
  return hash
}

const getTableOffset = (tableId: string): number => {
  const hash = hashString(tableId)
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

export const getDynamicRouletteResults = (
  tableId: string,
  category: string,
  baseWins: any,
  round: number,
): number[] => {
  const isGameShow = ['game-show', 'live-show'].includes(category)
  let initialNumbers: number[] = []

  if (Array.isArray(baseWins) && baseWins.length) {
    initialNumbers = baseWins
      .map((result: any) => {
        const val = Array.isArray(result) ? result[1] : result
        const num = typeof val === 'number' ? val : Number(val)
        return Number.isFinite(num) ? num : null
      })
      .filter((result): result is number => result !== null)
  }

  if (!initialNumbers.length && isGameShow) {
    const seed = tableId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const mock = [31, 6, 12, 10, 3, 12, 2, 5, 5, 10, 24, 25, 1, 8, 13, 4, 26, 35, 20, 16, 0]
    const start = seed % (mock.length - 12)
    initialNumbers = mock.slice(start, start + 12)
  }

  const results = [...initialNumbers]
  if (round > 0) {
    const gameShowSegments = [1, 2, 5, 10, 20, 40, 2, 1, 5, 1, 2, 10]
    const startRound = Math.max(1, round - 12)
    for (let r = startRound; r <= round; r++) {
      const h = hashString(`${tableId}-roulette-${r}`)
      const newWin = isGameShow ? gameShowSegments[h % gameShowSegments.length] : (h % 37)
      results.unshift(newWin)
    }
  }

  return results.slice(0, 12)
}

export interface SicBoRoundResult {
  total: number
  bigSmall: 'B' | 'S'
}

export const getDynamicSicBoResults = (
  tableId: string,
  baseWins: any,
  round: number,
): SicBoRoundResult[] => {
  const initialRounds: SicBoRoundResult[] = []

  if (Array.isArray(baseWins)) {
    for (const entry of baseWins) {
      const dice: number[] = Array.isArray(entry?.[0]) ? entry[0].slice(0, 3) : Array.isArray(entry) ? entry.slice(0, 3) : []
      const total = typeof entry?.[1] === 'number' && Array.isArray(entry?.[0]) ? entry[1] : dice.reduce((sum, value) => sum + value, 0)
      const bigSmall: 'B' | 'S' = Array.isArray(entry?.[3]) && (entry[3][0] === 'B' || entry[3][0] === 'S')
        ? entry[3][0]
        : total >= 11 ? 'B' : 'S'
      initialRounds.push({ total, bigSmall })
    }
  }

  const results = [...initialRounds]
  if (round > 0) {
    const startRound = Math.max(1, round - 9)
    for (let r = startRound; r <= round; r++) {
      const h = hashString(`${tableId}-sicbo-${r}`)
      const d1 = (h % 6) + 1
      const d2 = ((h >>> 3) % 6) + 1
      const d3 = ((h >>> 6) % 6) + 1
      const total = d1 + d2 + d3
      const bigSmall: 'B' | 'S' = total >= 11 ? 'B' : 'S'
      results.unshift({ total, bigSmall })
    }
  }

  return results.slice(0, 9)
}

export const getDynamicFanTanResults = (
  tableId: string,
  baseWins: any,
  round: number,
): number[] => {
  const initial = Array.isArray(baseWins) ? [...baseWins] : []
  if (round > 0) {
    const startRound = Math.max(1, round - 10)
    for (let r = startRound; r <= round; r++) {
      const h = hashString(`${tableId}-fantan-${r}`)
      const newWin = (h % 4) + 1
      initial.unshift(newWin)
    }
  }
  return initial.slice(0, 10)
}

export const getDynamicBlackjackSeats = (
  tableId: string,
  baseWins: any,
  round: number,
): boolean[] => {
  const base = Array.isArray(baseWins) && baseWins.length ? [...baseWins] : [true, true, false, true, false, true, true]
  if (round === 0) return base
  return base.map((_occupied, index) => {
    const h = hashString(`${tableId}-blackjack-${round}-${index}`)
    return (h % 10) > 3
  })
}

export const getDynamicBaccaratWins = (
  tableId: string,
  baseWins: any,
  round: number,
): any => {
  if (!Array.isArray(baseWins)) return baseWins
  if (round === 0) return baseWins

  const cols = baseWins.map((col: any) => Array.isArray(col) ? col.map((cell: any) => ({ ...cell })) : [])

  const startRound = Math.max(1, round - 20)
  for (let r = startRound; r <= round; r++) {
    const h = hashString(`${tableId}-baccarat-${r}`)
    const roll = h % 100
    const result: 'B' | 'P' | 'T' = roll < 45 ? 'B' : roll < 90 ? 'P' : 'T'
    const cornerMark = (h >>> 8) % 11 === 0 ? 'red' : (h >>> 12) % 11 === 0 ? 'blue' : undefined
    const yellowCenter = (h >>> 16) % 7 === 0

    if (result === 'T') {
      if (cols.length && cols[cols.length - 1].length) {
        const lastCol = cols[cols.length - 1]
        lastCol[lastCol.length - 1].tie = true
      }
    } else {
      const lastCol = cols.length ? cols[cols.length - 1] : null
      const lastOutcome = lastCol && lastCol.length ? lastCol[lastCol.length - 1]?.result : null
      if (lastCol && lastOutcome === result && lastCol.length < 6) {
        lastCol.push({ result, cornerMark, yellowCenter })
      } else {
        cols.push([{ result, cornerMark, yellowCenter }])
      }
    }
  }

  return cols
}
