<script setup lang="ts">
import AllGamesHomepage from '~/components/AllGamesHomepage.vue'
import { faqItems, type FaqItem } from '~/data/homepage'

const faqs = faqItems

const config = useRuntimeConfig()
const siteName = computed(() => String(config.public.siteName || 'ByBet').trim())
const siteUrl = computed(() => String(config.public.siteUrl || 'https://bybet.com').replace(/\/+$/, ''))
const { translate } = useSiteLocale()

useAppSeo({
  title: 'ByBet Casino PH Slots – Big Spins, Endless Entertainment',
  description: 'Experience top-tier gaming on the ByBet Casino Ph. We provide competitive odds and a vast selection of digital casino titles for every visitor.',
  image: '/brand/2bet-logo.webp',
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
      logo: `${siteUrl.value}/brand/2bet-logo.webp`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Filipino'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (faqItems || faqs).map((item: FaqItem) => ({
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
  <AllGamesHomepage :faqs="faqItems" />
</template>
