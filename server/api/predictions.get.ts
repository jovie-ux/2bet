import type { H3Event } from 'h3'
import { EXPERT_PREDICTORS } from '~/data/predictions'
import type {
  Prediction,
  PredictionMarketType,
  PredictionOption,
  PredictionsResponse,
  PredictionSport,
} from '~/data/predictions'
import { createOddsApi } from '~/server/utils/oddsApi'
import type { SportsEvent } from '~/types/sports'

interface OddsOutcome {
  name: string
  price: number
  point?: number
}

interface PredictionCandidate {
  event: SportsEvent
  bookmaker: string
  marketKey: string
  marketType: PredictionMarketType
  sport: PredictionSport
  options: [PredictionOption, PredictionOption]
}

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000

const toApiTimestamp = (date: Date): string => date.toISOString().replace(/\.\d{3}Z$/, 'Z')

const formatOdd = (price: number): string => price.toFixed(2)

const formatPoint = (point: number): string => {
  const value = Number.isInteger(point) ? point.toFixed(0) : String(point)
  return point > 0 ? `+${value}` : value
}

const getPredictionSport = (sportKey: string): PredictionSport | null => {
  if (sportKey.startsWith('basketball_')) return 'basketball'
  if (sportKey.startsWith('soccer_')) return 'soccer'
  return null
}

const findOutcome = (outcomes: OddsOutcome[], name: string | null): OddsOutcome | undefined => {
  if (!name) return undefined
  return outcomes.find(outcome => outcome.name === name)
}

const buildOptions = (
  event: SportsEvent,
  marketKey: string,
  outcomes: OddsOutcome[],
): Pick<PredictionCandidate, 'marketType' | 'options'> | null => {
  if (marketKey === 'h2h') {
    const home = findOutcome(outcomes, event.home_team)
    const away = findOutcome(outcomes, event.away_team)
    if (!home || !away) return null

    return {
      marketType: '1X2',
      options: [
        { label: 'H', odd: formatOdd(home.price) },
        { label: 'A', odd: formatOdd(away.price) },
      ],
    }
  }

  if (marketKey === 'totals') {
    const over = outcomes.find(outcome => outcome.name.toLowerCase() === 'over')
    const under = outcomes.find(outcome => outcome.name.toLowerCase() === 'under')
    if (!over || !under || over.point == null || under.point == null) return null

    return {
      marketType: 'Over / Under',
      options: [
        { label: `Over${formatPoint(over.point)}`, odd: formatOdd(over.price) },
        { label: `Under${formatPoint(under.point)}`, odd: formatOdd(under.price) },
      ],
    }
  }

  if (marketKey === 'spreads') {
    const home = findOutcome(outcomes, event.home_team)
    const away = findOutcome(outcomes, event.away_team)
    if (!home || !away || home.point == null || away.point == null) return null

    return {
      marketType: 'Handicap',
      options: [
        { label: formatPoint(home.point), odd: formatOdd(home.price) },
        { label: formatPoint(away.point), odd: formatOdd(away.price) },
      ],
    }
  }

  return null
}

const getCandidates = (events: SportsEvent[]): PredictionCandidate[] => {
  const candidates: PredictionCandidate[] = []

  for (const event of events) {
    const sport = getPredictionSport(event.sport_key)
    if (!sport || !event.home_team || !event.away_team) continue

    for (const bookmaker of event.bookmakers ?? []) {
      for (const market of bookmaker.markets ?? []) {
        const result = buildOptions(event, market.key, market.outcomes)
        if (!result) continue

        candidates.push({
          event,
          bookmaker: bookmaker.key,
          marketKey: market.key,
          sport,
          ...result,
        })
      }
    }
  }

  return candidates
}

const formatMatchTime = (value: string): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(value))
  const part = (type: Intl.DateTimeFormatPartTypes): string => (
    parts.find(item => item.type === type)?.value ?? ''
  )

  return `${part('month')}-${part('day')} ${part('hour')}:${part('minute')}`
}

const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]!

export default defineCachedEventHandler(async (event: H3Event): Promise<PredictionsResponse> => {
  const now = new Date()
  const twoDaysFromNow = new Date(now.getTime() + TWO_DAYS_MS)
  const commenceTimeFrom = toApiTimestamp(now)
  const commenceTimeTo = toApiTimestamp(twoDaysFromNow)

  const config = useRuntimeConfig(event)
  const odds = createOddsApi(String(config.oddsApi), String(config.oddsApiKey))
  const events = await odds.upcoming({ commenceTimeFrom, commenceTimeTo })
  const candidates = getCandidates(events)

  const predictions: Prediction[] = candidates.length === 0
    ? []
    : EXPERT_PREDICTORS.map((predictor) => {
        const candidate = randomItem(candidates)
        const publishedHours = Math.floor(Math.random() * 23) + 1

        return {
          id: `${predictor.id}-${candidate.event.id}-${candidate.bookmaker}-${candidate.marketKey}`,
          predictorId: predictor.id,
          predictorName: predictor.predictorName,
          predictorAvatar: predictor.predictorAvatar,
          publishedAgo: `Published ${publishedHours} hour${publishedHours === 1 ? '' : 's'} ago`,
          hitRate: predictor.hitRate,
          winStreak: predictor.winStreak,
          marketType: candidate.marketType,
          sport: candidate.sport,
          league: candidate.event.sport_title,
          matchTime: formatMatchTime(candidate.event.commence_time),
          homeTeam: candidate.event.home_team!,
          awayTeam: candidate.event.away_team!,
          options: candidate.options,
        }
      })

  return { predictions, commenceTimeFrom, commenceTimeTo }
}, {
  maxAge: 5 * 60,
})
