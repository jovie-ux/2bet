<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { baseballRulesHtml } from '~/data/baseball-rules'

useAppSeo({
  title: 'Regras de Apostas em Beisebol (MLB, NPB e KBO) | 2bet',
  description: 'Regras de beisebol na 2bet Brasil: entradas extras, regras de misericórdia, corridas e critérios oficiais de liquidação de bilhetes.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Beisebol', path: '/game-rules/baseball' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="baseballRulesHtml" />
</template>
