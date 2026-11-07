<script setup lang="ts">
import SeoHeader from '~/components/SeoHeader.vue'
import BonusCurrencySelector from '~/components/bonuses/BonusCurrencySelector.vue'
import BonusEmptyState from '~/components/bonuses/BonusEmptyState.vue'
import {
  PROMOTIONS,
  PROMO_CATEGORIES,
  PROMOTION_SECTIONS,
  getPromoBannerUrl,
  getPromotionCountdownText,
  type PromotionItem,
} from '~/data/promotions'

const props = defineProps<{ category: string }>()
const { translate } = useSiteLocale()
const { selectedCurrency, filterPromotions } = useBonusPayments()
const currencyPromotions = computed(() => filterPromotions(PROMOTIONS))
const visibleCategories = computed(() => currencyPromotions.value.length
  ? PROMO_CATEGORIES
  : PROMO_CATEGORIES.filter(category => category.key === 'all'))
const nowMs = ref(Date.now())
let countdownTimer: ReturnType<typeof setInterval> | null = null

const categoryPath = (key: string): string => key === 'all'
  ? '/explore/bonuses'
  : `/explore/bonuses/${key}`

const categoryLabel = computed(() =>
  PROMO_CATEGORIES.find(item => item.key === props.category)?.label || 'Bonuses',
)

const { isViewed, markAsViewed, loadViewedPromotions } = useViewedPromotions()

const allCategoryPromotions = computed(() => {
  if (props.category === 'all') {
    return currencyPromotions.value
  }
  return filterPromotions(PROMOTION_SECTIONS.find(section => section.category === props.category)?.items || [])
})

const isAllCategoryViewed = computed(() => {
  const items = allCategoryPromotions.value
  if (!items.length) return false
  return items.every(item => isViewed(item.slug))
})

const showSeenDivider = computed(() => {
  return !isAllCategoryViewed.value && categoryPromotions.value.length > 0
})

const featuredPromotions = computed(() => {
  const items = allCategoryPromotions.value
  if (!items.length) return []

  if (isAllCategoryViewed.value) {
    return []
  }

  const unviewed = items.filter(item => !isViewed(item.slug))
  const viewed = items.filter(item => isViewed(item.slug))

  if (viewed.length === 0) {
    const firstRowLimit = Math.min(2, Math.max(1, items.length - 1))
    return items.slice(0, firstRowLimit)
  }

  return unviewed
})

const categoryPromotions = computed(() => {
  const items = allCategoryPromotions.value
  if (!items.length) return []

  if (isAllCategoryViewed.value) {
    return items
  }

  const featuredIds = new Set(featuredPromotions.value.map(item => item.id))
  return items.filter(item => !featuredIds.has(item.id))
})

const countdown = (promotion: PromotionItem): string =>
  getPromotionCountdownText(promotion, nowMs.value)

