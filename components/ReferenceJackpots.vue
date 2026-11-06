<script setup lang="ts">
import type { Ref } from 'vue'
import { ArrowRight, Trophy, LockKeyhole, LogIn, UserPlus } from 'lucide-vue-next'
import ReferencePlayerWinners from '~/components/ReferencePlayerWinners.vue'
import {
  JILI_JACKPOT_COUNTER,
  CQ9_JACKPOT_COUNTER,
  JDB_JACKPOT_COUNTER,
  formatJackpotAmount,
  useJackpotCounter,
} from '~/composables/useJackpotCounter'

type JackpotKey = 'jili' | 'cq9' | 'jdb'

interface Jackpot {
  key: JackpotKey
  label: string
  image: string
  to: string
  amountColor: string
  borderEffectColor: string
}

const jackpots: Jackpot[] = [
  {
    key: 'jili',
    label: 'JILI Jackpot',
    image: '/images/jackpots/mega-red.webp',
    to: '/explore/egames/jackpot/jili',
    amountColor: '#FF99FF',
    borderEffectColor: '#ff4138',
  },
  {
    key: 'cq9',
    label: 'CQ9 Jackpot',
    image: '/images/jackpots/cq9-jackpot.webp',
    to: '/explore/egames/jackpot/cq9',
    amountColor: '#7fd8ff',
    borderEffectColor: '#D10CFF',
  },
  {
    key: 'jdb',
    label: 'JDB Jackpot',
    image: '/images/jackpots/jdb-jackpot.webp',
    to: '/explore/egames/jackpot/jdb',
    amountColor: '#FEE05B',
    borderEffectColor: '#1352DE',
  },
]

const { displayAmount: jiliDisplay } = useJackpotCounter(JILI_JACKPOT_COUNTER)
const { displayAmount: cq9Display } = useJackpotCounter(CQ9_JACKPOT_COUNTER)
const { displayAmount: jdbDisplay } = useJackpotCounter(JDB_JACKPOT_COUNTER)

const jackpotDisplays: Record<JackpotKey, Ref<number>> = {
  jili: jiliDisplay,
  cq9: cq9Display,
  jdb: jdbDisplay,
}

const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl
const { translate } = useSiteLocale()
</script>

<template>
  <section class="jackpot-section" aria-labelledby="jackpots-title">
    <header>
      <div>
        <Trophy :size="16" fill="currentColor" aria-hidden="true" />
        <h2 id="jackpots-title">{{ translate('Top Jackpots') }}</h2>
      </div>
      <NuxtLink to="/explore/egames/jackpot/all">{{ translate('View All') }} <ArrowRight :size="9" /></NuxtLink>
    </header>
    <div class="jackpot-grid">
      <NuxtLink
        v-for="jackpot in jackpots"
        :key="jackpot.label"
        :to="jackpot.to"
        :style="{
          '--jackpot-image': `url('${jackpot.image}')`,
          '--jackpot-amount': jackpot.amountColor,
          '--jackpot-border-effect': jackpot.borderEffectColor,
        }"
      >
        <span class="jackpot-text">
          <small>{{ translate(jackpot.label) }}</small>
          <strong>${{ formatJackpotAmount(jackpotDisplays[jackpot.key].value) }}</strong>
        </span>
      </NuxtLink>
    </div>

    <div class="jackpot-bottom-grid">
      <section class="recent-spin-card font-bold" aria-labelledby="recent-spin-title">
        <span class="panel-eyebrow">{{ translate('Win Jackpot in 2Bet') }}</span>
        <p>{{ translate('Everyone dreams of that one massive hit, and we provide the perfect stage for those dreams to unfold. We host a wide array of jackpot titles that range from fixed amounts to progressive totals that grow with every single spin across our network. We want our users to feel the rush of adrenaline that comes with chasing a life-changing total.') }}</p>
        <h3 id="recent-spin-title">{{ translate('Sign in to track your wins') }}</h3>
        <p>{{ translate('Log in or create an account to save spins, claim prizes, and view your win history.') }}</p>
        <div class="auth-actions">
          <a :href="externalSiteUrl" target="_blank" rel="nofollow noopener noreferrer" class="auth-primary">
            <LogIn :size="14" /> {{ translate('Login') }}
          </a>
          <a :href="externalSiteUrl" target="_blank" rel="nofollow noopener noreferrer" class="auth-secondary">
            <UserPlus :size="14" /> {{ translate('Sign Up') }}
          </a>
        </div>
      </section>

      <ReferencePlayerWinners />
    </div>
  </section>
