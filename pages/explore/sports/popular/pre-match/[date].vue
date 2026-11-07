<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()

useAppSeo({
  title: computed(() => formatSeoTitle(`Apostas Pré-Jogo em ${route.params.date} — Cotações | 2bet`)),
  description: computed(() => formatSeoDescription(`Consulte partidas pré-jogo em ${route.params.date} na 2bet Brasil. Encontre cotações antecipadas, estatísticas de equipes e linhas completas.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: 'Pré-Jogo', path: '/explore/sports/popular/pre-match' },
    { name: String(route.params.date), path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Odds Esportivas Pré-Jogo em ${route.params.date} - 2bet`,
    url: `https://2bet.com${route.path}`,
    description: `Odds de apostas pré-jogo para partidas agendadas em ${route.params.date} na plataforma 2bet Brasil.`,
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
