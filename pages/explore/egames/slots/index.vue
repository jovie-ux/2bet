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
import GameRail from '~/components/game-cards/GameRail.vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import { sortRailGames } from '~/utils/gameSort'
import SlotFilterModal from '~/components/slots/SlotFilterModal.vue'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

const { effectiveTheme } = useSiteTheme()

useAppSeo({
  title: 'Slots Online — Caça-Níqueis com Alto RTP e Jackpots | 2bet',
  description: 'Gire os melhores caça-níqueis no cassino 2bet. Centenas de slots online com alto RTP, jackpots acumulados em R$ e recursos bônus incríveis.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'eGames', path: '/egames/slots' },
    { name: 'Slots', path: '/egames/slots' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Online Slots',
    url: 'https://2bet.com/egames/slots',
    description: 'Play top online slot games at 2Bet Brasil. Spin popular titles, megaways, and progressive jackpots.',
  },
})

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

const router = useRouter()
const route = useRoute()
const { translate } = useSitePreferences()
const activeCategory = ref('home')
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

const { showDemoMessage } = useDemoInteraction()
const { addRecentGame } = useRecentGames()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const { context: commentContext, openGameComments, closeComments } = useCommentPanel()

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
    activeCategory.value = 'home'
    if (import.meta.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } else {
    router.push(`/egames/slots/${key}`)
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
  isSearchSubmitted.value = false
  searchQuery.value = ''
}

const {
  searchHistory,
  addToHistory,
  removeHistoryItem,
  clearHistory,
} = useSearchHistory('2bet_slots_search_history', ['Super'])

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
  // Stay in search input mode while typing
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

