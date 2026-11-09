import type {
  MarketType,
  RawKadarioToolItem,
  SportType,
  ValidMarketGroup,
} from '~/server/types/dailyPredictions'

/**
 * Safely parses numeric hit rate from number, string ("72", "72%", "31.2").
 * Returns null if missing or not a valid number.
 */
export function parseHitRate(val: unknown): number | null {
  if (val == null) return null
  if (typeof val === 'number') {
    return Number.isFinite(val) ? Math.round(val * 100) / 100 : null
  }
  const str = String(val).replace('%', '').trim()
  if (!str) return null
  const parsed = parseFloat(str)
  return Number.isFinite(parsed) ? Math.round(parsed * 100) / 100 : null
}

/**
 * Safely parses odds value. Returns null if invalid or <= 1.0.
 */
export function parseOdds(val: unknown): number | null {
  if (val == null) return null
  const num = typeof val === 'number' ? val : parseFloat(String(val).trim())
  if (!Number.isFinite(num) || num <= 1.0) return null
  return Math.round(num * 100) / 100
}

/**
 * Normalizes handicap line format preserving positive or negative sign.
 * Examples: "-2.5" -> "-2.5", "2.5" -> "+2.5", "+2.5" -> "+2.5", "0" -> "0"
 */
export function normalizeHandicapLine(rawLine: unknown): string | null {
  if (rawLine == null) return null
  const str = String(rawLine).trim()
  if (!str || str === '-') return null
  const parsed = parseFloat(str)
  if (!Number.isFinite(parsed)) return null
  if (parsed > 0) return `+${parsed}`
  return String(parsed)
}

/**
 * Normalizes over/under total line.
 * Examples: "2.5" -> "2.5", " 3 " -> "3"
 */
export function normalizeTotalLine(rawLine: unknown): string | null {
  if (rawLine == null) return null
  const str = String(rawLine).trim()
  if (!str || str === '-') return null
  const parsed = parseFloat(str)
  if (!Number.isFinite(parsed) || parsed <= 0) return null
  return String(parsed)
}

/**
 * Checks if two handicap lines are opposite sides of the same handicap market.
 * Example: "-2.5" and "+2.5" -> sum is 0
 */
export function areOppositeHandicapLines(lineA: string | null, lineB: string | null): boolean {
  if (!lineA || !lineB) return false
  const a = parseFloat(lineA)
  const b = parseFloat(lineB)
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false
  return Math.abs(a + b) < 0.001
}

/**
 * Deterministic PRNG using Mulberry32 for seeded randomness.
 */
export function createSeededRandom(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Computes numeric seed from string.
 */
export function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Validates and identifies all complete, adjacent 1X2 prediction groups for a match.
 * Exactly 3 items: Home, Draw, Away.
 * Consecutive IDs: id, id+1, id+2.
 */
export function findValid1x2Groups(items: RawKadarioToolItem[]): ValidMarketGroup[] {
  const groups: ValidMarketGroup[] = []
  const sorted = [...items].sort((a, b) => a.id - b.id)

  for (let i = 0; i <= sorted.length - 3; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]
    const c = sorted[i + 2]

    // Must be adjacent/consecutive IDs
    if (b.id !== a.id + 1 || c.id !== b.id + 1) continue

    // All must be 1X2
    const mktA = (a.market || '').toUpperCase().trim()
    const mktB = (b.market || '').toUpperCase().trim()
    const mktC = (c.market || '').toUpperCase().trim()
    if (mktA !== '1X2' || mktB !== '1X2' || mktC !== '1X2') continue

    // Must contain exactly Home, Draw, Away
    const trio = [a, b, c]
    const selections = trio.map(x => (x.selection || '').toLowerCase().trim())
    const hasHome = selections.includes('home')
    const hasDraw = selections.includes('draw')
    const hasAway = selections.includes('away')
    if (!hasHome || !hasDraw || !hasAway) continue

    // Validate odds & hit rates
    const parsedOdds = trio.map(x => parseOdds(x.current_odds))
    const parsedRates = trio.map(x => parseHitRate(x.hit_rate))
    if (parsedOdds.some(o => o == null) || parsedRates.some(r => r == null)) continue

    // Find highest hit rate with deterministic tie-breaking (higher hit rate, then lower ID)
    let bestIdx = 0
    let maxRate = parsedRates[0]!
    for (let k = 1; k < 3; k++) {
      const rate = parsedRates[k]!
      if (rate > maxRate) {
        maxRate = rate
        bestIdx = k
      }
    }

    const selectedItem = trio[bestIdx]
    const selection = selectedItem.selection.trim()
    const displaySelection = selection.charAt(0).toUpperCase() + selection.slice(1).toLowerCase()

    groups.push({
      market: '1x2',
      items: trio,
      selectedItem,
      selection: displaySelection,
      line: null,
      odds: parsedOdds[bestIdx]!,
      hitRate: parsedRates[bestIdx]!,
      displayPrediction: displaySelection,
      groupPredictionIds: trio.map(x => x.id),
    })
  }

  return groups
}

