<script setup lang="ts">
import { ChevronRight, Unlock } from 'lucide-vue-next'
import type { Prediction, PredictionOption } from '~/data/predictions'

const props = defineProps<{
  prediction: Prediction
  unlocked?: boolean
}>()

const emit = defineEmits<{
  unlock: [prediction: Prediction]
  selectOdd: [prediction: Prediction, option: PredictionOption]
}>()

const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const { translate } = useSiteLocale()

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

const isPredictedOption = (option: PredictionOption): boolean => {
  const sel = (props.prediction.selection || '').toLowerCase().trim()
  const optLabel = (option.label || '').toLowerCase().trim()
  if (!sel) return false
  if (optLabel === sel) return true
  if (sel === 'home' && (optLabel === 'h' || optLabel.startsWith('home'))) return true
  if (sel === 'draw' && (optLabel === 'd' || optLabel.startsWith('draw'))) return true
  if (sel === 'away' && (optLabel === 'a' || optLabel.startsWith('away'))) return true
  if (sel === 'over' && optLabel.startsWith('over')) return true
  if (sel === 'under' && optLabel.startsWith('under')) return true
  return false
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
        </div>
      </div>

      <div class="prediction-card__hit-rate">
        <span>{{ translate('Hit Rate') }}</span>
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
        <svg v-else width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10.0003 18.3332C13.222 18.3332 15.8337 15.7215 15.8337 12.4998C15.8337 9.27818 13.222 6.6665 10.0003 6.6665C6.77866 6.6665 4.16699 9.27818 4.16699 12.4998C4.16699 15.7215 6.77866 18.3332 10.0003 18.3332Z" stroke="currentColor" stroke-width="1.8" class="stroke-dividers-1"></path><path d="M12.9163 7.49984V4.58317C12.9163 2.97234 11.6105 1.6665 9.99967 1.6665C8.38884 1.6665 7.08301 2.97234 7.08301 4.58317V7.49984" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" class="stroke-dividers-1"></path><path d="M10 10.8335V14.1668" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="stroke-dividers-1"></path></svg>
        <span>{{ unlocked ? 'Unlocked' : 'Unlock' }}</span>
      </button>
    </div>

    <div class="match-box">
      <div class="match-box__meta-row">
        <div class="match-box__meta">
          <span class="match-box__market">{{ translate(prediction.marketType) }}</span>
          <img
            :src="sportIcon"
            :alt="prediction.sport || 'Sport'"
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
        <span class="match-box__team-col">
          <strong>{{ prediction.homeTeam }}</strong>
        </span>
        <span class="match-box__vs">vs</span>
        <span class="match-box__team-col">
          <strong>{{ prediction.awayTeam }}</strong>
        </span>
      </div>

      <div
        class="match-box__odds"
        :class="{ 'match-box__odds--three': prediction.marketType === '1X2' }"
      >
        <button
          v-for="option in prediction.options"
          :key="`${option.label}-${option.odd}`"
          type="button"
          :class="{ 'match-box__odd--predicted': isPredictedOption(option) }"
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
  color: var(--main-color);
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
  border: 1px solid var(--main-color);
  border-radius: 8px;
  color: #f5f5f5;
  font-size: 12px;
  font-weight: 700;
  background: #1f2321;
  cursor: pointer;
  gap: 5px;
  transition: background-color 150ms ease, color 150ms ease;
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
  background: var(--main-color);
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

.match-box__team-col {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  text-align: center;
}

.match-box__vs {
  display: grid;
  place-items: center;
  color: #dddddd;
  font-size: 11px;
  font-weight: 600;
}

.match-box__odds {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.match-box__odds--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.match-box__odds button {
  min-width: 0;
  min-height: 40px;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 9px;
  color: #929592;
  font-size: 12px;
  font-weight: 600;
  background: #252525;
  cursor: pointer;
  gap: 6px;
  transition: color 150ms ease, background-color 150ms ease, border-color 150ms ease;
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
  .match-box__odds--three button {
    padding: 0 6px;
    font-size: 11px;
    gap: 4px;
  }
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
