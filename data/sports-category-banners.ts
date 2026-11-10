export const SPORTS_CATEGORY_BACKGROUND = '/images/sports/category-banners/background-tennis.webp'
export const BASKETBALL_CATEGORY_BACKGROUND = '/images/sports/category-banners/background-basketball.webp'
export const SOCCER_CATEGORY_BACKGROUND = '/images/sports/category-banners/background-football.webp'
export const FOOTBALL_CATEGORY_BACKGROUND = '/images/sports/category-banners/background-football.webp'
export const TENNIS_CATEGORY_BACKGROUND = '/images/sports/category-banners/background-tennis.webp'
export const BASEBALL_CATEGORY_BACKGROUND = '/images/sports/category-banners/background-tennis.webp'

export const SPORTS_CATEGORY_PLACEHOLDER = '/images/sports/category-banners/tennis.webp'
export const BASKETBALL_CATEGORY_PLACEHOLDER = '/images/sports/category-banners/basketball.webp'
export const SOCCER_CATEGORY_PLACEHOLDER = '/images/sports/category-banners/soccer.webp'
export const TENNIS_CATEGORY_PLACEHOLDER = '/images/sports/category-banners/tennis.webp'
export const BASEBALL_CATEGORY_PLACEHOLDER = '/images/sports/category-banners/tennis.webp'

// Replace any value below with a new file from public/images/sports/category-banners/.
// Until a category gets its own artwork, it intentionally uses the tennis placeholder.
export const SPORTS_CATEGORY_BANNERS: Record<string, string> = {
  basketball: BASKETBALL_CATEGORY_PLACEHOLDER,
  soccer: SOCCER_CATEGORY_PLACEHOLDER,
  football: SOCCER_CATEGORY_PLACEHOLDER,
  tennis: TENNIS_CATEGORY_PLACEHOLDER,
  baseball: BASEBALL_CATEGORY_PLACEHOLDER,
}

export const SPORTS_CATEGORY_BACKGROUNDS: Record<string, string> = {
  basketball: BASKETBALL_CATEGORY_BACKGROUND,
  soccer: SOCCER_CATEGORY_BACKGROUND,
  football: FOOTBALL_CATEGORY_BACKGROUND,
  tennis: TENNIS_CATEGORY_BACKGROUND,
  baseball: BASEBALL_CATEGORY_BACKGROUND,
}

const SPORTS_CATEGORY_LABELS: Record<string, string> = {
  basketball: 'Basketball',
  soccer: 'Soccer',
  football: 'Football',
  tennis: 'Tennis',
  baseball: 'Baseball',
}

export const SPORTS_CATEGORY_ORDER = ['basketball', 'soccer', 'tennis', 'baseball']

export const getSportsCategoryKey = (value: string | undefined | null): string => {
  const normalized = String(value ?? '').trim().toLowerCase().replaceAll(' ', '-')

  if (normalized.includes('basketball') || normalized.includes('nba') || normalized.includes('pba')) return 'basketball'
  if (normalized.includes('soccer') || normalized.includes('football')) return 'soccer'
  if (normalized.includes('tennis') || normalized.includes('atp') || normalized.includes('wta')) return 'tennis'
  if (normalized.includes('baseball') || normalized.includes('mlb') || normalized.includes('npb')) return 'baseball'

  return normalized.split(/[_-]/)[0] || 'sports'
}

export const getSportsCategoryLabel = (value: string | undefined | null): string => {
  const key = getSportsCategoryKey(value)
  return SPORTS_CATEGORY_LABELS[key]
    ?? key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const getSportsCategoryBanner = (value: string | undefined | null): string => {
  return SPORTS_CATEGORY_BANNERS[getSportsCategoryKey(value)] ?? SPORTS_CATEGORY_PLACEHOLDER
}

export const getSportsCategoryBackground = (value: string | undefined | null): string => {
  return SPORTS_CATEGORY_BACKGROUNDS[getSportsCategoryKey(value)] ?? SPORTS_CATEGORY_BACKGROUND
}

export const getSportsCategoryRank = (value: string | undefined | null): number => {
  const rank = SPORTS_CATEGORY_ORDER.indexOf(getSportsCategoryKey(value))
  return rank === -1 ? SPORTS_CATEGORY_ORDER.length : rank
}