const showSectionHelp = (title: string): void => {
  showDemoMessage(`${title} reflects real-time payout statistics and RTP trends across active slot sessions.`)
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
  if (route.query.provider && typeof route.query.provider === 'string') {
    const q = route.query.provider.toLowerCase()
    const found = SLOT_PROVIDERS.find(p => p.key.toLowerCase() === q || normalizeSlotProvider(p.key) === normalizeSlotProvider(q))
    if (found && found.key !== 'all') {
      activeProviders.value = [found.key]
    }
  }

  if (import.meta.client) {
    document.addEventListener('click', handleDocumentClick)
    window.addEventListener('scroll', handleScroll, { passive: true })

    loadMoreObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        loadMoreSearchResults()
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

const displayedSearchCount = ref(INITIAL_SLOT_COUNT)
const loadMoreTrigger = ref<HTMLElement | null>(null)
let loadMoreObserver: IntersectionObserver | null = null

watch([searchQuery, activeProviders], () => {
  activeGameId.value = null
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

const loadMoreSearchResults = (): void => {
  if (displayedSearchCount.value < allSearchResults.value.length) {
    displayedSearchCount.value = Math.min(
      displayedSearchCount.value + SLOT_BATCH_SIZE,
      allSearchResults.value.length,
    )
    nextTick(() => {
      syncLoadMoreObserver()
    })
  }
}

const syncLoadMoreObserver = (): void => {
  loadMoreObserver?.disconnect()

  if (import.meta.client && loadMoreTrigger.value && hasMoreSearchResults.value) {
    loadMoreObserver?.observe(loadMoreTrigger.value)
  }
}

const handleScroll = (): void => {
  if (!isSearchSubmitted.value || !hasMoreSearchResults.value || !loadMoreTrigger.value) return
  const rect = loadMoreTrigger.value.getBoundingClientRect()
  if (rect.top <= window.innerHeight + 400) {
    loadMoreSearchResults()
  }
}

watch([loadMoreTrigger, hasMoreSearchResults], () => {
  nextTick(() => {
    syncLoadMoreObserver()
  })
})

interface SlotSectionDisplay {
  id: string
  title: string
  emoji?: string
  iconImage?: string
  iconName: string
  count: number
  hasHelp?: boolean
  games: SlotGame[]
  allMatchingGames?: SlotGame[]
}

const sectionConfigs = [
  // { id: 'bonuses', title: 'Bonuses', emoji: '🟡', iconImage: '/icons/slots/bonuses.webp', iconName: 'Percent', hasHelp: false, count: 334 },
  { id: 'top-pick', title: 'Top Pick', emoji: '👍', iconImage: '/icons/slots/top-pick.webp', iconName: 'ThumbsUp', hasHelp: false, count: 92 },
  { id: 'top', title: 'Top', emoji: '🏅', iconImage: '/icons/slots/top.webp', iconName: 'Medal', hasHelp: false, count: 498 },
  { id: 'new', title: 'New', emoji: '🆕', iconImage: '/icons/slots/new.webp', iconName: 'Sparkles', hasHelp: false, count: 6 },
  { id: 'hot', title: 'Hot games', emoji: '🔥', iconImage: '/icons/slots/hot.webp', iconName: 'Flame', hasHelp: true, count: 6 },
  { id: 'cold', title: 'Cold Games', emoji: '❄️', iconImage: '/icons/slots/cold.webp', iconName: 'Snowflake', hasHelp: true, count: 6 },
  { id: 'max-rtp', title: 'Max RTP', emoji: '💵', iconImage: '/icons/slots/max-rtp.webp', iconName: 'Trophy', hasHelp: false, count: 6 },
]

const filteredSections = computed<SlotSectionDisplay[]>(() => {
  const providers = activeProviders.value.map(p => normalizeSlotProvider(p))

  let availableSlots = SLOTS
  if (!providers.includes('all')) {
    availableSlots = availableSlots.filter(g => providers.includes(normalizeSlotProvider(g.provider)))
  }

  if (filterState.value.theme !== 'All') {
    availableSlots = availableSlots.filter(g => g.theme === filterState.value.theme)
  }
  if (filterState.value.feature !== 'All') {
    availableSlots = availableSlots.filter(g => g.features && g.features.includes(filterState.value.feature))
  }
  if (filterState.value.winningLine !== 'All') {
    availableSlots = availableSlots.filter(g => {
      if (filterState.value.winningLine === '≤10 lines') {
        const num = Number.parseInt(g.winningLine || '0', 10)
        return !Number.isNaN(num) && num <= 10
      } else if (filterState.value.winningLine === '11–99 lines') {
        const num = Number.parseInt(g.winningLine || '0', 10)
        return !Number.isNaN(num) && num >= 11 && num <= 99
      } else if (filterState.value.winningLine === '≥100 lines') {
        const line = g.winningLine || ''
        const isWays = line.toLowerCase().includes('way') || line.toLowerCase().includes('megaways')
        const num = Number.parseInt(line, 10)
        return isWays || (!Number.isNaN(num) && num >= 100)
      }
      return true
    })
  }

  const GAMES_PER_SECTION = 24

  return sectionConfigs.map((cfg) => {
    const allMatchingGames: SlotGame[] = []
    const seenIds = new Set<string>()

    for (const game of availableSlots) {
      if (seenIds.has(game.id)) continue
      if (isGameInSlotCategory(game, cfg.id)) {
        seenIds.add(game.id)
        allMatchingGames.push(game)
      }
    }

    if (allMatchingGames.length < 15) {
      for (const game of availableSlots) {
        if (!seenIds.has(game.id)) {
          seenIds.add(game.id)
          allMatchingGames.push(game)
          if (allMatchingGames.length >= 15) break
        }
      }
    }

    const sortedGames = sortRailGames(allMatchingGames, { category: cfg.id, label: cfg.title })

    return {
      ...cfg,
      count: allMatchingGames.length,
      games: sortedGames.slice(0, GAMES_PER_SECTION),
      allMatchingGames: sortedGames,
    }
  }).filter((section) => section.games.length > 0)
})

const resetFilters = (): void => {
  activeProviders.value = ['all']
  searchQuery.value = ''
  filterState.value = {
    theme: 'All',
    feature: 'All',
    winningLine: 'All',
  }
}
</script>

<template>
  <div class="slots-page w-full min-w-0 pb-16">
    <h1 class="sr-only">{{ translate('Slots') }}</h1>
    <!-- Top Bar: Category Tabs & Chat -->
    <div class="sticky-header sticky-header-seal sticky top-[var(--content-sticky-top)] z-30 -mx-1 px-1 pb-0.5 bg-black rounded-t-3xl">
      <header class="top-nav-bar flex items-center justify-between gap-2 rounded-lg bg-[#171817] p-1 overflow-hidden shadow-sm">
        <div class="category-nav-track flex items-center gap-1.5 min-w-0 flex-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            v-for="cat in SLOT_CATEGORIES"
            :key="cat.key"
            type="button"
            class="nav-tab flex flex-col items-center justify-center min-w-[48px] shrink-0 py-1 px-2.5 rounded-md transition-all cursor-pointer select-none"
            :class="activeCategory === cat.key ? 'bg-[var(--main-color)] text-white shadow font-semibold' : 'text-[#959799] '"
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
            <span class="text-[12px] sm:text-[10px] leading-tight whitespace-nowrap">{{ translate(cat.shortLabel) }}</span>
          </button>
        </div>
      </header>

      <!-- Provider Filter Bar & Search / Filter Icons -->
      <div v-if="!isSearchOpen" class="provider-filter-bar flex items-center justify-between gap-2 py-1.5 mb-1 shadow-sm bg-black">
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
          <RouletteEntryButton style="--roulette-entry-size: 38px; border: 0" class="block sm:hidden" />
          <button
            v-for="prov in SLOT_PROVIDERS"
            :key="prov.key"
            type="button"
            class="provider-pill px-5 py-2.5 rounded-full text-[12px] whitespace-nowrap transition-all cursor-pointer select-none border border-white/5 shrink-0 flex items-center justify-center min-h-[30px]"
            :class="activeProviders.includes(prov.key) ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'bg-[#242625] text-[#8e9491] '"
            :aria-label="translate(prov.label)"
            @click="toggleProvider(prov.key)"
          >
            <span>{{ translate(prov.label) }}</span>
          </button>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button
            type="button"
            class="h-8 w-8 rounded-full bg-[#242625] text-[#8e9491] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            :aria-label="translate('Search games')"
            @click="openSearch"
          >
            <Search class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="h-8 w-8 rounded-full bg-[#242625] text-[#8e9491] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            :aria-label="translate('Filter games')"
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
            :placeholder="translate('Enter game name')"
            class="w-full h-11 rounded-full bg-[#171817] border border-[#2b2d2b] px-5 text-sm text-white placeholder-[#7a807d] focus:outline-none focus:border-[var(--main-color)] transition-colors"
            @input="handleInput"
            @keyup.enter="handleSearchSubmit"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a807d] hover:text-white p-1"
            :aria-label="translate('Clear input')"
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
          {{ translate('Cancel') }}
        </button>
      </div>

      <!-- History Section -->
      <div v-if="searchHistory.length > 0" class="history-section mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-white tracking-wide">{{ translate('History') }}</h3>
          <button
            type="button"
            class="text-[#7a807d] hover:text-white p-1 transition-colors cursor-pointer"
            :aria-label="translate('Clear history')"
            :title="translate('Clear history')"
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
          {{ translate('Frequently searched') }}
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
          :displayCategory="activeCategory !== 'home' ? activeCategory : undefined"
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

    <!-- Default Slots Sections (Home Page layout with 1 row of 6 games per section) -->
    <template v-else>
      <!-- Empty State -->
      <GameEmptyState
        v-if="filteredSections.length === 0"
        text="This is no game currently."
        :show-reset="true"
        reset-text="Reset Filters"
        @reset="resetFilters"
      />

      <section
        v-for="section in filteredSections"
        :id="`section-${section.id}`"
        :key="section.id"
        class="slot-section mb-6 scroll-mt-[135px]"
      >
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-2.5">
          <div class="flex items-center gap-1.5">
            <img
              v-if="section.iconImage"
              :src="section.iconImage"
              :alt="translate(section.title)"
              class="h-[18px] w-[18px] object-contain shrink-0"
            />
            <span v-else class="text-base leading-none select-none">{{ section.emoji }}</span>
            <h2 class="text-[15px] font-bold text-white tracking-tight">{{ translate(section.title) }}</h2>
            <button
              v-if="section.hasHelp"
              type="button"
              class="h-3.5 w-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#8e9491] hover:text-white flex items-center justify-center text-[9px] font-bold transition-colors cursor-pointer"
              :aria-label="`Info about ${section.title}`"
              @click.stop.prevent="showSectionHelp(section.title)"
            >
              ?
            </button>
          </div>

          <!-- Section Link to Subroute -->
          <NuxtLink
            :to="`/egames/slots/${section.id === 'bonuses' ? 'bonus' : (section.id === 'max-rtp' ? 'max-rpt' : section.id)}`"
            class="count-badge flex items-center gap-0.5 rounded-full bg-[#202220] hover:bg-[#282a29] px-2.5 py-0.5 text-[11px] font-medium text-[#8e9491] hover:text-white transition-colors cursor-pointer"
          >
            <span>{{ section.count }}</span>
            <ChevronRight class="h-3 w-3" />
          </NuxtLink>
        </div>

        <!-- Swipeable section preview -->
        <GameRail
          :label="section.title"
          :category="section.id"
          :games="section.games"
          v-slot="{ games }"
        >
          <GameCard
            v-for="game in (games && games.length ? games : section.games)"
            :key="game.id"
            :game="game"
            :activeId="activeGameId"
            :displayCategory="section.id"
            @select="handleCardClick"
            @info="showGameDetails"
            @start="handleStartNow"
            @demo="handleDemo"
          />
        </GameRail>
      </section>
    </template>

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
