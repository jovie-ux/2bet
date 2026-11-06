<script setup lang="ts">
useAppSeo({
  title: 'Sports Betting Rules & Settlement Directory | 2Bet',
  description: 'Complete directory of 2Bet sports betting rules. Understand settlement standards for football, basketball, tennis, baseball, cash out, and parlays.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Game Rules', path: '/game-rules' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Sports Betting Rules Directory',
    url: 'https://2bet.com/game-rules',
  },
})

navigateTo('/game-rules/sports-betting-rules', { redirectCode: 301 })
</script>

<template>
  <div />
</template>

