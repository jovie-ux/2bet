<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()
const { translate } = useSiteLocale()

const sportName = computed(() => {
  const s = String(route.params.sport || 'sports')
  return translate(s.charAt(0).toUpperCase() + s.slice(1))
})

const hoursLabel = computed(() => String(route.params.hours).replace('hours', ' Horas'))

useAppSeo({
  title: computed(() => formatSeoTitle(`Próximos Jogos de ${sportName.value} (${hoursLabel.value}) | 2bet`)),
  description: computed(() => formatSeoDescription(`Confira as partidas de ${sportName.value} que começam nas próximas ${hoursLabel.value} na 2bet Brasil. Garanta cotações antecipadas.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: 'Em Breve', path: `/explore/sports/${route.params.sport}/upcoming` },
    { name: hoursLabel.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Próximas Partidas de ${sportName.value} (${hoursLabel.value}) - 2bet`,
    url: `https://2bet.com${route.path}`,
    description: formatSeoDescription(`Próximas partidas de ${sportName.value} agendadas nas próximas ${hoursLabel.value} na 2bet Brasil.`),
  })),
})

definePageMeta({
  validate: route => ['1hours', '3hours', '6hours', '12hours', '24hours'].includes(String(route.params.hours)),
})
</script>

<template>
  <SportsPopular :selected-sports="selectedSports" :selected-tournaments="selectedTournaments" initial-tab="upcoming" />
</template>