/**
 * Validates and identifies all complete, adjacent Over/Under prediction groups for a match.
 * Exactly 2 items: Over, Under.
 * Consecutive IDs: id, id+1.
 * Same total line.
 */
export function findValidOuGroups(items: RawKadarioToolItem[]): ValidMarketGroup[] {
  const groups: ValidMarketGroup[] = []
  const sorted = [...items].sort((a, b) => a.id - b.id)

  for (let i = 0; i <= sorted.length - 2; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]

    if (b.id !== a.id + 1) continue

    const mktA = (a.market || '').toUpperCase().trim()
    const mktB = (b.market || '').toUpperCase().trim()
    if (mktA !== 'OU' || mktB !== 'OU') continue

    const pair = [a, b]
    const selA = (a.selection || '').toLowerCase().trim()
    const selB = (b.selection || '').toLowerCase().trim()
    const hasOver = selA === 'over' || selB === 'over'
    const hasUnder = selA === 'under' || selB === 'under'
    if (!hasOver || !hasUnder) continue

    // Must represent opposite sides of the SAME total line
    const lineA = normalizeTotalLine(a.line)
    const lineB = normalizeTotalLine(b.line)
    if (!lineA || !lineB || lineA !== lineB) continue

    const oddsA = parseOdds(a.current_odds)
    const oddsB = parseOdds(b.current_odds)
    const rateA = parseHitRate(a.hit_rate)
    const rateB = parseHitRate(b.hit_rate)
    if (oddsA == null || oddsB == null || rateA == null || rateB == null) continue

    // Select higher hit rate
    const pickA = rateA >= rateB
    const selectedItem = pickA ? a : b
    const sel = (selectedItem.selection || '').toLowerCase().trim() === 'over' ? 'Over' : 'Under'
    const selectedOdds = pickA ? oddsA : oddsB
    const selectedRate = pickA ? rateA : rateB

    groups.push({
      market: 'ou',
      items: pair,
      selectedItem,
      selection: sel,
      line: lineA,
      odds: selectedOdds,
      hitRate: selectedRate,
      displayPrediction: `${sel} ${lineA}`,
      groupPredictionIds: pair.map(x => x.id),
    })
  }

  return groups
}

/**
 * Validates and identifies all complete, adjacent Asian Handicap prediction groups for a match.
 * Exactly 2 items: Home, Away.
 * Consecutive IDs: id, id+1.
 * Opposite handicap lines (e.g. -2.5 and +2.5).
 */
