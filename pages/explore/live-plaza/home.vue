<script setup lang="ts">
import { ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import {
  type Prediction,
  type PredictionOption,
  type PredictionsResponse,
} from '~/data/predictions'
import {
  type PopularGame,
} from '~/data/live-plaza'
import type { LivePlazaSportFilter } from '~/components/live-plaza/LivePlazaSportFilters.vue'

type PopularGameSort = 'time' | 'predict'

const popularGameSortOptions: Array<{ value: PopularGameSort; label: string }> = [
  { value: 'time', label: 'Time' },
  { value: 'predict', label: 'Predict' },
]

useAppSeo({
  title: 'Live Plaza — Popular Games & Expert Predictions | ByBet',
  description: 'Explore ByBet Live Plaza for trending sports broadcasts, expert game predictions, verified hit rates, and real-time community betting discussions.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Live Plaza', path: '/explore/live-plaza/home' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ByBet Live Plaza',
    url: 'https://bybet.com/explore/live-plaza/home',
  },
})

const { showDemoMessage } = useDemoInteraction()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

const redirectToByBet = (): void => {
  void navigateTo(bybetRedirectUrl, { external: true })
}
const {
  data: predictionData,
  status: predictionStatus,
  error: predictionError,
  refresh: refreshPredictions,
} = await useFetch<PredictionsResponse>('/api/predictions')

const popularSport = ref<LivePlazaSportFilter>('all')
const predictionsSport = ref<LivePlazaSportFilter>('all')
const popularGameSort = ref<PopularGameSort>('predict')
const popularSortMenuOpen = ref(false)
const popularSortControl = ref<HTMLElement | null>(null)
const popularSortButton = ref<HTMLButtonElement | null>(null)
const unlockedIds = ref<Set<string>>(new Set())
const carouselContainer = ref<HTMLElement | null>(null)
const nowTimestamp = ref(Date.now())
let kickoffCheckTimer: ReturnType<typeof setInterval> | null = null
let pollRefreshTimer: ReturnType<typeof setInterval> | null = null

const selectedPopularSortLabel = computed(() => (
  popularGameSortOptions.find(option => option.value === popularGameSort.value)?.label ?? 'Predict'
))

const upcomingPredictions = computed(() => {
  const allList = predictionData.value?.predictions ?? []

  return allList.filter(item => {
    const rawTime = item.matchTimeUtc || (item as any).match_time
    if (!rawTime) return true

    const matchTime = new Date(rawTime).getTime()
    return Number.isNaN(matchTime) || matchTime > nowTimestamp.value
  })
})

const generatedPredictCount = (key: string): number => {
  let hash = 0
  for (const character of key) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  }
  return (hash % 10) + 1
}

const popularGames = computed<PopularGame[]>(() => {
  const games = new Map<string, PopularGame>()

  for (const prediction of upcomingPredictions.value) {
    const key = prediction.matchId
      || `${prediction.sport}:${prediction.league}:${prediction.matchTime}:${prediction.homeTeam}:${prediction.awayTeam}`
    const existing = games.get(key)

    if (existing) {
      continue
    }

    const [date = '', time = ''] = prediction.matchTime.split(/\s+/, 2)
    const fallbackLogo = prediction.sport === 'basketball'
      ? '/icons/sports/basketball.webp'
      : '/icons/sports/soccer.webp'

    games.set(key, {
      id: key,
      date,
      time,
      league: prediction.league,
      sport: prediction.sport,
      predictCount: generatedPredictCount(key),
      homeTeam: {
        name: prediction.homeTeam,
        logo: prediction.homeTeamLogo || fallbackLogo,
      },
      awayTeam: {
        name: prediction.awayTeam,
        logo: prediction.awayTeamLogo || fallbackLogo,
      },
    })
  }

  return [...games.values()]
})

