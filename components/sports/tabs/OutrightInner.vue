<script setup lang="ts">
import { Trophy, ChevronUp, ChevronDown, Search } from 'lucide-vue-next'
import Ai from '~/components/buttons/Ai.vue'
import Collapse from '~/components/buttons/Collapse.vue'
import type { Sport, SportsEvent } from '~/types/sports'

const props = defineProps<{
  filteredSports: Sport[]
  groups: string[]
  aiTo?: string
  refreshVersion: number
}>()

const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`
const { translate } = useSitePreferences()
const route = useRoute()
const search = ref('')

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

const expandedOutrights = ref<string[]>([])
const outrightEvents = ref<Record<string, SportsEvent[]>>({})
const outrightLoading = ref<Record<string, boolean>>({})
const outrightErrors = ref<Record<string, string>>({})
const expandedCandidates = ref<Record<string, boolean>>({})

const commencementDates = computed(() => {
  const dates: Record<string, { value: string; label: string }> = {}
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
  for (const [key, events] of Object.entries(outrightEvents.value)) {
    const first = events.filter((event: SportsEvent) => Number.isFinite(Date.parse(event.commence_time)))
      .sort((a, b) => Date.parse(a.commence_time) - Date.parse(b.commence_time))[0]
    if (first) {
      const parts = formatter.formatToParts(new Date(first.commence_time))
      const getPart = (type: string) => parts.find(p => p.type === type)?.value ?? '00'
      const formatted = `${getPart('year')}-${getPart('month')}-${getPart('day')} ${getPart('hour')}:${getPart('minute')}:${getPart('second')}`
      dates[key] = { value: first.commence_time, label: formatted }
    }
  }
  return dates
})

const loadOutright = async (key: string): Promise<void> => {
  if (outrightLoading.value[key]) {
    return
  }

  outrightLoading.value[key] = true
  outrightErrors.value[key] = ''

  try {
    const response = await $fetch('/api/sports', {
      query: { mode: 'outright', sport: key },
    })

    outrightEvents.value[key] = response.events
  } catch {
    outrightErrors.value[key] = 'Unable to load outright odds. Please try again.'
  } finally {
    outrightLoading.value[key] = false
  }
}

const toggleOutright = (key: string): void => {
  if (expandedOutrights.value.includes(key)) {
    expandedOutrights.value = expandedOutrights.value.filter(item => item !== key)
    return
  }

  expandedOutrights.value.push(key)

  if (!outrightEvents.value[key]) {
    void loadOutright(key)
  }
}

// Fetch dates for the headings while keeping the accordions closed by default.
onMounted(() => {
  watch(() => props.filteredSports.map(sport => sport.key), keys => {
    keys.forEach(key => { if (!outrightEvents.value[key]) void loadOutright(key) })
  }, { immediate: true })
})

watch(() => route.path, () => {
  expandedOutrights.value = []
})

watch(() => props.refreshVersion, () => {
  expandedOutrights.value.forEach(key => void loadOutright(key))
})

const allCollapsed = computed(() => {
  return props.filteredSports.length > 0
    && expandedOutrights.value.length === 0
})

const toggleCollapseAll = (): void => {
  if (allCollapsed.value) {
    expandedOutrights.value = props.filteredSports.map(s => s.key)
    expandedOutrights.value.forEach(key => { if (!outrightEvents.value[key]) void loadOutright(key) })
  } else {
    expandedOutrights.value = []
  }
}
</script>

<template>
  <div class="outright-tab">
    <div class="toolbar">
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


      <Collapse
        :model-value="allCollapsed"
        :title="translate('Collapse all matches')"
        @toggle="toggleCollapseAll"
      />
    </div>

    <SportsCategorySection
      v-for="group in searchedGroups"
      :key="group"
      :sport="group"
      :label="translate(group)"
      class="league-group"
    >
      <div class="outright-list">
          <!-- <div
            class="league-card outright-trigger"
          >
            <span class="league-icon">
              <Trophy :size="19" aria-hidden="true" />
            </span>
            <span class="league-name">
              <strong>{{ sport.title }}</strong>
              <time
                v-if="commencementDates[sport.key]"
                :datetime="commencementDates[sport.key]?.value"
                class="mt-1 block text-[12px] font-normal text-[#999]"
              >{{ commencementDates[sport.key]?.label }} PHT</time>
            </span>
            <ChevronUp
              :size="16"
              class="outright-chevron"
              :class="{ 'outright-chevron--expanded': expandedOutrights.includes(sport.key) }"
              aria-hidden="true"
            />
          </div> -->
        <article
          v-for="sport in searchedSports.filter(item => item.group === group)"
          :key="sport.key"
          class="outright-accordion"
        >
          <button
            :id="`outright-trigger-${sport.key}`"
            type="button"
            class="league-card outright-trigger"
            :aria-expanded="expandedOutrights.includes(sport.key)"
            :aria-controls="`outright-panel-${sport.key}`"
            @click="toggleOutright(sport.key)"
          >
            <span class="league-icon">
              <Trophy :size="19" aria-hidden="true" />
            </span>
            <span class="league-name">
              <strong>{{ sport.title }}</strong>
              <time
                v-if="commencementDates[sport.key]"
                :datetime="commencementDates[sport.key]?.value"
                class="mt-1 block text-[12px] font-normal text-[#999]"
              >{{ translate('End Time') }} : {{ commencementDates[sport.key]?.label }}</time>
            </span>
            <ChevronUp
              :size="16"
              class="outright-chevron"
              :class="{ 'outright-chevron--expanded': expandedOutrights.includes(sport.key) }"
              aria-hidden="true"
            />
          </button>

          <div
            v-show="expandedOutrights.includes(sport.key)"
            :id="`outright-panel-${sport.key}`"
            class="outright-panel"
            role="region"
            :aria-labelledby="`outright-trigger-${sport.key}`"
            :aria-busy="outrightLoading[sport.key] || false"
          >
            <div v-if="outrightLoading[sport.key]" class="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4" role="status" :aria-label="translate('Loading outright odds')">
              <div v-for="i in 4" :key="i" class="h-10 rounded-md bg-[##141414] animate-pulse" />
            </div>
            <div v-else-if="outrightErrors[sport.key]" role="alert">
              <p class="note">{{ translate(outrightErrors[sport.key]) }}</p>
              <button type="button" class="outright-retry" @click="loadOutright(sport.key)">
                {{ translate('Try again') }}
              </button>
            </div>
            <template v-else>
              <article
                v-for="event in outrightEvents[sport.key] ?? []"
                :key="event.id"
                class="outright-market"
              >
                <h4 class="pb-1.5">{{ translate('Winner') }}</h4>
                <div
                  v-for="bookmaker in (event.bookmakers ?? []).slice(0, 1)"
                  :key="bookmaker.key"
                >
                  <div
                    v-for="market in bookmaker.markets.filter(item => item.key === 'outrights')"
                    :key="market.key"
                    class="odds outright-odds  flex flex-wrap gap-1 justify-center p"
                  >
                    <button
                      v-for="outcome in (expandedCandidates[sport.key] ? market.outcomes : market.outcomes.slice(0, 10))"
                      :key="outcome.name"
                      type="button"
                      class="text-white bg-[#232323] hover:bg-[#122F25] rounded-[8px] p-1 "
                      @click="navigateTo(bybetRedirectUrl, { external: true, open: { target: '_blank', windowFeatures: { noopener: true, noreferrer: true } } })"
                    >
                      <span class="text-[#959799]">{{ outcome.name }}</span>
                      <strong>{{ outcome.price.toFixed(2) }}</strong>
                    </button>
                  </div>
                </div>
                  <button
                    v-if="!expandedCandidates[sport.key] && (outrightEvents[sport.key]?.[0]?.bookmakers?.[0]?.markets.find(m => m.key === 'outrights')?.outcomes.length ?? 0) > 10"
                    type="button"
                    class="outright-more-btn justify-center center flex items-center gap-1 text-[#959799] font-[12px] m-auto mt-2"
                    @click="expandedCandidates[sport.key] = true"
                  >
                    <span class="text-[12px] font-normal text-[#707070]">
                      {{ translate('More') }}
                    </span>
                    <ChevronDown
                      :size="24"
                      class="outright-chevron outright-chevron--more rounded-full bg-[#252827]  p-1"
                      aria-hidden="true"
                    />
                </button>
                <p v-if="!event.bookmakers?.length" class="note">
                  {{ translate('Odds are currently unavailable.') }}
                </p>
              </article>
              <p v-if="!outrightEvents[sport.key]?.length" class="note">
                {{ translate('No outright odds are available for this tournament right now.') }}
              </p>
            </template>
          </div>
        </article>
      </div>
    </SportsCategorySection>
    <div v-if="!searchedSports.length" class="empty">
      <img
        src="/images/empty/no-events.webp"
        :alt="translate('No outright markets available')"
        class="h-auto w-full max-w-[200px] object-contain"
      />
      <h2>{{ translate('No outright markets available') }}</h2>
      <p>{{ translate('No outright markets are currently available for this tournament. Check back later.') }}</p>
    </div>
  </div>
</template>
