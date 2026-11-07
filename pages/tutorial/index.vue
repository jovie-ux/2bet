<script setup lang="ts">
import GameTutorialPage from '~/components/tutorial/GameTutorialPage.vue'

useAppSeo({
  title: 'Tutorial de Apostas Esportivas — Guia Passo a Passo | 2bet',
  description: 'Aprenda a apostar em esportes com os tutoriais da 2bet Brasil. Entenda handicaps asiáticos, mercados de gols e leitura clara de odds.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Tutorial de Esportes', path: '/tutorial' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Apostar em 2bet Apostas Esportivas',
    description: 'Aprenda a apostar em esportes com os tutoriais da 2bet Brasil. Entenda handicaps asiáticos, mercados de gols e leitura clara de odds.',
  },
})
</script>

<template>
  <h1 class="hidden">Como Apostar em 2bet Apostas Esportivas — Tutorial Passo a Passo</h1>
  <GameTutorialPage mode="tutorial" />
</template>

