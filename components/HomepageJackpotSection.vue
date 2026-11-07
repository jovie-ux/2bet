<script setup lang="ts">
import { ArrowRight, Flame, Pause, Play, Sparkles, Trophy } from 'lucide-vue-next'
import {
  JDB_JACKPOT_COUNTER,
  formatJackpotAmount,
  useJackpotCounter,
} from '~/composables/useJackpotCounter'
import { HOMEPAGE_WINNERS, type HomepageWinner } from '~/data/homepage-winners'
import usernamesList from '~/data/usernames.json'
import { getProviderLogoForTheme } from '~/utils/providerLogo'
import { generateWinnerWinning } from '~/utils/winnerCurrency'

const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`

const { translate } = useSiteLocale()
const { effectiveTheme } = useSiteTheme()

const { displayAmount: jdbDisplay } = useJackpotCounter(JDB_JACKPOT_COUNTER)

const jackpotCharacters = computed(() => {
  return [...formatJackpotAmount(jdbDisplay.value)]
})

const themedLogo = (logo: string): string => {
  return getProviderLogoForTheme(logo, effectiveTheme.value)
}

const PROVIDERS_POOL = [
  { provider: 'Pragmatic Play', providerLogo: '/images/providers/pp.webp' },
  { provider: 'PG Soft', providerLogo: '/images/providers/pg.webp' },
  { provider: 'JILI', providerLogo: '/images/providers/jili.webp' },
  { provider: 'JDB', providerLogo: '/images/providers/jdb.webp' },
  { provider: 'CQ9', providerLogo: '/images/providers/cq9.webp' },
  { provider: 'Red Tiger', providerLogo: '/images/providers/red-tiger.webp' },
  { provider: 'NetEnt', providerLogo: '/images/providers/netent.webp' },
  { provider: 'Microgaming', providerLogo: '/images/providers/mg.webp' },
  { provider: 'BetSoft', providerLogo: '/images/providers/bs.webp' },
  { provider: 'Choice Gaming', providerLogo: '/images/providers/choice.webp' },
  { provider: 'LGD Gaming', providerLogo: '/images/providers/lgd.webp' },
  { provider: '2Bet', providerLogo: '/images/providers/2bet.webp' },
]

const maskUsername = (raw: string): string => {
  if (!raw) return 'u******8'
  if (raw.includes('*')) return raw
  const clean = raw.trim().replace(/[^a-zA-Z0-9]/g, '')
  if (clean.length <= 2) return `${clean[0] || 'u'}******${clean[1] || '8'}`
  const first = clean[0]
  const last = clean[clean.length - 1]
  const starCount = Math.max(5, Math.min(6, clean.length - 2))
  return `${first}${'*'.repeat(starCount)}${last}`
}

const formatWinnerDate = (date = new Date()): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month} ${hours}:${minutes}`
}

const generateWinnerAmount = (): string => {
  // Focus winning from 100 USD to 1,000 USD, converting to Brazilian Real (R$)
  return generateWinnerWinning(100, 1000, 'BRL')
}

const winners = ref<HomepageWinner[]>([...HOMEPAGE_WINNERS.slice(0, 5)])
const isPaused = ref(false)
const isHovered = ref(false)
let winnerTimer: ReturnType<typeof setTimeout> | null = null

