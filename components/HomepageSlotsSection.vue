<script setup lang="ts">
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Play } from 'lucide-vue-next'
import HomepageContentSlider from '~/components/HomepageContentSlider.vue'
import { SLOTS, newGames as newSlotGames, type SlotGame } from '~/data/slots'
import type { ReferenceGame } from '~/data/homepage'

const props = defineProps<{ games?: SlotGame[] | ReferenceGame[] }>()
const { translate } = useSiteLocale()
const titleIcon = '/icons/egames/slots.webp'

const tabs = [
  { key: 'popular', label: 'Popular' },
  { key: 'new', label: 'New games' },
  { key: 'favorites', label: 'Favorites' },
] as const

const activeTab = ref<(typeof tabs)[number]['key']>('popular')
const favorites = useCookie<string[]>('2bet-slot-favorites', { default: () => [], sameSite: 'lax' })
const providerName = (provider?: string) => (!provider ? '2bet' : provider === 'PG' ? 'PG Soft' : provider)

// All games sourced from slots.ts (2,300+ games)
const allGames = computed<SlotGame[]>(() => {
  if (props.games && props.games.length > 50) {
    return props.games as SlotGame[]
  }
  return SLOTS
})

const newGamesList = computed<SlotGame[]>(() => {
  const markedNew = allGames.value.filter(g => g.new || g.badge?.toLowerCase().includes('new'))
  return markedNew.length ? markedNew : (newSlotGames as unknown as SlotGame[])
})

const favoriteGames = computed<SlotGame[]>(() => {
  return allGames.value.filter(game => favorites.value.includes(game.title) || favorites.value.includes(game.id))
})

const providers = [
  { key: 'all', label: 'All', value: 'all' },
  { key: '2bet', label: '2bet', value: '2bet' },
  { key: 'lgd', label: 'LGD', value: 'LGD' },
  { key: 'mg', label: 'MG+', value: 'MG+' },
  { key: 'netent', label: 'NetEnt', value: 'NetEnt' },
  { key: 'bs', label: 'BS', value: 'BS' },
  { key: 'choice', label: 'Choice', value: 'Choice' },
  { key: 'pg', label: 'PG', value: 'PG' },
  { key: 'jili', label: 'JILI', value: 'JILI' },
  { key: 'pp', label: 'PP', value: 'PP' },
  { key: 'cq9', label: 'CQ9', value: 'CQ9' },
  { key: 'jdb', label: 'JDB', value: 'JDB' },
  { key: 'red-tiger', label: 'Red Tiger', value: 'Red Tiger' },
] as const

const currentCollection = computed<SlotGame[]>(() => {
  if (activeTab.value === 'new') return newGamesList.value
  if (activeTab.value === 'favorites') return favoriteGames.value
  return allGames.value
})

// Desktop mode: show only the first 10 slots in carousel
const desktopGames = computed<SlotGame[]>(() => {
  return currentCollection.value.slice(0, 10)
})

const emptyMessage = computed(() => activeTab.value === 'favorites'
  ? translate('Save games with the heart icon to see your favorites here.')
  : translate('No games are available in this collection yet.'))

function toggleFavorite(title: string) {
  favorites.value = favorites.value.includes(title)
    ? favorites.value.filter(saved => saved !== title)
    : [...favorites.value, title]
}

const MOBILE_GAME_LIMIT = 24
const displayedGames = computed(() => currentCollection.value.slice(0, MOBILE_GAME_LIMIT))
</script>

