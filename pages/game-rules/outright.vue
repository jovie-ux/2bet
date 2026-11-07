<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
import { outrightRulesHtml } from '~/data/outright-rules'

useAppSeo({
  title: 'Apostas Futuras — Mercados de Campeão e Prazos | 2bet',
  description: 'Regras de apostas de longo prazo na 2bet Brasil: mercados Ante-Post, desempate técnico e liquidação oficial de campeões de ligas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Apostas Futuras', path: '/game-rules/outright' },
  ],
})
</script>

<template>
  <div class="rules-outright-page max-w-5xl mx-auto pb-16 px-2 sm:px-4 text-white">
    <GameRulesNav />

    <!-- Document Content Container -->
    <div class="outright-rules-card bg-[#141414] rounded-2xl p-4 sm:p-8 border border-white/5 shadow-xl mt-4 overflow-x-auto">
      <div class="outright-rules-content" v-html="outrightRulesHtml" />
    </div>
  </div>
</template>

<style scoped>
.rules-outright-page {
  opacity: 1 !important;
  transform: none !important;
}

.outright-rules-card {
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
