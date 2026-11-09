<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  JACKPOT_NAV_TABS,
  JACKPOT_SECTIONS,
  type JackpotSection,
} from '~/data/jackpot'
import {
  JDB_JACKPOT_COUNTER,
  JILI_JACKPOT_COUNTER,
  CQ9_JACKPOT_COUNTER,
  useJackpotCounter,
} from '~/composables/useJackpotCounter'
import GameCard from '~/components/game-cards/GameCard.vue'
import GameRail from '~/components/game-cards/GameRail.vue'
import JackpotWinnersCard from '~/components/jackpot/JackpotWinnersCard.vue'
import { SLOTS, getStandaloneJackpotGames, normalizeSlotProvider } from '~/data/slots'
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

const JACKPOT_SECTION_ORDER = ['jdb']

const jackpotNumberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const route = useRoute()
const router = useRouter()
const { effectiveTheme } = useSiteTheme()
const { translate } = useSiteLocale()

const themedProviderLogo = (providerLogo: string): string => {
  return getProviderLogoForTheme(providerLogo, effectiveTheme.value)
}

const activeProvider = computed(() => {
  const p = (route.params.provider as string || 'jdb').toLowerCase()
  return p
})

const providerName = computed(() => {
  const p = activeProvider.value
  if (p === 'all') return 'Todos os Provedores'
  return p.toUpperCase()
})

useAppSeo({
  title: computed(() =>
    formatSeoTitle(
      activeProvider.value === 'all'
        ? 'Jackpots Acumulados e Melhores Provedores | 2bet'
        : `Jackpots ${providerName.value} com Prêmios Acumulados | 2bet`,
    ),
  ),
  description: computed(() =>
    formatSeoDescription(
      activeProvider.value === 'all'
        ? 'Dispute jackpots acumulados nos caça-níqueis da 2bet Brasil. Acompanhe contadores em R$ em tempo real e concorra a prêmios milionários.'
        : `Jogue caça-níqueis com jackpot da ${providerName.value} na 2bet Brasil. Prêmios acumulados em R$ em tempo real e grandes chances de vitória.`,
    ),
  ),
  breadcrumbs: computed(() => [
    { name: 'Início', path: '/' },
    { name: 'Jackpots', path: '/explore/egames/jackpot/all' },
    { name: providerName.value, path: `/explore/egames/jackpot/${activeProvider.value}` },
  ]),
  schema: computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${providerName.value} Jackpots Progressivos - 2bet`,
    url: `https://2bet.com/explore/egames/jackpot/${activeProvider.value}`,
  })),
})

const activeGameId = ref<string | null>(null)
const currentWinners = useJackpotWinners()
const standaloneJackpotGames = computed(() => getStandaloneJackpotGames())
const jackpotAmounts = ref<Record<string, number>>(
  Object.fromEntries(JACKPOT_SECTIONS.map(section => [section.id, section.jackpotAmount])),
)
const jackpotRevision = ref(0)
let jackpotClockTimer: ReturnType<typeof setInterval> | null = null

const { displayAmount: jdbDisplay } = useJackpotCounter(JDB_JACKPOT_COUNTER)
const { displayAmount: jiliDisplay } = useJackpotCounter(JILI_JACKPOT_COUNTER)
const { displayAmount: cq9Display } = useJackpotCounter(CQ9_JACKPOT_COUNTER)

const storeAmounts: Record<string, Ref<number>> = {
  jdb: jdbDisplay,
  jili: jiliDisplay,
  cq9: cq9Display,
}

watch([jdbDisplay, jiliDisplay, cq9Display], () => {
  jackpotRevision.value += 1
})

const getJackpotAmount = (section: JackpotSection): number => {
  if (storeAmounts[section.id]) {
    return storeAmounts[section.id].value
  }
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
  return `${section.provider} live jackpot: R$${jackpotNumberFormatter.format(getJackpotAmount(section))}`
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
    jackpotClockTimer = setInterval(refreshJackpotAmounts, JACKPOT_REFRESH_INTERVAL_MS)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleDocumentClick)
    if (jackpotClockTimer) {
      clearInterval(jackpotClockTimer)
      jackpotClockTimer = null
    }
  }
})

