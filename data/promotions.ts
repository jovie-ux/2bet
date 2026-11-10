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

export interface VipTableLabels {
  rate?: string
  liveCasino?: string
  unlimited?: string
  note?: string
  benefitsTitle?: string
  turnover?: string
  upgradeBonus?: string
  monthlyBonus?: string
  birthdayBonus?: string
}

export interface PromotionItem {
  id: string
  slug: string
  title: string
  description: string
  category?: string | string[]
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
  compact?: boolean
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
  language?: string
  period: string
  paymentMethods?: string[]
  bannerImage: PromoImages | string
  headerImage?: PromoImages | string
  thumbnailImage?: string
  /** Heading icon: an image path/URL or inline SVG markup, independent of currency. */
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
    vipTableVariant?: 'program'
    vipTableLabels?: VipTableLabels
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
    header: '/images/promotions/share_and_earn_header.webp',
    banner: '/images/promotions/share_and_earn.webp',
    thumbnail: '/images/promotions/share_and_earn_thumb.webp',
  },
  'vip-privileges': {
    header: '/images/promotions/usdt_vip_header.webp',
    banner: '/images/promotions/usdt_vip.webp',
    thumbnail: '/images/promotions/usdt_vip_thumb.webp',
  },
  'programa-vip': {
    header: '/images/promotions/programa_vip_header.webp',
    banner: '/images/promotions/programa_vip.webp',
    thumbnail: '/images/promotions/programa_vip_thumb.webp',
  },
  'bonus-diario-de-recuperacao': {
    header: '/images/promotions/bonus_diario_de_recuperacao_header.webp',
    banner: '/images/promotions/bonus_diario_de_recuperacao.webp',
    thumbnail: '/images/promotions/bonus_diario_de_recuperacao_thumb.webp',
  },
  'seu-primeiro-deposito': {
    header: '/images/promotions/seu_primeiro_deposito_header.webp',
    banner: '/images/promotions/seu_primeiro_deposito.webp',
    thumbnail: '/images/promotions/seu_primeiro_deposito_thumb.webp',
  },
}

import bonusDetailDatabase from './bonus-details.json' with { type: 'json' }

const DEFAULT_BONUS_ICON = '/icons/promotions/megaphone.svg'
const DEPOSIT_BONUS_ICON = '/icons/promotions/first-deposit.svg'

export const getBonusIcon = (record: Pick<BonusDetail, 'innerIcon' | 'innerPageIcon' | 'iconType'>): string =>
  record.innerIcon?.trim() || record.innerPageIcon?.trim()
  || (record.iconType === 'deposit' ? DEPOSIT_BONUS_ICON : DEFAULT_BONUS_ICON)

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
  { key: 'deposit', label: 'Deposit' },
  { key: 'sports', label: 'Sports' },
  { key: 'live-casino', label: 'Live Casino' },
  { key: 'slots', label: 'Slots' },
  { key: 'new-member', label: 'New Member' },
  { key: 'others', label: 'Others' },
]

export const getItemCategories = (item: PromotionItem): string[] => {
  const list: string[] = []
  if (Array.isArray(item.categories) && item.categories.length > 0) {
    list.push(...item.categories)
  } else if (Array.isArray(item.category)) {
    list.push(...item.category)
  } else if (typeof item.category === 'string' && item.category) {
    list.push(item.category)
  }
  if ((item.mostPopular || item['most-popular']) && !list.includes('most-popular')) {
    list.push('most-popular')
  }
  return [...new Set(list.map(c => c.trim().toLowerCase()))]
}

export const promotionHasCategory = (item: PromotionItem, categoryKey: string): boolean => {
  if (categoryKey === 'all') return true
  const list = getItemCategories(item)
  return list.includes(categoryKey.toLowerCase())
}

