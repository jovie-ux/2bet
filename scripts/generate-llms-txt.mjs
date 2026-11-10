import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Auto-load .env from project root if present
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile()
  } else {
    const envPath = path.resolve(rootDir, '.env')
    const content = fs.readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let val = (match[2] || '').trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        if (process.env[key] === undefined) process.env[key] = val
      }
    }
  }
} catch {}

const siteUrl = String(process.env.SITE_URL || 'https://2bet.com').replace(/\/+$/, '')
const siteName = String(process.env.SITE_NAME || '2bet')

export function buildLlmsTxtContent(base = siteUrl, name = siteName) {
  return `# ${name}

> ${name} is a premier sports betting, live predictions, and online casino entertainment platform offering real-time in-play odds, expert tipster forecasts, slots, live casino tables, and comprehensive wagering guides.

## Core Betting & Gaming Products

- [Sports Betting & Live Odds](${base}/sports/live): Live in-play wagering, pre-match odds, handicap lines, and streaming for soccer, basketball, tennis, baseball, and esports.
- [Daily Expert Predictions](${base}/live-plaza/expert-predictions): High hit-rate verified tips, market predictions (1X2, Asian Handicap, Over/Under), and odds analysis for upcoming football and basketball matches.
- [Tipsters & Experts Directory](${base}/live-plaza/experts): Performance records, hit rates, win streaks, and historical statistics of 1,000+ prediction specialists.
- [Slots & E-Games Lobby](${base}/egames/slots): Over 2,300 slot titles, high RTP options, and new releases from PG Soft, Pragmatic Play, JDB, and Red Tiger.
- [Progressive Jackpots](${base}/egames/jackpot/all): Daily jackpot pools, live winner feeds, and provider jackpot trackers.
- [Live Casino Tables](${base}/entertainment/live-casino/baccarat): Real dealer baccarat, blackjack, roulette, and live game shows.
- [Promotions & Bonuses](${base}/bonuses): Welcome bonuses, first deposit incentives, sports cashback, and VIP rewards.

## Sports & Rules Documentation

- [General Sports Betting Rules](${base}/game-rules/sports-betting-rules): Wagering rules, void match criteria, and settlement policies.
- [Football Rules](${base}/game-rules/football): Full-time 90 minutes, extra time, handicap lines, and over/under total markets.
- [Basketball Rules](${base}/game-rules/basketball): Overtime rules, quarters, point spreads, and team totals.
- [Tennis Rules](${base}/game-rules/tennis): Player retirement terms, set handicaps, and game totals.
- [Parlays & Multiples](${base}/game-rules/parlays-multiples): Accumulator calculation rules, odds multipliers, and maximum payouts.
- [Cash Out Feature](${base}/game-rules/cash-out): Terms for early ticket cash-out before match completion.

## Tutorials & Walkthroughs

- [Platform Tutorials Hub](${base}/tutorial): Step-by-step interactive visual guides for new users.
- [Mock Betting Simulator](${base}/tutorial/mock-betting): Risk-free demo environment explaining betting tickets, odds calculations, and payouts.
- [Deposit Tutorial](${base}/tutorial/transactions/deposit): Guide on account funding, PIX instant transfers, and supported methods.
- [Withdrawal Tutorial](${base}/tutorial/transactions/withdraw): Verification procedures, payout limits, and settlement times.

## Trust, Safety & Compliance

- [About Us](${base}/about-us): Company background, operational security, and software standards.
- [Responsible Gaming](${base}/responsible-gaming): Safer gambling tools, deposit limits, self-exclusion, and player protection resources.
- [Terms of Use](${base}/terms-of-use): Platform usage terms, bonus rollover criteria, and customer rights.
- [Privacy Policy](${base}/privacy-policy): Personal data protection, encryption, and privacy compliance.
- [Help & Customer Support](${base}/help/contact-us): 24/7 customer service and live inquiry channels.

## Machine-Readable Resources

- [Full LLM Documentation](${base}/llms-full.txt): Expanded full-text reference designed for AI context windows.
- [Sitemap XML](${base}/sitemap.xml): Full XML sitemap covering all canonical pages.
- [Robots TXT](${base}/robots.txt): Search engine and crawler directives.
`
}

