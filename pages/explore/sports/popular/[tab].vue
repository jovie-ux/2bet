<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()

interface TabMeta {
  label: string
  title: string
  description: string
}

const tabMetaMap: Record<string, TabMeta> = {
  league: {
    label: 'Ligas',
    title: 'Ligas Esportivas Populares — Odds e Jogos ao Vivo | 2bet',
    description: 'Aposte nas principais ligas esportivas do mundo na 2bet Brasil. Cotações em tempo real, handicaps e mercados variados de apostas.',
  },
  inplay: {
    label: 'Ao Vivo',
    title: 'Apostas Esportivas ao Vivo — Cotações em Tempo Real | 2bet',
    description: 'Aposte ao vivo nas principais partidas na 2bet Brasil. Atualização instantânea de cotações, estatísticas e opção de cash out 24/7.',
  },
  upcoming: {
    label: 'Em Breve',
    title: 'Próximas Partidas Esportivas — Agenda e Cotações | 2bet',
    description: 'Confira a agenda de próximos eventos esportivos na 2bet Brasil. Compare cotações antecipadas em futebol, basquete, tênis e mais.',
  },
  'pre-match': {
    label: 'Pré-Jogo',
    title: 'Odds Pré-Jogo Populares e Estatísticas de Partidas | 2bet',
    description: 'Navegue pelas cotações pré-jogo mais procuradas na 2bet Brasil. Estatísticas detalhadas das maiores ligas esportivas mundiais.',
  },
  'smart-pick': {
    label: 'Smart Pick',
    title: 'Smart Pick com IA — Análises e Dicas de Apostas | 2bet',
    description: 'Acesse análises esportivas inteligentes com Smart Pick na 2bet Brasil. Previsões com IA para orientar suas decisões com dados reais.',
  },
  outright: {
    label: 'Apostas Futuras',
    title: 'Apostas Futuras — Cotações para Campeão de Torneios | 2bet',
    description: 'Aposte nos vencedores de campeonatos na 2bet Brasil. Cotações futuras de longo prazo para Champions League, Brasileirão e NBA.',
  },
}

const currentTab = computed(() => {
  const t = String(route.params.tab || 'league')
  return tabMetaMap[t] || {
    label: 'Partidas',
    title: 'Apostas Esportivas Populares — Cotações e Partidas | 2bet',
    description: 'Explore eventos esportivos populares na 2bet Brasil. Cotações vantajosas, mercados variados, cobertura ao vivo e saques ágeis via PIX.',
  }
})

useAppSeo({
  title: computed(() => currentTab.value.title),
  description: computed(() => currentTab.value.description),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/explore/sports/popular' },
    { name: currentTab.value.label, path: `/explore/sports/popular/${route.params.tab}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: currentTab.value.title.replace(' | 2bet', ''),
    url: `https://2bet.com/explore/sports/popular/${route.params.tab}`,
    description: currentTab.value.description,
  })),
})

definePageMeta({
  validate: route => ['league', 'inplay', 'upcoming', 'pre-match', 'smart-pick', 'outright'].includes(String(route.params.tab)),
})
</script>

<template>
  <SportsPopular
    :selected-sports="selectedSports"
    :selected-tournaments="selectedTournaments"
  />
</template>
