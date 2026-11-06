<script setup lang="ts">
import GameTutorialPage from '~/components/tutorial/GameTutorialPage.vue'

useAppSeo({
  title: 'Mock Betting Simulator & Practice Tutorial | 2Bet',
  description: 'Practice sports wagering with 2Bet interactive mock betting simulator. Test handicap, over/under, and 1X2 bet types with zero financial risk.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorial' },
    { name: 'Mock Betting', path: '/tutorial/mock-betting' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Practice Sports Betting on 2Bet',
    description: 'Learn and practice sports betting risk-free using the 2Bet interactive mock betting simulator.',
  },
})
</script>

<template>
  <h1 class="hidden">Mock Betting Page - Practice Sports Betting in 2Bet </h1>
  <GameTutorialPage mode="mock-betting" />
</template>
