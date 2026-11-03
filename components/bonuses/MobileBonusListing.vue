<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import MobileBonusHeader from './MobileBonusHeader.vue'
import {
  PROMOTIONS, PROMO_CATEGORIES, PROMOTION_SECTIONS,
  getPromoBannerUrl, getPromoThumbnailUrl, getPromotionCountdownText, type PromotionItem,
} from '~/data/promotions'

const props = withDefaults(defineProps<{ category?: string }>(), { category: 'all' })
const { markAsViewed } = useViewedPromotions()
const track = ref<HTMLElement | null>(null)
const categoryNav = ref<HTMLElement | null>(null)
const activeSlide = ref(0)
const nowMs = ref(Date.now())
let countdownTimer: ReturnType<typeof setInterval> | null = null
const categoryPath = (key: string): string => key === 'all'
  ? '/explore/bonuses'
  : `/explore/bonuses/${key}`

const featuredPromotions = computed(() => {
  const featured = ['lucky-rankings', 'weekly-treasure-chest']
  return [...PROMOTIONS].sort((a, b) => {
    const rank = (item: PromotionItem): number => {
      const index = featured.findIndex(slug => item.slug.startsWith(slug))
      return index === -1 ? featured.length : index
    }
    return rank(a) - rank(b)
  })
})
const orderPromotions = (items: PromotionItem[], order: string[]): PromotionItem[] => {
  const rank = (item: PromotionItem): number => {
    const index = order.indexOf(item.slug)
    return index < 0 ? order.length : index
  }
  return [...items].sort((a, b) => rank(a) - rank(b))
}
const cards = computed(() => {
  if (props.category === 'all') return featuredPromotions.value
  const items = PROMOTION_SECTIONS.find(section => section.category === props.category)?.items || []
  return props.category === 'most-popular'
    ? orderPromotions(items, ['your-deposit-your-reward', 'spins-bring-spins', 'umuulan-ng-angpao'])
    : items
})
const sections = computed(() => PROMOTION_SECTIONS.map(section => ({
  ...section,
  items: section.category === 'most-popular'
    ? orderPromotions(section.items, ['your-deposit-your-reward', 'slot-loss-rebate', 'unlimited-rebate', 'spins-bring-spins', 'umuulan-ng-angpao', 'weekly-treasure-chest'])
    : section.items,
})))

const countdown = (promotion: PromotionItem): string => {
  return getPromotionCountdownText(promotion, nowMs.value)
}
const updateSlide = (): void => {
  const firstCard = track.value?.firstElementChild as HTMLElement | null
  if (track.value && firstCard) activeSlide.value = Math.round(track.value.scrollLeft / (firstCard.offsetWidth + 8))
}
const goToSlide = (index: number): void => {
  const card = track.value?.children[index] as HTMLElement | undefined
  if (card && track.value) track.value.scrollTo({ left: card.offsetLeft - track.value.offsetLeft, behavior: 'smooth' })
}
const revealCategory = async (): Promise<void> => {
  await nextTick()
  const active = categoryNav.value?.querySelector<HTMLElement>('[aria-current="page"]')
  if (active && categoryNav.value) categoryNav.value.scrollLeft = Math.max(0, active.offsetLeft - 64)
  activeSlide.value = 0
}
onMounted(() => {
  revealCategory()
  nowMs.value = Date.now()
  countdownTimer = setInterval(() => {
    nowMs.value = Date.now()
  }, 1000)
})
onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
})
watch(() => props.category, revealCategory)
</script>

<template>
  <div class="mobile-bonuses">
    <div class="mobile-bonuses__sticky">
      <MobileBonusHeader :back-to="category === 'all' ? '/' : '/explore/bonuses'" />
      <nav ref="categoryNav" class="mobile-bonuses__categories mx-1" aria-label="Bonus categories">
        <NuxtLink
          v-for="item in PROMO_CATEGORIES" :key="item.key"
          :to="categoryPath(item.key)" :aria-current="category === item.key ? 'page' : undefined"
        >{{ item.label }}</NuxtLink>
      </nav>
    </div>

    <section class="mobile-bonuses__banners" :aria-label="category === 'all' ? 'Featured bonuses' : `${PROMO_CATEGORIES.find(item => item.key === category)?.label} bonuses`">
      <div ref="track" :class="category === 'all' ? 'mobile-bonuses__carousel' : 'mobile-bonuses__stack'" @scroll.passive="updateSlide">
        <NuxtLink v-for="(promotion, index) in cards" :key="promotion.id" :to="`/explore/bonus/${promotion.slug}`" class="mobile-bonus-card" @click="markAsViewed(promotion.slug)">
          <div class="mobile-bonus-card__image">
            <img :src="getPromoBannerUrl(promotion.bannerImage, promotion.slug)" :alt="promotion.title" :style="{ objectPosition: promotion.imagePosition || 'center' }" :loading="index < 2 ? 'eager' : 'lazy'" decoding="async">
            <span v-if="promotion.showSaveBadge" class="mobile-bonus-card__save">◎ Save</span>
          </div>
          <div class="mobile-bonus-card__copy">
            <strong>{{ promotion.title }}</strong>
            <span>{{ countdown(promotion) }}</span>
          </div>
        </NuxtLink>
      </div>
      <template v-if="category === 'all'">
        <button v-if="activeSlide < cards.length - 1" class="mobile-bonuses__next" type="button" aria-label="Next featured bonus" @click="goToSlide(activeSlide + 1)"><ChevronRight :size="20" /></button>
        <div class="mobile-bonuses__dots" aria-label="Featured bonus slides">
          <button v-for="(promotion, index) in cards" :key="promotion.id" type="button" :aria-label="`Show ${promotion.title}`" :aria-pressed="activeSlide === index" @click="goToSlide(index)" />
        </div>
      </template>
    </section>

    <div v-if="category === 'all'" class="mobile-bonuses__groups">
      <section v-for="section in sections" :key="section.id" class="mobile-bonuses__group">
        <NuxtLink class="mobile-bonuses__heading" :to="categoryPath(section.category)">
          <h2>{{ section.title }}</h2><ChevronRight :size="20" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink v-for="promotion in section.items" :key="promotion.id" :to="`/explore/bonus/${promotion.slug}`" class="mobile-bonus-row" @click="markAsViewed(promotion.slug)">
          <img :src="getPromoThumbnailUrl(promotion.thumbnailImage, promotion.slug)" :alt="promotion.title" loading="lazy" width="54" height="54">
          <span class="mobile-bonus-row__copy"><strong>{{ promotion.title }}</strong><small>{{ promotion.description }}</small></span>
          <span class="mobile-bonus-row__details">Details</span>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<style scoped>