const scheduleNextWinner = (): void => {
  if (!import.meta.client) return
  const delay = Math.floor(Math.random() * (11000 - 6500 + 1)) + 6500
  winnerTimer = setTimeout(() => {
    if (!isPaused.value && !isHovered.value) {
      const randomUser = usernamesList[Math.floor(Math.random() * usernamesList.length)] || 'player_88'
      const prov = PROVIDERS_POOL[Math.floor(Math.random() * PROVIDERS_POOL.length)] || PROVIDERS_POOL[0]
      const newWinner: HomepageWinner = {
        id: `jackpot-win-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        provider: prov.provider,
        providerLogo: prov.providerLogo,
        username: maskUsername(randomUser),
        amount: generateWinnerAmount(),
        date: formatWinnerDate(),
      }
      winners.value = [newWinner, ...winners.value.slice(0, 4)]
    }
    scheduleNextWinner()
  }, delay)
}

onMounted(() => {
  scheduleNextWinner()
})

onBeforeUnmount(() => {
  if (winnerTimer) {
    clearTimeout(winnerTimer)
    winnerTimer = null
  }
})
</script>

<template>
  <section id="jackpot" class="homepage-jackpot-section" aria-labelledby="jackpot-title">
    <!-- Section Header -->
    <header class="jackpot-header flex items-center justify-between">
      <div class="jackpot-heading flex items-center min-w-0">
        <h2 id="jackpot-title">
          <img
            src="/icons/egames/jackpot.webp"
            class="allgames-heading-symbol allgames-heading-image"
            :alt="translate('Jackpot')"
            width="28"
            height="28"
          />
          {{ translate('Top Jackpots') }}
        </h2>
        <p>{{ translate('Spin for life-changing progressive jackpots') }}</p>
      </div>

      <NuxtLink to="/explore/egames/jackpot/all" class="jackpot-view-all">
        {{ translate('View all jackpots') }}
        <ArrowRight :size="16" aria-hidden="true" />
      </NuxtLink>
    </header>

    <!-- Showcase Grid -->
    <div class="jackpot-grid">
      <!-- JDB Jackpot Main Showcase Card -->
      <div class="jdb-card">
        <div class="jdb-ambient-glow" aria-hidden="true" />

        <!-- Top Badges Row -->
        <div class="jdb-card-top flex items-center justify-between flex-wrap gap-2">
          <div class="jdb-provider-pill flex items-center gap-2">
            <img
              :src="themedLogo('/images/providers/jdb.webp')"
              alt="JDB Gaming"
              class="jdb-provider-logo"
              width="16"
              height="16"
              loading="lazy"
              decoding="async"
            />
            <span class="jdb-provider-name">JDB Gaming</span>
            <span class="jdb-progressive-tag">{{ translate('Progressive Jackpot') }}</span>
          </div>

          <div class="jdb-live-indicator flex items-center gap-1.5">
            <span class="jdb-pulsing-dot" />
            <span>{{ translate('Live Drop') }}</span>
          </div>
        </div>

        <!-- Center Stage: Wordmark + Panda Mascot -->
        <div class="jdb-stage">
          <div class="jdb-wordmark-container">
            <span class="jdb-eyebrow">{{ translate('GRAND PRIZE POOL') }}</span>
            <img
              src="/images/jackpot/jackpot.webp"
              alt="JACKPOT"
              class="jdb-wordmark-img"
              width="360"
              height="72"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="jdb-mascot-container">
            <div class="jdb-mascot-glow" aria-hidden="true" />
            <img
              src="/images/jackpot/jdb-jackpot.webp"
              alt="JDB Mascot Panda"
              class="jdb-mascot-img"
              width="240"
              height="180"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <!-- 3D Digit Counter Plate -->
        <div
          class="jackpot-counter-plate"
          role="status"
          aria-live="polite"
          :aria-label="`JDB Jackpot: R$ ${formatJackpotAmount(jdbDisplay)}`"
        >
          <div class="jackpot-currency-badge" aria-hidden="true">
            <span>R$</span>
          </div>

          <div class="jackpot-counter-tiles" aria-hidden="true">
            <template v-for="(character, index) in jackpotCharacters" :key="`${index}-${character}`">
              <!-- Digit plate -->
              <div v-if="/\d/.test(character)" class="digit-box">
                <img
                  :src="`/images/jackpot/${character}.webp`"
                  :alt="character"
                  class="digit-img"
                  width="34"
                  height="45"
                />
              </div>
              <!-- Comma / Dot Separator -->
              <div v-else class="separator-box">
                <img
                  :src="character === ',' ? '/images/jackpot/comma.webp' : '/images/jackpot/dot.webp'"
                  :alt="character"
                  class="separator-img"
                  width="4"
                  height="15"
                />
              </div>
            </template>
          </div>
        </div>

        <!-- Bottom Action Row -->
        <div class="jdb-card-footer flex items-center justify-between flex-wrap gap-3">
          <div class="jdb-perks flex items-center gap-3">
            <span class="jdb-perk-pill">
              <Sparkles :size="13" class="text-[#32d49a]" />
              {{ translate('Drop on any spin') }}
            </span>
            <span class="jdb-perk-pill hidden sm:inline-flex">
              <Flame :size="13" class="text-[#32d49a]" />
              {{ translate('36 Jackpot Games') }}
            </span>
          </div>

          <NuxtLink
            :to="bybetRedirectUrl"
            external
            target="_blank"
            rel="noopener noreferrer"
            class="jdb-cta-btn"
          >
            <span>{{ translate('Spin to Win') }}</span>
            <Play :size="15" fill="currentColor" />
          </NuxtLink>
        </div>
      </div>

      <!-- Live Winners Card -->
      <div
        class="winners-card"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <!-- Card Header -->
        <div class="winners-card-header flex items-center justify-between">
          <div class="winners-title-group flex items-center gap-2">
            <Trophy :size="18" class="text-[#32d49a]" />
            <h3 class="winners-heading">{{ translate('Recent Winners') }}</h3>
          </div>

          <div class="winners-header-actions flex items-center gap-2">
            <div class="winner-live-beacon flex items-center gap-1.5">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span class="live-beacon-text">{{ translate('Live') }}</span>
            </div>

            <button
              type="button"
              class="winner-pause-btn"
              :aria-label="isPaused ? 'Resume winners list' : 'Pause winners list'"
              @click="isPaused = !isPaused"
            >
              <component :is="isPaused ? Play : Pause" :size="13" />
            </button>
          </div>
        </div>

        <!-- Animated Winners Body -->
        <div class="winners-body">
          <TransitionGroup name="winner-slide" tag="ul" class="winners-list" role="list">
            <li
              v-for="winner in winners"
              :key="winner.id"
              class="winner-row"
            >
              <div class="winner-player-info flex items-center gap-3 min-w-0">
                <div class="winner-provider-logo-box">
                  <img
                    :src="themedLogo(winner.providerLogo)"
                    :alt="winner.provider"
                    class="winner-provider-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="winner-meta flex flex-col min-w-0">
                  <span class="winner-username truncate">{{ winner.username }}</span>
                  <span class="winner-timestamp">{{ winner.date }}</span>
                </div>
              </div>

              <div class="winner-prize-box flex items-center gap-1.5">
                <span class="winner-amount">{{ winner.amount }}</span>
              </div>
            </li>
          </TransitionGroup>
        </div>

        <!-- Winners Footer -->
        <div class="winners-card-footer flex items-center justify-between">
          <div class="winners-stat flex items-center gap-1.5">
            <Flame :size="14" class="text-[#32d49a] flex-shrink-0" />
            <span class="truncate">{{ translate('Over 2,450 payouts awarded today') }}</span>
          </div>

          <NuxtLink to="/explore/egames/jackpot/all" class="winners-view-all-link flex items-center gap-1">
            <span>{{ translate('View all winners') }}</span>
            <ArrowRight :size="13" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.homepage-jackpot-section {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 24px;
}

/* Header matching HomepageSlotsSection & HomepageLiveCasinoSection */
.jackpot-header {
  min-height: 48px;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ffffff18;
}

.jackpot-heading {
  gap: 22px;
}

.jackpot-heading h2 {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 12px;
  color: #fff;
  font-size: var(--allgames-heading-size);
  font-weight: var(--homepage-display-weight);
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.jackpot-heading > p {
  padding-left: 22px;
  border-left: 1px solid #ffffff26;
  color: #a8b6bc;
  font-size: 14px;
  line-height: 22px;
}

.jackpot-view-all {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 32px;
  color: #32d49a;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.jackpot-view-all:hover {
  color: #019440;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Main Grid Layout */
.jackpot-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 18px;
}

@media (min-width: 1024px) {
  .jackpot-grid {
    grid-template-columns: 1.35fr 1fr;
    gap: 20px;
  }
}

/* JDB Jackpot Card */
.jdb-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 22px 24px;
  border: 1px solid rgba(1, 148, 64, 0.35);
  border-top: 1px solid rgba(1, 148, 64, 0.55);
  border-radius: 18px;
  background: linear-gradient(145deg, #05160c 0%, #010a05 45%, #000000 100%);
  box-shadow:
    0 14px 36px -8px rgba(0, 0, 0, 0.85),
    0 0 28px -4px rgba(1, 148, 64, 0.22),
    inset 0 1px 1px rgba(1, 148, 64, 0.25);
}

.jdb-ambient-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(1, 148, 64, 0.26) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.jdb-provider-pill {
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
}

.jdb-provider-logo {
  height: 16px;
  width: auto;
  object-fit: contain;
}

.jdb-provider-name {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.jdb-progressive-tag {
  padding: 2px 8px;
  border-radius: 9999px;
  color: #32d49a;
  background: rgba(1, 148, 64, 0.2);
  border: 1px solid rgba(1, 148, 64, 0.4);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.jdb-live-indicator {
  padding: 4px 10px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 9999px;
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
  font-size: 11px;
  font-weight: 600;
}

.jdb-pulsing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ef4444;
  animation: jdb-pulse 1.8s infinite;
}

@keyframes jdb-pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

/* Stage Area with Wordmark & Mascot */
.jdb-stage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0 16px;
  gap: 16px;
}

.jdb-wordmark-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.jdb-eyebrow {
  color: #32d49a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.jdb-wordmark-img {
  width: clamp(170px, 22vw, 220px);
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8));
}

.jdb-mascot-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.jdb-mascot-glow {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(1, 148, 64, 0.35) 0%, transparent 68%);
  filter: blur(18px);
  pointer-events: none;
}

.jdb-mascot-img {
  position: relative;
  width: clamp(120px, 16vw, 165px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.65));
  animation: panda-float 3.8s ease-in-out infinite;
  transition: transform 0.3s ease;
}

.jdb-mascot-img:hover {
  transform: scale(1.05) translateY(-3px);
}

@keyframes panda-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

/* Counter Plate */
.jackpot-counter-plate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px solid rgba(1, 148, 64, 0.28);
  border-radius: 12px;
  background: linear-gradient(180deg, #08160e 0%, #000000 100%);
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.9),
    0 1px 0 rgba(1, 148, 64, 0.2);
}

.jackpot-currency-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 12px;
  border: 1px solid rgba(1, 148, 64, 0.6);
  border-radius: 6px;
  background: linear-gradient(180deg, #023819 0%, #011d0d 100%);
  color: #32d49a;
  font-family: monospace;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 12px rgba(1, 148, 64, 0.3);
}

.jackpot-counter-tiles {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5px;
}

.digit-box {
  display: inline-flex;
  width: 36px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(1, 148, 64, 0.25);
  border-radius: 6px;
  background: linear-gradient(180deg, #132218 0%, #040d07 50%, #09150e 100%);
  box-shadow:
    inset 0 1px 0 rgba(1, 148, 64, 0.2),
    0 3px 6px rgba(0, 0, 0, 0.6);
}

.digit-img {
  display: block;
  width: 28px;
  height: auto;
  max-height: 38px;
  object-fit: contain;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.85));
}

.separator-box {
  display: inline-flex;
  width: 9px;
  height: 48px;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
}

.separator-img {
  display: block;
  width: 3px;
  height: auto;
  max-height: 14px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
}

/* Footer & CTA */
.jdb-perk-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 500;
}

.jdb-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #01b04c 0%, #019440 55%, #017a35 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 750;
  box-shadow: 0 4px 16px rgba(1, 148, 64, 0.45);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.jdb-cta-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.08);
  box-shadow: 0 6px 22px rgba(1, 148, 64, 0.65);
}

/* Winners Card */
.winners-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 20px 22px;
  border: 1px solid rgba(1, 148, 64, 0.25);
  border-top: 1px solid rgba(1, 148, 64, 0.45);
  border-radius: 18px;
  background: linear-gradient(145deg, #06140b 0%, #020905 50%, #000000 100%);
  box-shadow:
    0 14px 34px -8px rgba(0, 0, 0, 0.8),
    0 0 20px -4px rgba(1, 148, 64, 0.12),
    inset 0 1px 1px rgba(1, 148, 64, 0.2);
}

.winners-heading {
  color: #fff;
  font-size: 15px;
  font-weight: 750;
}

.winner-live-beacon {
  padding: 3px 8px;
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
  color: #34d399;
  background: rgba(16, 185, 129, 0.1);
  font-size: 11px;
  font-weight: 600;
}

.winner-pause-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #9ca3af;
  background: transparent;
  transition: all 0.2s ease;
}

.winner-pause-btn:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

.winners-body {
  margin: 14px 0;
  min-height: 215px;
}

.winners-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.winner-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid rgba(1, 148, 64, 0.16);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.25s ease;
}

.winner-row:hover {
  border-color: rgba(1, 148, 64, 0.45);
  background: rgba(1, 148, 64, 0.08);
}

.winner-provider-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
}

.winner-provider-img {
  max-width: 38px;
  max-height: 18px;
  width: auto;
  height: auto;
  object-fit: contain;
  opacity: 0.9;
}

.winner-username {
  color: #f3f4f6;
  font-family: monospace;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
}

.winner-timestamp {
  color: #6b7280;
  font-family: monospace;
  font-size: 11px;
  line-height: 1.2;
}

.winner-amount {
  color: #32d49a;
  font-family: monospace;
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0.02em;
  text-align: right;
  white-space: nowrap;
  text-shadow: 0 0 10px rgba(50, 212, 154, 0.35);
}

/* Animated drop for new winners */
.winner-slide-enter-active {
  transition: all 450ms cubic-bezier(0.16, 1, 0.3, 1);
}

.winner-slide-leave-active {
  display: none;
}

.winner-slide-enter-from {
  opacity: 0;
  transform: translateY(-14px) scale(0.96);
}

.winners-card-footer {
  padding-top: 10px;
  border-top: 1px solid rgba(1, 148, 64, 0.18);
  color: #9ca3af;
  font-size: 12px;
}

.winners-stat {
  font-size: 12px;
  color: #9ca3af;
}

.winners-view-all-link {
  color: #32d49a;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.winners-view-all-link:hover {
  color: #019440;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .jackpot-heading {
    gap: 12px;
  }

  .jackpot-heading > p {
    padding-left: 14px;
    font-size: 12px;
    line-height: 1.4;
  }

  .jdb-card {
    padding: 18px 16px;
  }

  .digit-box {
    width: 30px;
    height: 42px;
  }

  .digit-img {
    width: 23px;
    max-height: 32px;
  }

  .separator-box {
    width: 7px;
    height: 42px;
  }

  .jackpot-currency-badge {
    height: 42px;
    padding: 0 9px;
    font-size: 12px;
  }

  .winners-card {
    padding: 16px;
  }
}

@media (max-width: 540px) {
  .jackpot-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .jackpot-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .jackpot-heading > p {
    padding: 0;
    border: none;
    font-size: 11px;
  }

  .jdb-stage {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    margin: 10px 0 14px;
  }

  .jdb-wordmark-container {
    align-items: center;
  }

  .digit-box {
    width: 27px;
    height: 38px;
  }

  .digit-img {
    width: 20px;
    max-height: 28px;
  }

  .separator-box {
    width: 6px;
    height: 38px;
  }

  .jackpot-currency-badge {
    height: 38px;
    padding: 0 8px;
    font-size: 11px;
  }

  .jdb-cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jdb-mascot-img {
    animation: none;
  }

  .jdb-pulsing-dot {
    animation: none;
  }

  .winner-slide-enter-active {
    transition: none;
  }
}
</style>

