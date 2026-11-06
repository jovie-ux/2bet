<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { User, X } from 'lucide-vue-next'
import ReminderModal from '~/components/modals/ReminderModal.vue'
import { getProviderLogoForTheme } from '~/utils/providerLogo'
import { JACKPOT_SECTIONS } from '~/data/jackpot'
import { normalizeSlotProvider } from '~/data/slots'

interface Game {
  id: string
  title: string
  image: string
  provider: string
  providerLogo?: string
  badge?: string
  new?: boolean
  jackpot?: boolean
  Jackpot?: boolean
  jackpotPrice?: number | string
  JackpotPrice?: number | string
  buyBonus?: boolean
  rtpPercent?: string
  livePlayers?: number
  hotPercent?: string
  coldPercent?: string
  bottomMultiplier?: string
  promo?: boolean
  jackpotPool?: string
  href?: string
  theme?: string
  features?: string[]
  tags?: string[]
  winningLine?: string
}

interface Props {
  game: Game
  activeId?: string | null
  displayCategory?: string | null
}

const props = defineProps<Props>()
const route = useRoute()
const { effectiveTheme } = useSiteTheme()
const emit = defineEmits<{
  (e: 'select', game: Game): void
  (e: 'info', game: Game): void
  (e: 'start', game: Game): void
  (e: 'demo', game: Game): void
  (e: 'close'): void
}>()

const canShowDemo = (provider: string): boolean => {
  const p = (provider || '').trim().toUpperCase()
  return p !== 'PG' && p !== 'PG SOFT' && p !== 'CQ9' && p !== 'CG9'
}

const showTooltip = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const openTooltip = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  showTooltip.value = true
}

const closeTooltip = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  hideTimeout = setTimeout(() => {
    showTooltip.value = false
    hideTimeout = null
  }, 100)
}

const closeTooltipNow = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  showTooltip.value = false
}

const cancelClose = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const toggleTooltip = () => {
  if (showTooltip.value) {
    closeTooltipNow()
  } else {
    openTooltip()
  }
  emit('info', props.game)
}

const showReminderModal = ref(false)

const handleStartNowClick = () => {
  showReminderModal.value = true
}

const handleReminderOk = () => {
  showReminderModal.value = false
  emit('close')
  emit('start', props.game)
}

const handleReminderClose = () => {
  showReminderModal.value = false
}

watch(
  () => props.activeId,
  (newId) => {
    if (newId === props.game.id) {
      closeTooltipNow()
    } else {
      showReminderModal.value = false
    }
  }
)

const displayWinningLine = computed(() => {
  return props.game.winningLine || props.game.bottomMultiplier || '1024'
})

const displayRtp = computed(() => {
  return props.game.rtpPercent || '97.0%'
})

const displayTags = computed(() => {
  if (props.game.tags && props.game.tags.length > 0) return props.game.tags
  if (props.game.features && props.game.features.length > 0) return props.game.features
  return ['Entertainment', 'Auto Game', 'Free Spins', 'Buy Spins']
})

const PROVIDER_LOGO_BY_NAME: Record<string, string> = {
  PP: '/images/providers/pp.webp',
  'PRAGMATIC PLAY': '/images/providers/pp.webp',
  PRAGMATIC: '/images/providers/pp.webp',
  PG: '/images/providers/pg.webp',
  'PG SOFT': '/images/providers/pg.webp',
  JDB: '/images/providers/jdb.webp',
  JPG: '/images/providers/jdb.webp',
  JILI: '/images/providers/jili.webp',
  CQ9: '/images/providers/cq9.webp',
  'RED TIGER': '/images/providers/red-tiger.webp',
  REDTIGER: '/images/providers/red-tiger.webp',
  'RED-TIGER': '/images/providers/red-tiger.webp',
  UNKNOWN: '/images/providers/red-tiger.webp',
  LGD: '/images/providers/lgd.webp',
  'LGD GAMING': '/images/providers/lgd.webp',
  NETENT: '/images/providers/netent.webp',
  CHOICE: '/images/providers/choice.webp',
  'CHOICE GAMING': '/images/providers/choice.webp',
  BS: '/images/providers/bs.webp',
  BETSOFT: '/images/providers/bs.webp',
  'MG+': '/images/providers/mg.webp',
  MG: '/images/providers/mg.webp',
  MICROGAMING: '/images/providers/mg.webp',
  '2BET': '/images/providers/2bet.webp',
  'AI CASINO': '/images/providers/ai-casino.webp',
  AICASINO: '/images/providers/ai-casino.webp',
  DB: '/images/providers/db.webp',
  KY: '/images/providers/ky.webp',
  V8: '/images/providers/v8.webp',
  KS: '/images/providers/ks.webp',
}

