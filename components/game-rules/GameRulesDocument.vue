<script setup lang="ts">
import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'

defineProps<{ html: string }>()
</script>

<template>
  <div class="game-rules-page mx-auto max-w-5xl px-2 pb-16 text-white sm:px-4">
    <GameRulesNav />
    <article class="game-rules-card mt-4 overflow-x-auto rounded-2xl border border-white/5 bg-[#141414] p-4 shadow-xl sm:p-8">
      <div class="game-rules-content" v-html="html" />
    </article>
  </div>
</template>

<style scoped>
.game-rules-page { opacity: 1 !important; transform: none !important; }
.game-rules-card { overflow-wrap: anywhere; }
.game-rules-content :deep(h1) { margin: 0 0 16px !important; font-size: 28px; line-height: 1.3; }
.game-rules-content :deep(h1),
.game-rules-content :deep(h1 span),
.game-rules-content :deep(h3),
.game-rules-content :deep(h3 span) { color: var(--heading) !important; font-weight: 700 !important; }
.game-rules-content :deep(h2) { background-color: #e1e1e1; }
.game-rules-content :deep(h2),
.game-rules-content :deep(h2 span) { color: #343434 !important; font-weight: 700 !important; }
.game-rules-content :deep(h3) { margin: 18px 0 8px !important; font-size: 16px; line-height: 1.5; }
.game-rules-content :deep(table) { max-width: 100%; }
.game-rules-content :deep(.rules-table-wrapper) {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #bbbbb5;
  border-radius: 8px;
  -webkit-overflow-scrolling: touch;
}
.game-rules-content :deep(.rules-table-wrapper table) {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}
.game-rules-content :deep(.rules-table-wrapper col) { width: auto !important; }
.game-rules-content :deep(.rules-table-wrapper tr) { height: auto !important; }
.game-rules-content :deep(.rules-table-wrapper td) { padding: 10px 14px !important; text-align: center; }
.game-rules-content :deep(.rules-table-wrapper td),
.game-rules-content :deep(.rules-table-wrapper td p),
.game-rules-content :deep(.rules-table-wrapper td span) { white-space: nowrap !important; word-break: normal !important; }
</style>
