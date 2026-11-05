<script setup lang="ts">
import { BONUS_CURRENCIES } from '~/data/bonus-currencies'
import { PROMOTIONS } from '~/data/promotions'
import { filterBonusesByPayment, getUnassignedBonuses } from '~/utils/bonus-payments'

const { selectedCurrency, selectedCurrencyLabel, filterPromotions } = useBonusPayments()
const currencies = computed(() => BONUS_CURRENCIES.filter(currency => currency.code !== 'all'))
const groups = computed(() => currencies.value.map(currency => ({
  ...currency,
  items: filterBonusesByPayment(PROMOTIONS, currency.code),
})))
const unassigned = computed(() => getUnassignedBonuses(PROMOTIONS))
const visibleCount = computed(() => filterPromotions(PROMOTIONS).length)
</script>

<template>
  <section class="bonus-payments" aria-label="Payments">
    <h2 class="bonus-payments__title">Payments</h2>

    <div class="bonus-payments__filters" aria-label="Filter bonuses by payment currency">
      <button
        type="button"
        :aria-pressed="selectedCurrency === 'all'"
        @click="selectedCurrency = 'all'"
      >All <span>{{ PROMOTIONS.length }}</span></button>
      <button
        v-for="group in groups"
        :key="group.code"
        type="button"
        :aria-pressed="selectedCurrency === group.code"
        @click="selectedCurrency = group.code"
      >{{ group.label }} <span>{{ group.items.length }}</span></button>
    </div>

    <p v-if="selectedCurrency === 'all' && unassigned.length" class="bonus-payments__note">
      {{ unassigned.length }} {{ unassigned.length === 1 ? 'bonus is' : 'bonuses are' }} unassigned to a payment currency.
    </p>
    <p v-if="visibleCount === 0" class="bonus-payments__empty" role="status">
      No bonuses assigned to {{ selectedCurrencyLabel }} yet.
    </p>

  </section>
</template>

<style scoped>
.bonus-payments { margin-top: 8px; padding: 16px; border-radius: 12px; background: #171817; color: #f5f5f5; }
.bonus-payments h2 { margin: 0; font-size: 18px; font-weight: 800; }
.bonus-payments__title { margin-bottom: 16px !important; }
.bonus-payments__filters { display: flex; flex-wrap: wrap; gap: 8px; }
.bonus-payments__filters button { display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 6px 12px; border: 1px solid #464a47; border-radius: 20px; color: #ddd; font-size: 13px; background: #252725; }
.bonus-payments__filters button[aria-pressed='true'] { border-color: var(--main-color); background: #143d28; color: #fff; }
.bonus-payments__filters button:focus-visible { outline: 2px solid #32d49a; outline-offset: 2px; }
.bonus-payments__filters button span { color: #a8ada9; font-size: 11px; }
.bonus-payments__note, .bonus-payments__empty { margin: 14px 0 0; color: #a9aeaa; font-size: 13px; line-height: 1.5; }
.bonus-payments__empty { padding: 20px 0; text-align: center; }
@media (max-width: 63.99rem) { .bonus-payments { margin: 8px 10px; padding: 12px; } }
:global(html[data-theme='light']) .bonus-payments { background: #fff; color: #14251d; }
:global(html[data-theme='light']) .bonus-payments__filters button { border-color: #cbd5cf; color: #34483d; background: #eef4f0; }
:global(html[data-theme='light']) .bonus-payments__filters button[aria-pressed='true'] { border-color: var(--main-color); background: #d8efe0; }
:global(html[data-theme='light']) .bonus-payments__note,
:global(html[data-theme='light']) .bonus-payments__empty { color: #5d7066; }
</style>
