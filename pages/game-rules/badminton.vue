<script setup lang="ts">
import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'
import { badmintonRulesHtml } from '~/data/badminton-rules'

useAppSeo({
  title: 'Regras de Apostas em Badminton — Normas Oficiais BWF | 2bet',
  description: 'Regras de badminton na 2bet Brasil: formato oficial BWF com 21 pontos, critérios de desistência e liquidação segura de palpites.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Badminton', path: '/game-rules/badminton' },
  ],
})
</script>

<template>
  <GameRulesDocument :html="badmintonRulesHtml" />
</template>
