<script setup lang="ts">
import { Compass, Mic, GraduationCap, WalletCards } from 'lucide-vue-next'

defineEmits<{ back: [] }>()
const route = useRoute()
const items = [
  { label: 'Plaza', to: '/explore/live-plaza/home', icon: Compass },
  { label: 'Streamer', to: '/explore/live-plaza/streamer', icon: Mic },
  { label: 'Predict', to: '/explore/live-plaza/expert-predictions', icon: GraduationCap },
  { label: 'Funds', to: '/explore/live-plaza/funds', icon: WalletCards },
]
const isActive = (item: typeof items[number]): boolean => {
  const path = route.path.replace(/\/$/, '')
  if (item.label === 'Predict') return path.endsWith('/expert-predictions') || path.endsWith('/experts')
  if (item.label === 'Streamer') return path.includes('/streamer') || path.endsWith('/all-streamers')
  return path === item.to
}
</script>

<template>
  <div class="live-plaza-nav-row">
    <NuxtLink v-for="item in items" :key="item.label" :to="item.to" class="live-plaza-nav-item" :aria-current="isActive(item) ? 'page' : undefined">
      <component :is="item.icon" :size="21" :stroke-width="2.4" aria-hidden="true" />
      <span>{{ item.label }}</span>
    </NuxtLink>
    <button type="button" class="live-plaza-nav-back" aria-label="Back to main navigation" @click="$emit('back')">
      <span>
        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
          <circle cx="13" cy="13" r="11" fill="currentColor" />
          <path d="M13 8 8 13l5 5M8 13h10" fill="none" stroke="#101010" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.live-plaza-nav-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)) 60px; height: 58px; align-items: stretch; }
.live-plaza-nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; color: #959799; font-size: 11px; line-height: 1; }
.live-plaza-nav-item[aria-current="page"] { color: #1fa779; }
.live-plaza-nav-back { display: grid; place-items: center; border-radius: 32px 32px 0 32px; background: var(--main-color); color: #fff; }
.live-plaza-nav-back span { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: #101010; }
</style>
