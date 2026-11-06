<script setup lang="ts">
import LiveView from '~/components/sports/LiveView.vue'

useAppSeo({
  title: 'Live Sports Betting Hub — In-Play Match Odds | 2Bet',
  description: 'Access 2Bet live in-play sports betting hub. Real-time scores, momentum trackers, dynamic handicap odds, and instant bet settlement 24/7.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: 'Live Hub', path: '/explore/sports/live' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Live Sports Hub',
    url: 'https://2bet.com/explore/sports/live',
  },
})
</script>

<template>
  <LiveView />
</template>

