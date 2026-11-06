<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
import { footballRulesHtml } from '~/data/football-rules'

useAppSeo({
  title: 'Football / Soccer Betting Rules & Settlement | 2Bet',
  description: 'Official 2Bet football rules: 90-minute regulation time, goalscorer terms, card and corner counting, VAR protocols, and abandoned match settlements.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Game Rules', path: '/game-rules' },
    { name: 'Football Rules', path: '/game-rules/football' },
  ],
})
</script>

<template>
  <div class="rules-football-page max-w-5xl mx-auto pb-16 px-2 sm:px-4 text-white">
    <GameRulesNav />

    <!-- Document Content Container -->
    <div class="football-rules-card bg-[#141414] rounded-2xl p-4 sm:p-8 border border-white/5 shadow-xl mt-4 overflow-x-auto">
      <div class="football-rules-content" v-html="footballRulesHtml" />
    </div>
  </div>
</template>

<style scoped>
.rules-football-page {
  opacity: 1 !important;
  transform: none !important;
}

.football-rules-card {
  word-break: break-word;
}

/* Ensure editor container tables don'\''t break layout on mobile */
:deep(.editor-container table) {
  max-width: 100%;
  overflow-x: auto;
  display: block;
}

@media (min-width: 640px) {
  :deep(.editor-container table) {
    display: table;
  }
}

/* Dark mode theme adaptations for Google Docs exported HTML */
:deep(.editor-container) {
  color: #d1d5db;
  font-family: inherit;
}

:deep(.editor-container span) {
  /* Elevate muted #6e6e6e to readable text on dark background */
}
:deep(.editor-container [style*="color:#6e6e6e"]) {
  color: #e5e7eb !important;
}

:deep(.editor-container [style*="background-color:#e1e1e1"]) {
  background-color: #1a2e22 !important;
  border-color: var(--main-color) !important;
  color: #32d49a !important;
  border-radius: 8px;
}

:deep(.editor-container [style*="border-left:solid #bbbbb5"]),
:deep(.editor-container [style*="border-right:solid #bbbbb5"]),
:deep(.editor-container [style*="border-top:solid #bbbbb5"]),
:deep(.editor-container [style*="border-bottom:solid #bbbbb5"]) {
  border-color: var(--main-color) !important;
}

:deep(.editor-container table td) {
  background-color: #1a1a1a !important;
  border-color: #334155 !important;
}

:deep(.editor-container strong span[style*="font-size:22pt"]) {
  color: #ffffff !important;
}
</style>
