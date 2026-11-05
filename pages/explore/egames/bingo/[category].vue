<script setup lang="ts">
import {
  Crown,
  Flame,
  Snowflake,
  Trophy,
  House,
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
  BINGO_CATEGORIES,
  BINGO_CATEGORY_SVGS,
  BINGO_PROVIDERS,
  BingoGames,
  FREQUENTLY_SEARCHED_BINGO,
  isGameInBingoCategory,
  normalizeBingoProvider,
  type BingoCategory,
  type BingoGame,
} from '~/data/bingo'
import GameCard from '~/components/game-cards/GameCard.vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import { sortRailGames } from '~/utils/gameSort'

const categoryIcons: Record<string, Component> = {
  House,
  Crown,
  Flame,
  Snowflake,
  Trophy,
}

const route = useRoute()
const router = useRouter()

const normalizeCategory = (param: string): string => {
  const p = (param || '').toLowerCase()
  if (p === 'max-rpt' || p === 'max-rtp') return 'max-rpt'
  return p
}

const activeCategory = computed(() => normalizeCategory(route.params.category as string || 'top'))

const categoryLabel = computed(() => {
  const match = BINGO_CATEGORIES.find(c => c.key === activeCategory.value)
  return match?.label || 'Popular'
})

useAppSeo({
  title: computed(() => `${categoryLabel.value} Bingo Games — Play Online | ByBet`),
  description: computed(() => `Enjoy ${categoryLabel.value} bingo games on ByBet Philippines. Exciting patterns, automatic daubing, high RTP payouts, and rewarding community rounds.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Bingo', path: '/explore/egames/bingo' },
    { name: categoryLabel.value, path: `/explore/egames/bingo/${activeCategory.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel.value} Bingo - ByBet`,
    url: `https://bybet.com/explore/egames/bingo/${activeCategory.value}`,
  })),
})

const sectionId = computed(() => {
  const cat = activeCategory.value
  if (cat === 'max-rpt') return 'max-rtp'
  return cat
})

const activeProvider = ref('all')
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
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl

const toggleChat = (): void => {
  if (commentContext.value) {
    closeComments()
  } else {
    openGameComments()
  }
}

const selectCategory = (key: string): void => {
  if (isSearchOpen.value) {
    closeSearch()
  }
  if (key === 'home') {
    router.push('/explore/egames/bingo')
  } else {
    router.push(`/explore/egames/bingo/${key}`)
  }
}

const selectProvider = (key: string): void => {
  activeProvider.value = key
}

const openSearch = (): void => {
  isSearchOpen.value = true
  isSearchSubmitted.value = false
  searchQuery.value = ''
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
} = useSearchHistory('bybet_bingo_search_history', ['Super Bingo', 'Fortune Bingo'])

const clearSearch = (): void => {
  searchQuery.value = ''
  isSearchSubmitted.value = false
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const handleSearchSubmit = (): void => {
  if (searchQuery.value.trim()) {
    isSearchSubmitted.value = true
    addToHistory(searchQuery.value)
  }
}

const handleInput = (): void => {
  if (!searchQuery.value.trim()) {
    isSearchSubmitted.value = false
  }
}

const selectFrequentSearch = (term: string): void => {
  searchQuery.value = term
  isSearchSubmitted.value = true
  addToHistory(term)
}

const showGameDetails = (game: any): void => {
  showDemoMessage(`${game.title} (${game.provider}) — RTP: 96.5% • Volatility: Medium`)
}

const activeGameId = ref<string | null>(null)

const handleCardClick = (game: any): void => {
  if (activeGameId.value === game.id) {
    activeGameId.value = null
  } else {
    activeGameId.value = game.id
  }
}

const handleStartNow = (game: any): void => {
  showDemoMessage(`Starting ${game.title} (${game.provider})...`)
  if (import.meta.client) {
    window.open(game.href || bybetRedirectUrl, '_blank')
  }
}

const handleDemo = (game: any): void => {
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
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
  }
})

watch([searchQuery, activeProvider, activeCategory], () => {
  activeGameId.value = null
})

const searchResults = computed<BingoGame[]>(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []

  const seen = new Set<string>()
  const results: BingoGame[] = []

  for (const game of BingoGames) {
    const match =
      game.title.toLowerCase().includes(query) ||
      game.provider.toLowerCase().includes(query)
    if (match) {
      const key = `${game.title.toLowerCase()}__${game.provider.toLowerCase()}`
      if (!seen.has(key)) {
        seen.add(key)
        results.push(game)
      }
    }
  }

  return results
})

const isShowingResults = computed(() => {
  return isSearchOpen.value && isSearchSubmitted.value && searchQuery.value.trim().length > 0
})

