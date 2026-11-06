import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

export async function generateSitemapFile(customSiteUrl) {
  const siteUrl = (customSiteUrl || process.env.SITE_URL || 'https://bybet.com').replace(/\/+$/, '')
  const today = new Date().toISOString().split('T')[0]

  const jiti = createJiti(import.meta.url, {
    alias: {
      '~': rootDir,
      '@': rootDir,
    },
  })

  let promotions = []
  try {
    const mod = jiti(path.join(rootDir, 'data/promotions.ts'))
    promotions = mod.PROMOTIONS || []
  } catch (err) {
    console.warn('[sitemap] Failed to load data/promotions.ts with jiti, using fallback', err.message)
  }

  let slotCategories = []
  try {
    const mod = jiti(path.join(rootDir, 'data/slots.ts'))
    slotCategories = mod.SLOT_CATEGORIES || []
  } catch (err) {
    console.warn('[sitemap] Failed to load data/slots.ts with jiti, using fallback', err.message)
  }

  let liveCasinoCategories = []
  try {
    const mod = jiti(path.join(rootDir, 'data/live-casino.ts'))
    liveCasinoCategories = mod.LIVE_CASINO_CATEGORIES || []
  } catch (err) {
    console.warn('[sitemap] Failed to load data/live-casino.ts with jiti, using fallback', err.message)
  }

  let bingoCategories = []
  try {
    const mod = jiti(path.join(rootDir, 'data/bingo.ts'))
    bingoCategories = mod.BINGO_CATEGORIES || []
  } catch (err) {
    console.warn('[sitemap] Failed to load data/bingo.ts with jiti, using fallback', err.message)
  }

  let jackpotSections = []
  try {
    const mod = jiti(path.join(rootDir, 'data/jackpot.ts'))
    jackpotSections = mod.JACKPOT_SECTIONS || []
  } catch (err) {
    console.warn('[sitemap] Failed to load data/jackpot.ts with jiti, using fallback', err.message)
  }

  const entries = [
    // Core Homepage
    { path: '/', changefreq: 'daily', priority: 1.0 },

    // Primary E-Games & Casino Lobbies
    { path: '/explore/egames/slots', changefreq: 'daily', priority: 0.9 },
    { path: '/explore/egames/jackpot/all', changefreq: 'daily', priority: 0.9 },
    { path: '/explore/egames/bingo', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/entertainment/live-casino/baccarat', changefreq: 'daily', priority: 0.9 },
    { path: '/explore/entertainment/gaming', changefreq: 'weekly', priority: 0.7 },
    { path: '/explore/entertainment/lottery', changefreq: 'weekly', priority: 0.7 },

    // Sports Betting
    { path: '/explore/sports/popular', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/popular/inplay', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/pre-match', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/outright', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/live', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/basketball', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/soccer', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/baseball', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/tennis', changefreq: 'hourly', priority: 0.8 },

    // Promotions & Bonuses
    { path: '/explore/bonuses', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/bonuses/most-popular', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/bonuses/slots', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/bonuses/live-casino', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/bonuses/sports', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/bonuses/others', changefreq: 'daily', priority: 0.8 },
    { path: '/explore/bonuses/deposit', changefreq: 'weekly', priority: 0.7 },
    { path: '/explore/bonuses/terms-and-condition', changefreq: 'monthly', priority: 0.5 },

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
    { path: '/explore/help/contact-us', changefreq: 'monthly', priority: 0.6 },
    { path: '/explore/legal/general-terms', changefreq: 'monthly', priority: 0.6 },
    { path: '/explore/legal/cookie-policy', changefreq: 'monthly', priority: 0.6 },
    { path: '/explore/egames/customer-service', changefreq: 'monthly', priority: 0.6 },

    // Live Plaza
    { path: '/explore/live-plaza/home', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/live-plaza/streamer/all', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/live-plaza/expert-predictions', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/live-plaza/experts', changefreq: 'daily', priority: 0.7 },
  ]

  // Dynamic Slot Categories
  for (const cat of slotCategories) {
    if (cat.key && cat.key !== 'home') {
      entries.push({
        path: `/explore/egames/slots/${cat.key}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Jackpot Providers
  for (const section of jackpotSections) {
    if (section.id && section.id !== 'all') {
      entries.push({
        path: `/explore/egames/jackpot/${section.id}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Bingo Categories
  for (const cat of bingoCategories) {
    if (cat.key && cat.key !== 'home') {
      entries.push({
        path: `/explore/egames/bingo/${cat.key}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Live Casino Categories
  for (const cat of liveCasinoCategories) {
    if (cat.key && cat.key !== 'baccarat') {
      entries.push({
        path: `/explore/entertainment/live-casino/${cat.key}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    }
  }

  // Dynamic Individual Bonus & Promotion Pages
  for (const promo of promotions) {
    if (promo.id) {
      entries.push({
        path: `/explore/bonus/${promo.id}`,
        changefreq: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Deduplicate entries by path
  const seen = new Set()
  const uniqueEntries = entries.filter((entry) => {
    if (seen.has(entry.path)) return false
    seen.add(entry.path)
    return true
  })

  const xmlEntries = uniqueEntries
    .map((entry) => {
      const loc = `${siteUrl}${entry.path}`
      const lastmod = entry.lastmod || today
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`

  // 1. Write to public/sitemap.xml
  const publicDir = path.join(rootDir, 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  const publicPath = path.join(publicDir, 'sitemap.xml')
  fs.writeFileSync(publicPath, xml, 'utf8')

  // 2. Write to .output/public/sitemap.xml if build output exists
  const outputPublicDir = path.join(rootDir, '.output', 'public')
  let writtenToOutput = false
  if (fs.existsSync(outputPublicDir)) {
    const outputPath = path.join(outputPublicDir, 'sitemap.xml')
    fs.writeFileSync(outputPath, xml, 'utf8')
    writtenToOutput = true
  }

  console.log(`[sitemap] Generated sitemap.xml with ${uniqueEntries.length} URLs for ${siteUrl}`)
  console.log(`[sitemap] Saved to: ${publicPath}`)
  if (writtenToOutput) {
    console.log(`[sitemap] Saved to: ${path.join(outputPublicDir, 'sitemap.xml')}`)
  }

  return {
    count: uniqueEntries.length,
    siteUrl,
    publicPath,
  }
}

// Run directly if invoked from CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateSitemapFile().catch((err) => {
    console.error('[sitemap] Generation error:', err)
    process.exit(1)
  })
}

