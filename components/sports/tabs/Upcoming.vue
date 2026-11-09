<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'
import { ChevronDown, Search } from 'lucide-vue-next'
import EventCard from '~/components/sports/EventCard.vue'
import SportsSkeleton from '~/components/sports/SportsSkeleton.vue'
import Collapse from '~/components/buttons/Collapse.vue'
import Sort from '~/components/buttons/Sort.vue'
import Ai from '~/components/buttons/Ai.vue'
import type { Sport, SportsEvent } from '~/types/sports'
import { getSportsCategoryKey, getSportsCategoryLabel, getSportsCategoryRank } from '~/data/sports-category-banners'

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

const search = ref('')
const { translate } = useSiteLocale()
const localCollapsed = ref<string[]>([])
const earliestTimes = ref<Record<string, number>>({})
const timeFilters = ['1hours', '3hours', '6hours', '12hours', '24hours'] as const
const route = useRoute()
const sportsRouteBase = useSportsRouteBase()
const isPopular = computed(() => sportsRouteBase.value === '/explore/sports/popular')
const oddsCols = computed<2 | 3>(() => route.params.sport === 'soccer' ? 3 : 2)
const selectedTimeFilter = ref<(typeof timeFilters)[number] | null>(null)
const sortBy = ref<'league' | 'time'>('time')

const now = useState('upcoming-filter-now', () => Date.now())
let timeFilterTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  now.value = Date.now()
  timeFilterTimer = setInterval(() => { now.value = Date.now() }, 60000)
})
onBeforeUnmount(() => clearInterval(timeFilterTimer))

const getEventStartTimestamp = (event: SportsEvent): number | null => {
  const raw = (
    (event as any).commence_time ??
    (event as any).start_time ??
    (event as any).starts_at ??
    (event as any).start ??
    (event as any).date ??
    (event as any).timestamp ??
    (event as any).startTime
  )

  if (raw == null || raw === '') {
    return null
  }

  const value = typeof raw === 'number' ? raw : Date.parse(raw)
  if (Number.isNaN(value)) {
    return null
  }

  return value
}

const isWithinTimeFilter = (event: SportsEvent, filter: (typeof timeFilters)[number] | null): boolean => {
  if (!filter) {
    return true
  }

  const startTimestamp = getEventStartTimestamp(event)
  if (startTimestamp == null) {
    return false
  }

  const hours = Number.parseInt(filter, 10)
  const lowerBound = now.value
  const upperBound = lowerBound + (hours * 60 * 60 * 1000)

  return startTimestamp > lowerBound && startTimestamp <= upperBound
}

const matchingEvents = computed(() => {
  const q = search.value.toLowerCase().trim()
  return props.events.filter((event: SportsEvent) => {
    if (event.completed) return false
    const details = `${event.home_team ?? ''} ${event.away_team ?? ''} ${event.sport_title ?? ''}`.toLowerCase()
    return !q || details.includes(q)
  })
})

const availableTimeFilters = computed(() => timeFilters.filter(filter =>
  matchingEvents.value.some((event: SportsEvent) => isWithinTimeFilter(event, filter)),
))
const displayedTimeFilters = computed(() => {
  const currentHour = typeof route.params.hours === 'string' && timeFilters.includes(route.params.hours as any)
    ? (route.params.hours as (typeof timeFilters)[number])
    : null

  let filters = isPopular.value
    ? availableTimeFilters.value.filter(filter => filter !== '1hours')
    : availableTimeFilters.value

  // When visiting a specific /upcoming/:hours subroute, always show the route's hour pill
  if (currentHour && !filters.includes(currentHour)) {
    filters = [...filters, currentHour].sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))
  }

  // If no filters have events within the time window, but we have upcoming events, show available time filters
  if (!filters.length && matchingEvents.value.length > 0) {
    filters = isPopular.value ? ['3hours', '6hours', '12hours', '24hours'] : ['1hours', '3hours', '6hours', '12hours', '24hours']
  }

  return filters
})

