<script setup lang="ts">
useAppSeo({
  title: 'Popular Sports Betting — Top Match Odds & Events | ByBet',
  description: 'Bet on the most popular sporting events worldwide at ByBet. Competitive odds, live lines, and deep markets for NBA, UEFA Champions League, and PBA.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: 'Popular', path: '/explore/sports/popular' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Popular Sports Betting - ByBet',
    url: 'https://bybet.com/explore/sports/popular',
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
