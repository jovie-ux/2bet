<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { User } from 'lucide-vue-next'
import LiveCasinoRoadmap from '~/components/live-casino/LiveCasinoRoadmap.vue'
import LiveCasinoRoundIndicator from '~/components/live-casino/LiveCasinoRoundIndicator.vue'
import type { LiveCasinoTable } from '~/data/live-casino'
import { getTableRoadPattern } from '~/utils/liveCasinoRoadPatterns'
import {
  getLiveCasinoRoundState,
  getDynamicRouletteResults,
  getDynamicSicBoResults,
  getDynamicFanTanResults,
  getDynamicBlackjackSeats,
  getDynamicBaccaratWins,
} from '~/utils/liveCasinoRound'

const props = withDefaults(defineProps<{
  table: LiveCasinoTable
  elapsedMs: number
  showRoadmap?: boolean
  compact?: boolean
  layout?: 'vertical' | 'horizontal'
  titleTag?: 'h2' | 'span'
}>(), { showRoadmap: true, compact: false, layout: 'vertical', titleTag: 'span' })
const emit = defineEmits<{ select: [table: LiveCasinoTable] }>()
const tableImage = ref<HTMLImageElement | null>(null)
const imageLoaded = ref(false)
const imageFailed = ref(false)
const imageSource = computed(() => props.table.image || '')

const roundState = computed(() => getLiveCasinoRoundState(props.table.id, props.elapsedMs))
const currentRound = computed(() => roundState.value.round)

const hasRoadmap = computed(() => ['baccarat', 'dragon-tiger'].includes(props.table.category))
const hasRoundIndicator = computed(() => true)

const dynamicWins = computed(() => hasRoadmap.value
  ? getDynamicBaccaratWins(props.table.id, props.table.wins, currentRound.value)
  : props.table.wins)
const dynamicTable = computed<LiveCasinoTable>(() => ({
  ...props.table,
  wins: dynamicWins.value,
}))

const roadPattern = computed(() => hasRoadmap.value ? getTableRoadPattern(dynamicTable.value) : undefined)
const roadPatternSide = computed(() => roadPattern.value && 'side' in roadPattern.value ? roadPattern.value.side : undefined)

const isRouletteLike = computed(() => ['roulette', 'game-show', 'live-show'].includes(props.table.category))

const rouletteResults = computed<number[]>(() => {
  if (!isRouletteLike.value) return []
  return getDynamicRouletteResults(props.table.id, props.table.category, props.table.wins, currentRound.value)
})
const rouletteColor = (number: number): string => {
  if (number === 0) return '#168147'
  return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number) ? '#d42c3e' : '#202328'
}

const sicboRounds = computed(() => {
  if (props.table.category !== 'sicbo') return []
  return getDynamicSicBoResults(props.table.id, props.table.wins, currentRound.value)
})

const fantanResults = computed<number[]>(() => {
  if (props.table.category !== 'fan-tan') return []
  return getDynamicFanTanResults(props.table.id, props.table.wins, currentRound.value)
})

const blackjackSeats = computed<boolean[]>(() => {
  if (props.table.category !== 'blackjack') return []
  return getDynamicBlackjackSeats(props.table.id, props.table.wins, currentRound.value)
})

const syncImageState = (): void => {
  const image = tableImage.value
  if (image?.complete && image.naturalWidth > 0) imageLoaded.value = true
}

watch(imageSource, async () => {
  imageLoaded.value = false
  imageFailed.value = false
  await nextTick()
  syncImageState()
})
onMounted(syncImageState)
</script>