const filteredPopularGames = computed(() => {
  const games = popularSport.value === 'all'
    ? [...popularGames.value]
    : popularGames.value.filter(game => game.sport === popularSport.value)

  const sorted = popularGameSort.value === 'time'
    ? games.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    : games.sort((a, b) => b.predictCount - a.predictCount)

  return sorted.slice(0, 5)
})

const filteredPredictions = computed(() => {
  const sportFiltered = upcomingPredictions.value.filter(item => {
    if (predictionsSport.value === 'all') return true
    if (predictionsSport.value === 'soccer') {
      return item.sport === 'soccer' || (item as any).sport === 'football'
    }
    if (predictionsSport.value === 'basketball') {
      return item.sport === 'basketball'
    }
    return true
  })

  return sportFiltered.slice(0, 6)
})

const scrollCarousel = (): void => {
  carouselContainer.value?.scrollBy({ left: 275, behavior: 'smooth' })
}

const togglePopularSortMenu = (): void => {
  popularSortMenuOpen.value = !popularSortMenuOpen.value
}

const selectPopularGameSort = (sort: PopularGameSort): void => {
  popularGameSort.value = sort
  popularSortMenuOpen.value = false
}

const handleDocumentClick = (event: MouseEvent): void => {
  if (popularSortMenuOpen.value && !popularSortControl.value?.contains(event.target as Node)) {
    popularSortMenuOpen.value = false
  }
}

const handleEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && popularSortMenuOpen.value) {
    popularSortMenuOpen.value = false
    popularSortButton.value?.focus()
  }
}

const handleGameClick = (_game?: PopularGame): void => {
  redirectToByBet()
}

const handleUnlock = (prediction: Prediction): void => {
  if (unlockedIds.value.has(prediction.id)) {
    showDemoMessage(`Already unlocked predictions from ${prediction.predictorName}`)
    return
  }

  unlockedIds.value.add(prediction.id)
  showDemoMessage(`Unlocked expert prediction by ${prediction.predictorName}!`)
}

const handleOddClick = (_prediction?: Prediction, _option?: PredictionOption): void => {
  redirectToByBet()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)

  // Periodically re-evaluate kickoff times (every 15s) so started matches hide immediately
  kickoffCheckTimer = setInterval(() => {
    nowTimestamp.value = Date.now()
  }, 15000)

  // Periodically refresh predictions from backend storage (every 60s)
  pollRefreshTimer = setInterval(() => {
    refreshPredictions()
  }, 60000)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)

  if (kickoffCheckTimer) {
    clearInterval(kickoffCheckTimer)
    kickoffCheckTimer = null
  }
  if (pollRefreshTimer) {
    clearInterval(pollRefreshTimer)
    pollRefreshTimer = null
  }
})
</script>

