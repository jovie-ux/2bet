<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ChevronDown, CircleDot, Columns2, Dices, Grid2X2, LayoutGrid, RectangleVertical, Zap } from 'lucide-vue-next'
import LiveCasinoTableCard from '~/components/live-casino/LiveCasinoTableCard.vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import ReminderModal from '~/components/modals/ReminderModal.vue'
import UnderMaintenance from '~/components/modals/UnderMaintenance.vue'
import { LIVE_CASINO_CATEGORIES, LIVE_CASINO_TABLES, type LiveCasinoTable } from '~/data/live-casino'

const props = defineProps<{ category: string }>()
const router = useRouter()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl
const isMaintenanceOpen = ref(false)
const selectedTable = ref<LiveCasinoTable | null>(null)
const tableType = ref('all')
const roadType = ref('all')
const showRoadmaps = ref(true)
const isBaccarat = computed(() => props.category === 'baccarat')
const cardGameCategories = new Set(['baccarat', 'dragon-tiger', 'blackjack', 'poker'])
const roundElapsedMs = useLiveCasinoPreviewClock(computed(() => cardGameCategories.has(props.category)))
const categoryLabel = computed(() => LIVE_CASINO_CATEGORIES.find(item => item.key === props.category)?.label || 'Live Casino')
const sectionLabel = computed(() => isBaccarat.value ? 'Good Road' : categoryLabel.value)

const categoryImages: Record<string, string> = {
  'game-show': '/images/live-casino/categories/game-show.webp',
  baccarat: '/images/live-casino/categories/baccarat.webp',
  'dragon-tiger': '/images/live-casino/categories/dragon-tiger.webp',
  roulette: '/images/live-casino/categories/roulette.webp',
  sicbo: '/images/live-casino/categories/sicbo.webp',
  'fan-tan': '/images/live-casino/categories/fan-tan.webp',
  blackjack: '/images/live-casino/categories/blackjack.webp',
  poker: '/images/live-casino/categories/poker.webp',
}
const tableTypes = [
  { key: 'all', label: 'All', icon: LayoutGrid },
  { key: 'classic', label: 'Classic', icon: RectangleVertical },
  { key: 'fast', label: 'Fast', icon: Zap },
  { key: 'bac-bo', label: 'Bac Bo', icon: Dices },
]

const hasRoadPattern = (table: LiveCasinoTable): boolean => {
  if (roadType.value === 'all') return true
  if (!Array.isArray(table.wins)) return false
  const outcomes = table.wins.flat().map((entry: any) => entry?.result).filter((result: any) => result === 'P' || result === 'B') as string[]
  if (roadType.value === 'banker') return outcomes.slice(-3).length === 3 && outcomes.slice(-3).every(result => result === 'B')
  if (roadType.value === 'player') return outcomes.slice(-3).length === 3 && outcomes.slice(-3).every(result => result === 'P')
  const tail = outcomes.slice(-4)
  return tail.length === 4 && tail.every((result, index) => index === 0 || result !== tail[index - 1])
}

const filteredTables = computed(() => LIVE_CASINO_TABLES.filter((table) => {
  if (table.category !== props.category && !(isBaccarat.value && table.category === 'live-casino')) return false
  if (isBaccarat.value && tableType.value !== 'all') {
    const fast = /speed|rapid|turbo/i.test(table.title)
    const bacBo = /bac[ -]?bo/i.test(table.title)
    if (tableType.value === 'fast' && !fast) return false
    if (tableType.value === 'classic' && (fast || bacBo)) return false
    if (tableType.value === 'bac-bo' && !bacBo) return false
  }
  return hasRoadPattern(table)
}))

const selectCategory = (key: string): void => {
  if (key === 'poker') {
    isMaintenanceOpen.value = true
    return
  }
  router.push(`/explore/entertainment/live-casino/${key}`)
}

const selectTable = (table: LiveCasinoTable): void => {
  if (props.category === 'poker') {
    isMaintenanceOpen.value = true
    return
  }
  selectedTable.value = table
}

const startTable = (): void => {
  if (import.meta.client) window.location.href = selectedTable.value?.href || bybetRedirectUrl
  selectedTable.value = null
}

