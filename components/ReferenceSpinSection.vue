<script setup lang="ts">
import {
  ArrowRight,
  LockKeyhole,
  LogIn,
  Ticket,
  UserPlus,
} from 'lucide-vue-next'
import StarBorder from '~/components/StarBorder.vue'
import SpinPrizeModal from '~/components/modals/SpinPrizeModal.vue'
import ReferencePlayerWinners from '~/components/ReferencePlayerWinners.vue'
import spinPrizeData from '~/data/spin-prizes.json'
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl

interface SpinPrize {
  name: string
  image: string
  accent: string
  value: number
  details: string
  valueSource: string
  valueCheckedAt: string
}

const prizes: SpinPrize[] = spinPrizeData
const currencyFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})
const formatPrizeValue = (value: number): string => currencyFormatter.format(value)

const ticketTiers = [
  { label: 'Bronze', className: 'bronze' },
  { label: 'Silver', className: 'silver' },
  { label: 'Gold', className: 'gold' },
  { label: 'Diamond', className: 'diamond' },
]

const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl
const wheelRotation = ref(0)
const isSpinning = ref(false)
const selectedPrize = ref<SpinPrize | null>(null)
const isPrizeModalOpen = ref(false)
const wheelButton = ref<HTMLButtonElement | null>(null)
let resultTimer: ReturnType<typeof setTimeout> | null = null

const wheelStyle = computed(() => ({
  '--wheel-rotation': `${wheelRotation.value}deg`,
  transform: `rotate(${wheelRotation.value}deg)`,
}))

const closePrizeModal = async (): Promise<void> => {
  isPrizeModalOpen.value = false
  await nextTick()
  wheelButton.value?.focus({ preventScroll: true })
}

const spinWheel = (): void => {
  if (isSpinning.value || isPrizeModalOpen.value) return

  isSpinning.value = true
  selectedPrize.value = null
  const winningIndex = Math.floor(Math.random() * prizes.length)
  const segmentAngle = 360 / prizes.length
  const targetAngle = (360 - winningIndex * segmentAngle) % 360
  const currentAngle = ((wheelRotation.value % 360) + 360) % 360
  wheelRotation.value += 5 * 360 + ((targetAngle - currentAngle + 360) % 360)

  resultTimer = setTimeout(() => {
    selectedPrize.value = prizes[winningIndex] || prizes[0]
    isSpinning.value = false
    isPrizeModalOpen.value = true
    resultTimer = null
  }, 3200)
}

onBeforeUnmount(() => {
  if (resultTimer) clearTimeout(resultTimer)
})
</script>

