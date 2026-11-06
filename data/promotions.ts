export interface PromoImages {
  header: string
  banner: string
  thumbnail: string
}

export interface FeaturedPromo {
  id: string
  slug: string
  title: string
  rate?: string
  subtitle?: string
  badgeText?: string
  category: string
  bannerImage: PromoImages | string
  endDate: string
  countdownText?: string
  /** Explicit payment currency codes (for example USD or BTC); empty means unassigned. */
  paymentMethods?: string[]
  showSaveBadge?: boolean
  imagePosition?: string
}

export interface PromoCategory {
  key: string
  label: string
}

export interface VipRebateTier {
  level: string
  sports: string
  liveCasino: string
  slots: string
  esports: string
  tableGames: string
  dailyCap: string
}

export interface VipBenefitTier {
  level: string
  turnover: string
  upgradeBonus: string
  monthlyRedPacket: string
  birthdayBonus: string
}

export interface PromotionItem {
  id: string
  slug: string
  title: string
  description: string
  category: string
  categories?: string[]
  'most-popular'?: boolean
  mostPopular?: boolean
  endDate?: string
  thumbnailType?: 'deposit' | 'spins' | 'rebate' | 'loss' | 'chest' | 'angpao' | 'sports' | 'basketball' | 'streak' | 'soccer' | 'live-casino' | 'referral' | 'profile' | 'vip' | 'giveaway' | 'camera'
  accentColor?: string
  badge?: string
  thumbnailImage?: string
  bannerImage?: PromoImages | string
  headerImage?: PromoImages | string
  innerIcon?: string
  innerPageIcon?: string
  seoTitle?: string
  seoDesc?: string
  seoDescription?: string
  imagePosition?: string
  showSaveBadge?: boolean
  countdownText?: string
  subtitle?: string
  badgeText?: string
  rate?: string
  /** Explicit payment currency codes (for example USD or BTC); empty means unassigned. */
  paymentMethods?: string[]
  isHot?: boolean
}

export interface PromoSection {
  id: string
  title: string
  category: string
  items: PromotionItem[]
}

export interface BonusQualification {
  label: string
  value: string
}

export interface BonusRequirement {
  text: string
  completed?: boolean
}

export interface BonusTableRow {
  [key: string]: string | number
}

export interface BonusTable {
  headerTitle?: string
  subHeaderTitle?: string
  introText?: string
  variant?: 'filled' | 'outline'
  accentColor?: string
  highlightColumns?: string[]
  rowSpans?: Record<string, number>
  columns: { key: string; label: string; icon?: string; width?: string }[]
  rows: BonusTableRow[]
  footnote?: string
}

export interface BonusDetail {
  id: string
  slug: string
  title: string
  subtitle: string
  period: string
  paymentMethods?: string[]
  bannerImage: PromoImages | string
  headerImage?: PromoImages | string
  thumbnailImage?: string
  innerIcon?: string
  innerPageIcon?: string
  seoTitle?: string
  seoDesc?: string
  seoDescription?: string
  iconType?: string
  accentColor?: string
  showRequirements?: boolean
  requirements?: {
    items: BonusRequirement[]
    viewProgressUrl?: string
  }
  qualifications: BonusQualification[]
  eventContent: {
    badge?: string
    description: string
    descriptionTone?: 'default' | 'white'
    vipRebates?: VipRebateTier[]
    vipBenefits?: VipBenefitTier[]
    tableHeading?: string
    descriptionParts?: Array<{
      text: string
      highlighted?: boolean
    }>
    linkedParagraphs?: Array<{
      parts: Array<{
        text: string
        href?: string
      }>
    }>
    methodCard?: {
      title: string
      content: string
    }
    callouts?: Array<{
      label: string
      badge?: string
    }>
    tierCards?: Array<{
      level: string
      turnover: string
      upgradeBonus: string
      monthlyRedPacket: string
      birthdayBonus: string
    }>
    paragraphs?: string[]
    tables?: BonusTable[]
    notes?: string[]
    afterTableParagraphs?: string[]
    bullets?: string[]
  }
  promotionTerms?: string[] | string
  rules: string[]
  rulesStyle?: 'bullets' | 'plain'
  withdrawalTerms?: string
  hasJoinButton?: boolean
  contentHtml?: string
}

