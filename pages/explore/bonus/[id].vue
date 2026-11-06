<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import SeoHeader from '~/components/SeoHeader.vue'
import MobileBonusHeader from '~/components/bonuses/MobileBonusHeader.vue'
import BonusCurrencySelector from '~/components/bonuses/BonusCurrencySelector.vue'
import VipBenefitsTables from '~/components/bonuses/VipBenefitsTables.vue'
import PromotionComplianceFooter from '~/components/PromotionComplianceFooter.vue'
import ReminderModal from '~/components/modals/ReminderModal.vue'
import {
  PROMOTION_PLACEHOLDER_IMAGES,
  PROMOTIONS,
  getBonusDetail,
  getPromoBannerUrl,
  getPromoHeaderUrl,
  type BonusDetail,
} from '~/data/promotions'

const route = useRoute()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl
const { markAsViewed } = useViewedPromotions()
const { selectedCurrency } = useBonusPayments()

const bonusId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : (id as string) || 'share-and-earn'
})

const bonus = computed<BonusDetail>(() => {
  const promotion = PROMOTIONS.find(item => item.slug === bonusId.value || item.id === bonusId.value)
  if (!promotion) {
    throw createError({ statusCode: 404, statusMessage: 'Promotion not found' })
  }
  return getBonusDetail(promotion.slug)
})
const promotionTermsPath = computed(() => ({
  path: '/explore/bonuses/terms-and-condition',
  query: { promotion: bonus.value.slug },
}))
const bannerImageError = ref(false)
const isReminderOpen = ref(false)
const reminderMessage = ref('Please login first to join this promotion.')

const bonusHeaderImageSrc = computed(() => {
  return getPromoHeaderUrl(bonus.value.headerImage || bonus.value.bannerImage, bonus.value.slug)
})

const bonusBannerImageSrc = computed(() => {
  return getPromoBannerUrl(bonus.value.bannerImage, bonus.value.slug)
})

const isSvgString = (icon?: string): boolean => {
  return Boolean(icon && typeof icon === 'string' && icon.trim().startsWith('<svg'))
}

const seoTitle = computed(() => bonus.value.seoTitle || `${bonus.value.title} — 2Bet Bonus & Promotions`)

const seoDescription = computed(() => {
  if (bonus.value.seoDesc) return bonus.value.seoDesc
  if (bonus.value.seoDescription) return bonus.value.seoDescription
  const desc = bonus.value.subtitle || bonus.value.eventContent?.description || `Participate in ${bonus.value.title} on 2Bet.`
  return `${desc} Join 2Bet Philippines for exclusive casino promotions, free spins, deposit bonuses, and daily rebates.`
})

const seoKeywords = computed(() => {
  return [
    bonus.value.title,
    '2Bet bonus',
    '2Bet promotion',
    bonus.value.slug,
    'Philippines online casino',
    'free spins',
    'daily rebate',
    'casino bonus 2026',
    'sports betting promotion',
  ].join(', ')
})

const seoImage = computed(() => {
  const raw = bonusHeaderImageSrc.value || (typeof bonus.value.bannerImage === 'string' ? bonus.value.bannerImage : bonus.value.bannerImage?.banner) || bonus.value.thumbnailImage || '/brand/2bet-logo.webp'
  return raw.startsWith('http') ? raw : `https://2bet.com${raw}`
})

const canonicalUrl = computed(() => `https://2bet.com/explore/bonus/${bonus.value.slug}`)

useAppSeo({
  title: seoTitle,
  description: seoDescription,
  keywords: seoKeywords,
  image: seoImage,
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'SaleEvent',
    'name': bonus.value.title,
    'description': seoDescription.value,
    'url': canonicalUrl.value,
    'image': seoImage.value,
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OnlineEventAttendanceMode',
    'location': {
      '@type': 'VirtualLocation',
      'url': canonicalUrl.value,
    },
    'organizer': {
      '@type': 'Organization',
      'name': '2Bet Philippines',
      'url': 'https://2bet.com',
      'logo': 'https://2bet.com/brand/2bet-logo.webp',
    },
  })),
})

watch(bonusId, () => {
  bannerImageError.value = false
})

onMounted(() => {
  if (bonus.value?.slug) {
    markAsViewed(bonus.value.slug)
  }
})

watch(() => bonus.value?.slug, (slug) => {
  if (slug) {
    markAsViewed(slug)
  }
})

const handleJoinNow = (): void => {
  reminderMessage.value = 'Please login first to participate in this promotion.'
  isReminderOpen.value = true
}

const handleProgressClick = (): void => {
  reminderMessage.value = 'Please login first to view your mission progress.'
  isReminderOpen.value = true
}

const handleModalOk = (): void => {
  isReminderOpen.value = false
  if (import.meta.client) {
    window.location.href = bybetRedirectUrl
  }
}

const handleContentClick = (event: MouseEvent): void => {
  const target = (event.target as HTMLElement)?.closest('.promotion-terms-trigger, .text-green-1')
  if (target) {
    navigateTo(promotionTermsPath.value)
  }
}
</script>

