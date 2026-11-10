<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { parlaysRulesHtml } from '~/data/parlays-rules'

useAppSeo({
  title: 'Apostas Múltiplas e Combinadas — Regras de Cálculo | 2bet',
  description: 'Aprenda o funcionamento das apostas múltiplas e combinadas na 2bet Brasil. Regras de cálculo, combinações de sistema e cotações totais.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Apostas Múltiplas', path: '/game-rules/parlays-multiples' },
  ],
})

// Wrap each table inside a dedicated horizontal scroll container
const formattedRulesHtml = computed(() => {
  return parlaysRulesHtml.replace(
    /<table[\s\S]*?<\/table>/gi,
    match => `<div class="rules-table-wrapper">${match}</div>`
  )
})
</script>

<template>
  <GameRulesDocument :html="formattedRulesHtml" />
</template>
