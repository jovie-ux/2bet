<script setup lang="ts">
import { ChevronRight, Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { computed, nextTick, ref, watch } from 'vue'
import GameEmptyState from '~/components/game-cards/GameEmptyState.vue'
import ReminderModal from '~/components/modals/ReminderModal.vue'
import PokerCategoryIcon from '~/components/poker/PokerCategoryIcon.vue'
import PokerFilterModal from '~/components/poker/PokerFilterModal.vue'
import PokerGameCard from '~/components/poker/PokerGameCard.vue'
import { POKER_CATEGORIES, POKER_PROVIDERS, getPokerGames, getPokerProvidersByCategory, isGameInPokerCategory, type PokerGame } from '~/data/poker'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

const props = withDefaults(defineProps<{ category?: string }>(), { category: 'popular' })
const basePath = '/explore/entertainment/poker'
const { translate } = useSiteLocale()
const { effectiveTheme } = useSiteTheme()

const tabs = computed(() => [
  { key: 'popular', label: translate('Popular'), to: basePath },
  { key: 'all', label: translate('All'), to: `${basePath}/all` },
  ...POKER_CATEGORIES.map(category => ({ ...category, label: translate(category.label), to: `${basePath}/${category.key}` })),
])
const categoryLabel = computed(() => tabs.value.find(tab => tab.key === props.category)?.label || translate('Poker'))

useAppSeo({
  title: computed(() => `${categoryLabel.value} | Pôquer e Jogos de Cartas | 2Bet`),
  description: computed(() => `Explore jogos de ${props.category === 'popular' || props.category === 'all' ? 'pesca, mahjong, pôquer, Bull Bull, bacará e muito mais' : categoryLabel.value} na 2Bet. Navegue por categoria e provedor.`),
  breadcrumbs: computed(() => [
    { name: translate('Home'), path: '/' },
    { name: translate('Poker'), path: basePath },
    ...(props.category === 'popular' ? [] : [{ name: categoryLabel.value, path: `${basePath}/${props.category}` }]),
  ]),
})

const filterState = ref<{ provider: string; sort: 'default' | 'title-asc' | 'title-desc' }>({ provider: 'all', sort: 'default' })
const searchQuery = ref('')
const searchOpen = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const filterOpen = ref(false)
const selectedGame = ref<PokerGame | null>(null)
const { addRecentGame } = useRecentGames()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl

const availableProviders = computed(() => getPokerProvidersByCategory(props.category))

const isProviderActive = (providerKey: string): boolean => {
  if (availableProviders.value.length === 1) {
    return true
  }
  return filterState.value.provider.toLowerCase() === providerKey.toLowerCase()
}

const selectProvider = (providerKey: string): void => {
  filterState.value.provider = providerKey
}

const games = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const results = getPokerGames(props.category === 'popular' ? 'all' : props.category, filterState.value.provider).filter(game => {
    if (!query) return true
    const provider = POKER_PROVIDERS.find(item => item.key.toLowerCase() === game.provider.toLowerCase())
    return `${game.title} ${game.provider} ${provider?.label || ''}`.toLowerCase().includes(query)
  })

  if (filterState.value.sort === 'default') return results
  const direction = filterState.value.sort === 'title-asc' ? 1 : -1
  return [...results].sort((left, right) => direction * left.title.localeCompare(right.title))
})

const sections = computed(() => {
  if (props.category === 'popular' || props.category === 'all') {
    return POKER_CATEGORIES.map(category => ({
      key: category.key,
      label: translate(category.label),
      games: games.value.filter(game => isGameInPokerCategory(game, category.key)),
    })).filter(section => section.games.length > 0)
  }

  return [{ key: props.category, label: categoryLabel.value, games: games.value }]
})

const hasFilters = computed(() => (availableProviders.value.length > 1 && filterState.value.provider !== 'all') || filterState.value.sort !== 'default')

const resetFilters = (): void => {
  filterState.value = { provider: 'all', sort: 'default' }
  searchQuery.value = ''
}

const openSearch = async (): Promise<void> => {
  searchOpen.value = true
  await nextTick()
  searchInput.value?.focus()
}

