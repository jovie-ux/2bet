<script setup lang="ts">
import { MessageCircle, Play } from 'lucide-vue-next'
import { User } from 'lucide-vue-next'
import ReminderModal from '~/components/modals/ReminderModal.vue'
import UnderMaintenance from '~/components/modals/UnderMaintenance.vue'
import {
  LIVE_CASINO_CATEGORIES,
  LIVE_CASINO_TABLES,
  type LiveCasinoCategory,
  type LiveCasinoTable,
} from '~/data/live-casino'
import { liveCasinoGames } from '~/data/casino'

const route = useRoute()
const router = useRouter()

const pragmaticPlayLogo = '/images/casino/pragmatic-play.webp'

const activeCategory = computed(() => (route.params.category as string) || 'baccarat')

const categoryLabel = computed(() => {
  const match = LIVE_CASINO_CATEGORIES.find(c => c.key === activeCategory.value)
  return match?.label || 'Live Tables'
})

useAppSeo({
  title: computed(() => `${categoryLabel.value} Live Casino — Real Dealer Tables | ByBet`),
  description: computed(() => `Join live ${categoryLabel.value} tables on ByBet Philippines. HD streaming, professional dealers, dynamic side bets, and seamless mobile wagering 24/7.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Live Casino', path: '/explore/entertainment/live-casino/baccarat' },
    { name: categoryLabel.value, path: `/explore/entertainment/live-casino/${activeCategory.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryLabel.value} Live Casino - ByBet`,
    url: `https://bybet.com/explore/entertainment/live-casino/${activeCategory.value}`,
  })),
})

const { context: commentContext, openGameComments, closeComments } = useCommentPanel()
const { showDemoMessage } = useDemoInteraction()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

const isReminderOpen = ref(false)
const isMaintenanceOpen = ref(false)

onMounted(() => {
  if (activeCategory.value === 'poker') {
    isMaintenanceOpen.value = true
  }
})

const toggleChat = (): void => {
  if (commentContext.value) {
    closeComments()
  } else {
    openGameComments()
  }
}

const selectCategory = (key: string): void => {
  if (key === 'poker') {
    isMaintenanceOpen.value = true
    return
  }
  router.push(`/explore/entertainment/live-casino/${key}`)
}

const handleTableClick = (event: MouseEvent): void => {
  event.preventDefault()
  if (activeCategory.value === 'poker') {
    isMaintenanceOpen.value = true
    return
  }
  isReminderOpen.value = true
}

const handleOkClick = (): void => {
  isReminderOpen.value = false
  window.location.href = bybetRedirectUrl
}

const filteredTables = computed<LiveCasinoTable[]>(() => {
  const cat = activeCategory.value
  return LIVE_CASINO_TABLES.filter(t => {
    if (cat === 'baccarat') {
      return t.category === 'baccarat' || t.category === 'live-casino'
    }
    return t.category === cat
  })
})

// Map dice value to dot positions (3x3 grid)
const getDiceDots = (val: number) => {
  const dots: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  }
  return dots[val] || []
}

const getRouletteColor = (num: number) => {
  if (num === 0) return 'bg-green-500'
  const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
  return reds.includes(num) ? 'bg-red-500' : 'bg-black'
}

const getRoadmapColumns = (wins?: any[]) => {
  const totalCols = 12
  const totalRows = 6
  const rawCols = wins || []
  const activeCols = rawCols.length > totalCols ? rawCols.slice(-totalCols) : rawCols

  return Array.from({ length: totalCols }, (_, colIdx) => {
    const col = activeCols[colIdx] || []
    return Array.from({ length: totalRows }, (_, rowIdx) => col[rowIdx] || null)
  })
}

interface SicBoRound {
  dice: number[]
  total: number
  bigSmall: string
  oddEven: string
}

const DEFAULT_SICBO_ROUNDS: SicBoRound[] = [
  { dice: [2, 3, 6], total: 11, bigSmall: 'B', oddEven: 'O' },
  { dice: [1, 5, 1], total: 7, bigSmall: 'S', oddEven: 'O' },
  { dice: [4, 4, 2], total: 10, bigSmall: 'S', oddEven: 'E' },
  { dice: [3, 5, 6], total: 14, bigSmall: 'B', oddEven: 'E' },
  { dice: [1, 2, 3], total: 6, bigSmall: 'S', oddEven: 'E' },
  { dice: [5, 5, 3], total: 13, bigSmall: 'B', oddEven: 'O' },
  { dice: [2, 4, 5], total: 11, bigSmall: 'B', oddEven: 'O' },
  { dice: [6, 6, 1], total: 13, bigSmall: 'B', oddEven: 'O' },
  { dice: [1, 3, 4], total: 8, bigSmall: 'S', oddEven: 'E' },
]

