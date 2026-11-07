<script setup lang="ts">
const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`
import { Share2, Star, Lock } from 'lucide-vue-next'
import type { SportsEvent } from '~/types/sports'
import ShareMatchModal from '~/components/modals/ShareMatchModal.vue'

const props = defineProps<{
  match: SportsEvent
  soccer: boolean
  fullMarkets?: boolean
  compact?: boolean
  selectedOutcome?: string
}>()

const emit = defineEmits<{
  select: [name: string]
}>()

const actionMessage = ref('')
const isShareModalOpen = ref(false)

const outcomes = computed(() => {
  const market = props.match.bookmakers?.[0]?.markets.find(item => item.key === 'h2h')
  const selections = [
    { label: props.soccer ? '1' : 'H', name: props.match.home_team ?? '' },
    ...(props.soccer ? [{ label: 'X', name: 'Draw' }] : []),
    { label: props.soccer ? '2' : 'A', name: props.match.away_team ?? '' },
  ]

  return selections.map(selection => ({
    ...selection,
    price: market?.outcomes.find(outcome => outcome.name === selection.name)?.price,
  }))
})

const selectedMarkets = ref<Record<string, string>>({})

const teamMarkets = computed(() => {
  const markets = props.match.bookmakers?.[0]?.markets ?? []
  const findOutcome = (key: string, name: string) => {
    return markets.find(market => market.key === key)?.outcomes.find(outcome => outcome.name === name)
  }

  return [
    { team: props.match.home_team ?? '', side: 'H', total: 'Over', totalLabel: 'O' },
    { team: props.match.away_team ?? '', side: 'A', total: 'Under', totalLabel: 'U' },
  ].map((row) => {
    const spread = findOutcome('spreads', row.team)
    const total = findOutcome('totals', row.total)
    const winner = findOutcome('h2h', row.team)

    return {
      ...row,
      markets: [
        { key: 'spreads', name: row.team, label: spread?.point, outcome: spread },
        { key: 'totals', name: row.total, label: `${row.totalLabel} ${total?.point ?? ''}`, outcome: total },
        { key: 'h2h', name: row.team, label: row.side, outcome: winner },
      ],
    }
  })
})

const selectMarket = (key: string, name: string): void => {
  if (key === 'h2h') {
    emit('select', name)
    return
  }

  selectedMarkets.value[key] = selectedMarkets.value[key] === name ? '' : name
}

const isMarketValid = (market: { key: string; outcome?: { price?: number; point?: number | string } }): boolean => {
  if (!market.outcome || market.outcome.price == null || market.outcome.price <= 0) {
    return false
  }
  if (market.key !== 'h2h') {
    return market.outcome.point != null && market.outcome.point !== ''
  }
  return true
}

const isOutcomeValid = (outcome: { price?: number }): boolean => {
  return outcome.price != null && outcome.price > 0
}

const isFullDateSport = computed(() => {
  return props.fullMarkets === true
})

const matchDate = computed(() => {
  if (props.compact && !props.fullMarkets) {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      timeZone: 'Asia/Manila',
    }).format(new Date(props.match.commence_time))
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: isFullDateSport.value ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(new Date(props.match.commence_time))
})

const matchTime = computed(() => {
  if (props.compact && !props.fullMarkets) {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'Asia/Manila',
    }).format(new Date(props.match.commence_time))
  }

  return new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(new Date(props.match.commence_time))
})

const copyMatchLink = async (): Promise<void> => {
  const url = new URL(window.location.href)
  url.hash = `match-${props.match.id}`

  try {
    await navigator.clipboard.writeText(url.href)
    actionMessage.value = 'Match link copied.'
  } catch {
    actionMessage.value = 'Unable to copy the match link. Please copy the page URL from your browser.'
  }
}
</script>

<template>
  <article
    :id="`match-${match.id}`"
    class="winner-match"
    :class="{ 'winner-match--compact': compact && !fullMarkets }"
  >
    <div class="winner-header">
      <time v-if="!fullMarkets" class="winner-date text-[12px]" :datetime="match.commence_time" >
        <span>{{ matchDate }}</span>
        <span>{{ matchTime }}</span>
      </time>
      <time v-else class="winner-date text-[12px]" :datetime="match.commence_time" >
        <span>{{ matchDate }} {{ matchTime }}</span>
      </time>
      <div v-if="!fullMarkets" class="winner-teams border-l border-[#e5e7eb33] pr-2">
        <span class="winner-home-team text-[12px]">{{ match.home_team }}</span>
        <span class="winner-away-team text-[12px]">{{ match.away_team }}</span>
      </div>
      <div class="winner-actions">
        <button
          type="button"
          aria-label="Copy match link to share"
          title="Share match"
          @click="isShareModalOpen = true"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g id="icon"><path id="Union" fill-rule="evenodd" clip-rule="evenodd" d="M2.06105 10.6318L2.06105 5.3748C2.05445 3.5397 3.53963 2.0538 5.36805 2.0538H7.77605C8.12451 2.0538 8.40305 1.77526 8.40305 1.4268C8.40305 1.07835 8.12451 0.799805 7.77605 0.799805H5.36805C2.84959 0.799805 0.800049 2.84935 0.800049 5.3678V10.6248C0.800049 13.1433 2.84959 15.1928 5.36805 15.1928H10.625C13.1435 15.1928 15.193 13.1433 15.193 10.6248V7.1388C15.193 6.79035 14.9145 6.5118 14.566 6.5118C14.5433 6.5118 14.5211 6.51567 14.5003 6.5229C14.1866 6.5585 13.946 6.82196 13.946 7.1458V10.6318C13.946 12.4603 12.4606 13.9458 10.632 13.9458H5.37505C3.54651 13.9458 2.06105 12.4603 2.06105 10.6318ZM13.411 3.13497L12.0531 5.02488C11.9761 5.12988 11.9481 5.26288 11.9691 5.38888C11.9691 5.3889 11.9691 5.38893 11.9691 5.38895C11.9481 5.26295 11.9761 5.12995 12.0531 5.02495L13.4111 3.13495C13.411 3.13495 13.411 3.13496 13.411 3.13497ZM14.9968 2.35106C14.9641 2.17212 14.8293 2.01989 14.6361 1.97288L11.3881 1.02088C11.1291 0.94388 10.8561 1.09088 10.7721 1.34988C10.7545 1.4129 10.7493 1.47768 10.7563 1.5407C10.7493 1.4777 10.7546 1.41295 10.7721 1.34995C10.8561 1.09095 11.1291 0.943949 11.3881 1.02095L14.6361 1.97295C14.8293 2.01995 14.9641 2.17215 14.9968 2.35106ZM12.5219 2.37891C12.4134 2.41457 12.3057 2.45215 12.1991 2.49158C9.06068 3.65201 6.78031 6.42413 6.52305 9.49088H6.51605C6.51299 9.52 6.51262 9.54878 6.51484 9.57701C6.51262 9.5488 6.513 9.52004 6.51607 9.49095H6.52307C6.78907 6.31995 9.21807 3.46395 12.5221 2.37895L12.5219 2.37891ZM11.8851 2.39832C8.82688 3.62643 6.60691 6.36964 6.32834 9.42176C6.32274 9.43699 6.31892 9.45313 6.31715 9.46994C6.29725 9.65907 6.35735 9.8411 6.48579 9.98104C6.60292 10.1161 6.77074 10.2059 6.96053 10.2159H7.01305C7.36719 10.2159 7.67249 9.94204 7.70235 9.58464C7.93181 6.85661 10.0516 4.40756 12.9139 3.48402L11.8911 4.90747C11.7809 5.05835 11.7427 5.24585 11.7716 5.42094C11.8009 5.60482 11.8999 5.76807 12.0623 5.87113C12.3713 6.0808 12.8014 6.01679 13.0212 5.70763L15.0307 2.90268C15.111 2.81044 15.1684 2.6977 15.1894 2.57811C15.2655 2.22276 15.048 1.86995 14.6882 1.77975L11.4447 0.829056C11.0791 0.7206 10.6982 0.928673 10.5816 1.28812L10.5794 1.29635C10.5312 1.46968 10.5492 1.65659 10.6385 1.8167C10.7268 1.98212 10.8749 2.10115 11.0527 2.15107L11.8851 2.39832Z" class="fill-icon-7"></path></g></svg>
        </button>
        <button
          type="button"
          aria-label="Unstar match"
          title="Unstar match"
          @click=" navigateTo(bybetRedirectUrl, { external: true, open: { target: '_blank', windowFeatures: { noopener: true, noreferrer: true } } })"
        >
          <Star :size="16"  aria-hidden="true" />
        </button>
        <button
          v-if="compact && !fullMarkets"
          type="button"
          class="winner-market-count"
          aria-label="More match markets"
          title="More match markets"
          @click="navigateTo(bybetRedirectUrl, { external: true, open: { target: '_blank', windowFeatures: { noopener: true, noreferrer: true } } })"
        >
          <!-- Reference mock count until the sports feed includes market totals. -->
          26
        </button>
      </div>
    </div>

    <div
      v-if="isShareModalOpen"
      class="modal-container"
    >
      <ShareMatchModal
        :match="match"
        @close="isShareModalOpen = false"
        @save="() => {
          console.log('Save QR Code clicked')
          isShareModalOpen = false
        }"
      />
    </div>

    <div
      v-if="fullMarkets"
      class="team-markets"

      role="group"
      :aria-label="`${match.home_team} vs ${match.away_team}, match markets`"
    >
      <div v-for="row in teamMarkets" :key="row.side" class="team-market-row">
        <span class="market-team-name">{{ row.team }}</span>
        <button
          v-for="market in row.markets"
          :key="market.key"
          type="button"
          class="winner-price team-market-price"
          :class="{ 'winner-price--locked': !isMarketValid(market) }"
          :disabled="!isMarketValid(market)"
          :aria-label="`${row.team}, ${market.key}, ${market.label ?? ''}, odds ${market.outcome?.price ?? 'unavailable'}`"
          :aria-pressed="(market.key === 'h2h' ? selectedOutcome : selectedMarkets[market.key]) === market.name"
          @click="selectMarket(market.key, market.name); navigateTo(bybetRedirectUrl, { external: true, open: { target: '_blank', windowFeatures: { noopener: true, noreferrer: true } } })"
        >
          <template v-if="isMarketValid(market)">
            <span class="text-[#999]">{{ market.label }}</span>
            <br>
            <strong>{{ market.outcome!.price.toFixed(2) }}</strong>
          </template>
          <span v-else class="flex items-center justify-center w-full h-full py-2">
            <Lock :size="14" class="text-neutral-400 opacity-70" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>

    <div
      v-else
      class="winner-markets"
      :class="{ 'winner-markets--soccer': soccer }"
      role="group"
      :aria-label="`${match.home_team} vs ${match.away_team}, match winner`"
    >
      <button
        v-for="outcome in outcomes"
        :key="outcome.label"
        type="button"
        class="winner-price"
        :class="{ 'winner-price--locked': !isOutcomeValid(outcome) }"
        :disabled="!isOutcomeValid(outcome)"
        :aria-label="`${outcome.name}, odds ${outcome.price ?? 'unavailable'}`"
        :aria-pressed="selectedOutcome === outcome.name"
        @click="emit('select', outcome.name); navigateTo(bybetRedirectUrl, { external: true, open: { target: '_blank', windowFeatures: { noopener: true, noreferrer: true } } })"
      >
        <template v-if="isOutcomeValid(outcome)">
          <span>{{ outcome.label }}</span>
          <strong>{{ outcome.price!.toFixed(2) }}</strong>
        </template>
        <span v-else class="flex items-center justify-center w-full h-full py-2">
          <Lock :size="14" class="text-neutral-400 opacity-70" aria-hidden="true" />
        </span>
      </button>
    </div>
    <p v-if="actionMessage" class="winner-message" role="status">{{ actionMessage }}</p>
  </article>
</template>

<style scoped>
.winner-match {
  padding: 0.5rem 16px 16px;
  scroll-margin-top: calc(var(--content-sticky-top) + 16px);
}
.winner-match:hover {
  background: rgb(var(--color-primary) / 0.1);
}

.winner-match + .winner-match {
  border-top: 1px solid #ffffff18;
}

.winner-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.winner-date {
  display: grid;
  gap: 3px;
  padding-right: 16px;
  white-space: nowrap;
  flex-shrink: 0;
}

.winner-date small {
  font-size: 9px;
}

.winner-teams {
  display: grid;
  gap: 10px;
  min-width: 0;
  font-size: 13px;
  overflow-wrap: anywhere;
  flex: 1 1 auto;
}

.winner-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  flex-shrink: 0;
}

.winner-actions button {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--secondary);
  transition: color 0.15s, background-color 0.15s;
}

.fill-icon-7 {
  fill: currentColor;
}


.winner-markets {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.winner-markets--soccer {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.winner-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
  min-height: 44px;
  padding: .25rem .5rem;
  border-radius: 8px;
  background: var(--odd-btn);
  color: var(--text);
  font-size: 13px;
  overflow-wrap: anywhere;
}
.winner-price--locked {
  justify-content: center;
}

.winner-price:hover {
  background: var(--odd-btn-hover);
}

.winner-price[aria-pressed='true'] {
  border-color: #48daa6;
  background: var(--main-highlight);
}

.winner-price:disabled {
  opacity: 0.4;
  cursor: default;
}

.winner-match button:focus-visible {
  outline: 2px solid #48daa6;
  outline-offset: 2px;
}

.winner-message {
  margin: 12px 0 0;
  color: var(--secondary);
  font-size: 12px;
}

.market-bookmaker {
  color: var(--secondary);
  font-size: 11px;
  overflow-wrap: anywhere;
}

.team-market-headings,
.team-market-row {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr));
  align-items: center;
  gap: 4px;
}

.team-market-headings {
  margin-bottom: 8px;
  color: var(--secondary);
  font-size: 11px;
  text-align: center;
}

.team-market-headings > :first-child {
  text-align: left;
}

.team-market-row + .team-market-row {
  margin-top: 1px;
}

.market-team-name {
  font-size: 12px;
  overflow-wrap: anywhere;
}

.team-market-price {
  display: block;
  text-align: center;
  white-space: normal;
}

.winner-match--compact {
  padding: 8px 8px 10px;
  background: #131313;
}

.winner-match--compact:hover {
  background: #131313;
}

.winner-match--compact + .winner-match--compact {
  border-top: 1px dashed #292929;
}

.winner-match--compact .winner-header {
  min-height: 40px;
  gap: 0;
  margin-bottom: 10px;
}

.winner-match--compact .winner-date {
  width: 49px;
  gap: 0;
  padding-right: 8px;
  color: #eee;
  font-size: 12px;
  line-height: 16px;
}

.winner-match--compact .winner-teams {
  gap: 0;
  padding-right: 8px;
  padding-left: 8px;
  border-color: #2b2b2b;
  color: #f5f5f5;
  font-size: 12px;
  line-height: 24px;
}

.winner-match--compact .winner-actions {
  min-height: 40px;
  gap: 5px;
  padding-left: 8px;
  border-left: 1px solid #2b2b2b;
}

.winner-match--compact .winner-actions button {
  width: 28px;
  height: 28px;
  color: #b6b9bb;
}

.winner-match--compact .winner-actions button:first-child svg {
  width: 12px;
  height: 12px;
}

.winner-match--compact .winner-actions button.winner-market-count {
  width: 36px;
  border: 1px solid #2b2b2b;
  border-radius: 8px;
  color: #999;
  font-size: 12px;
}

.winner-match--compact .winner-markets {
  gap: 4px;
}

.winner-match--compact .winner-price {
  min-height: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: 8px;
  background: #232323;
  color: #f5f5f5;
  font-size: 14px;
  line-height: 20px;
}

.winner-match--compact .winner-price > span {
  color: #959799;
}

.winner-match--compact .winner-price strong {
  font-weight: 700;
}

.winner-match--compact .winner-price:hover {
  background: var(--odd-btn-hover);
}

.winner-match--compact .winner-price[aria-pressed='true'] {
  background: var(--main-highlight);
}

@media (max-width: 600px) {
  .team-market-headings,
  .team-market-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .team-market-headings > :first-child {
    display: none;
  }

  .market-team-name {
    grid-column: 1 / -1;
    margin: 4px 0;
  }

  .team-market-row + .team-market-row {
    margin-top: 12px;
  }


  .winner-header {
    gap: 10px;
  }

  .winner-date {
    padding-right: 10px;
    font-size: 10px;
  }

  .winner-teams {
    font-size: 12px;
  }

  .winner-actions {
    margin-left: auto;
  }

  .winner-actions button {
    width: 36px;
    height: 36px;
  }

  .winner-price {
    padding: 10px;
  }
}
</style>