<template>
  <div class="live-plaza-page">
    <SeoHeader
      sticky
      title="Live Plaza"
      description="Live Plaza on ByBet Philippines. Real-time game streaming, popular matches, and expert sports predictions."
      :show-back="false"
      :show-flag="false"
    />

    <section class="popular-panel" aria-labelledby="popular-games-title">
      <div class="panel-heading">
        <h2 id="popular-games-title">Popular Games</h2>
        <div ref="popularSortControl" class="popular-sort-control">
          <button
            ref="popularSortButton"
            type="button"
            class="panel-action panel-action--popular-sort"
            :class="{ 'panel-action--open': popularSortMenuOpen }"
            aria-haspopup="menu"
            :aria-expanded="popularSortMenuOpen"
            aria-controls="popular-game-sort-menu"
            @click.stop="togglePopularSortMenu"
          >
            <span>{{ selectedPopularSortLabel }}</span>
            <MoreHorizontal :size="15" aria-hidden="true" />
          </button>

          <Transition name="sort-menu">
            <div
              v-if="popularSortMenuOpen"
              id="popular-game-sort-menu"
              class="popular-sort-menu"
              role="menu"
              aria-label="Sort popular games"
            >
              <span class="popular-sort-menu__label">Sort</span>
              <div class="popular-sort-menu__options">
                <button
                  v-for="option in popularGameSortOptions"
                  :key="option.value"
                  type="button"
                  class="popular-sort-menu__option"
                  :class="{ 'popular-sort-menu__option--active': popularGameSort === option.value }"
                  role="menuitemradio"
                  :aria-checked="popularGameSort === option.value"
                  @click="selectPopularGameSort(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <div class="panel-filters">
        <LivePlazaSportFilters v-model="popularSport" />
      </div>

      <div class="popular-games-wrap">
        <div ref="carouselContainer" class="popular-games-list">
          <button
            v-for="game in filteredPopularGames"
            :key="game.id"
            type="button"
            class="popular-game"
            @click="handleGameClick(game)"
          >
            <span class="popular-game__topline">
              <span class="popular-game__meta">{{ game.date }} {{ game.time }}&nbsp; {{ game.league }}</span>
              <span class="popular-game__predict">Predict {{ game.predictCount }}</span>
            </span>

            <span class="popular-game__teams">
              <span class="popular-game__team">
                <img :src="game.homeTeam.logo" :alt="game.homeTeam.name" width="18" height="18">
                <span>{{ game.homeTeam.name }}</span>
              </span>
              <span class="popular-game__team">
                <img :src="game.awayTeam.logo" :alt="game.awayTeam.name" width="18" height="18">
                <span>{{ game.awayTeam.name }}</span>
              </span>
            </span>
          </button>
        </div>

        <button
          type="button"
          class="popular-games-next"
          aria-label="Show more popular games"
          @click="scrollCarousel"
        >
          <ChevronRight :size="16" :stroke-width="2.5" />
        </button>
      </div>
    </section>

    <section class="predictions-block" aria-label="Expert Predictions">
      <div class="predictions-toolbar">
        <div class="panel-filters">
          <LivePlazaSportFilters v-model="predictionsSport" />
        </div>
      </div>

      <div v-if="predictionStatus === 'pending'" class="predictions-empty">
        Loading expert predictions…
      </div>

      <div v-else-if="predictionError" class="predictions-empty predictions-empty--error">
        <span>Expert predictions are temporarily unavailable.</span>
        <button type="button" @click="refreshPredictions()">Try again</button>
      </div>

      <div v-else-if="filteredPredictions.length" class="predictions-grid">
        <LivePlazaPredictionCard
          v-for="prediction in filteredPredictions"
          :key="prediction.id"
          :prediction="prediction"
          :unlocked="unlockedIds.has(prediction.id)"
          @unlock="handleUnlock"
          @select-odd="handleOddClick"
        />
      </div>

      <div v-else class="predictions-empty">
        No upcoming predictions available right now. Check back for the next daily update.
      </div>
    </section>
  </div>
</template>

<style scoped>
.live-plaza-page {
  width: 100%;
  min-width: 0;
  padding-top: 0;
  padding-bottom: 2rem;
  color: #ffffff;
}

.popular-panel,
.predictions-toolbar {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.025);
  border-radius: 12px;
  background: #141414;
}

.popular-panel {
  position: relative;
  margin-bottom: 8px;
}

.panel-heading {
  display: flex;
  min-height: 47px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid #2b2b2b;
}

.panel-heading h2 {
  margin: 0;
  color: #f7f7f7;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
}

.panel-action {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  color: #e8e8e8;
  font-size: 11px;
  font-weight: 500;
  background: #242424;
  cursor: pointer;
  gap: 4px;
  transition: background-color 150ms ease;
}

.panel-action:hover {
  background: #303030;
}

.popular-sort-control {
  position: relative;
  flex: 0 0 auto;
}

.panel-action--popular-sort:hover,
.panel-action--popular-sort.panel-action--open {
  border: 1px solid #087d5c;
}

.popular-sort-menu {
  display: flex;
  position: absolute;
  z-index: 30;
  top: calc(100% + 5px);
  right: -12px;
  width: 165px;
  flex-direction: column;
  padding: 8px 12px 9px;
  border: 1px solid rgba(255, 255, 255, 0.025);
  border-radius: 14px;
  color: #eeeeee;
  background: #171717;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.42);
}

