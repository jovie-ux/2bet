<script setup lang="ts">
useAppSeo({
  title: 'Jackpots Acumulados — Grandes Prêmios em Dinheiro | 2bet',
  description: 'Dispute prêmios acumulados nos melhores caça-níqueis da 2bet Brasil. Acompanhe contadores em tempo real e concorra a boladas milionárias.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Jackpots', path: '/egames/jackpot/all' },
  ],
})

definePageMeta({
  middleware: () => {
    return navigateTo('/egames/jackpot/all', { replace: true })
  },
})
</script>

<template>
  <div />
</template>

