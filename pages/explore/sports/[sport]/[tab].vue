<script setup lang="ts">
defineProps<{
  selectedSports: string[]
  popularLeagues?: string[]
  selectedTournaments?: Record<string, string[]>
}>()

const route = useRoute()

const sportName = computed(() => {
  const s = String(route.params.sport || 'sports')
  return s.charAt(0).toUpperCase() + s.slice(1)
})

const tabLabels: Record<string, string> = {
  league: 'Leagues',
  inplay: 'In-Play Live',
  upcoming: 'Upcoming Matches',
  'pre-match': 'Pre-Match Odds',
  'smart-pick': 'Smart Picks',
  outright: 'Outrights & Futures',
  replay: 'Match Replays',
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
      title: `${s} Leagues & Tournaments Betting Odds | 2Bet`,
      description: `Bet on top ${s} leagues and tournaments at 2Bet Philippines. Real-time point spreads, moneylines, match previews, and competitive odds.`,
    }
  }
  if (t === 'inplay') {
    return {
      title: `Live In-Play ${s} Betting & Match Odds | 2Bet`,
      description: `Bet live in-play on ongoing ${s} games at 2Bet Philippines. Instant dynamic odds, live scoring updates, and quick cash-out options.`,
    }
  }
  if (t === 'upcoming') {
    return {
      title: `Upcoming ${s} Matches & Betting Lines | 2Bet`,
      description: `View upcoming ${s} match schedules and early betting lines at 2Bet Philippines. Lock in competitive point spreads and totals early.`,
    }
  }
  if (t === 'pre-match' || t === 'prematch') {
    return {
      title: `Pre-Match ${s} Odds & Game Predictions | 2Bet`,
      description: `Analyze pre-match ${s} betting odds, team form, and game stats on 2Bet Philippines. Place informed wagers with premier market depth.`,
    }
  }
  if (t === 'smart-pick') {
    return {
      title: `Smart Pick ${s} AI Betting Tips & Picks | 2Bet`,
      description: `Get data-driven Smart Pick betting insights and AI predictions for ${s} on 2Bet Philippines. Optimize your wagering strategies today.`,
    }
  }
  if (t === 'outright') {
    return {
      title: `${s} Championship Outrights & Futures Odds | 2Bet`,
      description: `Wager on ${s} championship outrights and league winners at 2Bet Philippines. High-value future odds for top global tournaments.`,
    }
  }
  if (t === 'replay') {
    return {
      title: `${s} Match Highlights & Video Replays | 2Bet`,
      description: `Watch key ${s} match highlights and full game video replays on 2Bet Philippines. Catch up on the biggest plays and historic moments.`,
    }
  }

  return {
    title: `${tabDisplayName.value} ${s} Betting Odds & Lines | 2Bet`,
    description: `Bet on ${tabDisplayName.value} ${s} fixtures with top market odds on 2Bet Philippines. Point spreads, moneylines, totals, and prop bets.`,
  }
})

useAppSeo({
  title: computed(() => activeTabInfo.value.title),
  description: computed(() => activeTabInfo.value.description),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/explore/sports/popular' },
    { name: sportName.value, path: `/explore/sports/${route.params.sport}` },
    { name: tabDisplayName.value, path: route.path },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: activeTabInfo.value.title.replace(' | 2Bet', ''),
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