const closeSearch = (): void => {
  searchOpen.value = false
  searchQuery.value = ''
}

const selectGame = (game: PokerGame): void => {
  selectedGame.value = game
}

const startGame = (): void => {
  const game = selectedGame.value
  if (!game) return
  addRecentGame(game)
  selectedGame.value = null
  if (import.meta.client) window.open(game.href || bybetRedirectUrl, '_blank', 'noopener,noreferrer')
}

watch(() => props.category, () => {
  selectedGame.value = null
  filterState.value.provider = 'all'
})
</script>

<template>
  <div class="poker-page">
    <div class="poker-sticky-header sticky-header-seal">
      <nav class="poker-category-nav" aria-label="Poker game categories">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.key"
          :to="tab.to"
          class="poker-category-tab"
          :class="{ 'poker-category-tab--active': category === tab.key }"
          :aria-current="category === tab.key ? 'page' : undefined"
          :title="tab.label"
        >
          <PokerCategoryIcon :name="tab.key" />
          <span>{{ tab.label }}</span>
        </NuxtLink>
      </nav>

      <div class="poker-toolbar bg-black">
        <div class="poker-providers" role="group" :aria-label="translate('Filter by provider')">
          <button
            v-for="provider in availableProviders"
            :key="provider.key"
            type="button"
            class="poker-provider-pill"
            :class="{ 'poker-provider-pill--active': isProviderActive(provider.key) }"
            :aria-pressed="isProviderActive(provider.key)"
            :aria-label="provider.key === 'all' ? translate('All') : provider.label"
            :title="provider.key === 'all' ? translate('All') : provider.label"
            @click="selectProvider(provider.key)"
          >
            <img
              v-if="provider.logo"
              :src="getProviderLogoForTheme(provider.logo, effectiveTheme)"
              :alt="provider.label"
              class="poker-provider-pill-logo"
            />
            <span v-else>{{ provider.key === 'all' ? translate('All') : provider.label }}</span>
          </button>
        </div>
        <div class="poker-toolbar-actions">
          <button type="button" class="poker-icon-button" :aria-expanded="searchOpen" aria-controls="poker-search" :aria-label="translate('Search poker games')" @click="searchOpen ? closeSearch() : openSearch()">
            <Search :size="16" aria-hidden="true" />
          </button>
          <button type="button" class="poker-icon-button" :class="{ 'poker-icon-button--active': hasFilters }" :aria-label="translate('Filter poker games')" @click="filterOpen = true">
            <SlidersHorizontal :size="16" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div v-if="searchOpen" id="poker-search" class="poker-search">
        <Search :size="17" aria-hidden="true" />
        <input ref="searchInput" v-model="searchQuery" type="search" :placeholder="translate('Search game or provider')" :aria-label="translate('Search game or provider')" @keydown.esc="closeSearch" />
        <button type="button" class="poker-icon-button" :aria-label="translate('Close search')" @click="closeSearch"><X :size="16" /></button>
      </div>
    </div>

    <h1 class="sr-only">{{ categoryLabel }}</h1>

    <template v-if="games.length">
      <section v-for="section in sections" :key="section.key" class="poker-section" :aria-labelledby="`poker-heading-${section.key}`">
        <header class="poker-section-header">
          <h2 :id="`poker-heading-${section.key}`">{{ section.label }}</h2>
          <NuxtLink v-if="category === 'popular' || category === 'all'" :to="`${basePath}/${section.key}`" class="poker-section-count" :aria-label="`View all ${section.games.length} ${section.label} games`">
            <span>{{ section.games.length }}</span><ChevronRight :size="14" aria-hidden="true" />
          </NuxtLink>
          <span v-else class="poker-section-count" aria-live="polite">{{ section.games.length }}</span>
        </header>

        <div class="poker-games-grid">
          <PokerGameCard v-for="game in section.games" :key="game.id" :game="game" @select="selectGame" />
        </div>
      </section>
    </template>

    <GameEmptyState v-else :text="translate('No games found')" :show-reset="true" @reset="resetFilters" />

    <PokerFilterModal v-model="filterState" v-model:open="filterOpen" :providers="availableProviders" />
    <ReminderModal v-if="selectedGame" :title="translate('Reminder')" :message="translate('Please login first')" @ok="startGame" @close="selectedGame = null" />
  </div>