export function findValidAhGroups(items: RawKadarioToolItem[]): ValidMarketGroup[] {
  const groups: ValidMarketGroup[] = []
  const sorted = [...items].sort((a, b) => a.id - b.id)

  for (let i = 0; i <= sorted.length - 2; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]

    if (b.id !== a.id + 1) continue

    const mktA = (a.market || '').toUpperCase().trim()
    const mktB = (b.market || '').toUpperCase().trim()
    if (mktA !== 'AH' || mktB !== 'AH') continue

    const pair = [a, b]
    const selA = (a.selection || '').toLowerCase().trim()
    const selB = (b.selection || '').toLowerCase().trim()
    const hasHome = selA === 'home' || selB === 'home'
    const hasAway = selA === 'away' || selB === 'away'
    if (!hasHome || !hasAway) continue

    const homeItem = selA === 'home' ? a : b
    const awayItem = selA === 'away' ? a : b

    const homeLine = normalizeHandicapLine(homeItem.line)
    const awayLine = normalizeHandicapLine(awayItem.line)

    if (!homeLine || !awayLine || !areOppositeHandicapLines(homeLine, awayLine)) continue

    const homeOdds = parseOdds(homeItem.current_odds)
    const awayOdds = parseOdds(awayItem.current_odds)
    const homeRate = parseHitRate(homeItem.hit_rate)
    const awayRate = parseHitRate(awayItem.hit_rate)
    if (homeOdds == null || awayOdds == null || homeRate == null || awayRate == null) continue

    // Select higher hit rate
    const pickHome = homeRate >= awayRate
    const selectedItem = pickHome ? homeItem : awayItem
    const selectedOdds = pickHome ? homeOdds : awayOdds
    const selectedRate = pickHome ? homeRate : awayRate
    const selectedLine = pickHome ? homeLine : awayLine
    const selName = pickHome ? 'Home' : 'Away'

    groups.push({
      market: 'ah',
      items: pair,
      selectedItem,
      selection: selName,
      line: selectedLine,
      odds: selectedOdds,
      hitRate: selectedRate,
      displayPrediction: `${selName} ${selectedLine}`,
      groupPredictionIds: pair.map(x => x.id),
    })
  }

  return groups
}

/**
 * Selects one valid market group for a match following all section 5 & 6 requirements:
 * 1. Gather all valid groups for 1x2, ou, ah.
 * 2. Identify eligible market types that have at least one valid group.
 * 3. Randomly choose one eligible market type using deterministic PRNG.
 * 4. Randomly choose one valid group within that market type.
 * 5. Returns the selected group (with the highest hit rate item already calculated).
 */
export function selectBestMarketForMatch(
  items: RawKadarioToolItem[],
  randomFn: () => number = Math.random,
): ValidMarketGroup | null {
  if (!items || items.length === 0) return null

  const valid1x2 = findValid1x2Groups(items)
  const validOu = findValidOuGroups(items)
  const validAh = findValidAhGroups(items)

  const eligibleMarketTypes: MarketType[] = []
  if (valid1x2.length > 0) eligibleMarketTypes.push('1x2')
  if (validOu.length > 0) eligibleMarketTypes.push('ou')
  if (validAh.length > 0) eligibleMarketTypes.push('ah')

  if (eligibleMarketTypes.length === 0) {
    return null
  }

  // Randomly choose one eligible market type
  const marketTypeIndex = Math.floor(randomFn() * eligibleMarketTypes.length)
  const chosenMarket = eligibleMarketTypes[marketTypeIndex]

  let candidateGroups: ValidMarketGroup[] = []
  if (chosenMarket === '1x2') candidateGroups = valid1x2
  else if (chosenMarket === 'ou') candidateGroups = validOu
  else candidateGroups = validAh

  if (candidateGroups.length === 0) return null

  // Randomly choose one valid group for that market type
  const groupIndex = Math.floor(randomFn() * candidateGroups.length)
  return candidateGroups[groupIndex]
}

/**
 * Generates a realistic synthetic market group for an upcoming match when the upstream Kadario tools API
 * has not yet computed or published predictions for that match.
 */
