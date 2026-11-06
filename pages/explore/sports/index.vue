<script setup lang="ts">
useAppSeo({
  title: 'Sports Betting Odds, Lines & Live Scores | 2Bet',
  description: 'Bet on worldwide sports events at 2Bet Philippines. Real-time odds, live lines, and deep markets for NBA, soccer leagues, and championship tournaments.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Sports Betting',
    url: 'https://2bet.com/explore/sports/popular',
  },
})

navigateTo('/explore/sports/popular', { redirectCode: 301 })
</script>

<template>
  <div />
</template>