const resolveProviderLogo = (providerName?: string, explicitLogo?: string): string => {
  const key = (providerName || '').trim().toUpperCase()
  if (key === 'UNKNOWN' || key === 'RED TIGER' || key === 'REDTIGER' || key === 'RED-TIGER') {
    return '/images/providers/red-tiger.webp'
  }
  if (explicitLogo) return explicitLogo
  if (!providerName) return ''
  return PROVIDER_LOGO_BY_NAME[key] || ''
}

const providerLogo = computed(() => {
  const baseLogo = resolveProviderLogo(props.game.provider, props.game.providerLogo)
  return getProviderLogoForTheme(baseLogo, effectiveTheme.value)
})

const isJackpotGame = computed(() => {
  return Boolean(props.game.jackpot || props.game.Jackpot || props.game.badge === 'JACKPOT')
})

const isNewGame = computed(() => {
  return Boolean(props.game.new || props.game.badge === 'NEW')
})

const normalizedCategory = computed(() => {
  if (!props.displayCategory) return null
  const cat = props.displayCategory.toLowerCase().trim()
  if (cat === 'bonus' || cat === 'bonuses') return 'bonus'
  if (cat === 'top-pick' || cat === 'top-picks' || cat === 'toppick') return 'top-pick'
  if (cat === 'top') return 'top'
  if (cat === 'new') return 'new'
  if (cat === 'hot') return 'hot'
  if (cat === 'cold') return 'cold'
  if (cat === 'max-rpt' || cat === 'max-rtp') return 'max-rpt'
  if (cat === 'jackpot' || cat === 'jackpot-jdb') return cat
  return cat
})

const isJackpotPage = computed(() => {
  const p = route?.path || ''
  const cat = normalizedCategory.value
  return p.startsWith('/explore/egames/jackpot') || cat === 'jackpot' || cat === 'jackpot-jdb'
})

const isJdbJackpotPage = computed(() => {
  const p = route?.path || ''
  const cat = normalizedCategory.value
  return p.includes('/explore/egames/jackpot/jdb') || cat === 'jackpot-jdb'
})

const tagLabel = computed(() => {
  const cat = normalizedCategory.value

  // "then alway show new tag every category"
  if (isNewGame.value) return 'NEW'

  // "for bonus and top pick dont display any just new tag if it has new tag"
  if (cat === 'bonus' || cat === 'top-pick') {
    return null
  }

  // Other categories or general view:
  if (props.game.promo) return 'PROMO'
  return null
})

const tagBgClass = computed(() => {
  return 'bg-[var(--main-color)]'
})

const showRtpBadge = computed(() => {
  const cat = normalizedCategory.value
  if (cat === 'max-rpt') {
    return Boolean(props.game.rtpPercent || displayRtp.value)
  }
  if (cat === 'bonus' || cat === 'top-pick' || cat === 'top' || cat === 'hot' || cat === 'cold' || cat === 'new') {
    return false
  }
  return Boolean(props.game.rtpPercent)
})

const showLivePlayers = computed(() => {
  const cat = normalizedCategory.value
  if (cat === 'top') return Boolean(props.game.livePlayers)
  if (!cat) return Boolean(props.game.livePlayers)
  return false
})

const showWinningLine = computed(() => {
  if (isJackpotPage.value) return false
  const cat = normalizedCategory.value
  if (cat === 'top') {
    return Boolean(displayWinningLine.value)
  }
  if (!cat) {
    return Boolean(props.game.winningLine && !props.game.hotPercent && !props.game.coldPercent)
  }
  return false
})

const showHotPercent = computed(() => {
  if (isJackpotPage.value) return false
  const cat = normalizedCategory.value
  if (cat === 'hot') {
    return Boolean(props.game.hotPercent)
  }
  if (!cat) {
    return Boolean(props.game.hotPercent)
  }
  return false
})

