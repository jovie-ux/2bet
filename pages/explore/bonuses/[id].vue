<script setup lang="ts">
import BonusCategoryListing from '~/components/bonuses/BonusCategoryListing.vue'
import { PROMO_CATEGORIES } from '~/data/promotions'

const route = useRoute()
const categoryKey = computed(() => String(route.params.id || ''))
const isCategory = computed(() => PROMO_CATEGORIES.some(c => c.key === categoryKey.value))

definePageMeta({
  middleware: (to) => {
    const id = String(to.params.id || '')
    if (PROMO_CATEGORIES.some(c => c.key === id)) {
      return
    }
    return navigateTo({
      path: id === 'payments' ? '/bonuses' : `/bonus/${id}`,
      query: to.query,
      hash: to.hash,
    }, { redirectCode: 301, replace: true })
  },
})
</script>

<template>
  <BonusCategoryListing v-if="isCategory" :category="categoryKey" />
  <div v-else />
</template>

<style scoped>
/* scoped */
</style>