.popular-sort-menu__label {
  margin-bottom: 7px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
}

.popular-sort-menu__options {
  display: grid;
  justify-items: center;
  gap: 4px;
}

.popular-sort-menu__option {
  width: 125px;
  height: 33px;
  padding: 0 12px;
  border: 1px solid #565b58;
  border-radius: 999px;
  color: #eeeeee;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  background: #202322;
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease;
}

.popular-sort-menu__option:hover {
  border-color: #008965;
  background: #252a28;
}

.popular-sort-menu__option--active,
.popular-sort-menu__option--active:hover {
  border-color: #007653;
  background: #007653;
}

.sort-menu-enter-active,
.sort-menu-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
  transform-origin: top right;
}

.sort-menu-enter-from,
.sort-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

.panel-filters {
  display: flex;
  min-height: 46px;
  align-items: center;
  padding: 0 11px;
}

.popular-games-wrap {
  position: relative;
  border-top: 1px solid #2b2b2b;
}

.popular-games-list {
  display: flex;
  min-width: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.popular-games-list::-webkit-scrollbar {
  display: none;
}

.popular-game {
  display: flex;
  width: 265px;
  min-width: 265px;
  min-height: 111px;
  flex-direction: column;
  align-items: stretch;
  padding: 14px 12px 12px;
  border: 0;
  border-right: 1px solid #2b2b2b;
  color: #ffffff;
  text-align: left;
  background: transparent;
  cursor: pointer;
  gap: 13px;
  transition: background-color 150ms ease;
}

.popular-game:hover {
  background: rgba(255, 255, 255, 0.025);
}

.popular-game__topline,
.popular-game__team {
  display: flex;
  min-width: 0;
  align-items: center;
}

.popular-game__topline {
  justify-content: space-between;
  gap: 6px;
}

.popular-game__meta {
  overflow: hidden;
  min-width: 0;
  color: #7f827f;
  font-size: 10px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popular-game__predict {
  flex: 0 0 auto;
  padding: 3px 5px;
  border-radius: 4px;
  color: #eeeeee;
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  background: #2a2a2a;
}

.popular-game__teams {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.popular-game__team {
  color: #f3f3f3;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  gap: 6px;
}

.popular-game__team img {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  border-radius: 50%;
  object-fit: contain;
}

.popular-game__team span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popular-games-next {
  display: grid;
  position: absolute;
  top: 50%;
  right: 12px;
  width: 27px;
  height: 27px;
  place-items: center;
  padding: 0;
  transform: translateY(-50%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  color: #eeeeee;
  background: #242424;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.42);
  cursor: pointer;
}

.predictions-block {
  min-width: 0;
}

.predictions-toolbar {
  margin-bottom: 8px;
}

.predictions-toolbar .panel-filters {
  min-height: 54px;
  padding: 0 12px;
}

.predictions-grid {
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.predictions-empty {
  display: grid;
  min-height: 212px;
  place-items: center;
  border-radius: 12px;
  color: #858985;
  font-size: 12px;
  background: #141414;
}

.predictions-empty--error {
  align-content: center;
  gap: 12px;
}

.predictions-empty--error button {
  padding: 7px 14px;
  border: 1px solid #087d5c;
  border-radius: 999px;
  color: #ffffff;
  background: #202322;
  cursor: pointer;
}

@media (max-width: 74rem) {
  .popular-game {
    width: 240px;
    min-width: 240px;
  }
}

@media (max-width: 55rem) {
  .predictions-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 47.99rem) {
  .live-plaza-page {
    padding-top: 0;
    padding-bottom: 5rem;
  }

  .panel-heading {
    min-height: 44px;
  }

  .panel-heading h2 {
    font-size: 14px;
  }

  .panel-filters {
    min-height: 42px;
  }

  .popular-game {
    width: 225px;
    min-width: 225px;
  }
}
</style>