<template>
  <section class="spin-section" aria-labelledby="spin-section-title">
    <StarBorder
      as="div"
      class="spin-main-panel"
      color="#e4fff3"
      trail-color="#2ceab0"
      :duration="8"
      :radius="24"
      :glow="0.65"
      hover="brighten"
      background-color="transparent"
      border-color="rgba(191, 255, 226, 0.18)"
    >
      <header class="spin-heading">
        <div>
          <span>Spin Tickets</span>
          <h2 id="spin-section-title">Spin the Wheel</h2>
        </div>

      </header>

      <div class="wheel-stage">
        <img
          class="wheel-pointer"
          src="/images/spin-wheel/spin-pointer.webp"
          alt=""
          aria-hidden="true"
        >
        <button
          ref="wheelButton"
          type="button"
          class="prize-wheel"
          :class="{ 'prize-wheel--spinning': isSpinning }"
          :style="wheelStyle"
          :aria-label="isSpinning ? 'Prize wheel is spinning' : 'Spin the prize wheel'"
          :disabled="isSpinning"
          @click="spinWheel"
        >
          <span
            v-for="(prize, index) in prizes"
            :key="prize.name"
            class="wheel-prize"
            :style="{
              '--wheel-angle': index * (360 / prizes.length),
              '--prize-accent': prize.accent,
            }"
            aria-hidden="true"
          >
            <img :src="prize.image" :alt="prize.name" loading="lazy">
          </span>

          <img
            class="wheel-outer-ring"
            src="/images/spin-wheel/outer-ring.webp"
            alt=""
            aria-hidden="true"
          >

          <span class="wheel-center" aria-hidden="true">
            <img src="/images/spin-wheel/bybet-spin-center.webp" alt="">
          </span>
        </button>

        <p class="spin-result" aria-live="polite">
          <template v-if="selectedPrize">
            You landed on <strong>{{ selectedPrize.name }}</strong> — {{ formatPrizeValue(selectedPrize.value) }}!
          </template>
          <template v-else>Tap the wheel for a prize preview</template>
        </p>
      </div>

      <div class="spin-ticket-action">
        <NuxtLink class="spin-ticket-cta" :to="bybetRedirectUrl">
          <span class="spin-ticket-cta__icon" aria-hidden="true"><Ticket :size="22" /></span>
          <span class="spin-ticket-cta__label">Get Spin Tickets Here</span>
          <span class="spin-ticket-cta__arrow" aria-hidden="true"><ArrowRight :size="20" /></span>
        </NuxtLink>
      </div>
    </StarBorder>

    <aside class="spin-sidebar">
      <section class="recent-spin-card font-bold" aria-labelledby="recent-spin-title">
        <LockKeyhole class="recent-spin-lock" :size="25" aria-hidden="true" />
        <span class="panel-eyebrow">Recent Spin</span>
        <p>Redeem <strong>Spin Tickets</strong> and browse <NuxtLink to="/explore/bonuses">Casino Promotions</NuxtLink> for bonus offers.</p>
        <h3 id="recent-spin-title">Sign in to track your wins</h3>
        <p>Log in or create an account to save spins, claim prizes, and view your win history.</p>
        <div class="auth-actions">
          <a :href="externalSiteUrl" target="_blank" rel="nofollow noopener noreferrer" class="auth-primary">
            <LogIn :size="14" /> Login
          </a>
          <a :href="externalSiteUrl" target="_blank" rel="nofollow noopener noreferrer" class="auth-secondary">
            <UserPlus :size="14" /> Sign Up
          </a>
        </div>
      </section>

      <ReferencePlayerWinners />
    </aside>
  </section>
  <SpinPrizeModal
    v-if="isPrizeModalOpen && selectedPrize"
    :prize="selectedPrize"
    @close="closePrizeModal"
  />
</template>

<style scoped>
.spin-section {
  display: grid;
  position: relative;
  isolation: isolate;
  overflow: clip;
  min-width: 0;
  margin-top: 16px;
  padding: 12px;
  border: 1px solid rgba(185, 255, 225, 0.18);
  border-radius: 32px;
  color: #ffffff;
  background:
    radial-gradient(ellipse at 8% 15%, rgba(122, 226, 193, 0.2), transparent 48%),
    radial-gradient(ellipse at 90% 85%, rgba(0, 195, 125, 0.13), transparent 48%),
    linear-gradient(135deg, rgba(154, 219, 194, 0.09), rgba(2, 30, 22, 0.58));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  backdrop-filter: blur(24px) saturate(145%);
  grid-template-columns: minmax(0, 1.65fr) minmax(300px, 1fr);
  gap: 16px;
}

.spin-section .spin-main-panel,
.recent-spin-card {
  position: relative;
  border: 1px solid rgba(197, 255, 231, 0.24);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(225, 255, 243, 0.16), rgba(71, 137, 111, 0.07) 42%, rgba(0, 19, 13, 0.4));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.16),
    inset 0 -1px rgba(148, 255, 209, 0.05),
    0 12px 32px rgba(0, 0, 0, 0.16);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  backdrop-filter: blur(20px) saturate(150%);
}

.spin-section .spin-main-panel {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 24px;
  border: 0;
  gap: 0;
}

.spin-heading {
  display: flex;
  position: relative;
  z-index: 3;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}