<template>
  <div class="homepage-slots-wrapper">
    <!-- Desktop Carousel Mode (shows only first 10 slots) -->
    <div class="slots-desktop-carousel">
      <HomepageContentSlider
        id="slots"
        class="homepage-slots-section"
        :title="translate('Top Slots')"
        :description="translate('Handpicked games from leading providers')"
        view-all-to="/egames/slots/top"
        :view-all-label="translate('View all')"
        :item-count="desktopGames.length"
        :visible-cards="6"
        :items-per-slide="1"
        :reset-key="activeTab"
      >
        <template #header="{ atStart, atEnd, move }">
          <header class="slots-header flex items-center justify-between">
            <div class="slots-heading flex items-center min-w-0">
              <h2 id="slots-title" class="flex items-center">
                <img :src="titleIcon" class="allgames-heading-symbol allgames-heading-image" :alt="translate('Top Slots')" width="28" height="28">
                {{ translate('Top Slots') }}
              </h2>
              <p>{{ translate('Handpicked games from leading providers') }}</p>
            </div>
            <div class="slots-actions flex items-center">
              <NuxtLink to="/egames/slots/top" class="slots-view-all homepage-text-cta">
                {{ translate('View all') }} <ArrowRight :size="16" aria-hidden="true" />
              </NuxtLink>
              <div class="slots-controls flex items-center" :aria-label="translate('Top Slots slider controls')">
                <button type="button" :disabled="atStart" :aria-label="translate('Previous Top Slots items')" aria-controls="slots-track" @click="move(-1)">
                  <ChevronLeft :size="17" aria-hidden="true" />
                </button>
                <button type="button" :disabled="atEnd" :aria-label="translate('Next Top Slots items')" aria-controls="slots-track" @click="move(1)">
                  <ChevronRight :size="17" aria-hidden="true" />
                </button>
              </div>
            </div>
          </header>
          <div class="slots-toolbar flex items-center justify-between">
            <div class="slots-tabs flex items-center" role="group" :aria-label="translate('Slot collections')">
              <button
                v-for="tab in tabs"
                :key="tab.key"
                type="button"
                :data-collection="tab.key"
                :aria-pressed="activeTab === tab.key"
                aria-controls="slots-track"
                @click="activeTab = tab.key"
              >
                {{ translate(tab.label) }}
              </button>
            </div>
            <nav class="slots-provider-pills flex items-center" :aria-label="translate('Browse slots by provider')">
              <NuxtLink
                v-for="provider in providers"
                :key="provider.key"
                :to="provider.key === 'all' ? '/egames/slots' : { path: '/egames/slots', query: { provider: provider.value } }"
                :data-provider="provider.key"
                :class="{ 'is-all': provider.key === 'all' }"
              >
                {{ provider.key === 'all' ? translate(provider.label) : provider.label }}
              </NuxtLink>
            </nav>
          </div>
        </template>

        <article
          v-for="game in desktopGames"
          :key="`desktop-${game.id || game.title}`"
          class="slots-game"
          :data-provider="providerName(game.provider)"
        >
          <NuxtLink
            :to="game.href || '/egames/slots/top'"
            class="slots-game-link"
            :aria-label="`${translate('Discover')} ${game.title} - ${providerName(game.provider)}`"
          >
            <div class="slots-game-art">
              <img
                :src="game.image"
                :alt="game.title"
                width="300"
                height="300"
                loading="lazy"
                decoding="async"
              >
              <span v-if="game.badge || game.title === 'Sweet Bonanza 1000' || game.hotPercent" class="slots-game-hot">
                {{ game.badge || translate('HOT') }}
              </span>
              <span class="slots-game-play" aria-hidden="true">
                <Play :size="20" fill="currentColor" />
              </span>
            </div>
            <div class="slots-game-caption">
              <h3>{{ game.title }}</h3>
              <p>{{ providerName(game.provider) }}</p>
            </div>
          </NuxtLink>
          <button
            type="button"
            class="slots-favorite"
            :class="{ 'is-saved': favorites.includes(game.title) }"
            :aria-pressed="favorites.includes(game.title)"
            :aria-label="`${game.title} - ${translate('Favorites')}`"
            @click="toggleFavorite(game.title)"
          >
            <Heart
              :size="15"
              :fill="favorites.includes(game.title) ? 'currentColor' : 'none'"
              aria-hidden="true"
            />
          </button>
        </article>

        <div v-if="!desktopGames.length" class="slots-empty" role="status">
          {{ emptyMessage }}
        </div>
      </HomepageContentSlider>
    </div>

    <!-- Mobile: show up to 24 games, followed by the full catalogue link. -->
    <section id="slots-mobile" class="slots-mobile-grid homepage-slots-section" aria-labelledby="slots-mobile-title">
      <header class="slots-header flex items-center justify-between">
        <div class="slots-heading flex items-center min-w-0">
          <h2 id="slots-mobile-title" class="flex items-center">
            <img :src="titleIcon" class="allgames-heading-symbol allgames-heading-image" :alt="translate('Top Slots')" width="28" height="28">
            {{ translate('Top Slots') }}
          </h2>
          <p>{{ translate('Handpicked games from leading providers') }}</p>
        </div>
      </header>

      <div class="slots-toolbar flex items-center justify-between">
        <div class="slots-tabs flex items-center" role="group" :aria-label="translate('Slot collections')">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            :data-collection="tab.key"
            :aria-pressed="activeTab === tab.key"
            aria-controls="slots-mobile-games"
            @click="activeTab = tab.key"
          >
            {{ translate(tab.label) }}
          </button>
        </div>
      </div>

      <!-- 3 Column Grid with Square Thumbnails -->
      <div v-if="displayedGames.length" id="slots-mobile-games" class="slots-grid">
        <article
          v-for="game in displayedGames"
          :key="`mobile-${game.id || game.title}`"
          class="slots-game"
          :data-provider="providerName(game.provider)"
        >
          <NuxtLink
            :to="game.href || '/egames/slots/top'"
            class="slots-game-link"
            :aria-label="`${translate('Discover')} ${game.title} - ${providerName(game.provider)}`"
          >
            <div class="slots-game-art">
              <img
                :src="game.image"
                :alt="game.title"
                width="300"
                height="300"
                loading="lazy"
                decoding="async"
              >
              <span v-if="game.badge || game.title === 'Sweet Bonanza 1000' || game.hotPercent" class="slots-game-hot">
                {{ game.badge || translate('HOT') }}
              </span>
              <span class="slots-game-play" aria-hidden="true">
                <Play :size="20" fill="currentColor" />
              </span>
            </div>
            <div class="slots-game-caption">
              <h3>{{ game.title }}</h3>
            </div>
          </NuxtLink>
          <button
            type="button"
            class="slots-favorite"
            :class="{ 'is-saved': favorites.includes(game.title) }"
            :aria-pressed="favorites.includes(game.title)"
            :aria-label="`${game.title} - ${translate('Favorites')}`"
            @click="toggleFavorite(game.title)"
          >
            <Heart
              :size="15"
              :fill="favorites.includes(game.title) ? 'currentColor' : 'none'"
              aria-hidden="true"
            />
          </button>
        </article>
      </div>

      <div v-else class="slots-empty" role="status">
        {{ emptyMessage }}
      </div>

      <NuxtLink to="/egames/slots" class="slots-all-games flex w-full items-center justify-center">
        {{ translate('All Games') }}
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.homepage-slots-wrapper {
  width: 100%;
}

