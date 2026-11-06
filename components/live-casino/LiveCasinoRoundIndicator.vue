<script setup lang="ts">
import { computed } from 'vue'
import { getLiveCasinoRoundState } from '~/utils/liveCasinoRound'

const props = defineProps<{
  tableId: string
  elapsedMs: number
}>()

const state = computed(() => getLiveCasinoRoundState(props.tableId, props.elapsedMs))
const timerColor = computed(() => {
  if (state.value.secondsRemaining <= 5) return '#f04444'
  if (state.value.secondsRemaining <= 10) return '#f5b734'
  return '#2bd868'
})
</script>

<template>
  <span class="live-casino-round-indicator" aria-hidden="true">
    <Transition name="casino-round-phase" mode="out-in">
      <span v-if="state.phase === 'countdown'" key="countdown" class="casino-round-timer">
        <svg class="casino-round-ring" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="rgb(0 0 0 / 76%)" stroke="rgb(255 255 255 / 18%)" stroke-width="2" />
          <circle
            cx="12"
            cy="12"
            r="10"
            pathLength="1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="1"
            :stroke="timerColor"
            :stroke-dashoffset="1 - state.progress"
            class="casino-round-progress"
          />
        </svg>
        <span class="casino-round-seconds">{{ state.secondsRemaining }}</span>
      </span>

      <span v-else key="dealing" class="casino-round-dealing">
        <span class="casino-round-gold-card">
          <span class="casino-round-card-face">
            <svg class="casino-round-card-mark" viewBox="0 0 12 17" fill="none">
              <path d="m2.2 7.1 2.4 1.3-2.4 1.2m3.1-2.4 1.4 2.3 1.4-2.3m2.1.1-1.3 1.2 1.3 1.2" stroke="currentColor" stroke-width=".85" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="casino-round-card-fold" />
        </span>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.live-casino-round-indicator {
  --round-indicator-size: 18px;
  position: absolute;
  z-index: 2;
  bottom: 4px;
  left: 6px;
  display: grid;
  width: var(--round-indicator-size);
  height: var(--round-indicator-size);
  place-items: center;
  pointer-events: none;
  user-select: none;
}

.casino-round-timer {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.casino-round-ring {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.casino-round-progress {
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 250ms linear, stroke 250ms ease;
}

.casino-round-seconds {
  position: relative;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  text-align: center;
  text-shadow: 0 1px 2px #000;
}

.casino-round-dealing {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.casino-round-gold-card {
  position: relative;
  display: block;
  width: 12px;
  height: 17px;
  filter: drop-shadow(0 0.5px 1px rgb(0 0 0 / 35%));
}

.casino-round-card-face {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 90%);
  border-radius: 1px;
  background: linear-gradient(145deg, rgb(218 187 131 / 72%), rgb(187 149 100 / 76%));
  clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%);
  animation: casino-round-card-corner 2s linear infinite;
}

.casino-round-card-mark {
  position: absolute;
  inset: -1px;
  width: 12px;
  height: 17px;
  color: rgb(255 255 255 / 88%);
}

.casino-round-card-fold {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  background: linear-gradient(135deg, #f4e9d0 4%, #d8c3a1 55%, #fff9eb 95%);
  clip-path: polygon(0 0, 100% 0, 0 100%);
  transform-origin: bottom right;
  animation: casino-round-card-peel 2s linear infinite;
}

@keyframes casino-round-card-corner {
  0%, 38%, 75%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 0 100%); }
  48% { clip-path: polygon(0 0, 100% 0, 100% 79%, 72% 100%, 0 100%); }
  56% { clip-path: polygon(0 0, 100% 0, 100% 47%, 33% 100%, 0 100%); }
  63% { clip-path: polygon(0 0, 100% 0, 100% 66%, 53% 100%, 0 100%); }
}

@keyframes casino-round-card-peel {
  0%, 38%, 75%, 100% { width: 0; height: 0; opacity: 0; }
  48% { width: 3.4px; height: 3.6px; opacity: 1; }
  56% { width: 8px; height: 9px; opacity: 1; }
  63% { width: 5.6px; height: 5.8px; opacity: 1; }
}

.casino-round-phase-enter-active,
.casino-round-phase-leave-active {
  transition: opacity 130ms ease, transform 130ms ease;
}

.casino-round-phase-enter-from,
.casino-round-phase-leave-to {
  opacity: 0;
  transform: scale(0.75);
}

@media (prefers-reduced-motion: reduce) {
  .casino-round-card-face,
  .casino-round-card-fold {
    animation: none;
  }

  .casino-round-progress,
  .casino-round-phase-enter-active,
  .casino-round-phase-leave-active {
    transition: none;
  }
}
</style>
