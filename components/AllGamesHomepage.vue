<script setup lang="ts">
import { ArrowRight, ChevronLeft, ChevronRight, Gift, Headphones, Play, ShieldCheck, X } from 'lucide-vue-next'
import HomepageContentSlider from '~/components/HomepageContentSlider.vue'
import HomepageHero from '~/components/HomepageHero.vue'
import HomepageSportsSection from '~/components/HomepageSportsSection.vue'
import HomepageSlotsSection from '~/components/HomepageSlotsSection.vue'
import HomepageJackpotSection from '~/components/HomepageJackpotSection.vue'
import HomepageProvidersSection from '~/components/HomepageProvidersSection.vue'
import HomepageLiveCasinoSection from '~/components/HomepageLiveCasinoSection.vue'
import HomepageGettingStarted from '~/components/HomepageGettingStarted.vue'
import { popularGames, recommendedGames, faqItems, type FaqItem } from '~/data/homepage'
import { LIVE_CASINO_CATEGORIES } from '~/data/live-casino'
import { HOMEPAGE_CASINO_CATEGORIES } from '~/data/homepage-casino'
import { TOP_BINGO_GAMES } from '~/data/top-bingo-games'
import { SAMPLE_MATCH_EVENTS } from '~/data/sports'
import { HOMEPAGE_PROMOTIONS } from '~/data/homepage-promotions'
import type { SportsEvent } from '~/types/sports'

const props = withDefaults(defineProps<{
  faqs?: FaqItem[]
}>(), {
  faqs: () => faqItems,
})

const mobileMenu = ref(false)
const railCollapsed = ref(true)
const selectedCategory = ref('sports')
const homepageMain = ref<HTMLElement | null>(null)
const { toastMessage, showDemoMessage, clearDemoMessage } = useDemoInteraction()
const { translate } = useSiteLocale()
const categories = [
  { id: 'sports', label: 'Sports', to: '/explore/sports/popular/league', image: '/hero/thumbnails/sports.webp' },
  { id: 'slots', label: 'Slots', to: '/explore/egames/slots', image: '/hero/thumbnails/slots.webp' },
  { id: 'live-casino', label: 'Live Casino', to: '/explore/entertainment/live-casino/baccarat', image: '/hero/thumbnails/live-casino.webp' },
  { id: 'bingo', label: 'Bingo', to: '/explore/egames/bingo/top', image: '/hero/thumbnails/bingo.webp' },
  { id: 'promotions', label: 'Promotions', to: '/explore/bonuses', image: '/hero/promotions.webp' },
]
const categoryDetails = [
  { image: '/category-icons/sports.webp', description: 'Get closer to the game' },
  { image: '/category-icons/2bet-slots.webp', description: 'Find your next spin' },
  { image: '/category-icons/2bet-livecasino.webp', description: 'The table is yours' },
  { image: '/category-icons/2bet-bingo.webp', description: 'Every number counts' },
  { image: '/category-icons/gift.webp', description: 'Discover your rewards' },
]
let motionPreference: MediaQueryList | undefined
let sectionRevealObserver: IntersectionObserver | undefined

function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>()
  return items.filter(item => {
    const value = key(item)
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}
const sweetBonanza = { id: 'sweet-bonanza-1000', title: 'Sweet Bonanza 1000', provider: 'PP', image: '/images/slots/sweet-bonanza-1000.webp' }
const wildBandito = { id: 'wild-bandito', title: 'Wild Bandito', provider: '2bet', image: '/images/slots/wild-bandito.webp' }

const slotGames = uniqueBy([
  sweetBonanza,
  wildBandito,
  ...popularGames,
  ...recommendedGames,
].filter((game): game is NonNullable<typeof game> => Boolean(game && game.title)), game => game.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()).slice(0, 15)
const liveGames = HOMEPAGE_CASINO_CATEGORIES.map(game => ({
  ...game,
  title: LIVE_CASINO_CATEGORIES.find(category => category.key === game.key)?.label || game.title,
}))
const bingoGames = uniqueBy([
  TOP_BINGO_GAMES.find(game => game.id === 'pearls-of-bingo')!,
  TOP_BINGO_GAMES.find(game => game.id === 'super-bingo')!,
  TOP_BINGO_GAMES.find(game => game.id === 'lucky-bingo')!,
  TOP_BINGO_GAMES.find(game => game.id === 'calaca-bingo')!,
  ...TOP_BINGO_GAMES,
], game => game.id)
// Fetch live in-play sports fixtures with fallback to sample events.
const { data: inplayData, refresh: refreshInplay } = useFetch<{ sports: any[]; events: SportsEvent[] }>('/api/sports', {
  key: 'homepage-inplay-sports',
  query: { mode: 'inplay' },
  default: () => ({ sports: [], events: [] }),
})
const fallbackFixtures = uniqueBy(Object.values(SAMPLE_MATCH_EVENTS).flat(), fixture => fixture.id)
const fixtures = computed(() => {
  const liveEvents = inplayData.value?.events
  if (Array.isArray(liveEvents) && liveEvents.length > 0) {
    return liveEvents
  }
  return fallbackFixtures
})
const promotions = HOMEPAGE_PROMOTIONS
let inplayInterval: ReturnType<typeof setInterval> | undefined

function initializeSectionEffects() {
  if (motionPreference?.matches || !('IntersectionObserver' in window)) return
  sectionRevealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.remove('allgames-reveal-pending')
      sectionRevealObserver?.unobserve(entry.target)
    })
  }, { threshold: .05, rootMargin: '0px 0px -24px 0px' })
  homepageMain.value?.querySelectorAll('.allgames-section,.homepage-getting-started,.allgames-footer').forEach(section => {
    section.classList.add('allgames-reveal')
    if (section.getBoundingClientRect().top >= window.innerHeight - 24) {
      section.classList.add('allgames-reveal-pending')
      sectionRevealObserver?.observe(section)
    }
  })
}
function handleMotionPreference() {
  if (!motionPreference?.matches) return
  homepageMain.value?.querySelectorAll('.allgames-reveal-pending').forEach(section => section.classList.remove('allgames-reveal-pending'))
  sectionRevealObserver?.disconnect()
}
function handleEscape(event: KeyboardEvent) { if (event.key === 'Escape') mobileMenu.value = false }
onMounted(() => {
  window.addEventListener('keydown', handleEscape)
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', handleMotionPreference)
  initializeSectionEffects()
  inplayInterval = setInterval(() => {
    refreshInplay()
  }, 30000)
})
onBeforeUnmount(() => {
  if (inplayInterval) clearInterval(inplayInterval)
  sectionRevealObserver?.disconnect()
  motionPreference?.removeEventListener('change', handleMotionPreference)
  window.removeEventListener('keydown', handleEscape)
  clearDemoMessage()
})
</script>