const resetFilters = (): void => {
  tableType.value = 'all'
  roadType.value = 'all'
}

watch(() => props.category, (category) => {
  resetFilters()
  selectedTable.value = null
  isMaintenanceOpen.value = category === 'poker'
}, { immediate: true })
</script>

<template>
  <div class="live-casino-page">
    <div class="casino-lobby-navigation sticky-header-seal">
      <nav class="casino-category-nav" aria-label="Live casino categories">
        <span class="casino-provider-badge" title="Pragmatic Play"><img src="/images/casino/pragmatic-play.webp" alt="Pragmatic Play" /></span>
        <button
          v-for="item in LIVE_CASINO_CATEGORIES"
          :key="item.key"
          type="button"
          class="casino-category-button"
          :class="{ 'casino-category-button--active': category === item.key }"
          :aria-label="item.label"
          :aria-current="category === item.key ? 'page' : undefined"
          :title="item.label"
          @click="selectCategory(item.key)"
        >
          <Grid2X2 v-if="item.key === 'baccarat'" :size="21" aria-hidden="true" />
          <img v-else :src="categoryImages[item.key]" alt="" />
          <span v-if="category === item.key">{{ item.key === 'baccarat' ? 'Good Road' : item.label }}</span>
        </button>
      </nav>

      <div v-if="isBaccarat" class="casino-table-filters" role="group" aria-label="Table speed">
        <button v-for="item in tableTypes" :key="item.key" type="button" :class="{ 'casino-table-filter--active': tableType === item.key }" :aria-pressed="tableType === item.key" @click="tableType = item.key">
          <component :is="item.icon" :size="15" aria-hidden="true" />{{ item.label }}
        </button>
      </div>
    </div>

    <div class="casino-section-heading">
      <h1>{{ sectionLabel }} <span>{{ filteredTables.length }}</span></h1>
      <div class="casino-view-controls">
        <label v-if="isBaccarat || category === 'dragon-tiger'" class="casino-road-filter">
          <CircleDot :size="15" aria-hidden="true" />
          <select v-model="roadType" aria-label="Filter table roadmaps">
            <option value="all">All Roads</option>
            <option value="banker">Long Banker</option>
            <option value="player">Long Player</option>
            <option value="alternating">Alternating</option>
          </select>
          <ChevronDown :size="12" aria-hidden="true" />
        </label>
        <div class="casino-view-switch" role="group" aria-label="Table card view">
          <button type="button" :class="{ 'casino-view-button--active': !showRoadmaps }" :aria-pressed="!showRoadmaps" aria-label="Show table images only" @click="showRoadmaps = false"><Columns2 :size="14" aria-hidden="true" /></button>
          <button type="button" :class="{ 'casino-view-button--active': showRoadmaps }" :aria-pressed="showRoadmaps" aria-label="Show tables and roadmaps" @click="showRoadmaps = true"><Grid2X2 :size="14" aria-hidden="true" /></button>
        </div>
      </div>
    </div>

    <div v-if="filteredTables.length" class="casino-table-grid">
      <LiveCasinoTableCard v-for="table in filteredTables" :key="table.id" :table="table" :elapsed-ms="roundElapsedMs" :show-roadmap="showRoadmaps" @select="selectTable" />
    </div>
    <GameEmptyState v-else text="No tables match these filters." :show-reset="true" @reset="resetFilters" />

    <ReminderModal v-if="selectedTable" title="Reminder" message="Please login first" @close="selectedTable = null" @ok="startTable" />
    <UnderMaintenance v-if="isMaintenanceOpen" @close="isMaintenanceOpen = false" />
  </div>
</template>

