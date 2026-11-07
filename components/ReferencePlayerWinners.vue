<script setup lang="ts">
import { Pause, Play } from 'lucide-vue-next'
import { HOMEPAGE_WINNERS, type HomepageWinner } from '~/data/homepage-winners'
import usernamesList from '~/data/usernames.json'
import { generateWinnerWinning } from '~/utils/winnerCurrency'

const PROVIDERS = [
  { name: 'Pragmatic Play', logo: '/images/providers/pp.webp' },
  { name: 'PG Soft', logo: '/images/providers/pg.webp' },
  { name: 'JILI', logo: '/images/providers/jili.webp' },
  { name: 'JDB', logo: '/images/providers/jdb.webp' },
  { name: 'CQ9', logo: '/images/providers/cq9.webp' },
  { name: 'Red Tiger', logo: '/images/providers/red-tiger.webp' },
  { name: 'NetEnt', logo: '/images/providers/netent.webp' },
  { name: 'Microgaming', logo: '/images/providers/mg.webp' },
  { name: 'BetSoft', logo: '/images/providers/bs.webp' },
  { name: 'Choice Gaming', logo: '/images/providers/choice.webp' },
  { name: 'LGD Gaming', logo: '/images/providers/lgd.webp' },
  { name: '2Bet', logo: '/images/providers/2bet.webp' },
]

const SCROLL_SPEED_PX_PER_SEC = 20

const isPaused = ref(false)
const isHovered = ref(false)
const winners = ref<HomepageWinner[]>([...HOMEPAGE_WINNERS])

const listTrack = ref<HTMLElement | null>(null)

let currentOffset = 0
let lastTimestamp = 0
let animationFrameId: number | null = null
let winnerSeed = 0

const maskUsername = (raw: string): string => {
  if (!raw) return 'u******8'
  if (raw.includes('*')) return raw
  const clean = raw.trim()
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

const { translate } = useSiteLocale()

const generateWinnerAmount = (): string => {
  return generateWinnerWinning(100, 1000, 'BRL')
}

const generateNewWinner = (): HomepageWinner => {
  winnerSeed += 1
  const prov = PROVIDERS[Math.floor(Math.random() * PROVIDERS.length)] || PROVIDERS[0]
  const uname = usernamesList.length
    ? (usernamesList[Math.floor(Math.random() * usernamesList.length)] || 'player')
    : 'player'

  return {
    id: `winner-${Date.now()}-${winnerSeed}-${Math.random().toString(36).slice(2, 6)}`,
    provider: prov.name,
    providerLogo: prov.logo,
    username: maskUsername(uname),
    amount: generateWinnerAmount(),
    date: formatWinnerDate(),
  }
}

const step = (timestamp: number) => {
  if (!lastTimestamp) {
    lastTimestamp = timestamp
  }
  const elapsed = timestamp - lastTimestamp
  lastTimestamp = timestamp

  const track = listTrack.value

  if (track && !isPaused.value && !isHovered.value) {
    const delta = Math.min(elapsed, 100)
    currentOffset += (SCROLL_SPEED_PX_PER_SEC * delta) / 1000

    const firstRow = track.querySelector('.winner-row') as HTMLElement | null
    if (firstRow) {
      const nextRow = firstRow.nextElementSibling as HTMLElement | null
      const shiftAmount = nextRow
        ? nextRow.offsetTop - firstRow.offsetTop
        : firstRow.offsetHeight + 8

      if (shiftAmount > 0 && currentOffset >= shiftAmount) {
        currentOffset -= shiftAmount
        winners.value.shift()
        winners.value.push(generateNewWinner())
      }
    }

    track.style.transform = `translate3d(0, -${currentOffset.toFixed(2)}px, 0)`
  }

  animationFrameId = requestAnimationFrame(step)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReduced) {
    animationFrameId = requestAnimationFrame(step)
  }
})

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
})
</script>

