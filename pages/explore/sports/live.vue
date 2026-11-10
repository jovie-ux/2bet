<script setup lang="ts">
import { computed } from 'vue'
import '~/assets/css/sports.css'
import MobileSportsNav from '~/components/sports/MobileSportsNav.vue'
import {
  buildBybetRedirectUrl,
  resolveSportsTabRedirectUrl,
} from '~/utils/sportsRedirect'

const route = useRoute()
const { locale, translate } = useSiteLocale()

useAppSeo({
  title: 'Apostas ao Vivo — Cotações em Tempo Real e Jogos | 2bet',
  description: 'Acompanhe partidas esportivas em tempo real com a 2bet Brasil. Mercados dinâmicos, atualização instantânea de odds e cash out rápido.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/sports/popular' },
    { name: 'Ao Vivo', path: '/sports/live' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Live Sports Betting - 2Bet',
    url: 'https://2bet.com/sports/live',
  },
})

const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const externalSiteUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const liveEsportsRedirectUrl = computed(() =>
  buildBybetRedirectUrl('sportEvents/liveGame/eSportBallGroup', rawRedirectUrl, bybetRedirectCode)
)

const liveTabs = [
  { key: 'all', label: 'All', icon: '', to: '/sports/live' },
  { key: 'basketball', label: '', icon: '/icons/sports/basketball.webp', to: '/sports/live/basketball' },
  { key: 'soccer', label: '', icon: '/icons/sports/soccer.webp', to: '/sports/live/soccer' },
  { key: 'tennis', label: '', icon: '/icons/sports/tennis.webp', to: '/sports/live/tennis' },
  { key: 'baseball', label: '', icon: '/icons/sports/baseball.webp', to: '/sports/live/baseball' },
  {
    key: 'esports',
    label: '',
    icon: '/icons/sports/egame.webp',
    to: liveEsportsRedirectUrl.value,
    external: true,
  },
]

const currentSport = computed(() => {
  const sportParam = String(route.params.sport || '').toLowerCase()
  if (sportParam && ['basketball', 'soccer', 'tennis', 'baseball'].includes(sportParam)) {
    return sportParam
  }
  return 'all'
})

const liveHeading = computed(() => {
  if (currentSport.value !== 'all') {
    const sportParam = currentSport.value
    const sportName = translate(sportParam.charAt(0).toUpperCase() + sportParam.slice(1))
    return locale.value === 'pt'
      ? `Apostas ao Vivo em ${sportName}`
      : `Live ${sportName} Betting`
  }
  return locale.value === 'pt'
    ? 'Apostas Esportivas ao Vivo'
    : 'Live Sports Betting'
})

const mobileModeTabs = [
  { key: 'league', label: 'League' },
  { key: 'inplay', label: 'In-Play' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'pre-match', label: 'Pre-Match' },
  { key: 'smart-pick', label: 'Parlay' },
  { key: 'outright', label: 'Outright' },
]

const isExternalModeTab = (key: string): boolean => key === 'smart-pick' || key === 'outright'

const mobileModePath = (key: string): string => {
  if (key === 'inplay') return route.path
  if (isExternalModeTab(key)) {
    const sport = currentSport.value === 'all' ? 'popular' : currentSport.value
    return resolveSportsTabRedirectUrl(sport, key, rawRedirectUrl, bybetRedirectCode) ?? externalSiteUrl
  }
  const sport = currentSport.value === 'all' ? 'popular' : currentSport.value
  return `/sports/${sport}/${key}`
}
</script>

<template>
  <section class="sports-page live-page">
    <h1 class="sr-only">{{ liveHeading }}</h1>
    <!-- Sports Tabs Navigation: Sport Ball Icons -->
    <div class="sticky-header-seal sticky top-[var(--content-sticky-top)] z-30 -mx-1 px-1 pb-1">
      <MobileSportsNav />
      <nav class="sports-tabs live-mobile-modes bg-[#1f1f1f]" aria-label="Sports categories">
        <NuxtLink
          v-for="tab in mobileModeTabs"
          :key="tab.key"
          :to="mobileModePath(tab.key)"
          :external="tab.key === 'smart-pick' || tab.key === 'outright'"
          :class="{ selected: tab.key === 'inplay' }"
          :aria-current="tab.key === 'inplay' ? 'page' : undefined"
        >
          {{ tab.label }}
        </NuxtLink>
      </nav>
      <nav
        class="sports-tabs live-sports-tabs bg-[#141414]"
        aria-label="Live sports categories"
      >
        <NuxtLink
          v-for="tab in liveTabs"
          :key="tab.key"
          :to="tab.to"
          :external="Boolean(tab.external)"
          :class="{ selected: currentSport === tab.key }"
          :aria-current="currentSport === tab.key ? 'page' : undefined"
        >
          <img
            v-if="tab.icon"
            :src="tab.icon"
            :alt="tab.label || tab.key"
            class="w-[24px] h-[24px] object-contain shrink-0"
          />
          <span v-if="tab.label">{{ tab.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Nested Route Content -->
    <NuxtPage />
  </section>
</template>

<style scoped>
.live-page {
  min-width: 0;
}

.live-page .live-mobile-modes { display: none; }

@media (max-width: 63.99rem) {
  .live-page .live-sports-tabs { display: none; }
  .live-page .live-mobile-modes { display: flex; }
}
</style>
