<script setup lang="ts">
const props = withDefaults(defineProps<{
  selectedSports?: string[]
  selectedTournaments?: Record<string, string[]>
}>(), {
  selectedSports: () => ['Basketball', 'Soccer', 'Tennis', 'Baseball'],
  selectedTournaments: () => ({
    Basketball: ['basketball_nba'],
    Soccer: ['soccer_epl', 'soccer_germany_bundesliga', 'soccer_uefa_*', 'soccer_italy_serie_a'],
    Tennis: ['tennis_atp_*', 'tennis_wta_*'],
    Baseball: ['baseball_mlb', 'baseball_mlb_world_series_winner'],
  }),
})

const route = useRoute()
const hoursLabel = computed(() => String(route.params.hours).replace('hours', ' Hours'))

useAppSeo({
  title: computed(() => `Upcoming Sports Matches (Next ${hoursLabel.value}) Odds | ByBet`),
  description: computed(() => `Check upcoming sports events starting in the next ${hoursLabel.value} on ByBet Philippines. Lock in early betting lines for basketball, soccer, and tennis matches.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: 'Upcoming', path: '/explore/sports/popular/upcoming' },
    { name: hoursLabel.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Upcoming Sports Matches (${hoursLabel.value}) - ByBet`,
    url: `https://bybet.com${route.path}`,
    description: `Upcoming sports fixtures starting in the next ${hoursLabel.value} on ByBet Philippines.`,
  })),
})

definePageMeta({
  validate: route => ['1hours', '3hours', '6hours', '12hours', '24hours'].includes(String(route.params.hours)),
})
</script>

<template>
  <SportsPopular :selected-sports="selectedSports" :selected-tournaments="selectedTournaments" initial-tab="upcoming" />
</template>
