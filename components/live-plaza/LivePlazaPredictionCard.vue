<script setup lang="ts">
import { ChevronRight, Lock, Unlock } from 'lucide-vue-next'
import type { Prediction, PredictionOption } from '~/data/predictions'

const props = defineProps<{
  prediction: Prediction
  unlocked?: boolean
}>()

const emit = defineEmits<{
  unlock: [prediction: Prediction]
  selectOdd: [prediction: Prediction, option: PredictionOption]
}>()

const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl

const formattedHitRate = computed(() => {
  return Number.isInteger(props.prediction.hitRate)
    ? props.prediction.hitRate.toFixed(0)
    : props.prediction.hitRate.toFixed(2)
})

const sportIcon = computed(() => {
  return props.prediction.sport === 'basketball'
    ? '/icons/sports/basketball.webp'
    : '/icons/sports/soccer.webp'
})

const handleAvatarError = (event: Event): void => {
  const image = event.currentTarget as HTMLImageElement
  if (!image.src.endsWith('/images/predictions/jedaiah.webp')) {
    image.src = '/images/predictions/jedaiah.webp'
  }
}

const redirectTo2Bet = (): void => {
  void navigateTo(bybetRedirectUrl, { external: true })
}

const handleCardClick = (event: MouseEvent): void => {
  const target = event.target

  if (target instanceof Element && target.closest('button, a')) {
    return
  }

  redirectTo2Bet()
}

const handleCardKeydown = (event: KeyboardEvent): void => {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return
  }

  const target = event.target

  if (target instanceof Element && target.closest('button, a')) {
    return
  }

  event.preventDefault()
  redirectTo2Bet()
}
</script>

<template>
  <article
    class="prediction-card"
    role="link"
    tabindex="0"
    :aria-label="`Open ${prediction.predictorName}'s prediction on 2Bet`"
    @click="handleCardClick"
    @keydown="handleCardKeydown"
  >
    <div class="prediction-card__summary">
      <div class="prediction-card__author">
        <img
          :src="prediction.predictorAvatar"
          :alt="prediction.predictorName"
          class="prediction-card__avatar"
          width="44"
          height="44"
          loading="lazy"
          decoding="async"
          @error="handleAvatarError"
        >
        <div class="prediction-card__identity">
          <strong>{{ prediction.predictorName }}</strong>
          <span v-if="prediction.winStreak" class="prediction-card__streak">
            {{ prediction.winStreak }}
          </span>
        </div>
      </div>

      <div class="prediction-card__hit-rate">
        <span>Hit Rate</span>
        <strong>{{ formattedHitRate }}<small>%</small></strong>
      </div>
    </div>

    <div class="prediction-card__status-row">
      <span class="prediction-card__published">{{ prediction.publishedAgo }}</span>
      <button
        type="button"
        class="prediction-card__unlock"
        :class="{ 'prediction-card__unlock--active': unlocked }"
        @click="emit('unlock', prediction)"
      >
        <Unlock v-if="unlocked" :size="13" :stroke-width="2.5" aria-hidden="true" />
        <Lock v-else :size="13" :stroke-width="2.5" aria-hidden="true" />
        <span>{{ unlocked ? 'Unlocked' : 'Unlock' }}</span>
      </button>
    </div>

    <div class="match-box">
      <div class="match-box__meta-row">
        <div class="match-box__meta">
          <span class="match-box__market">{{ prediction.marketType }}</span>
          <img
            :src="sportIcon"
            alt=""
            class="match-box__sport"
            width="16"
            height="16"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          >
          <span class="match-box__league">{{ prediction.league }}</span>
          <span class="match-box__time">{{ prediction.matchTime }}</span>
        </div>
        <span class="match-box__arrow" aria-hidden="true">
          <ChevronRight :size="14" :stroke-width="2.6" />
        </span>
      </div>

      <div class="match-box__teams">
        <strong>{{ prediction.homeTeam }}</strong>
        <span>vs</span>
        <strong>{{ prediction.awayTeam }}</strong>
      </div>

      <div class="match-box__odds">
        <button
          v-for="option in prediction.options"
          :key="`${option.label}-${option.odd}`"
          type="button"
          @click="emit('selectOdd', prediction, option)"
        >
          <span>{{ option.label }}</span>
          <strong>{{ option.odd }}</strong>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.prediction-card {
  display: flex;
  min-width: 0;
  min-height: 212px;
  flex-direction: column;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.025);
  border-radius: 12px;
  color: #ffffff;
  background: #141414;
  cursor: pointer;
  transition: border-color 150ms ease, background-color 150ms ease;
}

