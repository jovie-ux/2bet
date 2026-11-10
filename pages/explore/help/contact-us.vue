<script setup lang="ts">
useAppSeo({
  title: 'Fale Conosco — Atendimento ao Cliente e Chat ao Vivo | 2bet',
  description: 'Entre em contato com a equipe de suporte da 2bet Brasil. Canais de atendimento disponíveis 24 horas para garantir assistência ágil e segura.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Ajuda', path: '/help/contact-us' },
    { name: 'Fale Conosco', path: '/help/contact-us' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact 2Bet Support',
    url: 'https://2bet.com/help/contact-us',
  },
})
</script>

<template>
  <ComingSoonFallback :disable-seo="true" />
</template>
