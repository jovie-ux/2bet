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

const tournamentName = computed(() => {
  const t = String(route.params.tournament || '')
  return t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

useAppSeo({
  title: computed(() => formatSeoTitle(`Apostas em ${tournamentName.value} — Cotações | 2bet`)),
  description: computed(() => formatSeoDescription(`Acompanhe e aposte em ${tournamentName.value} (${sportName.value}) na 2bet Brasil. Cotações atualizadas, mercados ao vivo e cash out rápido.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: tournamentName.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tournamentName.value} — Apostas Esportivas | 2bet`,
    url: `https://2bet.com${route.path}`,
    description: `Aposte em ${tournamentName.value} (${sportName.value}) na 2bet Brasil com cotações dinâmicas e mercados ao vivo.`,
  })),
})

definePageMeta({
  validate: (route) => {
    return ['basketball', 'soccer', 'tennis', 'baseball'].includes(String(route.params.sport))
      && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(route.params.tournament))
  },
})
</script>

<template>
  <SportsPopular
    :selected-sports="selectedSports"
    :selected-tournaments="selectedTournaments"
  />
</template>
