<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { cashOutRulesHtml } from '~/data/cash-out-rules'

useAppSeo({
  title: 'Regras de Cash Out — Encerramento Total e Parcial | 2bet',
  description: 'Saiba como utilizar o Cash Out total ou parcial na 2bet Brasil. Garanta lucros antecipados ou reduza perdas com total autonomia.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Cash Out', path: '/game-rules/cash-out' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="cashOutRulesHtml" />
</template>
