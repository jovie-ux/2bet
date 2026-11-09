<script setup lang="ts">
import { matchesSportsSelection } from '~/utils/sportsSelection'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Search } from 'lucide-vue-next'
import InplayMatches from '~/components/sports/InplayMatches.vue'
import SportsSkeleton from '~/components/sports/SportsSkeleton.vue'
import Sort from '~/components/buttons/Sort.vue'
import Collapse from '~/components/buttons/Collapse.vue'
import Ai from '~/components/buttons/Ai.vue'
import type { SportsEvent } from '~/types/sports'
import '~/assets/css/sports.css'

const props = defineProps<{
  sport?: string
}>()

const SPORT_NAMES: Record<string, string> = {
  basketball: 'Basketball',
  soccer: 'Soccer',
  tennis: 'Tennis',
  baseball: 'Baseball',
}

const selectedSports = computed(() => {
  if (props.sport && SPORT_NAMES[props.sport]) {
    return [SPORT_NAMES[props.sport]]
  }
  return ['Basketball', 'Soccer', 'Tennis', 'Baseball']
})

const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const { translate } = useSiteLocale()

const search = ref('')
const sortBy = ref<'league' | 'time'>('time')
const matchList = ref<InstanceType<typeof InplayMatches> | null>(null)

const { data, status, error, refresh } = await useFetch('/api/sports', {
  query: { mode: 'inplay' },
})
const liveEvents = computed(() => data.value?.events ?? [])
let refreshTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  refreshTimer = setInterval(() => { if (status.value !== 'pending') void refresh() }, 30000)
})
onBeforeUnmount(() => clearInterval(refreshTimer))

const filteredEvents = computed(() => {
  const q = search.value.toLowerCase().trim()
  let list = liveEvents.value.filter((event: SportsEvent) => matchesSportsSelection(event, selectedSports.value))

  if (q) {
    list = list.filter((event: SportsEvent) => {
      const details = `${event.home_team ?? ''} ${event.away_team ?? ''} ${event.sport_title ?? ''}`.toLowerCase()
      return details.includes(q)
    })
  }

  return [...list].sort((a, b) => {
    if (sortBy.value === 'league') {
      const leagueCompare = (a.sport_title ?? '').localeCompare(b.sport_title ?? '')
      if (leagueCompare !== 0) {
        return leagueCompare
      }
    }
    return new Date(b.commence_time).getTime() - new Date(a.commence_time).getTime()
  })
})
</script>

<template>
  <div class="results" :aria-busy="status === 'pending'">
    <div class="inplay-tab">
      <!-- Toolbar identical to Inplay tab -->
      <div class="toolbar">
        <span class="sports-mobile-only">
          <Ai :to="bybetRedirectUrl" title="Smart Pick AI" />
        </span>
        <SportsMobileSportsRoulette />
        <label class="search">
          <span class="search-icons">
            <Search :size="16" aria-hidden="true" />
          </span>
          <input
            v-model="search"
            type="search"
            :placeholder="translate('Search league or team')"
            :aria-label="translate('Search league or team')"
          >
        </label>

        <Sort
          v-model="sortBy"
        />

        <Collapse
          :model-value="matchList?.allCollapsed ?? false"
          :title="translate('Collapse all matches')"
          @toggle="matchList?.toggleAll()"
        />
      </div>

      <!-- Loading State -->
      <SportsSkeleton v-if="status === 'pending' && !data" />

      <!-- Error State -->
      <div v-else-if="error" class="empty" role="alert">
        <h2>{{ translate('Unable to load inplay matches') }}</h2>
        <p>{{ translate('Live sports data is temporarily unavailable. Please try again.') }}</p>
        <button type="button" @click="refresh()">
          {{ translate('Try again') }}
        </button>
      </div>

      <!-- Live Matches List using InplayMatches -->
      <InplayMatches
        v-else-if="filteredEvents.length"
        ref="matchList"
        :events="filteredEvents"
        :group-by-sport="!props.sport"
      />

      <!-- Empty State -->
      <div v-else class="empty" role="status">
        <img
          src="/images/empty/no-events.webp"
          :alt="translate('No Live Streaming')"
          class="h-auto w-full max-w-[200px] object-contain"
        />
        <h2>{{ translate('No Live Streaming') }}</h2>
        <p>{{ translate('No live streaming matches available right now. Check back later.') }}</p>
      </div>
    </div>
  </div>
</template>

