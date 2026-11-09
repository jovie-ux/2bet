<script setup lang="ts">
import { Trophy, ChevronUp, Search } from 'lucide-vue-next'
import SportsSkeleton from '~/components/sports/SportsSkeleton.vue'
import type { Sport } from '~/types/sports'

const props = defineProps<{
  filteredSports: Sport[]
  groups: string[]
  aiTo?: string
  loading?: boolean
}>()

const search = ref('')
const { translate } = useSiteLocale()
const sportsRouteBase = useSportsRouteBase()

const searchedSports = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) {
    return props.filteredSports
  }
  return props.filteredSports.filter((sport) => {
    const details = `${sport.title} ${sport.group} ${sport.description ?? ''}`.toLowerCase()
    return details.includes(q)
  })
})

const searchedGroups = computed(() => {
  return props.groups.filter((group) => {
    return searchedSports.value.some(sport => sport.group === group)
  })
})

const tournamentPath = (key: string): string => {
  const [sport, ...tournament] = key.split('_')
  const base = sportsRouteBase.value || '/explore/sports/popular'
  const sportPath = base.endsWith('/popular') ? `/${sport}` : ''
  return `${base}${sportPath}/${tournament.join('-')}`
}

</script>

<template>
  <div class="outright-tab">
    <div v-if="sportsRouteBase !== '/explore/sports/popular'" class="toolbar">
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
          :placeholder="translate('Search league')"
          :aria-label="translate('Search league')"
        >
      </label>
    </div>

    <SportsSkeleton v-if="loading" />
    <SportsCategorySection
      v-for="group in loading ? [] : searchedGroups"
      :key="group"
      :sport="group"
      :label="group"
      class="league-group"
    >
      <div class="league-grid">
        <NuxtLink
          v-for="sport in searchedSports.filter(item => item.group === group)"
          :key="sport.key"
          :to="tournamentPath(sport.key)"
          class="league-card"
        >
          <span class="league-icon">
            <Trophy :size="19" aria-hidden="true" />
          </span>
          <span class="league-name">
            <strong>{{ sport.title }}</strong>
            <small>{{ sport.description || sport.group }}</small>
          </span>
          <ChevronUp :size="16" aria-hidden="true" />
        </NuxtLink>
      </div>
    </SportsCategorySection>
    <div v-if="!loading && !searchedSports.length" class="empty">
      <img
        src="/images/empty/no-events.webp"
        :alt="translate('No tournaments found')"
        class="h-auto w-full max-w-[200px] object-contain"
      />
      <h2>{{ translate('No tournaments found') }}</h2>
      <p>{{ translate('No available tournaments match your tournament list and search.') }}</p>
    </div>
  </div>
</template>
