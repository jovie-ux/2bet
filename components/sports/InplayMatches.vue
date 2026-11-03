<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import InplayMatch from './InplayMatch.vue'
import type { SportsEvent } from '~/types/sports'

const props = withDefaults(defineProps<{
  events: SportsEvent[]
  groupBySport?: boolean
}>(), {
  groupBySport: false,
})

interface SportCategory {
  key: string
  name: string
  icon: string
  events: SportsEvent[]
}

const SPORT_CATEGORIES: Record<string, Omit<SportCategory, 'events'>> = {
  basketball: { key: 'basketball', name: 'Basketball', icon: '/icons/sports/basketball.webp' },
  nba: { key: 'basketball', name: 'Basketball', icon: '/icons/sports/basketball.webp' },
  pba: { key: 'basketball', name: 'Basketball', icon: '/icons/sports/basketball.webp' },
  soccer: { key: 'soccer', name: 'Soccer', icon: '/icons/sports/soccer.webp' },
  football: { key: 'soccer', name: 'Soccer', icon: '/icons/sports/soccer.webp' },
  tennis: { key: 'tennis', name: 'Tennis', icon: '/icons/sports/tennis.webp' },
  atp: { key: 'tennis', name: 'Tennis', icon: '/icons/sports/tennis.webp' },
  wta: { key: 'tennis', name: 'Tennis', icon: '/icons/sports/tennis.webp' },
  baseball: { key: 'baseball', name: 'Baseball', icon: '/icons/sports/baseball.webp' },
  mlb: { key: 'baseball', name: 'Baseball', icon: '/icons/sports/baseball.webp' },
}

const SPORT_ORDER = ['basketball', 'soccer', 'tennis', 'baseball']

const collapsed = ref<string[]>([])
const selectedOutcomes = ref<Record<string, string>>({})
const sportType = (event: SportsEvent) => (event.sport || event.sport_key.split('_')[0] || '').toLowerCase()
const tournamentKey = (event: SportsEvent) => event.leagueId || `${event.sport_key}:${event.sport_title}`
const tournamentKeys = computed(() => [...new Set(props.events.map(tournamentKey))])
const allCollapsed = computed(() => tournamentKeys.value.length > 0 && tournamentKeys.value.every(key => collapsed.value.includes(key)))
const isExpanded = (key: string) => !collapsed.value.includes(key)
function toggleTournament(key: string) {
  collapsed.value = isExpanded(key) ? [...collapsed.value, key] : collapsed.value.filter(item => item !== key)
}
function toggleAll() {
  collapsed.value = allCollapsed.value ? [] : [...tournamentKeys.value]
}
function tournaments(events: SportsEvent[]) {
  const groups = new Map<string, { key: string; title: string; events: SportsEvent[] }>()
  for (const event of events) {
    const key = tournamentKey(event)
    const group = groups.get(key) ?? { key, title: event.sport_title, events: [] }
    group.events.push(event)
    groups.set(key, group)
  }
  return [...groups.values()]
}
defineExpose({ toggleAll, allCollapsed })

const sportCategories = computed(() => {
  if (!props.groupBySport) {
    return [{
      key: 'all',
      name: '',
      icon: '',
      events: props.events,
    }]
  }

  const categories = new Map<string, SportCategory>()

  for (const event of props.events) {
    const sport = sportType(event)
    const details = SPORT_CATEGORIES[sport] ?? {
      key: sport || 'other',
      name: sport
        ? sport.charAt(0).toUpperCase() + sport.slice(1).replaceAll('-', ' ')
        : 'Other sports',
      icon: '',
    }
    const category = categories.get(details.key) ?? { ...details, events: [] }
    category.events.push(event)
    categories.set(details.key, category)
  }

  return [...categories.values()].sort((a, b) => {
    const rank = (key: string) => {
      const index = SPORT_ORDER.indexOf(key)
      return index === -1 ? SPORT_ORDER.length : index
    }

    return rank(a.key) - rank(b.key)
  })
})
</script>

<template>
  <div class="sport-category-list min-w-0">
    <SportsCategorySection
      v-for="category in sportCategories"
      :key="category.key"
      :sport="category.key"
      :label="category.name"
      :show-banner="groupBySport"
      class="sport-category"
      :aria-label="groupBySport ? category.name : undefined"
    >
      <div class="league-matches-list">
        <article
          v-for="tournament in tournaments(category.events)"
          :key="tournament.key"
          class="league-preview"
        >
          <button
            :id="`inplay-trigger-${tournament.key}`"
            class="league-card league-preview-heading"
            type="button"
            :aria-expanded="isExpanded(tournament.key)"
            :aria-controls="`inplay-panel-${tournament.key}`"
            @click="toggleTournament(tournament.key)"
          >
            <span class="league-name truncate text-[12px] text-[#999]" :title="tournament.title">{{ tournament.title }}</span>
            <ChevronDown :size="16" class="shrink-0" :class="{ 'rotate-180': isExpanded(tournament.key) }" aria-hidden="true" />
          </button>
          <div
            v-show="isExpanded(tournament.key)"
            :id="`inplay-panel-${tournament.key}`"
            role="region"
            :aria-labelledby="`inplay-trigger-${tournament.key}`"
          >
            <InplayMatch
              v-for="event in tournament.events"
              :key="event.id"
              :match="event"
              :soccer="['soccer', 'football'].includes(sportType(event))"
              :full-markets="['basketball', 'nba', 'pba', 'baseball', 'mlb'].includes(sportType(event))"
              :selected-outcome="selectedOutcomes[event.id]"
              @select="selectedOutcomes[event.id] = selectedOutcomes[event.id] === $event ? '' : $event"
            />
          </div>
        </article>
      </div>
    </SportsCategorySection>
  </div>
</template>

<style scoped>
.sport-category-list {
  display: grid;
  gap: 22px;
}

.sport-category {
  min-width: 0;
}

.sport-category__heading {
  display: flex;
  align-items: center;
  min-height: 30px;
  margin-bottom: 8px;
  padding: 0 4px;
  color: var(--text);
  gap: 8px;
}

.sport-category__heading h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}

.sport-category__icon {
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  object-fit: contain;
}

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
