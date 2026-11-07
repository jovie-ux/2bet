<script setup lang="ts">
import LiveView from '~/components/sports/LiveView.vue'

useAppSeo({
  title: 'Central de Apostas ao Vivo — Placares e Cotações | 2bet',
  description: 'Acesse a central de apostas ao vivo da 2bet Brasil. Placares em tempo real, estatísticas atualizadas e liquidação rápida de bilhetes.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: 'Central ao Vivo', path: '/explore/sports/live' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Live Sports Hub',
    url: 'https://2bet.com/explore/sports/live',
  },
})
</script>

<template>
  <LiveView />
</template>

