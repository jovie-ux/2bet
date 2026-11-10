<script setup lang="ts">
import { ChevronLeft, Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import GameCard from '~/components/game-cards/GameCard.vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import JackpotWinnersCard from '~/components/jackpot/JackpotWinnersCard.vue'
import SlotFilterModal from '~/components/slots/SlotFilterModal.vue'
import { getStandaloneJackpotGames, normalizeSlotProvider, type SlotGame } from '~/data/slots'

useAppSeo({
  title: 'Jackpots Exclusivos Betsoft com Prêmios em Dinheiro | 2bet',
  description: 'Aproveite jackpots acumulados da Betsoft na 2bet Brasil. Caça-níqueis temáticos em 3D, multiplicadores altos e rodadas bônus emocionantes.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Jackpots', path: '/egames/jackpot/all' },
    { name: 'Jogos de Jackpot Standalone', path: '/egames/jackpot/standalone' },
  ],
})

const router = useRouter()
const { translate } = useSitePreferences()
const activeProvider = ref<'all' | 'bs'>('all')
const activeGameId = ref<string | null>(null)
const searchQuery = ref('')
const isSearchOpen = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isFilterOpen = ref(false)
const filterState = ref({
  theme: 'All',
  feature: 'All',
  winningLine: 'All',
})

const currentWinners = useJackpotWinners()
const { showDemoMessage } = useDemoInteraction()
const { addRecentGame } = useRecentGames()
const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`

const matchesWinningLine = (game: SlotGame): boolean => {
  const selection = filterState.value.winningLine
  if (selection === 'All') return true

  const line = game.winningLine || ''
  const count = Number.parseInt(line, 10)
  if (selection === '≤10 lines') return !Number.isNaN(count) && count <= 10
  if (selection === '11–99 lines') return !Number.isNaN(count) && count >= 11 && count <= 99
  if (selection === '≥100 lines') {
    const isWays = line.toLowerCase().includes('way') || line.toLowerCase().includes('megaways')
    return isWays || (!Number.isNaN(count) && count >= 100)
  }
  return true
}

const filteredGames = computed<SlotGame[]>(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return getStandaloneJackpotGames().filter((game) => {
    if (activeProvider.value === 'bs' && normalizeSlotProvider(game.provider) !== 'bs') return false
    if (query && !game.title.toLowerCase().includes(query) && !game.provider.toLowerCase().includes(query)) return false
    if (filterState.value.theme !== 'All' && game.theme !== filterState.value.theme) return false
    if (filterState.value.feature !== 'All' && !game.features?.includes(filterState.value.feature)) return false
    return matchesWinningLine(game)
  })
})

const openSearch = (): void => {
  isSearchOpen.value = true
  nextTick(() => searchInputRef.value?.focus())
}

const closeSearch = (): void => {
  searchQuery.value = ''
  isSearchOpen.value = false
}

const handleCardClick = (game: SlotGame): void => {
  addRecentGame(game)
  activeGameId.value = activeGameId.value === game.id ? null : game.id
}

const showGameDetails = (game: SlotGame): void => {
  const jackpotPool = game.jackpotPrice || game.JackpotPrice || 'Active'
  showDemoMessage(`${game.title} (${game.provider}) — Jackpot Pool: ${jackpotPool} • RTP: ${game.rtpPercent || '97.0%'}`)
}

const handleStartNow = (game: SlotGame): void => {
  addRecentGame(game)
  showDemoMessage(`Starting ${game.title} (${game.provider})...`)
  if (import.meta.client) window.open(game.href || bybetRedirectUrl, '_blank')
}

const handleDemo = (game: SlotGame): void => {
  addRecentGame(game)
  showDemoMessage(`Launching Demo mode for ${game.title} (${game.provider})...`)
}

const handleDocumentClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null
  if (!target?.closest('.game-card')) activeGameId.value = null
}

onMounted(() => {
  if (import.meta.client) document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  if (import.meta.client) document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div class="standalone-jackpot-page w-full min-w-0 pb-16">
    <div class="sticky-header sticky-header-seal sticky top-[var(--content-sticky-top)] z-40 -mx-1  px-1 pb-2">
      <header class="flex min-h-[52px] items-center gap-3 rounded-xl bg-[#171817] px-3 shadow-sm">
        <button
          type="button"
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#242625] text-[#a2a6a4] transition-colors hover:text-white"
          aria-label="Back to jackpots"
          @click="router.push('/egames/jackpot/all')"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <h1 class="truncate text-[15px] font-semibold text-white">{{ translate('Standalone Jackpot Game') }}</h1>
      </header>

      <div class="flex items-center justify-between gap-2 bg-black py-2">
        <div class="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            class="min-h-[36px] shrink-0 rounded-full border border-white/5 px-5 text-[12px] font-semibold transition-colors"
            :class="activeProvider === 'all' ? 'bg-[var(--main-color)] text-white shadow' : 'bg-[#242625] text-[#8e9491]'"
            @click="activeProvider = 'all'"
          >
            {{ translate('All') }}
          </button>
          <button
            type="button"
            class="min-h-[36px] shrink-0 rounded-full border border-white/5 px-5 text-[12px] font-semibold transition-colors"
            :class="activeProvider === 'bs' ? 'bg-[var(--main-color)] text-white shadow' : 'bg-[#242625] text-[#8e9491]'"
            @click="activeProvider = 'bs'"
          >
            BS
          </button>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#242625] text-[#8e9491] transition-colors hover:text-white"
            :aria-label="translate('Search standalone jackpot games')"
            @click="openSearch"
          >
            <Search class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#242625] text-[#8e9491] transition-colors hover:text-white"
            :aria-label="translate('Filter standalone jackpot games')"
            @click="isFilterOpen = true"
          >
            <SlidersHorizontal class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div v-if="isSearchOpen" class="flex items-center gap-2 bg-black pb-2">
        <div class="relative min-w-0 flex-1">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            :placeholder="translate('Search jackpot games')"
            class="h-10 w-full rounded-full border border-[#2b2d2b] bg-[#171817] px-4 pr-10 text-sm text-white placeholder-[#7a807d] outline-none transition-colors focus:border-[var(--main-color)]"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7a807d] hover:text-white"
            :aria-label="translate('Clear search')"
            @click="searchQuery = ''"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
        <button type="button" class="px-2 text-sm font-medium text-white" @click="closeSearch">{{ translate('Cancel') }}</button>
      </div>
    </div>

    <div
      v-if="filteredGames.length"
      class="mb-36 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11"
      :aria-label="translate('Standalone jackpot games')"
    >
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        :activeId="activeGameId"
        displayCategory="jackpot"
        @select="handleCardClick"
        @info="showGameDetails"
        @start="handleStartNow"
        @demo="handleDemo"
      />
    </div>

    <GameEmptyState v-else text="No standalone jackpot games found." class="mb-36" />

    <JackpotWinnersCard :winners="currentWinners" />

    <SlotFilterModal v-model="filterState" v-model:open="isFilterOpen" />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
