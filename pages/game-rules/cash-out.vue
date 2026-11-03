<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
import { cashOutRulesHtml } from '~/data/cash-out-rules'

useAppSeo({
  title: 'Cash Out Rules, Terms & Settlement Standards | ByBet',
  description: 'Official ByBet Cash Out rules: full and partial cash out unit stake rules, settlement for interrupted events, reversal protocols, and accumulator terms.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Game Rules', path: '/game-rules' },
    { name: 'Cash Out Rules', path: '/game-rules/cash-out' },
  ],
})
</script>

<template>
  <div class="rules-cash-out-page max-w-5xl mx-auto pb-16 px-2 sm:px-4 text-white">
    <GameRulesNav />

    <!-- Document Content Container -->
    <div class="cash-out-rules-card bg-[#141414] rounded-2xl p-4 sm:p-8 border border-white/5 shadow-xl mt-4 overflow-x-auto">
      <div class="cash-out-rules-content" v-html="cashOutRulesHtml" />
    </div>
  </div>
</template>

<style scoped>
.rules-cash-out-page {
  opacity: 1 !important;
  transform: none !important;
}

.cash-out-rules-card {
  word-break: break-word;
}

/* Dark mode theme adaptations for Google Docs exported HTML */
:deep(.editor-container) {
  color: #d1d5db;
  font-family: inherit;
}

:deep(.editor-container [style*="color:#7b7b7b"]),
:deep(.editor-container [style*="color:#6e6e6e"]) {
  color: #e5e7eb !important;
}

:deep(.editor-container [style*="background-color:#e1e1e1"]) {
  background-color: #1a2e22 !important;
  border-color: var(--main-color) !important;
  color: #32d49a !important;
  border-radius: 8px;
}

:deep(.editor-container [style*="background-color:#e1e1e1"] span) {
  color: #32d49a !important;
}

:deep(.editor-container [style*="border-left:solid #bbbbb5"]),
:deep(.editor-container [style*="border-right:solid #bbbbb5"]),
:deep(.editor-container [style*="border-top:solid #bbbbb5"]),
:deep(.editor-container [style*="border-bottom:solid #bbbbb5"]) {
  border-color: var(--main-color) !important;
}

:deep(.editor-container h2 strong span),
:deep(.editor-container strong span[style*="font-size:21pt"]),
:deep(.editor-container strong span[style*="font-size:22pt"]) {
  color: #ffffff !important;
}

:deep(.editor-container h4 strong span),
:deep(.editor-container h4 span) {
  color: #ffffff !important;
}

:deep(.editor-container li) {
  margin-bottom: 0.75rem;
}

:deep(.editor-container ul) {
  padding-inline-start: 1.5rem !important;
}
</style>
