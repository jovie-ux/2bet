<script setup lang="ts">
import { LayoutGrid, MoreHorizontal } from 'lucide-vue-next'
import {
  EXPERT_PREDICTORS,
  type Prediction,
  type PredictionOption,
  type PredictionsResponse,
} from '~/data/predictions'
import type { LivePlazaSportFilter } from '~/components/live-plaza/LivePlazaSportFilters.vue'

type PredictionSort = 'featured' | 'hit' | 'win-streak'

const predictionSortOptions: Array<{ value: PredictionSort; label: string }> = [
  { value: 'featured', label: 'Featured' },
  { value: 'hit', label: 'Hit' },
  { value: 'win-streak', label: 'Win Streak' },
]

const visiblePredictors = computed(() => {
  const seen = new Set<string>()
  return [...EXPERT_PREDICTORS]
    .filter(predictor => (predictor.currentPredictions ?? 0) > 0)
    .sort((a, b) => {
      const predDiff = (b.currentPredictions ?? 0) - (a.currentPredictions ?? 0)
      if (predDiff !== 0) return predDiff
      return (b.hitRate ?? 0) - (a.hitRate ?? 0)
    })
    .filter((predictor) => {
      const key = predictor.predictorName.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, 10)
})
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

useAppSeo({
  title: 'Expert Predictions & High Hit Rate Tips | ByBet Plaza',
  description: 'Get daily expert predictions and verified betting tips on ByBet Live Plaza. Boost your wagering strategy with data-driven insights and match previews.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Live Plaza', path: '/explore/live-plaza/home' },
    { name: 'Expert Predictions', path: '/explore/live-plaza/expert-predictions' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ByBet Expert Predictions',
    url: 'https://bybet.com/explore/live-plaza/expert-predictions',
  },
})

const { showDemoMessage } = useDemoInteraction()
const route = useRoute()
const {
  data: predictionData,
  status: predictionStatus,
  error: predictionError,
  refresh: refreshPredictions,
} = await useFetch<PredictionsResponse>('/api/predictions')

const selectedSport = ref<LivePlazaSportFilter>('all')
const getPredictorIdFromQuery = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  return EXPERT_PREDICTORS.some(predictor => predictor.id === value) ? value : null
}
const selectedPredictorId = ref<string | null>(getPredictorIdFromQuery(route.query.predictor))
const predictionSort = ref<PredictionSort>('featured')
const sortMenuOpen = ref(false)
const sortControl = ref<HTMLElement | null>(null)
const sortButton = ref<HTMLButtonElement | null>(null)
const unlockedPredictionIds = ref<Set<string>>(new Set())

const selectedSortLabel = computed(() => {
  return predictionSortOptions.find(option => option.value === predictionSort.value)?.label ?? 'Featured'
})

const filteredPredictions = computed(() => {
  let predictions = selectedSport.value === 'all'
    ? [...(predictionData.value?.predictions ?? [])]
    : (predictionData.value?.predictions ?? []).filter(item => item.sport === selectedSport.value)

  if (selectedPredictorId.value) {
    predictions = predictions.filter(item => item.predictorId === selectedPredictorId.value)
  }

  if (predictionSort.value === 'hit') {
    predictions.sort((a, b) => b.hitRate - a.hitRate)
  } else if (predictionSort.value === 'win-streak') {
    predictions.sort((a, b) => {
      const aStreak = Number(a.winStreak?.match(/\d+/)?.[0] ?? 0)
      const bStreak = Number(b.winStreak?.match(/\d+/)?.[0] ?? 0)
      return bStreak - aStreak
    })
  }

  return predictions
})

const visiblePredictions = computed(() => filteredPredictions.value)

const redirectToByBet = (): void => {
  void navigateTo(bybetRedirectUrl, { external: true })
}

watch(() => route.query.predictor, (predictorId) => {
  selectedPredictorId.value = getPredictorIdFromQuery(predictorId)
})

const handleAvatarError = (event: Event): void => {
  const image = event.currentTarget as HTMLImageElement
  if (!image.src.endsWith('/images/predictions/jedaiah.webp')) {
    image.src = '/images/predictions/jedaiah.webp'
  }
}

const toggleSortMenu = (): void => {
  sortMenuOpen.value = !sortMenuOpen.value
}

