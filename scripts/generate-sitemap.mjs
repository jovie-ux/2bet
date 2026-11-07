import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

function getSourceFilesForPath(baseDir, urlPath) {
  const resolve = (...p) => path.join(baseDir, ...p)
  if (urlPath === '/') return [resolve('pages/index.vue'), resolve('data/homepage.ts')]
  if (urlPath.startsWith('/explore/sports')) {
    return [resolve('data/sports.ts'), resolve('pages/explore/sports')]
  }
  if (urlPath.startsWith('/explore/bonus/')) {
    return [resolve('data/promotions.ts'), resolve('data/bonus-details.json'), resolve('pages/explore/bonus/[id].vue')]
  }
  if (urlPath.startsWith('/explore/bonuses')) {
    return [resolve('data/promotions.ts'), resolve('pages/explore/bonuses')]
  }
  if (urlPath.startsWith('/explore/egames/slots')) {
    return [resolve('data/slots.ts'), resolve('pages/explore/egames/slots')]
  }
  if (urlPath.startsWith('/explore/egames/jackpot')) {
    return [resolve('data/jackpot.ts'), resolve('pages/explore/egames/jackpot')]
  }
  if (urlPath.startsWith('/explore/egames/bingo')) {
    return [resolve('data/bingo.ts'), resolve('pages/explore/egames/bingo')]
  }
  if (urlPath.startsWith('/explore/entertainment/live-casino')) {
    return [resolve('data/live-casino.ts'), resolve('pages/explore/entertainment/live-casino')]
  }
  if (urlPath.startsWith('/game-rules/')) {
    const slug = urlPath.replace('/game-rules/', '')
    return [
      resolve(`data/${slug}.ts`),
      resolve(`data/${slug.replace('-rules', '')}-rules.ts`),
      resolve(`pages/game-rules/${slug}.vue`),
    ]
  }
  if (urlPath.startsWith('/tutorial')) {
    return [resolve('pages/tutorial.vue'), resolve('components/tutorial')]
  }
  if (urlPath === '/about-us') return [resolve('pages/about-us.vue')]
  if (urlPath === '/responsible-gaming') return [resolve('pages/responsible-gaming.vue'), resolve('pages/explore/help/responsible-gaming.vue')]
  if (urlPath === '/privacy-policy') return [resolve('pages/privacy-policy.vue'), resolve('pages/explore/legal/privacy-policy.vue')]
  if (urlPath === '/terms-of-use') return [resolve('pages/terms-of-use.vue'), resolve('pages/explore/legal/terms-of-service.vue')]
  if (urlPath === '/download-app') return [resolve('pages/download-app.vue')]
  if (urlPath === '/affiliate') return [resolve('pages/affiliate.vue')]
  if (urlPath.startsWith('/explore/help/')) return [resolve(`pages${urlPath}.vue`)]
  if (urlPath.startsWith('/explore/legal/')) return [resolve(`pages${urlPath}.vue`)]
  if (urlPath.startsWith('/explore/egames/customer-service')) return [resolve('pages/explore/egames/customer-service')]
  if (urlPath.startsWith('/explore/live-plaza')) return [resolve('pages/explore/live-plaza'), resolve('data/predictions.ts')]
  return [resolve(`pages${urlPath}.vue`)]
}

function computePathHash(baseDir, urlPath) {
  const files = getSourceFilesForPath(baseDir, urlPath)
  const hash = crypto.createHash('sha1')
  let foundAny = false

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const dirFiles = fs.readdirSync(filePath).sort()
      for (const f of dirFiles) {
        const sub = path.join(filePath, f)
        if (fs.existsSync(sub) && fs.statSync(sub).isFile()) {
          hash.update(f + ':' + fs.readFileSync(sub))
          foundAny = true
        }
      }
    } else if (stat.isFile()) {
      hash.update(path.basename(filePath) + ':' + fs.readFileSync(filePath))
      foundAny = true
    }
  }

  if (!foundAny) {
    hash.update(urlPath)
  }
  return hash.digest('hex')
}

