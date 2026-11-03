<script setup lang="ts">
import type { SportsEvent } from '~/types/sports'
import { sportsTimeRange } from '~/utils/sportsTimeRange'
import { matchesSportsSelection } from '~/utils/sportsSelection'
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl
import {
  Trophy,
  Radio,
  CalendarDays,
  ChartNoAxesCombined,
  Sparkles,
  Flag,
  RefreshCw,
} from 'lucide-vue-next'

import LeagueDirectory from './sports/LeagueDirectory.vue'
import MobileSportsNav from './sports/MobileSportsNav.vue'
import League from './sports/tabs/League.vue'
import Inplay from './sports/tabs/Inplay.vue'
import Upcoming from './sports/tabs/Upcoming.vue'
import Prematch from './sports/tabs/Prematch.vue'
import SmartPick from './sports/tabs/SmartPick.vue'
import Replay from './sports/tabs/Replay.vue'
import Outright from './sports/tabs/Outright.vue'
import OutrightInner from './sports/tabs/OutrightInner.vue'
import '~/assets/css/sports.css'
import '~/assets/css/sports-popular.css'

const props = withDefaults(defineProps<{
  selectedSports: string[]
  popularLeagues?: string[]
  selectedTournaments?: Record<string, string[]>
  initialTab?: string
}>(), {
  selectedTournaments: () => ({}),
})

const route = useRoute()
const sportsRouteBase = useSportsRouteBase()
const isPopular = computed(() => sportsRouteBase.value === '/explore/sports/popular')

const tabs = [
  { key: 'league', label: 'League', icon: Trophy },
  { key: 'inplay', label: 'In-Play', icon: Radio },
  { key: 'upcoming', label: 'Upcoming', icon: CalendarDays },
  { key: 'prematch', label: 'Pre-Match', icon: ChartNoAxesCombined },
  { key: 'smart-pick', label: 'Smart Pick', icon: Sparkles },
  { key: 'replay', label: 'Replay', icon: Radio },
  { key: 'outright', label: 'Outright', icon: Flag },
] as const

const visibleTabs = computed(() => tabs.filter(tab => {
  if (isPopular.value) return !['inplay', 'replay'].includes(tab.key)
  return sportsRouteBase.value === '/explore/sports/soccer' || tab.key !== 'replay'
}))

const tabLabel = (tab: typeof tabs[number]): string => {
  if (tab.key === 'smart-pick' && sportsRouteBase.value !== '/explore/sports/popular') {
    return 'Parlay'
  }

  return tab.label
}

const tournamentSlug = computed(() => {
  if (route.params.tournament) return String(route.params.tournament)
  const segment = String(route.params.tab ?? '')
  const tab = segment === 'pre-match' ? 'prematch' : segment
  return route.params.sport && segment && !tabs.some(item => item.key === tab) ? segment : ''
})
const isOutrightDetail = computed(() => Boolean(route.params.sport && tournamentSlug.value))

const tournamentKey = computed(() => {
  const tournament = tournamentSlug.value.replaceAll('-', '_')
  return `${route.params.tournamentSport ?? route.params.sport}_${tournament}`
})

const activeTab = computed(() => {
  if (isOutrightDetail.value) {
    return 'outright'
  }

  if (sportsRouteBase.value) {
    return route.params.tab === 'pre-match' ? 'prematch' : String(route.params.tab ?? props.initialTab ?? 'league')
  }

  const queryTab = typeof route.query.tab === 'string' ? route.query.tab : undefined
  if (queryTab) {
    return queryTab === 'pre-match' ? 'prematch' : queryTab
  }

  return props.initialTab ?? 'league'
})

const tabPath = (key: string): string => {
  const slug = key === 'prematch' ? 'pre-match' : key
  if (sportsRouteBase.value) {
    return `${sportsRouteBase.value}/${slug}`
  }
  return `${route.path}?tab=${slug}`
}

const redirectsToByBet = (key: string): boolean => key === 'smart-pick' || key === 'outright'

const selectedSport = ref('')
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined



const {
  data: leagues,
  status: leagueStatus,
  error: leagueError,
  refresh: refreshLeagues,
} = useFetch('/api/sports', {
  query: { mode: 'league' },
})