<template>
  <div class="allgames-shell" :class="{ 'allgames-shell--expanded': !railCollapsed }">

    <main ref="homepageMain" class="allgames-main bg-black rounded-md">
      <div class="allgames-welcome flex items-center justify-between">
        <p>{{ translate('THE 2BET EXPERIENCE') }} <span>{{ translate('One destination. Every kind of play.') }}</span></p>
        <NuxtLink to="/explore/bonuses">{{ translate('Explore your rewards') }} <Gift :size="14" aria-hidden="true" /></NuxtLink>
      </div>
      <HomepageHero />

      <div class="allgames-content">
        <HomepageSportsSection :fixtures="fixtures" />

        <HomepageSlotsSection :games="slotGames" />

        <HomepageJackpotSection />

        <HomepageProvidersSection />

        <HomepageLiveCasinoSection :categories="liveGames" />

        <HomepageContentSlider id="promotions" class="homepage-promotions-section" :title="translate('Promotions')" :description="translate('More to look forward to.')" view-all-to="/explore/bonuses" :view-all-label="translate('View all promotions')" :item-count="promotions.length" :visible-cards="2" :items-per-slide="1" mobile-dots>
          <template #header>
          <header class="allgames-section-heading flex items-center justify-between gap-3">
            <div class="allgames-heading-copy flex items-center"><div><h2 id="promotions-title"><Gift class="allgames-heading-symbol" :size="28" :stroke-width="1.6" aria-hidden="true" />{{ translate('Promotions') }}</h2><p>{{ translate('More to look forward to.') }}</p></div></div>
            <NuxtLink to="/explore/bonuses" class="allgames-view-all">{{ translate('View all promotions') }} <ArrowRight :size="17" aria-hidden="true" /></NuxtLink>
          </header>
          </template>
            <NuxtLink v-for="promotion in promotions" :key="promotion.id" :to="`/explore/bonus/${promotion.slug}`" class="allgames-promo relative overflow-hidden" :data-tone="promotion.tone">
              <img :src="promotion.bannerImage" :alt="translate(promotion.title)" width="410" height="205" loading="lazy" decoding="async"><div class="relative"><p class="allgames-eyebrow">{{ translate(`${(promotion.category || '').toUpperCase()} REWARDS`.trim()) }}</p><h3>{{ translate(promotion.title) }}</h3><p>{{ translate(promotion.rate || '') }} <span>{{ translate('rewards to explore.') }}</span></p><span class="allgames-text-link">{{ translate('View promotion') }} <ArrowRight :size="16" /></span></div>
            </NuxtLink>
        </HomepageContentSlider>

        <HomepageGettingStarted :faqs="props.faqs" />

        <div class="allgames-service-strip flex">
          <div class="flex items-center"><ShieldCheck :size="22" aria-hidden="true" /><span><strong>{{ translate('Your play. Your pace.') }}</strong><small>{{ translate('A better experience starts with responsible play.') }}</small></span></div>
          <NuxtLink to="/explore/egames/customer-service" class="flex items-center"><Headphones :size="20" aria-hidden="true" /> {{ translate('Here to help') }} <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
        </div>
      </div>
    </main>
    <div v-if="toastMessage" class="allgames-toast flex items-center" role="status"><span>{{ translate(toastMessage) }}</span><button type="button" :aria-label="translate('Dismiss message')" @click="clearDemoMessage"><X :size="16" /></button></div>
  </div>
</template>

<style src="~/assets/css/allgames-home.css"></style>