<template>
  <div class="bonus-detail-page" :class="{ 'bonus-detail-page--with-action': bonus.hasJoinButton }">
    <MobileBonusHeader back-to="/explore/bonuses" currency-selector />
    <SeoHeader
      class="bonus-detail-desktop-header"
      sticky
      title="Bonuses"
      :meta-title="seoTitle"
      :description="seoDescription"
      :keywords="seoKeywords"
      :og-image="seoImage"
      back-to="/explore/bonuses"
      custom-class="bonus-detail-header"
    >
      <template #actions>
        <BonusCurrencySelector v-model="selectedCurrency" />
      </template>
    </SeoHeader>

    <main class="bonus-detail-content">
      <section class="promotion-banner h-[250px] sm:h-[235px]" :aria-label="`${bonus.title} banner`">
        <span v-if="PROMOTIONS.find(item => item.slug === bonus.slug)?.showSaveBadge" class="promotion-banner__save">◎ Save</span>
        <picture v-if="!bannerImageError">
          <source media="(max-width: 63.99rem)" :srcset="bonusBannerImageSrc">
          <img
            :src="bonusHeaderImageSrc"
            :alt="bonus.title"
            decoding="async"
            @error="bannerImageError = true"
          >
        </picture>
        <div v-else class="promotion-banner__fallback">
          <strong>{{ bonus.title }}</strong>
          <span>{{ bonus.subtitle }}</span>
        </div>
      </section>

      <article class="promotion-sheet" lang="zh-Hant">
        <div
          v-if="bonus.contentHtml"
          class="promotion-custom-content"
          @click="handleContentClick"
          v-html="bonus.contentHtml"
        />

        <template v-else>
          <header class="promotion-title">
            <div
              v-if="bonus.innerIcon || bonus.innerPageIcon"
              class="promotion-title__icon"
            >
              <div
                v-if="isSvgString(bonus.innerIcon || bonus.innerPageIcon)"
                class="promotion-title__svg"
                v-html="bonus.innerIcon || bonus.innerPageIcon"
              />
              <img
                v-else
                :src="(bonus.innerIcon || bonus.innerPageIcon)!"
                :alt="bonus.title"
                width="40"
                height="41"
                decoding="async"
              >
            </div>
            <img
              v-else
              :src="bonus.thumbnailImage || (typeof bonus.bannerImage === 'object' && bonus.bannerImage.thumbnail) || PROMOTION_PLACEHOLDER_IMAGES.thumbnail"
              :alt="bonus.title"
              width="64"
              height="64"
              decoding="async"
            >
            <div>
              <h1>{{ bonus.title }}</h1>
              <p>{{ bonus.subtitle }}</p>
            </div>
          </header>

          <section
            v-if="bonus.showRequirements && bonus.requirements?.items.length"
            class="requirements-panel"
            aria-labelledby="requirements-title"
          >
            <div class="requirements-panel__heading">
              <h2 id="requirements-title">Requirements:</h2>
              <button type="button" @click="handleProgressClick">
                View Progress
                <ChevronRight :size="13" />
              </button>
            </div>

            <ul>
              <li v-for="requirement in bonus.requirements.items" :key="requirement.text">
                <span class="requirement-check" :class="{ 'requirement-check--complete': requirement.completed }">
                  {{ requirement.completed ? '✓' : '' }}
                </span>
                {{ requirement.text }}
              </li>
            </ul>
          </section>

          <section class="period-section" aria-labelledby="period-title">
            <h2 id="period-title">Period:</h2>
            <p>{{ bonus.period }}</p>
          </section>

          <section
            v-if="bonus.qualifications.length"
            class="qualifications-section"
            aria-labelledby="qualifications-title"
          >
            <h2 id="qualifications-title">Qualifications:</h2>
            <dl class="qualification-table">
              <div v-for="qualification in bonus.qualifications" :key="qualification.label">
                <dt>{{ qualification.label }}</dt>
                <dd>{{ qualification.value }}</dd>
              </div>
            </dl>
          </section>

          <section class="reward-section" aria-labelledby="reward-content-title">
            <div class="reward-section__heading">
              <h2 id="reward-content-title">Event Content:</h2>
              <span v-if="bonus.eventContent.badge">{{ bonus.eventContent.badge }}</span>
            </div>

            <p
              v-if="bonus.eventContent.description || bonus.eventContent.descriptionParts?.length"
              class="reward-section__description"
              :class="{ 'reward-section__description--white': bonus.eventContent.descriptionTone === 'white' }"
            >
              <template v-if="bonus.eventContent.descriptionParts?.length">
                <span
                  v-for="(part, index) in bonus.eventContent.descriptionParts"
                  :key="`${index}-${part.text}`"
                  :class="{ 'reward-section__description-highlight': part.highlighted }"
                >{{ part.text }}</span>
              </template>
              <template v-else>{{ bonus.eventContent.description }}</template>
            </p>

            <div v-if="bonus.eventContent.paragraphs?.length" class="reward-paragraphs">
              <p v-for="paragraph in bonus.eventContent.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>

            <VipBenefitsTables
              v-if="bonus.eventContent.vipRebates?.length && bonus.eventContent.vipBenefits?.length"
              :rebates="bonus.eventContent.vipRebates"
              :benefits="bonus.eventContent.vipBenefits"
            />

            <div v-if="bonus.eventContent.linkedParagraphs?.length" class="reward-linked-paragraphs">
              <p v-for="(paragraph, paragraphIndex) in bonus.eventContent.linkedParagraphs" :key="paragraphIndex">
                <template v-for="(part, partIndex) in paragraph.parts" :key="`${paragraphIndex}-${partIndex}`">
                  <a v-if="part.href" :href="part.href" target="_blank" rel="noopener noreferrer">{{ part.text }}</a>
                  <span v-else>{{ part.text }}</span>
                </template>
              </p>
            </div>

            <h3 v-if="bonus.eventContent.tableHeading" class="reward-section__table-heading">
              {{ bonus.eventContent.tableHeading }}
            </h3>

            <div v-if="bonus.eventContent.methodCard" class="method-card">
              <strong>{{ bonus.eventContent.methodCard.title }}</strong>
              <span>{{ bonus.eventContent.methodCard.content }}</span>
            </div>

            <div v-if="bonus.eventContent.callouts?.length" class="reward-callouts">
              <div v-for="callout in bonus.eventContent.callouts" :key="callout.label" class="reward-callout">
                <strong>{{ callout.label }}</strong>
                <span v-if="callout.badge">{{ callout.badge }}</span>
              </div>
            </div>

            <div v-if="bonus.eventContent.tierCards?.length" class="vip-tier-cards">
              <article v-for="tier in bonus.eventContent.tierCards" :key="tier.level" class="vip-tier-card">
                <strong class="vip-tier-card__level">👑 {{ tier.level }}</strong>
                <div class="vip-tier-card__benefits">
                  <div><span>🎯<br>Turnover Requirement</span><strong>{{ tier.turnover }}</strong></div>
                  <div><span>💎<br>Upgrade Bonus</span><strong>{{ tier.upgradeBonus }}</strong></div>
                  <div><span>🧧<br>Monthly Red Packet</span><strong>{{ tier.monthlyRedPacket }}</strong></div>
                  <div><span>🎂<br>Birthday Bonus</span><strong>{{ tier.birthdayBonus }}</strong></div>
                </div>
              </article>
            </div>

            <div v-if="bonus.eventContent.tables?.length" class="reward-tables">
              <div
                v-for="(table, tableIndex) in bonus.eventContent.tables"
                :key="`${table.headerTitle || 'reward'}-${tableIndex}`"
                class="reward-table"
                :class="{ 'reward-table--outline': table.variant === 'outline' }"
                :style="{ '--reward-table-accent': table.accentColor || '#429bdb' }"
              >
                <div v-if="table.headerTitle" class="reward-table__title">
                  {{ table.headerTitle }}
                </div>
                <div v-if="table.subHeaderTitle" class="reward-table__subtitle">
                  {{ table.subHeaderTitle }}
                </div>
                <p v-if="table.introText" class="reward-table__intro">{{ table.introText }}</p>

                <div class="reward-table__scroller">
                  <table>
                    <thead>
                      <tr>
                        <th
                          v-for="column in table.columns"
                          :key="column.key"
                          :style="column.width ? { width: column.width } : undefined"
                        >
                          <span v-if="column.icon">{{ column.icon }}</span>
                          {{ column.label }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
                        <template v-for="column in table.columns" :key="column.key">
                          <td
                            v-if="!table.rowSpans?.[column.key] || rowIndex === 0"
                            :rowspan="rowIndex === 0 ? table.rowSpans?.[column.key] : undefined"
                            :class="{ 'reward-table__cell--highlight': table.highlightColumns?.includes(column.key) }"
                          >
                            {{ row[column.key] }}
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p v-if="table.footnote" class="reward-table__footnote">{{ table.footnote }}</p>
              </div>
            </div>

            <div v-if="bonus.eventContent.notes?.length" class="reward-notes">
              <p v-for="note in bonus.eventContent.notes" :key="note">{{ note }}</p>
            </div>

            <div v-if="bonus.eventContent.afterTableParagraphs?.length" class="reward-after-table-paragraphs">
              <p v-for="paragraph in bonus.eventContent.afterTableParagraphs" :key="paragraph">{{ paragraph }}</p>
            </div>

            <ul v-if="bonus.eventContent.bullets?.length" class="promotion-list">
              <li v-for="bullet in bonus.eventContent.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </section>

          <section v-if="bonus.promotionTerms" class="text-section">
            <h2>Promotion T&amp;C:</h2>
            <div v-if="Array.isArray(bonus.promotionTerms)" class="text-section__stack">
              <p v-for="term in bonus.promotionTerms" :key="term">{{ term }}</p>
            </div>
            <p v-else>{{ bonus.promotionTerms }}</p>
          </section>

          <section class="text-section">
            <h2>Rules:</h2>
            <ul class="promotion-list" :class="{ 'promotion-list--plain': bonus.rulesStyle === 'plain' }">
              <li v-for="(rule, index) in bonus.rules" :key="rule">{{ bonus.rulesStyle === 'plain' ? `${index + 1}.${rule}` : rule }}</li>
            </ul>
          </section>

          <section v-if="bonus.withdrawalTerms" class="text-section">
            <h2>Withdrawal Terms:</h2>
            <p>{{ bonus.withdrawalTerms }}</p>
          </section>

          <NuxtLink :to="promotionTermsPath" class="promotion-terms-link">
            Terms and Conditions for Promotion
          </NuxtLink>
        </template>
      </article>
    </main>


    <div v-if="bonus.hasJoinButton" class="join-bar">
      <button type="button" @click="handleJoinNow">Join Now</button>
    </div>

    <ReminderModal
      v-if="isReminderOpen"
      title="Notice"
      :message="reminderMessage"
      @close="isReminderOpen = false"
      @ok="handleModalOk"
    />
  </div>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .bonus-detail-desktop-header { display: none; }
}

