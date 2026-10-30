<script setup lang="ts">
import {
  MessageCircle,
  ChevronRight,
  Play,
  User,
} from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import usernamesList from '~/data/usernames.json'
import {
  JACKPOT_NAV_TABS,
  JACKPOT_SECTIONS,
  JACKPOT_WINNERS,
  type JackpotSection,
  type JackpotWinner,
} from '~/data/jackpot'
import GameCard from '~/components/game-cards/GameCard.vue'
import GameRail from '~/components/game-cards/GameRail.vue'
import { SLOTS, normalizeSlotProvider } from '~/data/slots'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

const JACKPOT_REFRESH_INTERVAL_MS = 60_000

const JACKPOT_CHARACTER_IMAGES: Record<JackpotSection['jackpotCharacter'], string> = {
  dragon: '/images/jackpot/jili-jackpot.webp',
  genie: '/images/jackpot/cq9-jackpot.webp',
  panda: '/images/jackpot/jdb-jackpot.webp',
}

const JACKPOT_DIGIT_IMAGES: Record<string, string> = Object.fromEntries(
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(digit => [
    digit,
    `/images/jackpot/${digit}.webp`,
  ]),
)

const JACKPOT_SEPARATOR_IMAGES: Record<string, string> = {
  ',': '/images/jackpot/comma.webp',
  '.': '/images/jackpot/dot.webp',
}

const JACKPOT_INCREMENT_RANGES: Record<string, readonly [number, number]> = {
  jili: [680, 2_800],
  cq9: [0, 0],
  jdb: [12, 120],
}

const JACKPOT_SECTION_ORDER = ['jili', 'cq9', 'jdb']

const jackpotNumberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const route = useRoute()
const router = useRouter()
const { effectiveTheme } = useSiteTheme()

const themedProviderLogo = (providerLogo: string): string => {
  return getProviderLogoForTheme(providerLogo, effectiveTheme.value)
}

const activeProvider = computed(() => {
  const p = (route.params.provider as string || 'jdb').toLowerCase()
  return p
})

const providerName = computed(() => {
  const p = activeProvider.value
  if (p === 'all') return 'All Providers'
  return p.toUpperCase()
})

useAppSeo({
  title: computed(() => `${providerName.value} Progressive Jackpots — Casino Slots | ByBet`),
  description: computed(() => `Spin high-paying progressive jackpot slots from ${providerName.value} on ByBet Philippines. Live prize counters, daily winners, and mega jackpot payouts.`),
  breadcrumbs: computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Jackpots', path: '/explore/egames/jackpot/all' },
    { name: providerName.value, path: `/explore/egames/jackpot/${activeProvider.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${providerName.value} Progressive Jackpots - ByBet`,
    url: `https://bybet.com/explore/egames/jackpot/${activeProvider.value}`,
  })),
})

const activeGameId = ref<string | null>(null)
const currentWinners = ref<JackpotWinner[]>([...JACKPOT_WINNERS])
const jackpotAmounts = ref<Record<string, number>>(
  Object.fromEntries(JACKPOT_SECTIONS.map(section => [section.id, section.jackpotAmount])),
)
const jackpotRevision = ref(0)
let winnerTimer: ReturnType<typeof setTimeout> | null = null
let jackpotClockTimer: ReturnType<typeof setInterval> | null = null

const WINNER_PROVIDER_LOGO = '/images/providers/jdb.webp'

const maskUsername = (name: string): string => {
  if (name.includes('*')) return name
  const clean = name.replace(/[^a-zA-Z0-9]/g, '')
  if (clean.length <= 2) return `${clean[0] || 'u'}******${clean[1] || '8'}`
  const first = clean[0]
  const last = clean[clean.length - 1]
  const starCount = Math.max(5, Math.min(6, clean.length - 2))
  return `${first}${'*'.repeat(starCount)}${last}`
}

