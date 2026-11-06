<script setup lang="ts">
import { computed } from 'vue'
import type { LiveCasinoTable } from '~/data/live-casino'

interface RoadmapResult {
  result: 'B' | 'P' | 'T'
  cornerMark?: 'red' | 'blue'
  yellowCenter?: boolean
  tie?: boolean
}

const props = defineProps<{ table: LiveCasinoTable }>()
const colors = { B: '#ef454b', P: '#4389ff', T: '#36bb73' }

const columns = computed<RoadmapResult[][]>(() => {
  if (!Array.isArray(props.table.wins)) return []

  return props.table.wins.map((column: unknown) => {
    if (!Array.isArray(column)) return []
    return column.filter((entry: unknown): entry is RoadmapResult => {
      if (!entry || typeof entry !== 'object' || !('result' in entry)) return false
      return entry.result === 'B' || entry.result === 'P' || entry.result === 'T'
    })
  })
})

const cells = computed(() => {
  const visibleColumns = columns.value.slice(-14)

  return Array.from({ length: 14 * 6 }, (_, index) => {
    const column = Math.floor(index / 6)
    const row = index % 6

    return {
      index,
      x: 8 + column * 14.9,
      y: 8 + row * 15.1,
      outcome: visibleColumns[column]?.[row],
    }
  })
})

const totals = computed(() => {
  const results = columns.value.flat()
  const banker = results.filter(entry => entry.result === 'B').length
  const player = results.filter(entry => entry.result === 'P').length
  const tie = results.filter(entry => entry.result === 'T' || entry.tie).length
  const bankerPair = results.filter(entry => entry.cornerMark === 'red').length
  const playerPair = results.filter(entry => entry.cornerMark === 'blue').length

  return {
    rounds: props.table.stats?.shoe ?? banker + player + tie,
    banker: props.table.stats?.banker ?? banker,
    player: props.table.stats?.player ?? player,
    tie: props.table.stats?.tie ?? tie,
    bankerPair,
    playerPair,
  }
})

const summary = computed(() => [
  { key: 'rounds', count: totals.value.rounds, color: '#cfd3d8' },
  { key: 'banker', count: totals.value.banker, color: colors.B },
  { key: 'player', count: totals.value.player, color: colors.P },
  { key: 'tie', count: totals.value.tie, color: colors.T },
  { key: 'banker-pair', count: totals.value.bankerPair, color: '#cfd3d8' },
  { key: 'player-pair', count: totals.value.playerPair, color: '#cfd3d8' },
])

const label = computed(() => `${props.table.title} roadmap: ${totals.value.rounds} rounds, ${totals.value.banker} banker, ${totals.value.player} player, ${totals.value.tie} ties, ${totals.value.bankerPair} banker pairs and ${totals.value.playerPair} player pairs.`)
</script>

<template>
  <div class="live-casino-roadmap" role="img" :aria-label="label">
    <svg viewBox="0 0 210 112" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <g v-for="cell in cells" :key="cell.index" :transform="`translate(${cell.x} ${cell.y})`">
        <circle v-if="!cell.outcome" r="1.25" fill="#2c2d30" />
        <template v-else>
          <circle r="4.5" :stroke="colors[cell.outcome.result]" stroke-width="1.6" fill="none" />
          <circle v-if="cell.outcome.yellowCenter" r="1.55" fill="#e1bb4b" />
          <path v-if="cell.outcome.tie" d="M-3.4 3.4 3.4-3.4" stroke="#37bd75" stroke-width="1.5" stroke-linecap="round" />
          <circle v-if="cell.outcome.cornerMark === 'red'" cx="-3.15" cy="-3.15" r="1.65" fill="#ef454b" stroke="#111214" stroke-width="0.7" />
          <circle v-else-if="cell.outcome.cornerMark === 'blue'" cx="3.15" cy="3.15" r="1.65" fill="#4389ff" stroke="#111214" stroke-width="0.7" />
        </template>
      </g>

      <g v-for="(item, index) in summary" :key="item.key" :transform="`translate(${11 + index * 33.8} 105)`">
        <template v-if="item.key === 'rounds'">
          <circle r="2.8" :fill="colors.P" />
          <path d="M0-2.8a2.8 2.8 0 0 1 0 5.6Z" :fill="colors.B" />
        </template>
        <circle v-else-if="item.key === 'banker-pair' || item.key === 'player-pair'" r="1.6" :fill="item.key === 'banker-pair' ? colors.B : colors.P" />
        <circle v-else r="2.8" :fill="item.color" />
        <text x="4.6" y="2.7" :fill="item.color">{{ item.count }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.live-casino-roadmap {
  width: 100%;
  overflow: hidden;
  color: #cfd3d8;
  background: #111214;
}

.live-casino-roadmap svg {
  display: block;
  width: 100%;
  height: auto;
}

.live-casino-roadmap text {
  font-family: Arial, sans-serif;
  font-size: 7.6px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}
</style>
