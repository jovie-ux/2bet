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

useAppSeo({
  title: computed(() => `${sportName.value} Pre-Match Betting Odds for ${route.params.date} | 2Bet`),
  description: computed(() => `Browse pre-match ${sportName.value} betting odds for fixtures scheduled on ${route.params.date} at 2Bet Philippines. Analyze matchup stats and lock in lines early.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: 'Pre-Match', path: `/explore/sports/${route.params.sport}/pre-match` },
    { name: String(route.params.date), path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${sportName.value} Pre-Match Odds for ${route.params.date} - 2Bet`,
    url: `https://2bet.com${route.path}`,
    description: `Pre-match ${sportName.value} odds and betting lines for fixtures on ${route.params.date} at 2Bet.`,
  })),
})

definePageMeta({
  validate: route => {
    const value = String(route.params.date)
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
    if (!match) return false
    const [, month, day, year] = match
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === `${year}-${month}-${day}`
  },
})
</script>

<template>
  <SportsPopular :selected-sports="selectedSports" :selected-tournaments="selectedTournaments" initial-tab="prematch" />
</template>
