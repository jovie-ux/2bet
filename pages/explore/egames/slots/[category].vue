<script setup lang="ts">
import {
  House,
  Percent,
  ThumbsUp,
  Crown,
  Medal,
  Sparkles,
  Flame,
  Snowflake,
  Banknote,
  Trophy,
  MessageCircle,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Play,
  User,
  X,
  Trash2,
} from 'lucide-vue-next'
import type { Component } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  FREQUENTLY_SEARCHED_SLOTS,
  SLOT_CATEGORIES,
  SLOT_CATEGORY_SVGS,
  SLOT_PROVIDERS,
  SLOTS,
  isGameInSlotCategory,
  normalizeSlotProvider,
  type SlotCategory,
  type SlotGame,
} from '~/data/slots'
import GameCard from '~/components/game-cards/GameCard.vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import { sortRailGames } from '~/utils/gameSort'
import SlotFilterModal from '~/components/slots/SlotFilterModal.vue'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

const { effectiveTheme } = useSiteTheme()

const categoryIcons: Record<string, Component> = {
  House,
  Percent,
  ThumbsUp,
  Crown,
  Medal,
  Sparkles,
  Flame,
  Snowflake,
  Banknote,
  Trophy,
}

const route = useRoute()
const router = useRouter()

const normalizeCategory = (param: string): string => {
  const p = (param || '').toLowerCase()
  if (p === 'bonus' || p === 'bonuses') return 'bonus'
  if (p === 'max-rpt' || p === 'max-rtp') return 'max-rpt'
  return p
}

const activeCategory = computed(() => normalizeCategory(route.params.category as string || 'bonus'))

const categoryLabel = computed(() => {
  const match = SLOT_CATEGORIES.find(c => c.key === activeCategory.value)
  return match?.label || 'Featured'
})

useAppSeo({
  title: computed(() => `${categoryLabel.value} Online Slots — Real Money Games | ByBet`),
  description: computed(() => `Explore ${categoryLabel.value} online slots at ByBet Philippines. Spin certified high RTP slot machines, free spins, and jackpot games with instant payouts.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Slots', path: '/explore/egames/slots' },
    { name: categoryLabel.value, path: `/explore/egames/slots/${activeCategory.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel.value} Slots - ByBet`,
    url: `https://bybet.com/explore/egames/slots/${activeCategory.value}`,
  })),
})

const sectionId = computed(() => {
  const cat = activeCategory.value
  if (cat === 'bonus') return 'bonuses'
  if (cat === 'max-rpt') return 'max-rtp'
  return cat
})

const activeProviders = ref<string[]>(['all'])
const searchQuery = ref('')
const isSearchOpen = ref(false)
const isSearchSubmitted = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isFilterOpen = ref(false)

const filterState = ref({
  theme: 'All',
  feature: 'All',
  winningLine: 'All',
})

const { context: commentContext, openGameComments, closeComments } = useCommentPanel()
const { showDemoMessage } = useDemoInteraction()
const { addRecentGame } = useRecentGames()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

const toggleChat = (): void => {
  if (commentContext.value) {
    closeComments()
  } else {
    openGameComments()
  }
}

const selectCategory = (key: string): void => {
  if (isSearchOpen.value || isSearchSubmitted.value) {
    closeSearch()
  }
  if (key === 'home') {
    router.push('/explore/egames/slots')
  } else {
    router.push(`/explore/egames/slots/${key}`)
  }
}

const toggleProvider = (key: string): void => {
  if (key === 'all') {
    activeProviders.value = ['all']
  } else {
    activeProviders.value = activeProviders.value.filter(p => p !== 'all')
    if (activeProviders.value.includes(key)) {
      activeProviders.value = activeProviders.value.filter(p => p !== key)
      if (activeProviders.value.length === 0) {
        activeProviders.value = ['all']
      }
    } else {
      activeProviders.value.push(key)
    }
  }
}

