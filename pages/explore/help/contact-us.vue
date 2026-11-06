<script setup lang="ts">
useAppSeo({
  title: 'Contact Us — 24/7 Live Chat & Email Support | 2Bet',
  description: 'Need help? Contact 2Bet Philippines via 24/7 live chat, official Telegram, or support email. Our professional customer care team is always here for you.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Help', path: '/explore/help/contact-us' },
    { name: 'Contact Us', path: '/explore/help/contact-us' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact 2Bet Support',
    url: 'https://2bet.com/explore/help/contact-us',
  },
})
</script>

<template>
  <ComingSoonFallback :disable-seo="true" />
</template>
