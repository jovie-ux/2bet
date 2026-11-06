<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'
import { Search } from 'lucide-vue-next'

const searchQuery = ref('')
const currentDate = new Date()
const {
  selectedTimeZone,
  setTimeZone,
  timeZone,
} = useTimeZonePreference()

useAppSeo({
  title: 'Time Zone Settings — Match Schedule Preference | 2Bet',
  description: 'Adjust your display time zone on 2Bet to ensure sports match schedules, live in-play start times, and event countdowns match your local clock.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Account', path: '/explore/account/me' },
    { name: 'Time Zone', path: '/explore/account/timezone' },
  ],
})

const filteredTimeZones = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()

  if (!query) {
    return timeZoneOptions
  }

  return timeZoneOptions.filter((option) => {
    return [option.city, option.country, option.offset, option.timeZone]
      .some(value => value.toLocaleLowerCase().includes(query))
  })
})
</script>

<template>
  <section class="preference-page timezone-page w-full min-w-0 pb-16 text-white">
    <SubpageHeader
      title="Time Zone"
      back-to="/explore/account/me"
      class="mb-2 sm:mb-3"
    />

    <div class="px-2.5 sm:px-0">
      <label class="search-box mb-2 flex min-h-[40px] items-center gap-2 rounded-xl px-3">
        <Search class="h-[18px] w-[18px] shrink-0 text-[#919694]" aria-hidden="true" />
        <span class="sr-only">Search country or city</span>
        <input
          v-model="searchQuery"
          type="search"
          class="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#919694]"
          placeholder="Search country or city"
          autocomplete="off"
        >
      </label>

      <div class="preference-list overflow-hidden rounded-xl">
        <button
          v-for="option in filteredTimeZones"
          :key="option.timeZone"
          type="button"
          class="preference-row flex w-full items-center justify-between gap-4 px-3 text-left"
          :class="{ 'preference-row--selected': timeZone === option.timeZone }"
          :aria-current="timeZone === option.timeZone ? 'true' : undefined"
          @click="setTimeZone(option.timeZone)"
        >
          <span class="min-w-0">
            <span
              class="block truncate text-[14px] leading-[18px]"
              :class="timeZone === option.timeZone ? 'font-bold text-[#20c997]' : 'text-[#f0f1f1]'"
            >
              {{ option.city }}
            </span>
            <span class="block truncate text-[12px] leading-[16px] text-[#8c918f]">
              {{ option.country }}
            </span>
          </span>
          <span class="shrink-0 text-right">
            <span
              class="block text-[14px] leading-[18px]"
              :class="timeZone === option.timeZone ? 'font-bold text-[#20c997]' : 'text-[#eceeed]'"
            >
              {{ option.offset }}
            </span>
            <span class="block text-[12px] leading-[16px] text-[#8c918f]">
              {{ formatTimeZoneDate(option.timeZone, currentDate) }}
            </span>
          </span>
        </button>

        <p v-if="filteredTimeZones.length === 0" class="px-4 py-8 text-center text-[14px] text-[#8c918f]">
          No time zones found.
        </p>
      </div>
    </div>

    <p class="sr-only" aria-live="polite">
      Selected time zone: {{ selectedTimeZone.city }}, {{ selectedTimeZone.offset }}
    </p>
  </section>
</template>

<style scoped>
.preference-page {
  min-height: calc(100vh - var(--header-height));
  background:
    linear-gradient(180deg, rgba(3, 98, 66, 0.96) 0, rgba(3, 98, 66, 0.96) 1.45rem, #000 1.45rem, #000 100%);
}

.preference-header {
  border: 1px solid rgba(255, 255, 255, 0.02);
  color: #f5f7f6;
  background: linear-gradient(180deg, #1b1e1d, #181a19);
}

.back-button {
  color: #13b982;
  background: #101413;
  transition: color 140ms ease, background-color 140ms ease;
}

.back-button:hover,
.back-button:focus-visible {
  color: #35d8a2;
  background: #242826;
  outline: none;
}

.search-box {
  border: 1px solid rgba(255, 255, 255, 0.035);
  background: #151515;
}

.search-box:focus-within {
  border-color: rgba(32, 201, 151, 0.42);
  box-shadow: 0 0 0 2px rgba(32, 201, 151, 0.08);
}

.preference-list {
  border: 1px solid rgba(255, 255, 255, 0.035);
  background: #141414;
}

.preference-row {
  min-height: 60px;
  border-bottom: 1px solid #414141;
  transition: background-color 140ms ease;
}

.preference-row:last-of-type {
  border-bottom: 0;
}

.preference-row:hover,
.preference-row:focus-visible {
  background: rgba(255, 255, 255, 0.045);
  outline: none;
}
</style>