const shareAndEarn = bonusDetailDatabase.records['share-and-earn']
const vipPrivileges = bonusDetailDatabase.records['vip-privileges']
const vipProgram = bonusDetailDatabase.records['programa-vip']
const firstDeposit = bonusDetailDatabase.records['seu-primeiro-deposito']
const dailyRecovery = bonusDetailDatabase.records['bonus-diario-de-recuperacao']

export const PROMOTIONS: PromotionItem[] = [
  {
    id: vipProgram.id,
    slug: vipProgram.slug,
    title: vipProgram.title,
    description: vipProgram.subtitle,
    seoTitle: vipProgram.seoTitle,
    seoDesc: vipProgram.seoDesc,
    category: ['most-popular'],
    categories: ['most-popular'],
    mostPopular: true,
    paymentMethods: [...vipProgram.paymentMethods],
    thumbnailType: 'vip',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['programa-vip'],
    headerImage: PROMO_IMAGE_MAP['programa-vip']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['programa-vip']!.thumbnail,
    innerIcon: getBonusIcon(vipProgram),
    showSaveBadge: false,
  },
  {
    id: firstDeposit.id,
    slug: firstDeposit.slug,
    title: firstDeposit.title,
    description: firstDeposit.subtitle,
    seoTitle: firstDeposit.seoTitle,
    seoDesc: firstDeposit.seoDesc,
    category: ['most-popular', 'deposit', 'new-member', 'others'],
    categories: ['most-popular', 'deposit', 'new-member', 'others'],
    mostPopular: true,
    paymentMethods: [...firstDeposit.paymentMethods],
    thumbnailType: 'deposit',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['seu-primeiro-deposito'],
    headerImage: PROMO_IMAGE_MAP['seu-primeiro-deposito']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['seu-primeiro-deposito']!.thumbnail,
    innerIcon: getBonusIcon(firstDeposit),
    showSaveBadge: true,
  },
  {
    id: dailyRecovery.id,
    slug: dailyRecovery.slug,
    title: dailyRecovery.title,
    description: dailyRecovery.subtitle,
    seoTitle: dailyRecovery.seoTitle,
    seoDesc: dailyRecovery.seoDesc,
    category: ['slots', 'live-casino', 'sports', 'most-popular'],
    categories: ['slots', 'live-casino', 'sports', 'most-popular'],
    mostPopular: true,
    paymentMethods: [...dailyRecovery.paymentMethods],
    thumbnailType: 'rebate',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['bonus-diario-de-recuperacao'],
    headerImage: PROMO_IMAGE_MAP['bonus-diario-de-recuperacao']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['bonus-diario-de-recuperacao']!.thumbnail,
    innerIcon: getBonusIcon(dailyRecovery),
    showSaveBadge: true,
  },
  {
    id: shareAndEarn.id,
    slug: shareAndEarn.slug,
    title: shareAndEarn.title,
    description: shareAndEarn.subtitle,
    seoTitle: shareAndEarn.seoTitle,
    seoDesc: shareAndEarn.seoDesc,
    category: ['others', 'most-popular'],
    categories: ['others', 'most-popular'],
    mostPopular: true,
    paymentMethods: [...shareAndEarn.paymentMethods],
    thumbnailType: 'referral',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['share-and-earn'],
    headerImage: PROMO_IMAGE_MAP['share-and-earn']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['share-and-earn']!.thumbnail,
    innerIcon: getBonusIcon(shareAndEarn),
    showSaveBadge: true,
  },
  {
    id: vipPrivileges.id,
    slug: vipPrivileges.slug,
    title: vipPrivileges.title,
    description: vipPrivileges.subtitle,
    seoTitle: vipPrivileges.seoTitle,
    seoDesc: vipPrivileges.seoDesc,
    category: [ 'most-popular'],
    categories: ['most-popular', 'others'],
    mostPopular: true,
    paymentMethods: [...vipPrivileges.paymentMethods],
    thumbnailType: 'vip',
    accentColor: '#019440',
    bannerImage: PROMO_IMAGE_MAP['vip-privileges'],
    headerImage: PROMO_IMAGE_MAP['vip-privileges']!.header,
    thumbnailImage: PROMO_IMAGE_MAP['vip-privileges']!.thumbnail,
    innerIcon: getBonusIcon(vipPrivileges),
    showSaveBadge: false,
  },
]