<style scoped>
.live-casino-page { width: 100%; min-width: 0; padding-bottom: 48px; color: var(--text); }
.casino-lobby-navigation { position: sticky; z-index: 30; top: var(--content-sticky-top); background: var(--page); }
.casino-category-nav { display: flex; min-height: 60px; align-items: center; gap: 10px; padding: 8px 0; overflow-x: auto; border-radius: 12px 12px 0 0; background: var(--page); scrollbar-width: none; }
.casino-category-nav::-webkit-scrollbar { display: none; }
.casino-provider-badge,
.casino-category-button { display: inline-flex; width: 44px; height: 44px; flex: 0 0 auto; align-items: center; justify-content: center; border: 0; border-radius: 50%; color: #969696; background: #222; }
.casino-provider-badge img { width: 28px; height: 28px; object-fit: contain; }
.casino-category-button { gap: 6px; cursor: pointer; transition: background-color 150ms ease, color 150ms ease; }
.casino-category-button > img { width: 27px; height: 27px; object-fit: contain; opacity: .65; filter: grayscale(1); }
.casino-category-button--active { width: auto; min-width: 44px; padding: 0 12px; border-radius: 24px; color: #fff; background: var(--main-color); }
.casino-category-button--active > img { width: 22px; height: 22px; opacity: 1; filter: grayscale(1) brightness(2); }
.casino-category-button span { font-size: 14px; font-weight: 700; white-space: nowrap; }
.casino-category-button:focus-visible,
.casino-table-filters button:focus-visible,
.casino-view-switch button:focus-visible { outline: 2px solid var(--main-color); outline-offset: 2px; }
.casino-table-filters { display: flex; gap: 8px; min-height: 44px; align-items: center; padding: 5px 8px; border-radius: 10px; background: var(--surface); }
.casino-table-filters button { display: inline-flex; min-height: 29px; align-items: center; gap: 3px; padding: 3px 7px; border-radius: 7px; color: #929292; font-size: 13px; line-height: 20px; cursor: pointer; }
.casino-table-filters .casino-table-filter--active { color: var(--main-color); background: color-mix(in srgb, var(--main-color) 13%, transparent); }
.casino-section-heading { display: flex; min-height: 50px; align-items: center; justify-content: space-between; gap: 12px; }
.casino-section-heading h1 { display: flex; min-width: 0; align-items: center; gap: 9px; margin: 0; color: var(--heading); font-size: 16px; font-weight: 600; line-height: 22px; }
.casino-section-heading h1 span { color: #8c8c8c; font-size: 12px; }
.casino-view-controls { display: flex; flex-shrink: 0; align-items: center; gap: 5px; }
.casino-road-filter { position: relative; display: flex; min-height: 32px; align-items: center; gap: 5px; padding: 0 10px; border-radius: 18px; color: #929292; background: #222; }
.casino-road-filter > svg:first-child { color: #cc6971; }
.casino-road-filter select { width: 72px; height: 32px; padding: 0; appearance: none; border: 0; outline: none; color: #aaa; background: transparent; font-size: 10px; cursor: pointer; }
.casino-road-filter option { color: #eee; background: #222; }
.casino-road-filter:focus-within { outline: 2px solid var(--main-color); }
.casino-view-switch { display: flex; min-height: 32px; align-items: center; padding: 0 3px; border-radius: 18px; background: #222; }
.casino-view-switch button { display: grid; width: 31px; height: 25px; place-items: center; color: #969696; cursor: pointer; }
.casino-view-switch button + button { border-left: 1px solid #3d3d3d; }
.casino-view-switch .casino-view-button--active { color: var(--main-color); }
.casino-table-grid { display: grid; min-width: 0; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; align-items: start; }

@media (min-width: 640px) { .casino-table-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 900px) { .casino-table-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (min-width: 1280px) { .casino-table-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
@media (min-width: 1440px) { .casino-table-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); } }

@media (max-width: 639px) {
  .casino-category-nav { gap: 8px; min-height: 54px; }
  .casino-provider-badge,
  .casino-category-button { width: 38px; height: 38px; }
  .casino-category-button--active { width: auto; }
  .casino-category-button span { font-size: 12px; }
  .casino-section-heading { gap: 5px; }
  .casino-section-heading h1 { gap: 5px; font-size: 14px; }
  .casino-road-filter { padding: 0 7px; gap: 3px; }
  .casino-road-filter select { width: 65px; }
  .casino-view-switch button { width: 27px; }
  .casino-table-grid { gap: 7px; }
}
</style>
