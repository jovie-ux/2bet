<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Bell, Headphones } from 'lucide-vue-next'
import { useSiteLocale } from '~/composables/useSitePreferences'
import { useDemoInteraction } from '~/composables/useDemoInteraction'

const { translate } = useSiteLocale()
const { showDemoMessage } = useDemoInteraction()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const loginUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const hasScrolled = ref(false)
let scrollFrame: number | null = null

const updateScroll = (): void => {
  hasScrolled.value = window.scrollY > 0
  scrollFrame = null
}

const handleScroll = (): void => {
  if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateScroll)
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <header
    class="me-mobile-header z-30 flex shrink-0 items-center justify-between px-4 py-3 text-white lg:hidden"
    :class="{ 'me-mobile-header--sticky': hasScrolled }"
  >
    <h1 class="text-[19px] font-bold tracking-tight">{{ translate('Me') }}</h1>
    <div class="flex items-center gap-2">
      <NuxtLink
        to="/egames/customer-service"
        class="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/20 text-[#FEDF00] backdrop-blur-md transition-all hover:bg-white/30"
        :aria-label="translate('Customer Service')"
      >
        <Headphones class="h-5 w-5 text-[#FEDF00]" />
      </NuxtLink>
      <a
        :href="loginUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Account Login"
        class="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/20 text-white shadow-sm backdrop-blur-md transition-all hover:bg-white/30"
      >
        <Bell class="h-4 w-4 text-white" />
      </a>
      <button
        type="button"
        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/20 text-[#FEDF00] shadow-sm backdrop-blur-md transition-all hover:bg-white/30"
        :aria-label="translate('Notifications')"
        @click="showDemoMessage(translate('No new notifications'))"
      >
        <Bell class="h-5 w-5 text-[#FEDF00]" />
      </button>
    </div>
  </header>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .me-mobile-header {
    position: sticky;
    top: 0;
    isolation: isolate;
    min-height: 60px;
  }

  .me-mobile-header--sticky::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    z-index: -1;
    height: 120px;
    background: url('/images/me/me-bg.webp') top / cover no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, #000 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 50%, transparent 100%);
    pointer-events: none;
  }
}
</style>