export async function generateSitemapFile(customSiteUrl) {
  const siteUrl = (customSiteUrl || process.env.SITE_URL || 'https://2bet.com').replace(/\/+$/, '')
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
    { path: '/explore/entertainment/live-casino/baccarat', changefreq: 'daily', priority: 0.9 },

    // Sports Betting
    { path: '/explore/sports/popular/inplay', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/pre-match', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/popular/outright', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/live', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/live/basketball', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/live/soccer', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/live/tennis', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/live/baseball', changefreq: 'hourly', priority: 0.9 },
    { path: '/explore/sports/basketball/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/basketball/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/basketball/inplay', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/basketball/pre-match', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/soccer/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/soccer/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/soccer/pre-match', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/baseball/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/baseball/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/baseball/inplay', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/tennis/league', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/tennis/upcoming', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/tennis/inplay', changefreq: 'hourly', priority: 0.8 },
    { path: '/explore/sports/tennis/pre-match', changefreq: 'hourly', priority: 0.8 },


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
    { path: '/download-app', changefreq: 'weekly', priority: 0.8 },
    { path: '/affiliate', changefreq: 'monthly', priority: 0.7 },
    { path: '/explore/egames/customer-service', changefreq: 'monthly', priority: 0.6 },

    // Live Plaza
    { path: '/explore/live-plaza/home', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/live-plaza/streamer', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/live-plaza/expert-predictions', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/live-plaza/experts', changefreq: 'daily', priority: 0.7 },
    { path: '/explore/account/me', changefreq: 'yearly', priority: 0.1 },
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
  // for (const cat of bingoCategories) {
  //   if (cat.key && cat.key !== 'home') {
  //     entries.push({
  //       path: `/explore/egames/bingo/${cat.key}`,
  //       changefreq: 'daily',
  //       priority: 0.8,
  //     })
  //   }
  // }

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

  // Load existing sitemap dates and content hashes
  const datesFilePath = path.join(rootDir, 'data/sitemap-dates.json')
  let datesMap = {}
  try {
    if (fs.existsSync(datesFilePath)) {
      datesMap = JSON.parse(fs.readFileSync(datesFilePath, 'utf8'))
    }
  } catch (err) {
    console.warn('[sitemap] Failed to load data/sitemap-dates.json, re-initializing', err.message)
    datesMap = {}
  }

  let datesChanged = false
  for (const entry of uniqueEntries) {
    const currentHash = computePathHash(rootDir, entry.path)
    const existing = datesMap[entry.path]
    if (existing && existing.hash === currentHash && existing.lastmod) {
      entry.lastmod = existing.lastmod
    } else {
      entry.lastmod = today
      datesMap[entry.path] = {
        lastmod: today,
        hash: currentHash,
      }
      datesChanged = true
    }
  }

  if (datesChanged) {
    fs.writeFileSync(datesFilePath, JSON.stringify(datesMap, null, 2) + '\n', 'utf8')
    console.log('[sitemap] Updated data/sitemap-dates.json with latest modified dates')
  }

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

  // 1. Write to public/sitemap.xml atomically to prevent partial reads
  const publicDir = path.join(rootDir, 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  const publicPath = path.join(publicDir, 'sitemap.xml')
  const tempPublicPath = path.join(publicDir, `sitemap.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`)
  fs.writeFileSync(tempPublicPath, xml, 'utf8')
  fs.renameSync(tempPublicPath, publicPath)

  // 2. Write to .output/public/sitemap.xml atomically if build output exists
  const outputPublicDir = path.join(rootDir, '.output', 'public')
  let writtenToOutput = false
  if (fs.existsSync(outputPublicDir)) {
    const outputPath = path.join(outputPublicDir, 'sitemap.xml')
    const tempOutputPath = path.join(outputPublicDir, `sitemap.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`)
    fs.writeFileSync(tempOutputPath, xml, 'utf8')
    fs.renameSync(tempOutputPath, outputPath)
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

