<script setup lang="ts">
import AllGamesHomepage from '~/components/AllGamesHomepage.vue'
import { faqItems, type FaqItem } from '~/data/homepage'

const faqs = faqItems

const config = useRuntimeConfig()
const siteName = computed(() => String(config.public.siteName || '2Bet').trim())
const siteUrl = computed(() => String(config.public.siteUrl || 'https://2bet.com').replace(/\/+$/, ''))
const { translate } = useSiteLocale()

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/hero/editorial/sports.webp',
      fetchpriority: 'high',
    },
  ],
})

useAppSeo({
  title: '2Bet Cassino Online | Apostas Esportivas no Brasil',
  description: 'Aposte em esportes e jogue no cassino online da 2bet Brasil. Milhares de slots, mesas ao vivo com crupiê real e saques rápidos via PIX.',
  keywords: '2bet, cassino online, slots, apostas esportivas, cassino ao vivo, 2bet brasil',
  image: '/brand/2bet-logo.webp',
  includeSiteName: false,
  schema: computed(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${siteName.value} Brasil`,
      url: `${siteUrl.value}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl.value}/egames/slots?q={search_term_string}`,
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
        availableLanguage: ['Portuguese', 'English'],
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