const openSearch = (): void => {
  isSearchOpen.value = true
  isSearchSubmitted.value = false
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const closeSearch = (): void => {
  isSearchOpen.value = false
  searchQuery.value = ''
  isSearchSubmitted.value = false
}

const {
  searchHistory,
  addToHistory,
  removeHistoryItem,
  clearHistory,
} = useSearchHistory('bybet_slots_search_history', ['Super'])

const clearSearch = (): void => {
  searchQuery.value = ''
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const handleSearchSubmit = (): void => {
  const query = searchQuery.value.trim()
  if (query) {
    isSearchSubmitted.value = true
    isSearchOpen.value = false
    addToHistory(query)
  }
}

const handleInput = (): void => {
  // Stay in search mode while typing
}

const selectFrequentSearch = (term: string): void => {
  searchQuery.value = term
  isSearchSubmitted.value = true
  isSearchOpen.value = false
  addToHistory(term)
}

const resetSearch = (): void => {
  searchQuery.value = ''
  isSearchSubmitted.value = false
  isSearchOpen.value = false
  activeProviders.value = ['all']
}

const showGameDetails = (game: any): void => {
  showDemoMessage(`${game.title} (${game.provider}) — RTP: 96.8% • Volatility: High`)
}

const activeGameId = ref<string | null>(null)

const handleCardClick = (game: any): void => {
  addRecentGame(game)
  if (activeGameId.value === game.id) {
    activeGameId.value = null
  } else {
    activeGameId.value = game.id
  }
}

const handleStartNow = (game: any): void => {
  addRecentGame(game)
  showDemoMessage(`Starting ${game.title} (${game.provider})...`)
  if (import.meta.client) {
    window.open(game.href || bybetRedirectUrl, '_blank')
  }
}

const handleDemo = (game: any): void => {
  addRecentGame(game)
  showDemoMessage(`Launching Demo mode for ${game.title} (${game.provider})...`)
}

const handleDocumentClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null
  if (!target?.closest('.game-card')) {
    activeGameId.value = null
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleDocumentClick)
    window.addEventListener('scroll', handleScroll, { passive: true })

    loadMoreObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        loadMoreGames()
      }
    }, {
      rootMargin: '0px 0px 400px 0px',
    })

    syncLoadMoreObserver()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
    window.removeEventListener('scroll', handleScroll)
    loadMoreObserver?.disconnect()
    loadMoreObserver = null
  }
})

const INITIAL_SLOT_COUNT = 100
const SLOT_BATCH_SIZE = 20

const displayedCategoryCount = ref(INITIAL_SLOT_COUNT)
const displayedSearchCount = ref(INITIAL_SLOT_COUNT)
const loadMoreTrigger = ref<HTMLElement | null>(null)
let loadMoreObserver: IntersectionObserver | null = null

watch([searchQuery, activeProviders, activeCategory], () => {
  activeGameId.value = null
})

watch([activeCategory, activeProviders, filterState], () => {
  displayedCategoryCount.value = INITIAL_SLOT_COUNT
})

watch([searchQuery, activeProviders], () => {
  displayedSearchCount.value = INITIAL_SLOT_COUNT
})

const allSearchResults = computed<SlotGame[]>(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []
  const providers = activeProviders.value.map(p => normalizeSlotProvider(p))

  const seen = new Set<string>()
  const results: SlotGame[] = []

  for (const game of SLOTS) {
    if (seen.has(game.id)) continue

    const gameProv = normalizeSlotProvider(game.provider)
    if (!providers.includes('all') && !providers.includes(gameProv)) {
      continue
    }

    const matchesProviderName =
      game.provider.toLowerCase().includes(query) ||
      (gameProv === 'pp' && ('pragmatic play'.includes(query) || 'pragmatic'.includes(query))) ||
      (gameProv === 'pg' && ('pg soft'.includes(query) || 'pg'.includes(query)))

    if (
      game.title.toLowerCase().includes(query) ||
      matchesProviderName
    ) {
      seen.add(game.id)
      results.push(game)
    }
  }

  return results
})

const displayedSearchResults = computed<SlotGame[]>(() => {
  return allSearchResults.value.slice(0, displayedSearchCount.value)
})

const hasMoreSearchResults = computed(() => {
  return displayedSearchCount.value < allSearchResults.value.length
})

const isShowingResults = computed(() => {
  return isSearchOpen.value && isSearchSubmitted.value && searchQuery.value.trim().length > 0
})

