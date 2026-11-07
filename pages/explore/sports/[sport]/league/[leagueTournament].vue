<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  popularLeagues?: string[]
}>()

const route = useRoute()
const { translate } = useSiteLocale()

const sportName = computed(() => {
  const s = String(route.params.sport || 'sports')
  return translate(s.charAt(0).toUpperCase() + s.slice(1))
})

const leagueName = computed(() => {
  const l = String(route.params.leagueTournament || '')
  return l.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

useAppSeo({
  title: computed(() => formatSeoTitle(`Odds em ${leagueName.value} — Linhas de Apostas | 2bet`)),
  description: computed(() => formatSeoDescription(`Aposte em partidas da ${leagueName.value} (${sportName.value}) na 2bet Brasil. Cotações competitivas, mercados ao vivo e saques rápidos.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: leagueName.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${leagueName.value} ${sportName.value} - 2bet`,
    url: `https://2bet.com${route.path}`,
    description: formatSeoDescription(`Aposte na ${leagueName.value} (${sportName.value}) na 2bet Brasil com cotações dinâmicas e mercados ao vivo.`),
  })),
})

definePageMeta({
  validate: route => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(route.params.leagueTournament)),
})
</script>

<template>
  <SportsPopular
    :selected-sports="selectedSports"
    :popular-leagues="popularLeagues"
    initial-tab="league"
  />
</template>
