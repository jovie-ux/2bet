import type { LiveCasinoTable } from '../data/live-casino'

type RoadSide = 'B' | 'P'

interface RoadPatternDefinition {
  key: string
  label: string
  title: string
  sample: readonly (readonly RoadSide[])[]
  side?: RoadSide
}

/** The reference's pattern tiles. All Roads is the unfiltered option, outside this list. */
export const LIVE_CASINO_ROAD_PATTERNS = [
  { key: 'lg-b', label: 'Lg B', title: 'Long Banker', side: 'B', sample: [['B', 'B', 'B']] },
  { key: 'lg-p', label: 'Lg P', title: 'Long Player', side: 'P', sample: [['P', 'P', 'P']] },
  { key: '1hop-r', label: '1Hop R', title: 'One Hop Road', sample: [['P'], ['B'], ['P']] },
  { key: 'two-rooms-b', label: '1Hall 2Rooms B', title: 'One Hall Two Rooms – Banker', side: 'B', sample: [['P'], ['B', 'B'], ['P']] },
  { key: 'two-rooms-p', label: '1Hall 2Rooms P', title: 'One Hall Two Rooms – Player', side: 'P', sample: [['B'], ['P', 'P'], ['B']] },
  { key: 'lgr-1hop', label: 'LgR–1Hop', title: 'Long Road – One Hop', sample: [['B', 'B', 'B'], ['P'], ['B'], ['P']] },
  { key: 'b-hop', label: 'BHop', title: 'Banker Hop', side: 'B', sample: [['P', 'P', 'P'], ['B'], ['P', 'P'], ['B']] },
  { key: 'p-hop', label: 'PHop', title: 'Player Hop', side: 'P', sample: [['B', 'B', 'B'], ['P'], ['B', 'B'], ['P']] },
  { key: 'row-b', label: 'RowB', title: 'Banker Rows', side: 'B', sample: [['B', 'B'], ['P', 'P'], ['B', 'B']] },
  { key: 'row-p', label: 'RowP', title: 'Player Rows', side: 'P', sample: [['P', 'P'], ['B', 'B'], ['P', 'P']] },
  { key: 'v-row', label: 'VRow', title: 'Vertical Rows', sample: [['B', 'B', 'B'], ['P', 'P', 'P'], ['B', 'B', 'B']] },
] as const satisfies readonly RoadPatternDefinition[]

export type LiveCasinoRoadPattern = typeof LIVE_CASINO_ROAD_PATTERNS[number]
export type LiveCasinoRoadPatternKey = LiveCasinoRoadPattern['key'] | 'all'

interface RoadRun {
  side: RoadSide
  length: number
}

const historyRuns = (table: LiveCasinoTable): RoadRun[] => {
  if (!Array.isArray(table.wins)) return []
  const runs: RoadRun[] = []
  for (const entry of table.wins.flat()) {
    const side = entry?.result
    // Ties do not begin or interrupt a Banker/Player road.
    if (side !== 'B' && side !== 'P') continue
    const previous = runs[runs.length - 1]
    if (previous?.side === side) previous.length += 1
    else runs.push({ side, length: 1 })
  }
  return runs
}

const alternatingLengths = (runs: RoadRun[], side: RoadSide, sideLength: number, otherLength: number): boolean => {
  const tail = runs.slice(-5)
  return tail.length === 5 && tail.every(run => run.length === (run.side === side ? sideLength : otherLength))
}

const inferPatternKey = (runs: RoadRun[]): LiveCasinoRoadPattern['key'] | undefined => {
  const last = runs[runs.length - 1]
  if (!last) return undefined
  if (last.length >= 4) return last.side === 'B' ? 'lg-b' : 'lg-p'

  // A completed long column followed by four single alternating columns.
  const longThenHop = runs.slice(-5)
  if (longThenHop.length === 5 && longThenHop[0]!.length >= 3 && longThenHop.slice(1).every(run => run.length === 1)) return 'lgr-1hop'
  if (runs.length >= 6 && runs.slice(-6).every(run => run.length === 1)) return '1hop-r'

  if (alternatingLengths(runs, 'B', 2, 1)) return 'two-rooms-b'
  if (alternatingLengths(runs, 'P', 2, 1)) return 'two-rooms-p'

  // Repeated singles of one side separated by longer columns of the other.
  const tail = runs.slice(-5)
  for (const side of ['B', 'P'] as const) {
    if (tail.length === 5 && tail.filter(run => run.side === side).length >= 2
      && tail.every(run => run.side === side ? run.length === 1 : run.length >= 2)) {
      return side === 'B' ? 'b-hop' : 'p-hop'
    }
  }

  const rows = runs.slice(-4)
  if (rows.length === 4 && rows.every(run => run.length === 2)) return last.side === 'B' ? 'row-b' : 'row-p'
  if (rows.length === 4 && rows.every(run => run.length === 3)) return 'v-row'
  return undefined
}

/** Use supplied provider metadata when present; otherwise identify the current preview road. */
export const getTableRoadPattern = (table: LiveCasinoTable): LiveCasinoRoadPattern | undefined => {
  const key = table.roadPattern ?? inferPatternKey(historyRuns(table))
  return LIVE_CASINO_ROAD_PATTERNS.find(pattern => pattern.key === key)
}

/** Filter by the same primary pattern displayed in the thumbnail badge. */
export const matchesTableRoadPattern = (table: LiveCasinoTable, key: LiveCasinoRoadPatternKey): boolean =>
  key === 'all' || getTableRoadPattern(table)?.key === key