.prediction-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  background: #161616;
}

.prediction-card:focus-visible {
  outline: 2px solid #13ae7d;
  outline-offset: 2px;
}

.prediction-card__summary,
.prediction-card__status-row,
.match-box__meta-row,
.match-box__teams,
.match-box__odds button {
  display: flex;
  align-items: center;
}

.prediction-card__summary,
.prediction-card__status-row,
.match-box__meta-row {
  justify-content: space-between;
}

.prediction-card__author {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 9px;
}

.prediction-card__avatar {
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  border: 2px solid rgba(255, 255, 255, 0.82);
  border-radius: 50%;
  object-fit: cover;
  background: #222222;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.8);
}

.prediction-card__identity {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.prediction-card__identity strong {
  overflow: hidden;
  max-width: 9rem;
  font-size: 14px;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prediction-card__streak {
  padding: 2px 7px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 9px;
  font-weight: 800;
  line-height: 1.2;
  background: #fb4053;
}

.prediction-card__hit-rate {
  display: flex;
  flex: 0 0 auto;
  align-items: baseline;
  color: #838783;
  gap: 5px;
}

.prediction-card__hit-rate > span {
  font-size: 10px;
}

.prediction-card__hit-rate strong {
  color: #13ae7d;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}

.prediction-card__hit-rate small {
  margin-left: 2px;
  color: #f2f2f2;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0;
}

.prediction-card__status-row {
  min-height: 25px;
  margin-top: 2px;
  margin-bottom: 7px;
}

.prediction-card__published {
  overflow: hidden;
  color: #787c79;
  font-size: 10px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prediction-card__unlock {
  display: inline-flex;
  min-height: 29px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border: 1px solid #078a63;
  border-radius: 8px;
  color: #f5f5f5;
  font-size: 12px;
  font-weight: 700;
  background: #1f2321;
  cursor: pointer;
  gap: 5px;
  transition: background-color 150ms ease, color 150ms ease;
}

.prediction-card__unlock:hover,
.prediction-card__unlock--active {
  color: #32d49a;
  background: rgba(3, 98, 66, 0.2);
}

.match-box {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #303330;
  border-radius: 11px;
  background: #151515;
  gap: 7px;
}

.match-box__meta {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 6px;
}

.match-box__market {
  flex: 0 0 auto;
  padding: 2px 6px;
  border-radius: 4px;
  color: #ffffff;
  font-size: 9px;
  font-weight: 800;
  line-height: 1.2;
  background: #07835e;
}

.match-box__sport {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  object-fit: contain;
}

.match-box__league,
.match-box__time {
  color: #858985;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
}

.match-box__league {
  overflow: hidden;
  text-overflow: ellipsis;
}

.match-box__time {
  flex: 0 0 auto;
}

.match-box__arrow {
  display: grid;
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  place-items: center;
  margin-left: 6px;
  border-radius: 50%;
  color: #d5d7d5;
  background: #292929;
}

.match-box__teams {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr) 32px minmax(0, 1fr);
  color: #f3f3f3;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
}

.match-box__teams strong {
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.match-box__teams span {
  color: #dddddd;
  font-size: 11px;
  font-weight: 600;
}

.match-box__odds {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.match-box__odds button {
  min-width: 0;
  min-height: 40px;
  justify-content: space-between;
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  color: #929592;
  font-size: 12px;
  font-weight: 600;
  background: #252525;
  cursor: pointer;
  gap: 8px;
  transition: color 150ms ease, background-color 150ms ease;
}

.match-box__odds button:hover {
  color: #ffffff;
  background: #2d2d2d;
}

.match-box__odds span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.match-box__odds strong {
  flex: 0 0 auto;
  color: #f7f7f7;
}

@media (max-width: 40rem) {
  .prediction-card {
    min-height: 0;
  }

  .prediction-card__hit-rate strong {
    font-size: 22px;
  }

  .match-box__time {
    display: none;
  }

  .match-box__teams {
    font-size: 11px;
  }
}
</style>
