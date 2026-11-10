<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

const route = useRoute()
const { translate } = useSiteLocale()
const path = computed(() => route.path.replace(/\/$/, ''))
const title = computed(() => {
  if (path.value.endsWith('/streamer/all')) return 'All Streamers'
  if (path.value.includes('/streamer')) return 'Streamer'
  if (path.value.endsWith('/expert-predictions')) return 'Predict'
  if (path.value.endsWith('/funds')) return 'Funds'
  return 'Live Plaza'
})
const backTo = computed(() => path.value.endsWith('/streamer/all')
  ? '/live-plaza/streamer'
  : path.value.endsWith('/home') ? '/' : '/live-plaza/home')
</script>

<template>
  <header class="mobile-live-plaza-header">
    <NuxtLink :to="backTo" class="mobile-live-plaza-header__back" :aria-label="translate('Go back')">
      <ChevronLeft :size="20" aria-hidden="true" />
    </NuxtLink>
    <h1>{{ translate(title) }}</h1>
    <span aria-hidden="true" />
  </header>
</template>

<style scoped>
.mobile-live-plaza-header { display: none; }
@media (max-width: 63.99rem) {
  .mobile-live-plaza-header {
    position: sticky;
    top: 0;
    z-index: 40;
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr) 30px;
    align-items: center;
    height: 52px;
    padding: 0 14px;
    background: var(--main-color);
    color: #fff;
  }
  h1 { margin: 0; text-align: center; font-size: 16px; font-weight: 800; }
  .mobile-live-plaza-header__back {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 50%;
    background: #ffffff26;
    box-shadow: inset 1px 1px #ffffff4d, inset -1px -1px #ffffff80, inset 2px 2px 4px #00000005, inset -4px -4px 8px #00000005, 0 0 4px #0000000a, 0 4px 8px #00000014;
  }
}
</style>