/* Responsive visibility: Desktop Carousel vs Mobile Grid */
.slots-desktop-carousel {
  display: block;
  width: 100%;
}
.slots-mobile-grid {
  display: flex;
  width: 100%;
}
.slots-mobile-grid.homepage-slots-section {
  --slots-muted: var(--secondary);
  --slots-edge: var(--border);
  color: var(--text);
}
.slots-mobile-grid .slots-tabs button:is([aria-pressed='true'], :hover) {
  color: var(--text);
}
.slots-mobile-grid .slots-game {
  overflow: hidden;
  border-radius: 10px;
  background: var(--surface);
}
.slots-mobile-grid .slots-game-caption {
  padding: 6px 4px;
}
.slots-mobile-grid .slots-game-caption h3 {
  display: block;
  overflow: hidden;
  color: var(--text);
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .slots-mobile-grid {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .slots-mobile-grid {
    margin-top: 10px;
  }
  .slots-desktop-carousel {
    display: none !important;
  }
}

.homepage-slots-section {
  --slots-muted: #a8b6bc;
  --slots-edge: #ffffff18;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #f4f7f5;
  width: 100%;
}
.slots-header {
  min-height: 48px;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--slots-edge);
}
.slots-heading {
  gap: 22px;
}
.slots-heading h2 {
  flex-shrink: 0;
  gap: 12px;
  font-size: var(--allgames-heading-size);
  font-weight: var(--homepage-display-weight);
  line-height: 1.2;
  letter-spacing: .01em;
}
.slots-heading > p {
  padding-left: 22px;
  border-left: 1px solid #ffffff26;
  color: var(--slots-muted);
  font-size: 14px;
  line-height: 22px;
}
.slots-actions {
  flex-shrink: 0;
  gap: 32px;
}
.slots-view-all {
  gap: 12px;
}
.slots-controls {
  gap: 10px;
}
.slots-controls button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--slots-edge, #ffffff18);
  border-radius: 5px;
  color: #fff;
  background: #00291d;
  transition: all 160ms ease;
}
.slots-controls button:hover:not(:disabled) {
  border-color: #25d6a480;
  background: #004532;
}
.slots-controls button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.slots-toolbar {
  min-width: 0;
  gap: 16px;
  min-height: 34px;
}
.slots-tabs {
  gap: 34px;
}
.slots-tabs button {
  position: relative;
  min-height: 34px;
  padding-bottom: 9px;
  color: var(--slots-muted);
  background: transparent;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
}
.slots-tabs button[aria-pressed='true'] {
  color: #f4f7f5;
  font-weight: 800;
}
.slots-tabs button[aria-pressed='true']::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #25d6a4;
}
.slots-tabs button:hover {
  color: #f4f7f5;
}
.slots-provider-pills {
  min-width: 0;
  max-width: 100%;
  gap: 8px;
  overflow-x: auto;
  padding: 2px;
  scrollbar-width: none;
}
.slots-provider-pills::-webkit-scrollbar {
  display: none;
}
.slots-provider-pills a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 52px;
  min-height: 34px;
  padding: 7px 18px;
  border: 1px solid #2b2b2b;
  border-radius: 999px;
  color: #aab7c5;
  background: #1a1a1a;
  font-size: 10px;
  font-weight: var(--homepage-body-weight);
  line-height: 1.4;
  white-space: nowrap;
}
.slots-provider-pills a:hover {
  border-color: #444;
  color: #e8efeb;
  background: #222;
}
.slots-provider-pills a.is-all {
  border-color: #087354;
  color: #e9fff6;
  background: #006c4b;
}
.slots-provider-pills a:focus-visible {
  outline-offset: -2px;
}

