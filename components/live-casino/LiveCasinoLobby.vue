<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Grid2X2, Rows2 } from 'lucide-vue-next'
import LiveCasinoCategoryIcon from '~/components/live-casino/LiveCasinoCategoryIcon.vue'
import LiveCasinoTableCard from '~/components/live-casino/LiveCasinoTableCard.vue'
import LiveCasinoTableSection from '~/components/live-casino/LiveCasinoTableSection.vue'
import LiveCasinoRoadFilters from '~/components/live-casino/LiveCasinoRoadFilters.vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import ReminderModal from '~/components/modals/ReminderModal.vue'
import UnderMaintenance from '~/components/modals/UnderMaintenance.vue'
import { LIVE_CASINO_CATEGORIES, LIVE_CASINO_TABLES, type LiveCasinoTable } from '~/data/live-casino'
import { matchesTableRoadPattern, type LiveCasinoRoadPatternKey } from '~/utils/liveCasinoRoadPatterns'

const props = defineProps<{ category: string }>()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl
const activeCategory = computed(() => props.category === 'game-show' ? 'live-show' : props.category)
const isFeatured = computed(() => activeCategory.value === 'featured')
const isGoodRoad = computed(() => activeCategory.value === 'good-road')
const isBaccarat = computed(() => activeCategory.value === 'baccarat')
const isEvolution = computed(() => activeCategory.value === 'evolution')
const categoryLabel = computed(() => LIVE_CASINO_CATEGORIES.find(item => item.key === activeCategory.value)?.label
  || ({ 'fan-tan': 'Fan Tan', blackjack: 'Blackjack', poker: 'Poker' } as Record<string, string>)[activeCategory.value]
  || 'Live Casino')
const roundElapsedMs = useLiveCasinoPreviewClock(true)
const isMaintenanceOpen = ref(false)
const selectedTable = ref<LiveCasinoTable | null>(null)
const tableType = ref('all')
const roadType = ref<LiveCasinoRoadPatternKey>('all')
const roadFiltersOpen = ref(false)
const tableLayout = ref<'vertical' | 'horizontal'>('vertical')
const tableTypes = [
  { key: 'all', label: 'All' },
  { key: 'classic', label: 'Classic' },
  { key: 'fast', label: 'Fast' },
  { key: 'bac-bo', label: 'Bac Bo' },
]
const baccaratType = (table: LiveCasinoTable): string => {
  const text = `${table.id} ${table.title}`.toLowerCase()
  if (/bac[ -]?bo/.test(text)) return 'bac-bo'
  if (/speed|rapid|turbo|fast/.test(text)) return 'fast'
  return 'classic'
}
const baccaratTables = computed(() => LIVE_CASINO_TABLES.filter(table => ['baccarat', 'live-casino'].includes(table.category)))
const tablesForCategory = (key: string): LiveCasinoTable[] => key === 'baccarat'
  ? baccaratTables.value
  : LIVE_CASINO_TABLES.filter(table => table.category === key || (key === 'live-show' && table.category === 'game-show'))
const baccaratSections = computed(() => tableTypes.slice(1).map(item => ({
  key: item.key,
  title: item.label,
  tables: baccaratTables.value.filter(table => baccaratType(table) === item.key),
})))
const featuredSections = computed(() => [
  { key: 'baccarat', title: 'Baccarat' },
  { key: 'live-show', title: 'Live Show' },
  { key: 'dragon-tiger', title: 'Dragon Tiger' },
  { key: 'roulette', title: 'Roulette' },
  { key: 'sicbo', title: 'Sicbo' },
].map(section => ({ ...section, tables: tablesForCategory(section.key) })))

const filteredTables = computed(() => baccaratTables.value.filter(table =>
  (tableType.value === 'all' || baccaratType(table) === tableType.value) && matchesTableRoadPattern(table, roadType.value)))
const categoryTables = computed(() => tablesForCategory(activeCategory.value))