<template>
  <button type="button" class="casino-table-card" :class="{ 'casino-table-card--compact': compact, 'casino-table-card--roadmap': hasRoadmap, 'casino-table-card--horizontal': layout === 'horizontal' && hasRoadmap }" :aria-label="`Open ${table.title}`" @click="emit('select', table)">
    <span class="casino-table-picture" :aria-busy="Boolean(imageSource) && !imageLoaded && !imageFailed">
      <img class="casino-table-placeholder" src="/images/live-casino/dealer-loading.webp" alt="Loading dealer" aria-hidden="true" />
      <img v-if="imageSource" ref="tableImage" :key="imageSource" class="casino-table-image" :class="{ 'casino-table-image--loaded': imageLoaded && !imageFailed }" :src="imageSource" :alt="table.title" loading="lazy" decoding="async" @load="imageLoaded = true" @error="imageFailed = true" />
      <span class="casino-picture-shade" aria-hidden="true" />
      <span class="casino-table-caption">
        <component :is="titleTag" class="casino-table-title" :title="table.title">{{ table.title }}</component>
        <span class="casino-table-players"><User :size="10" aria-hidden="true" />{{ table.players.toLocaleString('en-US') }}</span>
      </span>
      <LiveCasinoRoundIndicator v-if="hasRoundIndicator" :table-id="table.id" :elapsed-ms="elapsedMs" />
      <span v-if="roadPattern" class="casino-table-outcome" :class="{ 'casino-table-outcome--b': roadPatternSide === 'B', 'casino-table-outcome--p': roadPatternSide === 'P' }" :title="roadPattern.title" aria-hidden="true">{{ roadPattern.label }}</span>
    </span>

    <LiveCasinoRoadmap v-if="hasRoadmap && (showRoadmap || layout === 'horizontal')" :table="dynamicTable" :compact="compact && layout !== 'horizontal'" :layout="layout" />

    <span v-else-if="isRouletteLike && rouletteResults.length && showRoadmap" class="casino-roulette-results">
      <span v-for="(number, index) in rouletteResults" :key="index" :style="compact ? { color: rouletteColor(number) } : { background: rouletteColor(number) }">{{ number }}</span>
    </span>

    <span v-else-if="table.category === 'sicbo' && sicboRounds.length && showRoadmap" class="casino-sicbo-results">
      <span v-for="(round, index) in sicboRounds" :key="index" class="casino-sicbo-round">
        <span class="casino-dice-total">{{ round.total }}</span>
        <span :class="round.bigSmall === 'B' ? 'casino-result-blue' : 'casino-result-red'">{{ round.bigSmall }}</span>
      </span>
    </span>

    <span v-else-if="table.category === 'fan-tan' && fantanResults.length && showRoadmap" class="casino-fantan-results">
      <span v-for="(value, index) in fantanResults" :key="index" :class="{ 'casino-result-red': index === 0 }">{{ value }}</span>
    </span>

    <span v-else-if="table.category === 'blackjack' && blackjackSeats.length && showRoadmap" class="casino-blackjack-seats">
      <User v-for="(occupied, index) in blackjackSeats" :key="index" :size="15" :class="{ 'casino-blackjack-seat--occupied': occupied }" aria-hidden="true" />
    </span>
  </button>
</template>

