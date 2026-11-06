<script setup lang="ts">
import { History, Trash2, Gamepad2, ArrowRight } from 'lucide-vue-next'
import GameCard from '~/components/game-cards/GameCard.vue'

useAppSeo({
  title: 'E-Games History — Slots & Casino Session Logs | 2Bet',
  description: 'View your past slot rounds, bingo games, wager amounts, and win records on 2Bet. Complete transparency for all electronic gaming sessions.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'E-Games', path: '/explore/egames/slots' },
    { name: 'Game History', path: '/explore/egames/history' },
  ],
})

const { recentGames, clearRecentGames } = useRecentGames()
const { showDemoMessage } = useDemoInteraction()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl

const activeGameId = ref<string | null>(null)

const handleCardClick = (game: any): void => {
  if (activeGameId.value === game.id) {
    activeGameId.value = null
  } else {
    activeGameId.value = game.id
  }
}

const handleStartNow = (game: any): void => {
  showDemoMessage(`Starting ${game.title} (${game.provider})...`)
  if (import.meta.client) {
    window.open(game.href || bybetRedirectUrl, '_blank')
  }
}

const handleDemo = (game: any): void => {
  showDemoMessage(`Launching Demo mode for ${game.title} (${game.provider})...`)
}

const showGameDetails = (game: any): void => {
  showDemoMessage(`${game.title} (${game.provider}) — RTP: 96.8%`)
}

const handleDocumentClick = (event: MouseEvent): void => {
  const target = event.target as HTMLElement | null
  if (!target?.closest('.game-card')) {
    activeGameId.value = null
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleDocumentClick)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
  }
})
</script>

<template>
  <div class="egames-history-page w-full min-w-0 pb-16">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
      <div class="flex items-center gap-2.5">
        <div
          class="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--main-color)]"
          :style="{
            backgroundColor: 'color-mix(in srgb, var(--main-color) 20%, transparent)',
            border: '1px solid color-mix(in srgb, var(--main-color) 40%, transparent)'
          }"
        >
          <History class="h-5 w-5" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-white tracking-tight">Recent Games</h1>
          <p class="text-xs text-[#8e9491]">Games you recently played or explored</p>
        </div>
      </div>

      <button
        v-if="recentGames.length > 0"
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#202220] hover:bg-red-500/10 text-xs text-[#8e9491] hover:text-red-400 border border-white/5 transition-colors cursor-pointer select-none"
        @click="clearRecentGames"
      >
        <Trash2 class="h-3.5 w-3.5" />
        <span>Clear History</span>
      </button>
    </div>

    <!-- Games Grid -->
    <div
      v-if="recentGames.length > 0"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
    >
      <GameCard
        v-for="game in recentGames"
        :key="game.id"
        :game="game"
        :activeId="activeGameId"
        @select="handleCardClick"
        @info="showGameDetails"
        @start="handleStartNow"
        @demo="handleDemo"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="my-16 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-[#171817] p-12 text-center"
    >
      <div class="h-14 w-14 rounded-2xl bg-[#202220] flex items-center justify-center text-[#7a807d]">
        <Gamepad2 class="h-7 w-7" />
      </div>
      <h3 class="text-base font-semibold text-white">No game history yet</h3>
      <p class="text-xs text-[#8e9491] max-w-sm">
        Games you play or explore will be saved in your browser's history so you can easily return to them anytime.
      </p>
      <NuxtLink
        to="/explore/egames/slots"
        class="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--main-color)] px-5 py-2 text-xs font-bold text-white hover:bg-[#047b53] transition-colors"
      >
        <span>Explore Slots</span>
        <ArrowRight class="h-3.5 w-3.5" />
      </NuxtLink>
    </div>
  </div>
</template>
