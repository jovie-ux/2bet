<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import LiveCasinoTableCard from '~/components/live-casino/LiveCasinoTableCard.vue'
import type { LiveCasinoTable } from '~/data/live-casino'

const props = withDefaults(defineProps<{
  id: string
  title: string
  tables: LiveCasinoTable[]
  elapsedMs: number
  row?: boolean
  featured?: boolean
}>(), { row: false, featured: false })
const emit = defineEmits<{ select: [table: LiveCasinoTable] }>()
const list = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let resizeObserver: ResizeObserver | undefined

const updateScrollState = (): void => {
  const element = list.value
  canScrollLeft.value = !!element && props.row && element.scrollLeft > 2
  canScrollRight.value = !!element && props.row && element.scrollLeft + element.clientWidth < element.scrollWidth - 2
}

const scrollTables = (direction: number): void => {
  const element = list.value
  if (!element) return
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollBy({ left: direction * Math.max(190, element.clientWidth * .85), behavior: reducedMotion ? 'auto' : 'smooth' })
}

watch(() => [props.tables, props.row], async () => {
  await nextTick()
  updateScrollState()
}, { flush: 'post' })

onMounted(() => {
  updateScrollState()
  resizeObserver = new ResizeObserver(updateScrollState)
  if (list.value) resizeObserver.observe(list.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <section
    class="casino-table-section"
    :class="{ 'casino-table-section--featured': featured, 'casino-table-section--row': row }"
    :aria-labelledby="`${id}-heading`"
  >
    <h2 :id="`${id}-heading`">{{ title }}</h2>
    <div class="casino-section-viewport">
      <div ref="list" class="casino-section-list" @scroll.passive="updateScrollState">
        <LiveCasinoTableCard
          v-for="table in tables"
          :key="table.id"
          :table="table"
          :elapsed-ms="elapsedMs"
          compact
          @select="emit('select', $event)"
        />
      </div>
      <p v-if="!tables.length" class="casino-section-empty">This is no game currently.</p>
      <button v-if="canScrollLeft" class="casino-section-arrow casino-section-arrow--previous" type="button" :aria-label="`Previous ${title} tables`" @click="scrollTables(-1)">
        <ChevronLeft :size="19" aria-hidden="true" />
      </button>
      <button v-if="canScrollRight" class="casino-section-arrow casino-section-arrow--next" type="button" :aria-label="`Next ${title} tables`" @click="scrollTables(1)">
        <ChevronRight :size="19" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.casino-table-section { width: 100%; min-width: 0; margin-bottom: 22px; }
.casino-table-section h2 { margin: 0 0 14px; color: var(--main-color); font-size: 16px; font-weight: 400; line-height: 22px; }
.casino-table-section--featured h2 { color: var(--heading); }
.casino-section-empty { margin: 0; color: #929292; font-size: 12px; line-height: 20px; }
.casino-section-viewport { position: relative; min-width: 0; }
.casino-section-list { display: grid; min-width: 0; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 8px; }
.casino-table-section--row .casino-section-list { display: flex; overflow-x: auto; overscroll-behavior-x: contain; scrollbar-width: none; }
.casino-table-section--row .casino-section-list::-webkit-scrollbar { display: none; }
.casino-table-section--row .casino-section-list > :deep(.casino-table-card) { width: 190px; height: auto; flex: 0 0 190px; }
.casino-table-section--featured .casino-section-list > :deep(.casino-table-card) { width: 200px; flex-basis: 200px; }
.casino-section-arrow { position: absolute; top: 50%; z-index: 2; display: grid; width: 32px; height: 32px; place-items: center; transform: translateY(-50%); border: 3px solid #333; border-radius: 50%; color: #fff; background: #141414; cursor: pointer; }
.casino-section-arrow--previous { left: 0; }
.casino-section-arrow--next { right: 0; }
.casino-section-arrow:focus-visible { outline: 2px solid var(--main-color); outline-offset: 2px; }

@media (min-width: 640px) { .casino-section-list { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 900px) { .casino-section-list { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .casino-section-list { grid-template-columns: repeat(auto-fill, 204px); } }
@media (max-width: 639px) {
  .casino-table-section { margin-bottom: 24px; }
  .casino-table-section h2 { margin-bottom: 10px; font-size: 14px; }
  .casino-table-section--row .casino-section-list > :deep(.casino-table-card) { width: 180px; flex-basis: 180px; }
}
</style>