.bonus-detail-page {
  width: 100%;
  min-width: 0;
  color: #e8e9e8;
}

/* A transformed ancestor makes position: fixed relative to that ancestor.
   Disable the shared page-reveal transform here so Join Now stays viewport-sticky. */
.bonus-detail-page.section-reveal,
.bonus-detail-page.section-reveal--visible {
  transform: none !important;
}

.bonus-detail-page--with-action {
  padding-bottom: 2.9rem;
}

:deep(.seo-header-sticky-wrapper) {
  margin-right: -0.05rem;
  margin-left: -0.05rem;
  /* padding: 0 0.05rem 0.28rem; */
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

:deep(.bonus-detail-header) {
  min-height: 2.15rem;
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
  font-size: 0.7rem;
  line-height: 1;
  background: #272827;
}

.bonus-detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
}

.promotion-banner {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 5 / 1;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.48rem;
  background: #171817;
}

.promotion-banner > picture,
.promotion-banner > picture > img {
  display: block;
  width: 100%;
  height: 100%;
}

.promotion-banner > picture > img {
  object-fit: cover;
}

.promotion-banner__save {
  position: absolute;
  z-index: 2;
  top: 0.35rem;
  left: 0.35rem;
  padding: 0.13rem 0.36rem;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.47rem;
  font-weight: 800;
  background: #ed174b;
  box-shadow: 0 0.12rem 0.35rem rgba(0, 0, 0, 0.34);
}

