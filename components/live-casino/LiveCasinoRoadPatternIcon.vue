<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ sample?: readonly (readonly ('B' | 'P')[])[] }>()
const columns = computed(() => props.sample || [['B', 'P', 'B'], ['P', 'B', 'P'], ['B', 'P', 'B']])
</script>

<template>
  <svg class="casino-road-pattern-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <template v-for="(column, columnIndex) in columns" :key="columnIndex">
      <circle v-for="(result, rowIndex) in column" :key="rowIndex" :cx="3 + columnIndex * 5" :cy="3 + rowIndex * 5" r="1.65" :stroke="result === 'B' ? '#f04b55' : '#438cfa'" stroke-width="1.2" />
    </template>
  </svg>
</template>

<style scoped>
.casino-road-pattern-icon { display: block; width: 20px; height: 20px; flex: 0 0 auto; }
</style>