/* Desktop Carousel track sizing */
.slots-desktop-carousel :deep(.allgames-game-track) {
  --allgames-row-gap: 14px;
  grid-template-columns: none;
  grid-auto-columns: calc((100% - 5 * var(--allgames-row-gap)) / 6);
  padding: 0;
}
@media (max-width: 1023px) {
  .slots-desktop-carousel :deep(.allgames-game-track) {
    grid-auto-columns: calc((100% - 3 * var(--allgames-row-gap)) / 4);
  }
}
.slots-desktop-carousel :deep(.allgames-game-track:has(.slots-empty)) {
  grid-auto-columns: 100%;
}

/* Mobile Slots Grid: 3 columns */
.slots-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
}

.slots-game {
  position: relative;
  min-width: 0;
}
.slots-game-link {
  display: block;
}

/* Strictly Square Thumbnails */
.slots-game-art {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 8px;
  background: #10231a;
}
.slots-game-art > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: filter 180ms ease, transform 200ms ease;
}
.slots-game-link:is(:hover, :focus-visible) .slots-game-art > img {
  filter: blur(2px);
  transform: scale(1.03);
}
.slots-game-hot {
  position: absolute;
  top: 8px;
  left: 7px;
  padding: 3px 8px;
  border-radius: 4px;
  color: #fff;
  background: #ff3f51;
  font-size: 10px;
  font-weight: 800;
  line-height: 1.2;
}
.slots-game-caption {
  padding: 8px 2px 2px;
}
.slots-game-caption h3 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #f1f5f3;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
}
.slots-game-caption p {
  margin-top: 3px;
  color: var(--brand, #00ea76);
  font-size: 11px;
  line-height: 1.3;
}
.slots-game-play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #fff;
  opacity: 0;
  transition: opacity 180ms ease;
  pointer-events: none;
}
.slots-game-play > svg {
  box-sizing: content-box;
  padding: 14px;
  border-radius: 50%;
  background: var(--brand, #00ea76);
}
.slots-game-link:is(:hover, :focus-visible) .slots-game-play {
  opacity: 1;
}
.slots-favorite {
  position: absolute;
  top: 7px;
  right: 7px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid #ffffff26;
  border-radius: 5px;
  color: #fff;
  background: #06130ddd;
  opacity: 0;
  transition: opacity 180ms ease;
}
.slots-game:hover .slots-favorite,
.slots-game:focus-within .slots-favorite,
.slots-favorite.is-saved {
  opacity: 1;
}
.slots-favorite.is-saved {
  color: #62ddb0;
}
.slots-empty {
  display: grid;
  place-items: center;
  min-height: 180px;
  padding: 24px;
  border: 1px solid var(--slots-edge);
  border-radius: 7px;
  color: var(--slots-muted);
  font-size: 12px;
  text-align: center;
}

.slots-all-games {
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid var(--brand);
  border-radius: 8px;
  color: #fff;
  background: var(--brand);
  font-size: var(--homepage-mobile-control-font-size,12px);
  font-weight: 400;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}
.slots-all-games:is(:hover, :focus-visible) {
  border-color: var(--brand-hover);
  background: var(--brand-hover);
  color: #fff;
}

@media (max-width: 1023px) {
  .slots-heading {
    gap: 14px;
  }
  .slots-heading > p {
    max-width: 220px;
    padding-left: 14px;
    font-size: 11px;
  }
  .slots-actions {
    gap: 16px;
  }
  .slots-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
  .slots-provider-pills {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .slots-grid {
    gap: 10px;
  }
  .slots-header {
    align-items: flex-start;
    gap: 10px;
  }
  .slots-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
  .slots-heading > p {
    max-width: 210px;
    padding: 0;
    border: 0;
    font-size: 13px;
    line-height: 1.4;
  }
  .slots-actions {
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;
  }
  .slots-view-all {
    min-height: 24px;
    font-size: 12px;
  }
  .slots-tabs {
    gap: 20px;
  }
  .slots-tabs button,
  .slots-provider-pills a {
    font-size: 12px;
  }
  .slots-game-caption h3 {
    font-size: 12px;
  }
  .slots-game-caption p {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .slots-grid {
    gap: 8px;
  }
  .slots-game-caption h3 {
    font-size: 11px;
  }
  .slots-game-caption p {
    font-size: 9px;
  }
}

@media (max-width: 360px) {
  .slots-toolbar {
    gap: 6px;
  }
}

@media (pointer: coarse) {
  .slots-controls button {
    min-width: 44px;
    min-height: 44px;
  }
  .slots-tabs button,
  .slots-provider-pills a {
    min-height: 44px;
  }
  .slots-favorite {
    width: 36px;
    height: 36px;
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slots-game-art > img,
  .slots-game-play,
  .slots-favorite,
  .slots-all-games {
    transition: none;
  }
}
</style>