.promotion-banner__fallback {
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background: radial-gradient(circle at center, #6a3f00, #211404 60%, #111111);
}

.promotion-banner__fallback strong {
  color: #ffcf4b;
  font-size: 1.25rem;
}

.promotion-banner__fallback span {
  margin-top: 0.2rem;
  color: #f2f2f2;
  font-size: 0.65rem;
}

.promotion-sheet {
  padding: 0.72rem 0.62rem 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.035);
  border-radius: 0.48rem;
  background: #151515;
}

.promotion-custom-content {
  width: 100%;
  color: #e8e9e8;
}

.promotion-custom-content :deep(.text-button-8) {
  color: #f4f7f5;
}

.promotion-custom-content :deep(.text-text-4) {
  color: #8e9491;
}

.promotion-custom-content :deep(.text-text-2) {
  color: #f4f7f5;
}

.promotion-custom-content :deep(.text-green-1) {
  color: #32d49a;
}

.promotion-custom-content :deep(.border-button-8) {
  border-color: rgba(255, 255, 255, 0.12);
}

.promotion-custom-content :deep(.rounded-8) {
  border-radius: 8px;
}

.promotion-custom-content :deep(.w-30) {
  width: 8.5rem;
}

.promotion-custom-content :deep(.text-lgx) {
  font-size: 1.15rem;
  font-weight: 700;
}

.promotion-custom-content :deep(.leading-4_5) {
  line-height: 1.15rem;
}

.promotion-custom-content :deep(.leading-4_75) {
  line-height: 1.2rem;
}

.promotion-custom-content :deep(.leading-5_25) {
  line-height: 1.35rem;
}

.promotion-custom-content :deep(.leading-5_5) {
  line-height: 1.4rem;
}

.promotion-custom-content :deep(.bg-primary) {
  background-color: var(--main-color);
}

.promotion-custom-content :deep(.text-theme-tab-text) {
  color: #ffffff;
}

.promotion-custom-content :deep(._row_18lm5_1) {
  display: flex;
}

.promotion-custom-content :deep(.fill-tab-bar-big-button) {
  fill:  var(--main-color);
}

.promotion-custom-content :deep(iframe) {
  display: block;
  border: none;
  background: transparent;
  color-scheme: dark;
}

