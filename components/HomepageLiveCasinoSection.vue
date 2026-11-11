<script setup lang="ts">
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import HomepageContentSlider from '~/components/HomepageContentSlider.vue'
import type { HomepageCasinoCategory } from '~/data/homepage-casino'

const props = defineProps<{ categories: HomepageCasinoCategory[] }>()
const { translate } = useSiteLocale()
const quickCategories = computed(() => props.categories.slice(0, 6))
const titleIcon = '/icons/entertainment/live-casino.webp'
const categoryIcons: Record<string, string> = {
  baccarat: '/icons/casino-play/baccarat.webp',
  roulette: '/icons/casino-play/roulette.webp',
  poker: '/icons/casino-play/blackjack.webp',
  'game-show': '/icons/casino-play/game-shows.webp',
  'dragon-tiger': '/icons/casino-play/dragon-tiger-v2.webp',
  sicbo: '/icons/casino-play/sic-bo-v2.webp',
}
const descriptions: Record<string, string> = {
  roulette: 'A classic experience, live and exclusive.',
  poker: 'Timeless poker, live at 2Bet.',
}
function categoryIcon(key: string) {
  return categoryIcons[key] || categoryIcons.baccarat
}
</script>

<template>
  <HomepageContentSlider
    id="live-casino"
    class="homepage-live-casino-section live-casino-desktop"
    :title="translate('Live Casino')"
    :description="translate('Real dealers. Real games. Real excitement.')"
    view-all-to="/entertainment/live-casino"
    :view-all-label="translate('View all live casino')"
    :item-count="categories.length"
    :visible-cards="4"
    :items-per-slide="1"
  >
    <template #header="{ atStart, atEnd, move }">
      <header class="live-section-header flex items-center justify-between">
        <div class="live-heading flex items-center min-w-0"><h2 id="live-casino-title"><img :src="titleIcon" class="allgames-heading-symbol allgames-heading-image" :alt="translate('Live Casino')" width="28" height="28" loading="lazy" decoding="async">{{ translate('Live Casino') }}</h2><p>{{ translate('Real dealers. Real games. Real excitement.') }}</p></div>
        <div class="live-header-actions flex items-center">
          <NuxtLink to="/entertainment/live-casino" class="live-view-all">{{ translate('View all live casino') }} <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
          <div class="live-carousel-controls flex items-center" :aria-label="translate('Live Casino slider controls')">
            <button type="button" :disabled="atStart" :aria-label="translate('Previous Live Casino items')" aria-controls="live-casino-track" @click="move(-1)"><ChevronLeft :size="17" aria-hidden="true" /></button>
            <button type="button" :disabled="atEnd" :aria-label="translate('Next Live Casino items')" aria-controls="live-casino-track" @click="move(1)"><ChevronRight :size="17" aria-hidden="true" /></button>
          </div>
        </div>
      </header>
      <nav class="live-table-directory" aria-labelledby="live-table-directory-title">
        <h3 id="live-table-directory-title">{{ translate('Find your table') }}</h3>
        <div class="live-table-links">
          <NuxtLink v-for="game in quickCategories" :key="game.key" :to="`/entertainment/live-casino/${game.category}`">
            <img :src="categoryIcon(game.key)" class="live-sidebar-icon" :alt="translate(game.key === 'sicbo' ? 'Sic Bo' : game.title)" width="28" height="28" decoding="async">
            <span>{{ translate(game.key === 'sicbo' ? 'Sic Bo' : game.title) }}</span>
          </NuxtLink>
        </div>
      </nav>
    </template>
    <NuxtLink
      v-for="game in categories"
      :key="game.key"
      :to="`/entertainment/live-casino/${game.category}`"
      class="live-dealer-card"
      :data-category="game.category"
      :aria-label="translate(game.title)"
      :title="translate(game.title)"
    >
      <div class="live-dealer-art">
        <img :src="game.image" :alt="translate(game.title)" width="1086" height="1448" loading="lazy" decoding="async">
        <span class="allgames-card-live-badge"><i /> {{ translate('LIVE') }}</span>
      </div>
      <div class="live-dealer-caption">
        <div><h3>{{ translate(game.title) }}</h3><p>{{ translate(descriptions[game.key] || game.description) }}</p></div>
        <span class="live-dealer-arrow" aria-hidden="true"><ArrowRight :size="16" /></span>
      </div>
    </NuxtLink>
  </HomepageContentSlider>

  <section id="live-casino-mobile" class="live-casino-mobile allgames-section" aria-labelledby="live-casino-mobile-title">
    <header class="live-mobile-header">
      <h2 id="live-casino-mobile-title" class="flex items-center">
        <img :src="titleIcon" class="allgames-heading-symbol allgames-heading-image" :alt="translate('Live Casino')" width="28" height="28" loading="lazy" decoding="async">
        {{ translate('Live Casino') }}
      </h2>
      <p>{{ translate('Real dealers. Real games. Real excitement.') }}</p>
    </header>
    <div class="live-mobile-grid grid grid-cols-3">
      <NuxtLink
        v-for="game in categories.slice(0, 24)"
        :key="game.key"
        :to="`/entertainment/live-casino/${game.category}`"
        class="live-mobile-card"
        :aria-label="translate(game.title)"
        :title="translate(game.title)"
      >
        <div class="live-mobile-art">
          <img :src="game.image" :alt="translate(game.title)" width="300" height="300" loading="lazy" decoding="async">
        </div>
        <h3>{{ translate(game.title) }}</h3>
      </NuxtLink>
    </div>
    <NuxtLink to="/entertainment/live-casino" class="live-all-games flex w-full items-center justify-center">
      {{ translate('All Games') }}
    </NuxtLink>
  </section>
