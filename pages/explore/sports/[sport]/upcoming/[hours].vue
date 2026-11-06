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

const hoursLabel = computed(() => String(route.params.hours).replace('hours', ' Hours'))

useAppSeo({
  title: computed(() => `Upcoming ${sportName.value} Matches (Next ${hoursLabel.value}) Odds | 2Bet`),
  description: computed(() => `Find upcoming ${sportName.value} fixtures starting within the next ${hoursLabel.value} on 2Bet Philippines. Compare competitive match spreads, totals, and lines.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: 'Upcoming', path: `/explore/sports/${route.params.sport}/upcoming` },
    { name: hoursLabel.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Upcoming ${sportName.value} Matches (${hoursLabel.value}) - 2Bet`,
    url: `https://2bet.com${route.path}`,
    description: `Upcoming ${sportName.value} matches scheduled within the next ${hoursLabel.value} on 2Bet Philippines.`,
  })),
})

definePageMeta({
  validate: route => ['1hours', '3hours', '6hours', '12hours', '24hours'].includes(String(route.params.hours)),
})
</script>

<template>
  <SportsPopular :selected-sports="selectedSports" :selected-tournaments="selectedTournaments" initial-tab="upcoming" />
</template>
