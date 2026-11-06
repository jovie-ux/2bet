<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
import { sportsBettingRulesHtml } from '~/data/sports-betting-rules'

useAppSeo({
  title: 'General Sports Betting Rules & Settlement Standards | 2Bet',
  description: 'Official 2Bet sportsbook rules. Acceptance of bets, dead heat calculations, in-play procedures, maximum payouts, and postponement policies.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Game Rules', path: '/game-rules' },
    { name: 'Sports Betting Rules', path: '/game-rules/sports-betting-rules' },
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
