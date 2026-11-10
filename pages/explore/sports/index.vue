<script setup lang="ts">
const { locale } = useSiteLocale()

useAppSeo({
  title: 'Apostas Esportivas — Melhores Odds e Mercados ao Vivo | 2bet',
  description: 'Faça suas apostas esportivas na 2bet com cotações competitivas. Cobertura completa de futebol, basquete, tênis e mercados ao vivo no Brasil.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/sports/popular' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Sports Betting',
    url: 'https://2bet.com/sports/popular',
  },
})

navigateTo('/sports/popular', { redirectCode: 301 })
</script>

<template>
  <div>
    <h1 class="sr-only">{{ locale === 'pt' ? 'Apostas Esportivas' : 'Sports Betting' }}</h1>
  </div>
</template>