const showColdPercent = computed(() => {
  if (isJackpotPage.value) return false
  const cat = normalizedCategory.value
  if (cat === 'cold') {
    return Boolean(props.game.coldPercent)
  }
  if (!cat) {
    return Boolean(props.game.coldPercent)
  }
  return false
})

const showBottomMultiplier = computed(() => {
  if (isJackpotPage.value) return false
  const cat = normalizedCategory.value
  if (!cat) {
    return Boolean(props.game.bottomMultiplier)
  }
  return false
})

const showJackpotPool = computed(() => {
  if (isJackpotPage.value) {
    return Boolean(displayJackpotPool.value)
  }
  const cat = normalizedCategory.value
  if (cat === 'hot' || cat === 'cold') {
    return false
  }
  return Boolean(displayJackpotPool.value)
})

const displayJackpotPool = computed(() => {
  if (props.game.jackpotPool) return props.game.jackpotPool.replace(/^₱/, '$')
  const price = props.game.JackpotPrice ?? props.game.jackpotPrice
  if (typeof price === 'number' && price > 0) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  if (typeof price === 'string' && price.trim()) {
    const cleaned = price.trim().replace(/^₱/, '$')
    return cleaned.startsWith('$') ? cleaned : `$${cleaned}`
  }
  if (isJackpotGame.value) {
    const prov = normalizeSlotProvider(props.game.provider)
    const sec = JACKPOT_SECTIONS.find(s => normalizeSlotProvider(s.id) === prov || normalizeSlotProvider(s.provider) === prov)
    if (sec && sec.showCounter && sec.jackpotAmount > 0) {
      return `$${sec.jackpotAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }
  return ''
})

onUnmounted(() => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
})
</script>

<template>
  <div 
    class="game-card relative flex flex-col cursor-pointer select-none bg-[#141414] rounded-[10px] p-0 transition-all"
    @click="emit('select', game)"
    @mouseleave="closeTooltipNow"
  >
    <!-- Card Image Thumbnail Container -->
    <div class="relative aspect-square w-full rounded-[10px] overflow-hidden bg-[#181a19] shadow-md">
      <img
        :src="game.image"
        :alt="game.title"
        class="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <span class="game-card-image-fade" aria-hidden="true" />

      <!-- Top Left: JACKPOT/NEW/PROMO Badge -->
      <span
        v-if="tagLabel"
        class="absolute top-0 left-0 rounded-br text-white font-black text-[10px] px-1 py-0.5 leading-none shadow tracking-wide text-semibold"
        :class="tagBgClass"
      >
        {{ tagLabel }}
      </span>

      <!-- Top Right: Dual-color RTP Badge -->
      <div
        v-if="showRtpBadge"
        class="absolute top-1 right-0.5 flex items-center rounded overflow-hidden shadow-md leading-none border text-[12px] font-black"
        :style="{ borderColor: 'color-mix(in srgb, var(--main-color) 40%, transparent)' }"
      >
        <span class="bg-[var(--main-color)] text-white px-1.5 py-0.5">RTP</span>
        <span class="bg-white/90 text-black px-1.5 py-0.5 font-semibold">{{ displayRtp }}</span>
      </div>

      <!-- Top Right: Live Player Count Badge -->
      <span
        v-else-if="showLivePlayers"
        class="absolute top-1 right-0.5 flex items-center gap-0.5 rounded-full bg-black/50 backdrop-blur-md px-1.5 py-0.5 text-[11px] font-medium text-white/90"
      >
        <User class="h-2.5 w-2.5 text-white/70" />
        <span>{{ game.livePlayers }}</span>
      </span>

      <!-- Bottom Left: Hot/Cold/WinningLine/Multiplier/Jackpot Badge -->
      <span
        v-if="showJackpotPool"
        class="absolute bottom-1 left-2 rounded-sm  px-1.5 py-0.5 text-[13px] sm:text-[12px] font-bold text-white leading-none shadow"
      >
        {{ displayJackpotPool }}
      </span>
      <span
        v-else-if="showHotPercent"
        class="absolute bottom-1 left-0.5 flex items-center gap-0.5 text-[12px] font-bold leading-none"
      >
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="size-4"><path d="M8.51859 15.8363C10.9091 15.3212 14 13.4708 14 8.68638C14 4.3331 11.0383 1.43365 8.90859 0.101583C8.43524 -0.194615 7.88235 0.194556 7.88235 0.782838V2.28686C7.88235 3.4733 7.41894 5.63884 6.13118 6.53977C5.47353 6.9997 4.76235 6.31104 4.68282 5.47181L4.61706 4.78233C4.54059 3.98095 3.782 3.49469 3.18706 3.98342C2.11724 4.85967 1 6.39825 1 8.68556C1 14.5363 5.04453 16 7.06641 16C7.18469 16 7.30806 15.9959 7.43653 15.9877C6.43782 15.8963 4.82353 15.2299 4.82353 13.0742C4.82353 11.3875 5.96676 10.248 6.83547 9.69263C7.06947 9.54453 7.34247 9.73788 7.34247 10.03V10.5154C7.34247 10.8857 7.47629 11.4657 7.79365 11.8623C8.15306 12.3115 8.67994 11.8409 8.722 11.2501C8.73576 11.0642 8.91012 10.9457 9.06 11.0395C9.55018 11.348 10.1765 12.0063 10.1765 13.0742C10.1765 14.7593 9.31312 15.5343 8.51859 15.8363Z" fill="url(#ck5SdWt3QklFQXpnY1A5Tw==)"></path><defs><linearGradient x1="7.5" y1="0" x2="2.68733" y2="15.8152" gradientUnits="userSpaceOnUse" id="ck5SdWt3QklFQXpnY1A5Tw=="><stop stop-color="#FF8400"></stop><stop offset="0.799537" stop-color="#FFBB02"></stop></linearGradient></defs></svg></span>
        <span>{{ game.hotPercent }}</span>
      </span>
      <span
        v-else-if="showColdPercent"
        class="absolute bottom-1 left-0.5 flex items-center gap-0.5 text-[12px] font-bold leading-none"
      >
        <span>❄️</span>
        <span>{{ game.coldPercent }}</span>
      </span>

      <!-- Bottom-Right Info Icon -->
      <div class="absolute bottom-1.5 right-1 z-10">
        <button
          type="button"
          class="h-2 w-2 rounded-full  backdrop-blur-xs flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
          aria-label="Game info"
          @mouseenter="openTooltip"
          @mouseleave="closeTooltip"
          @click.stop.prevent="toggleTooltip"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" fill="none" class="size-2.5">
            <path d="M6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.00259972 4.80025 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C11.9983 4.40922 11.3656 2.88407 10.2408 1.75921C9.11593 0.63436 7.59078 0.0016799 6 0ZM5.76923 2.76923C5.90616 2.76923 6.04001 2.80983 6.15386 2.88591C6.26771 2.96198 6.35644 3.0701 6.40884 3.1966C6.46124 3.32311 6.47495 3.46231 6.44824 3.5966C6.42152 3.73089 6.35559 3.85425 6.25877 3.95107C6.16195 4.04789 6.03859 4.11383 5.90429 4.14054C5.77 4.16726 5.6308 4.15355 5.5043 4.10115C5.37779 4.04875 5.26967 3.96001 5.1936 3.84616C5.11753 3.73231 5.07692 3.59846 5.07692 3.46154C5.07692 3.27793 5.14986 3.10184 5.2797 2.972C5.40953 2.84217 5.58562 2.76923 5.76923 2.76923ZM6.46154 9.23077C6.21672 9.23077 5.98194 9.13351 5.80883 8.9604C5.63572 8.78729 5.53846 8.55251 5.53846 8.30769V6C5.41606 6 5.29866 5.95137 5.21211 5.86482C5.12555 5.77826 5.07692 5.66087 5.07692 5.53846C5.07692 5.41605 5.12555 5.29866 5.21211 5.2121C5.29866 5.12555 5.41606 5.07692 5.53846 5.07692C5.78328 5.07692 6.01807 5.17417 6.19118 5.34729C6.36429 5.5204 6.46154 5.75518 6.46154 6V8.30769C6.58395 8.30769 6.70134 8.35632 6.7879 8.44287C6.87445 8.52943 6.92308 8.64682 6.92308 8.76923C6.92308 8.89164 6.87445 9.00903 6.7879 9.09559C6.70134 9.18214 6.58395 9.23077 6.46154 9.23077Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <!-- Info Tooltip Overlay (Matches design from reference image) -->
      <Transition name="fade-tooltip">
        <div
          v-if="showTooltip && activeId !== game.id"
          class="absolute top-100 inset-1 right-0 z-55 rounded-md bg-[#202120]/70 backdrop-blur-md px-2 py-2 flex flex-col justify-between shadow-2xl  select-none cursor-default"
          @mouseenter="cancelClose"
          @mouseleave="closeTooltipNow"
          @click.stop="closeTooltipNow"
        >
          <!-- Top Row: Winning Line & RTP -->
          <div class="flex items-start justify-between mb-1">
            <div class="flex flex-col">
              <span class="text-[10px] sm:text-[10px] font-normal text-white leading-tight">Winning Line</span>
              <span class="text-[12px] sm:text-[12px] font-bold text-white leading-tight mt-1">{{ displayWinningLine }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] sm:text-[10px] font-normal text-[#d6d6d6] leading-tight">RTP</span>
              <span class="text-[12px] sm:text-[12px] font-bold text-white leading-tight mt-1">{{ displayRtp }}</span>
            </div>
          </div>

          <!-- Feature / Tag Pills -->
          <div class="flex flex-col items-start gap-0.5 sm:gap-0.5">
            <span
              v-for="tag in displayTags"
              :key="tag"
              class="inline-flex items-center px-1 py-1  rounded-full border border-white/30 text-[10px] sm:text-[10px] font-normal text-white bg-transparent leading-normal tracking-wide"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </Transition>

    <!-- Click Action Overlay: Start Now & Demo -->
    <Transition name="fade-action">
      <div
        v-if="activeId === game.id"
        class="absolute inset-0 bg-neutral-900/50  p-2 flex flex-col items-center justify-center gap-2 z-20 cursor-default"
        @click.stop
      >

        <!-- Start Now Button -->
        <button
          type="button"
          class="w-full max-w-[85px] py-1.5 px-0.5 rounded-full bg-[var(--main-color)] hover:bg-[#0e896033] text-white font-extrabold text-[12px] leading-tight text-center transition-all shadow-md active:scale-95 cursor-pointer"
          @click.stop="handleStartNowClick"
        >
          Start Now
        </button>

        <!-- Demo Button -->
        <button
          v-if="canShowDemo(game.provider)"
          type="button"
          class="w-full max-w-[85px] py-1.5 px-0.5 rounded-full bg-[#242624]/90  text-white font-bold text-[11px] leading-tight text-center transition-all active:scale-95 cursor-pointer"
          @click.stop="emit('demo', game)"
        >
          Demo
        </button>
      </div>
    </Transition>
  </div>

  <!-- Bottom Caption: Title & Provider Logo -->
  <div class="my-0.5 flex items-center justify-between gap-1 px-1">
    <span class="truncate text-[12px] font-semibold text-[#e5e7eb] transition-colors">
      {{ game.title }}
    </span>

    <div class="flex items-center shrink-0">
      <img
        v-if="providerLogo"
        :src="providerLogo"
        :alt="game.provider"
        class="h-3.5 max-w-[36px] object-contain opacity-90 transition-opacity"
        :class="{ 'brightness-125': effectiveTheme === 'dark' }"
        loading="lazy"
        decoding="async"
      />
      <span
        v-else
        class="text-[10px] font-bold text-[#8e9491] uppercase tracking-wider"
      >
        {{ game.provider }}
      </span>
    </div>
  </div>

  <!-- Login Reminder Modal -->
  <ReminderModal
    v-if="showReminderModal"
    title="Reminder"
    message="Please login first"
    @close="handleReminderClose"
    @ok="handleReminderOk"
  />
</div>
</template>

<style scoped>
.game-card {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .game-card {
    width: 100%;
    max-width: 100%;
  }
}

.game-card-image-fade {
  position: absolute;
  inset: auto 0 0;
  height: 38%;
  background: linear-gradient(to bottom, rgb(20 20 20 / 0%), rgb(20 20 20 / 45%) 55%, #141414);
  pointer-events: none;
}

.fade-action-enter-active,
.fade-action-leave-active {
  transition: opacity 150ms ease;
}

.fade-action-enter-from,
.fade-action-leave-to {
  opacity: 0;
}

.fade-tooltip-enter-active,
.fade-tooltip-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.fade-tooltip-enter-from,
.fade-tooltip-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
