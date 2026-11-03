<script setup lang="ts">
import {
  faqItems,
  newGames,
  popularGames,
  providers,
  recommendedGames,
} from '~/data/homepage'

const config = useRuntimeConfig()
const siteName = computed(() => String(config.public.siteName || 'ByBet').trim())
const siteUrl = computed(() => String(config.public.siteUrl || 'https://bybet.com').replace(/\/+$/, ''))
const { translate } = useSiteLocale()

useAppSeo({
  title: 'ByBet Casino PH Slots – Big Spins, Endless Entertainment',
  description: 'Experience top-tier gaming on the ByBet Casino Ph. We provide competitive odds and a vast selection of digital casino titles for every visitor.',
  image: '/brand/bybet-logo.webp',
  includeSiteName: false,
  schema: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${siteName.value} Philippines`,
      url: `${siteUrl.value}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl.value}/explore/egames/slots?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName.value,
      url: `${siteUrl.value}/`,
      logo: `${siteUrl.value}/brand/bybet-logo.webp`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Filipino'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: translate(item.question),
        acceptedAnswer: {
          '@type': 'Answer',
          text: translate(item.answer),
        },
      })),
    },
  ]),
})

</script>

<template>
  <div class="home-page">
    <ReferenceHero />
    <ReferenceCategoryTabs />
    <ReferenceGameSection
      id="popular"
      title="Popular Slots"
      variant="popular"
      :games="popularGames"
      to="/explore/egames/slots"
    />
    <ReferenceGameSection
      id="new-releases"
      title="New Releases"
      variant="new"
      :games="newGames"
      to="/explore/egames/slots"
    />
    <ReferenceGameSection
      id="recommended"
      title="Recommended For You"
      variant="recommended"
      :games="recommendedGames"
      to="/explore/egames/slots"
    />
    <ReferenceJackpots />
    <ReferenceProviders :providers="providers" />
    <ReferencePromotions />
  <ReferenceInfo />
  </div>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .home-page {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-inline: 0.25rem;
    padding-bottom: 1.5rem;
  }
}
</style>