</template>

<style scoped>
.poker-page {
  min-width: 0;
  width: 100%;
  padding-bottom: 48px;
  color: var(--text);
}

.poker-sticky-header {
  position: sticky;
  z-index: 30;
  top: var(--content-sticky-top);
  padding-bottom: 6px;
}

.poker-category-nav {
  display: flex;
  gap: 9px;
  padding: 10px 8px;
  overflow-x: auto;
  border-radius: 14px 14px 0 0;
  background: color-mix(in srgb, var(--surface) 94%, var(--text) 6%);
}

.poker-category-tab {
  display: flex;
  width: 51px;
  min-height: 49px;
  flex: 0 0 51px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 2px;
  border-radius: 8px;
  color: var(--secondary);
  transition: color 150ms ease, background-color 150ms ease;
}

.poker-category-tab span {
  max-width: 100%;
  overflow: hidden;
  font-size: 10px;
  font-weight: 600;
  line-height: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.poker-category-tab:hover { color: var(--text); }
.poker-category-tab--active,
.poker-category-tab--active:hover { color: #fff; background: var(--main-color); }
.poker-category-tab :deep(.fill-text-4),
.poker-category-tab :deep(.fill-title-button-special) {
  fill: currentColor;
}

.poker-toolbar,
.poker-providers,
.poker-toolbar-actions { display: flex; align-items: center; }
.poker-toolbar { justify-content: space-between; gap: 12px; padding: 8px 0; }
.poker-providers { min-width: 0; flex: 1; gap: 8px; overflow-x: auto; }
.poker-toolbar-actions { flex-shrink: 0; gap: 8px; }

.poker-provider-pill {
  min-width: 58px;
  min-height: 37px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 17px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--secondary);
  background: var(--surface);
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
}

.poker-provider-pill-logo {
  height: 18px;
  max-width: 60px;
  object-fit: contain;
  display: block;
}

.poker-provider-pill--active { color: #fff; background: var(--main-color); font-weight: 700; }

.poker-icon-button {
  display: inline-flex;
  width: 37px;
  height: 37px;
  flex: 0 0 37px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--secondary);
  background: var(--surface);
  cursor: pointer;
}

.poker-icon-button:hover,
.poker-icon-button--active { color: var(--main-color); border-color: var(--main-color); }

.poker-search {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  padding-left: 15px;
  border: 1px solid var(--border);
  border-radius: 24px;
  color: var(--secondary);
  background: var(--surface);
}

.poker-search input { min-width: 0; width: 100%; height: 40px; border: 0; outline: none; color: var(--text); background: transparent; font-size: 13px; }
.poker-search:focus-within { border-color: var(--main-color); }
.poker-section { min-width: 0; margin: 0 0 18px; }
.poker-section-header { display: flex; min-height: 31px; align-items: center; justify-content: space-between; gap: 10px; padding-bottom: 7px; }
.poker-section-header h2 { margin: 0; color: var(--heading); font-size: 14px; font-weight: 700; line-height: 20px; }
.poker-section-count { display: inline-flex; min-height: 25px; align-items: center; gap: 3px; padding: 1px 8px; border: 1px solid var(--border); border-radius: 999px; color: var(--secondary); background: var(--surface); font-size: 12px; line-height: 20px; }
a.poker-section-count:hover { color: var(--text); }

.poker-games-grid { display: grid; min-width: 0; gap: 8px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.poker-category-nav,
.poker-providers { scrollbar-width: none; }
.poker-category-nav::-webkit-scrollbar,
.poker-providers::-webkit-scrollbar { display: none; }

@media (min-width: 640px) {
  .poker-games-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .poker-games-grid { grid-template-columns: repeat(7, minmax(0, 1fr)); }
}

@media (min-width: 1280px) {
  .poker-games-grid { grid-template-columns: repeat(10, minmax(0, 1fr)); }
}
</style>