.mobile-bonuses { display: none; }
@media (max-width: 63.99rem) {
  .mobile-bonuses { display: block; color: #f5f5f5; background: #000; padding-bottom: 8px; }
  .mobile-bonuses__sticky { position: sticky; top: 0; z-index: 40; background: #000; }
  .mobile-bonuses__categories { position: relative; display: flex; gap: 8px; overflow-x: auto; align-items: center; height: 48px; padding: 8px; scrollbar-width: none; background: #111; border-radius: 12px; }
  .mobile-bonuses__categories::-webkit-scrollbar, .mobile-bonuses__carousel::-webkit-scrollbar { display: none; }
  .mobile-bonuses__categories a { flex: 0 0 auto; padding: 6px 12px; border-radius: 24px; font-size: 14px; font-weight: 700; white-space: nowrap; }
  .mobile-bonuses__categories a[aria-current="page"] { background: var(--main-color); }
  .mobile-bonuses__banners { position: relative; margin-top: 8px; }
  .mobile-bonuses__carousel { position: relative; display: flex; gap: 8px; padding: 0 10px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-left: 10px; scrollbar-width: none; }
  .mobile-bonus-card { display: block; overflow: hidden; min-width: 0; border-radius: 16px; background: #003e2b; scroll-snap-align: start; }
  .mobile-bonuses__carousel .mobile-bonus-card { flex: 0 0 64%; }
  .mobile-bonus-card__image { position: relative; aspect-ratio: 2 / 1; overflow: hidden; background: #141414; }
  .mobile-bonus-card__image img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .mobile-bonus-card__save { position: absolute; top: 8px; left: 8px; padding: 2px 7px; border-radius: 20px; background: #ef174c; font-size: 12px; font-weight: 700; }
  .mobile-bonus-card__copy { display: flex; flex-direction: column; gap: 2px; padding: 8px 12px 10px; }
  .mobile-bonus-card__copy strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 16px; font-weight: 800; line-height: 22px; }
  .mobile-bonus-card__copy span { font-size: 12px; line-height: 18px; }
  .mobile-bonuses__next { position: absolute; top: 32%; right: 14px; display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: #141414; }
  .mobile-bonuses__dots { display: flex; align-items: center; justify-content: center; gap: 3px; height: 20px; }
  .mobile-bonuses__dots button { position: relative; width: 4px; height: 4px; border-radius: 4px; background: #292929; }
  .mobile-bonuses__dots button::after { position: absolute; content: ''; inset: -7px -1px; }
  .mobile-bonuses__dots button[aria-pressed="true"] { width: 12px; background: #777; }
  .mobile-bonuses__stack { display: flex; flex-direction: column; gap: 8px; padding: 0 10px; }
  .mobile-bonuses__groups { display: flex; flex-direction: column; gap: 8px; padding: 0 10px; }
  .mobile-bonuses__group { background: #141414; border-radius: 12px; overflow: hidden; }
  .mobile-bonuses__heading { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; }
  .mobile-bonuses__heading h2 { margin: 0; font-size: 18px; font-weight: 800; }
  .mobile-bonuses__heading svg { color: #888; }
  .mobile-bonus-row { display: grid; grid-template-columns: 54px minmax(0, 1fr) auto; align-items: center; gap: 12px; min-height: 78px; padding: 12px; }
  .mobile-bonus-row > img { width: 54px; height: 54px; object-fit: cover; border-radius: 8px; }
  .mobile-bonus-row__copy { display: flex; min-width: 0; flex-direction: column; }
  .mobile-bonus-row__copy strong, .mobile-bonus-row__copy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mobile-bonus-row__copy strong { font-size: 16px; font-weight: 800; line-height: 22px; }
  .mobile-bonus-row__copy small { color: #999; font-size: 12px; line-height: 18px; }
  .mobile-bonus-row__details { padding: 7px 8px; border-radius: 8px; background: #242424; font-size: 12px; }
}
</style>