.promotion-custom-content :deep(._component-treasure-box__grid-common_1eql6_1) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  padding: 0.35rem 0.25rem 0.45rem;
  background-color: #1a1e1b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 9.375rem;
}

.promotion-custom-content :deep(._component-treasure-box__qualification_1eql6_5) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0.25rem 0;
}

.promotion-custom-content :deep([data-testid^="treasure-box-button"]) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 0.5rem);
  margin: 0 auto;
  border: none;
  cursor: not-allowed;
  border-radius: 10px;
  height: 1.35rem;
  font-size: 0.72rem;
  font-weight: 600;
}

.promotion-custom-content :deep(._tableColumn_1k2zb_1) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a1e1b;
}

.promotion-custom-content :deep(.bg-layer-12) {
  background-color: #1a1e1b;
}

.promotion-custom-content :deep(.bg-icon-5) {
  background-color: #242c27;
}

.promotion-custom-content :deep(.text-button-11) {
  color: #8e9491;
}

.promotion-custom-content :deep(.text-item-4) {
  color: #ffc83b;
  font-weight: 600;
}

.promotion-custom-content :deep(.text-primary-text) {
  color: #32d49a;
  font-weight: 600;
}

.promotion-custom-content :deep(.border-dividers-7) {
  border-color: rgba(255, 255, 255, 0.12);
}

.promotion-custom-content :deep(.text-dividers-7) {
  color: #e4e7e6;
}

.promotion-custom-content :deep(.border-primary) {
  border-color: var(--main-color);
}

.promotion-custom-content :deep(.text-black-1) {
  color: #f4f7f5;
}

.promotion-custom-content :deep(.rounded-10) {
  border-radius: 10px;
}

.promotion-custom-content :deep(.rounded-20) {
  border-radius: 20px;
}

.promotion-custom-content :deep(.h-37_5) {
  height: 9.375rem;
}

.promotion-custom-content :deep(.h-6_25) {
  height: 1.5625rem;
}

.promotion-custom-content :deep(.min-w-24) {
  min-width: 6rem;
}

.promotion-custom-content :deep(.w-11) {
  width: 2.75rem;
}

.promotion-custom-content :deep(.border-b-0_25) {
  border-bottom-width: 1px;
}

.promotion-custom-content :deep(.leading-4) {
  line-height: 1rem;
}

.promotion-custom-content :deep(.leading-6) {
  line-height: 1.5rem;
}

.promotion-custom-content :deep(.leading-6_75) {
  line-height: 1.6875rem;
}

.promotion-custom-content :deep(.leading-7) {
  line-height: 1.75rem;
}

.promotion-custom-content :deep(.max-h-unset) {
  max-height: unset;
}

.promotion-custom-content :deep(.tw-layout-center) {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.promotion-custom-content :deep(picture) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.promotion-custom-content :deep(picture img) {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

:global(html[data-theme='light']) .promotion-custom-content {
  color: #14251d;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-button-8) {
  color: #14251d;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-text-4) {
  color: #5d7066;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-text-2) {
  color: #14251d;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.border-button-8) {
  border-color: rgba(3, 98, 66, 0.14);
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-green-1) {
  color: var(--main-color);
}

:global(html[data-theme='light']) .promotion-custom-content :deep(._component-treasure-box__grid-common_1eql6_1) {
  background-color: #f0f5f2;
  border-color: rgba(3, 98, 66, 0.12);
}

:global(html[data-theme='light']) .promotion-custom-content :deep(._tableColumn_1k2zb_1) {
  background-color: #ffffff;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.bg-layer-12) {
  background-color: #f0f5f2;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.bg-icon-5) {
  background-color: #e2e8e5;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-button-11) {
  color: #5d7066;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-primary-text) {
  color: var(--main-color);
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.border-dividers-7) {
  border-color: rgba(3, 98, 66, 0.14);
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-dividers-7) {
  color: #22332a;
}

:global(html[data-theme='light']) .promotion-custom-content :deep(.text-black-1) {
  color: #14251d;
}

.promotion-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.72rem;
  gap: 0.52rem;
}

.promotion-title img {
  display: block;
  width: 2.35rem;
  height: 2.35rem;
  flex: 0 0 2.35rem;
  border-radius: 0.43rem;
  object-fit: cover;
}

.promotion-title__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  border-radius: 0.43rem;
}

.promotion-title__svg {
  display: flex;
  align-items: center;
  justify-content: center;
}

.promotion-title__svg :deep(svg) {
  display: block;
}

:deep(.fill-tab-bar-big-button) {
  fill: var(--dark, var(--main-color));
}

.promotion-title h1 {
  margin: 0;
  color: #f6f6f6;
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1.2;
}

.promotion-title p {
  margin: 0.12rem 0 0;
  color: #a2a5a3;
  font-size: 0.58rem;
  line-height: 1.25;
}

.requirements-panel {
  margin-bottom: 0.78rem;
  padding: 0.52rem 0.55rem 0.58rem;
  border-radius: 0.42rem;
  background: #000000;
}

