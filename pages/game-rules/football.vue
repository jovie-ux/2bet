<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { footballRulesHtml } from '~/data/football-rules'

useAppSeo({
  title: 'Regras de Apostas em Futebol e Linhas de Cotações | 2bet',
  description: 'Regras oficiais de futebol na 2bet Brasil: tempo regulamentar de 90 minutos, mercados de gols, prorrogação, cartões e protocolos do VAR.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Futebol', path: '/game-rules/football' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="footballRulesHtml" />
</template>