</template>

<style scoped>
.jackpot-section {
  margin-top: 0.2rem;
}

.jackpot-section header {
  display: flex;
  min-height: 1.35rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.18rem;
}

.jackpot-section header > div {
  display: flex;
  align-items: center;
  color: #f7c43c;
  gap: 0.3rem;
}

.jackpot-section h2 {
  margin: 0;
  color: white;
  font-size: var(--font-section-heading);
  font-weight: 750;
}

.jackpot-section header small {
  color: #8a9c93;
  font-size: 0.35rem;
}

.jackpot-info {
  color: #8a9c93;
}

.jackpot-section header > a {
  display: flex;
  position: relative;
  isolation: isolate;
  align-items: center;
  min-height: 1.15rem;
  padding: 0.12rem 0.38rem;
  overflow: hidden;
  border: 1px solid rgba(214, 232, 222, 0.17);
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.37rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.13), transparent 52%),
    rgba(3, 18, 13, 0.62);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px rgba(0, 0, 0, 0.28),
    0 0.16rem 0.42rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(18px) saturate(1.45);
  -webkit-backdrop-filter: blur(18px) saturate(1.45);
  gap: 0.18rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.jackpot-section header > a::before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 10%;
  left: 10%;
  height: 50%;
  border-radius: 0 0 50% 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), transparent);
  content: '';
  pointer-events: none;
}

.jackpot-section header > a:hover {
  border-color: rgba(91, 230, 179, 0.5);
  color: #ffffff;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.17), transparent 52%),
    rgba(4, 53, 38, 0.68);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.26),
    inset 0 -1px rgba(0, 25, 17, 0.3),
    0 0.2rem 0.5rem rgba(0, 0, 0, 0.26),
    0 0 0.45rem rgba(50, 212, 154, 0.1);
  transform: translateY(-1px);
}

.jackpot-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.28rem;
}

.jackpot-grid > a {
  --jackpot-card-radius: 0.42rem;
  display: flex;
  position: relative;
  min-width: 0;
  height: 7.5rem;
  align-items: center;
  padding: 0.12rem 0.3rem 0.12rem 39%;
  overflow: hidden;
  border: 0;
  border-radius: var(--jackpot-card-radius);
  color: white;
  background-color: #101914;
  background-image: var(--jackpot-image);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  isolation: isolate;
}

.jackpot-grid > a::before {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 0;
  padding: 2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--jackpot-border-angle),
    transparent 0deg 235deg,
    var(--jackpot-border-effect) 272deg,
    white 304deg,
    var(--jackpot-border-effect) 332deg,
    transparent 360deg
  );
  pointer-events: none;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: jackpot-border-run 2.8s linear infinite;
}

.jackpot-grid > a:hover {
  filter: brightness(1.12);
}

.jackpot-text {
  display: flex;
  position: relative;
  z-index: 2;
  min-width: 0;
  flex: 1;
  align-items: center;
  flex-direction: column;
}

.jackpot-grid small {
  overflow: hidden;
  color: #f1f5f3;
  font-size: 0.36rem;
  font-weight: 750;
  text-transform: uppercase;
  white-space: nowrap;
}

