import defaultJackpots from '~/data/jackpots.json'

export type JackpotTierKey = 'mega' | 'jdb' | 'jili' | 'cq9' | 'grand' | 'major' | 'minor'

export interface JackpotCounterOptions {
  /** Shared state key. Components using the same key show the same amount. */
  key: JackpotTierKey
  /** Seeds the starting amount (runs once, server-side during SSR). */
  initial: () => number
  /** Random increment range per tick, in pesos (100 or less). */
  step: readonly [number, number]
  /** Random decrement range per tick, in pesos (100 or less). */
  decreaseStep?: readonly [number, number]
  /** Probability (0 to 1) of a tick being an increase vs decrease. Defaults to ~0.60. */
  increaseProbability?: number
  /** Random delay range between ticks, in milliseconds (~1 minute default). */
  delayMs?: readonly [number, number]
  /** Delay range before the first tick after mounting, in milliseconds. */
  initialDelayMs?: readonly [number, number]
  /** Minimum baseline amount; when at or below this, the counter only increases. */
  min?: number
  /** Maximum threshold; when at or above this, the counter only decreases. */
  max?: number
}

interface ActiveTicker {
  subscribers: number
  timer: ReturnType<typeof setTimeout> | null
}

const DEFAULT_DELAY_MS = [50_000, 70_000] as const
const DEFAULT_INITIAL_DELAY_MS = [15_000, 30_000] as const
const TWEEN_MAX_DURATION_MS = 1_500

// One ticker per key, so several components sharing a counter don't double-increment it.
const activeTickers = new Map<string, ActiveTicker>()

// Batch saving to data/jackpots.json via /api/jackpots with debounce
let saveTimer: ReturnType<typeof setTimeout> | null = null
const pendingSaves: Partial<Record<JackpotTierKey, number>> = {}

const queueJackpotSave = (key: JackpotTierKey, value: number): void => {
  pendingSaves[key] = value

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(`bybet-jackpot:${key}`, String(value))
    } catch {}
  }

  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(async () => {
    saveTimer = null
    const payload = { ...pendingSaves }
    try {
      await $fetch('/api/jackpots', {
        method: 'POST',
        body: payload,
      })
    } catch {}
  }, 800)
}

// Deduplicate initial server sync across mounted jackpot components
let initialFetchPromise: Promise<Record<string, number> | null> | null = null

const fetchLatestJackpots = (): Promise<Record<string, number> | null> => {
  if (!initialFetchPromise) {
    initialFetchPromise = $fetch<Record<string, number>>('/api/jackpots').catch(() => null)
  }
  return initialFetchPromise
}

const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min)
const toCents = (value: number): number => Math.round(value * 100) / 100

const jackpotAmountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatJackpotAmount = (value: number): string => jackpotAmountFormatter.format(value)

const getInitialJackpotAmount = (key: string, fallback: number): number => {
  const record = defaultJackpots as Record<string, unknown>
  const value = record[key]
  return typeof value === 'number' && !Number.isNaN(value) ? value : fallback
}

export const MEGA_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'mega',
  initial: () => getInitialJackpotAmount('mega', 1_008_450.25),
  min: 1_000_000,
  max: 1_250_000,
  step: [12, 85],
  decreaseStep: [8, 65],
  increaseProbability: 0.6,
  delayMs: [50_000, 70_000],
  initialDelayMs: [15_000, 30_000],
}

export const JDB_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'jdb',
  initial: () => getInitialJackpotAmount('jdb', 3_015.46),
  min: 2_500,
  max: 8_000,
  step: [0.5, 6],
  decreaseStep: [0.3, 4.5],
  increaseProbability: 0.6,
  delayMs: [50_000, 75_000],
  initialDelayMs: [15_000, 30_000],
}

export const JILI_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'jili',
  initial: () => getInitialJackpotAmount('jili', 7_854.20),
  min: 5_000,
  max: 15_000,
  step: [1, 15],
  decreaseStep: [0.8, 11],
  increaseProbability: 0.6,
  delayMs: [50_000, 75_000],
  initialDelayMs: [16_000, 32_000],
}

export const CQ9_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'cq9',
  initial: () => getInitialJackpotAmount('cq9', 6_328.50),
  min: 5_000,
  max: 15_000,
  step: [1, 12],
  decreaseStep: [0.7, 9],
  increaseProbability: 0.6,
  delayMs: [55_000, 80_000],
  initialDelayMs: [18_000, 35_000],
}

export const GRAND_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'grand',
  initial: () => getInitialJackpotAmount('grand', 354_120.50),
  min: 350_000,
  max: 420_000,
  step: [6, 45],
  decreaseStep: [4, 35],
  increaseProbability: 0.6,
  delayMs: [50_000, 75_000],
  initialDelayMs: [18_000, 35_000],
}