const availableSports = computed(() => {
  const showOutrights = activeTab.value === 'outright'
  const sports = leagues.value?.sports ?? []

  return sports.filter((sport) => {
    if (!sport.active || sport.has_outrights !== showOutrights) {
      return false
    }

    if (!props.selectedSports.includes(sport.group)) {
      return false
    }

    const tournamentKeys = props.selectedTournaments[sport.group] ?? []
    const matchesTournament = tournamentKeys.length === 0 || tournamentKeys.some((key) => {
      if (key.endsWith('*')) return sport.key.startsWith(key.slice(0, -1))
      return sport.key === key || (sport.has_outrights && sport.key.startsWith(`${key}_`))
    })
    if (!matchesTournament) return false

    return !isOutrightDetail.value
      || sport.key === tournamentKey.value
      || sport.key.startsWith(`${tournamentKey.value}_`)
  })
})

const tournamentTitle = computed(() => {
  const tournament = leagues.value?.sports.find(sport => sport.key === tournamentKey.value)
  return tournament?.title ?? String(route.params.tournament ?? '').replaceAll('-', ' ').toUpperCase()
})



watch(availableSports, (sports) => {
  const requestedSport = typeof route.query.sport === 'string' ? route.query.sport : ''

  if (sports.some(sport => sport.key === requestedSport)) {
    selectedSport.value = requestedSport
    return
  }

  const hasSelectedSport = sports.some(sport => sport.key === selectedSport.value)

  if (!hasSelectedSport) {
    selectedSport.value = sports[0]?.key ?? ''
  }
}, { immediate: true })

const useOddsApi = String(useRuntimeConfig().public.useOddsApi) === 'true'
const usesLiveCatalog = computed(() => activeTab.value === 'inplay' && useOddsApi)
const usesMultipleLeagues = computed(() => ['upcoming', 'prematch'].includes(activeTab.value))
const fixtureSportKeys = computed(() => availableSports.value.map(sport => sport.key))
const canLoadFixtures = computed(() => usesLiveCatalog.value || (usesMultipleLeagues.value ? fixtureSportKeys.value.length > 0 : Boolean(selectedSport.value)))

const fixtureWindowNow = useState('sports-fixture-window-now', () => Math.floor(Date.now() / 60000) * 60000)

const query = computed(() => ({
  ...sportsTimeRange(activeTab.value, typeof route.params.date === 'string' ? route.params.date : undefined, typeof route.params.hours === 'string' ? route.params.hours : undefined, fixtureWindowNow.value),
  mode: activeTab.value,
  sport: usesLiveCatalog.value || usesMultipleLeagues.value ? undefined : selectedSport.value,
  sports: usesMultipleLeagues.value ? fixtureSportKeys.value.join(',') : undefined,
}))

const isFixtureTab = computed(() => {
  return !['league', 'smart-pick', 'replay', 'outright'].includes(activeTab.value)
})

const {
  data: fixtures,
  status: fixtureStatus,
  error: fixtureError,
  execute: loadFixtures,
} = useFetch('/api/sports', {
  query,
  immediate: isFixtureTab.value && canLoadFixtures.value,
  watch: false,
})

watch(query, () => {
  fixtures.value = null

  if (isFixtureTab.value && canLoadFixtures.value) {
    void loadFixtures()
  }
})

// Every tab and tournament detail uses the same configured selection.
const filteredSports = availableSports

const groups = computed(() => {
  return props.selectedSports.filter((group) => {
    return filteredSports.value.some(sport => sport.group === group)
  })
})

const outrightRefreshVersion = ref(0)

const inplayEvents = computed(() => {
  return (fixtures.value?.events ?? [])
    .filter((event: SportsEvent) => {
      const start = new Date(event.commence_time).getTime()
      if (event.completed) return false
      if (!usesLiveCatalog.value) return Boolean(event.scores && start <= now.value)
      return matchesSportsSelection(event, props.selectedSports, props.selectedTournaments)
    })
    .sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time))
})

const upcomingEvents = computed(() => {
  return (fixtures.value?.events ?? [])
    .filter((event: SportsEvent) => {
      const start = new Date(event.commence_time).getTime()
      return start > now.value
    })
    .sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time))
})