const getSicBoRounds = (wins?: any[]): SicBoRound[] => {
  if (!Array.isArray(wins) || wins.length === 0) {
    return DEFAULT_SICBO_ROUNDS
  }

  const parsed: SicBoRound[] = []
  for (const w of wins) {
    if (Array.isArray(w)) {
      if (Array.isArray(w[0])) {
        const dice = w[0].slice(0, 3)
        const total = typeof w[1] === 'number' ? w[1] : dice.reduce((sum: number, val: number) => sum + val, 0)
        const bigSmall = (Array.isArray(w[3]) && w[3][0]) || (total >= 11 ? 'B' : 'S')
        const oddEven = (Array.isArray(w[3]) && w[3][1]) || (total % 2 === 1 ? 'O' : 'E')
        parsed.push({ dice, total, bigSmall, oddEven })
      } else if (typeof w[0] === 'number') {
        const dice = (w as number[]).slice(0, 3)
        const total = dice.reduce((sum: number, val: number) => sum + val, 0)
        const bigSmall = total >= 11 ? 'B' : 'S'
        const oddEven = total % 2 === 1 ? 'O' : 'E'
        parsed.push({ dice, total, bigSmall, oddEven })
      }
    }
  }

  if (parsed.length >= 9) {
    return parsed.slice(-9)
  }

  const remainder = DEFAULT_SICBO_ROUNDS.slice(parsed.length)
  return [...parsed, ...remainder]
}
</script>