const allCategoryGames = computed<SlotGame[]>(() => {
  const providers = activeProviders.value.map(p => normalizeSlotProvider(p))
  const seen = new Set<string>()
  const games: SlotGame[] = []

  for (const game of SLOTS) {
    if (seen.has(game.id)) continue

    if (!isGameInSlotCategory(game, activeCategory.value)) {
      continue
    }

    const gameProv = normalizeSlotProvider(game.provider)
    if (!providers.includes('all') && !providers.includes(gameProv)) {
      continue
    }

    if (filterState.value.theme !== 'All' && game.theme !== filterState.value.theme) {
      continue
    }
    if (filterState.value.feature !== 'All' && (!game.features || !game.features.includes(filterState.value.feature))) {
      continue
    }
    if (filterState.value.winningLine !== 'All') {
      if (filterState.value.winningLine === '≤10 lines') {
        const num = Number.parseInt(game.winningLine || '0', 10)
        if (Number.isNaN(num) || num > 10) continue
      } else if (filterState.value.winningLine === '11–99 lines') {
        const num = Number.parseInt(game.winningLine || '0', 10)
        if (Number.isNaN(num) || num < 11 || num > 99) continue
      } else if (filterState.value.winningLine === '≥100 lines') {
        const line = game.winningLine || ''
        const isWays = line.toLowerCase().includes('way') || line.toLowerCase().includes('megaways')
        const num = Number.parseInt(line, 10)
        if (!isWays && (Number.isNaN(num) || num < 100)) continue
      }
    }

    seen.add(game.id)
    games.push(game)
  }

  return sortRailGames(games, {
    category: activeCategory.value,
    label: categoryLabel.value,
  })
})

const displayedGames = computed<SlotGame[]>(() => {
  return allCategoryGames.value.slice(0, displayedCategoryCount.value)
})

const hasMoreCategoryGames = computed(() => {
  return displayedCategoryCount.value < allCategoryGames.value.length
})

const hasMoreGames = computed(() => {
  return isSearchSubmitted.value ? hasMoreSearchResults.value : hasMoreCategoryGames.value
})

const loadMoreGames = (): void => {
  if (isSearchSubmitted.value) {
    if (displayedSearchCount.value < allSearchResults.value.length) {
      displayedSearchCount.value = Math.min(
        displayedSearchCount.value + SLOT_BATCH_SIZE,
        allSearchResults.value.length,
      )
      nextTick(() => {
        syncLoadMoreObserver()
      })
    }
  } else {
    if (displayedCategoryCount.value < allCategoryGames.value.length) {
      displayedCategoryCount.value = Math.min(
        displayedCategoryCount.value + SLOT_BATCH_SIZE,
        allCategoryGames.value.length,
      )
      nextTick(() => {
        syncLoadMoreObserver()
      })
    }
  }
}

const syncLoadMoreObserver = (): void => {
  loadMoreObserver?.disconnect()

  if (import.meta.client && loadMoreTrigger.value && hasMoreGames.value) {
    loadMoreObserver?.observe(loadMoreTrigger.value)
  }
}

const handleScroll = (): void => {
  if (!hasMoreGames.value || !loadMoreTrigger.value) return
  const rect = loadMoreTrigger.value.getBoundingClientRect()
  if (rect.top <= window.innerHeight + 400) {
    loadMoreGames()
  }
}

watch([loadMoreTrigger, hasMoreGames], () => {
  nextTick(() => {
    syncLoadMoreObserver()
  })
})
</script>