export function buildLlmsFullTxtContent(base = siteUrl, name = siteName) {
  const shortContent = buildLlmsTxtContent(base, name)
  return `${shortContent}
---

## Detailed Platform Reference

### 1. Daily Predictions Architecture
- Predictions are generated daily using upcoming schedules for basketball and football.
- Supported markets:
  - 1X2 (Match Winner / Draw)
  - Asian Handicap (AH with symmetric line comparisons)
  - Over / Under (Total points/goals)
- Each prediction is assigned a verified expert tipster from the 1,132 specialist roster based on the matching sport category.
- Hit rates are calibrated against model confidence and historical win streaks.

### 2. Transaction Guidelines
- Deposits: Processed instantly via automated payment rails with zero processing fees.
- Withdrawals: Protected by security verification to ensure secure user payouts.
- Currencies supported: BRL (Brazilian Real) and leading digital assets.

### 3. Customer Care & Responsible Wagering
- Self-imposed deposit, loss, and session limits are available directly within the player account settings.
- Underage gambling (<18) is strictly prohibited.
- Live chat support is available 24 hours a day, 7 days a week.
`
}

export async function generateLlmsFiles() {
  const publicDir = path.join(rootDir, 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const llmsContent = buildLlmsTxtContent(siteUrl, siteName)
  const llmsFullContent = buildLlmsFullTxtContent(siteUrl, siteName)

  // Write atomically to public/
  const publicLlmsPath = path.join(publicDir, 'llms.txt')
  const tempPublicLlmsPath = path.join(publicDir, `llms.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`)
  fs.writeFileSync(tempPublicLlmsPath, llmsContent, 'utf8')
  fs.renameSync(tempPublicLlmsPath, publicLlmsPath)

  const publicLlmsFullPath = path.join(publicDir, 'llms-full.txt')
  const tempPublicLlmsFullPath = path.join(publicDir, `llms-full.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`)
  fs.writeFileSync(tempPublicLlmsFullPath, llmsFullContent, 'utf8')
  fs.renameSync(tempPublicLlmsFullPath, publicLlmsFullPath)

  // Write to .output/public/ if build output directory exists
  const outputPublicDir = path.join(rootDir, '.output', 'public')
  let writtenToOutput = false
  if (fs.existsSync(outputPublicDir)) {
    const outputLlmsPath = path.join(outputPublicDir, 'llms.txt')
    const tempOutputLlmsPath = path.join(outputPublicDir, `llms.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`)
    fs.writeFileSync(tempOutputLlmsPath, llmsContent, 'utf8')
    fs.renameSync(tempOutputLlmsPath, outputLlmsPath)

    const outputLlmsFullPath = path.join(outputPublicDir, 'llms-full.txt')
    const tempOutputLlmsFullPath = path.join(outputPublicDir, `llms-full.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`)
    fs.writeFileSync(tempOutputLlmsFullPath, llmsFullContent, 'utf8')
    fs.renameSync(tempOutputLlmsFullPath, outputLlmsFullPath)
    writtenToOutput = true
  }

  console.log(`[llms.txt] Generated llms.txt & llms-full.txt for ${siteName} (${siteUrl})`)
  console.log(`[llms.txt] Saved to: ${publicLlmsPath}`)
  if (writtenToOutput) {
    console.log(`[llms.txt] Saved to: ${path.join(outputPublicDir, 'llms.txt')}`)
  }

  return {
    publicLlmsPath,
    publicLlmsFullPath,
    siteUrl,
  }
}

// Run directly if invoked from CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateLlmsFiles().catch((err) => {
    console.error('[llms.txt] Generation error:', err)
    process.exit(1)
  })
}
