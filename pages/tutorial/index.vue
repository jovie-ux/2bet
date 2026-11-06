<script setup lang="ts">
import GameTutorialPage from '~/components/tutorial/GameTutorialPage.vue'

useAppSeo({
  title: 'Sports Betting Tutorial — Step-by-Step Guide | 2Bet',
  description: 'Learn sports betting on 2Bet with easy visual tutorials. Master Asian Handicap, Over/Under, 1X2, corners, and outright bets with practical examples.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Sports Tutorial', path: '/tutorial' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Bet on Sports at 2Bet',
    description: 'Learn how to bet on sports with visual examples for Asian Handicap, Over/Under, and 1X2 markets.',
  },
})
</script>

<template>
  <h1 class="hidden">How to Play Sports Betting in 2Bet - A Step-by-Step Tutorial</h1>
  <GameTutorialPage mode="tutorial" />
</template>

