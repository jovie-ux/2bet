<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()
const hoursLabel = computed(() => String(route.params.hours).replace('hours', ' Horas'))

useAppSeo({
  title: computed(() => formatSeoTitle(`Próximos Jogos em ${hoursLabel.value} — Cotações | 2bet`)),
  description: computed(() => formatSeoDescription(`Confira eventos esportivos com início em ${hoursLabel.value.toLowerCase()} na 2bet Brasil. Aproveite odds atualizadas, mercados dinâmicos e apostas rápidas.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: 'Em Breve', path: '/explore/sports/popular/upcoming' },
    { name: hoursLabel.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Próximas Partidas Esportivas (${hoursLabel.value}) - 2bet`,
    url: `https://2bet.com${route.path}`,
    description: `Próximos jogos esportivos começando nas próximas ${hoursLabel.value} na plataforma 2bet Brasil.`,
  })),
})

definePageMeta({
  validate: route => ['1hours', '3hours', '6hours', '12hours', '24hours'].includes(String(route.params.hours)),
})
</script>

<template>
  <SportsPopular :selected-sports="selectedSports" :selected-tournaments="selectedTournaments" initial-tab="upcoming" />
</template>
