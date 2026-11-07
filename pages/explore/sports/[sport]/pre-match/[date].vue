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

useAppSeo({
  title: computed(() => formatSeoTitle(`Odds Pré-Jogo de ${sportName.value} (${route.params.date}) | 2bet`)),
  description: computed(() => formatSeoDescription(`Confira as cotações pré-jogo de ${sportName.value} para ${route.params.date} na 2bet Brasil. Analise estatísticas e aposte com segurança.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: 'Pré-Jogo', path: `/explore/sports/${route.params.sport}/pre-match` },
    { name: String(route.params.date), path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Odds Pré-Jogo de ${sportName.value} em ${route.params.date} - 2bet`,
    url: `https://2bet.com${route.path}`,
    description: formatSeoDescription(`Cotações pré-jogo de ${sportName.value} e mercados esportivos para partidas em ${route.params.date} na 2bet Brasil.`),
  })),
})

definePageMeta({
  validate: route => {
    const value = String(route.params.date)
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
    if (!match) return false
    const [, month, day, year] = match
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === `${year}-${month}-${day}`
  },
})
</script>

<template>
  <SportsPopular :selected-sports="selectedSports" :selected-tournaments="selectedTournaments" initial-tab="prematch" />
</template>
