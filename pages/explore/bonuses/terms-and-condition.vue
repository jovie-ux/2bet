<script setup lang="ts">
import LegalPageShell from '~/components/legal/LegalPageShell.vue'
import { PROMOTIONS, getBonusDetail, getPromoHeaderUrl } from '~/data/promotions'

const route = useRoute()
const promotion = computed(() => {
  const slug = typeof route.query.promotion === 'string' ? route.query.promotion : 'share-and-earn'
  if (!PROMOTIONS.some(item => item.slug === slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Promotion not found' })
  }
  return getBonusDetail(slug)
})
const promotionPath = computed(() => '/explore/bonus/' + promotion.value.slug)

useAppSeo({
  title: 'Terms and Conditions for Promotion | 2bet',
  description: () => `查看2bet${promotion.value.title}的活動期間、優惠條款及活動規則。`,
  breadcrumbs: () => [
    { name: 'Home', path: '/' },
    { name: 'Bonuses', path: '/explore/bonuses' },
    { name: promotion.value.title, path: promotionPath.value },
    { name: 'Terms and Conditions for Promotion', path: '/explore/bonuses/terms-and-condition' },
  ],
})
</script>

<template>
  <LegalPageShell
    title="Terms and Conditions for Promotion"
    :back-to="promotionPath"
    :banner-src="getPromoHeaderUrl(promotion.headerImage || promotion.bannerImage, promotion.slug)"
    :banner-alt="promotion.title"
    :show-document-title="false"
  >
    <section class="promotion-section" lang="zh-Hant">
      <h2>{{ promotion.title }}</h2>
      <p>{{ promotion.subtitle }}</p>
    </section>

    <section class="promotion-section">
      <h3>Period:</h3>
      <p>{{ promotion.period }}</p>
    </section>

    <section v-if="promotion.promotionTerms" class="promotion-section">
      <h3>Promotion T&amp;C:</h3>
      <template v-if="Array.isArray(promotion.promotionTerms)">
        <p v-for="term in promotion.promotionTerms" :key="term">{{ term }}</p>
      </template>
      <p v-else>{{ promotion.promotionTerms }}</p>
    </section>

    <section class="promotion-section">
      <h3>Rules:</h3>
      <ol lang="zh-Hant">
        <li v-for="rule in promotion.rules" :key="rule">
          {{ rule.replace(/^\d+[.、]\s*/, '') }}
        </li>
      </ol>
    </section>

    <NuxtLink :to="promotionPath" class="promotion-back-link">Back to promotion</NuxtLink>
  </LegalPageShell>
</template>

<style scoped>
.promotion-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.promotion-section h2 {
  margin: 0;
  color: #f3f4f3;
  font-size: 1rem;
  font-weight: 800;
}

.promotion-section h3 {
  margin: 0 0 0.15rem;
  padding: 0.62rem 0.8rem;
  border-radius: 0.42rem;
  color: #f3f4f3;
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.25;
  background: #242424;
}

.promotion-section p {
  margin: 0;
  color: #d4d6d5;
}

.promotion-section ol {
  margin: 0;
  padding-left: 1.35rem;
  color: #d4d6d5;
  list-style: decimal;
}

.promotion-section li + li {
  margin-top: 0.5rem;
}

.promotion-back-link {
  display: inline-block;
  color: var(--main-color);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (min-width: 40rem) {
  .promotion-section h3 {
    font-size: 0.86rem;
  }
}
</style>
