<script setup lang="ts">
useAppSeo({
  title: 'Apostas Esportivas Populares — Melhores Jogos e Odds | 2bet',
  description: 'Aposte nos eventos mais concorridos do momento na 2bet Brasil. Principais ligas de futebol, basquete e tênis com cotações vantajosas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: 'Popular', path: '/explore/sports/popular' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Popular Sports Betting - 2Bet',
    url: 'https://2bet.com/explore/sports/popular',
  },
})

const selectedSports = ['Basketball', 'Soccer', 'Tennis', 'Baseball']

// This filter is optional. Omit selected-tournaments to show all tournaments for selectedSports.
// Add API tournament keys to show only those tournaments across every Popular tab and tournament page.
// Leave a sport's list empty to show all its available tournaments.
// A trailing * matches a tournament family, such as all ATP tournaments.
const selectedTournaments: Record<string, string[]> = {
  Basketball: ['basketball_nba'],
  Soccer: ['soccer_epl', 'soccer_germany_bundesliga', 'soccer_uefa_*', 'soccer_italy_serie_a' ],
  Tennis: ['tennis_atp_*', 'tennis_wta_*'],
  Baseball: ['baseball_mlb', 'baseball_mlb_world_series_winner'],
}

definePageMeta({
  middleware: (to) => {
    if (to.path.replace(/\/$/, '') === '/explore/sports/popular') {
      return navigateTo({
        path: '/explore/sports/popular/upcoming',
        query: to.query,
      }, { replace: true })
    }
  },
})
</script>

<template>
  <NuxtPage
    :selected-sports="selectedSports"
    :selected-tournaments="selectedTournaments"
  />
</template>