<template>
  <section class="player-winners" aria-labelledby="player-winners-title">
    <header class="player-winners__header">
      <h3 id="player-winners-title">{{ translate('Player Winners') }}</h3>
      <div class="player-winners__actions">
        <NuxtLink to="/explore/egames/jackpot/all">{{ translate('View All') }}</NuxtLink>
        <button
          type="button"
          class="winner-motion-toggle"
          :aria-label="isPaused ? translate('Resume player winners') : translate('Pause player winners')"
          :aria-pressed="isPaused"
          @click="isPaused = !isPaused"
        >
          <component :is="isPaused ? Play : Pause" :size="14" aria-hidden="true" />
        </button>
      </div>
    </header>

    <div
      class="winner-list"
      :class="{ 'winner-list--paused': isPaused }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        ref="listTrack"
        class="winner-list__track"
      >
        <ul
          class="winner-list__group"
          role="list"
        >
          <li v-for="winner in winners" :key="winner.id" class="winner-row">
            <img
              class="winner-row__provider"
              :src="winner.providerLogo"
              :alt="winner.provider"
              :title="winner.provider"
              width="36"
              height="24"
            >
            <div class="winner-row__player">
              <strong>{{ winner.username }}</strong>
              <span>{{ winner.date }}</span>
            </div>
            <span class="winner-row__amount">{{ winner.amount }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.player-winners {
  display: flex;
  position: relative;
  container-type: inline-size;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  padding: 20px;
  border: 1px solid rgba(197, 255, 231, 0.24);
  border-radius: 24px;
  color: #fff;
  background: linear-gradient(135deg, rgba(225, 255, 243, 0.16), rgba(71, 137, 111, 0.07) 42%, rgba(0, 19, 13, 0.4));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.16), inset 0 -1px rgba(148, 255, 209, 0.05), 0 12px 32px rgba(0, 0, 0, 0.16);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  backdrop-filter: blur(20px) saturate(150%);
}

.player-winners__header {
  display: flex;
  min-height: 36px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 12px;
}

.player-winners__header h3 {
  margin: 0;
  color: #48efb7;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.player-winners__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-winners__actions a {
  padding: 10px 14px;
  border: 1px solid rgba(111, 255, 197, 0.4);
  border-radius: 999px;
  color: #fff;
  background: rgba(73, 232, 167, 0.1);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.13);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.winner-motion-toggle {
  display: grid;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid rgba(190, 255, 226, 0.3);
  border-radius: 50%;
  color: #baffdf;
  background: rgba(207, 255, 233, 0.08);
  cursor: pointer;
}

.player-winners__actions a:focus-visible,
.winner-motion-toggle:focus-visible {
  outline: 2px solid #6affc5;
  outline-offset: 3px;
}

.winner-list {
  position: relative;
  min-height: 250px;
  flex: 1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(transparent, #000 4%, #000 94%, transparent);
  mask-image: linear-gradient(transparent, #000 4%, #000 94%, transparent);
}

.winner-list__track {
  display: flex;
  position: absolute;
  inset: 0 0 auto;
  flex-direction: column;
  will-change: transform;
}

.winner-list__group {
  display: flex;
  margin: 0;
  padding: 0 0 8px;
  flex-direction: column;
  list-style: none;
  gap: 8px;
}

.winner-row {
  display: grid;
  min-width: 0;
  min-height: 50px;
  align-items: center;
  padding: 12px;
  border: 1px solid rgba(172, 255, 218, 0.15);
  border-radius: 14px;
  background: rgba(210, 255, 235, 0.07);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.07);
  grid-template-columns: 36px minmax(0, 1fr) auto;
  gap: 12px;
}

.winner-row:nth-child(even) { background: rgba(0, 18, 12, 0.23); }

.winner-row__provider {
  width: 36px;
  height: 24px;
  object-fit: contain;
  opacity: 0.9;
}

.winner-row__player {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
}

.winner-row__player strong {
  color: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.winner-row__player span {
  color: #a7bfb3;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  white-space: nowrap;
}

.winner-row__amount {
  color: #c4ffe4;
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
}

@container (min-width: 440px) {
  .winner-row { grid-template-columns: 36px minmax(0, 1fr) auto 90px; }
  .winner-row__player { display: contents; }
  .winner-row__player strong { grid-column: 2; grid-row: 1; }
  .winner-row__player span { grid-column: 4; grid-row: 1; text-align: right; }
  .winner-row__amount { grid-column: 3; grid-row: 1; }
}

@media (max-width: 63.99rem) {
  .winner-list { min-height: 360px; flex: auto; }
}

@media (max-width: 30rem) {
  .player-winners { padding: 16px; }
  .player-winners__header h3 { font-size: 12px; }
  .winner-row { padding: 10px; gap: 9px; grid-template-columns: 32px minmax(0, 1fr) auto; }
  .winner-row__provider { width: 32px; }
  .winner-row__amount { font-size: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .winner-list { min-height: 0; flex: auto; overflow: visible; -webkit-mask-image: none; mask-image: none; }
  .winner-list__track { position: static; }
  .winner-motion-toggle { display: none; }
}
</style>
