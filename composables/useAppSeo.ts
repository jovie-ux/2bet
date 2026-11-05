import { computed, type ComputedRef } from 'vue'

export interface BreadcrumbItem {
  name: string
  path?: string
}

export interface AppSeoOptions {
  title: string | ComputedRef<string> | (() => string)
  description: string | ComputedRef<string> | (() => string)
  keywords?: string | ComputedRef<string> | (() => string)
  image?: string | ComputedRef<string> | (() => string)
  type?: 'website' | 'article'
  includeSiteName?: boolean | ComputedRef<boolean> | (() => boolean)
  withSiteName?: boolean | ComputedRef<boolean> | (() => boolean)
  includeCheckMore?: boolean | ComputedRef<boolean> | (() => boolean)
  siteName?: string | boolean | ComputedRef<string | boolean> | (() => string | boolean)
  breadcrumbs?: BreadcrumbItem[] | ComputedRef<BreadcrumbItem[]> | (() => BreadcrumbItem[])
  schema?: Record<string, any> | Record<string, any>[] | ComputedRef<any> | (() => any)
  robots?: string | ComputedRef<string> | (() => string)
}

const resolveVal = <T>(val: T | ComputedRef<T> | (() => T) | undefined): T | undefined => {
  if (val === undefined) return undefined
  if (typeof val === 'function') {
    return (val as () => T)()
  }
  if (val && typeof val === 'object' && 'value' in val) {
    return (val as ComputedRef<T>).value
  }
  return val as T
}

// Edit segment display names here to customize URL-based breadcrumb labels
const BREADCRUMB_SEGMENT_LABELS: Record<string, string> = {
  explore: 'Explore',
  egames: 'E-Games',
  entertainment: 'Entertainment',
  'live-casino': 'Live Casino',
  'live-plaza': 'Live Plaza',
  'customer-service': 'Customer Service',
  'max-rpt': 'Max RTP',
  'top-pick': 'Top Pick',
  inplay: 'In-Play',
  'pre-match': 'Pre-Match',
  'smart-pick': 'Smart Pick',
  jili: 'JILI',
  jdb: 'JDB',
  cq9: 'CQ9',
  fc: 'FC',
  vip: 'VIP',
  faq: 'FAQ',
}

