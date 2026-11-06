<script setup lang="ts">
useAppSeo({
  title: 'Live Casino — Live Baccarat, Roulette & Blackjack | 2Bet',
  description: 'Experience real live dealer games on 2Bet Philippines. Stream high-definition Baccarat, Roulette, Blackjack, and game shows with professional dealers.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Live Casino', path: '/explore/entertainment/live-casino/baccarat' },
  ],
})

definePageMeta({
  middleware: () => {
    return navigateTo('/explore/entertainment/live-casino/baccarat', { replace: true })
  },
})
</script>

<template>
  <div />
</template>
