<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
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
  <div class="rules-sports-betting-page max-w-5xl mx-auto pb-16 px-2 sm:px-4 text-white">
    <GameRulesNav />

    <!-- Document Content Container -->
    <div class="sports-betting-rules-card bg-[#141414] rounded-2xl p-4 sm:p-8 border border-white/5 shadow-xl mt-4 overflow-x-auto">
      <div class="sports-betting-rules-content" v-html="sportsBettingRulesHtml" />
    </div>
  </div>
</template>

<style scoped>
.rules-sports-betting-page {
  opacity: 1 !important;
  transform: none !important;
}

.sports-betting-rules-card {
  word-break: break-word;
}

</style>