const displayedGames = computed<BingoGame[]>(() => {
  const provider = normalizeBingoProvider(activeProvider.value)
  const seen = new Set<string>()
  const games: BingoGame[] = []

  for (const game of BingoGames) {
    if (seen.has(game.id)) continue

    if (activeCategory.value !== 'home' && !isGameInBingoCategory(game, activeCategory.value)) {
      continue
    }

    if (provider !== 'all' && normalizeBingoProvider(game.provider) !== provider) {
      continue
    }

    if (filterState.value.theme !== 'All' && game.theme !== filterState.value.theme) {
      continue
    }

    if (filterState.value.feature !== 'All' && (!game.features || !game.features.includes(filterState.value.feature))) {
      continue
    }

    seen.add(game.id)
    games.push(game)
  }

  return sortRailGames(games, {
    category: activeCategory.value,
    label: categoryLabel.value,
  })
})
</script>

<template>
  <div class="bingo-page w-full min-w-0 pb-16">
    <!-- Top Bar: Category Tabs & Chat -->
    <div class="sticky-header sticky-header-seal sticky top-[var(--content-sticky-top)] z-30  -mx-1 px-1 pb-2">
      <header class="top-nav-bar flex items-center justify-between gap-1.5 rounded-lg bg-[#171817] p-1 overflow-hidden shadow-sm">
        <div class="category-nav-track flex items-center gap-1 min-w-0 flex-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            v-for="cat in BINGO_CATEGORIES"
            :key="cat.key"
            type="button"
            class="nav-tab flex flex-col items-center justify-center min-w-[48px] shrink-0 py-1 px-2.5 rounded-md transition-all cursor-pointer select-none"
            :class="activeCategory === cat.key ? 'bg-[var(--main-color)] text-white shadow font-semibold' : 'text-[#959799]'"
            :aria-label="cat.label"
            @click="selectCategory(cat.key)"
          >
            <span
              v-if="cat.svg || BINGO_CATEGORY_SVGS[cat.key]"
              class="slot-nav-svg mb-0.5 shrink-0 flex items-center justify-center"
              v-html="cat.svg || BINGO_CATEGORY_SVGS[cat.key]"
            />
            <component
              :is="categoryIcons[cat.iconName]"
              v-else-if="cat.iconName && categoryIcons[cat.iconName]"
              class="h-10 w-10 sm:h-4 sm:w-4 mb-0.5 shrink-0"
            />
            <span class="text-[12px] sm:text-[10px] leading-tight whitespace-nowrap">{{ cat.shortLabel }}</span>
          </button>
        </div>

        <button
          type="button"
          class="nav-tab nav-tab--chat flex flex-col items-center justify-center min-w-[48px] py-1 px-2 rounded-md transition-all cursor-pointer select-none shrink-0 hidden sm:flex"
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
      <div class="provider-filter-bar flex items-center justify-between gap-2 py-1.5 mb-1 shadow-sm bg-black">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
          <button
            v-for="prov in BINGO_PROVIDERS"
            :key="prov.key"
            type="button"
            class="provider-pill px-4 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all cursor-pointer select-none border border-white/5 shrink-0"
            :class="activeProvider === prov.key ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'bg-[#242625] text-[#8e9491] '"
            @click="selectProvider(prov.key)"
          >
            {{ prov.label }}
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

    <!-- Search Overlay / Panel -->
    <div
      v-if="isSearchOpen"
      class="search-panel mb-6 rounded-2xl bg-[#171817] border border-white/5 p-4 shadow-lg"
    >
      <div class="relative flex items-center mb-4">
        <Search class="absolute left-3.5 h-4 w-4 text-[#8e9491]" />
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          placeholder="Search by game or provider..."
          class="w-full rounded-xl bg-[#202220] border border-white/10 pl-10 pr-20 py-2.5 text-sm text-white placeholder-[#8e9491] focus:outline-none focus:border-[var(--main-color)] transition-colors"
          @input="handleInput"
          @keyup.enter="handleSearchSubmit"
        />
        <div class="absolute right-2 flex items-center gap-1">
          <button
            v-if="searchQuery"
            type="button"
            class="p-1 text-[#8e9491] hover:text-white rounded-md"
            @click="clearSearch"
          >
            <X class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="p-1 text-[#8e9491] hover:text-white rounded-md"
            @click="closeSearch"
          >
            <span class="text-xs">Cancel</span>
          </button>
        </div>
      </div>

      <!-- Search History & Suggestions -->
      <div v-if="!isShowingResults" class="space-y-4">
        <div v-if="searchHistory.length > 0" class="history-block">
          <div class="flex items-center justify-between text-xs text-[#8e9491] mb-2">
            <span>Recent Searches</span>
            <button
              type="button"
              class="hover:text-white flex items-center gap-1"
              @click="clearHistory"
            >
              <Trash2 class="h-3 w-3" />
              <span>Clear</span>
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(item, idx) in searchHistory"
              :key="item"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202220] text-xs text-white hover:bg-[#282a29] cursor-pointer"
              @click="selectFrequentSearch(item)"
            >
              <span>{{ item }}</span>
              <button
                type="button"
                class="hover:text-red-400"
                @click.stop="removeHistoryItem(idx)"
              >
                <X class="h-3 w-3" />
              </button>
            </span>
          </div>
        </div>

        <div class="suggestions-block">
          <div class="text-xs text-[#8e9491] mb-2">Frequently Searched</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="term in FREQUENTLY_SEARCHED_BINGO"
              :key="term"
              type="button"
              class="px-3 py-1 rounded-full bg-[#202220] text-xs text-[#8e9491] hover:text-white hover:bg-[#282a29] transition-colors"
              @click="selectFrequentSearch(term)"
            >
              {{ term }}
            </button>
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="isShowingResults" class="results-block">
        <div class="text-xs text-[#8e9491] mb-3">
          Found {{ searchResults.length }} result(s) for "{{ searchQuery }}"
        </div>
        <div
          v-if="searchResults.length > 0"
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5"
        >
          <GameCard
            v-for="game in searchResults"
            :key="game.id"
            :game="game"
            :activeId="activeGameId"
            @select="handleCardClick"
            @info="showGameDetails"
            @start="handleStartNow"
            @demo="handleDemo"
          />
        </div>
        <GameEmptyState
          v-else
          text="No Results"
        />
      </div>
    </div>

    <!-- Active Category Games Grid (Layout matches Image 1) -->
    <div v-if="!isSearchOpen" class="bingo-games-container">
      <div
        v-if="displayedGames.length > 0"
        class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2.5"
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
    </div>

    <!-- Filter Modal -->
    <div
      v-if="isFilterOpen"
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-[2px]"
      @click.self="isFilterOpen = false"
    >
      <div class="mobile-modal-slide-up w-full max-w-[480px] sm:rounded-2xl rounded-t-[20px] bg-[#181919] border-t sm:border border-white/10 shadow-2xl flex flex-col max-h-[calc(100dvh-56px)] overflow-hidden">
        <!-- Pull bar / Handle at the top -->
        <div class="flex justify-center pt-2.5 pb-0.5">
          <span class="w-9 h-1 rounded-full bg-white/20" />
        </div>

        <header class="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-1">
          <button
            type="button"
            class="justify-self-start text-sm font-medium text-[#c5cac7] hover:text-white py-1"
            @click="isFilterOpen = false"
          >
            Cancel
          </button>
          <h2 class="text-base font-bold text-white text-center">Filter</h2>
          <span class="w-[52px]" aria-hidden="true" />
        </header>

        <div class="flex-1 overflow-y-auto no-scrollbar px-4 py-2 space-y-5">
          <div>
            <h3 class="text-[15px] font-bold text-white mb-2.5">Theme</h3>
            <div class="grid grid-cols-3 gap-2.5">
              <button
                v-for="th in ['All', 'Classic', 'Jackpot', 'Carnaval', 'Adventure']"
                :key="th"
                type="button"
                class="h-[42px] px-1.5 rounded-[10px] text-[13px] transition-all flex items-center justify-center text-center"
                :class="filterState.theme === th ? 'bg-[#161817] border border-[#008d62] text-white font-medium' : 'bg-[#1e201f] text-[#e2e8e5] border border-transparent hover:bg-[#252726] hover:text-white'"
                @click="filterState.theme = th"
              >
                {{ th }}
              </button>
            </div>
          </div>

          <div>
            <h3 class="text-[15px] font-bold text-white mb-2.5">Features</h3>
            <div class="grid grid-cols-3 gap-2.5">
              <button
                v-for="ft in ['All', 'Multi-Card', 'Bonus Ball', 'Extra Ball', 'Jackpot']"
                :key="ft"
                type="button"
                class="h-[42px] px-1.5 rounded-[10px] text-[13px] transition-all flex items-center justify-center text-center"
                :class="filterState.feature === ft ? 'bg-[#161817] border border-[#008d62] text-white font-medium' : 'bg-[#1e201f] text-[#e2e8e5] border border-transparent hover:bg-[#252726] hover:text-white'"
                @click="filterState.feature = ft"
              >
                {{ ft }}
              </button>
            </div>
          </div>
        </div>

        <footer class="shrink-0 grid grid-cols-2 gap-3 p-3 pb-[max(16px,env(safe-area-inset-bottom))] bg-[#181919] border-t border-white/5">
          <button
            type="button"
            class="h-[46px] rounded-xl text-[15px] font-semibold text-white bg-[#2a2c2b] hover:bg-[#343735] transition-colors"
            @click="filterState = { theme: 'All', feature: 'All', winningLine: 'All' }"
          >
            Reset
          </button>
          <button
            type="button"
            class="h-[46px] rounded-xl text-[15px] font-bold text-white bg-[var(--main-color)] hover:bg-[#047a52] transition-colors"
            @click="isFilterOpen = false"
          >
            OK
          </button>
        </footer>
      </div>
    </div>
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
