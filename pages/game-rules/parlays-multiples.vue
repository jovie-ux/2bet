<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
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
  <div class="rules-parlay-page max-w-5xl mx-auto pb-16 px-2 sm:px-4 text-white">
    <GameRulesNav />

    <!-- Document Content Container -->
    <div class="parlays-rules-card bg-[#141414] rounded-2xl p-4 sm:p-8 border border-white/5 shadow-xl mt-4">
      <div class="parlays-rules-content" v-html="formattedRulesHtml" />
    </div>
  </div>
</template>

<style scoped>
.rules-parlay-page {
  opacity: 1 !important;
  transform: none !important;
}

.parlays-rules-card {
  word-break: break-word;
}

/* Dedicated horizontal scroll container for tables */
:deep(.rules-table-wrapper) {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid var(--main-color) !important;
  border-radius: 8px;
  -webkit-overflow-scrolling: touch;
}

:deep(.rules-table-wrapper table) {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}

:deep(.editor-container col) {
  width: auto !important;
}

:deep(.rules-table-wrapper table tr) {
  height: auto !important;
}

:deep(.rules-table-wrapper table td) {
  background-color: #16181b !important;
  border: 1px solid #1f3d2e !important;
  padding: 10px 14px !important;
  text-align: center;
}

:deep(.rules-table-wrapper table td),
:deep(.rules-table-wrapper table td p),
:deep(.rules-table-wrapper table td span) {
  white-space: nowrap !important;
  word-break: normal !important;
}

:deep(.rules-table-wrapper table td[style*="background-color:#212529"]) {
  background-color: #1a2e22 !important;
  border-color: var(--main-color) !important;
}

:deep(.rules-table-wrapper table td[style*="background-color:#212529"] span) {
  color: #32d49a !important;
  font-weight: 700;
}

:deep(.rules-table-wrapper table td:not([style*="background-color:#212529"]) span) {
  color: #e5e7eb !important;
}

/* Dark mode theme adaptations for Google Docs exported HTML */
:deep(.editor-container) {
  color: #d1d5db;
  font-family: inherit;
}

:deep(.editor-container [style*="color:#7b7b7b"]),
:deep(.editor-container [style*="color:#6e6e6e"]),
:deep(.editor-container [style*="color:#666666"]),
:deep(.editor-container [style*="color:#212529"]) {
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
  margin-bottom: 0.5rem;
}

:deep(.editor-container ul) {
  padding-inline-start: 1.5rem !important;
}
</style>
