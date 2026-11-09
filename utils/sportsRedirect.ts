/**
 * Utility functions for building and resolving external sports redirect URLs.
 * Reads defaults directly from runtime config and .env configuration.
 */

export const DEFAULT_BYBET_REDIRECT_URL = 'https://bybet.com'
export const DEFAULT_BYBET_REDIRECT_CODE = 'xjSD'

/**
 * Attempts to read a key from a local .env file in Node runtime environments.
 */
function tryReadEnvFile(key: string): string | undefined {
  try {
    const proc = (globalThis as unknown as { process?: any }).process
    if (typeof proc?.getBuiltinModule === 'function' && typeof proc?.cwd === 'function') {
      const fs = proc.getBuiltinModule('node:fs')
      const path = proc.getBuiltinModule('node:path')
      const envPath = path.resolve(proc.cwd(), '.env')
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf-8')
        const match = content.match(new RegExp(`^\\s*${key}\\s*=\\s*["']?([^"'\\r\\n]+)["']?`, 'm'))
        if (match?.[1]) {
          return match[1].trim()
        }
      }
    }
  } catch {
    // Ignore in non-Node or browser environments
  }
  return undefined
}

/**
 * Resolves the base redirect URL from Nuxt runtimeConfig, process.env, or .env file.
 */
export const getEnvRedirectUrl = (): string => {
  try {
    if (typeof useRuntimeConfig === 'function') {
      const config = useRuntimeConfig()
      if (config?.public?.bybetRedirectUrl) {
        return String(config.public.bybetRedirectUrl).trim()
      }
    }
  } catch {
    // Outside Nuxt context
  }

  const envUrl = (
    (typeof process !== 'undefined' && process.env?.BYBET_REDIRECT_URL) ||
    tryReadEnvFile('BYBET_REDIRECT_URL') ||
    ''
  ).trim()

  return envUrl || DEFAULT_BYBET_REDIRECT_URL
}

/**
 * Resolves the redirect referral / promo code from runtimeConfig, process.env, or .env file.
 */
export const getEnvRedirectCode = (): string => {
  try {
    if (typeof useRuntimeConfig === 'function') {
      const config = useRuntimeConfig()
      if (config?.public?.bybetRedirectCode) {
        return String(config.public.bybetRedirectCode).trim()
      }
    }
  } catch {
    // Outside Nuxt context
  }

  const envCode = (
    (typeof process !== 'undefined' && process.env?.BYBET_REDIRECT_CODE) ||
    tryReadEnvFile('BYBET_REDIRECT_CODE') ||
    ''
  ).trim()

  return envCode || DEFAULT_BYBET_REDIRECT_CODE
}

/**
 * Constructs a fully qualified external ByBet redirect URL with query parameters.
 */
export const buildBybetRedirectUrl = (
  path: string,
  bybetRedirectUrl?: string,
  redirectCode?: string,
): string => {
  const envUrl = getEnvRedirectUrl()
  const envCode = getEnvRedirectCode()

  const raw = (bybetRedirectUrl || envUrl).trim().replace(/\/+$/, '')
  const code = (redirectCode || envCode).trim()
  const cleanPath = path.trim().replace(/^\/+/, '')

  const separator = cleanPath.includes('?') ? '&' : '?'
  const query = code && !cleanPath.includes('p=') ? `${separator}p=${encodeURIComponent(code)}` : ''

  return `${raw}/${cleanPath}${query}`
}

export const resolveTennisRedirectUrl = (
  bybetRedirectUrl?: string,
  redirectCode?: string,
): string => {
  return buildBybetRedirectUrl('sportEvents/inplay/tennis', bybetRedirectUrl, redirectCode)
}

export const SPORTS_TAB_REDIRECT_PATHS: Record<string, Record<string, string>> = {
  popular: {
    'smart-pick': 'sportEvents/hotGame/smartPick',
    'smartpick': 'sportEvents/hotGame/smartPick',
    outright: 'sportEvents/hotGame/outright',
  },
  basketball: {
    'smart-pick': 'sportEvents/parlay/basketball/interval/inplay',
    parlay: 'sportEvents/parlay/basketball/interval/inplay',
    outright: 'sportEvents/outright/basketball',
  },
  soccer: {
    'smart-pick': 'sportEvents/parlay/football/interval/parlayPromotion',
    parlay: 'sportEvents/parlay/football/interval/parlayPromotion',
    outright: 'sportEvents/outright/football',
    replay: 'sportEvents/gameResult/football/regular/today',
  },
  live: {
    'all-esports': 'sportEvents/liveGame/eSportBallGroup',
    esports: 'sportEvents/liveGame/eSportBallGroup',
    'all esports': 'sportEvents/liveGame/eSportBallGroup',
  },
}

export const getSportsTabRedirectPath = (sport: string, tabKey: string): string | null => {
  const normalizedSport = (sport || '').trim().toLowerCase()
  const normalizedTab = (tabKey || '').trim().toLowerCase()
  return SPORTS_TAB_REDIRECT_PATHS[normalizedSport]?.[normalizedTab] ?? null
}

export const resolveSportsTabRedirectUrl = (
  sport: string,
  tabKey: string,
  bybetRedirectUrl?: string,
  redirectCode?: string,
): string | null => {
  const path = getSportsTabRedirectPath(sport, tabKey)
  if (!path) return null
  return buildBybetRedirectUrl(path, bybetRedirectUrl, redirectCode)
}
