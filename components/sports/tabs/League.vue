<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { ChevronDown, Search, Trophy } from 'lucide-vue-next'
import LeagueMatches from '~/components/sports/LeagueMatches.vue'
import Sort from '~/components/buttons/Sort.vue'
import Collapse from '~/components/buttons/Collapse.vue'
import Ai from '~/components/buttons/Ai.vue'
import SportsSkeleton from '~/components/sports/SportsSkeleton.vue'
import type { Sport } from '~/types/sports'

const props = withDefaults(defineProps<{
  filteredSports?: Sport[]
  sports?: Sport[]
  groups?: string[]
  sortBy?: 'league' | 'time'
  collapsedTournaments?: string[]
  aiTo?: string
  maxMatchesPerGroup?: number
  matchLimitPerTournament?: number
  hideSportTitle?: boolean
  loading?: boolean
}>(), {
  sortBy: 'league',
  matchLimitPerTournament: 2,
  loading: false,
})

const emit = defineEmits<{
  'update:collapsedTournaments': [keys: string[]]
  'update:sortBy': [val: 'league' | 'time']
  toggle: [key: string]
}>()

const search = ref('')
const { translate } = useSiteLocale()
const sportsRouteBase = useSportsRouteBase()
const localSortBy = ref<'league' | 'time'>(props.sortBy)
const localCollapsed = ref<string[]>([])
const earliestTimes = ref<Record<string, number>>({})
const matchCounts = ref<Record<string, number>>({})

const currentSort = computed({
  get: () => localSortBy.value,
  set: (val: 'league' | 'time') => {
    localSortBy.value = val
    emit('update:sortBy', val)
  },
})

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

const collapsedList = computed({
  get: () => props.collapsedTournaments ?? localCollapsed.value,
  set: (val: string[]) => {
    localCollapsed.value = val
    emit('update:collapsedTournaments', val)
  },
})

const isExpanded = (key: string): boolean => {
  return !collapsedList.value.includes(key)
}

const toggleTournament = (key: string): void => {
  emit('toggle', key)
  if (collapsedList.value.includes(key)) {
    collapsedList.value = collapsedList.value.filter(item => item !== key)
    return
  }

  collapsedList.value = [...collapsedList.value, key]
}

const effectiveSports = computed(() => {
  const base = props.sports ?? props.filteredSports ?? []
  const q = search.value.toLowerCase().trim()
  if (!q) {
    return base
  }
  return base.filter((sport) => {
    const details = `${sport.title} ${sport.group} ${sport.description}`.toLowerCase()
    return details.includes(q)
  })
})

const matchLimit = (sport: Sport): number => {
  if (props.maxMatchesPerGroup == null) return props.matchLimitPerTournament
  let remaining = props.maxMatchesPerGroup
  for (const tournament of getGroupTournaments(sport.group)) {
    if (tournament.key === sport.key) return Math.max(0, Math.min(2, remaining))
    // Resolve one visible tournament at a time before spending on the next.
    if (!isExpanded(tournament.key)) continue
    if (matchCounts.value[tournament.key] == null) return 0
    remaining -= Math.min(2, matchCounts.value[tournament.key] ?? 0)
  }
  return 0
}
const visibleSports = computed(() => effectiveSports.value.filter(sport =>
  matchCounts.value[sport.key] !== 0 && matchLimit(sport) > 0,
))

const allCollapsed = computed(() => {
  return visibleSports.value.length > 0
    && visibleSports.value.every(sport => collapsedList.value.includes(sport.key))
})

const toggleCollapseAll = (): void => {
  if (allCollapsed.value) {
    collapsedList.value = []
  } else {
    collapsedList.value = visibleSports.value.map(sport => sport.key)
  }
}

const handleMatchLoaded = (payload: { sportKey: string; earliestTime: number | null; count: number }): void => {
  matchCounts.value[payload.sportKey] = payload.count
  if (payload.earliestTime != null) {
    earliestTimes.value[payload.sportKey] = payload.earliestTime
  }
}

const getGroupTournaments = (group: string): Sport[] => {
  const sports = effectiveSports.value.filter(item => (item.country === group || item.group === group))

  if (currentSort.value === 'time') {
    return [...sports].sort((a, b) => {
      const timeA = earliestTimes.value[a.key] ?? Number.MAX_SAFE_INTEGER
      const timeB = earliestTimes.value[b.key] ?? Number.MAX_SAFE_INTEGER
      if (timeA !== timeB) {
        return timeA - timeB
      }
      return a.title.localeCompare(b.title)
    })
  }

  return [...sports].sort((a, b) => a.title.localeCompare(b.title))
}

const sortedGroups = computed(() => {
  const baseGroups = props.groups && props.groups.length > 0
    ? props.groups.filter(g => effectiveSports.value.some(s => s.group === g || s.country === g))
    : Array.from(new Set(effectiveSports.value.map(s => s.country || s.group)))

  if (currentSort.value !== 'time') {
    return baseGroups
  }

  return [...baseGroups].sort((groupA, groupB) => {
    const sportsA = effectiveSports.value.filter(s => s.group === groupA || s.country === groupA)
    const sportsB = effectiveSports.value.filter(s => s.group === groupB || s.country === groupB)
    const minA = Math.min(...sportsA.map(s => earliestTimes.value[s.key] ?? Number.MAX_SAFE_INTEGER))
    const minB = Math.min(...sportsB.map(s => earliestTimes.value[s.key] ?? Number.MAX_SAFE_INTEGER))
    return minA - minB
  })
})
</script>

<template>
  <div class="league-tab">
    <div v-if="sportsRouteBase !== '/explore/sports/popular'" class="toolbar">
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
          :placeholder="translate('Search tournaments')"
          :aria-label="translate('Search tournaments')"
        >
      </label>
      <!-- Collapse all / Expand all button -->
      <Collapse
        :model-value="allCollapsed"
        @toggle="toggleCollapseAll"
      />
    </div>

    <SportsSkeleton v-if="loading" />

    <template v-else-if="visibleSports.length">
      <SportsCategorySection
        v-for="group in sortedGroups"
        v-show="visibleSports.some(sport => sport.group === group)"
        :key="group"
        :sport="group"
        :label="group"
        :show-banner="!hideSportTitle"
        class="league-group"
      >
        <div class="league-matches-list">
          <article
            v-for="sport in getGroupTournaments(group)"
            v-show="matchCounts[sport.key] !== 0 && matchLimit(sport) > 0"
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
                {{ sport.title }} {{ sport.description || sport.group }}
              </span>
              <CollapseIcon :expanded="isExpanded(sport.key)" />
            </button>
            <div
              v-show="isExpanded(sport.key)"
              :id="`league-panel-${sport.key}`"
              role="region"
              :aria-labelledby="`league-trigger-${sport.key}`"
            >
              <LeagueMatches
                v-if="isExpanded(sport.key) && matchCounts[sport.key] !== 0 && matchLimit(sport) > 0"
                :sport-key="sport.key"
                :limit="matchLimit(sport)"
                :sort-by="currentSort"
                @loaded="handleMatchLoaded"
              />
            </div>
          </article>
        </div>
      </SportsCategorySection>
    </template>
    <div
      v-else
      class="empty"
    >
      <img
        src="/images/empty/no-events.webp"
        :alt="translate('No leagues found')"
        class="h-auto w-full max-w-[200px] object-contain"
      />
      <h2>{{ translate('No leagues found') }}</h2>
      <p>{{ translate('Try searching for a different tournament or league.') }}</p>
    </div>
  </div>
</template>

<style scoped>
.league-matches-list {
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
