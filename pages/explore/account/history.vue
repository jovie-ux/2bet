<script setup lang="ts">
useAppSeo({
  title: 'Histórico de Transações, Apostas e Giros Recentes | 2bet',
  description: 'Consulte seu histórico de apostas, giros em caça-níqueis e movimentações financeiras na 2bet Brasil com relatórios detalhados em tempo real.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Minha Conta', path: '/account/me' },
    { name: 'Histórico', path: '/account/history' },
  ],
})
</script>

<template>
  <ComingSoonFallback :disable-seo="true" />
</template>