onMounted(() => {
  loadViewedPromotions()
  nowMs.value = Date.now()
  countdownTimer = setInterval(() => {
    nowMs.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

useAppSeo({
  title: () => formatSeoTitle(`${translate(categoryLabel.value)} — Bônus e Promoções Especiais | 2bet`),
  description: () => formatSeoDescription(`Confira ofertas de ${translate(categoryLabel.value).toLowerCase()} na 2bet Brasil. Bônus de recarga, giros grátis e vantagens exclusivas no cassino.`),
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Bônus', path: '/explore/bonuses' },
    { name: translate(categoryLabel.value), path: categoryPath(props.category) },
  ],
})
</script>

<template>
  <div class="bonus-category-page">
    <div class="bonus-category-sticky sticky-header-seal">
      <SeoHeader
        title="Bonuses"
        :meta-title="`${translate(categoryLabel)} — Bônus e Promoções de Cassino Online | 2bet`"
        :description="`Explore bônus e promoções de ${translate(categoryLabel).toLowerCase()} disponíveis na 2bet Brasil. Aproveite recompensas, rebates e ofertas exclusivas.`"
        keywords="2bet bônus, promoções, recompensas de depósito, rebates"
        back-to="/explore/bonuses"
        custom-class="bonus-category-header"
      >
        <template #actions>
          <BonusCurrencySelector v-model="selectedCurrency" />
        </template>
      </SeoHeader>

      <nav class="category-nav" :aria-label="translate('Promotion categories')">
        <NuxtLink
          v-for="item in visibleCategories"
          :key="item.key"
          :to="categoryPath(item.key)"
          :aria-current="item.key === (currencyPromotions.length ? category : 'all') ? 'page' : undefined"
        >
          {{ translate(item.label) }}
        </NuxtLink>
      </nav>
    </div>

    <BonusEmptyState v-if="!allCategoryPromotions.length" />

    <section v-if="featuredPromotions.length" class="featured-grid" :aria-label="translate('Featured promotions')">
      <NuxtLink
        v-for="promotion in featuredPromotions"
        :key="promotion.id"
        :to="`/explore/bonus/${promotion.slug}`"
        class="category-card"
        @click="markAsViewed(promotion.slug)"
      >
        <div class="category-card__media">
          <img
            :src="getPromoBannerUrl(promotion.bannerImage, promotion.slug)"
            :alt="translate(promotion.title)"
            :style="{ objectPosition: promotion.imagePosition || 'center' }"
            loading="eager"
            decoding="async"
          >
          <span v-if="promotion.showSaveBadge" class="category-card__save">◎ {{ translate('Save') }}</span>
        </div>
        <div class="category-card__copy">
          <strong>{{ translate(promotion.title) }}</strong>
          <span>{{ translate(countdown(promotion)) }}</span>
        </div>
      </NuxtLink>
    </section>

    <div v-if="showSeenDivider" class="seen-divider" role="separator">
      <span>{{ translate('You have seen the promotion below') }}</span>
    </div>

    <section v-if="categoryPromotions.length" class="category-grid" :aria-label="`${translate(categoryLabel)} promotions`">
      <NuxtLink
        v-for="promotion in categoryPromotions"
        :key="promotion.id"
        :to="`/explore/bonus/${promotion.slug}`"
        class="category-card"
        @click="markAsViewed(promotion.slug)"
      >
        <div class="category-card__media">
          <img
            :src="getPromoBannerUrl(promotion.bannerImage, promotion.slug)"
            :alt="translate(promotion.title)"
            :style="{ objectPosition: promotion.imagePosition || 'center' }"
            loading="lazy"
            decoding="async"
          >
          <span v-if="promotion.showSaveBadge" class="category-card__save">◎ {{ translate('Save') }}</span>
        </div>
        <div class="category-card__copy">
          <strong>{{ translate(promotion.title) }}</strong>
          <span>{{ translate(countdown(promotion)) }}</span>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.bonus-category-page {
  width: 100%;
  min-width: 0;
  padding-bottom: 1rem;
  color: #f5f5f5;
}

.bonus-category-sticky {
  position: sticky;
  z-index: 24;
  top: var(--content-sticky-top);
  margin: 0 -0.05rem;
  padding: 0 0.05rem 0.28rem;
  border-radius: 1.2rem 1.2rem 0 0;
  background: #000000;
}

:deep(.bonus-category-header) {
  min-height: 2.15rem;
  margin-bottom: 0.28rem;
  padding: 0.26rem 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.035);
  border-radius: 0.48rem;
  background: #171817;
}

.philippines-badge {
  display: grid;
  width: 1.2rem;
  height: 1.2rem;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  background: #272827;
}

.philippines-badge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-nav {
  display: flex;
  min-height: 2rem;
  align-items: center;
  overflow-x: auto;
  padding: 0.22rem 0.38rem;
  border: 1px solid rgba(255, 255, 255, 0.035);
  border-radius: 0.48rem;
  background: #1a1b1a;
  scrollbar-width: none;
  gap: 0.2rem;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.category-nav a {
  min-height: 1.45rem;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 0.62rem;
  border-radius: 999px;
  color: #f1f1f1;
  font-size: 0.58rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 150ms ease;
}

.category-nav a:hover {
  background: rgba(255, 255, 255, 0.05);
}

.category-nav a[aria-current='page'] {
  background: #087653;
}

.featured-grid,
.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.28rem;
}

.category-card {
  display: block;
  overflow: hidden;
  min-width: 0;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.5rem;
  color: inherit;
  text-decoration: none;
  background: #064433;
  transition: border-color 150ms ease, transform 150ms ease;
}

.category-card:hover {
  border-color: rgba(49, 214, 154, 0.42);
  transform: translateY(-1px);
}

.category-card__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 2 / 1;
  background: #1b1c1b;
}

.category-card__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-card__save {
  position: absolute;
  top: 0.28rem;
  left: 0.28rem;
  padding: 0.12rem 0.3rem;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.44rem;
  font-weight: 800;
  background: #ef174c;
}

.category-card__copy {
  display: flex;
  min-width: 0;
  min-height: 2.15rem;
  flex-direction: column;
  justify-content: center;
  padding: 0.28rem 0.42rem 0.34rem;
  background: linear-gradient(180deg, #07543e, #064433);
}

.category-card__copy strong,
.category-card__copy span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.category-card__copy strong {
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: 800;
  line-height: 1.25;
}

.category-card__copy span {
  margin-top: 0.08rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.46rem;
}

.seen-divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 0.72rem 0;
  color: #ffffff;
  font-size: 0.52rem;
  font-weight: 700;
  gap: 0.55rem;
}

.seen-divider::before,
.seen-divider::after {
  height: 1px;
  content: '';
  background: #292a29;
}

.category-empty {
  grid-column: 1 / -1;
  margin: 0;
  padding: 1.5rem;
  border-radius: 0.48rem;
  color: #a6a8a7;
  text-align: center;
  background: #151515;
}

@media (max-width: 63.99rem) {
  .bonus-category-sticky {
    top: 0;
    margin-inline: 0;
    padding-inline: 0.25rem;
  }

  .featured-grid,
  .category-grid {
    grid-template-columns: 1fr;
    padding-inline: 0.45rem;
    gap: 0.5rem;
  }

  .seen-divider {
    margin-inline: 0.45rem;
    font-size: 0.7rem;
  }

  .category-nav {
    min-height: 3rem;
  }

  .category-nav a {
    min-height: 2rem;
    padding-inline: 0.8rem;
    font-size: 0.74rem;
  }

  .category-card__copy {
    min-height: 3.2rem;
    padding: 0.45rem 0.7rem 0.55rem;
  }

  .category-card__copy strong {
    font-size: 0.9rem;
  }

  .category-card__copy span {
    font-size: 0.68rem;
  }
}
</style>
