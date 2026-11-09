<script setup lang="ts">
import { ref, computed } from 'vue'
import { Radio, Search } from 'lucide-vue-next'
import InplayMatches from '~/components/sports/InplayMatches.vue'
import Sort from '~/components/buttons/Sort.vue'
import Collapse from '~/components/buttons/Collapse.vue'
import Ai from '~/components/buttons/Ai.vue'
import SportsSkeleton from '~/components/sports/SportsSkeleton.vue'
import type { Sport, SportsEvent } from '~/types/sports'

const props = defineProps<{
  events: SportsEvent[]
  availableSports?: Sport[]
  selectedSport?: string
  aiTo?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:selectedSport': [sport: string]
}>()

const route = useRoute()
const { translate } = useSitePreferences()
const oddsCols = computed<2 | 3>(() => ['soccer', 'football'].includes(String(route.params.sport)) ? 3 : 2)

const search = ref('')
const sortBy = ref<'league' | 'time'>('time')
const matchList = ref<InstanceType<typeof InplayMatches> | null>(null)

const handleSportChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement | null
  if (target?.value) {
    emit('update:selectedSport', target.value)
  }
}

const filteredEvents = computed(() => {
  const q = search.value.toLowerCase().trim()
  let list = props.events

  if (props.selectedSport) {
    list = list.filter((event: SportsEvent) => event.sport_key === props.selectedSport)
  }

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
  <div class="inplay-tab">
    <div class="toolbar">
      <Ai
        v-if="aiTo"
        :to="aiTo"
        title="Smart Pick AI"
      />

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
        @toggle="matchList?.toggleAll()"
        :title="translate('Collapse all matches')"
      />
    </div>

    <SportsSkeleton v-if="loading" :cols="oddsCols" />
    <InplayMatches
      v-else-if="filteredEvents.length"
      ref="matchList"
      :events="filteredEvents"
      :group-by-sport="!route.params.sport"
    />

    <div v-else class="empty">
      <img
        src="/images/empty/no-events.webp"
        :alt="translate('No inplay events')"
        class="h-auto w-full max-w-[200px] object-contain"
      />
      <h2>{{ translate('No inplay events') }}</h2>
      <p>{{ translate('Try another league or check back later.') }}</p>
    </div>
  </div>
</template>
