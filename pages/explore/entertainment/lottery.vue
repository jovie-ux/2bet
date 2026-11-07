<script setup lang="ts">
import UnderMaintenance from '~/components/modals/UnderMaintenance.vue'

const isMaintenanceOpen = ref(true)

useAppSeo({
  title: 'Loterias Online e Jogos Numéricos com Sorteios | 2bet',
  description: 'Participe de loterias online e jogos de números na 2bet Brasil. Resultados em tempo real, sorteios frequentes e diversão garantida todo dia.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Entretenimento', path: '/explore/entertainment/live-casino/baccarat' },
    { name: 'Loteria', path: '/explore/entertainment/lottery' },
  ],
})
</script>

<template>
  <div>
    <ComingSoonFallback :disable-seo="true" />
    <UnderMaintenance
      v-if="isMaintenanceOpen"
      @close="isMaintenanceOpen = false"
    />
  </div>
</template>