export const MAJOR_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'major',
  initial: () => getInitialJackpotAmount('major', 86_410.20),
  min: 85_000,
  max: 110_000,
  step: [3, 22],
  decreaseStep: [2, 18],
  increaseProbability: 0.6,
  delayMs: [55_000, 80_000],
  initialDelayMs: [20_000, 40_000],
}

export const MINOR_JACKPOT_COUNTER: JackpotCounterOptions = {
  key: 'minor',
  initial: () => getInitialJackpotAmount('minor', 12_740.10),
  min: 12_500,
  max: 18_000,
  step: [1, 8],
  decreaseStep: [0.5, 6.5],
  increaseProbability: 0.6,
  delayMs: [55_000, 80_000],
  initialDelayMs: [22_000, 45_000],
}

export const useJackpotCounter = (options: JackpotCounterOptions) => {
  const amount = useState<number>(`jackpot-counter:${options.key}`, () => toCents(options.initial()))
  const displayAmount = ref(amount.value)
  const [minDelay, maxDelay] = options.delayMs ?? DEFAULT_DELAY_MS
  const initialDelayRange = options.initialDelayMs ?? DEFAULT_INITIAL_DELAY_MS
  let frameId: number | null = null

  const stopTween = (): void => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId)
      frameId = null
    }
  }

  const animateTo = (target: number): void => {
    stopTween()
    const from = displayAmount.value

    if (typeof window === 'undefined') {
      displayAmount.value = target
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || from === target) {
      displayAmount.value = target
      return
    }

    // Smooth cubic ease-out tweening over ~1.2s for gentle per-minute transitions
    const duration = Math.min(TWEEN_MAX_DURATION_MS, 1_200)
    const startedAt = performance.now()

    const step = (now: number): void => {
      const elapsed = now - startedAt
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - (1 - progress) ** 3
      displayAmount.value = toCents(from + (target - from) * eased)
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step)
      } else {
        frameId = null
        displayAmount.value = target
      }
    }

    frameId = window.requestAnimationFrame(step)
  }

  const scheduleTick = (ticker: ActiveTicker, delay?: number): void => {
    const waitTime = delay ?? randomBetween(minDelay, maxDelay)
    ticker.timer = setTimeout(() => {
      if (!document.hidden) {
        const current = amount.value
        const minBound = options.min ?? 0
        const maxBound = options.max ?? Number.POSITIVE_INFINITY

        let isIncrease: boolean
        if (current <= minBound) {
          isIncrease = true
        } else if (current >= maxBound) {
          isIncrease = false
        } else {
          const prob = options.increaseProbability ?? 0.6
          isIncrease = Math.random() < prob
        }

        const deltaRange = isIncrease
          ? options.step
          : (options.decreaseStep ?? [options.step[0] * 0.7, options.step[1] * 0.85])

        const delta = randomBetween(deltaRange[0], deltaRange[1])
        const nextRaw = isIncrease ? current + delta : current - delta
        amount.value = toCents(Math.max(minBound, Math.min(maxBound, nextRaw)))
        queueJackpotSave(options.key, amount.value)
      }
      scheduleTick(ticker)
    }, waitTime)
  }

  watch(amount, animateTo)

  onMounted(() => {
    // 1. Immediately hydrate from localStorage if available to preserve value across refreshes
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem(`bybet-jackpot:${options.key}`)
      if (cached) {
        const parsed = Number(cached)
        if (!Number.isNaN(parsed) && parsed > 0) {
          amount.value = parsed
        }
      }
    }
    displayAmount.value = amount.value

    // 2. Sync with server data/jackpots.json in background
    fetchLatestJackpots().then((serverData) => {
      if (serverData && typeof serverData[options.key] === 'number') {
        const serverVal = serverData[options.key]
        if (serverVal > 0 && Math.abs(serverVal - amount.value) > 0.01) {
          amount.value = serverVal
          displayAmount.value = serverVal
          if (typeof localStorage !== 'undefined') {
            try {
              localStorage.setItem(`bybet-jackpot:${options.key}`, String(serverVal))
            } catch {}
          }
        }
      }
    })

    // 3. Register ticker subscriber
    const ticker = activeTickers.get(options.key) ?? { subscribers: 0, timer: null }
    ticker.subscribers += 1
    activeTickers.set(options.key, ticker)
    if (ticker.subscribers === 1) {
      scheduleTick(ticker, randomBetween(initialDelayRange[0], initialDelayRange[1]))
    }
  })

  onBeforeUnmount(() => {
    stopTween()

    const ticker = activeTickers.get(options.key)
    if (!ticker) return

    ticker.subscribers -= 1
    if (ticker.subscribers <= 0) {
      if (ticker.timer) clearTimeout(ticker.timer)
      activeTickers.delete(options.key)
    }
  })

  return { amount, displayAmount }
}
