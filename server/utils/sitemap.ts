import path from 'node:path'
import { PROMOTIONS } from '~/data/promotions'
import { SLOT_CATEGORIES } from '~/data/slots'
import { LIVE_CASINO_CATEGORIES } from '~/data/live-casino'
import { BINGO_CATEGORIES } from '~/data/bingo'
import { JACKPOT_SECTIONS } from '~/data/jackpot'

function getSitemapDates(): Record<string, { lastmod?: string; hash?: string }> {
  try {
    const proc = (globalThis as any).process
    const fsMod = typeof proc?.getBuiltinModule === 'function' ? proc.getBuiltinModule('fs') : null
    const datesPath = path.resolve(process.cwd(), 'data/sitemap-dates.json')
    if (fsMod && fsMod.existsSync(datesPath)) {
      return JSON.parse(fsMod.readFileSync(datesPath, 'utf8'))
    }
  } catch {
    // Graceful fallback if file does not exist or cannot be parsed
  }
  return {}
}

export interface SitemapEntry {
  path: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  lastmod?: string
}

export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    // Core Homepage
    { path: '/', changefreq: 'daily', priority: 1.0 },

    // Primary E-Games & Casino Lobbies
    { path: '/egames/slots', changefreq: 'daily', priority: 0.9 },
    { path: '/egames/jackpot/all', changefreq: 'daily', priority: 0.9 },
    { path: '/entertainment/live-casino/baccarat', changefreq: 'daily', priority: 0.9 },

    // Sports Betting
    { path: '/sports/popular/inplay', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/popular/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/popular/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/popular/pre-match', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/popular/outright', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/live', changefreq: 'hourly', priority: 0.9 },
    { path: '/sports/basketball', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/soccer', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/baseball', changefreq: 'hourly', priority: 0.8 },
    { path: '/sports/tennis', changefreq: 'hourly', priority: 0.8 },

    // Promotions & Bonuses
    { path: '/bonuses', changefreq: 'daily', priority: 0.8 },
    { path: '/bonuses/most-popular', changefreq: 'daily', priority: 0.8 },
    { path: '/bonuses/slots', changefreq: 'daily', priority: 0.8 },
    { path: '/bonuses/live-casino', changefreq: 'daily', priority: 0.8 },
    { path: '/bonuses/sports', changefreq: 'daily', priority: 0.8 },
    { path: '/bonuses/others', changefreq: 'daily', priority: 0.8 },
    { path: '/bonuses/deposit', changefreq: 'weekly', priority: 0.7 },
    { path: '/bonuses/new-member', changefreq: 'weekly', priority: 0.7 },
    { path: '/bonuses/terms-and-condition', changefreq: 'monthly', priority: 0.5 },

    // Game Rules
    { path: '/game-rules/sports-betting-rules', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/football', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/basketball', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/tennis', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/baseball', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/badminton', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/table-tennis', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/parlays-multiples', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/cash-out', changefreq: 'monthly', priority: 0.7 },
    { path: '/game-rules/outright', changefreq: 'monthly', priority: 0.7 },

    // Tutorials
    { path: '/tutorial', changefreq: 'monthly', priority: 0.7 },
    { path: '/tutorial/mock-betting', changefreq: 'monthly', priority: 0.7 },
    { path: '/tutorial/transactions/deposit', changefreq: 'monthly', priority: 0.7 },
    { path: '/tutorial/transactions/withdraw', changefreq: 'monthly', priority: 0.7 },

    // Trust, Compliance & Legal
    { path: '/about-us', changefreq: 'monthly', priority: 0.7 },
    { path: '/responsible-gaming', changefreq: 'monthly', priority: 0.7 },
    { path: '/privacy-policy', changefreq: 'monthly', priority: 0.6 },
    { path: '/terms-of-use', changefreq: 'monthly', priority: 0.6 },
    { path: '/download-app', changefreq: 'weekly', priority: 0.8 },
    { path: '/affiliate', changefreq: 'monthly', priority: 0.7 },
    { path: '/help/contact-us', changefreq: 'monthly', priority: 0.6 },
    { path: '/legal/general-terms', changefreq: 'monthly', priority: 0.6 },
    { path: '/legal/cookie-policy', changefreq: 'monthly', priority: 0.6 },
    { path: '/egames/customer-service', changefreq: 'monthly', priority: 0.6 },

    // Live Plaza
    { path: '/live-plaza/home', changefreq: 'daily', priority: 0.7 },
    { path: '/live-plaza/streamer/all', changefreq: 'daily', priority: 0.7 },
    { path: '/live-plaza/expert-predictions', changefreq: 'daily', priority: 0.7 },
    { path: '/live-plaza/experts', changefreq: 'daily', priority: 0.7 },
  ]

  // Dynamic Slot Categories
  for (const cat of SLOT_CATEGORIES) {
    if (cat.key && cat.key !== 'home') {
      entries.push({
        path: `/egames/slots/${cat.key}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Jackpot Providers
  for (const section of JACKPOT_SECTIONS) {
    if (section.id && section.id !== 'all') {
      entries.push({
        path: `/egames/jackpot/${section.id}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Bingo Categories
  for (const cat of BINGO_CATEGORIES) {
    if (cat.key && cat.key !== 'home') {
      entries.push({
        path: `/egames/bingo/${cat.key}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Live Casino Categories
  for (const cat of LIVE_CASINO_CATEGORIES) {
    if (cat.key && cat.key !== 'baccarat') {
      entries.push({
        path: `/entertainment/live-casino/${cat.key}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Individual Bonus & Promotion Pages
  for (const promo of PROMOTIONS) {
    if (promo.id) {
      entries.push({
        path: `/bonus/${promo.id}`,
        changefreq: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Deduplicate entries by path
  const seen = new Set<string>()
  const sitemapDates = getSitemapDates()
  return entries
    .filter((entry) => {
      if (seen.has(entry.path)) return false
      seen.add(entry.path)
      return true
    })
    .map((entry) => ({
      ...entry,
      lastmod: entry.lastmod || sitemapDates[entry.path]?.lastmod || sitemapDates[`/explore${entry.path}`]?.lastmod,
    }))
}

export function generateSitemapXml(siteUrl: string, currentDate?: string): string {
  const normalizedSiteUrl = (siteUrl || 'https://2bet.com').replace(/\/+$/, '')
  const today = currentDate || new Date().toISOString().split('T')[0]
  const entries = getSitemapEntries()

  const xmlEntries = entries
    .map((entry) => {
      const loc = `${normalizedSiteUrl}${entry.path}`
      const lastmod = entry.lastmod || today
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`
}

