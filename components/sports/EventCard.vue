<script setup lang="ts">
import WinnerMatch from './WinnerMatch.vue'
import type { SportsEvent } from '~/types/sports'

const props = defineProps<{
  event: SportsEvent
}>()

// Live catalogs use provider league IDs, so retain their sport separately.
const sport = computed(() => (props.event.sport || props.event.sport_key.split('_')[0] || '').toLowerCase())
const isSoccer = computed(() => ['soccer', 'football'].includes(sport.value))
const fullMarkets = computed(() => ['basketball', 'nba', 'pba', 'baseball', 'mlb'].includes(sport.value))
const selectedOutcome = ref('')
const sportsRouteBase = useSportsRouteBase()
</script>

<template>
  <WinnerMatch
    :key="event.id"
    :match="event"
    :soccer="isSoccer"
    :full-markets="fullMarkets"
    :selected-outcome="selectedOutcome"
    :compact="sportsRouteBase === '/explore/sports/popular'"
    @select="selectedOutcome = selectedOutcome === $event ? '' : $event"
  />
</template>