.spin-heading > div:first-child > span,
.panel-eyebrow {
  color: #48efb7;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.spin-heading h2 {
  margin: 6px 0 0;
  font-size: clamp(25px, 2vw, 32px);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

.ticket-tiers {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.ticket-tier {
  min-width: 76px;
  padding: 9px 12px;
  border: 1px solid;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 1px 2px #000;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.ticket-tier--bronze { border-color: #a96d3580; color: #ffc27d; background: linear-gradient(#a974424f, #43230d33); }
.ticket-tier--silver { border-color: #a9b4b380; color: #ffffff; background: linear-gradient(#c0d5cd40, #253a3233); }
.ticket-tier--gold { border-color: #c7a82d80; color: #ffe968; background: linear-gradient(#b99e2347, #4b390933); }
.ticket-tier--diamond { border-color: #7dd9df80; color: #ffffff; background: linear-gradient(#97e6e640, #28555233); }

.wheel-stage {
  display: flex;
  position: relative;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px 0 20px;
  padding: 16px 8px 36px;
  background: radial-gradient(ellipse at center, rgba(17, 236, 152, 0.15), transparent 68%);
}

.wheel-pointer {
  position: absolute;
  z-index: 8;
  top: 4px;
  left: 50%;
  width: clamp(32px, 10%, 64px);
  height: auto;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.72));
  pointer-events: none;
  transform: translateX(-50%);
}

.prize-wheel {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  background:
    radial-gradient(circle, transparent 0 27%, #d9b345 27.5% 29%, transparent 29.5%),
    repeating-conic-gradient(from -18deg, #08784b 0 34deg, #f6f5ed 34deg 36deg, #ffffff 36deg 70deg, #d8b13f 70deg 72deg);
  box-shadow:
    inset 0 0 18px rgba(0, 0, 0, 0.45),
    0 0 48px rgba(0, 176, 102, 0.25);
  cursor: pointer;
  transition: transform 3.2s cubic-bezier(0.16, 0.72, 0.15, 1);
}

.prize-wheel:focus-visible {
  outline: 2px solid #6affc5;
  outline-offset: 8px;
}

.prize-wheel--spinning { cursor: progress; }

.wheel-prize {
  display: grid;
  position: absolute;
  z-index: 2;
  top: 43.5%;
  left: 43.5%;
  width: 13%;
  height: 13%;
  place-items: center;
  transform: rotate(calc(var(--wheel-angle) * 1deg)) translateY(-270%) rotate(calc(var(--wheel-angle) * -1deg));
}

.wheel-prize img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.48));
}

.wheel-outer-ring {
  position: absolute;
  z-index: 6;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.62));
}

.wheel-center {
  position: absolute;
  z-index: 7;
  top: 50%;
  left: 50%;
  width: 31%;
  height: 31%;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(calc(var(--wheel-rotation) * -1));
  transition: transform 3.2s cubic-bezier(0.16, 0.72, 0.15, 1);
}

.wheel-center img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.68));
}

.spin-result {
  position: absolute;
  bottom: 0;
  margin: 0;
  color: #c6d5cf;
  font-size: 12px;
  text-align: center;
}

.spin-result strong { color: #48efb7; }

.spin-ticket-action {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 600px;
  margin-inline: auto;
}

.spin-ticket-cta {
  display: grid;
  min-width: 0;
  min-height: 72px;
  align-items: center;
  padding: 14px 18px;
  border: 1px solid rgba(167, 255, 216, 0.55);
  border-radius: 20px;
  color: #ffffff;
  text-decoration: none;
  background: linear-gradient(115deg, rgba(46, 235, 161, 0.35), rgba(3, 137, 88, 0.58) 48%, rgba(2, 87, 59, 0.6));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.28), 0 8px 28px rgba(0, 185, 118, 0.13);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  grid-template-columns: 42px minmax(0, 1fr) 32px;
  gap: 16px;
  transition: background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.spin-ticket-cta__icon,
.spin-ticket-cta__arrow {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(211, 255, 235, 0.25);
  border-radius: 13px;
  color: #dcffed;
  background: rgba(209, 255, 233, 0.1);
}

.spin-ticket-cta__arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: transform 180ms ease;
}

