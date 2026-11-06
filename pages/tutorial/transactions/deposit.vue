<script setup lang="ts">
import TransactionTutorialPage from '~/components/tutorial/TransactionTutorialPage.vue'

useAppSeo({
  title: 'How to Deposit Funds via GCash and Maya Guide in 2Bet Casino',
  description: 'Step-by-step deposit guide for 2Bet Philippines. Follow 5 easy steps to fund your account securely using GCash, Maya, ShopeePay, or bank transfer.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorial' },
    { name: 'Deposit Tutorial', path: '/tutorial/transactions/deposit' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Deposit on 2Bet',
    description: 'Learn how to deposit funds into your 2Bet wallet in 5 simple steps.',
  },
})
</script>

<template>
  <h1 class="hidden">How to Deposit in 2Bet </h1>
  <TransactionTutorialPage mode="deposit" />
</template>