const formatDateTime = (date = new Date()): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month} ${hours}:${minutes}`
}

const generateRandomAmount = (): string => {
  const val = Math.random() < 0.15
    ? Math.random() * (12000 - 3000) + 3000
    : Math.random() * (2200 - 450) + 450
  return `PHP ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const addNewWinner = (): void => {
  const randomUsername = usernamesList[Math.floor(Math.random() * usernamesList.length)] || 'player_99'
  const newWinner: JackpotWinner = {
    id: `winner-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    providerLogo: WINNER_PROVIDER_LOGO,
    username: maskUsername(randomUsername),
    amount: generateRandomAmount(),
    date: formatDateTime(),
  }
  currentWinners.value = [newWinner, ...currentWinners.value.slice(0, 4)]
}

const scheduleRandomWinner = (): void => {
  if (!import.meta.client) return
  const delay = Math.floor(Math.random() * (60000 - 5000 + 1)) + 5000
  winnerTimer = setTimeout(() => {
    addNewWinner()
    scheduleRandomWinner()
  }, delay)
}

const getJackpotAmount = (section: JackpotSection): number => {
  return jackpotAmounts.value[section.id] ?? section.jackpotAmount
}

const getJackpotCharacters = (section: JackpotSection): string[] => {
  return [...jackpotNumberFormatter.format(getJackpotAmount(section))]
}

const getJackpotDigitImage = (character: string): string | undefined => {
  return JACKPOT_DIGIT_IMAGES[character]
}

const getJackpotSeparatorImage = (character: string): string | undefined => {
  return JACKPOT_SEPARATOR_IMAGES[character]
}

const getJackpotLabel = (section: JackpotSection): string => {
  return `${section.provider} live jackpot: PHP ${jackpotNumberFormatter.format(getJackpotAmount(section))}`
}

const refreshJackpotAmounts = (): void => {
  const nextAmounts = { ...jackpotAmounts.value }

  JACKPOT_SECTIONS.filter(section => section.showCounter).forEach((section) => {
    const [minimum, maximum] = JACKPOT_INCREMENT_RANGES[section.id] ?? [20, 200]
    const increment = Math.random() * (maximum - minimum) + minimum
    nextAmounts[section.id] = Math.round((getJackpotAmount(section) + increment) * 100) / 100
  })

  jackpotAmounts.value = nextAmounts
  jackpotRevision.value += 1
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
    scheduleRandomWinner()
    jackpotClockTimer = setInterval(refreshJackpotAmounts, JACKPOT_REFRESH_INTERVAL_MS)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
    if (winnerTimer) {
      clearTimeout(winnerTimer)
      winnerTimer = null
    }
    if (jackpotClockTimer) {
      clearInterval(jackpotClockTimer)
      jackpotClockTimer = null
    }
  }
})

const { context: commentContext, openGameComments, closeComments } = useCommentPanel()
const { showDemoMessage } = useDemoInteraction()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl

const toggleChat = (): void => {
  if (commentContext.value) {
    closeComments()
  } else {
    openGameComments()
  }
}

const selectTab = (key: string): void => {
  router.push(`/explore/egames/jackpot/${key.toLowerCase()}`)
}

const showGameDetails = (game: any): void => {
  showDemoMessage(`${game.title} (${game.provider}) — Jackpot Pool: ${game.jackpotPool || 'Active'} • RTP: ${game.rtpPercent || '97.0%'}`)
}

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

const filteredSections = computed<JackpotSection[]>(() => {
  const sections = activeProvider.value === 'all'
    ? [...JACKPOT_SECTIONS].sort((left, right) => (
        JACKPOT_SECTION_ORDER.indexOf(left.id) - JACKPOT_SECTION_ORDER.indexOf(right.id)
      ))
    : JACKPOT_SECTIONS.filter((s) => s.id.toLowerCase() === activeProvider.value)

  return sections.map((section) => {
    const seenIds = new Set<string>()
    const amount = section.showCounter ? getJackpotAmount(section) : 0
    const poolText = amount > 0 ? `₱${jackpotNumberFormatter.format(amount)}` : undefined

    const games = SLOTS.filter((game) => {
      if (game.jackpot !== true && game.Jackpot !== true) return false
      if (normalizeSlotProvider(game.provider) !== normalizeSlotProvider(section.id)) return false
      if (seenIds.has(game.id)) return false
      seenIds.add(game.id)
      return true
    }).map(game => (poolText ? { ...game, jackpotPool: poolText } : game))

    return { ...section, games, count: games.length }
  })
})

watch(activeProvider, () => { activeGameId.value = null })
</script>

<template>
  <div class="jackpot-page w-full min-w-0 pb-16">
    <!-- Sticky Header (Top Nav Tabs Bar) -->
    <div class="sticky-header sticky-header-seal sticky top-[var(--content-sticky-top)] z-50 -mx-1 px-0 sm:px-1 pb-2">
      <!-- Top Nav Tabs Bar (777, JILI, JDB, CQ9 + Chat) -->
      <header class="top-nav-bar flex items-center justify-between gap-2 overflow-hidden rounded-lg bg-[#202020] py-1 shadow-sm">
        <div class="provider-nav-track no-scrollbar flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto bg-[#141414] px-1 py-1.5 shadow-sm">
          <button
            v-for="tab in JACKPOT_NAV_TABS"
            :key="tab.key"
            type="button"
            class="nav-tab flex h-6 min-w-[48px] shrink-0 cursor-pointer select-none items-center justify-center rounded-md px-2 transition-all py-2"
            :class="activeProvider === tab.key.toLowerCase() ? 'bg-[#036242] shadow-md' : 'hover:bg-white/5'"
            :aria-label="tab.label"
            :aria-current="activeProvider === tab.key.toLowerCase() ? 'page' : undefined"
            @click="selectTab(tab.key)"
          >
            <img
              :src="themedProviderLogo(tab.logo)"
              :alt="tab.label"
              class="object-contain transition-opacity"
              :class="[
                tab.isAll ? 'h-9 sm:h-5 w-6 sm:w-5' : 'h-9 sm:h-4 max-w-[50px] sm:max-w-[42px]',
                activeProvider === tab.key.toLowerCase() ? '' : 'opacity-80',
                effectiveTheme === 'dark'
                  ? activeProvider === tab.key.toLowerCase() ? 'brightness-150 contrast-150' : 'brightness-125'
                  : '',
              ]"
            />
          </button>
        </div>

        <!-- Right Chat Toggle -->
        <button
          type="button"
          class="nav-tab nav-tab--chat flex min-w-[56px] shrink-0 cursor-pointer select-none flex-col items-center justify-center rounded-xl px-2.5 py-1 transition-all hidden sm:flex"
          :class="commentContext ? 'text-[#7a807d] font-semibold ' : 'text-[#7a807d] '"
          aria-label="Toggle chat room"
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
    </div>

    <!-- Provider Jackpot Section (Layout matches Image 2) -->
    <section
      v-for="section in filteredSections"
      :id="`section-${section.id}`"
      :key="section.id"
      class="jackpot-provider-section scroll-mt-[85px]"
    >
      <!-- Provider identity, supplied jackpot artwork, and reference-style counter strip -->
      <div
        class="jackpot-provider-header"
        :class="{ 'jackpot-provider-header--with-counter': section.showCounter }"
      >
        <div class="jackpot-provider-identity">
          <img
            :src="themedProviderLogo(section.providerLogo)"
            :alt="section.provider"
            class="jackpot-provider-logo object-contain"
            :class="{ 'brightness-125': effectiveTheme === 'dark' }"
          />
        </div>

        <div class="jackpot-brand-stage" aria-hidden="true">
          <img
            src="/images/jackpot/jackpot.webp"
            alt=""
            class="jackpot-wordmark"
          />
          <img
            :src="JACKPOT_CHARACTER_IMAGES[section.jackpotCharacter]"
            alt=""
            class="jackpot-character"
            :class="`jackpot-character--${section.jackpotCharacter}`"
          />
        </div>

        <div
          v-if="section.showCounter"
          class="jackpot-counter-track"
          role="status"
          aria-live="polite"
          :aria-label="getJackpotLabel(section)"
        >
          <div class="jackpot-counter" aria-hidden="true">
            <template
              v-for="(character, index) in getJackpotCharacters(section)"
              :key="`${section.id}-${jackpotRevision}-${index}-${character}`"
            >
              <span v-if="/\d/.test(character)" class="jackpot-counter-character">
                <img
                  v-if="getJackpotDigitImage(character)"
                  :src="getJackpotDigitImage(character)"
                  alt=""
                  class="jackpot-digit-image"
                />
                <span v-else class="jackpot-digit-fallback">{{ character }}</span>
              </span>
              <span v-else class="jackpot-separator">
                <img
                  v-if="getJackpotSeparatorImage(character)"
                  :src="getJackpotSeparatorImage(character)"
                  alt=""
                  class="jackpot-separator-image"
                />
              </span>
            </template>
          </div>
        </div>

        <div class="jackpot-provider-count">
          <NuxtLink
            :to="`/explore/egames/jackpot/${section.id}`"
            class="count-badge flex items-center gap-0.5 rounded-full bg-[#202220] hover:bg-[#282a29] px-2.5 py-0.5 text-[11px] font-medium text-[#8e9491] hover:text-white transition-colors cursor-pointer"
          >
            <span>{{ section.count }}</span>
            <ChevronRight class="h-3 w-3" />
          </NuxtLink>
        </div>
      </div>

      <GameRail
        :label="`${section.provider} jackpot games`"
        :layout="activeProvider === 'all' ? 'slider' : 'grid'"
        :wide-columns="activeProvider === 'all' ? 8 : 6"
      >
        <GameCard
          v-for="game in section.games"
          :key="game.id"
          :game="game"
          :activeId="activeGameId"
          :displayCategory="section.id === 'jdb' || activeProvider === 'jdb' ? 'jackpot-jdb' : 'jackpot'"
          @select="handleCardClick"
          @info="showGameDetails"
          @start="handleStartNow"
          @demo="handleDemo"
        />
      </GameRail>
      <p v-if="section.games.length === 0" class="py-8 text-center text-sm text-[#8e9491]">
        No jackpot games are available for this provider.
      </p>
    </section>

    <!-- Winners List Card (Shown only on JDB jackpot page) -->
    <div
      v-if="activeProvider === 'jdb' || activeProvider === 'all'"
      class="winners-card rounded-md bg-[#171817] shadow-sm mb-8"
    >
      <div class="flex items-center justify-between pt-2 px-4">
        <h3 class="font-bold text-white text-[16px]">Winners List</h3>
        
      </div>

      <TransitionGroup name="winner-fade" tag="div" class="divide-y divide-white/5">
        <div
          v-for="winner in currentWinners"
          :key="winner.id"
          class="winner-item flex items-center justify-between py-1.5 text-[12px] transition-colors  px-2 "
        >
          <!-- Left: Provider Logo + Masked Username -->
          <div class="flex items-center gap-3">
            <img
              :src="themedProviderLogo(winner.providerLogo)"
              alt=""
              class="h-4 max-w-[36px] object-contain opacity-80"
              :class="{ 'brightness-125': effectiveTheme === 'dark' }"
            />
            <span class="text-white font-mono">{{ winner.username }}</span>
          </div>

          <!-- Center: Won Amount -->
          <span class="text-white ">{{ winner.amount }}</span>

          <!-- Right: Date Time -->
          <span class="text-[#626664] text-[11px] font-mono">{{ winner.date }}</span>
        </div>
      </TransitionGroup>
    </div>

  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.jackpot-provider-section {
  min-width: 0;
  margin-bottom: 20px;
}

.jackpot-provider-header {
  position: relative;
  min-width: 0;
  margin-bottom: 12px;
}

.jackpot-provider-identity,
.jackpot-provider-count {
  position: absolute;
  z-index: 5;
  top: 8px;
  display: flex;
  align-items: center;
}

.jackpot-provider-identity {
  left: 4px;
}

.jackpot-provider-count {
  right: 0;
}

.jackpot-provider-logo {
  width: auto;
  max-width: 82px;
  height: 71px;
}

.jackpot-brand-stage {
  position: relative;
  width: 100%;
  height: 105px;
}

.jackpot-provider-header--with-counter .jackpot-brand-stage {
  height: 84px;
}

.jackpot-wordmark {
  position: absolute;
  z-index: 20;
  bottom: 6px;
  left: 50%;
  width: clamp(178px, 18vw, 216px);
  height: auto;
  filter: drop-shadow(0 5px 7px rgba(0, 0, 0, 0.72));
  transform: translateX(-50%);
}

.jackpot-character {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: calc(50% + 70px);
  width: clamp(96px, 10vw, 118px);
  max-height: 92px;
  object-fit: contain;
  filter: drop-shadow(0 6px 7px rgba(0, 0, 0, 0.56));
}

.jackpot-character--dragon {
  left: calc(50% + 67px);
  width: clamp(112px, 12vw, 136px);
  max-height: 101px;
}

.jackpot-character--genie {
  left: calc(50% + 70px);
  width: clamp(92px, 9vw, 108px);
  max-height: 86px;
}

.jackpot-counter-track {
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #5d5d5d;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(0, 0, 0, 0.28);
}

.jackpot-counter {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5px;
}

.jackpot-counter-character {
  display: inline-flex;
  width: 41px;
  height: 56px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(132, 132, 132, 0.82);
  border-radius: 5px;
  background: linear-gradient(180deg, #4b4b4b 0%, #333 48%, #3e3e3e 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 2px 3px rgba(0, 0, 0, 0.4);
  animation: jackpot-digit-pop 420ms cubic-bezier(0.2, 0.85, 0.35, 1.2) both;
}

.jackpot-digit-image {
  display: block;
  width: 34px;
  height: auto;
  max-height: 45px;
  object-fit: contain;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.78));
}

.jackpot-digit-fallback {
  display: inline-flex;
  width: 34px;
  height: 45px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff3a2 2%, #ffd264 42%, #e8921c 88%);
  background-clip: text;
  color: transparent;
  font-size: 43px;
  font-weight: 1000;
  line-height: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2.5px #050505;
  paint-order: stroke fill;
  filter: drop-shadow(0 3px 0 #1f1508);
  transform: rotate(-2deg);
}

.jackpot-separator {
  display: inline-flex;
  width: 9px;
  height: 56px;
  flex: 0 0 auto;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 3px;
}

.jackpot-separator-image {
  display: block;
  width: 3px;
  height: auto;
  max-height: 15px;
  object-fit: contain;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.48));
}

.winner-item:nth-child(even) {
  background-color: #000;
}

@keyframes jackpot-digit-pop {
  0% {
    opacity: 0;
    transform: translateY(-7px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 767px) {
  .jackpot-brand-stage {
    height: 98px;
  }

  .jackpot-provider-header--with-counter .jackpot-brand-stage {
    height: 82px;
  }

  .jackpot-wordmark {
    width: clamp(164px, 42vw, 194px);
  }

  .jackpot-character {
    left: calc(50% + 61px);
    width: clamp(88px, 25vw, 108px);
  }

  .jackpot-character--dragon {
    left: calc(50% + 58px);
    width: clamp(105px, 30vw, 126px);
  }

  .jackpot-character--genie {
    left: calc(50% + 60px);
  }

}

@media (max-width: 639px) {
  .jackpot-provider-identity,
  .jackpot-provider-count {
    top: 6px;
  }

  .jackpot-counter-track {
    height: 58px;
  }

  .jackpot-counter-character {
    width: 34px;
    height: 50px;
  }

  .jackpot-digit-image,
  .jackpot-digit-fallback {
    width: 29px;
    max-height: 41px;
  }

  .jackpot-digit-fallback {
    height: 41px;
    font-size: 37px;
  }

  .jackpot-separator {
    width: 8px;
    height: 50px;
  }

  .jackpot-separator-image {
    width: 8px;
  }

}

@media (prefers-reduced-motion: reduce) {
  .jackpot-counter-character {
    animation: none;
  }
}

.winner-fade-enter-active {
  transition: all 400ms ease-out;
}
.winner-fade-leave-active {
  transition: all 300ms ease-in;
  display: none;
}
.winner-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.winner-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

