<script setup lang="ts">
import { computed } from 'vue'
import '~/assets/css/sports.css'
import MobileSportsNav from '~/components/sports/MobileSportsNav.vue'

const route = useRoute()

useAppSeo({
  title: 'Live In-Play Sports Betting — Real-Time Odds | 2Bet',
  description: 'Bet live in-play on ongoing football, basketball, tennis, and esports matches at 2Bet Philippines. Instant odds updates, live scores, and fast cash out.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: 'Live In-Play', path: '/explore/sports/live' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Live Sports Betting - 2Bet',
    url: 'https://2bet.com/explore/sports/live',
  },
})

const liveTabs = [
  { key: 'all', label: 'All', icon: '', to: '/explore/sports/live' },
  { key: 'basketball', label: '', icon: '/icons/sports/basketball.webp', to: '/explore/sports/live/basketball' },
  { key: 'soccer', label: '', icon: '/icons/sports/soccer.webp', to: '/explore/sports/live/soccer' },
  { key: 'tennis', label: '', icon: '/icons/sports/tennis.webp', to: '/explore/sports/live/tennis' },
  { key: 'baseball', label: '', icon: '/icons/sports/baseball.webp', to: '/explore/sports/live/baseball' },
]

const currentSport = computed(() => {
  const sportParam = String(route.params.sport || '').toLowerCase()
  if (sportParam && ['basketball', 'soccer', 'tennis', 'baseball'].includes(sportParam)) {
    return sportParam
  }
  return 'all'
})

const mobileModeTabs = [
  { key: 'league', label: 'League' },
  { key: 'inplay', label: 'In-Play' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'pre-match', label: 'Pre-Match' },
  { key: 'smart-pick', label: 'Parlay' },
  { key: 'outright', label: 'Outright' },
]
const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl
const mobileModePath = (key: string): string => {
  if (key === 'inplay') return route.path
  if (key === 'smart-pick' || key === 'outright') return externalSiteUrl
  const sport = currentSport.value === 'all' ? 'popular' : currentSport.value
  return `/explore/sports/${sport}/${key}`
}
</script>

<template>
  <section class="sports-page live-page">
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
          :class="{ selected: currentSport === tab.key }"
          :aria-current="currentSport === tab.key ? 'page' : undefined"
        >
          <img
            v-if="tab.icon"
            :src="tab.icon"
            :alt="tab.label"
            class="w-[24px] h-[24px] object-contain shrink-0"
          />
          <span>{{ tab.label }}</span>
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
