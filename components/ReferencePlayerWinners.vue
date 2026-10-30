<script setup lang="ts">
import { Pause, Play } from 'lucide-vue-next'
import { JACKPOT_WINNERS } from '~/data/jackpot'

const isPaused = ref(false)
const providerName = (logo: string): string => (
  logo.split('/').pop()?.replace(/\.[^.]+$/, '').toUpperCase() || 'Game provider'
)
</script>

<template>
  <section class="player-winners" aria-labelledby="player-winners-title">
    <header class="player-winners__header">
      <h3 id="player-winners-title">Player Winners</h3>
      <div class="player-winners__actions">
        <NuxtLink to="/explore/egames/jackpot/jdb">View All</NuxtLink>
        <button
          type="button"
          class="winner-motion-toggle"
          :aria-label="isPaused ? 'Resume player winners' : 'Pause player winners'"
          :aria-pressed="isPaused"
          @click="isPaused = !isPaused"
        >
          <component :is="isPaused ? Play : Pause" :size="14" aria-hidden="true" />
        </button>
      </div>
    </header>

    <div class="winner-list" :class="{ 'winner-list--paused': isPaused }">
      <div class="winner-list__track">
        <ul
          v-for="copy in 3"
          :key="copy"
          class="winner-list__group"
          :aria-hidden="copy > 1 ? true : undefined"
          role="list"
        >
          <li v-for="winner in JACKPOT_WINNERS" :key="winner.id" class="winner-row">
            <img
              class="winner-row__provider"
              :src="winner.providerLogo"
              :alt="copy === 1 ? providerName(winner.providerLogo) : ''"
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
  min-height: 320px;
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
  animation: winners-marquee 60s linear infinite;
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
  min-height: 76px;
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

.winner-list--paused .winner-list__track { animation-play-state: paused; }

@container (min-width: 440px) {
  .winner-row { grid-template-columns: 36px minmax(0, 1fr) auto 90px; }
  .winner-row__player { display: contents; }
  .winner-row__player strong { grid-column: 2; grid-row: 1; }
  .winner-row__player span { grid-column: 4; grid-row: 1; text-align: right; }
  .winner-row__amount { grid-column: 3; grid-row: 1; }
}

@keyframes winners-marquee {
  to { transform: translateY(-33.333333%); }
}

@media (hover: hover) {
  .winner-list:hover .winner-list__track { animation-play-state: paused; }
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
  .winner-list__track { position: static; animation: none; }
  .winner-list__group[aria-hidden='true'], .winner-motion-toggle { display: none; }
}
</style>
