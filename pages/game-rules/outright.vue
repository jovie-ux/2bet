<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { outrightRulesHtml } from '~/data/outright-rules'

useAppSeo({
  title: 'Apostas Futuras — Mercados de Campeão e Prazos | 2bet',
  description: 'Regras de apostas de longo prazo na 2bet Brasil: mercados Ante-Post, desempate técnico e liquidação oficial de campeões de ligas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Apostas Futuras', path: '/game-rules/outright' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="outrightRulesHtml" />
</template>