const selectTable = (table: LiveCasinoTable): void => {
  if (activeCategory.value === 'poker') {
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
watch(activeCategory, (category) => {
  resetFilters()
  tableLayout.value = 'vertical'
  roadFiltersOpen.value = false
  selectedTable.value = null
  isMaintenanceOpen.value = category === 'poker'
}, { immediate: true })
</script>

<template>
  <div class="live-casino-page" :class="{ 'live-casino-page--featured': isFeatured }">
    <div class="casino-lobby-navigation sticky-header-seal">
      <nav class="casino-category-nav " aria-label="Live casino categories">
        <template v-for="item in LIVE_CASINO_CATEGORIES" :key="item.key">
          <NuxtLink
            :to="`/explore/entertainment/live-casino/${item.key}`"
            class="casino-category-button"
            :class="{ 'casino-category-button--active': activeCategory === item.key }"
            :aria-label="item.label"
            :aria-current="activeCategory === item.key ? 'page' : undefined"
            :title="item.label"
          >
            <LiveCasinoCategoryIcon :name="item.key" />
            <span v-if="activeCategory === item.key">{{ item.label }}</span>
          </NuxtLink>
          <a v-if="item.key === 'baccarat' && isBaccarat" :href="bybetRedirectUrl" class="casino-multitable-button" aria-label="Open Multi-table">
            <LiveCasinoCategoryIcon name="multi-table" /><span>Multi-table</span>
          </a>
        </template>
      </nav>
      <div v-if="isGoodRoad" class="casino-table-filters" role="group" aria-label="Table speed">
        <button
          v-for="item in tableTypes"
          :key="item.key"
          type="button"
          :class="{ 'casino-table-filter--active': tableType === item.key }"
          :aria-pressed="tableType === item.key"
          @click="tableType = item.key"
        >
          <em v-if="item.key === 'all'" class="flex h-4 w-4 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><path d="M3 2.5H10.35C10.9023 2.5 11.35 2.94773 11.35 3.5V10.85C11.35 11.4023 10.9023 11.85 10.35 11.85H3C2.44773 11.85 2 11.4023 2 10.85V3.5C2 2.94773 2.44773 2.5 3 2.5ZM17.325 2.5C14.7431 2.5 12.65 4.59308 12.65 7.175C12.65 9.75693 14.7431 11.85 17.325 11.85C19.9069 11.85 22 9.75693 22 7.175C22 4.59308 19.9069 2.5 17.325 2.5ZM3 22.5H10.35C10.9023 22.5 11.35 22.0523 11.35 21.5V14.15C11.35 13.5977 10.9023 13.15 10.35 13.15H3C2.44773 13.15 2 13.5977 2 14.15V21.5C2 22.0523 2.44773 22.5 3 22.5ZM21 22.5H13.65C13.0977 22.5 12.65 22.0523 12.65 21.5V14.15C12.65 13.5977 13.0977 13.15 13.65 13.15H21C21.5523 13.15 22 13.5977 22 14.15V21.5C22 22.0523 21.5523 22.5 21 22.5Z" fill="none" class="fill-primary-text"></path></svg>
          </em>
          <em v-else-if="item.key === 'classic'" class="flex h-4 w-4 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class=""><path d="M15.1543 3.45215C15.4775 3.57595 15.7377 3.81715 15.8809 4.12402C16.024 4.43137 16.0382 4.78149 15.9199 5.09863L12.2637 15.1572C12.2098 15.3136 12.1242 15.4583 12.0117 15.582C11.8992 15.7058 11.7617 15.8064 11.6084 15.8779C11.4553 15.9493 11.2889 15.99 11.1191 15.998C10.9493 16.0061 10.7789 15.9815 10.6191 15.9248L5.59961 13.8418H9.31445C10.3754 13.8418 10.8007 13.4633 10.8008 12.4014V1.59961L15.1543 3.45215ZM9.20996 0C9.90443 0.000136475 10.1953 0.738699 10.1953 1.45508V11.6377C10.1953 12.3541 10.1616 13.0918 9.46777 13.0918H0.740234C0.627008 13.0775 0.51747 13.041 0.418945 12.9834C0.320462 12.9258 0.233953 12.8485 0.166016 12.7568C0.0981847 12.6651 0.048823 12.5602 0.0224609 12.4492C-0.00391043 12.338 -0.006783 12.222 0.0126953 12.1094V1.29688C0.0074462 0.958618 0.136844 0.631806 0.37207 0.388672C0.607255 0.145763 0.929511 0.00594411 1.26758 0H9.20996ZM1.59668 9.74512C1.31352 9.74517 1.08526 9.86199 0.916016 10.0947C0.750379 10.3275 0.664123 10.6349 0.664062 11.0098C0.664085 11.3655 0.743441 11.6413 0.902344 11.8418C1.06126 12.0454 1.29332 12.1455 1.59375 12.1455C1.84234 12.1454 2.05007 12.0709 2.21582 11.9189C2.38147 11.7702 2.46387 11.5785 2.46387 11.3457C2.46373 11.1196 2.39495 10.9351 2.25 10.793C2.10499 10.6443 1.90761 10.5704 1.66602 10.5703C1.54179 10.5704 1.43063 10.5928 1.33398 10.6348C1.2339 10.6801 1.14769 10.752 1.0752 10.8457H1.05762V10.8154C1.05769 10.6022 1.10607 10.4244 1.19922 10.2822C1.29941 10.1334 1.43137 10.0557 1.59375 10.0557C1.83183 10.0558 1.97309 10.1628 2.02148 10.376H2.41602C2.35721 9.95567 2.08371 9.74512 1.59668 9.74512ZM1.58008 10.877C1.73168 10.8771 1.84883 10.923 1.93164 11.0068C2.02122 11.0908 2.06334 11.2038 2.06348 11.3457C2.06348 11.488 2.02146 11.6057 1.93164 11.6963C1.84198 11.7864 1.72471 11.831 1.58008 11.8311C1.44197 11.8311 1.32418 11.7891 1.23438 11.7051C1.14468 11.621 1.09962 11.508 1.09961 11.3594C1.09961 11.2106 1.14467 11.0942 1.22754 11.0068C1.31389 10.9229 1.43164 10.877 1.58008 10.877ZM6.29883 4.65039C6.08914 4.66066 5.88445 4.71871 5.7002 4.81934C5.51586 4.92007 5.35634 5.06139 5.23438 5.23242C5.11675 5.0591 4.95886 4.91554 4.77539 4.81445C4.592 4.71354 4.38695 4.65717 4.17773 4.65039C3.88408 4.66313 3.60698 4.79227 3.4082 5.00879C3.20955 5.22545 3.10561 5.51296 3.11816 5.80664C3.12656 6.08596 3.2195 6.35643 3.38574 6.58105L5.03418 8.62305C5.22021 8.80179 5.25394 8.80175 5.43848 8.62305L7.09082 6.58105C7.26726 6.36223 7.36145 6.08772 7.3584 5.80664C7.36471 5.66125 7.34276 5.51565 7.29297 5.37891C7.2432 5.24224 7.1666 5.11701 7.06836 5.00977C6.96998 4.90247 6.85168 4.81441 6.71973 4.75293C6.58776 4.69147 6.44427 4.65667 6.29883 4.65039ZM12.7998 5.82422L13.1309 5.93262L13.3379 5.30469L13.6553 5.16797L14.1768 6.27637L14.624 6.42383L13.9443 5.04492L15.0908 4.55664L14.6709 4.41797L13.4473 4.96973L13.7314 4.1084L13.4004 4L12.7998 5.82422ZM8.30566 0.641602C8.05701 0.641646 7.84938 0.716192 7.68359 0.868164C7.51793 1.01689 7.43559 1.20772 7.43555 1.44043C7.43557 1.6668 7.50433 1.85184 7.64941 1.99414C7.79435 2.14255 7.99109 2.21665 8.23242 2.2168C8.35664 2.2168 8.4678 2.19429 8.56445 2.15234C8.66458 2.10709 8.75169 2.0361 8.82422 1.94238H8.8418V1.9707C8.84178 2.18413 8.79248 2.36259 8.69922 2.50488C8.5991 2.65341 8.46783 2.73137 8.30566 2.73145C8.06748 2.73138 7.92535 2.62442 7.87695 2.41113H7.4834C7.54221 2.83145 7.81569 3.04102 8.30273 3.04102C8.58567 3.04087 8.81326 2.92492 8.98242 2.69238C9.14824 2.4595 9.23535 2.15154 9.23535 1.77637C9.23527 1.4209 9.15586 1.14574 8.99707 0.945312C8.83819 0.741664 8.60607 0.641653 8.30566 0.641602ZM8.31934 0.955078C8.45741 0.955085 8.57524 0.997092 8.66504 1.08105C8.7548 1.1651 8.79976 1.27908 8.7998 1.42773C8.79973 1.57627 8.75465 1.69303 8.67188 1.78027C8.58553 1.86425 8.46778 1.90917 8.31934 1.90918C8.16753 1.90915 8.04967 1.86421 7.9668 1.78027C7.87719 1.69622 7.83596 1.58255 7.83594 1.44043C7.83598 1.29843 7.87732 1.18226 7.9668 1.0918C8.05659 1.00127 8.17431 0.955114 8.31934 0.955078Z" class="fill-icon-3"></path></svg>
          </em>
          <em v-else-if="item.key === 'fast'" class="flex h-4 w-4 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" class=""><path d="M6.4 12.8C2.86464 12.8 0 9.93536 0 6.4C0 2.86464 2.86464 0 6.4 0C9.93536 0 12.8 2.86464 12.8 6.4C12.8 9.93349 9.93536 12.8 6.4 12.8ZM7.7808 4.50398C7.79953 4.29227 7.66838 4.09555 7.46604 4.02998C7.2637 3.9644 7.04262 4.04684 6.93208 4.22857L5.51944 6.58361C5.47635 6.6548 5.44262 6.72974 5.41639 6.80843C5.23091 7.38173 5.54379 7.99625 6.1171 8.18361C6.19578 8.20984 6.27635 8.22482 6.35878 8.23232C6.95831 8.28478 7.48852 7.84075 7.54098 7.24122L7.7808 4.50398ZM6.4 0.914286C4.47962 0.914286 2.7897 1.90164 1.80984 3.39672L2.57424 3.89696C3.3911 2.65105 4.8 1.82857 6.4 1.82857C8.02248 1.82857 9.44824 2.67354 10.2595 3.94754L11.0314 3.45667C10.0571 1.92787 8.34848 0.914286 6.4 0.914286Z" class="fill-icon-3"></path></svg>
          </em>
          <em v-else-if="item.key === 'bac-bo'" class="flex h-4 w-4 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class=""><path d="M14.4626 4.52509C14.7597 4.65313 14.9725 4.87769 15.1003 5.19891C15.2282 5.52041 15.2327 5.84331 15.115 6.16669L12.1199 14.3981C12.0022 14.7214 11.7952 14.9524 11.4998 15.0915C11.2043 15.2306 10.9073 15.2361 10.6101 15.1081L5.28687 12.8151H10.0662C10.2352 12.8513 10.403 12.8308 10.5691 12.7526C10.576 12.7494 10.5828 12.7453 10.5896 12.7419C10.8668 12.6552 11.1174 12.4928 11.3328 12.2585C11.6685 11.8933 11.8454 11.4353 11.8455 10.9186V7.47723C12.0646 7.56654 12.2807 7.56145 12.4949 7.46063C12.7149 7.35709 12.8696 7.183 12.9587 6.93817C13.0478 6.69333 13.0451 6.45087 12.95 6.21161C12.8547 5.97228 12.6946 5.80369 12.4695 5.70673C12.2592 5.61615 12.0512 5.61368 11.8455 5.69794V3.39813L14.4626 4.52509ZM10.1013 0.800476C10.4209 0.800524 10.695 0.923941 10.9226 1.17157C11.1502 1.41921 11.2634 1.71742 11.2634 2.06512V10.9177C11.2634 11.2654 11.1502 11.5636 10.9226 11.8112C10.695 12.0589 10.4209 12.1823 10.1013 12.1823H1.96265C1.64296 12.1823 1.36902 12.0589 1.14136 11.8112C0.91373 11.5636 0.800537 11.2654 0.800537 10.9177V2.06512C0.800537 1.71739 0.913767 1.41922 1.14136 1.17157C1.36902 0.923911 1.64296 0.800494 1.96265 0.800476H10.1013ZM8.35718 8.07196C8.11499 8.07196 7.90953 8.16491 7.73999 8.3493C7.57044 8.53377 7.48511 8.75769 7.48511 9.02118C7.48518 9.28451 7.57052 9.50868 7.73999 9.69305C7.90946 9.87719 8.11516 9.96942 8.35718 9.96942C8.59921 9.96942 8.80489 9.8772 8.97437 9.69305C9.14383 9.50868 9.22917 9.28451 9.22925 9.02118C9.22925 8.75769 9.14391 8.53377 8.97437 8.3493C8.80482 8.1649 8.59938 8.07196 8.35718 8.07196ZM6.03198 5.54266C5.78978 5.54266 5.58336 5.63457 5.41382 5.81903C5.24437 6.00339 5.16001 6.22761 5.15991 6.49091C5.15991 6.75416 5.24457 6.97841 5.41382 7.16278C5.58336 7.3472 5.78977 7.44012 6.03198 7.44012C6.2742 7.4401 6.47964 7.34718 6.64917 7.16278C6.81868 6.97833 6.90405 6.75437 6.90405 6.49091C6.90396 6.22761 6.81862 6.00339 6.64917 5.81903C6.47972 5.63488 6.27401 5.54268 6.03198 5.54266ZM3.70679 3.01337C3.46458 3.01337 3.25817 3.10529 3.08862 3.28973C2.91918 3.47409 2.83478 3.69823 2.83472 3.96161C2.83472 4.22493 2.91929 4.44913 3.08862 4.63348C3.25817 4.81795 3.46458 4.91083 3.70679 4.91083C3.94893 4.91079 4.15446 4.8179 4.32397 4.63348C4.49356 4.44907 4.57886 4.2251 4.57886 3.96161C4.5788 3.6982 4.4935 3.4741 4.32397 3.28973C4.15451 3.10552 3.94881 3.0134 3.70679 3.01337Z" class="fill-icon-3"></path></svg>
          </em>
          <span>{{ item.label }}</span>
        </button>
      </div>
    </div>

    <h1 v-if="!isGoodRoad" class="sr-only">{{ categoryLabel }}</h1>
    <div v-if="isFeatured" class="casino-section-list">
      <LiveCasinoTableSection v-for="section in featuredSections" :id="section.key" :key="section.key" :title="section.title" :tables="section.tables" :elapsed-ms="roundElapsedMs" row featured @select="selectTable" />
    </div>
    <template v-else-if="isGoodRoad">
      <div class="casino-section-heading" :class="{ 'casino-section-heading--filters-open': roadFiltersOpen }">
        <h1>Good Road <span>{{ filteredTables.length }}</span></h1>
        <div class="casino-view-controls">
          <LiveCasinoRoadFilters v-model="roadType" @update:open="roadFiltersOpen = $event" />
          <div class="casino-view-switch" role="group" aria-label="Table card view">
            <button type="button" :class="{ 'casino-view-button--active': tableLayout === 'horizontal' }" :aria-pressed="tableLayout === 'horizontal'" aria-label="Show side-by-side tables and roadmaps" @click="tableLayout = 'horizontal'"><Rows2 :size="14" aria-hidden="true" /></button>
            <button type="button" :class="{ 'casino-view-button--active': tableLayout === 'vertical' }" :aria-pressed="tableLayout === 'vertical'" aria-label="Show tables above roadmaps" @click="tableLayout = 'vertical'"><Grid2X2 :size="14" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div v-if="filteredTables.length" class="casino-table-grid" :class="{ 'casino-table-grid--horizontal': tableLayout === 'horizontal' }">
        <LiveCasinoTableCard v-for="table in filteredTables" :key="table.id" :table="table" :elapsed-ms="roundElapsedMs" :layout="tableLayout" @select="selectTable" />
      </div>
      <GameEmptyState v-else text="No Good Road at the moment" :show-reset="true" @reset="resetFilters" />
    </template>
    <div v-else-if="isBaccarat" class="casino-section-list">
      <LiveCasinoTableSection v-for="section in baccaratSections" :id="section.key" :key="section.key" :title="section.title" :tables="section.tables" :elapsed-ms="roundElapsedMs" row @select="selectTable" />
    </div>
    <GameEmptyState v-else-if="isEvolution" text="This is no game currently" />
    <div v-else class="casino-section-list">
      <LiveCasinoTableSection v-if="categoryTables.length" :id="activeCategory" :title="categoryLabel" :tables="categoryTables" :elapsed-ms="roundElapsedMs" @select="selectTable" />
      <GameEmptyState v-else text="This is no game currently" />
    </div>

    <ReminderModal v-if="selectedTable" title="Reminder" message="Please login first" @close="selectedTable = null" @ok="startTable" />
    <UnderMaintenance v-if="isMaintenanceOpen" @close="isMaintenanceOpen = false" />
  </div>
</template>

<style scoped>
.live-casino-page { width: 100%; min-width: 0; padding-bottom: 48px; color: var(--text); }
.casino-lobby-navigation { position: sticky; z-index: 30; top: var(--content-sticky-top); }
.casino-category-nav { display: flex; min-height: 60px; align-items: center; gap: 12px; padding: 8px; overflow-x: auto; border-radius: 12px 12px 0 0; background: var(--page); scrollbar-width: none; }
.casino-category-nav::-webkit-scrollbar { display: none; }
.casino-category-button, .casino-multitable-button { display: inline-flex; width: 44px; height: 44px; flex: 0 0 auto; align-items: center; justify-content: center; gap: 6px; border: 0; border-radius: 50%; color: #959799; background: #282828; text-decoration: none; cursor: pointer; transition: background-color 150ms ease, color 150ms ease; }
.casino-category-button :deep(svg), .casino-category-button :deep(img), .casino-multitable-button :deep(svg) { width: 24px; height: 24px; flex: 0 0 auto; }
.casino-category-button--active { position: relative; z-index: 1; width: auto; min-width: 44px; padding: 0 12px; border-radius: 24px; color: #fff; background: var(--main-color); }
.casino-category-button span, .casino-multitable-button span { font-size: 14px; font-weight: 700; white-space: nowrap; }
.casino-multitable-button { width: auto; margin-left: -12px; padding: 0 12px; border-radius: 0 24px 24px 0; }
.casino-multitable-button :deep(svg) { width: 20px; height: 20px; }
.casino-category-button:focus-visible, .casino-multitable-button:focus-visible, .casino-table-filters button:focus-visible, .casino-view-switch button:focus-visible { outline: 2px solid var(--main-color); outline-offset: 2px; }
.casino-table-filters { display: flex; gap: 8px; min-height: 44px; align-items: center; padding: 5px 8px; border-radius: 10px; background: var(--surface); }
.casino-table-filters button { display: inline-flex; min-height: 29px; align-items: center; gap: 4px; padding: 3px 7px; border-radius: 7px; color: #929292; font-size: 13px; line-height: 20px; cursor: pointer; transition: color 150ms ease, background-color 150ms ease; }
.casino-table-filters button:hover:not(.casino-table-filter--active) { color: #d0d0d0; }
.casino-table-filters button em { font-style: normal; flex-shrink: 0; }
.casino-table-filters button :deep(svg) { display: block; max-width: 100%; max-height: 100%; }
.casino-table-filters button :deep(path) { fill: currentColor; transition: fill 150ms ease; }
.casino-table-filters .casino-table-filter--active { color: var(--main-color); background: color-mix(in srgb, var(--main-color) 13%, transparent); }
.casino-section-list { min-width: 0; padding-top: 16px; }
.casino-section-heading { display: flex; min-height: 50px; align-items: center; justify-content: space-between; gap: 12px; }
.casino-section-heading h1 { display: flex; min-width: 0; align-items: center; gap: 9px; margin: 0; color: var(--heading); font-size: 16px; font-weight: 600; line-height: 22px; }
.casino-section-heading h1 span { color: #8c8c8c; font-size: 12px; }
.casino-view-controls { display: flex; flex-shrink: 0; align-items: center; gap: 5px; }
.casino-view-switch { display: flex; min-height: 32px; align-items: center; padding: 0 3px; border-radius: 18px; background: #222; }
.casino-view-switch button { display: grid; width: 31px; height: 25px; place-items: center; color: #969696; cursor: pointer; }
.casino-view-switch button + button { border-left: 1px solid #3d3d3d; }
.casino-view-switch .casino-view-button--active { color: var(--main-color); }
.casino-table-grid { display: grid; min-width: 0; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; align-items: start; }
@media (min-width: 640px) { .casino-table-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 900px) { .casino-table-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (min-width: 1280px) { .casino-table-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
@media (min-width: 1440px) { .casino-table-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); } }
.casino-table-grid--horizontal { grid-template-columns: minmax(0, 1fr); }
@media (min-width: 640px) { .casino-table-grid--horizontal { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1100px) { .casino-table-grid--horizontal { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 1440px) {
  .casino-table-grid--horizontal { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .casino-section-heading--filters-open { min-height: 80px; }
}
@media (max-width: 639px) {
  .casino-category-nav { gap: 8px; min-height: 54px; padding-inline: 10px; }
  .casino-category-button { width: 38px; height: 38px; }
  .casino-category-button--active { width: auto; }
  .casino-category-button span, .casino-multitable-button span { font-size: 12px; }
  .casino-multitable-button { height: 38px; margin-left: -8px; }
  .casino-section-heading { gap: 5px; }
  .casino-section-heading h1 { gap: 5px; font-size: 14px; }
  .casino-view-switch button { width: 27px; }
  .casino-table-grid { gap: 7px; }
}
</style>