.jackpot-grid strong {
  overflow: hidden;
  color: var(--jackpot-amount);
  font-size: 0.64rem;
  font-weight: 850;
  white-space: nowrap;
  text-shadow: 0 0.1rem 0.16rem rgba(0, 0, 0, 0.5);
}

.jackpot-bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 1fr);
  gap: 16px;
  margin-top: 16px;
  align-items: stretch;
}

.recent-spin-card {
  display: flex;
  position: relative;
  overflow: hidden;
  min-height: 250px;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px;
  border: 1px solid rgba(197, 255, 231, 0.24);
  border-radius: 24px;
  background:
    linear-gradient(90deg, rgba(4, 35, 25, 0.90) 0%, rgba(4, 35, 25, 0.72) 46%, rgba(4, 35, 25, 0.2) 100%),
    url('/reference/recent-spin.webp') right center / cover no-repeat;
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.16),
    inset 0 -1px rgba(148, 255, 209, 0.05),
    0 12px 32px rgba(0, 0, 0, 0.16);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  backdrop-filter: blur(20px) saturate(150%);
}

.panel-eyebrow {
  color: #48efb7;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.recent-spin-card p {
  position: relative;
  z-index: 2;
  max-width: 65%;
  margin: 10px 0 0;
  color: #fff;
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
  color: #ffffff;
  font-size: 15px;
}

.auth-actions {
  display: flex;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 16px;
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

@property --jackpot-border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes jackpot-border-run {
  to {
    --jackpot-border-angle: 360deg;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jackpot-grid > a::before {
    animation: none;
    background: var(--jackpot-border-effect);
    opacity: 0.8;
  }
}

@media (min-width: 48rem) {
  .jackpot-grid > a {
    --jackpot-card-radius: 0.75rem;
  }

  .jackpot-section header small,
  .jackpot-section header > a,
  .jackpot-grid small {
    font-size: 0.5rem;
  }

  .jackpot-grid strong {
    font-size: 1.3rem;
  }
}

@media (max-width: 63.99rem) {
  .jackpot-section {
    margin-top: 0.5rem;
  }

  .jackpot-section header {
    min-height: 1.85rem;
    margin-bottom: 0.35rem;
  }

  .jackpot-section header > div {
    gap: 0.38rem;
  }

  .jackpot-section h2 {
    font-size: 0.95rem;
  }

  .jackpot-section header small,
  .jackpot-info {
    display: none;
  }

  .jackpot-section header > a {
    min-height: 1.65rem;
    padding: 0.22rem 0.65rem;
    font-size: 0.75rem;
    gap: 0.24rem;
  }

  .jackpot-section header > a :deep(svg) {
    width: 0.75rem;
    height: 0.75rem;
  }

  .jackpot-grid {
    grid-auto-columns: calc((100% - 0.38rem) / 2);
    grid-auto-flow: column;
    grid-template-columns: none;
    margin-right: calc(var(--page-padding) * -1);
    padding-right: var(--page-padding);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
    gap: 0.38rem;
  }

  .jackpot-grid::-webkit-scrollbar {
    display: none;
  }

  .jackpot-grid > a {
    --jackpot-card-radius: 0.5rem;
    height: 4.35rem;
    padding: 0.2rem 0.38rem 0.2rem 40%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  .jackpot-text {
    gap: 0.08rem;
  }

  .jackpot-grid small {
    font-size: clamp(0.58rem, 2.3vw, 0.72rem);
    letter-spacing: 0.02em;
  }

  .jackpot-grid strong {
    font-size: clamp(0.78rem, 3.3vw, 1rem);
  }

  .jackpot-bottom-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 14px;
  }
}

@media (max-width: 30rem) {
  .jackpot-bottom-grid {
    gap: 12px;
    margin-top: 12px;
  }

  .recent-spin-card {
    padding: 20px;
  }

  .recent-spin-card p {
    max-width: 90%;
  }

  .panel-eyebrow {
    font-size: 12px;
  }
}
</style>