const syncSelectedFilter = (preferred?: (typeof timeFilters)[number] | null) => {
  const filters = displayedTimeFilters.value
  if (!filters.length) {
    selectedTimeFilter.value = null
    return
  }

  if (preferred && filters.includes(preferred)) {
    selectedTimeFilter.value = preferred
    return
  }

  if (selectedTimeFilter.value && filters.includes(selectedTimeFilter.value)) {
    return
  }

  if (isPopular.value && !route.params.hours && filters.includes('3hours')) {
    selectedTimeFilter.value = '3hours'
    return
  }

  selectedTimeFilter.value = filters[0] ?? null
}

watch(() => route.params.hours, value => {
  const match = timeFilters.find(filter => filter === value)
  syncSelectedFilter(match)
}, { immediate: true })

watch(displayedTimeFilters, () => {
  const routeMatch = timeFilters.find(filter => filter === route.params.hours)
  syncSelectedFilter(routeMatch)
})

function selectTimeFilter(value: (typeof timeFilters)[number], replace = false) {
  selectedTimeFilter.value = value
  if (!sportsRouteBase.value) return
  void navigateTo({ path: `${sportsRouteBase.value}/upcoming/${value}`, query: route.query }, { replace })
}

const CollapseIcon = defineComponent({
  props: {
    expanded: Boolean,
  },
  setup(iconProps) {
    return () => h(ChevronDown, {
      size: 16,
      class: ['league-chevron', { 'league-chevron--expanded': iconProps.expanded }],
      'aria-hidden': 'true',
    })
  },
})

const isExpanded = (key: string): boolean => {
  return !localCollapsed.value.includes(key)
}

const toggleTournament = (key: string): void => {
  if (localCollapsed.value.includes(key)) {
    localCollapsed.value = localCollapsed.value.filter(item => item !== key)
    return
  }

  localCollapsed.value = [...localCollapsed.value, key]
}

const handleMatchLoaded = (payload: { sportKey: string; earliestTime: number | null }): void => {
  if (payload.earliestTime != null) {
    earliestTimes.value[payload.sportKey] = payload.earliestTime
  }
}

const handleSportChange = (event: Event): void => {
  const target = event.target as HTMLSelectElement | null
  if (target?.value) {
    emit('update:selectedSport', target.value)
  }
}

const filteredEvents = computed(() => {
  const currentHour = typeof route.params.hours === 'string' && timeFilters.includes(route.params.hours as any)
    ? (route.params.hours as (typeof timeFilters)[number])
    : null
  const targetFilter = selectedTimeFilter.value || currentHour

  const withinFilter = targetFilter
    ? matchingEvents.value.filter((event: SportsEvent) => isWithinTimeFilter(event, targetFilter))
    : []

  // If the target filter has matches, display them.
  // If the target filter has no matches within that specific hour window,
  // but there ARE upcoming matches scheduled for this page/sport:
  // Fall back to showing all matching upcoming events so the page is never blank!
  const list = withinFilter.length > 0 ? withinFilter : matchingEvents.value

  return list.sort((a, b) => sortBy.value === 'league'
    ? a.sport_title.localeCompare(b.sport_title) || Date.parse(a.commence_time) - Date.parse(b.commence_time)
    : Date.parse(a.commence_time) - Date.parse(b.commence_time))
})

const groupedSports = computed(() => {
  const groups: Record<string, { title: string; key: string; description: string; group: string; category: string; earliestTime: number }> = {}

  filteredEvents.value.forEach((event: SportsEvent) => {
    const sportKey = event.sport_key
    const eventTime = Date.parse(event.commence_time)
    const validTime = Number.isFinite(eventTime) ? eventTime : Infinity

    if (!groups[sportKey]) {
      groups[sportKey] = {
        title: event.sport_title ?? '',
        key: sportKey,
        description: (event as any).sport_group ?? event.sport ?? '',
        group: (event as any).sport_group ?? event.sport ?? '',
        category: getSportsCategoryKey(event.sport || event.sport_key),
        earliestTime: validTime,
      }
    } else if (validTime < groups[sportKey].earliestTime) {
      groups[sportKey].earliestTime = validTime
    }
  })

  const list = Object.values(groups)
  if (sortBy.value === 'league') {
    return list.sort((a, b) => a.title.localeCompare(b.title) || a.earliestTime - b.earliestTime)
  }
  return list.sort((a, b) => a.earliestTime - b.earliestTime || a.title.localeCompare(b.title))
})

