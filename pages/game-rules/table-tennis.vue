<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { tableTennisRulesHtml } from '~/data/table-tennis-rules'

useAppSeo({
  title: 'Regras de Apostas em Tênis de Mesa — Padrões ITTF | 2bet',
  description: 'Regras oficiais de tênis de mesa na 2bet Brasil: pontuação ITTF, desqualificações, handicaps e liquidação transparente de apostas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Tênis de Mesa', path: '/game-rules/table-tennis' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="tableTennisRulesHtml" />
</template>