.spin-ticket-cta__label {
  min-width: 0;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.4;
  text-align: center;
  text-wrap: balance;
}

@media (hover: hover) {
  .spin-ticket-cta:hover {
    background-color: rgba(67, 255, 177, 0.12);
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.4), 0 10px 32px rgba(0, 211, 134, 0.22);
    transform: translateY(-1px);
  }

  .spin-ticket-cta:hover .spin-ticket-cta__arrow { transform: translateX(3px); }
}

.spin-sidebar {
  display: grid;
  min-width: 0;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 16px;
}

.recent-spin-card {
  overflow: hidden;
  min-height: 250px;
  padding: 24px;
  background:
    linear-gradient(90deg, rgba(4, 35, 25, 0.88) 0%, rgba(4, 35, 25, 0.72) 46%, rgba(4, 35, 25, 0.08) 100%),
    url('/reference/recent-spin.webp') right center / cover no-repeat;
}

.recent-spin-lock {
  position: absolute;
  top: 24px;
  right: 24px;
  color: #caffdf;
  filter: drop-shadow(0 0 8px rgba(111, 255, 178, 0.55));
}

.recent-spin-card p {
  position: relative;
  z-index: 2;
  max-width: 80%;
  margin: 10px 0 0;
  color: #d4e4dd;
  font-size: 13px;
  line-height: 1.5;
}

.recent-spin-card p strong,
.recent-spin-card p a {
  color: #48efb7;
  text-decoration: none;
}

.recent-spin-card h3 {
  position: relative;
  z-index: 2;
  margin: 18px 0 0;
  font-size: 15px;
}

.auth-actions {
  display: flex;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;
}

.auth-actions a {
  display: inline-flex;
  min-width: 100px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(111, 255, 197, 0.4);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
  gap: 6px;
}

.auth-primary {
  color: #ffffff;
  background: linear-gradient(rgba(19, 213, 142, 0.8), rgba(6, 117, 79, 0.6));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.25), 0 0 18px rgba(0, 227, 147, 0.2);
}

.auth-secondary {
  color: #48efb7;
  background: rgba(150, 255, 213, 0.08);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.spin-ticket-cta:focus-visible {
  outline: 2px solid #6affc5;
  outline-offset: 3px;
}

@media (max-width: 63.99rem) {
  .spin-section {
    padding: 10px;
    border-radius: 26px;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .spin-section .spin-main-panel { padding: 20px; }
  .ticket-tiers { justify-content: flex-start; }
}

@media (max-width: 30rem) {
  .spin-section { padding: 6px; border-radius: 24px; }
  .spin-section .spin-main-panel { padding: 18px 12px; }
  .spin-heading > div:first-child > span, .panel-eyebrow { font-size: 12px; }
  .spin-heading h2 { font-size: 28px; }
  .ticket-tiers { gap: 6px; }
  .ticket-tier { min-width: 0; padding: 8px 9px; font-size: 9px; }
  .wheel-stage { margin-top: 20px; padding-inline: 2px; }
  .spin-ticket-cta { min-height: 64px; padding: 12px; border-radius: 16px; grid-template-columns: 36px minmax(0, 1fr) 28px; gap: 10px; }
  .spin-ticket-cta__icon { width: 36px; height: 36px; border-radius: 11px; }
  .spin-ticket-cta__arrow { width: 28px; height: 28px; }
  .spin-ticket-cta__label { font-size: 14px; }
  .recent-spin-card { padding: 20px; }
  .recent-spin-card p { max-width: 88%; }
}

@media (prefers-reduced-motion: reduce) {
  .prize-wheel, .wheel-center { transition-duration: 0.01ms; }
  .spin-ticket-cta, .spin-ticket-cta__arrow { transition: none; }
}
</style>