const formatBreadcrumbSegment = (segment: string): string => {
  const decoded = decodeURIComponent(segment).trim()
  const lower = decoded.toLowerCase()
  if (BREADCRUMB_SEGMENT_LABELS[lower]) {
    return BREADCRUMB_SEGMENT_LABELS[lower]
  }
  return decoded
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const buildBreadcrumbsFromUrl = (routePath: string): BreadcrumbItem[] => {
  const cleanPath = (routePath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  if (cleanPath === '/') {
    return []
  }

  const segments = cleanPath.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = [{ name: 'Home', path: '/' }]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    items.push({
      name: formatBreadcrumbSegment(segment),
      path: currentPath,
    })
  }

  return items
}

const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const formatSeoTitle = (
  rawTitle: string | undefined,
  siteName: string,
  includeSiteName: boolean = true,
): string => {
  const cleanSiteName = (siteName || 'ByBet Slots').trim().replace(/^['"]+|['"]+$/g, '')
  const raw = (rawTitle || '').trim()
  if (!raw) {
    return cleanSiteName
  }

  if (!includeSiteName) {
    return raw
  }

  const escapedSite = escapeRegExp(cleanSiteName)
  const trailingBrandRegex = new RegExp(
    `\\s*\\|\\s*(?:${escapedSite}(?:\\s+[^|]*)?|ByBet(?:\\s+[^|]*)?)\\s*$`,
    'i',
  )
  const baseTitle = raw.replace(trailingBrandRegex, '').trim()

  if (!baseTitle || baseTitle.toLowerCase() === cleanSiteName.toLowerCase()) {
    return cleanSiteName
  }

  return `${baseTitle} | ${cleanSiteName}`
}

export const isHomepageRoute = (routePath?: string): boolean => {
  const cleanPath = (routePath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  return cleanPath === '/'
}

export const formatSeoDescription = (
  rawDescription: string | undefined,
  siteName: string,
  isHomepage: boolean = false,
  includeCheckMore: boolean = !isHomepage,
): string => {
  const cleanSiteName = (siteName || 'ByBet Slots').trim().replace(/^['"]+|['"]+$/g, '')
  const raw = (rawDescription || '').trim()
  const fallback = `${cleanSiteName} — Premier Online Gaming, Live Casino, Sports Betting, and Slots in the Philippines.`
  const base = raw || fallback

  if (!includeCheckMore || isHomepage) {
    return base
  }

  const suffix = `check more at ${cleanSiteName}`
  const escapedSuffix = escapeRegExp(suffix)
  if (new RegExp(escapedSuffix, 'i').test(base)) {
    return base
  }

  const separator = /[.!?]$/.test(base) ? ' ' : '. '
  return `${base}${separator}${suffix}`
}

export const useAppSeo = (options: AppSeoOptions) => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const isHomepage = computed(() => isHomepageRoute(route.path))

  const siteName = computed(() => {
    const custom = resolveVal(options.siteName)
    if (typeof custom === 'string' && custom.trim()) {
      return custom.trim().replace(/^['"]+|['"]+$/g, '')
    }
    return String(config.public.siteName || 'ByBet Slots')
      .trim()
      .replace(/^['"]+|['"]+$/g, '')
  })
  const siteUrl = computed(() => String(config.public.siteUrl || 'https://bybet.com').replace(/\/+$/, ''))

  const shouldIncludeSiteName = computed(() => {
    const optSiteName = resolveVal(options.siteName)
    if (optSiteName === false) return false
    const inc = resolveVal(options.includeSiteName)
    if (typeof inc === 'boolean') return inc
    const withName = resolveVal(options.withSiteName)
    if (typeof withName === 'boolean') return withName
    // Default: false on homepage ('/'), true everywhere else
    return !isHomepage.value
  })

  const shouldIncludeCheckMore = computed(() => {
    const custom = resolveVal(options.includeCheckMore)
    if (typeof custom === 'boolean') return custom
    return !isHomepage.value
  })

  const title = computed(() => {
    const raw = resolveVal(options.title)
    return formatSeoTitle(raw, siteName.value, shouldIncludeSiteName.value)
  })

  const description = computed(() => {
    const raw = resolveVal(options.description)
    return formatSeoDescription(
      raw,
      siteName.value,
      isHomepage.value,
      shouldIncludeCheckMore.value,
    )
  })

  const keywords = computed(() => {
    return (
      resolveVal(options.keywords) ||
      `${siteName.value}, sports betting, online casino, slots, live casino, Philippines gaming`
    )
  })

  const image = computed(() => {
    return resolveVal(options.image) || '/brand/2bet-logo.webp'
  })

  const canonicalUrl = computed(() => {
    const p = route.path || '/'
    return `${siteUrl.value}${p}`
  })

  const defaultRobots = computed(() => {
    return config.public.indexFollow ? 'index, follow' : 'noindex, nofollow'
  })

  const robots = computed(() => {
    const custom = resolveVal(options.robots)
    if (typeof custom === 'string' && custom.trim()) {
      return custom.trim()
    }
    return defaultRobots.value
  })

  useSeoMeta({
    title,
    ogTitle: title,
    ogSiteName: siteName,
    twitterTitle: title,
    description,
    ogDescription: description,
    twitterDescription: description,
    keywords,
    ogImage: image,
    twitterImage: image,
    twitterCard: 'summary_large_image',
    ogType: options.type || 'website',
    robots,
  })

  useHead(() => {
    const scripts: Array<{ key: string; type: string; children: string }> = []

    // Always follow the current URL path as the single BreadcrumbList schema
    const urlBreadcrumbs = buildBreadcrumbsFromUrl(route.path)
    if (urlBreadcrumbs.length > 0) {
      const itemListElement = urlBreadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.path
          ? item.path.startsWith('http')
            ? item.path
            : `${siteUrl.value}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
          : `${siteUrl.value}${route.path}`,
      }))

      scripts.push({
        key: 'schema-breadcrumb',
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement,
        }),
      })
    }

    const customSchema = resolveVal(options.schema)
    if (customSchema) {
      const schemaList = Array.isArray(customSchema) ? customSchema : [customSchema]
      schemaList
        .filter((s) => s && s['@type'] !== 'BreadcrumbList')
        .forEach((s, index) => {
          const schemaType = typeof s['@type'] === 'string' ? s['@type'].toLowerCase() : `item-${index}`
          scripts.push({
            key: `schema-custom-${schemaType}-${index}`,
            type: 'application/ld+json',
            children: JSON.stringify(s),
          })
        })
    }

    return {
      link: [
        {
          key: 'canonical',
          rel: 'canonical',
          href: canonicalUrl.value,
        },
      ],
      script: scripts,
    }
  })
}