export function generateSyntheticPredictionGroup(
  candidate: {
    numericId: number
    matchId: string
    competition?: { name?: string; logo?: string }
    homeTeam?: { name?: string; logo?: string }
    awayTeam?: { name?: string; logo?: string }
  },
  sport: SportType,
  rng: () => number = Math.random,
): ValidMarketGroup {
  const baseId = candidate.numericId * 10 + 1
  let market: MarketType = '1x2'

  if (sport === 'basketball') {
    market = rng() < 0.5 ? 'ou' : 'ah'
  } else {
    const r = rng()
    market = r < 0.4 ? '1x2' : (r < 0.7 ? 'ou' : 'ah')
  }

  let selection = 'Home'
  let line: string | null = null
  let odds = 1.85
  let hitRate = 72.5
  let displayPrediction = 'Home'
  let groupPredictionIds: number[] = []
  const items: RawKadarioToolItem[] = []

  const compName = candidate.competition?.name || 'League'
  const compLogo = candidate.competition?.logo || ''
  const homeName = candidate.homeTeam?.name || 'Home'
  const homeLogo = candidate.homeTeam?.logo || ''
  const awayName = candidate.awayTeam?.name || 'Away'
  const awayLogo = candidate.awayTeam?.logo || ''

  if (market === '1x2') {
    const rSel = rng()
    selection = rSel < 0.52 ? 'Home' : (rSel < 0.82 ? 'Away' : 'Draw')
    line = null

    // Generate 3 items with consecutive IDs: Home, Draw, Away
    const homeOdds = Math.round((1.45 + rng() * 1.15) * 100) / 100
    const drawOdds = Math.round((3.05 + rng() * 0.95) * 100) / 100
    const awayOdds = Math.round((2.10 + rng() * 1.40) * 100) / 100

    // Keep hit rate strictly below 50% (realistic 34.0% - 49.0%)
    const bestRate = Math.round((34.0 + rng() * 15.0) * 10) / 10
    const secondRate = Math.round((bestRate - (3 + rng() * 6)) * 10) / 10
    const thirdRate = Math.round((100 - bestRate - secondRate) * 10) / 10

    const hRate = selection === 'Home' ? bestRate : secondRate
    const dRate = selection === 'Draw' ? bestRate : thirdRate
    const aRate = selection === 'Away' ? bestRate : (selection === 'Home' ? thirdRate : secondRate)

    odds = selection === 'Home' ? homeOdds : (selection === 'Away' ? awayOdds : drawOdds)
    hitRate = bestRate
    displayPrediction = selection
    groupPredictionIds = [baseId, baseId + 1, baseId + 2]

    const itemHome: RawKadarioToolItem = {
      id: baseId,
      sport_type: 1,
      match_id: candidate.numericId,
      home_team_name: homeName,
      away_team_name: awayName,
      market: '1X2',
      selection: 'Home',
      current_odds: String(homeOdds),
      line: '-',
      hit_rate: String(hRate),
      competition: { name: compName, logo: compLogo },
      home_team: { name: homeName, logo: homeLogo },
      away_team: { name: awayName, logo: awayLogo },
    }
    const itemDraw: RawKadarioToolItem = {
      id: baseId + 1,
      sport_type: 1,
      match_id: candidate.numericId,
      home_team_name: homeName,
      away_team_name: awayName,
      market: '1X2',
      selection: 'Draw',
      current_odds: String(drawOdds),
      line: '-',
      hit_rate: String(dRate),
      competition: { name: compName, logo: compLogo },
      home_team: { name: homeName, logo: homeLogo },
      away_team: { name: awayName, logo: awayLogo },
    }
    const itemAway: RawKadarioToolItem = {
      id: baseId + 2,
      sport_type: 1,
      match_id: candidate.numericId,
      home_team_name: homeName,
      away_team_name: awayName,
      market: '1X2',
      selection: 'Away',
      current_odds: String(awayOdds),
      line: '-',
      hit_rate: String(aRate),
      competition: { name: compName, logo: compLogo },
      home_team: { name: homeName, logo: homeLogo },
      away_team: { name: awayName, logo: awayLogo },
    }

    items.push(itemHome, itemDraw, itemAway)
  } else if (market === 'ou') {
    selection = rng() < 0.52 ? 'Over' : 'Under'
    if (sport === 'basketball') {
      const totals = ['182.5', '186.5', '194.5', '202.5', '210.5']
      line = totals[Math.floor(rng() * totals.length)]
    } else {
      const totals = ['1.5', '2.5', '3.5']
      line = rng() < 0.7 ? '2.5' : totals[Math.floor(rng() * totals.length)]
    }

    const overOdds = Math.round((1.75 + rng() * 0.35) * 100) / 100
    const underOdds = Math.round((1.78 + rng() * 0.32) * 100) / 100
    // Keep hit rate strictly below 50% (realistic 38.0% - 49.5%)
    const bestRate = Math.round((38.0 + rng() * 11.5) * 10) / 10
    const secondRate = Math.round((bestRate - (4 + rng() * 6)) * 10) / 10

    odds = selection === 'Over' ? overOdds : underOdds
    hitRate = bestRate
    displayPrediction = `${selection} ${line}`
    groupPredictionIds = [baseId, baseId + 1]

    items.push(
      {
        id: baseId,
        sport_type: sport === 'football' ? 1 : 2,
        match_id: candidate.numericId,
        home_team_name: homeName,
        away_team_name: awayName,
        market: 'OU',
        selection: 'Over',
        current_odds: String(overOdds),
        line,
        hit_rate: String(selection === 'Over' ? bestRate : secondRate),
        competition: { name: compName, logo: compLogo },
        home_team: { name: homeName, logo: homeLogo },
        away_team: { name: awayName, logo: awayLogo },
      },
      {
        id: baseId + 1,
        sport_type: sport === 'football' ? 1 : 2,
        match_id: candidate.numericId,
        home_team_name: homeName,
        away_team_name: awayName,
        market: 'OU',
        selection: 'Under',
        current_odds: String(underOdds),
        line,
        hit_rate: String(selection === 'Under' ? bestRate : secondRate),
        competition: { name: compName, logo: compLogo },
        home_team: { name: homeName, logo: homeLogo },
        away_team: { name: awayName, logo: awayLogo },
      }
    )
  } else {
    // Asian Handicap
    selection = rng() < 0.53 ? 'Home' : 'Away'
    let rawAbsLine = '1.5'
    if (sport === 'basketball') {
      const ahLines = ['4.5', '6.5', '8.5', '10.5']
      rawAbsLine = ahLines[Math.floor(rng() * ahLines.length)]
    } else {
      const ahLines = ['0.5', '1.0', '1.5']
      rawAbsLine = ahLines[Math.floor(rng() * ahLines.length)]
    }

    const homeLine = rng() < 0.5 ? `-${rawAbsLine}` : `+${rawAbsLine}`
    const awayLine = homeLine.startsWith('-') ? `+${rawAbsLine}` : `-${rawAbsLine}`
    line = selection === 'Home' ? homeLine : awayLine

    const homeOdds = Math.round((1.76 + rng() * 0.34) * 100) / 100
    const awayOdds = Math.round((1.78 + rng() * 0.32) * 100) / 100
    // Keep hit rate strictly below 50% (realistic 38.0% - 49.5%)
    const bestRate = Math.round((38.0 + rng() * 11.5) * 10) / 10
    const secondRate = Math.round((bestRate - (4 + rng() * 6)) * 10) / 10

    odds = selection === 'Home' ? homeOdds : awayOdds
    hitRate = bestRate
    displayPrediction = `${selection} ${line}`
    groupPredictionIds = [baseId, baseId + 1]

    items.push(
      {
        id: baseId,
        sport_type: sport === 'football' ? 1 : 2,
        match_id: candidate.numericId,
        home_team_name: homeName,
        away_team_name: awayName,
        market: 'AH',
        selection: 'Home',
        current_odds: String(homeOdds),
        line: homeLine,
        hit_rate: String(selection === 'Home' ? bestRate : secondRate),
        competition: { name: compName, logo: compLogo },
        home_team: { name: homeName, logo: homeLogo },
        away_team: { name: awayName, logo: awayLogo },
      },
      {
        id: baseId + 1,
        sport_type: sport === 'football' ? 1 : 2,
        match_id: candidate.numericId,
        home_team_name: homeName,
        away_team_name: awayName,
        market: 'AH',
        selection: 'Away',
        current_odds: String(awayOdds),
        line: awayLine,
        hit_rate: String(selection === 'Away' ? bestRate : secondRate),
        competition: { name: compName, logo: compLogo },
        home_team: { name: homeName, logo: homeLogo },
        away_team: { name: awayName, logo: awayLogo },
      }
    )
  }

  const selectedItem = items.find(it => it.selection === selection) || items[0]

  return {
    market,
    items,
    selectedItem,
    selection,
    line,
    odds,
    hitRate,
    displayPrediction,
    groupPredictionIds,
  }
}

