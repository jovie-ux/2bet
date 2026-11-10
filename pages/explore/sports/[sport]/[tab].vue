<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  popularLeagues?: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()
const { translate } = useSiteLocale()

const sportName = computed(() => {
  const s = String(route.params.sport || 'sports')
  return translate(s.charAt(0).toUpperCase() + s.slice(1))
})

const tabLabels: Record<string, string> = {
  league: 'Ligas',
  inplay: 'Ao Vivo',
  upcoming: 'Em Breve',
  'pre-match': 'Pré-Jogo',
  'smart-pick': 'Smart Pick',
  outright: 'Apostas Futuras',
  replay: 'Replays',
}

const tabDisplayName = computed(() => {
  const t = String(route.params.tab || '')
  return tabLabels[t] || t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

const activeTabInfo = computed(() => {
  const t = String(route.params.tab || 'league')
  const s = sportName.value

  if (t === 'league') {
    return {
      title: formatSeoTitle(`Ligas e Torneios de ${s} — Linhas de Apostas | 2bet`),
      description: formatSeoDescription(`Aposte nas principais ligas e torneios de ${s.toLowerCase()} na 2bet Brasil. Cotações competitivas, prévias e cobertura completa.`),
    }
  }
  if (t === 'inplay') {
    return {
      title: formatSeoTitle(`Apostas ao Vivo em ${s} — Cotações em Tempo Real | 2bet`),
      description: formatSeoDescription(`Acompanhe partidas de ${s.toLowerCase()} ao vivo na 2bet Brasil. Linhas dinâmicas em tempo real, placar atualizado e cash out rápido.`),
    }
  }
  if (t === 'upcoming') {
    return {
      title: formatSeoTitle(`Próximas Partidas de ${s} e Agenda de Jogos | 2bet`),
      description: formatSeoDescription(`Confira a programação das próximas partidas de ${s.toLowerCase()} na 2bet Brasil. Compare linhas antecipadas e garanta as melhores odds.`),
    }
  }
  if (t === 'pre-match' || t === 'prematch') {
    return {
      title: formatSeoTitle(`Odds Pré-Jogo de ${s} e Análises de Partidas | 2bet`),
      description: formatSeoDescription(`Analise as cotações pré-jogo de ${s.toLowerCase()} na 2bet Brasil. Estatísticas de equipes, retrospecto recente e mercados variados.`),
    }
  }
  if (t === 'smart-pick') {
    return {
      title: formatSeoTitle(`Smart Pick ${s} — Dicas e Previsões com IA | 2bet`),
      description: formatSeoDescription(`Receba análises inteligentes com IA para partidas de ${s.toLowerCase()} na 2bet Brasil. Informações baseadas em dados para suas decisões.`),
    }
  }
  if (t === 'outright') {
    return {
      title: formatSeoTitle(`Apostas Futuras em ${s} e Mercados de Campeão | 2bet`),
      description: formatSeoDescription(`Aposte nos campeões e vencedores de torneios de ${s.toLowerCase()} na 2bet Brasil. Cotações de longo prazo para os maiores campeonatos.`),
    }
  }
  if (t === 'replay') {
    return {
      title: formatSeoTitle(`Melhores Momentos e Vídeos de Jogos de ${s} | 2bet`),
      description: formatSeoDescription(`Assista aos melhores momentos e lances de ${s.toLowerCase()} na 2bet Brasil. Reveja jogadas marcantes antes de fazer suas apostas.`),
    }
  }

  return {
    title: formatSeoTitle(`${tabDisplayName.value} de ${s} — Linhas de Apostas | 2bet`),
    description: formatSeoDescription(`Aposte em partidas de ${s.toLowerCase()} (${tabDisplayName.value}) na 2bet Brasil com as melhores cotações e cobertura ao vivo.`),
  }
})

useAppSeo({
  title: computed(() => activeTabInfo.value.title),
  description: computed(() => activeTabInfo.value.description),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Esportes', path: '/sports/popular' },
    { name: sportName.value, path: `/sports/${route.params.sport}` },
    { name: tabDisplayName.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: activeTabInfo.value.title.replace(' | 2bet', ''),
    url: `https://2bet.com${route.path}`,
    description: activeTabInfo.value.description,
  })),
})

definePageMeta({
  // This segment accepts a tab name or an outright tournament slug.
  validate: route => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(route.params.tab)),
})
</script>

<template>
  <SportsPopular
    :selected-sports="selectedSports"
    :popular-leagues="popularLeagues"
    :selected-tournaments="selectedTournaments"
  />
</template>