export const PROMOTION_PLACEHOLDER_IMAGES = {
  header: '/images/promotions/promotion-placeholder-header.svg',
  banner: '/images/promotions/promotion-placeholder-banner.svg',
  thumbnail: '/images/promotions/promotion-placeholder-thumbnail.svg',
} as const

export const PROMO_IMAGE_MAP: Record<string, PromoImages> = {
  'share-and-earn': {
    header: '/images/promotions/share_and_earn_header.png',
    banner: '/images/promotions/share_and_earn.png',
    thumbnail: '/images/promotions/share_and_earn_thumb.png',
  },
  'vip-privileges': {
    header: '/images/promotions/usdt_vip_header.png',
    banner: '/images/promotions/usdt_vip.webp',
    thumbnail: '/images/promotions/usdt_vip_thumb.png',
  },
  'programa_vip': {
    header: '/images/promotions/programa_vip_header.png',
    banner: '/images/promotions/programa_vip.png',
    thumbnail: '/images/promotions/programa_vip_thumb.png',
  },
  'bonus_diario_de_recuperacao': {
    header: '/images/promotions/bonus_diario_de_recuperacao_header.png',
    banner: '/images/promotions/bonus_diario_de_recuperacao.png',
    thumbnail: '/images/promotions/bonus_diario_de_recuperacao_thumb.png',
  },
  'seu_primeiro_deposito': {
    header: '/images/promotions/seu_primeiro_deposito_header.png',
    banner: '/images/promotions/seu_primeiro_deposito.png',
    thumbnail: '/images/promotions/seu_primeiro_deposito_thumb.png',
  },
}

import bonusDetailDatabase from './bonus-details.json'

const SHARE_AND_EARN_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 24 24" fill="none" stroke="#019440" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 14-5v14L3 14z" fill="#019440"/><path d="m7 15 2 6H6l-2-7M20 8l2-1M20 16l2 1M21 12h2"/></svg>'

export const getPromoBannerUrl = (img?: PromoImages | string, slug?: string): string => {
  if (img) {
    if (typeof img === 'string') return img
    return img.banner || img.header || img.thumbnail
  }
  if (slug && PROMO_IMAGE_MAP[slug]) {
    return PROMO_IMAGE_MAP[slug].banner
  }
  return PROMOTION_PLACEHOLDER_IMAGES.banner
}

export const getPromoThumbnailUrl = (img?: PromoImages | string, slug?: string): string => {
  if (img) {
    if (typeof img === 'string') return img
    return img.thumbnail || img.banner || img.header
  }
  if (slug && PROMO_IMAGE_MAP[slug]) {
    return PROMO_IMAGE_MAP[slug].thumbnail
  }
  return PROMOTION_PLACEHOLDER_IMAGES.thumbnail
}

export const getPromoHeaderUrl = (img?: PromoImages | string, slug?: string): string => {
  if (img) {
    if (typeof img === 'string') return img
    return img.header || img.banner || img.thumbnail
  }
  if (slug && PROMO_IMAGE_MAP[slug]) {
    return PROMO_IMAGE_MAP[slug].header
  }
  return PROMOTION_PLACEHOLDER_IMAGES.header
}


export const PROMO_CATEGORIES: PromoCategory[] = [
  { key: 'all', label: 'All' },
  { key: 'most-popular', label: 'Most Popular' },
  { key: 'others', label: 'Others' },
]

const shareAndEarn = bonusDetailDatabase.records['share-and-earn']
const vipPrivileges = bonusDetailDatabase.records['vip-privileges']

