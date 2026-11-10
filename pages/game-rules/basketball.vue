<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { basketballRulesHtml } from '~/data/basketball-rules'

useAppSeo({
  title: 'Regras de Apostas em Basquete (NBA, NBB e FIBA) | 2bet',
  description: 'Regulamento oficial de basquete na 2bet Brasil: inclusão de prorrogações, tempo regulamentar, apostas por quarto e desempenho de atletas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Basquete', path: '/game-rules/basketball' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="basketballRulesHtml" />
</template>
