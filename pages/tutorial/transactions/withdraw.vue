<script setup lang="ts">
import TransactionTutorialPage from '~/components/tutorial/TransactionTutorialPage.vue'

useAppSeo({
  title: 'How to Withdraw Winnings Step-by-Step Guide by 2Bet Casino',
  description: 'Step-by-step withdrawal tutorial for 2Bet Philippines. Learn how to request fast payouts directly to your GCash or bank account with ease.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorial' },
    { name: 'Withdrawal Tutorial', path: '/tutorial/transactions/withdraw' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Withdraw Winnings from 2Bet',
    description: 'Learn how to withdraw winnings from your 2Bet account quickly and safely.',
  },
})
</script>

<template>
  <h1 class="hidden">How to Withdraw in 2Bet </h1>
  <TransactionTutorialPage mode="withdraw" />
</template>