export const PROMOTIONS: PromotionItem[] = [
  {
    id: shareAndEarn.id,
    slug: shareAndEarn.slug,
    title: shareAndEarn.title,
    description: shareAndEarn.subtitle,
    seoTitle: shareAndEarn.seoTitle,
    seoDesc: shareAndEarn.seoDesc,
    category: 'others',
    mostPopular: true,
    paymentMethods: [...shareAndEarn.paymentMethods],
    thumbnailType: 'referral',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['share-and-earn'],
    headerImage: PROMO_IMAGE_MAP['share-and-earn']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['share-and-earn']!.thumbnail,
    innerIcon: SHARE_AND_EARN_ICON,
    showSaveBadge: true,
  },
  {
    id: vipPrivileges.id,
    slug: vipPrivileges.slug,
    title: vipPrivileges.title,
    description: vipPrivileges.subtitle,
    seoTitle: vipPrivileges.seoTitle,
    seoDesc: vipPrivileges.seoDesc,
    category: 'others',
    mostPopular: true,
    paymentMethods: [...vipPrivileges.paymentMethods],
    thumbnailType: 'vip',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['vip-privileges'],
    headerImage: PROMO_IMAGE_MAP['vip-privileges']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['vip-privileges']!.thumbnail,
    innerIcon: SHARE_AND_EARN_ICON,
    showSaveBadge: false,
  },
]

export const PROMOTION_ITEMS = PROMOTIONS
export const FEATURED_PROMOTIONS: FeaturedPromo[] = [
  {
    id: 'vip-sports-rebate',
    slug: 'vip-sports-rebate',
    title: 'VIP Sports Rebate',
    rate: '1.5%',
    badgeText: 'VIP SPORTS REBATE 1.5%',
    category: 'SPORTS',
    bannerImage: '/images/promotions/homepage-v2/sports.webp',
    endDate: '',
    countdownText: '2 Month 10 Day',
    paymentMethods: ['maya', 'gcash'],
  },
  {
    id: 'vip-live-casino-rebate',
    slug: 'vip-live-casino-rebate',
    title: 'VIP Live Casino Rebate',
    rate: '1.0%',
    badgeText: 'VIP LIVE CASINO REBATE 1.0%',
    category: 'LIVE CASINO',
    bannerImage: '/images/promotions/homepage-v2/live-casino.webp',
    endDate: '',
    countdownText: '2 Month 10 Day',
    paymentMethods: ['maya', 'gcash'],
  },
  {
    id: 'slot-loss-rebate',
    slug: 'slot-loss-rebate',
    title: 'Slot Loss Rebate',
    rate: '₱60,000',
    badgeText: 'SLOT LOSS REBATE ₱60,000',
    category: 'SLOTS',
    bannerImage: '/images/promotions/homepage-v2/slots.webp',
    endDate: '',
    countdownText: '2 Month 10 Day',
    paymentMethods: ['maya', 'gcash'],
  },
  {
    id: 'lucky-rankings',
    slug: 'lucky-rankings',
    title: 'Lucky Rankings – Let\'s Meet on Payday!',
    rate: 'Rankings',
    badgeText: 'LUCKY RANKINGS',
    category: 'SLOTS',
    bannerImage: '/images/promotions/homepage-v2/rankings.webp',
    endDate: '',
    countdownText: '2 Month 10 Day',
    paymentMethods: ['maya', 'gcash'],
  },
  ...PROMOTIONS.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    slug: p.slug,
    category: p.category,
    paymentMethods: p.paymentMethods,
    thumbnailType: p.thumbnailType,
    accentColor: p.accentColor,
    bannerImage: p.bannerImage || PROMOTION_PLACEHOLDER_IMAGES.banner,
    headerImage: p.headerImage,
    thumbnailImage: p.thumbnailImage,
    showSaveBadge: p.showSaveBadge,
    countdownText: p.countdownText,
    endDate: p.endDate || '',
  })),
]

export const PROMOTION_SECTIONS: PromoSection[] = [
  {
    id: 'most-popular',
    title: 'Most Popular',
    category: 'most-popular',
    items: PROMOTIONS.filter(item => Boolean(item['most-popular'] || item.mostPopular)),
  },
  {
    id: 'others',
    title: 'Others',
    category: 'others',
    items: PROMOTIONS.filter(item => item.category === 'others'),
  },
]

type BonusDatabaseRecord = Omit<
  BonusDetail,
  'bannerImage' | 'headerImage' | 'thumbnailImage' | 'innerIcon' | 'innerPageIcon'