const prematchEvents = computed(() => {
  return (fixtures.value?.events ?? [])
    .filter((event: SportsEvent) => {
      const start = new Date(event.commence_time).getTime()
      return start > now.value
    })
    .sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time))
})

const loading = computed(() => {
  return leagueStatus.value === 'pending'
    || (isFixtureTab.value && fixtureStatus.value === 'pending')
})

const error = computed(() => {
  return leagueError.value || (isFixtureTab.value ? fixtureError.value : null)
})

const selectTab = (key: string): void => {
  void navigateTo(tabPath(key))
}

const refresh = (): void => {
  now.value = Date.now()

  if (activeTab.value === 'outright') {
    void refreshLeagues()
    outrightRefreshVersion.value += 1
    return
  }

  if (leagueError.value || !isFixtureTab.value) {
    void refreshLeagues()
  } else if (canLoadFixtures.value) {
    void loadFixtures()
  }
}

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
    if (usesLiveCatalog.value && fixtureStatus.value !== 'pending') void loadFixtures()
  }, 30000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <section class="sports-page" :class="{ 'sports-page--popular': isPopular }">
    <div class="sports-navigation">
      <MobileSportsNav />
      <nav
        class="sports-tabs bg-[#1f1f1f]/95"
        aria-label="Sports categories"
      >
        <NuxtLink
          v-for="tab in visibleTabs"
          :key="tab.key"
          :to="redirectsToByBet(tab.key) ? bybetRedirectUrl : tabPath(tab.key)"
          :external="redirectsToByBet(tab.key)"
          :class="{ selected: activeTab === tab.key }"
          :aria-current="activeTab === tab.key ? 'page' : undefined"
        >
          {{ tabLabel(tab) }}
        </NuxtLink>
      </nav>
    </div>

    <div
      class="results"
      :aria-busy="loading"
    >
      <SmartPick
        v-if="activeTab === 'smart-pick'"
        @explore="selectTab('league')"
      />
      <Replay v-else-if="activeTab === 'replay'" />
      <div
        v-else-if="error"
        class="empty"
        role="alert"
      >
        <h2>Unable to load sports</h2>
        <p>Sports data is temporarily unavailable. Please try again.</p>
        <button
          type="button"
          @click="refresh"
        >
          Try again
        </button>
      </div>
      <LeagueDirectory
        v-else-if="activeTab === 'league' && sportsRouteBase !== '/explore/sports/popular'"
        :sports="availableSports"
        :popular-leagues="popularLeagues"
        :ai-to="bybetRedirectUrl"
        :loading="loading"
      />
      <League
        v-else-if="activeTab === 'league'"
        :sports="availableSports"
        :filtered-sports="filteredSports"
        :groups="groups"
        :max-matches-per-group="sportsRouteBase === '/explore/sports/popular' ? 2 : undefined"
        :ai-to="bybetRedirectUrl"
        :loading="loading"
      />
      <Inplay
        v-else-if="activeTab === 'inplay'"
        :events="inplayEvents"
        :available-sports="availableSports"
        :selected-sport="usesLiveCatalog ? undefined : selectedSport"
        @update:selected-sport="selectedSport = $event"
        :ai-to="bybetRedirectUrl"
        :loading="loading"
      />
      <Upcoming
        v-else-if="activeTab === 'upcoming'"
        :events="upcomingEvents"
        :available-sports="availableSports"
        v-model:selected-sport="selectedSport"
        :ai-to="bybetRedirectUrl"
        :loading="loading"
      />
      <Prematch
        v-else-if="activeTab === 'prematch'"
        :events="prematchEvents"
        :available-sports="availableSports"
        v-model:selected-sport="selectedSport"
        :ai-to="bybetRedirectUrl"
        :loading="loading"
      />
      <OutrightInner
        v-else-if="activeTab === 'outright' && isOutrightDetail"
        :filtered-sports="filteredSports"
        :groups="groups"
        :refresh-version="outrightRefreshVersion"
        :ai-to="bybetRedirectUrl"
      />
      <Outright
        v-else-if="activeTab === 'outright'"
        :filtered-sports="filteredSports"
        :groups="groups"
        :ai-to="bybetRedirectUrl"
        :loading="loading"
      />
    </div>
  </section>
</template>
