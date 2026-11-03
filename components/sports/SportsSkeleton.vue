<script setup lang="ts">
withDefaults(defineProps<{
  cards?: number
  matchesPerCard?: number
  cols?: 2 | 3
}>(), {
  cards: 2,
  matchesPerCard: 3,
  cols: 2,
})
</script>

<template>
  <div class="sports-skeleton flex w-full flex-col gap-4" aria-busy="true" aria-label="Loading matches">
    <article
      v-for="cardIndex in cards"
      :key="cardIndex"
      class="overflow-hidden rounded-[10px] bg-[var(--surface,#181c1a)]"
    >
      <!-- Category banner skeleton: fixed height prevents the results list from jumping. -->
      <div class="flex min-h-[46px] items-center justify-between bg-[#555] px-4 py-3">
        <div class="h-4 w-32 rounded bg-[#f5f5f5] animate-pulse" />
        <div class="h-7 w-7 rounded-full bg-[#f5f5f5] animate-pulse" />
      </div>

      <div class="flex items-center justify-between bg-[#121413] px-4 py-3">
        <div class="h-3.5 w-48 max-w-[65%] rounded bg-[#555] animate-pulse" />
        <div class="h-4 w-4 rounded bg-[#555] animate-pulse" />
      </div>

      <!-- Match rows use the same spacing as loaded EventCard rows. -->
      <div class="flex flex-col divide-y divide-white/5 bg-[#121413]">
        <div
          v-for="matchIndex in matchesPerCard"
          :key="matchIndex"
          class="flex flex-col gap-2.5 p-3 sm:px-4"
        >
          <!-- Top Row: Teams + Info -->
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <!-- Live/Time indicator skeleton -->
              <div class="h-3.5 w-10 shrink-0 rounded bg-[#555] animate-pulse" />
              <!-- Team names stacked -->
              <div class="flex flex-col gap-1.5 min-w-0">
                <div class="h-3.5 w-28 max-w-[140px] rounded bg-[#555] animate-pulse" />
                <div class="h-3.5 w-24 max-w-[120px] rounded bg-[#555] animate-pulse" />
              </div>
            </div>

            <!-- Right icons skeleton -->
            <div class="flex items-center gap-1.5 shrink-0">
              <!-- 6 dots / stats icon placeholder -->
              <div class="grid grid-cols-3 gap-0.5 p-0.5" aria-hidden="true">
                <span v-for="d in 6" :key="d" class="h-1 w-1 rounded-[1px] bg-[#555] animate-pulse" />
              </div>
              <div class="h-4 w-4 rounded bg-[#555] animate-pulse" />
              <div class="h-4 w-4 rounded bg-[#555] animate-pulse" />
              <div class="h-4 w-6 rounded-full bg-[#555] animate-pulse" />
            </div>
          </div>

          <!-- Bottom Row: Odds Buttons Skeleton -->
          <div
            class="grid gap-2"
            :class="cols === 3 ? 'grid-cols-3' : 'grid-cols-2'"
          >
            <div
              v-for="colIndex in cols"
              :key="colIndex"
              class="h-9 rounded-md bg-[#555] animate-pulse"
            />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
