<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'
import { basketballRulesHtml } from '~/data/basketball-rules'

useAppSeo({
  title: 'Regras de Apostas em Basquete (NBA, NBB e FIBA) | 2bet',
  description: 'Regulamento oficial de basquete na 2bet Brasil: inclusão de prorrogações, tempo regulamentar, apostas por quarto e desempenho de atletas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Regras de Jogo', path: '/game-rules' },
    { name: 'Regras de Basquete', path: '/game-rules/basketball' },
  ],
})
</script>

<template>
  <div class="rules-basketball-page max-w-5xl mx-auto pb-16 px-2 sm:px-4 text-white">
    <GameRulesNav />

    <!-- Document Content Container -->
    <div class="basketball-rules-card bg-[#141414] rounded-2xl p-4 sm:p-8 border border-white/5 shadow-xl mt-4 overflow-x-auto">
      <div class="basketball-rules-content" v-html="basketballRulesHtml" />
    </div>
  </div>
</template>

<style scoped>
.rules-basketball-page {
  opacity: 1 !important;
  transform: none !important;
}

.basketball-rules-card {
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
</style>
