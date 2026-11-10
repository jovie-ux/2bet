<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { sportsBettingRulesHtml } from '~/data/sports-betting-rules'

useAppSeo({
  title: 'Regras Gerais de Apostas e Mercados Esportivos Online | 2bet',
  description: 'Consulte as regras gerais de apostas esportivas na 2bet Brasil. Critérios de aceitação de palpites, limites e liquidação de eventos.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Apostas Esportivas', path: '/game-rules/sports-betting-rules' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="sportsBettingRulesHtml" />
</template>