>

const hydrateBonusDetail = (record: BonusDatabaseRecord): BonusDetail => {
  const images = PROMO_IMAGE_MAP[record.slug] || PROMOTION_PLACEHOLDER_IMAGES
  return {
    ...record,
    bannerImage: images,
    headerImage: images.header,
    thumbnailImage: images.thumbnail,
    innerIcon: SHARE_AND_EARN_ICON,
  }
}

export const BONUS_DETAILS: Record<string, BonusDetail> = Object.fromEntries(
  Object.entries(bonusDetailDatabase.records).map(([slug, record]) => [
    slug,
    hydrateBonusDetail(record as BonusDatabaseRecord),
  ]),
)

const DEFAULT_BONUS_PERIOD = shareAndEarn.period

export const parseEndDateFromPeriod = (period?: string): string | undefined => {
  if (!period || period.trim().toLowerCase() === 'permanent') {
    return undefined
  }

  const tzMatch = period.match(/GMT([+-]\d{2}:\d{2})/i)
  const tzOffset = tzMatch?.[1] || '+08:00'
  const matches = [...period.matchAll(/(\d{4}-\d{2}-\d{2})(?:\s+(\d{2}:\d{2}(?::\d{2})?))?/g)]
  if (!matches.length) {
    return undefined
  }

  const endMatch = matches[matches.length - 1]
  const datePart = endMatch[1]
  const rawTimePart = endMatch[2] || '23:59:59'
  const timePart = rawTimePart.length === 5 ? `${rawTimePart}:00` : rawTimePart

  return `${datePart}T${timePart}${tzOffset}`
}

export const formatCountdownFromEndDate = (endDate?: string, nowMs: number = Date.now()): string => {
  if (!endDate || endDate === 'Permanent') {
    return 'Permanent'
  }

  const endMs = Date.parse(endDate)
  if (Number.isNaN(endMs)) {
    return 'Permanent'
  }

  const diffMs = endMs - nowMs
  if (diffMs <= 0) {
    return '0 Hours 0 Mins 0 Secs'
  }

  const dayMs = 86_400_000
  if (diffMs < dayMs) {
    const totalSeconds = Math.floor(diffMs / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours} Hours ${mins} Mins ${secs} Secs`
  }

  const totalDays = Math.floor(diffMs / dayMs)
  const months = Math.floor(totalDays / 30)
  const days = totalDays % 30

  if (months > 0) {
    return `${months} Month ${days} Day`
  }

  return `${days} Day`
}

export const getPromotionCountdownText = (
  promotion: Pick<PromotionItem, 'slug' | 'endDate' | 'countdownText'>,
  nowMs: number = Date.now(),
): string => {
  if (promotion.countdownText === 'Permanent') {
    return 'Permanent'
  }

  const period = BONUS_DETAILS[promotion.slug]?.period
  const endDate = parseEndDateFromPeriod(period) || promotion.endDate || parseEndDateFromPeriod(DEFAULT_BONUS_PERIOD)
  const formatted = formatCountdownFromEndDate(endDate, nowMs)
  return formatted === 'Permanent' ? 'Permanent' : `Event Countdown: ${formatted}`
}

for (const promotion of PROMOTIONS) {
  if (promotion.countdownText === 'Permanent') {
    promotion.endDate = undefined
    promotion.countdownText = 'Permanent'
    continue
  }

  const period = BONUS_DETAILS[promotion.slug]?.period || DEFAULT_BONUS_PERIOD
  const parsedEndDate = parseEndDateFromPeriod(period)
  if (parsedEndDate) {
    promotion.endDate = parsedEndDate
    promotion.countdownText = formatCountdownFromEndDate(parsedEndDate)
  }
}

/** Only active catalog entries have detail pages; retired offers have no fallback. */
export const getBonusDetail = (slugOrId: string): BonusDetail => {
  const promotion = PROMOTIONS.find(item => item.slug === slugOrId || item.id === slugOrId)
  const detail = promotion && BONUS_DETAILS[promotion.slug]
  if (!detail) throw new Error('Promotion not found')
  return detail
}
