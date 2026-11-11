<script setup lang="ts">
import { ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import HomepageContentSlider from '~/components/HomepageContentSlider.vue'
import HomepageSportsCard from '~/components/HomepageSportsCard.vue'
import { getTournamentLogo } from '~/data/sports'
import type { SportsEvent } from '~/types/sports'

const props = defineProps<{ fixtures: SportsEvent[] }>()
const { translate } = useSiteLocale()
const filters = [
  { key: 'all', label: 'All Sports' },
  { key: 'soccer', label: 'Football' },
  { key: 'basketball', label: 'Basketball' },
] as const
const activeSport = ref<(typeof filters)[number]['key']>('all')
const filterOpen = ref(false)
const filterAbove = ref(false)
const filterRoot = ref<HTMLElement | null>(null)
const filterTrigger = ref<HTMLButtonElement | null>(null)
const filterList = ref<HTMLElement | null>(null)
const focusedFilter = ref(0)

async function openFilter() {
  const bounds = filterTrigger.value?.getBoundingClientRect()
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  filterAbove.value = Boolean(bounds && viewportHeight - bounds.bottom < 196 && bounds.top > viewportHeight - bounds.bottom)
  filterOpen.value = true
  focusedFilter.value = filters.findIndex(filter => filter.key === activeSport.value)
  await nextTick()
  focusFilter(focusedFilter.value)
}

function focusFilter(index: number) {
  focusedFilter.value = (index + filters.length) % filters.length
  filterList.value?.querySelectorAll<HTMLButtonElement>('[role="option"]')[focusedFilter.value]?.focus({ preventScroll: true })
}

function closeFilter(restoreFocus = false) {
  filterOpen.value = false
  if (restoreFocus) filterTrigger.value?.focus({ preventScroll: true })
}

function selectFilter(key: (typeof filters)[number]['key']) {
  activeSport.value = key
  closeFilter(true)
}

function handleFilterKey(event: KeyboardEvent) {
  if (event.key === 'Tab') {
    closeFilter()
    return
  }
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    closeFilter(true)
    return
  }
  const index = event.key === 'ArrowDown' ? focusedFilter.value + 1
    : event.key === 'ArrowUp' ? focusedFilter.value - 1
      : event.key === 'Home' ? 0
        : event.key === 'End' ? filters.length - 1
          : event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== ' '
            ? filters.findIndex(filter => translate(filter.label).toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()))
            : -1
  if (index !== -1 || event.key === 'ArrowUp') {
    event.preventDefault()
    focusFilter(index)
  }
}

function handleFilterOutside(event: PointerEvent) {
  if (event.target instanceof Node && !filterRoot.value?.contains(event.target)) closeFilter()
}

function handleFilterFocusOut(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !filterRoot.value?.contains(event.relatedTarget)) closeFilter()
}

