<script setup lang="ts">
import { computed } from 'vue'
import { User } from 'lucide-vue-next'
import LiveCasinoRoadmap from '~/components/live-casino/LiveCasinoRoadmap.vue'
import LiveCasinoRoundIndicator from '~/components/live-casino/LiveCasinoRoundIndicator.vue'
import type { LiveCasinoTable } from '~/data/live-casino'

const props = withDefaults(defineProps<{
  table: LiveCasinoTable
  elapsedMs: number
  showRoadmap?: boolean
}>(), { showRoadmap: true })
const emit = defineEmits<{ select: [table: LiveCasinoTable] }>()
const hasRoadmap = computed(() => ['baccarat', 'dragon-tiger'].includes(props.table.category))
const hasRoundIndicator = computed(() => ['baccarat', 'dragon-tiger', 'blackjack', 'poker'].includes(props.table.category))
const lastOutcome = computed(() => {
  if (!hasRoadmap.value || !Array.isArray(props.table.wins)) return null
  const outcomes = props.table.wins.flat().filter((outcome: any) => outcome?.result)
  return outcomes[outcomes.length - 1]?.result as string | undefined
})

const rouletteResults = computed<number[]>(() => {
  if (props.table.category !== 'roulette' || !Array.isArray(props.table.wins)) return []
  return props.table.wins.map((result: any) => Array.isArray(result) ? result[1] : result).filter((result: any) => typeof result === 'number').slice(0, 12)
})
const rouletteColor = (number: number): string => {
  if (number === 0) return '#168147'
  return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number) ? '#d42c3e' : '#202328'
}

const diceDots: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] }
const sicboRounds = computed(() => {
  if (props.table.category !== 'sicbo' || !Array.isArray(props.table.wins)) return []
  return props.table.wins.slice(0, 9).map((entry: any) => {
    const dice: number[] = Array.isArray(entry?.[0]) ? entry[0].slice(0, 3) : Array.isArray(entry) ? entry.slice(0, 3) : []
    const total = typeof entry?.[1] === 'number' && Array.isArray(entry?.[0]) ? entry[1] : dice.reduce((sum, value) => sum + value, 0)
    return {
      dice,
      total,
      bigSmall: Array.isArray(entry?.[3]) ? entry[3][0] : total >= 11 ? 'B' : 'S',
      oddEven: Array.isArray(entry?.[3]) ? entry[3][1] : total % 2 ? 'O' : 'E',
    }
  })
})

const handleImageError = (event: Event): void => {
  const image = event.target as HTMLImageElement
  image.onerror = null
  image.src = '/images/casino/card1.webp'
}
</script>

