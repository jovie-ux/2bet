<script setup lang="ts">
import PokerCatalogue from '~/components/poker/PokerCatalogue.vue'

definePageMeta({
  validate: route => ['all', 'fishing', 'mahjong', 'poker', 'blackjack', 'bullbull', 'baccarat', 'other'].includes(String(route.params.category)),
})

const route = useRoute()
</script>

<template>
  <PokerCatalogue :category="String(route.params.category)" />
</template>