onMounted(() => document.addEventListener('pointerdown', handleFilterOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', handleFilterOutside))

function matchesSportFilter(fixture: SportsEvent, filterKey: string): boolean {
  if (filterKey === 'all') return true
  const rawSport = (fixture.sport || fixture.sport_key?.split('_')[0] || '').toLowerCase()
  if (filterKey === 'soccer') {
    return rawSport === 'soccer' || rawSport === 'football'
  }
  return rawSport === filterKey
}

const availableFixtures = computed(() => props.fixtures.filter(fixture => fixture.home_team && fixture.away_team))
const fixtureCount = (sport: string) => availableFixtures.value.filter(fixture => matchesSportFilter(fixture, sport)).length
const sportLabel = computed(() => filters.find(filter => filter.key === activeSport.value)?.label || 'All Sports')
const matches = computed(() => availableFixtures.value.filter(fixture => matchesSportFilter(fixture, activeSport.value)))
const currentFixture = (position: number) => matches.value[position - 1] || matches.value[0]
const currentSport = (position: number) => {
  const fixture = currentFixture(position)
  if (!fixture) return 'Sports'
  const rawSport = (fixture.sport || fixture.sport_key?.split('_')[0] || '').toLowerCase()
  if (rawSport === 'soccer' || rawSport === 'football') return 'Football'
  if (rawSport === 'basketball') return 'Basketball'
  if (rawSport === 'baseball') return 'Baseball'
  if (rawSport === 'tennis') return 'Tennis'
  return 'Sports'
}
const viewAllTarget = computed(() => {
  if (activeSport.value === 'all') return '/sports/live'
  return `/sports/${activeSport.value}/inplay`
})
</script>

<template>
  <HomepageContentSlider
    id="sports"
    class="homepage-sports-section"
    :class="`homepage-sports-section--${activeSport}`"
    :title="translate('Sports')"
    :description="translate('Big games. Your front-row seat.')"
    :view-all-to="viewAllTarget"
    :view-all-label="translate('Explore sports')"
    :item-count="matches.length"
    :visible-cards="3"
    :items-per-slide="1"
    :reset-key="`${activeSport}:${matches.length}`"
  >
    <template #header="{ firstVisible, atStart, atEnd, move }">
      <header class="sports-header flex items-center justify-between">
        <div class="sports-heading flex items-center min-w-0">
          <h2 id="sports-title" class="flex items-center"><img src="/icons/sports/popular.webp" class="allgames-heading-symbol allgames-heading-image" alt="" width="28" height="28">{{ translate('Sports') }}</h2>
          <p>{{ translate('Big games. Your front-row seat.') }}</p>
        </div>
        <NuxtLink :to="viewAllTarget" class="sports-explore inline-flex items-center">{{ translate('Explore sports') }} <ArrowUpRight :size="18" aria-hidden="true" /></NuxtLink>
      </header>

      <aside class="sports-browse">
        <span id="sports-browse-label" class="sports-browse-label">{{ translate('BROWSE SPORTS') }}</span>
        <div ref="filterRoot" class="sports-filter relative w-full" :class="{ 'sports-filter--open': filterOpen }" :data-sport="activeSport" @focusout="handleFilterFocusOut">
          <button
            id="homepage-sport-filter"
            ref="filterTrigger"
            type="button"
            class="sports-filter-value flex w-full items-center text-left"
            aria-haspopup="listbox"
            :aria-expanded="filterOpen"
            aria-controls="homepage-sport-options"
            aria-labelledby="sports-browse-label sports-filter-value sports-filter-count"
            @click="filterOpen ? closeFilter() : openFilter()"
            @keydown.down.prevent="openFilter"
            @keydown.up.prevent="openFilter"
            @keydown.esc.stop="closeFilter(true)"
          >
            <img :src="`/images/sports/sidebar/${activeSport}.webp`" class="sports-filter-icon" alt="" width="24" height="24">
            <span id="sports-filter-value" class="sports-filter-name min-w-0 flex-1">{{ translate(sportLabel) }}</span>
            <span id="sports-filter-count" class="sports-filter-count">{{ fixtureCount(activeSport) }}</span>
            <ChevronDown class="sports-filter-chevron shrink-0" :size="16" aria-hidden="true" />
          </button>
          <div v-if="filterOpen" id="homepage-sport-options" ref="filterList" class="sports-filter-menu absolute inset-x-0" :class="{ 'sports-filter-menu--above': filterAbove }" role="listbox" aria-labelledby="sports-browse-label" @keydown="handleFilterKey">
            <button
              v-for="(filter, index) in filters"
              :key="filter.key"
              type="button"
              role="option"
              class="sports-filter-option flex w-full items-center text-left"
              :aria-selected="activeSport === filter.key"
              :tabindex="focusedFilter === index ? 0 : -1"
              aria-controls="sports-track"
              @focus="focusedFilter = index"
              @click="selectFilter(filter.key)"
            >
              <span class="sports-filter-option-icon flex shrink-0 items-center justify-center"><img :src="`/images/sports/sidebar/${filter.key}.webp`" class="sports-filter-icon" alt="" width="24" height="24"></span>
              <span class="min-w-0 flex-1">{{ translate(filter.label) }}</span>
              <span class="sports-filter-count">{{ fixtureCount(filter.key) }}</span>
              <Check class="sports-filter-check shrink-0" :class="{ invisible: activeSport !== filter.key }" :size="16" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div v-if="currentFixture(firstVisible)" class="sports-browse-league flex items-center" :class="{ 'sports-browse-league--nba': currentFixture(firstVisible)!.sport_key.includes('_nba') }">
          <img :src="getTournamentLogo(currentFixture(firstVisible)!.sport_key)" :alt="currentFixture(firstVisible)!.sport_title" width="30" height="42" loading="lazy">
          <div class="min-w-0"><strong>{{ currentFixture(firstVisible)!.sport_title }}</strong><span>{{ translate(currentSport(firstVisible)) }}</span></div>
        </div>
      </aside>

      <div class="sports-toolbar flex items-center justify-between">
        <h3 class="sports-fixtures-title flex items-center"><strong>{{ currentFixture(firstVisible)?.sport_title || translate(sportLabel) }}</strong><span aria-hidden="true">·</span><span>{{ translate('In-Play') }}</span></h3>
        <div class="sports-tools flex items-center">
          <div class="sports-controls flex items-center" :aria-label="translate('Sports slider controls')">
            <button type="button" :disabled="atStart" :aria-label="translate('Previous Sports items')" aria-controls="sports-track" @click="move(-1)"><ChevronLeft :size="17" aria-hidden="true" /></button>
            <button type="button" :disabled="atEnd" :aria-label="translate('Next Sports items')" aria-controls="sports-track" @click="move(1)"><ChevronRight :size="17" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </template>

    <template #default="{ firstVisible }">
      <HomepageSportsCard v-for="(fixture, index) in matches" :key="fixture.id" :fixture="fixture" :highlighted="index === firstVisible - 1" />
      <div v-if="!matches.length" class="sports-empty" role="status">{{ translate('No in-play fixtures are available right now.') }}</div>
    </template>

    <template #footer="{ firstVisible }">
      <div class="sports-slider-footer">
        <div class="sports-slider-status flex items-center justify-end">
          <span class="sports-progress" aria-hidden="true"><span :style="{ width: matches.length ? `${firstVisible / matches.length * 100}%` : '0%' }" /></span>
          <span class="sports-position" aria-live="polite" aria-atomic="true"><span class="sr-only">{{ translate('Fixture ') }}</span>{{ String(matches.length ? firstVisible : 0).padStart(2, '0') }}<span aria-hidden="true"> / </span><span class="sr-only">{{ translate(' of ') }}</span>{{ String(matches.length).padStart(2, '0') }}</span>
        </div>
        <NuxtLink :to="viewAllTarget" class="sports-explore-mobile w-full items-center justify-center">{{ translate('Explore sports') }}</NuxtLink>
      </div>
    </template>
  </HomepageContentSlider>
</template>

<style scoped>
.homepage-sports-section { --sports-accent: #25d6a4; --sports-button: #00ac56; --sports-edge: #ffffff12; --sports-muted: #a9bdb4; --sports-surface: #091813; display: grid; grid-template-columns: minmax(0,1fr); row-gap: 10px; padding-bottom: 4px; color: #f4f7f5; }
.sports-header { grid-column: 1 / -1; gap: 20px; min-height: 48px; margin-bottom: 8px; padding-bottom: 16px; border-bottom: 1px solid var(--sports-edge); }
.sports-heading { gap: 18px; }
.sports-heading h2 { flex-shrink: 0; gap: 10px; font-size: var(--allgames-heading-size); font-weight: var(--homepage-display-weight); line-height: 1.2; letter-spacing: .01em; }
.sports-heading p { padding-left: 18px; border-left: 1px solid #ffffff18; color: var(--sports-muted); font-size: 14px; line-height: 24px; }
.homepage-sports-section .sports-explore { flex-shrink: 0; gap: 8px; min-height: 44px; padding: 0 12px; border: 1px solid #ffffff18; border-radius: 7px; color: #F9C600; background: #ffffff05; font-size: 13px; font-weight: 700; white-space: nowrap; }
.sports-explore svg { color: #F9C600; }
.homepage-sports-section .sports-explore:hover { border-color: #ffffff30; background: #0c2a1d; }
.sports-browse { grid-column: 1; grid-row: 2; display: grid; grid-template-columns: minmax(0, 280px) minmax(0, 1fr); align-items: center; gap: 8px 24px; min-width: 0; padding-bottom: 4px; }
.sports-browse-label { grid-column: 1; display: block; color: #91aaa0; font-size: 10px; font-weight: 700; line-height: 1.4; letter-spacing: .08em; overflow-wrap: break-word; }
.sports-filter { --sports-filter-accent: var(--sports-accent); --sports-filter-border: #25865c; --sports-filter-background: #0b2a1e; grid-column: 1; grid-row: 2; color: #e1e9e4; }
.sports-filter--open { z-index: 30; }
.sports-filter-value { min-height: 50px; gap: 10px; padding: 11px 14px; border: 1px solid var(--sports-filter-border); border-radius: 8px; background: var(--sports-filter-background); font-size: 14px; font-weight: 700; line-height: 1.4; }
.sports-filter-value:hover,.sports-filter--open .sports-filter-value { border-color: var(--sports-filter-accent); }
.homepage-sports-section .sports-filter-value:focus-visible { outline: 2px solid var(--sports-filter-accent); outline-offset: 3px; }
.sports-filter-name { overflow-wrap: anywhere; }
.sports-filter-chevron { margin-left: 2px; color: var(--sports-filter-accent); transition: transform 160ms ease; }
.sports-filter--open .sports-filter-chevron { transform: rotate(180deg); }
.sports-filter-menu { top: calc(100% + 8px); z-index: 30; max-height: min(256px, 50dvh); overflow-y: auto; overscroll-behavior: contain; padding: 6px; border: 1px solid #345347; border-radius: 10px; background: #0c1c16; box-shadow: 0 14px 36px #0009, 0 2px 6px #0005; }
.sports-filter-menu--above { top: auto; bottom: calc(100% + 8px); }
.sports-filter-option { min-height: 52px; gap: 10px; padding: 8px 10px; border: 1px solid transparent; border-radius: 6px; color: #dce8e1; font-size: 14px; font-weight: 600; line-height: 1.4; }
.sports-filter-option + .sports-filter-option { margin-top: 3px; }
.sports-filter-option:hover { background: #ffffff08; }
.sports-filter-option[aria-selected='true'] { border-color: #25d6a433; color: #f2fff8; background: #143d2c; }
.homepage-sports-section .sports-filter-option:focus-visible { outline: 2px solid var(--sports-accent); outline-offset: -2px; background: #18382a; }
.sports-filter-option-icon { width: 32px; height: 32px; border-radius: 6px; background: #ffffff05; }
.sports-filter-check { color: var(--sports-accent); }
.sports-filter-icon { flex-shrink: 0; width: 24px; height: 24px; object-fit: contain; }
.sports-filter-count { flex-shrink: 0; min-width: 24px; padding: 3px 6px; border-radius: 5px; color: #76e4b4; background: #164332; font-size: 12px; font-weight: 800; line-height: 18px; text-align: center; font-variant-numeric: tabular-nums; }
.sports-filter[data-sport='basketball'] { --sports-filter-accent: #ff7875; --sports-filter-border: #c55454; --sports-filter-background: #36191c; }
.sports-filter[data-sport='basketball'] .sports-filter-value .sports-filter-count { color: #ffa39e; background: #5a262b; }
.homepage-sports-section--basketball .sports-progress > span { background: #ff5252; }
.sports-browse-league { grid-column: 2; grid-row: 2; gap: 12px; min-width: 0; }
.sports-browse-league img { width: 26px; height: 40px; flex-shrink: 0; object-fit: contain; }
.sports-browse-league--nba img { width: 22px; height: 42px; object-fit: cover; }
.sports-browse-league strong { display: block; font-size: 14px; font-weight: 800; line-height: 1.3; overflow-wrap: anywhere; }
.sports-browse-league div > span { display: block; margin-top: 2px; color: var(--sports-muted); font-size: 12px; }
.sports-toolbar { grid-column: 1; grid-row: 3; gap: 12px; min-width: 0; min-height: 28px; }
.sports-fixtures-title { min-width: 0; gap: 10px; color: #e7efe9; font-size: 14px; line-height: 1.3; }
.sports-fixtures-title strong { overflow: hidden; max-width: 180px; font-size: 16px; font-weight: 800; white-space: nowrap; text-overflow: ellipsis; }
.sports-fixtures-title > span:first-of-type { color: #8ca89a; }
.sports-fixtures-title > span:last-child { white-space: nowrap; }
.sports-tools { flex-shrink: 0; gap: 14px; }
.sports-date-filter { position: relative; }
.sports-date-filter select { width: 104px; min-height: 30px; padding: 5px 29px 5px 12px; appearance: none; border: 1px solid #ffffff20; border-radius: 5px; color: #e1eae5; background: #0a1914; font-size: 10px; font-weight: 700; cursor: pointer; }
.sports-date-filter > svg { position: absolute; top: 50%; right: 10px; color: #c2d5cb; pointer-events: none; transform: translateY(-50%); }
.sports-controls { gap: 6px; }
.sports-controls button { display: grid; place-items: center; width: 29px; height: 29px; border: 1px solid #ffffff18; border-radius: 5px; color: #d1e5d9; background: transparent; }
.sports-controls button:hover:enabled { border-color: #ffffff30; background: #0b2a1b; }
.sports-controls button:disabled { opacity: .35; cursor: default; }
.homepage-sports-section :deep(.allgames-game-track) { --allgames-row-gap: 12px; grid-column: 1; grid-row: 4; grid-auto-columns: calc((100% - 2 * var(--allgames-row-gap)) / 3); padding: 0; }
.homepage-sports-section :deep(.allgames-game-track:has(.sports-empty)) { grid-auto-columns: 100%; }
.sports-empty { display: grid; place-items: center; min-height: 260px; padding: 20px; border: 1px solid var(--sports-edge); border-radius: 7px; color: var(--sports-muted); background: var(--sports-surface); font-size: 12px; text-align: center; }
.sports-slider-footer { grid-column: 1; grid-row: 5; min-height: 24px; }
.sports-slider-status { min-height: 24px; gap: 16px; }
.sports-explore-mobile { display: none; min-height: 44px; padding: 8px 16px; border: 1px solid var(--brand); border-radius: 8px; color: #fff; background: var(--brand); font-size: var(--homepage-mobile-control-font-size,12px); font-weight: 400; transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease; }
.sports-explore-mobile:is(:hover,:focus-visible) { border-color: var(--brand-hover); background: var(--brand-hover); color: #fff; }
.sports-progress { display: block; width: 122px; height: 3px; overflow: hidden; border-radius: 2px; background: #1e3c30; }
.sports-progress > span { display: block; height: 100%; border-radius: inherit; background: #009440; transition: width 180ms ease; }
.sports-position { color: #b2c7bc; font-size: 10px; font-variant-numeric: tabular-nums; white-space: pre; }
@media (max-width: 1199px) {
  .homepage-sports-section :deep(.allgames-game-track) { grid-auto-columns: calc((100% - var(--allgames-row-gap)) / 2); }
  .sports-fixtures-title { gap: 8px; font-size: 12px; }
  .sports-fixtures-title strong { max-width: 130px; font-size: 14px; }
  .sports-tools { gap: 8px; }
}
@media (max-width: 850px) {
  .sports-header { grid-row: 1; }
  .sports-browse { grid-template-columns: minmax(0,1fr); }
  .sports-browse-league { display: none; }
  .sports-filter-value { gap: 10px; padding-inline: 14px; }
}
@media (max-width: 767px) {
  .sports-header { display: grid; grid-template-columns: minmax(0,1fr); align-items: center; gap: 8px; margin-bottom: 4px; padding-bottom: 16px; }
  .sports-heading { display: contents; }
  .sports-heading h2 { grid-column: 1; grid-row: 1; min-width: 0; gap: 8px; font-size: 26px; }
  .sports-heading h2 img { width: 24px; height: 24px; }
  .sports-heading p { grid-column: 1 / -1; grid-row: 2; min-width: 0; padding: 0; border: 0; font-size: 13px; line-height: 1.6; text-wrap: pretty; }
  .homepage-sports-section .sports-explore { display: none; }
  .sports-slider-footer { display: flex; flex-direction: column; gap: 12px; }
  .sports-explore-mobile { display: flex; }
}
@media (max-width: 359px) {
  .sports-header { gap: 8px; }
  .sports-heading h2 { gap: 6px; font-size: 24px; }
  .sports-filter-option { gap: 8px; }
}
@media (max-width: 600px) {
  .sports-fixtures-title { gap: 6px; font-size: 14px; }
  .sports-fixtures-title strong { max-width: 115px; font-size: 15px; }
  .sports-fixtures-title > span { display: none; }
  .sports-date-filter select { width: 90px; padding-left: 9px; }
  .sports-tools { gap: 7px; }
  .sports-controls button { width: 30px; height: 30px; }
  .homepage-sports-section :deep(.allgames-game-track) { grid-auto-columns: 88%; }
}
@media (pointer: coarse) {
  .sports-controls button,.sports-date-filter select,.sports-explore { min-height: 44px; }
  .sports-controls button { min-width: 44px; }
}
@media (prefers-reduced-motion: reduce) { .sports-progress > span,.sports-filter-chevron,.sports-explore-mobile { transition: none; } }
</style>
