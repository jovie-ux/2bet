<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import {
  sortRailGames,
  type GameRailSortField,
  type GameRailSortOrder,
  type GameRailSortPreset,
} from '~/utils/gameSort'

export interface GameRailProps {
  label: string
  layout?: 'slider' | 'grid'
  wideColumns?: number
  games?: any[]
  sort?: GameRailSortPreset | GameRailSortField | string | ((a: any, b: any) => number)
  sortBy?: GameRailSortField
  sortOrder?: GameRailSortOrder
  category?: string
  limit?: number
}

const props = withDefaults(defineProps<{
  label: string
  layout?: 'slider' | 'grid'
  wideColumns?: number
  games?: any[]
  sort?: GameRailSortPreset | GameRailSortField | string | ((a: any, b: any) => number)
  sortBy?: GameRailSortField
  sortOrder?: GameRailSortOrder
  category?: string
  limit?: number
}>(), {
  layout: 'slider',
  wideColumns: 6,
  games: undefined,
  sort: undefined,
  sortBy: undefined,
  sortOrder: undefined,
  category: undefined,
  limit: undefined,
})

const railElement = ref<HTMLElement | null>(null)
const dynamicColumns = ref<number | null>(null)
let resizeObserver: ResizeObserver | null = null

const calculateColumns = (width: number) => {
  if (width <= 0) return
  if (width < 640) {
    dynamicColumns.value = 3
    return
  }
  const gap = width >= 1024 ? 12 : 10
  const targetWidth = 165
  // Calculate exact integer number of columns so no card is cut off at the edge
  const cols = Math.max(3, Math.round((width + gap) / (targetWidth + gap)))
  dynamicColumns.value = cols
}

onMounted(() => {
  if (typeof window !== 'undefined' && 'ResizeObserver' in window && railElement.value) {
    calculateColumns(railElement.value.offsetWidth)
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect?.width || railElement.value?.offsetWidth || 0
        calculateColumns(width)
      }
    })
    resizeObserver.observe(railElement.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

const sortedGames = computed(() => {
  if (!props.games || !Array.isArray(props.games)) {
    return []
  }
  const sorted = sortRailGames(props.games, {
    sort: props.sort,
    sortBy: props.sortBy,
    sortOrder: props.sortOrder,
    category: props.category,
    label: props.label,
  })
  if (typeof props.limit === 'number' && props.limit > 0) {
    return sorted.slice(0, props.limit)
  }
  return sorted
})

const railStyles = computed(() => {
  const styles: Record<string, string | number> = {
    '--wide-rail-columns': props.wideColumns,
    '--wide-rail-gaps': `${(props.wideColumns - 1) * 12}px`,
  }
  if (props.layout === 'slider' && dynamicColumns.value !== null) {
    styles['--rail-cols'] = dynamicColumns.value
  }
  return styles
})
</script>

<template>
  <div
    ref="railElement"
    class="game-rail"
    :class="{ 'game-rail--grid': layout === 'grid' }"
    :style="railStyles"
    role="region"
    :aria-label="label"
    :tabindex="layout === 'slider' ? 0 : undefined"
  >
    <slot :games="sortedGames" :sorted-games="sortedGames" />
  </div>
</template>

<style scoped>
.game-rail {
  --rail-cols: 6;
  --rail-gap: 8px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  grid-auto-columns: calc((100% - (var(--rail-gap) * (var(--rail-cols) - 1))) / var(--rail-cols));
  gap: var(--rail-gap);
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  padding-block: 2px;
  scroll-snap-type: x mandatory;
  overscroll-behavior-inline: contain;
  scrollbar-width: none;
}

.game-rail::-webkit-scrollbar { display: none; }

.game-rail :slotted(.game-card) {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.game-rail--grid {
  grid-auto-flow: row;
  grid-auto-columns: auto;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: visible;
}

@media (min-width: 640px) {
  .game-rail {
    --rail-gap: 10px;
    --rail-cols: 4;
  }
  .game-rail--grid {
    grid-auto-columns: auto;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .game-rail {
    --rail-gap: 12px;
    --rail-cols: 6;
  }
  .game-rail--grid {
    grid-auto-columns: auto;
    grid-template-columns: repeat(auto-fill, minmax(150px, 165px));
  }
}

@media (min-width: 1280px) {
  .game-rail {
    --rail-cols: 7;
  }
}

@media (min-width: 1440px) {
  .game-rail {
    --rail-cols: 8;
  }
}

@media (min-width: 1600px) {
  .game-rail {
    --rail-cols: 9;
  }
}

@media (min-width: 1740px) {
  .game-rail {
    --rail-cols: 10;
  }
}
</style>
