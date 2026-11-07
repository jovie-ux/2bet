<script setup lang="ts">
useAppSeo({
  title: 'Cassino ao Vivo — Mesas com Crupiês Reais e Roleta HD | 2bet',
  description: 'Sinta a emoção do cassino ao vivo na 2bet Brasil. Jogue bacará, roleta e blackjack com transmissão em HD e crupiês profissionais 24 horas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Cassino ao Vivo', path: '/explore/entertainment/live-casino/featured' },
  ],
})

definePageMeta({
  middleware: () => {
    return navigateTo('/explore/entertainment/live-casino/featured', { replace: true })
  },
})
</script>

<template>
  <div />
</template>
