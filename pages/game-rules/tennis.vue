<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { tennisRulesHtml } from '~/data/tennis-rules'

useAppSeo({
  title: 'Regras de Apostas em Tênis — Critérios de Liquidação | 2bet',
  description: 'Regras de tênis na 2bet Brasil: desistências, contagem de sets e games, tie-break e critérios de liquidação em grandes torneios.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Tênis', path: '/game-rules/tennis' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="tennisRulesHtml" />
</template>