.requirements-panel__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.35rem;
  gap: 0.5rem;
}

.requirements-panel h2,
.requirements-panel button {
  margin: 0;
  font-size: 0.52rem;
}

.requirements-panel h2 {
  color: #f1f1f1;
  font-weight: 800;
}

.requirements-panel button {
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: 0;
  color: #888c89;
  background: transparent;
  cursor: pointer;
  gap: 0.08rem;
}

.requirements-panel ul,
.promotion-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.requirements-panel li {
  display: flex;
  align-items: center;
  min-height: 1.25rem;
  color: #d0d1d0;
  font-size: 0.54rem;
  gap: 0.34rem;
}

.requirement-check {
  display: grid;
  width: 0.66rem;
  height: 0.66rem;
  flex: 0 0 0.66rem;
  place-items: center;
  border: 1px solid #707370;
  border-radius: 50%;
  color: #ffffff;
  font-size: 0.42rem;
}

.requirement-check--complete {
  border-color: #0f8d64;
  background: #0f8d64;
}

.period-section {
  margin-bottom: 0.76rem;
}

.period-section h2,
.period-section p {
  margin: 0;
  color: #747875;
  font-size: 0.56rem;
  font-weight: 500;
  line-height: 1.35;
}

.qualifications-section,
.reward-section,
.text-section {
  margin-top: 0.8rem;
}

.qualifications-section > h2,
.reward-section h2,
.text-section h2 {
  margin: 0 0 0.5rem;
  color: #ececec;
  font-size: 0.72rem;
  font-weight: 800;
}

.qualification-table {
  overflow: hidden;
  margin: 0;
  border: 1px solid #fff;
  border-radius: 0.38rem;
}

.qualification-table > div {
  display: grid;
  min-height: 2.1rem;
  grid-template-columns: 5.2rem minmax(0, 1fr);
}

.qualification-table > div + div {
  border-top: 1px solid #fff;
}

.qualification-table dt,
.qualification-table dd {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.34rem 0.5rem;
  font-size: 0.55rem;
}

.qualification-table dt {
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  text-align: center;
  background: var(--main-color);
}

.qualification-table dd {
  justify-content: center;
  color: #d9d9d9;
  white-space: pre-line;
}

.reward-section__heading {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.28rem;
}

.reward-section__heading h2 {
  margin: 0;
}

.reward-section__heading > span {
  padding: 0.12rem 0.35rem;
  border-radius: 0.18rem;
  color: #d4f6e8;
  font-size: 0.46rem;
  background: #087653;
}

.reward-section__description,
.text-section p,
.promotion-list li {
  color: #d0d1d0;
  font-size: 0.55rem;
  line-height: 1.42;
}

.reward-section__description {
  margin: 0 0 0.72rem;
}

.reward-section__description-highlight {
  color: #10b981;
  font-weight: 700;
}

.reward-section__description--white {
  color: #ffffff;
  padding: 0.7rem 1rem;
  text-align: center;
  font-weight: 700;
}

.reward-paragraphs {
  color: #ffffff;
  font-size: 0.52rem;
  line-height: 1.35;
}

.reward-paragraphs p {
  margin: 0;
  white-space: pre-line;
}

.reward-paragraphs p + p {
  margin-top: 0.7rem;
}

.reward-linked-paragraphs {
  margin-bottom: 0.65rem;
  color: #ffffff;
  font-size: 0.52rem;
  line-height: 1.35;
}

.reward-linked-paragraphs p {
  margin: 0;
}

.reward-linked-paragraphs a {
  color: #1687ff;
  text-decoration: underline;
}

.reward-section__table-heading {
  margin: 0 0 0.45rem;
  color: #ffffff;
  font-size: 0.55rem;
  font-weight: 800;
}

.reward-callouts {
  display: flex;
  flex-direction: column;
  margin: 0.7rem 0;
  gap: 0.4rem;
}

.reward-callout {
  display: flex;
  align-items: center;
  color: #f4f4f4;
  font-size: 0.72rem;
  gap: 0.4rem;
}

.reward-callout strong {
  font-weight: 800;
}

.reward-callout span {
  padding: 0.18rem 0.38rem;
  border-radius: 0.22rem;
  color: #d9fff1;
  font-size: 0.52rem;
  background: #087653;
}

.vip-tier-cards {
  display: flex;
  flex-direction: column;
  margin-top: 0.6rem;
  gap: 0.55rem;
}

.vip-tier-card {
  display: grid;
  overflow: hidden;
  grid-template-columns: 20% minmax(0, 80%);
  border: 2px solid #429bdb;
  border-radius: 0.38rem;
  color: #ffffff;
  background: #151515;
}

.vip-tier-card__level {
  display: grid;
  min-width: 0;
  place-items: center;
  padding: 0.45rem 0.3rem;
  border-right: 1px solid #429bdb;
  font-size: 0.53rem;
  text-align: center;
}