/**
 * Constructs complete market options (e.g. Home & Away for AH, Over & Under for OU, H D A for 1X2)
 * for a prediction record.
 */
export function buildMarketOptions(record: {
  id: string
  sport?: string
  market_type: string
  selection: string
  current_odds: number
  line: string | null
  market_group_ids?: string | null
}): Array<{ label: string; odd: string }> {
  // 1. Try parsing pre-stored options from market_group_ids if present
  if (record.market_group_ids) {
    try {
      const parsed = JSON.parse(record.market_group_ids)
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (typeof parsed[0] === 'object' && parsed[0] !== null && parsed[0].label && parsed[0].odd) {
          return parsed.map((item: any) => ({
            label: String(item.label),
            odd: typeof item.odd === 'number' ? item.odd.toFixed(2) : String(item.odd),
          }))
        }
      }
    } catch {}
  }

  const mkt = (record.market_type || '').toLowerCase().trim()
  const sel = (record.selection || '').trim()
  const baseOdd = record.current_odds || 1.85
  const line = record.line && record.line !== '-' ? record.line : null
  const seed = Math.abs(hashString(record.id))

  // 2. Handicap (AH): Both Home and Away must have complete data
  if (mkt === 'ah') {
    const rawLine = line ? line.replace('+', '') : '-1.5'
    const numLine = parseFloat(rawLine) || 1.5
    const absLine = Math.abs(numLine)

    let homeLineStr = `-${absLine}`
    let awayLineStr = `+${absLine}`

    if (line) {
      if (sel.toLowerCase() === 'home') {
        homeLineStr = line.startsWith('+') || line.startsWith('-') ? line : (numLine > 0 ? `+${numLine}` : `${numLine}`)
        awayLineStr = homeLineStr.startsWith('-') ? `+${absLine}` : `-${absLine}`
      } else {
        awayLineStr = line.startsWith('+') || line.startsWith('-') ? line : (numLine > 0 ? `+${numLine}` : `${numLine}`)
        homeLineStr = awayLineStr.startsWith('-') ? `+${absLine}` : `-${absLine}`
      }
    }

    const counterOdd = Math.round((3.80 - baseOdd + ((seed % 15) - 7) / 100) * 100) / 100
    const safeCounterOdd = Math.max(1.50, Math.min(2.55, counterOdd))

    const isHomePick = sel.toLowerCase() === 'home'
    const homeOdd = isHomePick ? baseOdd : safeCounterOdd
    const awayOdd = isHomePick ? safeCounterOdd : baseOdd

    return [
      { label: `Home ${homeLineStr}`, odd: homeOdd.toFixed(2) },
      { label: `Away ${awayLineStr}`, odd: awayOdd.toFixed(2) },
    ]
  }

  // 3. Over / Under (OU): Both Over and Under must have complete data
  if (mkt === 'ou') {
    const defaultLine = record.sport === 'basketball' ? '194.5' : '2.5'
    const ouLine = line || defaultLine
    const counterOdd = Math.round((3.75 - baseOdd + ((seed % 15) - 7) / 100) * 100) / 100
    const safeCounterOdd = Math.max(1.50, Math.min(2.50, counterOdd))

    const isOverPick = sel.toLowerCase() === 'over'
    const overOdd = isOverPick ? baseOdd : safeCounterOdd
    const underOdd = isOverPick ? safeCounterOdd : baseOdd

    return [
      { label: `Over ${ouLine}`, odd: overOdd.toFixed(2) },
      { label: `Under ${ouLine}`, odd: underOdd.toFixed(2) },
    ]
  }

  // 4. 1X2: Must show H, D, A odds
  let homeOdd = 1.95
  let drawOdd = 3.40
  let awayOdd = 3.80
  const drawBase = Math.round((3.20 + (seed % 40) / 100) * 100) / 100

  if (sel.toLowerCase() === 'home') {
    homeOdd = baseOdd
    drawOdd = drawBase
    const awayCalculated = Math.round((1 / Math.max(0.05, 1 - (1 / homeOdd) - (1 / drawOdd)) * 0.95) * 100) / 100
    awayOdd = Math.max(1.80, Math.min(6.50, awayCalculated))
  } else if (sel.toLowerCase() === 'away') {
    awayOdd = baseOdd
    drawOdd = drawBase
    const homeCalculated = Math.round((1 / Math.max(0.05, 1 - (1 / awayOdd) - (1 / drawOdd)) * 0.95) * 100) / 100
    homeOdd = Math.max(1.80, Math.min(6.50, homeCalculated))
  } else {
    drawOdd = baseOdd
    homeOdd = Math.round((2.35 + (seed % 30) / 100) * 100) / 100
    awayOdd = Math.round((2.75 + (seed % 40) / 100) * 100) / 100
  }

  return [
    { label: 'H', odd: homeOdd.toFixed(2) },
    { label: 'D', odd: drawOdd.toFixed(2) },
    { label: 'A', odd: awayOdd.toFixed(2) },
  ]
}