export const PROMOTION_ITEMS = PROMOTIONS
export const FEATURED_PROMOTIONS: FeaturedPromo[] = [
  {
    id: 'seu-primeiro-deposito',
    slug: 'seu-primeiro-deposito',
    title: 'Seu Primeiro Depósito Vale Mais!',
    rate: 'Até R$ 10.000',
    badgeText: 'BÔNUS DE BOAS-VINDAS ATÉ R$ 10.000',
    category: 'DEPOSIT',
    bannerImage: '/images/promotions/seu_primeiro_deposito.webp',
    endDate: '',
    countdownText: 'Permanent',
    paymentMethods: ['BRL'],
  },
  {
    id: 'bonus-diario-de-recuperacao',
    slug: 'bonus-diario-de-recuperacao',
    title: dailyRecovery.title,
    rate: 'Até R$ 18.888',
    badgeText: 'RECUPERAÇÃO DIÁRIA ATÉ R$ 18.888',
    category: 'SLOTS',
    bannerImage: '/images/promotions/bonus_diario_de_recuperacao.webp',
    endDate: '2027-01-01T11:59:59+08:00',
    paymentMethods: [...dailyRecovery.paymentMethods],
  },
  {
    id: 'vip-privileges',
    slug: 'vip-privileges',
    title: 'Sistema de Privilégios VIP',
    rate: 'VIP0 ~ VIP10',
    badgeText: 'CASHBACK E BENEFÍCIOS EXCLUSIVOS',
    category: 'LIVE CASINO',
    bannerImage: '/images/promotions/programa_vip.webp',
    endDate: '',
    countdownText: 'Permanent',
    paymentMethods: ['USDT'],
  },
  {
    id: 'share-and-earn',
    slug: 'share-and-earn',
    title: 'Programa Compartilhe e Ganhe',
    rate: 'Comissões USDT',
    badgeText: 'COMPARTILHE E GANHE',
    category: 'RANKINGS',
    bannerImage: '/images/promotions/share_and_earn.webp',
    endDate: '',
    countdownText: 'Permanent',
    paymentMethods: ['USDT'],
  },
  ...PROMOTIONS.map(p => {
    const cats = getItemCategories(p).filter(c => c !== 'most-popular')
    const primaryCategory = cats[0] || getItemCategories(p)[0] || 'slots'
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      slug: p.slug,
      category: primaryCategory.toUpperCase(),
      paymentMethods: p.paymentMethods,
      thumbnailType: p.thumbnailType,
      accentColor: p.accentColor,
      bannerImage: p.bannerImage || PROMOTION_PLACEHOLDER_IMAGES.banner,
      headerImage: p.headerImage,
      thumbnailImage: p.thumbnailImage,
      showSaveBadge: p.showSaveBadge,
      countdownText: p.countdownText,
      endDate: p.endDate || '',
    }
  }),
]

export const PROMOTION_SECTIONS: PromoSection[] = PROMO_CATEGORIES
  .filter(category => category.key !== 'all')
  .map(category => ({
    id: category.key,
    title: category.label,
    category: category.key,
    items: PROMOTIONS.filter(item => promotionHasCategory(item, category.key)),
  }))

type BonusDatabaseRecord = Omit<
  BonusDetail,
  'bannerImage' | 'headerImage' | 'thumbnailImage'
>

const hydrateBonusDetail = (record: BonusDatabaseRecord): BonusDetail => {
  const images = PROMO_IMAGE_MAP[record.slug] || PROMOTION_PLACEHOLDER_IMAGES
  return {
    ...record,
    bannerImage: images,
    headerImage: images.header,
    thumbnailImage: images.thumbnail,
    innerIcon: getBonusIcon(record),
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
