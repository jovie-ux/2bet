<script setup lang="ts">
import GameTutorialPage from '~/components/tutorial/GameTutorialPage.vue'

useAppSeo({
  title: 'Simulador de Apostas Esportivas e Prática sem Risco | 2bet',
  description: 'Pratique sem risco no simulador interativo de apostas da 2bet Brasil. Teste palpites, explore mercados e aprimore sua experiência online.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Tutoriais', path: '/tutorial' },
    { name: 'Simulador de Apostas', path: '/tutorial/mock-betting' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Praticar Apostas Esportivas na 2bet',
    description: 'Pratique sem risco no simulador interativo de apostas da 2bet Brasil. Teste palpites, explore mercados e aprimore sua experiência online.',
  },
})
</script>

<template>
  <h1 class="hidden">Simulador de Apostas — Pratique na 2bet sem Risco</h1>
  <GameTutorialPage mode="mock-betting" />
</template>
