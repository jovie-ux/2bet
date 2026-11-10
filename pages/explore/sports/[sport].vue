<script setup lang="ts">
const route = useRoute()
const sportNames: Record<string, string> = {
  basketball: 'Basketball', baseball: 'Baseball', soccer: 'Soccer', football: 'Soccer', tennis: 'Tennis',
}
// Edit these API tournament keys to choose the Popular Leagues for each sport.
const popularLeagues: Record<string, string[]> = {
  basketball: ['basketball_nba', 'basketball_preseason', 'basketball_euroleague'],
  baseball: ['baseball_mlb'],
  soccer: ['soccer_epl', 'soccer_uefa_champs_league', 'soccer_uefa_champions_league'],
  football: ['soccer_epl', 'soccer_uefa_champs_league', 'soccer_uefa_champions_league'],
  tennis: ['tennis_wta_125_spain', 'tennis_atp_*', 'tennis_wta_*'],
}
const selectedPopularLeagues = computed(() => popularLeagues[String(route.params.sport)] ?? [])
const selectedSports = computed(() => [sportNames[String(route.params.sport)] ?? ''])
const sportDisplayName = computed(() => {
  const param = String(route.params.sport || '').toLowerCase()
  if (param === 'football') return 'Football'
  return sportNames[param] ?? 'Sports'
})
const selectedTournaments = computed(() => {
  const sport = sportNames[String(route.params.sport)]
  const leagues = selectedPopularLeagues.value
  return sport && leagues.length ? { [sport]: leagues } : {}
})

useAppSeo({
  title: computed(() => formatSeoTitle(`Apostas em ${sportDisplayName.value} — Cotações e Jogos ao Vivo | 2bet`)),
  description: computed(() => formatSeoDescription(`Aposte em partidas de ${sportDisplayName.value.toLowerCase()} na 2bet Brasil. Cotações competitivas, mercados ao vivo, estatísticas e saques rápidos via PIX.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/sports/popular' },
    { name: sportDisplayName.value, path: `/sports/${route.params.sport}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Apostas em ${sportDisplayName.value} - 2bet`,
    url: `https://2bet.com/sports/${route.params.sport}`,
    description: `Aposte em ${sportDisplayName.value} na 2bet Brasil com spreads competitivos, vencedor, totais e apostas futuras.`,
  })),
})

definePageMeta({
  validate: route => ['basketball', 'baseball', 'soccer', 'football', 'tennis'].includes(String(route.params.sport)),
  middleware: to => {
    const rawPath = to.path.replace(/\/$/, '')
    const cleanBase = `/sports/${to.params.sport}`
    if (rawPath !== cleanBase && rawPath !== `/explore/sports/${to.params.sport}`) return
    const requestedTab = to.query.tab === 'prematch' ? 'pre-match' : String(to.query.tab ?? 'inplay')
    const availableTabs = ['league', 'inplay', 'upcoming', 'pre-match', 'smart-pick', 'outright']
    if (['soccer', 'football'].includes(String(to.params.sport).toLowerCase())) availableTabs.push('replay')
    const tab = availableTabs.includes(requestedTab) ? requestedTab : 'inplay'
    const { tab: legacyTab, ...query } = to.query
    return navigateTo({ path: `${cleanBase}/${tab}`, query }, { replace: true })
  },
})
</script>

<template>
  <NuxtPage
    :selected-sports="selectedSports"
    :popular-leagues="selectedPopularLeagues"
    :selected-tournaments="selectedTournaments"
  />
</template>
