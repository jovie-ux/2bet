<script setup lang="ts">
import { computed } from 'vue'
import LiveCasinoLobby from '~/components/live-casino/LiveCasinoLobby.vue'
import { LIVE_CASINO_CATEGORIES } from '~/data/live-casino'

const route = useRoute()
const activeCategory = computed(() => String(route.params.category || 'baccarat'))
const categoryLabel = computed(() => LIVE_CASINO_CATEGORIES.find(category => category.key === activeCategory.value)?.label || 'Live Tables')

useAppSeo({
  title: computed(() => `${categoryLabel.value} Live Casino — Real Dealer Tables | 2Bet`),
  description: computed(() => `Join live ${categoryLabel.value} tables on 2Bet Philippines. HD streaming, professional dealers, dynamic side bets, and seamless mobile wagering 24/7.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Live Casino', path: '/explore/entertainment/live-casino/baccarat' },
    { name: categoryLabel.value, path: `/explore/entertainment/live-casino/${activeCategory.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel.value} Live Casino - 2Bet`,
    url: `https://2bet.com/explore/entertainment/live-casino/${activeCategory.value}`,
  })),
})
</script>

<template>
  <LiveCasinoLobby :category="activeCategory" />
</template>
