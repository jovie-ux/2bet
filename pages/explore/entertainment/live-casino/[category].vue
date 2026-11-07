<script setup lang="ts">
import { computed } from 'vue'
import LiveCasinoLobby from '~/components/live-casino/LiveCasinoLobby.vue'
import { LIVE_CASINO_CATEGORIES } from '~/data/live-casino'

const route = useRoute()
const { translate } = useSiteLocale()
const activeCategory = computed(() => {
  const category = String(route.params.category || 'featured')
  return category === 'game-show' ? 'live-show' : category
})
const categoryLabel = computed(() => LIVE_CASINO_CATEGORIES.find(category => category.key === activeCategory.value)?.label || 'Live Tables')

useAppSeo({
  title: computed(() => formatSeoTitle(`${translate(categoryLabel.value)} ao Vivo — Mesas com Crupiês Reais | 2bet`)),
  description: computed(() => formatSeoDescription(`Jogue ${translate(categoryLabel.value).toLowerCase()} ao vivo na 2bet Brasil. Mesas exclusivas com crupiês profissionais, transmissão em HD e limites flexíveis.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Cassino ao Vivo', path: '/explore/entertainment/live-casino/featured' },
    { name: translate(categoryLabel.value), path: `/explore/entertainment/live-casino/${activeCategory.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${translate(categoryLabel.value)} Cassino ao Vivo - 2bet`,
    url: `https://2bet.com/explore/entertainment/live-casino/${activeCategory.value}`,
  })),
})
</script>

<template>
  <LiveCasinoLobby :category="activeCategory" />
</template>
