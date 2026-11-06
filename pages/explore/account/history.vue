<script setup lang="ts">
useAppSeo({
  title: 'Betting History & Transaction Records | 2Bet Platform',
  description: 'Review your sports wagers, casino game sessions, deposit logs, and withdrawal status. Complete transparent transaction history on 2Bet Philippines.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Account', path: '/explore/account/me' },
    { name: 'History', path: '/explore/account/history' },
  ],
})
</script>

<template>
  <ComingSoonFallback :disable-seo="true" />
</template>