const selectPredictionSort = (sort: PredictionSort): void => {
  predictionSort.value = sort
  sortMenuOpen.value = false
  const label = predictionSortOptions.find(option => option.value === sort)?.label ?? 'Featured'
}

const handleDocumentClick = (event: MouseEvent): void => {
  if (sortMenuOpen.value && !sortControl.value?.contains(event.target as Node)) {
    sortMenuOpen.value = false
  }
}

const handleEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && sortMenuOpen.value) {
    sortMenuOpen.value = false
    sortButton.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)
})

const handleUnlock = (prediction: Prediction): void => {
  if (unlockedPredictionIds.value.has(prediction.id)) {
    showDemoMessage(`Already unlocked predictions from ${prediction.predictorName}`)
    return
  }

  unlockedPredictionIds.value.add(prediction.id)
  showDemoMessage(`Unlocked expert prediction by ${prediction.predictorName}!`)
}

const handleOddClick = (_prediction?: Prediction, _option?: PredictionOption): void => {
  redirectToByBet()
}
</script>

<template>
  <div class="expert-predictions-page">
    <SeoHeader
      sticky
      title="Predict"
      description="Follow expert sports predictions, winning streaks, and real-time forecasts on ByBet."
      :show-back="false"
      :show-flag="false"
    />

    <section class="predictor-panel" aria-label="Prediction experts">
      <div class="predictor-rail">
        <NuxtLink
          to="/explore/live-plaza/experts"
          class="predictor-item predictor-item--all"
          :class="{ 'predictor-item--active': selectedPredictorId === null }"
          aria-label="View all experts"
        >
          <span class="predictor-item__all-icon">
            <LayoutGrid :size="25" :stroke-width="0" fill="currentColor" aria-hidden="true" />
          </span>
          <span class="predictor-item__name">All</span>
        </NuxtLink>

        <button
          v-for="predictor in visiblePredictors"
          :key="predictor.id"
          type="button"
          class="predictor-item"
          :class="{ 'predictor-item--active': selectedPredictorId === predictor.id }"
          :aria-pressed="selectedPredictorId === predictor.id"
          @click="redirectToByBet"
        >
          <span class="predictor-item__avatar-wrap">
            <img
              :src="predictor.predictorAvatar"
              :alt="predictor.predictorName"
              class="predictor-item__avatar"
              width="54"
              height="54"
              loading="lazy"
              decoding="async"
              @error="handleAvatarError"
            >
            <span v-if="predictor.currentPredictions" class="predictor-item__badge">
              {{ predictor.currentPredictions }}
            </span>
          </span>
          <span class="predictor-item__name">{{ predictor.predictorName }}</span>
        </button>
      </div>
    </section>

    <section class="predictions-block" aria-labelledby="expert-predictions-title">
      <div class="predictions-toolbar">
        <div class="panel-heading">
          <h2 id="expert-predictions-title">Expert Predictions</h2>
          <div ref="sortControl" class="sort-control">
            <button
              ref="sortButton"
              type="button"
              class="panel-action"
              :class="{ 'panel-action--open': sortMenuOpen }"
              aria-haspopup="menu"
              :aria-expanded="sortMenuOpen"
              aria-controls="prediction-sort-menu"
              @click.stop="toggleSortMenu"
            >
              <span>{{ selectedSortLabel }}</span>
              <MoreHorizontal :size="15" aria-hidden="true" />
            </button>

            <Transition name="sort-menu">
              <div
                v-if="sortMenuOpen"
                id="prediction-sort-menu"
                class="sort-menu"
                role="menu"
                aria-label="Sort predictions"
              >
                <span class="sort-menu__label">Sort</span>
                <div class="sort-menu__options">
                  <button
                    v-for="option in predictionSortOptions"
                    :key="option.value"
                    type="button"
                    class="sort-menu__option"
                    :class="{ 'sort-menu__option--active': predictionSort === option.value }"
                    role="menuitemradio"
                    :aria-checked="predictionSort === option.value"
                    @click="selectPredictionSort(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div class="panel-filters">
          <LivePlazaSportFilters v-model="selectedSport" />
        </div>
      </div>

      <div v-if="predictionStatus === 'pending'" class="predictions-empty">
        Loading expert predictions…
      </div>

      <div v-else-if="predictionError" class="predictions-empty predictions-empty--error">
        <span>Expert predictions are temporarily unavailable.</span>
        <button type="button" @click="refreshPredictions()">Try again</button>
      </div>

      <div v-else-if="visiblePredictions.length" class="predictions-grid">
        <LivePlazaPredictionCard
          v-for="prediction in visiblePredictions"
          :key="prediction.id"
          :prediction="prediction"
          :unlocked="unlockedPredictionIds.has(prediction.id)"
          @unlock="handleUnlock"
          @select-odd="handleOddClick"
        />
      </div>

      <div v-else class="predictions-empty">
        No predictions are available for this expert yet.
      </div>
    </section>
  </div>
