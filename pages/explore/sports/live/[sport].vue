<script setup lang="ts">
import { computed } from 'vue'
import LiveView from '~/components/sports/LiveView.vue'

const route = useRoute()
const sport = computed(() => String(route.params.sport || '').toLowerCase())
const sportName = computed(() => sport.value.charAt(0).toUpperCase() + sport.value.slice(1))

useAppSeo({
  title: computed(() => `Live ${sportName.value} Betting — Real-Time In-Play Odds | 2Bet`),
  description: computed(() => `Follow and bet live on ${sportName.value} games with real-time in-play odds, live momentum trackers, point spreads, and instant settlement at 2Bet Philippines.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: 'Live Sports', path: '/explore/sports/live' },
    { name: sportName.value, path: `/explore/sports/live/${sport.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Live ${sportName.value} Betting - 2Bet`,
    url: `https://2bet.com/explore/sports/live/${sport.value}`,
    description: `Follow and bet live on ${sportName.value} games with real-time in-play odds at 2Bet Philippines.`,
  })),
})

definePageMeta({
  validate: (route) => ['basketball', 'soccer', 'tennis', 'baseball'].includes(String(route.params.sport).toLowerCase()),
})
</script>

<template>
  <LiveView :sport="sport" />
</template>

