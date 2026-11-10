<script setup lang="ts">
import { computed } from 'vue'
import LiveCasinoLobby from '~/components/live-casino/LiveCasinoLobby.vue'
import { LIVE_CASINO_CATEGORIES, LIVE_CASINO_TABLES, type LiveCasinoTable } from '~/data/live-casino'

const route = useRoute()
const router = useRouter()
const { translate } = useSiteLocale()
const activeCategory = computed(() => {
  const category = String(route.params.category || 'featured')
  return category === 'game-show' ? 'live-show' : category
})
const categoryLabel = computed(() => LIVE_CASINO_CATEGORIES.find(category => category.key === activeCategory.value)?.label || 'Live Tables')

useAppSeo({
  title: computed(() => formatSeoTitle(`${translate(categoryLabel.value)} ao Vivo — Mesas com Crupiês Reais | 2bet`)),
  description: computed(() => formatSeoDescription(`Jogue ${translate(categoryLabel.value).toLowerCase()} ao vivo na 2bet Brasil. Mesas exclusivas com crupiês profissionais, transmissão em HD e limites flexíveis.`)),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Cassino ao Vivo', path: '/entertainment/live-casino/featured' },
    { name: translate(categoryLabel.value), path: `/entertainment/live-casino/${activeCategory.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${translate(categoryLabel.value)} Cassino ao Vivo - 2bet`,
    url: `https://2bet.com/entertainment/live-casino/${activeCategory.value}`,
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
  router.push(`/entertainment/live-casino/${key}`)
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
  <LiveCasinoLobby :category="activeCategory" />
</template>
