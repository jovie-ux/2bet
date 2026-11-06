<script setup lang="ts">
useAppSeo({
  title: 'Interactive Casino Game Guides & Rules | 2Bet Help',
  description: 'Read comprehensive game guides and gameplay walkthroughs for 2Bet slots and table games. Understand payout mechanics, bonus rounds, and odds.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorial' },
    { name: 'Game Guides', path: '/tutorial/game' },
  ],
})

const route = useRoute()
const legacySegments = Array.isArray(route.params.legacy)
  ? route.params.legacy
  : [route.params.legacy].filter((segment): segment is string => typeof segment === 'string')

const destination = legacySegments[0] === 'tutorial'
  ? '/tutorial'
  : '/tutorial/mock-betting'

await navigateTo(destination, { redirectCode: 301, replace: true })
</script>

<template>
  <div />
</template>