const categoryGroups = computed(() => {
  const categories = new Map<string, { key: string; label: string; sports: typeof groupedSports.value }>()

  for (const sport of groupedSports.value) {
    const category = categories.get(sport.category) ?? {
      key: sport.category,
      label: getSportsCategoryLabel(sport.category),
      sports: [],
    }
    category.sports.push(sport)
    categories.set(sport.category, category)
  }

  return [...categories.values()].sort((a, b) => getSportsCategoryRank(a.key) - getSportsCategoryRank(b.key))
})

const allCollapsed = computed(() => {
  return groupedSports.value.length > 0
    && groupedSports.value.every(sport => localCollapsed.value.includes(sport.key))
})

const toggleCollapseAll = (): void => {
  if (allCollapsed.value) {
    localCollapsed.value = []
  } else {
    localCollapsed.value = groupedSports.value.map(sport => sport.key)
  }
}
</script>

<template>
  <div class="upcoming-tab" :class="{ 'flex flex-col gap-2': isPopular }">
    <div v-if="!isPopular" class="toolbar">
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
        :model-value="allCollapsed"
        :title="translate('Collapse all matches')"
        @toggle="toggleCollapseAll"
      />
    </div>

    <div v-if="displayedTimeFilters.length" class="sports-time-filters flex flex-wrap gap-1 mb-2" aria-label="Filter upcoming matches by start time">
      <button
        v-for="filter in displayedTimeFilters"
        :key="filter"
        type="button"
        class="time-filter rounded-md  px-3 py-1 text-[12px] font-medium text-white"
        :class="selectedTimeFilter === filter ? 'bg-[var(--main-highlight)]' : 'bg-[#1a1a1a]'"
        :aria-pressed="selectedTimeFilter === filter"
        @click="selectTimeFilter(filter)"
      >
        {{ translate(filter) }}
      </button>
    </div>
    <SportsSkeleton v-if="loading" :cols="oddsCols" />

    <div v-else-if="filteredEvents.length" class="sport-category-list">
      <SportsCategorySection
        v-for="category in categoryGroups"
        :key="category.key"
        :sport="category.key"
        :label="category.label"
      >
        <div class="league-matches-list">
          <article
            v-for="sport in category.sports"
            :key="sport.key"
            class="league-preview"
          >
            <button
              :id="`league-trigger-${sport.key}`"
              class="league-card league-preview-heading"
              type="button"
              :aria-expanded="isExpanded(sport.key)"
              :aria-controls="`league-panel-${sport.key}`"
              @click="toggleTournament(sport.key)"
            >
              <span class="league-name text-[12px] text-[#999] truncate" :title="sport.title">
                {{ sport.title }} {{ sport.description }}
              </span>
              <CollapseIcon :expanded="isExpanded(sport.key)" />
            </button>
            <div
              v-show="isExpanded(sport.key)"
              :id="`league-panel-${sport.key}`"
              role="region"
              :aria-labelledby="`league-trigger-${sport.key}`"
            >
              <EventCard
                v-for="event in filteredEvents.filter(item => item.sport_key === sport.key).slice(0, 2)"
                :key="event.id"
                :event="event"
              />
            </div>
          </article>
        </div>
      </SportsCategorySection>
    </div>

    <div v-else class="empty">
      <img
        src="/images/empty/no-events.webp"
        :alt="translate('No upcoming events')"
        class="h-auto w-full max-w-[200px] object-contain"
      />
      <h2>{{ translate('No upcoming events') }}</h2>
      <p>{{ translate('Try another league or check back later.') }}</p>
    </div>
  </div>
</template>

<style scoped>
.league-matches-list {
  display: grid;
  gap: 16px;
}

.sport-category-list {
  display: grid;
  gap: 16px;
}

.league-preview {
  min-width: 0;
  overflow: hidden;
  border-radius: 10px;
  background: var(--surface);
}

.league-preview-heading {
  width: 100%;
  border: 0;
  border-radius: 0;
}

.league-preview-heading:focus-visible {
  outline-offset: -3px;
}

.league-chevron {
  flex-shrink: 0;
}

.league-chevron--expanded {
  transform: rotate(180deg);
}
</style>