<style scoped>
.casino-table-card {
  display: flex;
  min-width: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-self: start;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 10px;
  color: #f4f4f4;
  background: #111;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.casino-table-card:hover { box-shadow: 0 0 0 1px rgb(255 255 255 / 24%); }
.casino-table-card:focus-visible { outline: 2px solid var(--main-color); outline-offset: 2px; }
.casino-table-picture { position: relative; display: block; width: 100%; aspect-ratio: 1.56; overflow: hidden; border-radius: 10px 10px 0 0; }
.casino-table-picture > img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; }
.casino-table-placeholder { background: #111; }
.casino-table-image { opacity: 0; transition: opacity 160ms ease; }
.casino-table-image--loaded { opacity: 1; }
.casino-picture-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(0 0 0 / 30%), transparent 33%, transparent 75%, rgb(0 0 0 / 35%)); pointer-events: none; }
.casino-table-caption { position: absolute; top: 7px; right: 6px; left: 7px; display: flex; align-items: flex-start; justify-content: space-between; gap: 5px; color: #fff; font-family: Arial, sans-serif; text-shadow: 0 1px 3px #000; }
.casino-table-title { margin: 0; padding: 0; min-width: 0; overflow: hidden; font-family: inherit; font-size: 12px; font-weight: 500; line-height: 16px; text-overflow: ellipsis; white-space: nowrap; }
.casino-table-players { display: inline-flex; flex-shrink: 0; align-items: center; gap: 2px; padding-top: 1px; font-size: 11px; line-height: 14px; }
.casino-table-outcome { position: absolute; right: 7px; bottom: 5px; color: #fff3d6; font-family: Arial, sans-serif; font-size: 9px; font-weight: 700; line-height: 14px; text-shadow: 0 0 3px #663800, 0 0 5px #000; }
.casino-table-outcome--b { color: #ffe7e7; text-shadow: 0 0 3px #ff394b, 0 0 5px #ac1425; }
.casino-table-outcome--p { color: #e7f5ff; text-shadow: 0 0 3px #438cfa, 0 0 5px #1263b3; }
.casino-roulette-results { display: grid; width: 100%; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 4px; padding: 7px; }
.casino-roulette-results > span { padding: 3px 0; border-radius: 3px; color: white; font-size: 11px; line-height: 16px; text-align: center; }
.casino-sicbo-results { display: grid; width: 100%; grid-template-columns: repeat(9, minmax(0, 1fr)); gap: 3px; padding: 6px 4px; background: #16171a; }
.casino-sicbo-round { display: flex; min-width: 0; flex-direction: column; gap: 3px; font-family: Arial, sans-serif; font-size: 11px; line-height: 16px; text-align: center; font-weight: 700; }
.casino-dice-total { display: block; border-radius: 4px; color: #ffd166; background: #23252b; }
.casino-result-blue { display: block; border-radius: 4px; color: #fff; background: #347dce; }
.casino-result-red { display: block; border-radius: 4px; color: #fff; background: #df3449; }
.casino-fantan-results { display: flex; width: 100%; justify-content: space-around; padding: 8px 4px; }
.casino-fantan-results > span { min-width: 18px; font-size: 12px; line-height: 18px; text-align: center; }
.casino-blackjack-seats { display: flex; width: 100%; align-items: center; justify-content: center; gap: 7px; padding: 10px 5px; color: #555; }
.casino-blackjack-seat--occupied { color: #ddd; }
.casino-table-card--compact.casino-table-card--roadmap .casino-table-picture { aspect-ratio: 1.9; }
.casino-table-card--compact .casino-roulette-results { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 0; padding: 5px 3px; background: #d9d9d9; }
.casino-table-card--compact .casino-roulette-results > span { padding: 0; border-radius: 0; font-family: Arial, sans-serif; font-size: 8px; line-height: 16px; }
.casino-table-card--compact .casino-roulette-results > span:first-child { border: 1px solid currentColor; border-radius: 50%; line-height: 14px; }
.casino-table-card--compact .casino-sicbo-results { gap: 2px; padding: 4px 3px; background: #1c1d22; }
.casino-table-card--compact .casino-sicbo-round { gap: 2px; font-size: 10px; line-height: 14px; }
.casino-table-card--compact .casino-dice-total { border-radius: 3px; }
.casino-table-card--compact .casino-result-blue { border-radius: 3px; }
.casino-table-card--compact .casino-result-red { border-radius: 3px; }
.casino-table-card--horizontal { display: grid; grid-template-columns: minmax(0, 40%) minmax(0, 60%); height: auto; aspect-ratio: 3.8; }
.casino-table-card--horizontal .casino-table-picture { height: 100%; aspect-ratio: auto; border-radius: 10px 0 0 10px; }
.casino-table-card--horizontal .casino-table-caption { top: 5px; left: 5px; right: 5px; gap: 3px; }
.casino-table-card--horizontal .casino-table-title { margin: 0; font-size: 11px; line-height: 14px; }
.casino-table-card--horizontal .casino-table-players { font-size: 10px; line-height: 13px; }
.casino-table-card--horizontal .casino-table-outcome { right: 5px; bottom: 4px; font-size: 8px; line-height: 12px; }

@media (prefers-reduced-motion: reduce) {
  .casino-table-image { transition: none; }
}

@media (max-width: 639px) {
  .casino-table-caption { top: 5px; left: 5px; right: 5px; }
  .casino-table-title { margin: 0; font-size: 11px; }
  .casino-table-players { font-size: 10px; }
}
</style>