.vip-tier-card__benefits {
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.vip-tier-card__benefits > div {
  display: grid;
  min-width: 0;
  grid-template-rows: 1fr auto;
  text-align: center;
}

.vip-tier-card__benefits > div + div {
  border-left: 1px solid #429bdb;
}

.vip-tier-card__benefits span,
.vip-tier-card__benefits strong {
  display: grid;
  place-items: center;
  padding: 0.32rem 0.2rem;
  color: #ffffff;
  font-size: 0.5rem;
  line-height: 1.25;
}

.vip-tier-card__benefits span {
  border-bottom: 1px solid #429bdb;
  font-weight: 700;
}

.method-card,
.reward-table {
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 0.38rem;
}

.method-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.7rem;
  text-align: center;
}

.method-card strong,
.reward-table__title {
  padding: 0.36rem 0.45rem;
  color: #ffffff;
  font-size: 0.54rem;
  font-weight: 800;
  text-align: center;
  background: #087653;
}

.method-card span,
.reward-table__subtitle {
  padding: 0.42rem 0.5rem;
  color: #d4d5d4;
  font-size: 0.54rem;
  text-align: center;
}

.reward-tables {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reward-table__scroller {
  overflow-x: auto;
}

.reward-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.reward-table th,
.reward-table td {
  min-width: 5.5rem;
  padding: 0.43rem 0.46rem;
  color: #d7d8d7;
  font-size: 0.53rem;
  font-weight: 500;
  text-align: center;
}

.reward-table th {
  color: #ffffff;
  font-weight: 800;
  background: #087653;
}

.reward-table tbody tr + tr,
.reward-table tbody tr:first-child {
  border-top: 1px solid #fff;
}

.reward-table td:not(:first-child) {
  color: #0ca477;
}

.reward-table__footnote {
  margin: 0;
  padding: 0.35rem 0.48rem;
  border-top: 1px solid #fff;
  color: #8e918f;
  font-size: 0.48rem;
}

.reward-table--outline .reward-table__footnote {
  padding-inline: 0;
  border-top: 0;
  color: #ffffff;
  font-style: italic;
}

.reward-table__intro {
  margin: 0 0 0.5rem;
  color: #ffffff;
  font-size: 0.52rem;
  line-height: 1.35;
}

.reward-table--outline {
  overflow: visible;
  border: 0;
}

.reward-table--outline .reward-table__scroller {
  overflow: hidden auto;
  border: 2px solid var(--reward-table-accent);
  border-radius: 0.38rem;
}

.reward-table--outline th {
  background: transparent;
}

.reward-table--outline th + th,
.reward-table--outline td + td {
  border-left: 1px solid var(--reward-table-accent);
}

.reward-table--outline tbody tr + tr,
.reward-table--outline tbody tr:first-child {
  border-top-color: var(--reward-table-accent);
}

.reward-table--outline td:not(:first-child) {
  color: #d7d8d7;
}

.reward-table .reward-table__cell--highlight {
  color: #10b981;
  font-weight: 700;
}

.reward-notes {
  margin-top: 0.55rem;
  color: #ffffff;
  font-size: 0.52rem;
  line-height: 1.35;
}

.reward-notes p {
  margin: 0;
}

.reward-after-table-paragraphs {
  margin-top: 0.7rem;
  color: #ffffff;
  font-size: 0.52rem;
  line-height: 1.35;
}

.reward-after-table-paragraphs p {
  margin: 0;
  white-space: pre-line;
}

.reward-after-table-paragraphs p + p {
  margin-top: 0.7rem;
}

.reward-table--outline .reward-table__footnote {
  padding: 0.5rem 0;
  border: 0;
  font-style: italic;
}

.promotion-list {
  margin-top: 0.65rem;
}

.promotion-list li {
  position: relative;
  padding-left: 0.54rem;
}

.promotion-list li::before {
  position: absolute;
  left: 0;
  content: '•';
}

.promotion-list--plain li {
  padding-left: 0;
  white-space: pre-line;
}

.promotion-list--plain li::before {
  content: none;
}

.text-section__stack p,
.text-section > p {
  margin: 0;
}

.text-section__stack p + p {
  margin-top: 0.1rem;
}

.promotion-terms-link {
  display: inline-block;
  margin-top: 0.8rem;
  color: #79a600;
  font-size: 0.54rem;
  text-decoration: underline;
  text-underline-offset: 0.09rem;
}

:global(html[data-theme='light']) .requirements-panel {
  background: #f0f5f2;
  border-color: rgba(3, 98, 66, 0.14);
}

:global(html[data-theme='light']) .requirements-panel h2 {
  color: #14251d;
}

:global(html[data-theme='light']) .requirements-panel li {
  color: #14251d;
}

.join-bar {
  display: flex;
  position: sticky;
  z-index: 45;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  padding: 0.38rem 0.58rem;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
}

.join-bar button {
  width: 100%;
  min-height: 2.15rem;
  border: 0;
  border-radius: 0.46rem;
  color: #ffffff;
  font-size: 0.64rem;
  font-weight: 800;
  background: #087653;
  cursor: pointer;
}

.join-bar button:hover {
  background: #0a8960;
}

@media (min-width: 64rem) {
  .promotion-banner__image--full-artwork {
    object-fit: fill;
  }

  /* Keep pasted promotion markup at the same compact density as the
     structured detail renderer. The desktop root font scales up to 24px. */
  .promotion-custom-content :deep(.text-lgx) {
    font-size: 0.82rem;
    line-height: 1.2;
  }

  .promotion-custom-content :deep(.text-lg) {
    font-size: 0.72rem;
    line-height: 0.9rem;
  }

  .promotion-custom-content :deep(.text-sm) {
    font-size: 0.55rem;
    line-height: 0.78rem;
  }

  .promotion-custom-content :deep(.text-xs) {
    font-size: 0.48rem;
    line-height: 0.68rem;
  }

  .promotion-custom-content :deep(.leading-4),
  .promotion-custom-content :deep(.leading-4_5),
  .promotion-custom-content :deep(.leading-4_75) {
    line-height: 0.78rem;
  }

  .promotion-custom-content :deep(.leading-5_25),
  .promotion-custom-content :deep(.leading-5_5),
  .promotion-custom-content :deep(.leading-6),
  .promotion-custom-content :deep(.leading-6_75),
  .promotion-custom-content :deep(.leading-7) {
    line-height: 0.9rem;
  }

  .promotion-custom-content :deep(.mt-6) {
    margin-top: 0.8rem;
  }

  .promotion-custom-content :deep(.pt-6) {
    padding-top: 0.8rem;
  }

  .promotion-custom-content :deep(.mt-4) {
    margin-top: 0.5rem;
  }

  .promotion-custom-content :deep(.mb-4) {
    margin-bottom: 0.5rem;
  }

  .promotion-custom-content :deep(.mb-1) {
    margin-bottom: 0.12rem;
  }

  .promotion-custom-content :deep(.mt-1) {
    margin-top: 0.12rem;
  }

  .promotion-custom-content :deep(.ml-3) {
    margin-left: 0.52rem;
  }

  .promotion-custom-content :deep(.gap-4) {
    gap: 0.75rem;
  }

  .promotion-custom-content :deep(.gap-2) {
    gap: 0.28rem;
  }

  .promotion-custom-content :deep(.space-y-1 > :not([hidden]) ~ :not([hidden])) {
    margin-top: 0.1rem;
  }

  .promotion-custom-content :deep(.min-w-10) {
    min-width: 40px;
  }

  .promotion-custom-content :deep(.min-h-9) {
    min-height: 36px;
  }

  .promotion-custom-content :deep(.w-30),
  .promotion-custom-content :deep(.min-w-24) {
    width: 5.2rem;
    min-width: 5.2rem;
  }

  .promotion-custom-content :deep(.py-3) {
    padding-top: 0.34rem;
    padding-bottom: 0.34rem;
  }

  .promotion-custom-content :deep(.py-2),
  .promotion-custom-content :deep(.py-2\.5) {
    padding-top: 0.36rem;
    padding-bottom: 0.36rem;
  }

  .promotion-custom-content :deep(.px-4),
  .promotion-custom-content :deep(.px-3) {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  .promotion-custom-content :deep(.pl-4) {
    padding-left: 0.7rem;
  }
}

@media (max-width: 63.99rem) {
  .join-bar {
    position: fixed;
    z-index: 50;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom));
    background: rgba(0, 0, 0, 0.95);
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .join-bar button {
    min-height: 2.6rem;
    border-radius: 0.5rem;
    font-size: 0.88rem;
    font-weight: 800;
  }

  .bonus-detail-page--with-action {
    padding-bottom: calc(4.2rem + env(safe-area-inset-bottom));
  }
}

@media (max-width: 35rem) {
  .promotion-banner {
    aspect-ratio: 3.3 / 1;
  }

  .promotion-sheet {
    padding: 0.8rem 0.68rem 0.95rem;
  }

  .promotion-title h1 {
    font-size: 1.3rem;
  }

  .promotion-title p,
  .period-section h2,
  .period-section p,
  .qualification-table dt,
  .qualification-table dd,
  .reward-section__description,
  .text-section p,
  .promotion-list li,
  .promotion-terms-link {
    font-size: 0.9rem;
  }

  .requirements-panel li,
  .method-card strong,
  .method-card span,
  .reward-table__title,
  .reward-table__subtitle,
  .reward-table th,
  .reward-table td {
    font-size: 0.9rem;
  }

  .qualification-table > div {
    grid-template-columns: 8rem minmax(0, 1fr);
  }
.reward-section__heading h2,
.qualifications-section > h2,
.reward-section h2, 
.text-section h2{
  font-size: 1.2rem;
}
  .reward-section__heading > span,
.requirements-panel h2,
.requirements-panel button {
    font-size: 0.8rem;
  }
}
</style>