</template>

<style scoped>
.live-casino-mobile { display: none; }
.homepage-live-casino-section { display: grid; grid-template-columns: 188px minmax(0,1fr); gap: 14px 20px; }
.live-section-header { grid-column: 1 / -1; grid-row: 1; min-height: 48px; gap: 20px; padding-bottom: 16px; border-bottom: 1px solid #ffffff18; }
.live-heading { gap: 22px; }
.live-heading h2 { display: flex; align-items: center; flex-shrink: 0; gap: 12px; font-size: var(--allgames-heading-size); font-weight: var(--homepage-display-weight); line-height: 1.2; letter-spacing: .01em; }
.live-heading > p { padding-left: 22px; border-left: 1px solid #ffffff26; color: #a8b6bc; font-size: 14px; line-height: 22px; }
.live-header-actions { flex-shrink: 0; gap: 32px; }
.live-section-header .live-view-all { display: inline-flex; align-items: center; gap: 12px; min-height: 32px; color: #F9C600; font-size: 14px; font-weight: 600; }
.live-view-all:hover { text-decoration: underline; text-underline-offset: 4px; }
.live-carousel-controls { gap: 12px; }
.live-carousel-controls button { display: grid; place-items: center; width: 34px; height: 30px; border: 1px solid #ffffff26; border-radius: 6px; color: #d6e1dc; background: transparent; }
.live-carousel-controls button:disabled { opacity: .35; cursor: default; }
.live-carousel-controls button:hover:enabled { border-color: #ffffff4a; background: #14241c; }
.homepage-live-casino-section :deep(.allgames-game-track) { --allgames-row-gap: 16px; grid-column: 2; grid-row: 2; grid-auto-columns: calc((100% - 3 * var(--allgames-row-gap)) / 4); padding: 0; }
.live-dealer-card { position: relative; display: flex; flex-direction: column; width: 100%; min-width: 0; min-height: 400px; aspect-ratio: 5 / 4; overflow: hidden; border: 1px solid #23584457; border-radius: 8px; background: #061b13; transition: border-color .2s; }
.live-dealer-art { position: relative; flex: 1; min-height: 0; overflow: hidden; }
.live-dealer-art>img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; transition: filter .2s; }
.live-dealer-card:is(:hover,:focus-visible) { border-color: #4d9b78; }
.live-dealer-card:is(:hover,:focus-visible) .live-dealer-art>img { filter: blur(3px); }
.live-dealer-caption { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; min-height: 62px; gap: 10px; padding: 9px 12px; border-top: 1px solid #23613f80; background: #061b13; }
.live-dealer-caption>div { min-width: 0; }
.live-dealer-caption h3 { color: #f3f9f5; font-size: clamp(14px,1.35cqw,19px); font-weight: 800; line-height: 1.2; letter-spacing: -.3px; }
.live-dealer-caption p { overflow: hidden; margin-top: 4px; color: #a8c0b3; font-size: clamp(9px,.85cqw,12px); line-height: 1.4; white-space: nowrap; text-overflow: ellipsis; }
.live-dealer-arrow { display: grid; place-items: center; flex-shrink: 0; width: 30px; height: 30px; border: 1px solid #267d5f; border-radius: 50%; color: #68d5ae; background: #09271b; transition: background .2s; }
.live-dealer-card:is(:hover,:focus-visible) .live-dealer-arrow { background: #15452d; }
.live-dealer-card:focus-visible { outline-offset: -3px; }
.live-dealer-card .allgames-card-live-badge { top: 12px; left: 12px; border: 0; padding: 5px 7px; }
.live-table-directory { grid-column: 1; grid-row: 2; display: flex; flex-direction: column; min-width: 0; padding: 14px 7px; border: 1px solid #ffffff0e; border-radius: 7px; background: radial-gradient(ellipse at 12% 65%, #4fbd8b15, transparent 65%), linear-gradient(115deg, #162b20, #102119); }
.live-table-directory h3 { margin: 0 7px 8px; color: #91aaa0; font-size: 10px; font-weight: 600; line-height: 1.3; text-transform: uppercase; }
.live-table-links { display: grid; flex: 1; grid-template-rows: repeat(6,minmax(38px,1fr)); gap: 4px; }
.live-table-links>a { display: flex; align-items: center; min-width: 0; min-height: 38px; gap: 10px; padding: 4px 9px; border: 1px solid transparent; border-radius: 6px; color: #e1e9e4; font-size: 14px; font-weight: 700; line-height: 1.3; transition: background .2s,color .2s,border-color .2s; }
.live-table-links>a>span { flex: 1; min-width: 0; }
.live-sidebar-icon { flex-shrink: 0; width: 28px; height: 28px; object-fit: contain; }
.live-table-links>a:is(:hover,:focus-visible) { border-color: #25d6a426; color: #009440; background: #063523; }
@media (max-width:1199px) {
  .homepage-live-casino-section { grid-template-columns: 172px minmax(0,1fr); column-gap: 16px; }
  .homepage-live-casino-section :deep(.allgames-game-track) { grid-auto-columns: calc((100% - var(--allgames-row-gap)) / 2); }
}
@media (max-width:1023px) {
  .live-heading { gap: 14px; }
  .live-heading > p { max-width: 220px; padding-left: 14px; font-size: 10px; }
  .live-header-actions { gap: 16px; }
}
@media (max-width:850px) {
  .homepage-live-casino-section { grid-template-columns: minmax(0,1fr); }
  .live-table-directory { grid-column: 1; grid-row: 2; padding: 0; border: 0; border-radius: 0; background: transparent; }
  .live-table-directory h3 { display: none; }
  .live-table-links { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; }
  .live-table-links>a { flex: 0 0 auto; min-height: 44px; white-space: nowrap; }
  .homepage-live-casino-section :deep(.allgames-game-track) { grid-column: 1; grid-row: 3; }
}
@media (max-width:700px) {
  .homepage-live-casino-section :deep(.allgames-game-track) { --allgames-row-gap: 12px; grid-auto-columns: calc((100% - .15 * var(--allgames-row-gap)) / 1.15); }
  .live-section-header { align-items: flex-start; gap: 10px; }
  .live-heading { align-items: flex-start; flex-direction: column; gap: 6px; }
  .live-heading > p { max-width: 210px; padding: 0; border: 0; font-size: 13px; line-height: 1.4; }
  .live-header-actions { align-items: flex-end; flex-direction: column; gap: 5px; }
  .live-section-header .live-view-all { min-height: 24px; font-size: 12px; }
  .live-carousel-controls { gap: 6px; }
  .live-dealer-caption { min-height: 58px; padding: 9px 10px; }
  .live-dealer-caption h3 { font-size: 16px; }
  .live-dealer-caption p { font-size: 12px; }
}
@media (max-width:767px) {
  .live-casino-desktop { display: none; }
  .live-casino-mobile { display: flex; flex-direction: column; gap: 16px; color: var(--text); }
  .live-mobile-header { padding-bottom: 16px; border-bottom: 1px solid var(--border); }
  .live-mobile-header h2 { gap: 12px; font-size: var(--allgames-heading-size); font-weight: var(--homepage-display-weight); line-height: 1.2; }
  .live-mobile-header p { max-width: 210px; margin-top: 6px; color: var(--secondary); font-size: 13px; line-height: 1.4; }
  .live-mobile-grid { gap: 12px; }
  .live-mobile-card { min-width: 0; overflow: hidden; border-radius: 10px; background: var(--surface); }
  .live-mobile-art { overflow: hidden; aspect-ratio: 1; border-radius: 8px; background: #10231a; }
  .live-mobile-art img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; }
  .live-mobile-card h3 { overflow: hidden; padding: 6px 4px; color: var(--text); font-size: 13px; font-weight: 500; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
  .live-all-games { min-height: 44px; padding: 8px 16px; border: 1px solid var(--brand); border-radius: 8px; color: #fff; background: var(--brand); font-size: var(--homepage-mobile-control-font-size,12px); font-weight: 400; transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease; }
  .live-all-games:is(:hover,:focus-visible) { border-color: var(--brand-hover); color: #fff; background: var(--brand-hover); }
}
@media (max-width:700px) {
  .live-mobile-grid { gap: 10px; }
  .live-mobile-card h3 { font-size: 12px; }
}
@media (max-width:480px) {
  .live-mobile-grid { gap: 8px; }
  .live-mobile-card h3 { font-size: 11px; }
}
@media (pointer:coarse) { .live-carousel-controls button { min-width: 44px; min-height: 44px; } }
@media (prefers-reduced-motion:reduce) { .live-dealer-card,.live-dealer-art>img,.live-dealer-arrow,.live-table-links>a,.live-all-games { transition: none; } }
</style>
