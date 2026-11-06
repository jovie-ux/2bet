<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()

const sportName = computed(() => {
  const s = String(route.params.sport || 'sports')
  return s.charAt(0).toUpperCase() + s.slice(1)
})

const tournamentName = computed(() => {
  const t = String(route.params.tournament || '')
  return t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

useAppSeo({
  title: computed(() => `${tournamentName.value} Odds & Lines — ${sportName.value} | 2Bet`),
  description: computed(() => `Bet on ${tournamentName.value} with competitive ${sportName.value} odds at 2Bet Philippines. Pre-match lines, moneylines, spreads, over/under totals, and live markets.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: tournamentName.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tournamentName.value} ${sportName.value} Betting - 2Bet`,
    url: `https://2bet.com${route.path}`,
    description: `Bet on ${tournamentName.value} ${sportName.value} at 2Bet Philippines with competitive betting odds and live lines.`,
  })),
})

definePageMeta({
  validate: (route) => {
    return ['basketball', 'soccer', 'tennis', 'baseball'].includes(String(route.params.sport))
      && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(route.params.tournament))
  },
})
</script>

<template>
  <SportsPopular
    :selected-sports="selectedSports"
    :selected-tournaments="selectedTournaments"
  />
</template>