const { showDemoMessage } = useDemoInteraction()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

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
    ? [...JACKPOT_SECTIONS]
        .filter(s => s.id.toLowerCase() !== 'jili' && s.id.toLowerCase() !== 'cq9')
        .sort((left, right) => (
          JACKPOT_SECTION_ORDER.indexOf(left.id) - JACKPOT_SECTION_ORDER.indexOf(right.id)
        ))
    : JACKPOT_SECTIONS.filter((s) => s.id.toLowerCase() === activeProvider.value)

  return sections.map((section) => {
    const seenIds = new Set<string>()
    const amount = section.showCounter ? getJackpotAmount(section) : 0
    const poolText = amount > 0 ? `R$${jackpotNumberFormatter.format(amount)}` : undefined

    const jackpotGames = SLOTS.filter((game) => {
      if (game.jackpot !== true && game.Jackpot !== true) return false
      if (normalizeSlotProvider(game.provider) !== normalizeSlotProvider(section.id)) return false
      if (seenIds.has(game.id)) return false
      seenIds.add(game.id)
      return true
    })

    if (jackpotGames.length < 15) {
      const moreGames = SLOTS.filter((game) => {
        if (normalizeSlotProvider(game.provider) !== normalizeSlotProvider(section.id)) return false
        if (seenIds.has(game.id)) return false
        seenIds.add(game.id)
        return true
      }).slice(0, 15 - jackpotGames.length)
      jackpotGames.push(...moreGames)
    }

    const games = jackpotGames.map(game => (poolText ? { ...game, jackpotPool: poolText } : game))

    return { ...section, games, count: games.length }
  })
})

watch(
  activeProvider,
  (p) => {
    if (p === 'jili' || p === 'cq9') {
      router.replace('/explore/egames/jackpot/all')
    }
    activeGameId.value = null
  },
  { immediate: true },
)
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
            :class="activeProvider === tab.key.toLowerCase() ? 'bg-[var(--main-color)] shadow-md' : 'hover:bg-white/5'"
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
            alt="Jackpot"
            class="jackpot-wordmark"
          />
          <img
            :src="JACKPOT_CHARACTER_IMAGES[section.jackpotCharacter]"
            :alt="`${section.provider} character`"
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
                  :alt="character"
                  class="jackpot-digit-image"
                />
                <span v-else class="jackpot-digit-fallback">{{ character }}</span>
              </span>
              <span v-else class="jackpot-separator">
                <img
                  v-if="getJackpotSeparatorImage(character)"
                  :src="getJackpotSeparatorImage(character)"
                  :alt="character"
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
        :games="section.games"
        v-slot="{ games }"
      >
        <GameCard
          v-for="game in (games && games.length ? games : section.games)"
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
        {{ translate('No jackpot games are available for this provider.') }}
      </p>
    </section>

    <section
      v-if="activeProvider === 'all'"
      class="standalone-jackpot-section mb-5 min-w-0"
      aria-labelledby="standalone-jackpot-title"
    >
      <div class="mb-2 flex items-center justify-between gap-3">
        <NuxtLink
          id="standalone-jackpot-title"
          to="/explore/egames/jackpot/standalone"
          class="flex min-w-0 items-center gap-1.5 text-[15px] font-bold text-white transition-colors hover:text-[var(--main-color)]"
        >
          <span aria-hidden="true">🎰</span>
          <span class="truncate">{{ translate('Standalone Jackpot Game') }}</span>
        </NuxtLink>
        <NuxtLink
          to="/explore/egames/jackpot/standalone"
          class="flex shrink-0 items-center gap-0.5 rounded-full bg-[#202220] px-2.5 py-0.5 text-[11px] font-medium text-[#8e9491] transition-colors hover:bg-[#282a29] hover:text-white"
          aria-label="View all standalone jackpot games"
        >
          <span>{{ standaloneJackpotGames.length }}</span>
          <ChevronRight class="h-3 w-3" />
        </NuxtLink>
      </div>

      <GameRail label="Standalone jackpot games" layout="slider" :wide-columns="11">
        <GameCard
          v-for="game in standaloneJackpotGames"
          :key="game.id"
          :game="game"
          :activeId="activeGameId"
          displayCategory="jackpot"
          @select="handleCardClick"
          @info="showGameDetails"
          @start="handleStartNow"
          @demo="handleDemo"
        />
      </GameRail>
    </section>

    <!-- Winners List Card (Shown only on JDB jackpot page) -->
    <JackpotWinnersCard
      v-if="activeProvider === 'jdb' || activeProvider === 'all'"
      :winners="currentWinners"
    />

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

</style>