<template>
  <div class="live-casino-page w-full min-w-0 pb-16 text-white">
    <div class="sticky-header-seal sticky top-[var(--content-sticky-top)] bg-black rounded-t-2xl z-30 -mx-1 px-1 pb-0.5">
      <!-- Top Bar -->
      <header class="top-brand-bar flex items-center justify-between gap-2 rounded-lg bg-[#202020] p-0 py-1 mb-1.5 shadow-sm">
        <div class="flex items-center pl-1 bg-[#141414] width-full  flex-auto px-3 py-1.5 shadow-sm">
          <div class="h-6 w-8 rounded-md bg-[var(--main-color)] flex items-center justify-center shadow-md">
            <img
              :src="pragmaticPlayLogo"
              alt="Pragmatic Play"
              class="h-5 w-5 object-contain"
            />
          </div>
        </div>
        <button
          type="button"
          class="nav-tab nav-tab--chat flex flex-col items-center justify-center min-w-[56px] py-1 px-2.5 rounded-xl transition-all cursor-pointer select-none hidden sm:flex pl-2"
          :class="commentContext ? 'text-[#7a807d] font-semibold' : 'text-[#7a807d] '"
          @click="toggleChat"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mb-0.5 shrink-0"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.17487 19.8675L7.9565 18.1075C8.63891 18.2396 9.31883 18.308 10 18.308C15.4956 18.308 20 14.2442 20 9.15401C20 4.06434 15.4954 0 10 0C4.50461 0 0 4.06434 0 9.15401C0 12.0413 1.46921 14.6858 3.88947 16.3963L3.85501 19.0683C3.84572 19.7874 4.5896 20.2378 5.17487 19.8675ZM5.50007 10.9998C6.32849 10.9998 7.00007 10.3282 7.00007 9.49982C7.00007 8.67139 6.32849 7.99982 5.50007 7.99982C4.67164 7.99982 4.00007 8.67139 4.00007 9.49982C4.00007 10.3282 4.67164 10.9998 5.50007 10.9998ZM12.0001 9.49982C12.0001 10.3282 11.3285 10.9998 10.5001 10.9998C9.67164 10.9998 9.00007 10.3282 9.00007 9.49982C9.00007 8.67139 9.67164 7.99982 10.5001 7.99982C11.3285 7.99982 12.0001 8.67139 12.0001 9.49982C12.0001 10.3282 11.3285 10.9998 10.5001 10.9998ZM15.5001 10.9998C16.3285 10.9998 17.0001 10.3282 17.0001 9.49982C17.0001 8.67139 16.3285 7.99982 15.5001 7.99982C14.6716 7.99982 14.0001 8.67139 14.0001 9.49982C14.0001 10.3282 14.6716 10.9998 15.5001 10.9998Z"
            />
          </svg>
          <span class="text-[11px] leading-tight">Chat</span>
        </button>
      </header>

      <!-- Category Filter Bar -->
      <div class="category-nav-bar flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-lg bg-[#171817]  px-1 py-1.5 mb-1.5 shadow-sm">
        <button
          v-for="cat in LIVE_CASINO_CATEGORIES"
          :key="cat.key"
          type="button"
          class="category-pill px-1.5 py-0.5 rounded-md text-[14px]  whitespace-nowrap transition-all cursor-pointer select-none"
          :class="activeCategory === cat.key ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-[#8e9491] '"
          @click="selectCategory(cat.key)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Live Casino Tables Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(150px,165px))] gap-2.5 justify-start">
      
      <!-- Table Cards -->
      <div 
        v-for="table in filteredTables" 
        :key="table.id" 
        class="table-card relative group cursor-pointer w-full min-w-0" 
        @click="handleTableClick"
      >
        <div class="overflow-hidden rounded-md bg-[#141414] shadow-md w-full">
          
          <!-- Top Part: Image -->
          <div class="relative w-full aspect-[4/3] overflow-hidden">
            <img
              :src="table.image || '/images/casino/card1.webp'"
              class="w-full h-full object-cover"
              :alt="table.title"
              @error="($event.target as HTMLImageElement).src = '/images/casino/card1.webp'"
            />
            <div class="absolute top-0.5 inset-x-0.5 flex items-start justify-between gap-0.5 pointer-events-none">
              <div class="p-0.5 rounded backdrop-blur-lg text-[13px] sm:text-[11px] font-medium bg-black/10 leading-tight break-words min-w-0">
                {{ table.title }}
              </div>
              <div class="p-0.5 rounded-full bg-black/10 backdrop-blur-lg text-[13px] sm:text-[10px] flex items-center gap-0 shrink-0">
                <User class="h-3 w-3 sm:h-1.5 sm:w-1.5" />
                {{ table.players }}
              </div>
            </div>
          </div>

          <!-- Bottom Part: Dynamic Content based on table.category -->
          <div class="p-0 ">
            
            <!-- BACCARAT / DRAGON TIGER LAYOUT -->
            <div v-if="table.category === 'baccarat' || table.category === 'dragon-tiger'">
              <div class="grid grid-cols-12 gap-[1px] bg-neutral-500 border-2 border-neutral-500 rounded-sm overflow-hidden ">
                <div
                  v-for="(col, colIdx) in getRoadmapColumns(table.wins)"
                  :key="colIdx"
                  class="flex flex-col gap-[1px]"
                >
                  <div
                    v-for="(win, rowIdx) in col"
                    :key="rowIdx"
                    class="aspect-square bg-[#181a19] flex items-center justify-center relative min-h-0 min-w-0"
                  >
                    <div
                      v-if="win"
                      class="w-[75%] h-[75%] rounded-full border flex items-center justify-center relative shrink-0"
                      :class="{
                        'border-blue-500 text-blue-500': win.result === 'P',
                        'border-red-500 text-red-500': win.result === 'B',
                        'border-green-500 text-green-500': win.result === 'T'
                      }"
                    >
                      <div v-if="win.tie" class="absolute inset-0 flex items-center justify-center text-[7px] leading-none select-none">/</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between px-1 py-1 text-[10px] font-medium">
                <div class="flex items-center gap-1">
                  <img src="/images/casino/shoe-stats.webp" alt="Shoe stats" class="w-2.5 h-2.5 object-contain shrink-0" />
                  <span v-if="table.stats">{{ table.stats.shoe }}</span>
                </div>
                <div class="flex items-center gap-1 text-red-500"><span class="font-bold">B</span><span v-if="table.stats">{{ table.stats.banker }}</span></div>
                <div class="flex items-center gap-1 text-blue-500"><span class="font-bold">P</span><span v-if="table.stats">{{ table.stats.player }}</span></div>
                <div class="flex items-center gap-1 text-green-500"><span class="font-bold">T</span><span v-if="table.stats">{{ table.stats.tie }}</span></div>
              </div>
            </div>

            <!-- ROULETTE LAYOUT -->
            <div v-else-if="table.category === 'roulette'">
              <div class="flex items-center justify-center flex-wrap gap-0.5 mb-1 mt-0.5 p-0.5">
                <div
                  v-for="(res, i) in table.wins"
                  :key="i"
                  class="w-6 h-6 sm:w-2.5 sm:h-2.5 flex items-center justify-center rounded-sm text-[15px] sm:text-[9px] font-bold "
                  :class="[getRouletteColor(res[1]), i === 0 ? 'border-white border-2' : '']"
                >
                  {{ res[1] }}
                </div>
              </div>
            </div>

            <!-- SIC BO LAYOUT -->
            <div v-else-if="table.category === 'sicbo'">
              <div class="grid grid-cols-9 gap-[3px] mb-1">
                <div
                  v-for="(round, rIdx) in getSicBoRounds(table.wins)"
                  :key="rIdx"
                  class="flex flex-col gap-[3px]"
                >
                  <div
                    v-for="(dice, dIdx) in round.dice"
                    :key="dIdx"
                    class="aspect-square bg-white rounded-sm flex items-center justify-center p-0 shadow-inner relative"
                  >
                    <div class="grid grid-cols-3 grid-rows-3 gap-0 w-full h-full p-[1.2px]">
                      <div v-for="dotIdx in 9" :key="dotIdx" class="flex items-center justify-center">
                        <div v-if="getDiceDots(dice).includes(dotIdx - 1)" class="w-[3px] h-[3px] bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-9 gap-[2px] mb-1">
                <div
                  v-for="(round, rIdx) in getSicBoRounds(table.wins)"
                  :key="rIdx"
                  class="bg-[#FEDC7D] rounded-full  text-center text-[15px] sm:text-[10px]  text-orange-950"
                >
                  {{ round.total }}
                </div>
              </div>
              <div class="space-y-1">
                <div class="grid grid-cols-9 gap-[2px]">
                  <div
                    v-for="(round, rIdx) in getSicBoRounds(table.wins)"
                    :key="rIdx"
                    class=" rounded-full text-center text-[15px] sm:text-[10px] text-white flex items-center justify-center"
                    :class="round.bigSmall === 'B' ? 'bg-[#4C9EEA]' : 'bg-[#E7021A]'"
                  >
                    {{ round.bigSmall }}
                  </div>
                </div>
                <div class="grid grid-cols-9 gap-[2px]">
                  <div
                    v-for="(round, rIdx) in getSicBoRounds(table.wins)"
                    :key="rIdx"
                    class=" rounded-full text-center text-[15px] sm:text-[10px] text-white flex items-center justify-center"
                    :class="round.oddEven === 'E' ? 'bg-[#4C9EEA]' : 'bg-[#E7021A]'"
                  >
                    {{ round.oddEven }}
                  </div>
                </div>
              </div>
            </div>

            <!-- FAN TAN LAYOUT -->
            <div v-else-if="table.category === 'fan-tan'">
              <div class="flex flex-wrap gap-0 px-1 my-1 overflow-hidden">
                <div 
                  v-for="(val, i) in table.wins" 
                  :key="i" 
                  class="flex-1 h-6 sm:h-3 flex items-center justify-center rounded-full text-[15px] sm:text-[11px] font-bold "
                  :class="i === 0 ? 'bg-red-600 text-white' : ''"
                >
                  {{ val }}
                </div>
              </div>
            </div>

            <!-- Blackjack Layout -->
            <div v-else-if="table.category === 'blackjack'">
              <div class="flex items-center justify-center gap-1.5 py-1">
                <div 
                  v-for="(active, i) in table.wins" 
                  :key="i" 
                  class="w-7 h-7 sm:w-2 sm:h-2  flex items-center justify-center transition-colors text-white/30"
                >
                  <svg v-if="active" class="w-5 h-5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                  <svg v-else class="w-5 h-5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /><line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" stroke-width="5" /></svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Reminder Modal -->
    <ReminderModal
      v-if="isReminderOpen"
      title="Reminder"
      message="Please login first"
      @close="isReminderOpen = false"
      @ok="handleOkClick"
    />

    <!-- Maintenance / Currency Prompt Modal -->
    <UnderMaintenance
      v-if="isMaintenanceOpen"
      @close="isMaintenanceOpen = false"
    />
  </div>
</template>

<style scoped>
.table-card {
  width: 100%;
  max-width: 165px;
  min-width: 0;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .table-card {
    width: 100%;
    max-width: 165px;
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
