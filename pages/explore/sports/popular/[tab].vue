<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()

interface TabMeta {
  label: string
  title: string
  description: string
}

const tabMetaMap: Record<string, TabMeta> = {
  league: {
    label: 'Leagues',
    title: 'Popular Sports Leagues — Live Odds & Matches | 2Bet',
    description: 'Bet on premier sports leagues worldwide at 2Bet Philippines. Real-time handicap lines, moneyline odds, and parlays across world-class tournaments.',
  },
  inplay: {
    label: 'In-Play Live',
    title: 'Popular In-Play Live Betting — Real-Time Odds | 2Bet',
    description: 'Place live in-play sports bets on top matches at 2Bet Philippines. Instant real-time odds updates, dynamic game stats, and fast bet cash-out 24/7.',
  },
  upcoming: {
    label: 'Upcoming',
    title: 'Popular Upcoming Sports Matches & Betting Odds | 2Bet',
    description: 'Check upcoming sports fixtures and early match schedules on 2Bet Philippines. Compare betting lines and point spreads for football, basketball, and more.',
  },
  'pre-match': {
    label: 'Pre-Match',
    title: 'Popular Pre-Match Sports Odds & Match Previews | 2Bet',
    description: 'Browse pre-match betting odds and match stats for major sports leagues on 2Bet Philippines. Lock in competitive lines before tipoff or kickoff.',
  },
  'smart-pick': {
    label: 'Smart Pick',
    title: 'Popular Smart Pick Sports AI Betting Insights | 2Bet',
    description: 'Explore AI-driven Smart Pick sports predictions and algorithmic tips at 2Bet Philippines. Boost your betting strategy with verified data insights.',
  },
  outright: {
    label: 'Outrights',
    title: 'Popular Championship Outrights & Futures Odds | 2Bet',
    description: 'Bet on championship outrights and tournament futures at 2Bet Philippines. Long-term betting odds for NBA champions, Premier League winners, and more.',
  },
}

const currentTab = computed(() => {
  const t = String(route.params.tab || 'league')
  return tabMetaMap[t] || {
    label: 'Matches',
    title: 'Popular Sports Betting Odds & Live Matches | 2Bet',
    description: 'Explore popular sports betting matches with competitive odds, live spreads, and moneyline wagers on the official 2Bet Philippines platform.',
  }
})

useAppSeo({
  title: computed(() => currentTab.value.title),
  description: computed(() => currentTab.value.description),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: currentTab.value.label, path: `/explore/sports/popular/${route.params.tab}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: currentTab.value.title.replace(' | 2Bet', ''),
    url: `https://2bet.com/explore/sports/popular/${route.params.tab}`,
    description: currentTab.value.description,
  })),
})

definePageMeta({
  validate: route => ['league', 'inplay', 'upcoming', 'pre-match', 'smart-pick', 'outright'].includes(String(route.params.tab)),
})
</script>

<template>
  <SportsPopular
    :selected-sports="selectedSports"
    :selected-tournaments="selectedTournaments"
  />
</template>
