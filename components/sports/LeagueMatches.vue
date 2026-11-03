<script setup lang="ts">
import WinnerMatch from './WinnerMatch.vue'

const props = withDefaults(defineProps<{
  sportKey: string
  limit?: number
  sortBy?: 'league' | 'time'
}>(), {
  sortBy: 'league',
  limit: 2,
})

const emit = defineEmits<{
  loaded: [payload: { sportKey: string; earliestTime: number | null; count: number }]
}>()

const { data, status, error, refresh, execute } = await useFetch('/api/sports', {
  query: computed(() => ({ mode: 'league-odds', sport: props.sportKey })),
  server: false,
  immediate: false,
})

const container = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (!container.value || typeof IntersectionObserver === 'undefined') {
    void execute()
    return
  }
  observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return
    observer?.disconnect()
    void execute()
  }, { rootMargin: '150px' })
  observer.observe(container.value)
})
onBeforeUnmount(() => observer?.disconnect())

const showFullMarkets = computed(() => /^(basketball|baseball)_/.test(props.sportKey))

const isSoccer = computed(() => props.sportKey.startsWith('soccer_'))

const matches = computed(() => {
  const events = [...(data.value?.events ?? [])]
  if (props.sortBy === 'time') {
    events.sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time))
  }
  return events.slice(0, props.limit)
})

watch(() => data.value?.events, (events) => {
  if (events && events.length > 0) {
    const sorted = [...events].sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time))
    const first = sorted[0]?.commence_time ? Date.parse(sorted[0].commence_time) : null
    emit('loaded', { sportKey: props.sportKey, earliestTime: first, count: events.length })
  } else if (data.value) {
    emit('loaded', { sportKey: props.sportKey, earliestTime: null, count: 0 })
  }
}, { immediate: true })

const selectedOutcomes = ref<Record<string, string>>({})
const sportsRouteBase = useSportsRouteBase()

const selectOutcome = (eventId: string, market: string, name: string): void => {
  const key = `${eventId}:${market}`
  selectedOutcomes.value[key] = selectedOutcomes.value[key] === name ? '' : name
}

</script>

<template>
  <div ref="container" class="league-matches" :aria-busy="status === 'pending'">
    <div v-if="status === 'pending' || status === 'idle'" class="flex flex-col gap-3 p-3" role="status" aria-label="Loading matches">
      <div v-for="i in 2" :key="i" class="flex flex-col gap-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-3.5 w-8 rounded bg-[#2e3230] animate-pulse" />
            <div class="h-3.5 w-24 rounded bg-[#2e3230] animate-pulse" />
          </div>
          <div class="h-3.5 w-12 rounded bg-[#2e3230] animate-pulse" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="h-9 rounded-md bg-[#252827] animate-pulse" />
          <div class="h-9 rounded-md bg-[#252827] animate-pulse" />
        </div>
      </div>
    </div>
    <div v-else-if="error" class="match-message" role="alert">
      <p>Unable to load match odds.</p>
      <button type="button" class="retry" @click="refresh()">Try again</button>
    </div>
    <p v-else-if="!matches.length" class="match-message">No matches available right now.</p>

    <template v-else>
      <WinnerMatch
        v-for="match in matches"
        :key="match.id"
        :match="match"
        :soccer="isSoccer"
        :full-markets="showFullMarkets"
        :selected-outcome="selectedOutcomes[`${match.id}:h2h`]"
        :compact="sportsRouteBase === '/explore/sports/popular'"
        @select="selectOutcome(match.id, 'h2h', $event)"
      />
    </template>

  </div>
</template>

<style scoped>
.match-message {
  padding: 16px;
  color: var(--secondary);
  font-size: 13px;
}

.retry {
  min-height: 44px;
  padding: 8px 16px;
  border: 0;
  border-radius: 8px;
  background: var(--main-highlight);
  color: white;
}

.retry:focus-visible {
  outline: 2px solid #48daa6;
  outline-offset: 2px;
}
</style>