</template>

<style scoped>
.expert-predictions-page {
  width: 100%;
  min-width: 0;
  padding-top: 0;
  padding-bottom: 2rem;
  color: #ffffff;
}

.predictor-panel,
.predictions-toolbar {
  border: 1px solid rgba(255, 255, 255, 0.025);
  border-radius: 12px;
  background: #141414;
}

.predictor-panel {
  overflow: hidden;
  margin-bottom: 8px;
  padding: 12px 13px 10px;
}

.predictor-rail {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 18px;
}

.predictor-rail::-webkit-scrollbar {
  display: none;
}

.predictor-item {
  display: flex;
  width: 64px;
  min-width: 64px;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: 0;
  color: #eeeeee;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  gap: 6px;
}

.predictor-item--all {
  position: relative;
  width: 71px;
  min-width: 71px;
  padding-right: 13px;
}

.predictor-item--all::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 79px;
  background: #2b2b2b;
  content: '';
}

.predictor-item__all-icon,
.predictor-item__avatar-wrap {
  position: relative;
  width: 55px;
  height: 55px;
  flex: 0 0 auto;
}

.predictor-item__all-icon {
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #777a78;
  background: #383a39;
}

.predictor-item__all-icon :deep(svg) {
  opacity: 0.9;
}

.predictor-item__avatar-wrap {
  display: block;
}

.predictor-item__avatar {
  display: block;
  width: 55px;
  height: 55px;
  border: 2px solid #777b79;
  border-radius: 50%;
  object-fit: cover;
  background: #242424;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.predictor-item__badge {
  display: grid;
  position: absolute;
  top: 0px;
  right: -3px;
  width: 19px;
  height: 19px;
  place-items: center;
  border: 1px solid #ffffff;
  border-radius: 50%;
  color: #ef3348;
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  background: #ffffff;
}

.predictor-item__name {
  overflow: hidden;
  width: 100%;
  color: #efefef;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.predictor-item--active .predictor-item__avatar {
  border-color: #1cc48f;
  box-shadow: 0 0 0 2px rgba(28, 196, 143, 0.2);
}

.predictor-item--active .predictor-item__all-icon {
  color: #a2a5a3;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.predictions-block {
  min-width: 0;
}

.predictions-toolbar {
  position: relative;
  z-index: 10;
  overflow: visible;
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
  border: 1px solid #087d5c;
  border-radius: 999px;
  color: #e8e8e8;
  font-size: 11px;
  font-weight: 500;
  background: #202322;
  cursor: pointer;
  gap: 4px;
  transition: border-color 150ms ease, background-color 150ms ease;
}

.panel-action:hover,
.panel-action--open {
  border-color: #00a676;
  background: #272a29;
}

.sort-control {
  position: relative;
  flex: 0 0 auto;
}

.sort-menu {
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

.sort-menu__label {
  margin-bottom: 7px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
}

.sort-menu__options {
  display: grid;
  justify-items: center;
  gap: 4px;
}

.sort-menu__option {
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

.sort-menu__option:hover {
  border-color: #008965;
  background: #252a28;
}

.sort-menu__option--active,
.sort-menu__option--active:hover {
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

@media (max-width: 55rem) {
  .predictions-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 47.99rem) {
  .expert-predictions-page {
    padding-top: 0;
    padding-bottom: 5rem;
  }

  .predictor-panel {
    padding-right: 10px;
    padding-left: 10px;
  }

  .predictor-rail {
    gap: 12px;
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
}
</style>