<template>
  <div class="slots-page w-full min-w-0 pb-16">
    <!-- Top Bar: Category Tabs & Chat -->
    <div class="sticky-header sticky-header-seal sticky top-[var(--content-sticky-top)] z-30 bg-black -mx-1 px-1 pb-2 rounded-t-3xl">
      <header class="top-nav-bar flex items-center justify-between gap-1.5 rounded-lg bg-[#171817] p-1 overflow-hidden shadow-sm">
        <div class="category-nav-track flex items-center gap-1.5 min-w-0 flex-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            v-for="cat in SLOT_CATEGORIES"
            :key="cat.key"
            type="button"
            class="nav-tab flex flex-col items-center justify-center min-w-[48px] shrink-0 py-1 px-2.5 rounded-md transition-all cursor-pointer select-none"
            :class="activeCategory === cat.key ? 'bg-[var(--main-color)] text-white shadow font-semibold' : 'text-[#959799]'"
            :aria-label="cat.label"
            @click="selectCategory(cat.key)"
          >
            <span
              v-if="cat.svg || SLOT_CATEGORY_SVGS[cat.key]"
              class="slot-nav-svg mb-0.5 shrink-0 flex items-center justify-center"
              v-html="cat.svg || SLOT_CATEGORY_SVGS[cat.key]"
            />
            <component
              :is="categoryIcons[cat.iconName]"
              v-else-if="cat.iconName && categoryIcons[cat.iconName]"
              class="h-2 w-2 mb-0.5 shrink-0"
            />
            <span class="text-[12px] sm:text-[10px] leading-tight whitespace-nowrap">{{ cat.shortLabel }}</span>
          </button>
        </div>

        <button
          type="button"
          class="nav-tab nav-tab--chat flex flex-col items-center justify-center min-w-[48px] py-1 px-2 rounded-md hidden sm:flex transition-all cursor-pointer select-none shrink-0"
          :class="commentContext ? 'text-[#959799]' : 'text-[#959799]'"
          aria-label="Toggle chat room"
          @click="toggleChat"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mb-0.5 shrink-0"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.17487 19.8675L7.9565 18.1075C8.63891 18.2396 9.31883 18.308 10 18.308C15.4956 18.308 20 14.2442 20 9.15401C20 4.06434 15.4954 0 10 0C4.50461 0 0 4.06434 0 9.15401C0 12.0413 1.46921 14.6858 3.88947 16.3963L3.85501 19.0683C3.84572 19.7874 4.5896 20.2378 5.17487 19.8675ZM5.50007 10.9998C6.32849 10.9998 7.00007 10.3282 7.00007 9.49982C7.00007 8.67139 6.32849 7.99982 5.50007 7.99982C4.67164 7.99982 4.00007 8.67139 4.00007 9.49982C4.00007 10.3282 4.67164 10.9998 5.50007 10.9998ZM12.0001 9.49982C12.0001 10.3282 11.3285 10.9998 10.5001 10.9998C9.67164 10.9998 9.00007 10.3282 9.00007 9.49982C9.00007 8.67139 9.67164 7.99982 10.5001 7.99982C11.3285 7.99982 12.0001 8.67139 12.0001 9.49982C12.0001 10.3282 11.3285 10.9998 10.5001 10.9998ZM15.5001 10.9998C16.3285 10.9998 17.0001 10.3282 17.0001 9.49982C17.0001 8.67139 16.3285 7.99982 15.5001 7.99982C14.6716 7.99982 14.0001 8.67139 14.0001 9.49982C14.0001 10.3282 14.6716 10.9998 15.5001 10.9998Z"
            />
          </svg>
          <span class="text-[12px] sm:text-[10px] leading-tight whitespace-nowrap">Chat</span>
        </button>
      </header>

      <!-- Provider Filter Bar & Search / Filter Icons -->
      <div v-if="!isSearchOpen" class="provider-filter-bar flex items-center justify-between gap-2 py-1.5 mb-1 shadow-sm bg-black">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
          <button
            v-for="prov in SLOT_PROVIDERS"
            :key="prov.key"
            type="button"
            class="provider-pill px-3.5 py-1 rounded-full text-[12px] whitespace-nowrap transition-all cursor-pointer select-none border border-white/5 shrink-0 flex items-center justify-center min-h-[30px]"
            :class="activeProviders.includes(prov.key) ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'bg-[#242625] text-[#8e9491] '"
            :aria-label="prov.label"
            @click="toggleProvider(prov.key)"
          >
            <span >{{ prov.label }}</span>
          </button>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button
            type="button"
            class="h-8 w-8 rounded-full bg-[#242625] text-[#8e9491] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Search games"
            @click="openSearch"
          >
            <Search class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="h-8 w-8 rounded-full bg-[#242625] text-[#8e9491] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Filter games"
            @click="isFilterOpen = true"
          >
            <SlidersHorizontal class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Search View (Image 1) -->
    <div
      v-if="isSearchOpen"
      class="search-view w-full pt-4 pb-8"
    >
      <!-- Search Input Row -->
      <div class="flex items-center gap-3 mb-6">
        <div class="relative flex-1">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Enter game name"
            class="w-full h-11 rounded-full bg-[#171817] border border-[#2b2d2b] px-5 text-sm text-white placeholder-[#7a807d] focus:outline-none focus:border-[var(--main-color)] transition-colors"
            @input="handleInput"
            @keyup.enter="handleSearchSubmit"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a807d] hover:text-white p-1"
            aria-label="Clear input"
            @click="clearSearch"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          class="text-sm text-white hover:text-white/80 px-2 py-1 select-none cursor-pointer font-medium whitespace-nowrap"
          @click="closeSearch"
        >
          Cancel
        </button>
      </div>

      <!-- History Section -->
      <div v-if="searchHistory.length > 0" class="history-section mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-white tracking-wide">History</h3>
          <button
            type="button"
            class="text-[#7a807d] hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Clear history"
            title="Clear history"
            @click="clearHistory"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in searchHistory"
            :key="item"
            type="button"
            class="px-3.5 py-1.5 rounded-full bg-[#1b1c1b] text-xs text-[#8e9491] hover:text-white hover:bg-[#242625] transition-colors cursor-pointer"
            @click="selectFrequentSearch(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <!-- Frequently Searched Section -->
      <div class="frequently-searched-section mb-8">
        <div class="text-sm font-semibold text-white tracking-wide mb-3">
          Frequently searched
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="term in FREQUENTLY_SEARCHED_SLOTS"
            :key="term"
            type="button"
            class="px-3.5 py-1.5 rounded-full bg-[#1b1c1b] text-xs text-[#8e9491] hover:text-white hover:bg-[#242625] transition-colors cursor-pointer"
            @click="selectFrequentSearch(term)"
          >
            {{ term }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search Results View (Image 2) -->
    <div v-else-if="isSearchSubmitted" class="search-results-view mb-12">
      <div
        v-if="displayedSearchResults.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(150px,165px))] gap-2.5 justify-start"
      >
        <GameCard
          v-for="game in displayedSearchResults"
          :key="game.id"
          :game="game"
          :activeId="activeGameId"
          :displayCategory="activeCategory"
          @select="handleCardClick"
          @info="showGameDetails"
          @start="handleStartNow"
          @demo="handleDemo"
        />
      </div>

      <!-- Empty State for Search Results -->
      <GameEmptyState
        v-else
        text="No Results"
        :show-reset="true"
        reset-text="Reset Search"
        @reset="resetSearch"
      />

      <div
        v-if="hasMoreSearchResults"
        ref="loadMoreTrigger"
        class="h-6 w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />
    </div>

    <!-- Active Category Games Grid -->
    <div v-else class="slots-games-container">
      <div
        v-if="displayedGames.length > 0"
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-[repeat(auto-fill,minmax(150px,165px))] gap-2.5 justify-start"
      >
        <GameCard
          v-for="game in displayedGames"
          :key="game.id"
          :game="game"
          :activeId="activeGameId"
          :displayCategory="activeCategory"
          @select="handleCardClick"
          @info="showGameDetails"
          @start="handleStartNow"
          @demo="handleDemo"
        />
      </div>
      <GameEmptyState
        v-else
        text="This is no game currently."
      />

      <div
        v-if="hasMoreCategoryGames"
        ref="loadMoreTrigger"
        class="h-6 w-full pointer-events-none opacity-0"
        aria-hidden="true"
      />
    </div>

    <SlotFilterModal
      v-model="filterState"
      v-model:open="isFilterOpen"
    />
  </div>
</template>

<style scoped>
.slot-nav-svg {
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-nav-svg :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.slot-nav-svg :deep(.fill-text-4),
.slot-nav-svg :deep(.fill-title-button-special),
.slot-nav-svg :deep([class*="fill-text"]),
.slot-nav-svg :deep(path.fill-text-4),
.slot-nav-svg :deep(path:not([fill])) {
  fill: currentColor;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@media (max-width: 900px) {
  .slot-nav-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
