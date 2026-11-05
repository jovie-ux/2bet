<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'
import BonusCurrencySelector from './BonusCurrencySelector.vue'

withDefaults(defineProps<{ backTo?: string; currencySelector?: boolean }>(), {
  backTo: '/',
  currencySelector: false,
})

const { selectedCurrency } = useBonusPayments()
</script>

<template>
  <header class="mobile-bonus-header">
    <NuxtLink :to="backTo" class="mobile-bonus-header__back" aria-label="Go back">
      <ChevronLeft :size="20" aria-hidden="true" />
    </NuxtLink>
    <h1>Bonuses</h1>
    <BonusCurrencySelector v-if="currencySelector" v-model="selectedCurrency" />
    <NuxtLink v-else to="/explore/account/language" class="mobile-bonus-header__flag" aria-label="Language: Philippines">
      <img src="/icons/PHP.webp" alt="Philippines" width="24" height="24">
    </NuxtLink>
  </header>
</template>

<style scoped>
.mobile-bonus-header { display: none; }
@media (max-width: 63.99rem) {
  .mobile-bonus-header {
    position: sticky;
    top: 0;
    z-index: 40;
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) 32px;
    align-items: center;
    height: 52px;
    padding: 0 14px;
    color: #fff;
    background: var(--main-color);
  }
  h1 { margin: 0; text-align: center; font-size: 16px; font-weight: 800; }
  .mobile-bonus-header__back, .mobile-bonus-header__flag {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #ffffff60;
    border-radius: 50%;
    background: #ffffff26;
  }
  img { width: 24px; height: 24px; object-fit: contain; }
}
</style>
