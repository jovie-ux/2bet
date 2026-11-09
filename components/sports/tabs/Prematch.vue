<script setup lang="ts">
import { ref, computed, defineComponent, h } from 'vue'
import { ChartNoAxesCombined, ChevronDown, Search } from 'lucide-vue-next'
import EventCard from '~/components/sports/EventCard.vue'
import SportsSkeleton from '~/components/sports/SportsSkeleton.vue'
import Ai from '~/components/buttons/Ai.vue'
import Collapse from '~/components/buttons/Collapse.vue'
import Sort from '~/components/buttons/Sort.vue'
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
const route = useRoute()
const { translate } = useSiteLocale()
const sportsRouteBase = useSportsRouteBase()
const isPopular = computed(() => sportsRouteBase.value === '/explore/sports/popular')
const oddsCols = computed<2 | 3>(() => route.params.sport === 'soccer' ? 3 : 2)
const selectedDate = ref('all')
watch(() => route.params.date, value => {
  const [month, day, year] = String(value ?? '').split('-')
  selectedDate.value = year ? `${year}-${month}-${day}` : 'all'
}, { immediate: true })

function selectDate(value: string) {
  selectedDate.value = value
  if (!sportsRouteBase.value) return
  const [year, month, day] = value.split('-')
  const path = `${sportsRouteBase.value}/pre-match` + (value === 'all' ? '' : `/${month}-${day}-${year}`)
  void navigateTo({ path, query: route.query })
}
const now = useState('prematch-date-filter-now', () => Date.now())
const dateKey = (value: number) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(value)
const dateFilters = computed(() => {
  const today = new Date(`${dateKey(now.value)}T00:00:00+08:00`).getTime()
  return Array.from({ length: 7 }, (_, offset) => {
    const date = today + offset * 24 * 60 * 60 * 1000
    return {
      key: dateKey(date),
      date: new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', day: 'numeric', month: 'short' }).format(date),
      label: offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', weekday: 'short' }).format(date),
    }
  })
})
let dateTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  now.value = Date.now()
  dateTimer = setInterval(() => { now.value = Date.now() }, 60000)
})
onBeforeUnmount(() => clearInterval(dateTimer))
watch(dateFilters, filters => {
  if (!route.params.date && selectedDate.value !== 'all' && !filters.some(filter => filter.key === selectedDate.value)) selectedDate.value = 'all'
})
const localCollapsed = ref<string[]>([])
const earliestTimes = ref<Record<string, number>>({})
const sortBy = ref<'league' | 'time'>('time')

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
  const q = search.value.toLowerCase().trim()
  const list = props.events.filter((event: SportsEvent) => {
    const start = Date.parse(event.commence_time)
    if (!Number.isFinite(start) || start <= now.value || event.completed) return false
    if (selectedDate.value !== 'all' && dateKey(start) !== selectedDate.value) return false
    const details = `${event.home_team ?? ''} ${event.away_team ?? ''} ${event.sport_title ?? ''}`.toLowerCase()
    return !q || details.includes(q)
  })

  return list.sort((a, b) => {
    if (sortBy.value === 'league') {
      const leagueCompare = (a.sport_title ?? '').localeCompare(b.sport_title ?? '')
      if (leagueCompare !== 0) return leagueCompare
    }
    return Date.parse(a.commence_time) - Date.parse(b.commence_time)
  })
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
  <div class="prematch-tab" :class="{ 'flex flex-col gap-2': isPopular }">
    <div v-if="!isPopular" class="toolbar">
      <Ai
        v-if="aiTo"
        :to="aiTo"
        title="Smart Pick AI"
      />

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
        :model-value="allCollapsed"
        :title="translate('Collapse all matches')"
        @toggle="toggleCollapseAll"
      />
      
    </div>
    <div class="sports-date-filters flex flex-wrap gap-1" :class="{ 'mb-4': !isPopular }" role="group" :aria-label="translate('Filter upcoming matches by date')">
      <button
        type="button"
        class="time-filter min-h-[44px] min-w-[64px] rounded-md px-3 py-1 text-[12px] font-medium text-white"
        :class="selectedDate === 'all' ? 'bg-[var(--main-highlight)]' : 'bg-[#1a1a1a]'"
        :aria-pressed="selectedDate === 'all'"
        @click="selectDate('all')"
      >{{ translate('All') }}</button>
      <button
        v-for="filter in dateFilters"
        :key="filter.key"
        type="button"
        class="time-filter flex min-h-[44px] min-w-[64px] flex-col items-center justify-center rounded-md px-3 py-1 text-[12px] font-medium text-white"
        :class="selectedDate === filter.key ? 'bg-[var(--main-highlight)]' : 'bg-[#1a1a1a]'"
        :aria-pressed="selectedDate === filter.key"
        :aria-label="`${filter.date}, ${translate(filter.label)}`"
        @click="selectDate(filter.key)"
      >
        <span>{{ filter.date }}</span>
        <span>{{ translate(filter.label) }}</span>
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

    <div v-else class="empty" role="status">
      <img
        src="/images/empty/no-events.webp"
        :alt="translate('No pre-match events')"
        class="h-auto w-full max-w-[200px] object-contain"
      />
      <h2>{{ translate('No pre-match events') }}</h2>
      <p>{{ translate('Try another date or check back later.') }}</p>
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
