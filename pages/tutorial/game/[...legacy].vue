<script setup lang="ts">
useAppSeo({
  title: 'Guias e Regras de Jogos de Cassino para Iniciantes | 2bet',
  description: 'Consulte tutoriais detalhados de jogos de cassino na 2bet Brasil. Descubra como funcionam caça-níqueis, multiplicadores e giros grátis.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Tutoriais', path: '/tutorial' },
    { name: 'Guias de Jogos', path: '/tutorial/game' },
  ],
})

const route = useRoute()
const legacySegments = Array.isArray(route.params.legacy)
  ? route.params.legacy
  : [route.params.legacy].filter((segment): segment is string => typeof segment === 'string')

const destination = legacySegments[0] === 'tutorial'
  ? '/tutorial'
  : '/tutorial/mock-betting'

await navigateTo(destination, { redirectCode: 301, replace: true })
</script>

<template>
  <div />
</template>
