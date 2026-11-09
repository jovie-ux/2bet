<script setup lang="ts">
const props = defineProps<{
  selectedSports?: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()

const sportNames: Record<string, string> = {
  basketball: 'Basketball', baseball: 'Baseball', soccer: 'Soccer', tennis: 'Tennis',
}
const sportTournaments: Record<string, Record<string, string[]>> = {
  basketball: { Basketball: ['basketball_nba', 'basketball_preseason', 'basketball_euroleague'] },
  baseball: { Baseball: ['baseball_mlb'] },
  soccer: { Soccer: ['soccer_epl', 'soccer_uefa_champs_league', 'soccer_uefa_champions_league'] },
  tennis: { Tennis: ['tennis_wta_125_spain', 'tennis_atp_*', 'tennis_wta_*'] },
}

const currentSport = computed(() => String(route.params.sport || '').toLowerCase())
const sportName = computed(() => {
  return sportNames[currentSport.value] ?? (currentSport.value.charAt(0).toUpperCase() + currentSport.value.slice(1))
})

const effectiveSports = computed(() => props.selectedSports?.length ? props.selectedSports : [sportName.value])
const effectiveTournaments = computed(() => props.selectedTournaments && Object.keys(props.selectedTournaments).length ? props.selectedTournaments : (sportTournaments[currentSport.value] ?? {}))

const hoursLabel = computed(() => String(route.params.hours).replace('hours', ' Hours'))

useAppSeo({
  title: computed(() => `Upcoming ${sportName.value} Matches (Next ${hoursLabel.value}) Odds | ByBet`),
  description: computed(() => `Find upcoming ${sportName.value} fixtures starting within the next ${hoursLabel.value} on ByBet Philippines. Compare competitive match spreads, totals, and lines.`),
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
    name: `Upcoming ${sportName.value} Matches (${hoursLabel.value}) - ByBet`,
    url: `https://bybet.com${route.path}`,
    description: `Upcoming ${sportName.value} matches scheduled within the next ${hoursLabel.value} on ByBet Philippines.`,
  })),
})

definePageMeta({
  validate: route => ['1hours', '3hours', '6hours', '12hours', '24hours'].includes(String(route.params.hours)),
})
</script>

<template>
  <SportsPopular :selected-sports="effectiveSports" :selected-tournaments="effectiveTournaments" initial-tab="upcoming" />
</template>