<template>
  <button type="button" class="casino-table-card" :aria-label="`Open ${table.title}`" @click="emit('select', table)">
    <span class="casino-table-picture">
      <img :src="table.image || '/images/casino/card1.webp'" :alt="table.title" loading="lazy" decoding="async" @error="handleImageError" />
      <span class="casino-picture-shade" aria-hidden="true" />
      <span class="casino-table-caption">
        <span class="casino-table-title" :title="table.title">{{ table.title }}</span>
        <span class="casino-table-players"><User :size="10" aria-hidden="true" />{{ table.players.toLocaleString('en-US') }}</span>
      </span>
      <LiveCasinoRoundIndicator v-if="hasRoundIndicator" :table-id="table.id" :elapsed-ms="elapsedMs" />
      <span v-if="lastOutcome" class="casino-table-outcome" :class="`casino-table-outcome--${lastOutcome.toLowerCase()}`" aria-hidden="true">{{ lastOutcome === 'B' ? 'Banker' : lastOutcome === 'P' ? 'Player' : 'Tie' }}</span>
    </span>

    <LiveCasinoRoadmap v-if="hasRoadmap && showRoadmap" :table="table" />

    <span v-else-if="table.category === 'roulette' && rouletteResults.length && showRoadmap" class="casino-roulette-results">
      <span v-for="(number, index) in rouletteResults" :key="index" :style="{ background: rouletteColor(number) }">{{ number }}</span>
    </span>

    <span v-else-if="table.category === 'sicbo' && sicboRounds.length && showRoadmap" class="casino-sicbo-results">
      <span v-for="(round, index) in sicboRounds" :key="index" class="casino-sicbo-round">
        <span v-for="(dice, diceIndex) in round.dice" :key="diceIndex" class="casino-dice"><i v-for="dot in 9" :key="dot" :class="{ 'casino-dice-dot': diceDots[dice]?.includes(dot - 1) }" /></span>
        <span class="casino-dice-total">{{ round.total }}</span>
        <span :class="round.bigSmall === 'B' ? 'casino-result-blue' : 'casino-result-red'">{{ round.bigSmall }}</span>
        <span :class="round.oddEven === 'E' ? 'casino-result-blue' : 'casino-result-red'">{{ round.oddEven }}</span>
      </span>
    </span>

    <span v-else-if="table.category === 'fan-tan' && Array.isArray(table.wins) && showRoadmap" class="casino-fantan-results">
      <span v-for="(value, index) in table.wins" :key="index" :class="{ 'casino-result-red': index === 0 }">{{ value }}</span>
    </span>

    <span v-else-if="table.category === 'blackjack' && Array.isArray(table.wins) && showRoadmap" class="casino-blackjack-seats">
      <User v-for="(occupied, index) in table.wins" :key="index" :size="15" :class="{ 'casino-blackjack-seat--occupied': occupied }" aria-hidden="true" />
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
.casino-table-picture > img { display: block; width: 100%; height: 100%; object-fit: cover; }
.casino-picture-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(0 0 0 / 30%), transparent 33%, transparent 75%, rgb(0 0 0 / 35%)); pointer-events: none; }
.casino-table-caption { position: absolute; top: 7px; right: 6px; left: 7px; display: flex; align-items: flex-start; justify-content: space-between; gap: 5px; color: #fff; font-family: Arial, sans-serif; text-shadow: 0 1px 3px #000; }
.casino-table-title { min-width: 0; overflow: hidden; font-size: 12px; font-weight: 500; line-height: 16px; text-overflow: ellipsis; white-space: nowrap; }
.casino-table-players { display: inline-flex; flex-shrink: 0; align-items: center; gap: 2px; padding-top: 1px; font-size: 11px; line-height: 14px; }
.casino-table-outcome { position: absolute; right: 7px; bottom: 5px; font-family: Arial, sans-serif; font-size: 9px; font-weight: 700; line-height: 14px; text-shadow: 0 0 3px #000, 0 0 5px currentColor; }
.casino-table-outcome--b { color: #ff959d; }
.casino-table-outcome--p { color: #91cdff; }
.casino-table-outcome--t { color: #91e8b2; }
.casino-roulette-results { display: grid; width: 100%; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 4px; padding: 7px; }
.casino-roulette-results > span { padding: 3px 0; border-radius: 3px; color: white; font-size: 11px; line-height: 16px; text-align: center; }
.casino-sicbo-results { display: grid; width: 100%; grid-template-columns: repeat(9, minmax(0, 1fr)); gap: 3px; padding: 5px; }
.casino-sicbo-round { display: flex; min-width: 0; flex-direction: column; gap: 3px; font-family: Arial, sans-serif; font-size: 10px; line-height: 13px; text-align: center; }
.casino-dice { display: grid; aspect-ratio: 1; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 1px; padding: 2px; border-radius: 2px; background: #fff; }
.casino-dice i { aspect-ratio: 1; border-radius: 50%; }
.casino-dice-dot { background: #111; }
.casino-dice-total { border-radius: 9px; color: #663b09; background: #fedc7d; }
.casino-result-blue { border-radius: 9px; color: #fff; background: #347dce; }
.casino-result-red { border-radius: 9px; color: #fff; background: #df3449; }
.casino-fantan-results { display: flex; width: 100%; justify-content: space-around; padding: 8px 4px; }
.casino-fantan-results > span { min-width: 18px; font-size: 12px; line-height: 18px; text-align: center; }
.casino-blackjack-seats { display: flex; width: 100%; align-items: center; justify-content: center; gap: 7px; padding: 10px 5px; color: #555; }
.casino-blackjack-seat--occupied { color: #ddd; }

@media (max-width: 639px) {
  .casino-table-caption { top: 5px; left: 5px; right: 5px; }
  .casino-table-title { font-size: 11px; }
  .casino-table-players { font-size: 10px; }
}
</style>
