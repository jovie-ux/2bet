import { defineNuxtConfig } from 'nuxt/config'

const processGlobal = (
  globalThis as typeof globalThis & {
    process?: {
      argv?: string[]
      env?: {
        NODE_ENV?: string
        SPORTS_API?: string
        SPORTS_API_KEY?: string
        USE_ODDS_API?: string
        KADARIO_API?: string
        BYBET_REDIRECT_URL?: string
        BYBET_REDIRECT_CODE?: string
        SITE_NAME?: string
        SITE_URL?: string
        INDEX_FOLLOW?: string
        LIVESTREAM_API?: string
        INPLAY_API?: string
      }
    }
  }
).process

const environment = processGlobal?.env
const isPrepare = Boolean(processGlobal?.argv?.some(arg => arg.includes('prepare')))

const isIndexFollow = environment?.INDEX_FOLLOW === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  buildDir: environment?.NODE_ENV === 'production' && !isPrepare ? 'node_modules/.cache/2bet-nuxt-build' : '.nuxt',
  devtools: { enabled: false },
  runtimeConfig: {
    oddsApi: environment?.SPORTS_API || 'https://api.the-odds-api.com/v4',
    oddsApiKey: environment?.SPORTS_API_KEY || '',
    useOddsApi: environment?.USE_ODDS_API === 'true',
    public: {
      useOddsApi: environment?.USE_ODDS_API === 'true',
      bybetRedirectUrl: (environment?.BYBET_REDIRECT_URL || 'https://bybet.com').replace(/\/+$/, ''),
      bybetRedirectCode: environment?.BYBET_REDIRECT_CODE || 'xjSD',
      siteName: environment?.SITE_NAME || '2bet',
      siteUrl: (environment?.SITE_URL || 'https://2bet.com').replace(/\/+$/, ''),
      indexFollow: isIndexFollow,
    },
    kadarioApi: environment?.KADARIO_API || 'https://live88.eu.cc/',
    kadarioSite: 'YBa-BnymZ6iN8pkfAUFTWIKn',
    inplayApi: environment?.INPLAY_API || 'https://live88.eu.cc/api/v1/scores?site=YBa-BnymZ6iN8pkfAUFTWIKn',
    livestreamApi: environment?.LIVESTREAM_API || 'https://live88.eu.cc/api/v1/scores?site=YBa-BnymZ6iN8pkfAUFTWIKn',
  },
  modules: ['@nuxtjs/tailwindcss'],
  hooks: {
    'pages:extend'(pages) {
      const extraPages: any[] = []
      for (const page of pages) {
        if (page.path && page.path.startsWith('/explore')) {
          const cleanPath = page.path.replace(/^\/explore/, '') || '/'
          extraPages.push({
            ...page,
            name: page.name ? `${page.name}__clean` : undefined,
            path: cleanPath,
          })
        }
      }
      pages.push(...extraPages)
    },
  },
  nitro: {
    hooks: {
      compiled: async (nitro) => {
        try {
          const { generateSitemapFile } = await import('./scripts/generate-sitemap.mjs')
          await generateSitemapFile(nitro.options.runtimeConfig?.public?.siteUrl)
        } catch (e) {
          console.warn('[sitemap] Build hook warning:', e)
        }
      },
    },
  },
  css: [
    '@fontsource/manrope/latin-400.css',
    '@fontsource/manrope/latin-500.css',
    '@fontsource/manrope/latin-600.css',
    '@fontsource/manrope/latin-700.css',
    '@fontsource/manrope/latin-800.css',
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'pt' },
      meta: [
        { name: 'theme-color', content: '#080D0B' },
        {
          name: 'robots',
          content: isIndexFollow ? 'index, follow' : 'noindex, nofollow',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.webp' },
      ],
    },
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
})
