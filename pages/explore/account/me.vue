<script setup lang="ts">
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Headphones,
  UserRound,
} from 'lucide-vue-next'

const { showDemoMessage } = useDemoInteraction()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const bybetRedirectRegister = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/registered?p=${bybetRedirectCode || 'xjSD'}`
const { selectedLanguageLabel } = useSiteLocale()
const { selectedTimeZone } = useTimeZonePreference()
const { setThemePreference, themePreference } = useSiteTheme()

useAppSeo({
  title: 'My Account Profile & VIP Overview | ByBet Philippines',
  description: 'Manage your ByBet account profile, security settings, VIP tier status, and transaction history. Fast, secure account management on ByBet Philippines.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'My Account', path: '/explore/account/me' },
  ],
})

const openSections = reactive({
  general: true,
  livePlaza: true,
  gameSettings: true,
  systemSettings: true,
  help: true,
})

const toggleSection = (key: keyof typeof openSections): void => {
  openSections[key] = !openSections[key]
}

const selectedOdds = ref('Euro Odds')
const isOddsDropdownOpen = ref(false)
const oddsOptions = ['Euro Odds', 'Hong Kong Odds', 'Malay Odds', 'Indo Odds']

const selectedTheme = ref<'International' | 'Asia'>('International')
const headerScrollFade = ref(0)
let headerScrollFrame: number | null = null

const updateHeaderFade = (): void => {
  headerScrollFade.value = Math.min(Math.max(window.scrollY, 0) / 80, 1)
  headerScrollFrame = null
}

const handlePageScroll = (): void => {
  if (headerScrollFrame === null) {
    headerScrollFrame = window.requestAnimationFrame(updateHeaderFade)
  }
}

onMounted(() => {
  updateHeaderFade()
  window.addEventListener('scroll', handlePageScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handlePageScroll)
  if (headerScrollFrame !== null) window.cancelAnimationFrame(headerScrollFrame)
})
</script>

<template>
  <div class="me-page w-full min-w-0">
    <!-- Mobile View: Frosted Card & Green Felt Hero (< 1024px) -->
    <div class="me-mobile-view lg:hidden w-full min-w-0 pb-16 text-white bg-[#0e0f0e]">
      <div
        class="me-hero-background"
        :style="{ '--me-hero-fade': `${48 + headerScrollFade * 24}px` }"
        aria-hidden="true"
      />

      <!-- Mobile Dedicated Header (Hidden on Desktop) -->
      <header
        class="me-mobile-header lg:hidden z-30 flex items-center justify-between px-4 py-3"
        :class="{ 'me-mobile-header--sticky': headerScrollFade > 0 }"
      >
        <h1 class="text-[19px] font-bold text-white tracking-tight">Me</h1>
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/explore/egames/customer-service"
            class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all "
            aria-label="Customer Service"
          >
            <Headphones class="w-4 h-4 text-white" />
          </NuxtLink>
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-sm cursor-pointer"
            aria-label="Notifications"
            @click="showDemoMessage('No new notifications')"
          >
            <Bell class="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

    <!-- Hero Area with Green Felt Texture & "ByBet" Watermark -->
    <div class="me-hero-wrapper relative w-full overflow-hidden">
      <!-- Frosted Profile Card -->
      <div class="px-3.5 pt-2 pb-4 lg:px-6 lg:py-6">
        <div class="me-frosted-card mx-auto max-w-xl rounded-[20px] p-4 lg:p-6 bg-white/[0.14] backdrop-blur-xl border border-white/25 shadow-0 ">
          <!-- User Avatar Silhouette -->
          <div class="w-14 h-14 rounded-full border border-white/30 bg-white/10 flex items-center justify-center mx-auto mb-3 ">
            <UserRound class="w-7 h-7 text-white/90" :stroke-width="1.8" />
          </div>

          <!-- Login & Sign Up Pill Buttons -->
          <div class="grid grid-cols-2 gap-3 mb-3">
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white font-medium text-[14px] flex items-center justify-center transition-all shadow-sm"
            >
              Login
            </a>
            <a
              :href="bybetRedirectRegister"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white font-medium text-[14px] flex items-center justify-center transition-all shadow-sm"
            >
              Sign Up
            </a>
          </div>

          <!-- Subtle Horizontal Divider -->
          <div class="h-px bg-white/15 mb-3"></div>

          <!-- 4 Quick Action Buttons -->
          <div class="grid grid-cols-4 gap-2">
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              Deposit
            </a>
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              Withdraw
            </a>
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              VIP
            </a>
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              Bonus
            </a>
          </div>
        </div>
      </div>

      <!-- Subtle fade to dark bottom edge -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-6 "></div>
    </div>

    <!-- Content Accordions Area -->
    <div class="me-sections px-3.5 space-y-3 max-w-4xl mx-auto">
      <!-- Accordion 1: General -->
      <div class="section-card rounded-2xl bg-[#141514] p-4 shadow-sm border border-white/[0.04]">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer select-none"
          @click="toggleSection('general')"
        >
          <h2 class="text-[15px] font-bold text-white tracking-tight">General</h2>
          <ChevronUp v-if="openSections.general" class="h-4 w-4 text-white/50" />
          <ChevronDown v-else class="h-4 w-4 text-white/50" />
        </button>

        <div v-show="openSections.general" class="space-y-4 pt-4">
          <!-- Betting History -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#01AEF3"></rect><path d="M9.564 5C9.326 5 9.102 5.091 8.941 5.259L5.259 8.934C5.091 9.102 5 9.326 5 9.557V16.354C5 17.817 6.19 19 7.653 19H16.347C17.81 19 19 17.817 19 16.354V7.646C19 6.183 17.81 5 16.347 5H9.564ZM9.2 13.113H14.8C15.185 13.113 15.507 13.421 15.507 13.806C15.507 14.191 15.199 14.506 14.814 14.513H14.8H9.2C8.815 14.513 8.493 14.205 8.493 13.82C8.493 13.435 8.801 13.12 9.186 13.113H9.2ZM9.2 9.62H14.8C15.185 9.62 15.5 9.935 15.5 10.32C15.5 10.705 15.185 11.02 14.8 11.02H9.2C8.815 11.02 8.5 10.705 8.5 10.32C8.5 9.935 8.815 9.62 9.2 9.62Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Betting History</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Bonuses -->
          <NuxtLink to="/explore/bonuses" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FFBA00"></rect><path d="M18.0058 19.5H6.00076C5.56593 19.5 5.16687 19.1208 5.16687 18.58V9.83301H18.8397V18.58C18.8397 19.1208 18.4406 19.5 18.0058 19.5Z" stroke="white"></path><path d="M14.9645 4C14.7711 4 14.5844 4.08 14.4443 4.22667L12.0033 6.78675L9.56229 4.22667C9.4289 4.08 9.23549 4 9.04207 4C6.99455 4 5.33386 5.74672 5.33386 7.88679C5.33386 8.31347 5.66733 8.66681 6.07417 8.66681H17.9324C18.3393 8.66681 18.6728 8.31347 18.6728 7.88679C18.6728 5.74672 17.0121 4 14.9645 4ZM6.9412 7.11343C7.21465 6.30007 7.90827 5.69339 8.74862 5.57338L10.2159 7.11343H6.9412ZM13.7907 7.11343L15.258 5.57338C16.0983 5.68672 16.792 6.30007 17.0654 7.11343H13.7907Z" fill="white"></path><path d="M19.6999 12.6664H4.30679C4.13339 12.6664 4 12.4998 4 12.2931V10.073C4 9.66635 4.28012 9.33301 4.61359 9.33301H19.3864C19.7266 9.33301 20 9.66635 20 10.073V12.2931C20 12.4998 19.8599 12.6664 19.6932 12.6664H19.6999Z" fill="white"></path><path d="M10.4026 9.33301H13.6039V20H10.4026V9.33301Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Bonuses</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Coupon Center -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#F5A46E"></rect><path d="M20 10.2V7.22C20 6.54 19.42 6 18.71 6H5.29C4.58 6 4 6.55 4 7.22V10.2C5.05 10.2 5.89 11.01 5.89 12C5.89 12.99 5.04 13.8 4 13.8V16.78C4 17.46 4.58 18 5.29 18H18.71C19.42 18 20 17.45 20 16.78V13.8C18.95 13.8 18.11 12.99 18.11 12C18.11 11.01 18.96 10.2 20 10.2ZM9.68 15C9.68 15.33 9.4 15.6 9.05 15.6C8.7 15.6 8.42 15.33 8.42 15V9C8.42 8.67 8.7 8.4 9.05 8.4C9.4 8.4 9.68 8.67 9.68 9V15Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Coupon Center</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Referral Bonus -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#428ACD"></rect><path d="M19.8866 11.4559C19.8866 11.6743 19.7729 11.6743 19.6592 11.7836L14.7841 16.3634C14.443 16.5819 13.8768 16.3634 13.6495 16.0357C13.5701 15.9038 13.5315 15.7513 13.5358 15.5988V13.0903C10.5845 11.4538 6.72605 12.3257 5.02307 15.0546C4.44826 15.9389 4.13512 16.9571 4.11367 18C4 17.5651 4 17.1281 4 16.5819C4.00214 12.2185 7.86279 8.7269 12.5149 8.7269H13.5358V6.76469C13.5251 6.35246 13.864 6.01031 14.2929 6C14.3058 6 14.3187 6 14.3315 6C14.5567 6 14.6704 6 14.7841 6.10924L19.552 10.3696C19.9531 10.5613 20.1139 11.0292 19.9144 11.4146C19.908 11.4291 19.8994 11.4414 19.8909 11.4559H19.8844H19.8866Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Referral Bonus</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Responsible Gaming -->
          <NuxtLink to="/explore/help/responsible-gaming" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#D80027"></rect><path d="M12.5 16.5C11.95 16.5 11.4 16.5 10.85 16.5C10.73 16.5 10.64 16.57 10.63 16.67C10.63 16.77 10.72 16.85 10.85 16.85C11.95 16.85 13.05 16.85 14.15 16.85C14.51 16.85 14.94 16.52 15.06 16.17C15.1 16.06 15.14 15.95 15.15 15.84C15.16 15.75 15.2 15.71 15.27 15.66C15.8 15.28 16.33 14.89 16.86 14.5C17.21 14.25 17.56 13.98 17.92 13.74C18.13 13.61 18.35 13.58 18.61 13.62C19.06 13.7 19.24 14.17 19.11 14.58C19.03 14.83 18.86 15 18.69 15.17C18.28 15.58 17.86 16 17.41 16.39C17.01 16.74 16.59 17.08 16.15 17.39C15.66 17.73 15.15 18.05 14.6 18.27C14.12 18.47 13.62 18.62 13.13 18.79C12.63 18.96 12.12 18.97 11.61 18.93C11.24 18.89 10.86 18.8 10.51 18.64C10.12 18.46 9.73 18.29 9.33 18.12C9.08 18.01 8.83 17.89 8.58 17.79C8.39 17.72 8.21 17.66 8.01 17.61C7.68 17.54 7.35 17.46 7.01 17.42C6.79 17.39 6.56 17.43 6.34 17.43C6.3 17.43 6.24 17.38 6.23 17.34C6.21 17.29 6.22 17.23 6.22 17.18C6.22 16.32 6.22 15.47 6.22 14.62C6.22 14.36 6.26 14.32 6.5 14.24C6.9 14.11 7.3 14.05 7.71 14.09C7.92 14.11 8.14 14.16 8.34 14.23C8.78 14.39 9.21 14.58 9.65 14.74C10.01 14.86 10.37 14.96 10.76 14.97C11.85 14.97 12.94 14.99 14.02 14.99C14.43 14.99 14.71 15.25 14.78 15.61C14.85 15.92 14.65 16.32 14.31 16.43C14.2 16.47 14.08 16.48 13.97 16.49C13.46 16.49 12.96 16.49 12.45 16.49V16.5H12.5Z" fill="white"></path><path d="M15.3 12.75H13.8V11.22C13.8 11.09 13.73 11.01 13.62 11.01C13.5 11.01 13.45 11.06 13.45 11.19V12.75H10.99C10.88 12.75 10.86 12.71 10.86 12.61C10.86 12.14 10.86 11.67 10.86 11.2C10.86 11.05 10.77 10.97 10.64 11.02C10.54 11.06 10.51 11.15 10.51 11.26V12.75H9C8.97 12.72 8.96 12.68 8.96 12.65C8.96 11.87 8.96 11.09 8.97 10.32C8.97 9.95 9.11 9.63 9.3 9.33C9.54 8.95 9.89 8.69 10.3 8.54C10.47 8.47 10.67 8.43 10.85 8.42C11.7 8.41 12.55 8.41 13.39 8.42C13.96 8.43 14.44 8.68 14.82 9.11C15.06 9.38 15.24 9.68 15.28 10.05C15.3 10.22 15.33 10.38 15.33 10.55C15.34 11.24 15.33 11.93 15.33 12.61C15.33 12.66 15.33 12.7 15.3 12.75Z" fill="white"></path><path d="M10.8 6.28C10.74 5.55 11.48 4.92 12.16 4.95C12.86 4.98 13.52 5.57 13.44 6.45C13.39 7.09 12.8 7.69 12.05 7.65C11.38 7.61 10.76 7.06 10.8 6.28Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Responsible Gaming</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>
        </div>
      </div>

      <!-- Accordion 2: Live Plaza -->
      <div class="section-card rounded-2xl bg-[#141514] p-4 shadow-sm border border-white/[0.04]">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer select-none"
          @click="toggleSection('livePlaza')"
        >
          <h2 class="text-[15px] font-bold text-white tracking-tight">Live Plaza</h2>
          <ChevronUp v-if="openSections.livePlaza" class="h-4 w-4 text-white/50" />
          <ChevronDown v-else class="h-4 w-4 text-white/50" />
        </button>

        <div v-show="openSections.livePlaza" class="space-y-4 pt-4">
          <!-- Streamer Broadcast -->
          <NuxtLink to="/explore/live-plaza/streamer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#9747FF"></rect><path d="M16.5245 8.99329C16.0889 8.99329 15.7334 9.35352 15.7334 9.7938V11.4949C15.7334 13.5662 14.0534 15.2473 11.9911 15.2473C9.92891 15.2473 8.24891 13.5662 8.24891 11.4949V9.7938C8.24891 9.35352 7.89336 8.99329 7.4578 8.99329C7.02225 8.99329 6.66669 9.35352 6.66669 9.7938V11.4949C6.66669 14.1766 8.64002 16.398 11.2 16.7782V18.3993H9.6178C9.18225 18.3993 8.82669 18.7595 8.82669 19.1998C8.82669 19.6401 9.18225 20.0003 9.6178 20.0003H14.3822C14.8178 20.0003 15.1734 19.6401 15.1734 19.1998C15.1734 18.7595 14.8178 18.3993 14.3822 18.3993H12.8V16.7782C15.36 16.398 17.3334 14.1666 17.3334 11.4949V9.7938C17.3334 9.35352 16.9778 8.99329 16.5422 8.99329H16.5245Z" fill="white"></path><path d="M11.9911 13.9961C10.5245 13.9961 9.32446 12.6352 9.32446 10.9842V7.01167C9.32446 5.35061 10.5245 3.99976 11.9911 3.99976C13.4578 3.99976 14.6578 5.36062 14.6578 7.01167V10.9842C14.6578 12.6453 13.4578 13.9961 11.9911 13.9961Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Streamer Broadcast</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Match Predictions -->
          <NuxtLink to="/explore/live-plaza/expert-predictions" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#1EB1A5"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M4.81528 14.6522C4.34665 15.1208 4.34665 15.8806 4.81528 16.3492C5.28391 16.8178 6.04371 16.8178 6.51233 16.3492L9.05892 13.8026L10.8432 15.5827C11.0686 15.8076 11.3742 15.9337 11.6926 15.9332C12.011 15.9327 12.3162 15.8057 12.5409 15.5801L16.7999 11.3048V13.2C16.7999 13.8627 17.3372 14.4 17.9999 14.4C18.6627 14.4 19.1999 13.8627 19.1999 13.2V8.39995C19.1999 8.23554 19.1669 8.07886 19.107 7.93618C19.0482 7.79563 18.9615 7.66401 18.8468 7.54981C18.6171 7.32094 18.3179 7.20441 18.0173 7.20008L17.9982 7.19995H13.1999C12.5372 7.19995 11.9999 7.73721 11.9999 8.39995C11.9999 9.06269 12.5372 9.59995 13.1999 9.59995H15.1107L11.6881 13.0355L9.90545 11.257C9.43666 10.7894 8.67763 10.7898 8.20939 11.258L4.81528 14.6522Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Match Predictions</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Results -->
          <button type="button" class="menu-item flex items-center justify-between group text-left w-full cursor-pointer" @click="showDemoMessage('Match Results')">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FF6161"></rect><path d="M18.3588 12.6387H13.2726C12.9197 12.6387 12.6336 12.9247 12.6336 13.2775V18.3612C12.6336 18.714 12.9197 19 13.2726 19H18.3588C18.7117 19 18.9978 18.714 18.9978 18.3612V13.2775C18.9978 12.9247 18.7117 12.6387 18.3588 12.6387Z" fill="white"></path><path d="M15.0147 9.99625C15.5224 9.99625 15.9776 9.83 16.3628 9.5675L17.9736 11.2562C18.2099 11.51 18.5864 11.51 18.8227 11.2738C19.0591 11.02 19.0591 10.635 18.8227 10.39L17.1419 8.64C17.317 8.29 17.4046 7.905 17.4046 7.5025C17.4046 6.12875 16.3278 5.00875 15.0059 5.00875C13.6841 5.00875 12.6073 6.12875 12.6073 7.5025C12.6073 8.87625 13.6841 9.99625 15.0059 9.99625H15.0147ZM15.0147 6.25125C15.68 6.25125 16.214 6.8025 16.214 7.5025C16.214 8.2025 15.68 8.75375 15.0147 8.75375C14.3494 8.75375 13.8154 8.2025 13.8154 7.5025C13.8154 6.8025 14.3494 6.25125 15.0147 6.25125Z" fill="white"></path><path d="M10.7252 12.6387H5.63905C5.28611 12.6387 5 12.9247 5 13.2775V18.3612C5 18.714 5.28611 19 5.63905 19H10.7252C11.0781 19 11.3642 18.714 11.3642 18.3612V13.2775C11.3642 12.9247 11.0781 12.6387 10.7252 12.6387Z" fill="white"></path><path d="M10.7252 5H5.63905C5.28611 5 5 5.28598 5 5.63875V10.7225C5 11.0753 5.28611 11.3612 5.63905 11.3612H10.7252C11.0781 11.3612 11.3642 11.0753 11.3642 10.7225V5.63875C11.3642 5.28598 11.0781 5 10.7252 5Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Results</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </button>
        </div>
      </div>

      <!-- Accordion 3: Game Settings -->
      <div class="section-card rounded-2xl bg-[#141514] p-4 shadow-sm border border-white/[0.04]">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer select-none"
          @click="toggleSection('gameSettings')"
        >
          <h2 class="text-[15px] font-bold text-white tracking-tight">Game Settings</h2>
          <ChevronUp v-if="openSections.gameSettings" class="h-4 w-4 text-white/50" />
          <ChevronDown v-else class="h-4 w-4 text-white/50" />
        </button>

        <div v-show="openSections.gameSettings" class="space-y-4 pt-4">
          <!-- Odds Settings -->
          <div class="menu-item flex items-center justify-between relative">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#000000"></rect><path d="M11.6102 19C8.07127 19 5 16.9429 5 12.7252C5 8.07822 8.58575 5 12.8575 5C16.6147 5 19 7.42706 19 10.9049C19 13.9387 16.8797 15.4778 15.1025 15.4778C14.0891 15.4778 13.2784 15.0338 13.1069 14.2051H13.0757C12.5612 14.871 11.6882 15.3446 10.9399 15.3446C9.59911 15.3446 8.64811 14.3827 8.64811 12.8436C8.64811 10.8605 10.1448 8.77378 12.1871 8.77378C12.7795 8.77378 13.2472 9.02537 13.5434 9.60254H13.5902L13.8241 8.89218H15.2584L14.4788 12.518C14.1982 13.5983 14.4944 14.1163 15.3363 14.1163C16.4276 14.1163 17.5345 12.9027 17.5345 10.9641C17.5345 8.4482 16.069 6.34672 12.6704 6.34672C9.58352 6.34672 6.57461 8.84778 6.57461 12.6808C6.57461 15.981 8.95991 17.6533 11.7973 17.6533C12.7483 17.6533 13.7929 17.3573 14.5256 16.9725L15.0557 18.186C13.9955 18.7336 12.8575 19 11.6102 19ZM11.4232 13.9387C11.8285 13.9387 12.2183 13.7315 12.7171 13.1099L13.1693 10.7273C12.9354 10.3573 12.6548 10.1945 12.2494 10.1945C11.0958 10.1945 10.3942 11.63 10.3942 12.7104C10.3942 13.5539 10.7996 13.9387 11.4232 13.9387Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Odds Settings</span>
            </div>
            <div class="relative">
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-lg bg-[#242624] px-3 py-1.5 text-[13px] text-white hover:bg-[#2e312f] transition-colors cursor-pointer"
                @click="isOddsDropdownOpen = !isOddsDropdownOpen"
              >
                <span>{{ selectedOdds }}</span>
                <ChevronDown class="h-3.5 w-3.5 text-white/70" />
              </button>
              <div
                v-if="isOddsDropdownOpen"
                class="absolute right-0 top-full mt-1.5 z-30 rounded-xl bg-[#1f211f] border border-white/10 shadow-xl py-1.5 min-w-[130px]"
              >
                <button
                  v-for="opt in oddsOptions"
                  :key="opt"
                  type="button"
                  class="w-full text-left px-3.5 py-1.5 text-[13px] hover:bg-white/10 transition-colors"
                  :class="selectedOdds === opt ? 'text-[#34d399] font-bold' : 'text-white'"
                  @click="selectedOdds = opt; isOddsDropdownOpen = false"
                >
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>

          <!-- Event Settings -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#555555"></rect><path d="M7.00997 13.425V4.005H5.86997V13.425C4.87997 13.675 4.15997 14.535 4.15997 15.565C4.15997 16.595 4.88997 17.465 5.86997 17.705V19.995H7.00997V17.705C7.99997 17.455 8.71997 16.595 8.71997 15.565C8.71997 14.535 7.98997 13.665 7.00997 13.425ZM6.43997 16.675C5.80997 16.675 5.29997 16.175 5.29997 15.565C5.29997 14.955 5.80997 14.455 6.43997 14.455C7.06997 14.455 7.57997 14.955 7.57997 15.565C7.57997 16.175 7.06997 16.675 6.43997 16.675Z" fill="white"></path><path d="M12.57 5.74V4H11.43V5.74C10.44 5.99 9.71997 6.85 9.71997 7.88C9.71997 8.91 10.45 9.78 11.43 10.02V20H12.57V10.02C13.56 9.77 14.28 8.91 14.28 7.88C14.28 6.85 13.55 5.98 12.57 5.74ZM12 8.99C11.37 8.99 10.86 8.49 10.86 7.88C10.86 7.27 11.37 6.77 12 6.77C12.63 6.77 13.14 7.27 13.14 7.88C13.14 8.49 12.63 8.99 12 8.99Z" fill="white"></path><path d="M19.84 13.355C19.84 12.325 19.11 11.455 18.13 11.215V4.005H16.99V11.205C16 11.455 15.28 12.315 15.28 13.345C15.28 14.375 16.01 15.245 16.99 15.485V19.995H18.13V15.485C19.12 15.235 19.84 14.375 19.84 13.345V13.355ZM17.55 14.465C16.92 14.465 16.41 13.965 16.41 13.355C16.41 12.745 16.92 12.245 17.55 12.245C18.18 12.245 18.69 12.745 18.69 13.355C18.69 13.965 18.18 14.465 17.55 14.465Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Event Settings</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Theme -->
          <div class="menu-item flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#9747FF"></rect><path d="M13 6C13 5.44772 12.5523 5 12 5H5C4.44772 5 4 5.44772 4 6V13C4 13.5523 4.44772 14 5 14H12C12.5523 14 13 13.5523 13 13V6Z" fill="white"></path><path d="M20 16C20 15.4477 19.5523 15 19 15H5C4.44772 15 4 15.4477 4 16V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V16Z" fill="white"></path><path d="M20 6C20 5.44772 19.5523 5 19 5H15C14.4477 5 14 5.44772 14 6V8C14 8.55228 14.4477 9 15 9H19C19.5523 9 20 8.55228 20 8V6Z" fill="white"></path><path d="M20 11C20 10.4477 19.5523 10 19 10H15C14.4477 10 14 10.4477 14 11V13C14 13.5523 14.4477 14 15 14H19C19.5523 14 20 13.5523 20 13V11Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Theme</span>
            </div>
            <!-- Segmented Pill Toggle -->
            <div class="flex items-center rounded-full bg-black p-0.5 text-[13px]">
              <button
                type="button"
                class="rounded-full px-3 py-1 text-[12px] font-medium transition-all cursor-pointer"
                :class="selectedTheme === 'International' ? 'bg-[#015A3C] text-white font-semibold shadow' : 'text-white/70 hover:text-white'"
                @click="selectedTheme = 'International'"
              >
                International
              </button>
              <button
                type="button"
                class="rounded-full px-3 py-1 text-[12px] font-medium transition-all cursor-pointer"
                :class="selectedTheme === 'Asia' ? 'bg-[#015A3C] text-white font-semibold shadow' : 'text-white/70 hover:text-white'"
                @click="selectedTheme = 'Asia'"
              >
                Asia
              </button>
            </div>
          </div>

          <!-- Market Display -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#36C65D"></rect><rect x="4.29932" y="4.45911" width="9.21484" height="7.04085" rx="1.5" fill="white"></rect><rect width="9.21484" height="7.04085" rx="1.5" transform="matrix(-1 0 0 1 19.7007 12.5)" fill="white"></rect><rect x="14.4976" y="4.45911" width="5.20296" height="7.04085" rx="1.5" fill="white"></rect><rect width="5.20296" height="7.04085" rx="1.5" transform="matrix(-1 0 0 1 9.50244 12.5)" fill="white"></rect></svg>
              </div>
              <span class="text-[14px] text-white">Market Display</span>
            </div>
            <div class="flex items-center gap-1 text-[13px] text-white/80">
              <span>Default (Featured Bets)</span>
              <ChevronRight class="h-4 w-4 text-white/40" />
            </div>
          </a>
        </div>
      </div>

      <!-- Accordion 4: System Settings -->
      <div class="section-card rounded-2xl bg-[#141514] p-4 shadow-sm border border-white/[0.04]">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer select-none"
          @click="toggleSection('systemSettings')"
        >
          <h2 class="text-[15px] font-bold text-white tracking-tight">System Settings</h2>
          <ChevronUp v-if="openSections.systemSettings" class="h-4 w-4 text-white/50" />
          <ChevronDown v-else class="h-4 w-4 text-white/50" />
        </button>

        <div v-show="openSections.systemSettings" class="space-y-4 pt-4">
          <!-- Language -->
          <NuxtLink to="/explore/account/language" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#36C65D"></rect><path d="M12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4ZM6.043 10.398C5.969 10.472 5.969 10.472 6.043 10.544C5.846 10.863 5.423 10.902 5.12 10.71C4.94726 11.6323 4.96167 12.5799 5.16237 13.4966C5.36306 14.4132 5.74596 15.2802 6.2883 16.0459C6.83064 16.8117 7.52136 17.4606 8.31943 17.9542C9.1175 18.4477 10.0066 18.7758 10.934 18.919L10.928 18.914L10.808 18.854C11.033 18.782 11.331 18.782 11.553 18.782C11.479 18.344 11.479 17.981 11.479 17.542C11.479 17.542 9.767 16.304 9.767 15.574C9.767 14.844 9.99 14.481 9.767 14.481C9.394 14.481 8.947 14.773 8.873 14.481C8.724 14.043 8.426 13.679 7.979 13.534C6.954 13.534 6.807 12.43 6.789 11.292L6.788 10.982C6.788 10.616 6.341 10.616 6.043 10.398ZM12.423 5.013L12.509 5.036C13.643 5.382 13.676 6.526 12.745 6.386C12.745 6.749 12.745 7.186 12.671 7.624C12.596 8.354 11.702 8.136 11.479 8.5C11.257 8.865 11.926 9.229 12.671 9.083C12.894 9.083 12.671 8.863 12.821 8.791C13.118 8.719 13.49 8.719 13.788 8.791C13.4846 9.44669 13.1361 10.0805 12.745 10.688C12.595 10.906 12.745 11.344 12.745 11.635C12.745 13.824 11.702 11.125 11.553 11.198C11.404 11.344 10.735 11.052 10.437 11.052C10.139 11.052 10.287 11.635 9.99 11.635C9.394 11.635 9.543 11.489 9.543 11.707C9.543 11.999 9.616 12.583 9.616 13.458C9.616 13.75 10.212 13.386 10.584 13.386C11.031 13.386 11.329 13.75 11.627 13.896C12.147 14.116 12.669 14.845 13.041 14.916C13.413 14.991 13.115 15.573 13.561 15.5C13.784 15.428 14.082 15.574 14.231 15.792C14.455 16.084 14.306 16.45 14.008 16.668C13.562 17.105 13.413 17.615 13.19 18.636C13.312 18.596 13.456 18.698 13.575 18.821C14.6958 18.5616 15.7355 18.0304 16.6024 17.2742C17.4693 16.5181 18.1368 15.5601 18.546 14.485C17.98 15.086 17.326 15.132 17.52 14.623C17.296 14.186 16.998 13.82 16.626 13.456C15.955 12.873 15.359 11.778 17.445 10.246C17.122 9.424 17.922 8.656 18.43 9.232C17.9177 8.04155 17.0849 7.01671 16.0245 6.27162C14.9641 5.52654 13.7176 5.09047 12.424 5.012L12.423 5.013Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Language</span>
            </div>
            <div class="flex items-center gap-1 text-[13px] text-white/80">
              <span>{{ selectedLanguageLabel }}</span>
              <ChevronRight class="h-4 w-4 text-white/40" />
            </div>
          </NuxtLink>

          <!-- Time Zone -->
          <NuxtLink to="/explore/account/timezone" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#4C9EEA"></rect><path d="M15.8494 11.755C13.5794 11.755 11.7294 13.595 11.7294 15.865C11.7294 16.985 12.1794 17.995 12.8994 18.735C12.5294 18.825 12.0994 18.845 11.9094 18.845H11.8194C11.9094 18.595 11.9394 18.305 11.8694 18.015C11.7394 17.485 11.3094 17.045 10.5094 16.615L10.1794 16.435C9.63939 16.155 9.34939 16.005 9.17939 15.765C9.00939 15.535 8.88939 15.165 8.72939 14.365C8.61939 13.815 8.31939 13.395 7.85939 13.155C7.54939 12.995 7.16939 12.905 6.72939 12.905C6.41939 12.905 6.06939 12.945 5.70939 13.025C5.52939 13.065 5.35939 13.115 5.19939 13.155C5.12939 12.775 5.09939 12.365 5.09939 11.965C5.09939 9.535 6.36939 7.395 8.27939 6.165C8.28939 6.385 8.33939 6.615 8.43939 6.845C8.69939 7.40499 9.23939 7.755 10.0294 7.905C10.0694 7.915 10.0994 7.915 10.1294 7.915H10.1694C10.2394 7.915 10.4994 8.025 10.7794 8.125C11.1494 8.275 11.4194 8.325 11.4894 8.725C11.6594 9.975 11.7594 10.595 11.5194 11.325C11.4994 11.385 11.4894 11.445 11.4894 11.505C11.4894 11.805 11.7394 12.065 12.0494 12.065C12.1994 12.065 12.3394 12.005 12.4494 11.905C12.5594 11.805 14.9194 11.135 15.5294 10.365C15.5994 10.275 15.6694 10.195 15.7494 10.105C16.0394 9.765 16.3494 9.415 16.4594 8.90499C16.5894 8.345 16.4094 7.835 16.0194 7.075C15.7394 6.525 15.6894 6.285 15.6794 6.195C15.6894 6.185 15.7094 6.175 15.7294 6.165C17.4694 7.275 18.6794 9.14499 18.8794 11.345C18.9094 11.635 19.1394 11.855 19.4394 11.855H19.4894C19.7894 11.845 20.0194 11.585 19.9994 11.265C19.8194 9.285 18.9194 7.445 17.4394 6.105C15.9494 4.755 14.0294 3.995 12.0094 3.995C10.9294 3.995 9.87939 4.205 8.88939 4.625C8.87939 4.625 8.87939 4.635 8.86939 4.635C8.85939 4.635 8.85939 4.645 8.84939 4.645C7.90939 5.045 7.06939 5.615 6.33939 6.345C5.59939 7.085 5.01939 7.935 4.61939 8.895C4.20939 9.875 3.99939 10.925 3.99939 12.005C3.99939 12.705 4.08939 13.375 4.25939 14.035C4.25939 14.055 4.26939 14.075 4.27939 14.095C4.62939 15.385 5.29939 16.575 6.25939 17.565C7.50939 18.835 9.10939 19.645 10.8394 19.895C10.8594 19.895 10.8694 19.905 10.8894 19.905C11.1694 19.945 11.4694 19.975 11.7594 19.975H11.9394C12.2794 19.975 12.9394 19.945 13.4894 19.755C13.6294 19.705 13.7394 19.605 13.7994 19.475C13.7994 19.465 13.7994 19.445 13.8094 19.435C14.4194 19.785 15.1094 20.005 15.8694 20.005C18.1494 20.005 19.9894 18.165 19.9894 15.895C19.9894 13.625 18.1394 11.785 15.8694 11.785L15.8494 11.755ZM9.47939 5.555C10.2594 5.255 11.0994 5.085 11.9794 5.085C12.9294 5.085 13.8394 5.275 14.6694 5.625C14.6094 5.735 14.5594 5.865 14.5394 6.025C14.4994 6.415 14.6394 6.905 15.0094 7.605C15.5594 8.65499 15.3594 8.83499 14.8794 9.40499C14.7994 9.495 14.7194 9.585 14.6394 9.685C14.3394 10.065 13.4894 10.065 12.7994 10.795C12.7994 10.445 12.7794 10.035 12.7494 9.605C12.6794 8.615 12.5994 8.615 12.5994 8.585V8.555C12.4494 7.755 11.9194 7.285 11.1594 7.005C10.7294 6.845 10.3394 6.825 10.1894 6.825C9.79939 6.745 9.54939 6.595 9.44939 6.395C9.32939 6.155 9.40939 5.795 9.48939 5.575L9.47939 5.555ZM10.6494 18.725C8.20939 18.265 6.25939 16.535 5.46939 14.245C5.82939 14.145 6.30939 14.035 6.72939 14.035C6.97939 14.035 7.18939 14.075 7.33939 14.155C7.49939 14.245 7.58939 14.375 7.62939 14.595C7.79939 15.455 7.94939 16.025 8.28939 16.465C8.60939 16.885 9.02939 17.105 9.65939 17.435H9.67939C9.76939 17.495 9.87939 17.545 9.97939 17.605C10.6194 17.945 10.7594 18.185 10.7894 18.295C10.8194 18.405 10.7494 18.565 10.6594 18.725H10.6494ZM15.8494 18.855C14.1994 18.855 12.8394 17.515 12.8394 15.855C12.8394 14.195 14.1894 12.855 15.8494 12.855C17.5094 12.855 18.8594 14.195 18.8594 15.855C18.8594 17.515 17.4994 18.855 15.8494 18.855Z" fill="white"></path><path d="M16.2494 16.015V14.115C16.2494 13.815 15.9994 13.555 15.6894 13.555C15.3794 13.555 15.1294 13.805 15.1294 14.115V16.245C15.1294 16.395 15.1894 16.525 15.2894 16.635L16.2894 17.645C16.3894 17.745 16.5294 17.805 16.6794 17.805C16.8294 17.805 16.9594 17.745 17.0794 17.645C17.1794 17.545 17.2394 17.405 17.2394 17.255C17.2394 17.105 17.1794 16.965 17.0794 16.865L16.2394 16.015H16.2494Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Time Zone</span>
            </div>
            <div class="flex items-center gap-1 text-[13px] text-white/80">
              <span>{{ selectedTimeZone.offset }}</span>
              <ChevronRight class="h-4 w-4 text-white/40" />
            </div>
          </NuxtLink>

          <!-- Mode -->
          <div class="menu-item flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#ffffff"></rect><path d="M11.9816 4C12.1916 4 12.3816 4.12004 12.4816 4.30011C12.5816 4.48018 12.5816 4.71026 12.4816 4.89033C11.1416 7.28121 11.9816 10.3023 14.3716 11.6428C15.1216 12.063 15.9616 12.2831 16.8116 12.2831C17.6216 12.2831 18.4116 12.083 19.1216 11.7028C19.3116 11.6028 19.5316 11.6128 19.7116 11.7229C19.8916 11.8329 19.9916 12.033 19.9916 12.243C19.8616 16.6647 16.1716 20.136 11.7516 19.9959C7.34158 19.8659 3.87158 16.1745 4.00158 11.7629C4.13158 7.44127 7.66158 4.01 11.9816 4ZM18.5016 8.18154C18.6716 8.18154 18.8116 8.3216 18.8216 8.49166C18.8216 8.96183 19.2216 9.34197 19.6916 9.34197C19.8616 9.34197 20.0016 9.48202 20.0016 9.65209C20.0016 9.82215 19.8616 9.9622 19.6916 9.9622C19.2216 9.9622 18.8316 10.3423 18.8216 10.8125C18.8216 10.9826 18.6616 11.1226 18.4916 11.1126C18.3316 11.1126 18.2016 10.9726 18.1916 10.8125C18.1916 10.3423 17.7916 9.9622 17.3216 9.9622C17.1516 9.9622 17.0116 9.82215 17.0116 9.65209C17.0116 9.48202 17.1516 9.34197 17.3216 9.34197H17.3716C17.8216 9.32197 18.1816 8.95183 18.1916 8.49166C18.1916 8.3216 18.3316 8.18154 18.5116 8.18154H18.5016ZM15.5116 4C15.6816 4 15.8216 4.14005 15.8216 4.31011C15.8216 5.41052 16.7216 6.31085 17.8216 6.31085C17.9916 6.31085 18.1316 6.45091 18.1316 6.62097C18.1316 6.79103 17.9916 6.93108 17.8216 6.93108C16.7216 6.93108 15.8216 7.83141 15.8216 8.93182C15.8216 9.10188 15.6816 9.24194 15.5116 9.24194C15.3416 9.24194 15.2016 9.10188 15.2016 8.93182C15.2016 7.83141 14.3016 6.93108 13.2016 6.93108C13.0616 6.93108 12.9316 6.84105 12.9016 6.711C12.8616 6.54094 12.9616 6.38088 13.1316 6.34086C13.1516 6.34086 13.1816 6.34086 13.2016 6.34086C14.3016 6.34086 15.2016 5.44053 15.2016 4.34013C15.2016 4.17006 15.3316 4.03001 15.5016 4.02001C15.5016 4.02001 15.5116 4.02001 15.5216 4.02001L15.5116 4Z" fill="#333333"></path></svg>
              </div>
              <span class="text-[14px] text-white">Mode</span>
            </div>
            <!-- Segmented Pill Toggle -->
            <div class="flex items-center rounded-full bg-black p-0.5 text-[13px]">
              <button
                type="button"
                class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
                :class="themePreference === 'light' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white/70 hover:text-white'"
                :aria-pressed="themePreference === 'light'"
                @click="setThemePreference('light')"
              >
                Light
              </button>
              <button
                type="button"
                class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
                :class="themePreference === 'dark' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white/70 hover:text-white'"
                :aria-pressed="themePreference === 'dark'"
                @click="setThemePreference('dark')"
              >
                Dark
              </button>
              <button
                type="button"
                class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
                :class="themePreference === 'auto' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white/70 hover:text-white'"
                :aria-pressed="themePreference === 'auto'"
                @click="setThemePreference('auto')"
              >
                Auto
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Accordion 5: Help -->
      <div class="section-card rounded-2xl bg-[#141514] p-4 shadow-sm border border-white/[0.04]">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer select-none"
          @click="toggleSection('help')"
        >
          <h2 class="text-[15px] font-bold text-white tracking-tight">Help</h2>
          <ChevronUp v-if="openSections.help" class="h-4 w-4 text-white/50" />
          <ChevronDown v-else class="h-4 w-4 text-white/50" />
        </button>

        <div v-show="openSections.help" class="space-y-4 pt-4">
          <!-- 24/7 Services -->
          <NuxtLink to="/explore/egames/customer-service" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#0976FF"></rect><path d="M12.005 3C7.59225 3 4 6.74792 4 11.3654C4 14.0639 5.23077 16.5625 7.31207 18.1416L6.0813 20.2404C5.97123 20.4203 5.99124 20.6602 6.13133 20.8201C6.22139 20.93 6.36148 21 6.49156 21C6.55159 21 6.61163 20.99 6.67167 20.96L9.98374 19.4609C10.6442 19.6408 11.3246 19.7307 11.995 19.7307C16.4078 19.7307 20 15.9828 20 11.3654C20 6.74792 16.4178 3 12.005 3ZM15.4171 13.884C15.3871 13.9639 14.5766 15.8029 12.2652 15.8029C9.7636 15.8029 9.1232 13.9239 9.09318 13.844C8.99312 13.5341 9.16323 13.2043 9.48343 13.1044C9.80363 13.0044 10.1448 13.1743 10.2439 13.4842C10.2839 13.6041 10.7042 14.6335 12.2652 14.6335C13.8261 14.6335 14.2964 13.4542 14.2964 13.4442C14.4265 13.1444 14.7767 13.0044 15.0869 13.1244C15.3971 13.2443 15.5472 13.5941 15.4171 13.8939V13.884Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">24/7 Services</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Transaction Tutorial -->
          <NuxtLink to="/tutorial/transactions/deposit" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#80B100"></rect><path d="M16.55 4H7.45C5.82 4 5 4.81051 5 6.44153V17.5585C5 19.1895 5.82 20 7.45 20H16.55C18.18 20 19 19.1895 19 17.5585V6.44153C19 4.81051 18.18 4 16.55 4ZM8.42 18.0888C8.42 18.389 8.27 18.5391 7.97 18.5391C7.67 18.5391 7.52 18.389 7.52 18.0888V5.43089C7.52 5.13071 7.67 4.98061 7.97 4.98061C8.27 4.98061 8.42 5.13071 8.42 5.43089V18.0888ZM15.99 9.4334C15.99 9.7636 15.59 9.93371 15.35 9.70356L14.26 8.67292L13.17 9.70356C12.93 9.93371 12.53 9.7636 12.53 9.4334V4.99062H15.98V9.4334H15.99Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Transaction Tutorial</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Tutorial -->
          <NuxtLink to="/tutorial/mock-betting" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#80B100"></rect><path d="M17.275 20H6.70499C5.91499 20 5.27499 19.36 5.27499 18.57V5.43C5.27499 4.64 5.91499 4 6.70499 4H8.13499V9C8.13499 9.16 8.19499 9.3 8.30499 9.4L9.85499 7.85L11.405 9.4C11.515 9.29 11.575 9.15 11.575 9V4H17.295C18.085 4 18.725 4.64 18.725 5.43V18.57C18.725 19.36 18.085 20 17.295 20H17.275ZM15.565 12.43H8.70499C8.31499 12.43 7.99499 12.75 7.99499 13.14C7.99499 13.53 8.31499 13.85 8.70499 13.85H15.565C15.955 13.85 16.275 13.53 16.275 13.14C16.275 12.75 15.955 12.43 15.565 12.43ZM15.565 15.86H8.70499C8.31499 15.86 7.99499 16.18 7.99499 16.57C7.99499 16.96 8.31499 17.28 8.70499 17.28H15.565C15.955 17.28 16.275 16.96 16.275 16.57C16.275 16.18 15.955 15.86 15.565 15.86Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Tutorial</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Game Rules -->
          <NuxtLink to="/game-rules/sports-betting-rules" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FFBA00"></rect><path d="M11.57 4H17.29C18.08 4 18.72 4.64 18.72 5.43V18.57C18.72 19.36 18.08 20 17.29 20H6.71C5.92 20 5.28 19.36 5.28 18.57V5.43C5.28 4.64 5.92 4 6.71 4H8.14M15.57 12.43H8.71C8.32 12.43 8 12.75 8 13.14C8 13.53 8.32 13.85 8.71 13.85H15.57C15.96 13.85 16.28 13.53 16.28 13.14C16.28 12.75 15.96 12.43 15.57 12.43ZM15.57 15.86H8.71C8.32 15.86 8 16.18 8 16.57C8 16.96 8.32 17.28 8.71 17.28H15.57C15.96 17.28 16.28 16.96 16.28 16.57C16.28 16.18 15.96 15.86 15.57 15.86Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Game Rules</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Responsible Gaming -->
          <NuxtLink to="/responsible-gaming" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="8" fill="#9747FF"></rect><path d="M13.2187 4.59381C13.2447 4.60002 13.2707 4.60623 13.2975 4.61263C14.2633 4.85171 15.1395 5.2882 15.8697 5.96832C15.9344 6.02847 16.0009 6.08561 16.0684 6.14264C16.8643 6.83788 17.3736 7.89725 17.625 8.90631C17.6349 8.94474 17.6349 8.94474 17.6449 8.98393C17.8467 9.80607 17.8272 10.7744 17.625 11.5938C17.6152 11.6339 17.6152 11.6339 17.6052 11.6747C17.3718 12.5935 16.9235 13.423 16.2819 14.1186C16.2269 14.1787 16.1747 14.24 16.123 14.3028C16.0196 14.4235 15.9036 14.5239 15.7812 14.6251C15.7568 14.6457 15.7568 14.6457 15.7318 14.6667C14.4717 15.7253 12.9124 16.1194 11.2907 15.9909C10.1177 15.8611 8.99892 15.333 8.13464 14.5351C8.06828 14.4741 8.00041 14.4157 7.93163 14.3575C7.13333 13.6603 6.63044 12.6048 6.37499 11.5938C6.36507 11.5555 6.36507 11.5555 6.35494 11.5164C6.15301 10.6997 6.16501 9.71953 6.37499 8.90631C6.38152 8.88014 6.38806 8.85396 6.39478 8.827C6.62973 7.90867 7.07224 7.07397 7.71826 6.38031C7.7784 6.31562 7.83554 6.24914 7.89257 6.1817C8.58563 5.38824 9.64812 4.87116 10.6562 4.62506C10.683 4.61849 10.7098 4.61192 10.7374 4.60515C11.511 4.42553 12.4436 4.40719 13.2187 4.59381ZM11.5806 7.83975C11.5411 7.90816 11.5064 7.97742 11.4726 8.04889C11.4599 8.07451 11.4472 8.10013 11.434 8.12652C11.4071 8.18087 11.3804 8.23536 11.3539 8.28998C11.3113 8.37747 11.2674 8.4642 11.2231 8.55084C11.1399 8.71429 11.1399 8.71429 11.0574 8.87811C11.0463 8.90019 11.0352 8.92227 11.0237 8.94502C10.9959 8.99964 10.9959 8.99964 11 9.06256C10.9815 9.06491 10.963 9.06726 10.9439 9.06968C10.7229 9.09785 10.5021 9.1269 10.2812 9.15631C10.2508 9.16032 10.2203 9.16432 10.1889 9.16844C10.1044 9.17966 10.02 9.19135 9.93554 9.20319C9.91013 9.2065 9.88472 9.20982 9.85854 9.21324C9.67186 9.24015 9.50094 9.28248 9.38085 9.43952C9.29726 9.55178 9.27543 9.60486 9.27148 9.74225C9.27031 9.76852 9.26914 9.79478 9.26794 9.82184C9.30046 10.0283 9.47074 10.1606 9.61889 10.2928C9.66014 10.3311 9.70132 10.3695 9.74242 10.408C9.80661 10.468 9.87102 10.5273 9.93688 10.5855C10.2905 10.899 10.2905 10.899 10.3263 11.0636C10.3313 11.216 10.2914 11.3546 10.25 11.5001C10.2381 11.5653 10.2269 11.6307 10.2165 11.6962C10.2002 11.7852 10.1834 11.8741 10.1664 11.963C10.0937 12.3396 10.0937 12.3396 10.2187 12.6876C10.3343 12.804 10.4335 12.8694 10.6001 12.8836C10.7378 12.8737 10.8398 12.8308 10.9609 12.7696C10.9834 12.7586 11.0059 12.7476 11.0291 12.7363C11.4942 12.5125 11.4942 12.5125 11.9375 12.2501C12.1307 12.2518 12.2883 12.3642 12.4512 12.4571C12.7604 12.6293 12.7604 12.6293 13.0762 12.7891C13.1109 12.806 13.1457 12.823 13.1815 12.8404C13.3133 12.8862 13.4309 12.8983 13.5648 12.8532C13.7133 12.7623 13.8182 12.6704 13.875 12.5001C13.8886 12.3152 13.8675 12.1387 13.8329 11.9576C13.8242 11.9094 13.8155 11.8611 13.8068 11.8129C13.793 11.7382 13.7792 11.6634 13.7652 11.5887C13.7517 11.5157 13.7386 11.4427 13.7255 11.3697C13.7212 11.3475 13.7169 11.3252 13.7125 11.3023C13.6731 11.0818 13.6731 11.0818 13.7187 10.9688C13.7815 10.8906 13.8524 10.8222 13.9247 10.7529C13.9453 10.7326 13.9659 10.7123 13.9871 10.6914C14.053 10.6267 14.1192 10.5624 14.1855 10.4981C14.2517 10.4337 14.3177 10.3692 14.3836 10.3045C14.4246 10.2643 14.4657 10.2243 14.507 10.1844C14.5257 10.1661 14.5444 10.1479 14.5636 10.1291C14.58 10.1132 14.5964 10.0973 14.6133 10.0809C14.724 9.95305 14.7322 9.83459 14.7286 9.67096C14.7096 9.52269 14.6296 9.43912 14.5229 9.34162C14.1832 9.10182 13.4083 9.06256 13 9.06256C12.9881 9.02378 12.9881 9.02378 12.976 8.98421C12.9324 8.86071 12.8786 8.74601 12.8207 8.62873C12.8093 8.6057 12.798 8.58268 12.7863 8.55896C12.7624 8.51055 12.7384 8.46218 12.7144 8.41384C12.6778 8.34009 12.6418 8.26609 12.6058 8.19208C12.5824 8.1449 12.559 8.09774 12.5355 8.0506C12.5249 8.02859 12.5143 8.00658 12.5033 7.98391C12.4373 7.85293 12.3741 7.77198 12.25 7.68756C12.2313 7.67467 12.2126 7.66178 12.1934 7.6485C11.9559 7.5671 11.732 7.64038 11.5806 7.83975Z" fill="white"></path><path d="M7.96875 15.89C8.06184 15.9089 8.12729 15.9375 8.20569 15.9907C8.22682 16.0048 8.24795 16.019 8.26972 16.0335C8.29221 16.0487 8.31471 16.0638 8.33789 16.0795C9.23799 16.6703 10.2232 16.9767 11.2813 17.14C11.2611 17.2925 11.1978 17.4175 11.1313 17.5542C11.1133 17.592 11.1133 17.592 11.0948 17.6305C11.0556 17.7125 11.0161 17.7944 10.9766 17.8763C10.9222 17.9895 10.868 18.1028 10.8138 18.2161C10.8004 18.2442 10.7869 18.2724 10.773 18.3014C10.691 18.4726 10.6102 18.6444 10.5309 18.8169C10.5216 18.8372 10.5122 18.8574 10.5026 18.8783C10.46 18.9711 10.4175 19.064 10.3753 19.1571C10.1901 19.5612 10.1901 19.5612 10.0449 19.6674C9.8497 19.7313 9.67332 19.736 9.48303 19.6559C9.34625 19.5715 9.29052 19.4514 9.22266 19.3099C9.20969 19.2841 9.19673 19.2583 9.18337 19.2318C9.1423 19.1495 9.10228 19.0667 9.0625 18.9838C9.04883 18.9554 9.03515 18.9271 9.02106 18.8979C8.93982 18.7292 8.86001 18.5599 8.78125 18.39C8.7005 18.4075 8.61977 18.4251 8.53906 18.4427C8.51405 18.4482 8.48904 18.4536 8.46327 18.4593C8.32536 18.4897 8.1885 18.5224 8.05213 18.5592C8.01117 18.5701 8.01117 18.5701 7.96939 18.5812C7.91689 18.5953 7.86449 18.6098 7.81223 18.6248C7.59825 18.6818 7.40964 18.6895 7.20899 18.5873C7.09547 18.4896 7.01462 18.411 6.9879 18.2584C6.9747 17.978 7.08403 17.7589 7.20313 17.5131C7.22412 17.4685 7.24506 17.4239 7.26594 17.3793C7.30995 17.2855 7.35435 17.1919 7.39906 17.0985C7.47059 16.949 7.54098 16.7989 7.61121 16.6488C7.72976 16.3956 7.84903 16.1427 7.96875 15.89Z" fill="white"></path><path d="M16.0312 15.89C16.2181 16.28 16.4036 16.6705 16.588 17.0617C16.6218 17.1333 16.6559 17.2049 16.6899 17.2765C16.744 17.3901 16.7969 17.5043 16.8496 17.6185C16.8652 17.651 16.8807 17.6835 16.8968 17.7169C16.99 17.9222 17.0318 18.1016 17 18.3275C16.9279 18.4801 16.8374 18.5637 16.6875 18.64C16.494 18.6836 16.3313 18.6664 16.1428 18.6128C16.1073 18.6034 16.1073 18.6034 16.0711 18.5937C15.9965 18.5738 15.9221 18.5532 15.8477 18.5326C15.7725 18.5122 15.6974 18.4919 15.6222 18.4718C15.5756 18.4593 15.5291 18.4466 15.4827 18.4337C15.3917 18.4088 15.3136 18.39 15.2188 18.39C15.2035 18.4223 15.1882 18.4546 15.1725 18.4879C15.1154 18.6084 15.058 18.7286 15.0004 18.8487C14.9755 18.9007 14.9508 18.9526 14.9263 19.0047C14.8908 19.0797 14.8549 19.1545 14.819 19.2292C14.8082 19.2524 14.7973 19.2755 14.7862 19.2993C14.7019 19.4731 14.597 19.6354 14.4062 19.7025C14.3265 19.713 14.3265 19.713 14.2402 19.7142C14.212 19.7151 14.1838 19.716 14.1547 19.7169C14.0332 19.6979 13.9388 19.6539 13.8438 19.5775C13.7831 19.4878 13.7831 19.4878 13.7324 19.3763C13.7114 19.3314 13.6904 19.2864 13.6693 19.2415C13.6576 19.2159 13.6459 19.1903 13.6338 19.1639C13.5883 19.0659 13.5412 18.9687 13.4938 18.8716C13.3076 18.49 13.1245 18.107 12.9453 17.722C12.9297 17.6887 12.914 17.6553 12.8979 17.6209C12.8245 17.4623 12.7599 17.31 12.7188 17.14C12.7364 17.1374 12.7541 17.1347 12.7723 17.132C13.8837 16.962 14.9476 16.6135 15.8593 15.9406C15.9375 15.89 15.9375 15.89 16.0312 15.89Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Responsible Gaming</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Terms of Use -->
          <NuxtLink to="/terms-of-use" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="8" fill="#00B386"></rect><path d="M8.07867 4.64814C8.11362 4.64802 8.14856 4.6479 8.18457 4.64778C8.30098 4.64746 8.41739 4.64758 8.5338 4.64771C8.61754 4.64757 8.70129 4.64741 8.78503 4.64722C8.9885 4.64682 9.19196 4.64677 9.39542 4.64684C9.56092 4.6469 9.72641 4.64684 9.8919 4.64671C9.9155 4.64669 9.93911 4.64667 9.96343 4.64665C10.0114 4.64661 10.0593 4.64658 10.1073 4.64654C10.5566 4.6462 11.0058 4.64627 11.4551 4.64646C11.8654 4.64662 12.2757 4.64627 12.686 4.64567C13.1081 4.64507 13.5301 4.64481 13.9521 4.64493C14.1888 4.64499 14.4255 4.64491 14.6621 4.64447C14.8636 4.64409 15.0651 4.64405 15.2666 4.64443C15.3692 4.64461 15.4719 4.6446 15.5745 4.64427C16.3076 4.64212 16.9192 4.70552 17.4688 5.25004C17.8509 5.68578 18.0149 6.1537 18.0123 6.72827C18.0125 6.76884 18.0127 6.80941 18.0129 6.85121C18.0134 6.9629 18.0134 7.07459 18.0132 7.18628C18.0131 7.30708 18.0136 7.42788 18.0139 7.54869C18.0146 7.78495 18.0147 8.02121 18.0147 8.25748C18.0146 8.44952 18.0148 8.64156 18.015 8.8336C18.0151 8.889 18.0151 8.94441 18.0152 8.99982C18.0152 9.04119 18.0152 9.04119 18.0153 9.0834C18.0159 9.60431 18.0158 10.1252 18.0156 10.6461C18.0155 11.1225 18.0161 11.599 18.0171 12.0754C18.0182 12.565 18.0187 13.0545 18.0185 13.5441C18.0185 13.8188 18.0186 14.0936 18.0194 14.3683C18.0201 14.602 18.0202 14.8357 18.0196 15.0695C18.0193 15.1887 18.0192 15.3079 18.0199 15.4271C18.0206 15.5564 18.0201 15.6857 18.0194 15.815C18.0198 15.8525 18.0202 15.8901 18.0206 15.9288C18.018 16.1782 17.9714 16.3347 17.7987 16.5161C17.6593 16.6429 17.5296 16.6875 17.3438 16.6875C17.344 16.7063 17.3443 16.725 17.3446 16.7443C17.3474 16.9411 17.3493 17.1378 17.3506 17.3345C17.3512 17.4077 17.3521 17.481 17.3532 17.5542C17.3547 17.66 17.3554 17.7658 17.356 17.8716C17.3566 17.9039 17.3573 17.9361 17.3579 17.9693C17.358 18.3572 17.2304 18.6826 16.9688 18.9688C16.6541 19.2564 16.3047 19.3634 15.8838 19.3595C15.8315 19.3597 15.8315 19.3597 15.7781 19.36C15.6623 19.3604 15.5465 19.3599 15.4307 19.3595C15.3473 19.3596 15.2638 19.3598 15.1804 19.36C14.9779 19.3604 14.7754 19.3602 14.5729 19.3597C14.3367 19.3592 14.1005 19.3593 13.8643 19.3594C13.4425 19.3596 13.0208 19.3591 12.5991 19.3584C12.1906 19.3576 11.7822 19.3574 11.3737 19.3577C10.9281 19.3581 10.4825 19.3581 10.0369 19.3577C9.98932 19.3576 9.94172 19.3576 9.89413 19.3576C9.87071 19.3575 9.8473 19.3575 9.82318 19.3575C9.65885 19.3573 9.49453 19.3574 9.3302 19.3575C9.12969 19.3577 8.92918 19.3575 8.72866 19.3569C8.62652 19.3566 8.52439 19.3564 8.42225 19.3566C7.69065 19.3579 7.07966 19.2934 6.53126 18.75C6.13062 18.2931 5.98516 17.8165 5.98789 17.2173C5.98776 17.1704 5.98759 17.1235 5.98738 17.0766C5.98693 16.9485 5.98706 16.8205 5.98729 16.6924C5.98744 16.5539 5.98705 16.4155 5.98673 16.277C5.98619 16.0061 5.98617 15.7352 5.98633 15.4643C5.98646 15.244 5.98641 15.0237 5.98625 14.8034C5.98622 14.772 5.9862 14.7406 5.98617 14.7082C5.98613 14.6445 5.98608 14.5807 5.98603 14.5169C5.9856 13.9191 5.98577 13.3213 5.98613 12.7236C5.98644 12.1773 5.98604 11.631 5.98529 11.0846C5.98453 10.5231 5.98423 9.96153 5.98443 9.39997C5.98454 9.08494 5.98447 8.76992 5.98393 8.45489C5.98347 8.1867 5.98345 7.9185 5.98399 7.65031C5.98426 7.5136 5.98433 7.37691 5.98385 7.24021C5.98341 7.11481 5.98356 6.98943 5.98417 6.86403C5.98428 6.81892 5.98419 6.77381 5.98386 6.72871C5.97979 6.12535 6.17469 5.6234 6.59376 5.18754C7.02406 4.79996 7.50995 4.64605 8.07867 4.64814ZM7.53053 16.8728C7.38652 17.0801 7.32484 17.233 7.35841 17.4878C7.39789 17.6655 7.52018 17.7768 7.64783 17.897C7.85535 18.0156 8.10528 18.0089 8.33754 18.0076C8.3869 18.0076 8.3869 18.0076 8.43726 18.0077C8.54695 18.0078 8.65663 18.0075 8.76631 18.0071C8.84517 18.0071 8.92403 18.0071 9.00289 18.0072C9.17236 18.0072 9.34184 18.007 9.51131 18.0066C9.75634 18.0061 10.0014 18.006 10.2464 18.0059C10.644 18.0058 11.0416 18.0053 11.4392 18.0048C11.8253 18.0042 12.2114 18.0037 12.5975 18.0035C12.6213 18.0035 12.6451 18.0034 12.6697 18.0034C12.7892 18.0033 12.9087 18.0033 13.0282 18.0032C14.0188 18.0025 15.0094 18.0014 16 18C16 17.5669 16 17.1338 16 16.6875C14.9652 16.6847 13.9304 16.6825 12.8956 16.6812C12.7734 16.681 12.6512 16.6808 12.529 16.6807C12.5047 16.6806 12.4804 16.6806 12.4553 16.6806C12.0615 16.68 11.6677 16.679 11.2739 16.6779C10.8698 16.6767 10.4657 16.676 10.0616 16.6758C9.81226 16.6756 9.56294 16.6751 9.31361 16.674C9.12237 16.6733 8.93112 16.6732 8.73987 16.6734C8.66146 16.6734 8.58306 16.6731 8.50465 16.6726C8.39758 16.672 8.29054 16.6722 8.18346 16.6725C8.15246 16.6721 8.12145 16.6718 8.0895 16.6714C7.86821 16.6733 7.69378 16.7172 7.53053 16.8728Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Terms of Use</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Privacy Policy -->
          <NuxtLink to="/privacy-policy" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="8" fill="#D80027"></rect><path d="M7.15974 4.77273C7.20032 4.77254 7.20032 4.77254 7.24172 4.77234C7.33226 4.77196 7.42279 4.77182 7.51333 4.77169C7.57831 4.77147 7.64328 4.77124 7.70825 4.771C7.92158 4.77027 8.1349 4.76991 8.34822 4.76956C8.42179 4.76942 8.49535 4.76928 8.56892 4.76913C8.91466 4.76847 9.2604 4.76798 9.60614 4.76769C10.0046 4.76735 10.403 4.76644 10.8014 4.76503C11.1098 4.76398 11.4181 4.76347 11.7265 4.76336C11.9105 4.76328 12.0944 4.76297 12.2784 4.76209C12.4517 4.76128 12.625 4.76114 12.7983 4.76149C12.8616 4.76151 12.9249 4.76129 12.9882 4.76081C13.3521 4.75821 13.6634 4.78035 14.0069 4.91673C14.0382 4.92913 14.0695 4.94154 14.1018 4.95433C14.521 5.13062 14.8824 5.52612 15.0658 5.93547C15.179 6.22074 15.2274 6.45604 15.2261 6.76064C15.2261 6.79216 15.2261 6.82368 15.2261 6.85616C15.2261 6.96005 15.2258 7.06394 15.2255 7.16784C15.2255 7.23999 15.2254 7.31214 15.2254 7.38429C15.2252 7.57397 15.2249 7.76366 15.2245 7.95334C15.2242 8.14699 15.224 8.34063 15.2238 8.53428C15.2235 8.91408 15.2229 9.29387 15.2221 9.67367C15.1986 9.683 15.175 9.69234 15.1507 9.70195C15.1042 9.72048 15.1042 9.72048 15.0566 9.73938C15.0106 9.75768 15.0106 9.75768 14.9635 9.77635C14.5211 9.95712 14.1083 10.2072 13.6957 10.4461C13.5405 10.5357 13.3849 10.6245 13.2293 10.7133C13.1458 10.7609 13.0625 10.8086 12.9791 10.8565C12.7898 10.9651 12.6002 11.0728 12.4086 11.1772C11.6807 11.5758 11.1512 12.0859 10.9057 12.905C10.5539 14.3447 11.0077 16.0518 11.7152 17.3126C11.7797 17.4179 11.8456 17.5214 11.9148 17.6237C11.9583 17.6945 11.9583 17.6945 11.9583 17.7639C11.325 17.7672 10.6917 17.7696 10.0584 17.7711C9.76435 17.7719 9.47026 17.7728 9.17617 17.7744C8.91959 17.7758 8.66303 17.7767 8.40645 17.777C8.27081 17.7772 8.13519 17.7776 7.99955 17.7786C7.17639 17.7846 6.45225 17.7833 5.81974 17.1807C5.79441 17.1555 5.76907 17.1302 5.74297 17.1042C5.72337 17.0854 5.70376 17.0666 5.68357 17.0473C5.33159 16.6785 5.2114 16.1922 5.21285 15.6989C5.2127 15.6594 5.21254 15.6199 5.21238 15.5792C5.21194 15.4472 5.21199 15.3151 5.21205 15.1831C5.21188 15.0883 5.21161 14.9935 5.21135 14.8987C5.21077 14.668 5.21058 14.4374 5.21054 14.2068C5.21051 14.0192 5.21036 13.8317 5.21014 13.6441C5.20953 13.1118 5.20921 12.5795 5.20926 12.0471C5.20927 12.0185 5.20927 11.9898 5.20927 11.9603C5.20927 11.9316 5.20928 11.9029 5.20928 11.8733C5.20931 11.4082 5.20864 10.9432 5.20766 10.4782C5.20667 10.0001 5.20619 9.52201 5.20625 9.04394C5.20627 8.77577 5.20608 8.5076 5.20533 8.23943C5.2047 8.01108 5.20455 7.78273 5.20502 7.55438C5.20525 7.43801 5.20518 7.32166 5.20465 7.20529C5.20411 7.07878 5.20444 6.9523 5.20497 6.82579C5.20461 6.7895 5.20426 6.75321 5.20389 6.71582C5.20889 6.17745 5.44481 5.70432 5.81635 5.32525C6.19089 4.96643 6.64036 4.77259 7.15974 4.77273ZM9.06112 7.21273C8.95374 7.3515 8.92375 7.4859 8.93742 7.65978C8.99404 7.82336 9.08028 7.93379 9.2152 8.04173C9.42247 8.10681 9.61186 8.12185 9.82812 8.12161C9.87498 8.12184 9.87498 8.12184 9.92278 8.12206C9.98846 8.12226 10.0541 8.12228 10.1198 8.12213C10.2196 8.12202 10.3193 8.12284 10.419 8.12372C10.4832 8.1238 10.5474 8.12382 10.6115 8.12378C10.6557 8.12426 10.6557 8.12426 10.7007 8.12475C10.9569 8.12279 11.198 8.08497 11.3853 7.8985C11.4906 7.75974 11.5204 7.62406 11.5069 7.45145C11.4502 7.28773 11.3628 7.17891 11.2291 7.0695C11.0307 6.99642 10.8479 6.9894 10.6379 6.98962C10.6049 6.98947 10.572 6.98932 10.5381 6.98916C10.4688 6.98897 10.3995 6.98895 10.3302 6.9891C10.2248 6.98921 10.1193 6.98839 10.0139 6.98751C9.94626 6.98743 9.87865 6.98741 9.81103 6.98745C9.7642 6.98697 9.7642 6.98697 9.71642 6.98648C9.47759 6.98821 9.22588 7.0195 9.06112 7.21273Z" fill="white"></path><path d="M16.8107 11.0408C16.8867 11.0844 16.9626 11.128 17.0386 11.1715C17.0962 11.2049 17.0962 11.2049 17.155 11.2389C17.3401 11.3454 17.5269 11.449 17.7135 11.5529C17.8553 11.6324 17.9971 11.712 18.1388 11.7916C18.1729 11.8107 18.207 11.8298 18.2421 11.8495C19.462 12.534 19.462 12.534 19.6666 13.25C19.6734 13.3415 19.6772 13.4292 19.6771 13.5206C19.6774 13.5591 19.6774 13.5591 19.6777 13.5984C19.6781 13.6812 19.6779 13.764 19.6775 13.8468C19.6774 13.8891 19.6774 13.8891 19.6772 13.9324C19.6755 14.3493 19.6635 14.7532 19.5624 15.1597C19.5554 15.1887 19.5483 15.2177 19.541 15.2475C19.1935 16.6305 18.4283 17.8973 17.2013 18.6666C17.1804 18.6798 17.1595 18.693 17.1379 18.7065C16.7001 18.9771 16.0999 19.3338 15.5694 19.2222C14.9289 19.0491 14.3352 18.7154 13.8333 18.2847C13.8046 18.2601 13.8046 18.2601 13.7754 18.235C13.512 18.0062 13.2798 17.7654 13.0694 17.4861C13.0416 17.4502 13.0139 17.4143 12.9853 17.3773C12.2455 16.399 11.877 15.1732 11.8741 13.954C11.8736 13.8727 11.8719 13.7915 11.8702 13.7103C11.8651 13.2401 11.9666 12.8325 12.3055 12.4861C12.5089 12.3076 12.7284 12.1746 12.9674 12.0499C13.2467 11.901 13.5217 11.7465 13.7942 11.5855C15.7641 10.4255 15.7641 10.4255 16.8107 11.0408ZM16.2636 14.0829C16.2174 14.1301 16.1713 14.1773 16.1251 14.2244C16.053 14.2985 15.981 14.3727 15.9093 14.4471C15.8397 14.5192 15.7696 14.5908 15.6993 14.6623C15.6672 14.6961 15.6672 14.6961 15.6344 14.7306C15.6143 14.751 15.5941 14.7714 15.5733 14.7924C15.5557 14.8106 15.5382 14.8288 15.5201 14.8475C15.4652 14.8819 15.4652 14.8819 15.3937 14.8744C15.297 14.8353 15.2448 14.7716 15.1744 14.6953C15.0135 14.5302 14.903 14.4414 14.6688 14.4153C14.4649 14.4243 14.3359 14.5142 14.2 14.6606C14.1277 14.8167 14.112 14.9558 14.1458 15.125C14.2559 15.3751 14.4506 15.5494 14.6427 15.7391C14.6749 15.7716 14.707 15.8042 14.7401 15.8377C14.9996 16.1051 14.9996 16.1051 15.3341 16.2533C15.5851 16.2453 15.7382 16.1498 15.9122 15.9757C15.9439 15.9442 15.9756 15.9126 16.0083 15.8802C16.0423 15.8459 16.0763 15.8116 16.1103 15.7772C16.1456 15.7419 16.181 15.7066 16.2163 15.6713C16.2902 15.5974 16.3638 15.5234 16.4373 15.4493C16.5314 15.3544 16.6259 15.2599 16.7206 15.1655C16.7935 15.0926 16.8663 15.0197 16.939 14.9466C16.9737 14.9117 17.0086 14.8768 17.0435 14.842C17.0922 14.7933 17.1406 14.7444 17.189 14.6954C17.2304 14.6538 17.2304 14.6538 17.2726 14.6113C17.4082 14.4576 17.4252 14.3347 17.4205 14.1343C17.3986 13.9609 17.3045 13.8708 17.1796 13.7578C16.7808 13.5657 16.5299 13.8053 16.2636 14.0829Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Privacy Policy</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Affiliate -->
          <NuxtLink to="/affiliate" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#428ACD"></rect><path d="M18.0699 7.57376H18.995C19.5432 7.57376 20 7.98528 20 8.50508V13.1508C20 13.6598 19.5546 14.0822 19.0064 14.0822H17.1906L13.0107 8.46176L12.5196 7.82284L9.53888 9.10069C9.34474 9.18733 9.12775 9.20898 8.92218 9.16567C8.00855 8.9924 7.71162 8.70001 8.00855 8.27767C8.29406 7.86615 9.52746 7.04313 11.6973 5.80859C11.7544 5.7761 11.8115 5.74361 11.8686 5.72196C12.7823 5.32127 13.8215 5.46205 14.9978 6.15513C15.9686 6.72908 16.9964 7.19474 18.0699 7.56293V7.57376Z" fill="white"></path><path d="M4.68524 14.0277C4.27411 13.8978 4.00002 13.5512 4.00002 13.1506V8.5048C4.00002 7.99583 4.44541 7.57349 5.00501 7.57349H7.31194C6.7866 8.01749 6.74091 8.78637 7.22057 9.27368C7.26625 9.317 7.31194 9.36032 7.36904 9.40364C8.09994 9.95593 9.09352 10.1075 9.97289 9.80432L12.2227 9.04627L13.7987 11.1688C13.7987 11.1688 13.8901 11.2554 13.9244 11.3096L16.6881 15.024C16.9964 15.4464 16.8937 16.0203 16.4368 16.3127C16.4026 16.3344 16.3569 16.356 16.3112 16.3777L11.9029 18.4028C11.6974 18.5002 11.469 18.5219 11.2634 18.4786L11.4233 18.327C12.1885 17.6014 12.1885 16.4427 11.4233 15.7171L8.22557 12.7066C7.64313 12.1543 6.69523 12.1543 6.10137 12.6957C6.10137 12.6957 6.10137 12.6957 6.08995 12.7066L4.69666 14.0169L4.68524 14.0277Z" fill="white"></path><path d="M7.81439 13.6268L10.6467 16.2908C10.8979 16.5291 10.9893 16.8648 10.8979 17.1788L10.7494 17.677C10.6352 18.056 10.2241 18.2834 9.80154 18.1859C9.71018 18.1643 9.61882 18.121 9.53887 18.0668L5.89576 15.5761C5.45037 15.2729 5.359 14.6881 5.67877 14.2766C5.71304 14.2441 5.73588 14.2008 5.77014 14.1791L6.364 13.616C6.75229 13.2478 7.38042 13.2478 7.78013 13.616L7.81439 13.6268Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Affiliate</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Download APP -->
          <NuxtLink to="/download-app" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#F90"></rect><path d="M15.2246 4.5H8.77536C7.7971 4.5 7 5.28385 7 6.24584V17.7542C7 18.7162 7.7971 19.5 8.77536 19.5H15.2246C16.2029 19.5 17 18.7162 17 17.7542V6.24584C17 5.28385 16.2029 4.5 15.2246 4.5ZM11.4203 5.07007H12.5797C12.7246 5.07007 12.8696 5.21259 12.8696 5.35511C12.8696 5.49762 12.7246 5.64014 12.5797 5.64014H11.4203C11.2754 5.64014 11.1304 5.49762 11.1304 5.35511C11.1304 5.21259 11.2754 5.07007 11.4203 5.07007ZM12 18.7874C11.6014 18.7874 11.2391 18.4667 11.2391 18.0392C11.2391 17.6473 11.5652 17.291 12 17.291C12.3986 17.291 12.7609 17.6116 12.7609 18.0392C12.7609 18.4667 12.4348 18.7874 12 18.7874ZM15.8043 14.4002C15.8043 15.5048 14.9089 16.4002 13.8043 16.4002H10.1957C9.09108 16.4002 8.19565 15.5048 8.19565 14.4002V8.75C8.19565 7.64543 9.09108 6.75 10.1957 6.75H13.8043C14.9089 6.75 15.8043 7.64543 15.8043 8.75V14.4002Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">Download APP</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- About Us -->
          <NuxtLink to="/about-us" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#4C9EEA"></rect><path d="M11.99 5.5C11.58 5.5 11.24 5.623 10.95 5.92026C10.64 6.19702 10.5 6.55578 10.5 6.99654C10.5 7.4373 10.64 7.77556 10.95 8.07282C11.24 8.37008 11.58 8.51358 11.99 8.51358C12.39 8.51358 12.78 8.35983 13.07 8.09332C13.36 7.79606 13.5 7.4373 13.5 6.99654C13.5 6.55578 13.36 6.19702 13.07 5.92026C12.78 5.623 12.42 5.5 11.99 5.5Z" fill="white"></path><path d="M10.5 10.8822V17.0771C10.5 17.8611 11.17 18.5 12 18.5C12.83 18.5 13.5 17.8611 13.5 17.0771V10.8822C13.5 10.0981 12.83 9.45925 12 9.45925C11.17 9.46893 10.5 10.0981 10.5 10.8822Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">About Us</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>
        </div>
      </div>
    </div>

    </div>

    <!-- Desktop View: Classic Dashboard Layout (>= 1024px) -->
    <div class="me-desktop-view hidden lg:block w-full min-w-0   text-white">
    <!-- Top Account Card: Login / Sign Up & Action Buttons -->
    <div class="sticky-header-seal sticky top-[var(--content-sticky-top)] z-20 -mx-1 px-1  pb-1 mb-2">
      <div class="account-card rounded-lg bg-[#141414] px-2 py-3 shadow-sm">
      <div class="px-2">
        <div class="flex items-center gap-1">
          <a
            :href="bybetRedirectUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[#2b2b2b] rounded-lg border border-[#1fa779] px-4 py-1 text-[12px] font-semibold text-[#1fa779] hover:bg-[#252525] transition-colors"
          >
            Login
          </a>
          <a
            :href="bybetRedirectRegister"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg bg-[var(--main-color)] px-4 py-1 text-[12px] font-bold text-white hover:bg-[#122F25] transition-colors"
          >
            Sign Up
          </a>
        </div>

        <p class="mt-2 text-[12px] text-[#707070]">Hi, please log in/register first.</p>
      </div>
      

      <!-- 4 Quick Actions: Deposit, Withdraw, VIP, Bonus -->
      <div class="grid grid-cols-4 gap-1 mt-4">
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[#005a3c] py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          Deposit
        </a>
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[#005a3c]  py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          Withdraw
        </a>
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[#005a3c]  py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          VIP
        </a>
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[#005a3c]  py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          Bonus
        </a>
      </div>
    </div>
  </div>

    <!-- Accordion 1: General -->
    <div class="section-card rounded-lg bg-[#141414] px-2 py-3 mb-2 shadow-sm">
      <button
        type="button"
        class="flex w-full mb-2 mb-2 items-center justify-between text-left cursor-pointer select-none"
        @click="toggleSection('general')"
      >
        <span class="text-[16px] font-bold text-white">General</span>
        <ChevronUp v-if="openSections.general" class="h-4 w-4 text-[#7a807d]" />
        <ChevronDown v-else class="h-4 w-4 text-[#7a807d]" />
      </button>

      <div v-show="openSections.general" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
        <!-- Betting History -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between ">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded  text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#01AEF3"></rect><path d="M9.564 5C9.326 5 9.102 5.091 8.941 5.259L5.259 8.934C5.091 9.102 5 9.326 5 9.557V16.354C5 17.817 6.19 19 7.653 19H16.347C17.81 19 19 17.817 19 16.354V7.646C19 6.183 17.81 5 16.347 5H9.564ZM9.2 13.113H14.8C15.185 13.113 15.507 13.421 15.507 13.806C15.507 14.191 15.199 14.506 14.814 14.513H14.8H9.2C8.815 14.513 8.493 14.205 8.493 13.82C8.493 13.435 8.801 13.12 9.186 13.113H9.2ZM9.2 9.62H14.8C15.185 9.62 15.5 9.935 15.5 10.32C15.5 10.705 15.185 11.02 14.8 11.02H9.2C8.815 11.02 8.5 10.705 8.5 10.32C8.5 9.935 8.815 9.62 9.2 9.62Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Betting History</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Bonuses -->
        <NuxtLink to="/explore/bonuses" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded  text-[#ffc83d]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#FFBA00]"></rect><path d="M18.0058 19.5H6.00076C5.56593 19.5 5.16687 19.1208 5.16687 18.58V9.83301H18.8397V18.58C18.8397 19.1208 18.4406 19.5 18.0058 19.5Z" stroke="white"></path><path d="M14.9645 4C14.7711 4 14.5844 4.08 14.4443 4.22667L12.0033 6.78675L9.56229 4.22667C9.4289 4.08 9.23549 4 9.04207 4C6.99455 4 5.33386 5.74672 5.33386 7.88679C5.33386 8.31347 5.66733 8.66681 6.07417 8.66681H17.9324C18.3393 8.66681 18.6728 8.31347 18.6728 7.88679C18.6728 5.74672 17.0121 4 14.9645 4ZM6.9412 7.11343C7.21465 6.30007 7.90827 5.69339 8.74862 5.57338L10.2159 7.11343H6.9412ZM13.7907 7.11343L15.258 5.57338C16.0983 5.68672 16.792 6.30007 17.0654 7.11343H13.7907Z" fill="white"></path><g filter="url(#filter0_b_4992_814)"><path d="M19.6999 12.6664H4.30679C4.13339 12.6664 4 12.4998 4 12.2931V10.073C4 9.66635 4.28012 9.33301 4.61359 9.33301H19.3864C19.7266 9.33301 20 9.66635 20 10.073V12.2931C20 12.4998 19.8599 12.6664 19.6932 12.6664H19.6999Z" fill="white"></path></g><g filter="url(#filter1_b_4992_814)"><path d="M10.4026 9.33301H13.6039V20H10.4026V9.33301Z" fill="white"></path></g><defs><filter id="filter0_b_4992_814" x="0" y="5.33301" width="24" height="11.3335" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"></feGaussianBlur><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4992_814"></feComposite><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4992_814" result="shape"></feBlend></filter><filter id="filter1_b_4992_814" x="6.40259" y="5.33301" width="11.2013" height="18.667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"></feGaussianBlur><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4992_814"></feComposite><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4992_814" result="shape"></feBlend></filter></defs></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Bonuses</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Coupon Center -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center bg-[#F5A46E] rounded text-[#ff8042]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-layer-46"></rect><path d="M20 10.2V7.22C20 6.54 19.42 6 18.71 6H5.29C4.58 6 4 6.55 4 7.22V10.2C5.05 10.2 5.89 11.01 5.89 12C5.89 12.99 5.04 13.8 4 13.8V16.78C4 17.46 4.58 18 5.29 18H18.71C19.42 18 20 17.45 20 16.78V13.8C18.95 13.8 18.11 12.99 18.11 12C18.11 11.01 18.96 10.2 20 10.2ZM9.68 15C9.68 15.33 9.4 15.6 9.05 15.6C8.7 15.6 8.42 15.33 8.42 15V9C8.42 8.67 8.7 8.4 9.05 8.4C9.4 8.4 9.68 8.67 9.68 9V15Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white transition-colors">Coupon Center</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Referral Bonus -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded  text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#428ACD]"></rect><path d="M19.8866 11.4559C19.8866 11.6743 19.7729 11.6743 19.6592 11.7836L14.7841 16.3634C14.443 16.5819 13.8768 16.3634 13.6495 16.0357C13.5701 15.9038 13.5315 15.7513 13.5358 15.5988V13.0903C10.5845 11.4538 6.72605 12.3257 5.02307 15.0546C4.44826 15.9389 4.13512 16.9571 4.11367 18C4 17.5651 4 17.1281 4 16.5819C4.00214 12.2185 7.86279 8.7269 12.5149 8.7269H13.5358V6.76469C13.5251 6.35246 13.864 6.01031 14.2929 6C14.3058 6 14.3187 6 14.3315 6C14.5567 6 14.6704 6 14.7841 6.10924L19.552 10.3696C19.9531 10.5613 20.1139 11.0292 19.9144 11.4146C19.908 11.4291 19.8994 11.4414 19.8909 11.4559H19.8844H19.8866Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Referral Bonus</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Responsible Gaming -->
        <NuxtLink to="/explore/help/responsible-gaming" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded text-[#ff5252]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="scale-75"><rect width="32" height="32" rx="10.6667" fill="#D80027" class=""></rect><g clip-path="url(#clip0_1190_232664)"><path d="M16.4266 22.0561C15.7037 22.0561 14.9805 22.0561 14.2577 22.0561C14.0963 22.0561 13.974 22.1561 13.9717 22.2867C13.9693 22.4177 14.0926 22.5269 14.257 22.5272C15.7253 22.5286 17.1936 22.532 18.6619 22.5259C19.1372 22.5238 19.7129 22.086 19.88 21.6189C19.9302 21.4788 19.9787 21.3342 19.9975 21.1876C20.0123 21.0729 20.0679 21.0137 20.1525 20.9525C20.8615 20.4399 21.5679 19.9228 22.2756 19.4081C22.7462 19.0659 23.2084 18.7097 23.6931 18.3892C23.9632 18.211 24.2677 18.1718 24.61 18.2304C25.2126 18.3331 25.445 18.9631 25.279 19.5047C25.1765 19.8394 24.9509 20.0657 24.7245 20.2905C24.1677 20.8443 23.6085 21.3978 23.0194 21.9152C22.4824 22.3867 21.925 22.8402 21.3399 23.2477C20.6887 23.7012 20.0107 24.1264 19.273 24.4248C18.6296 24.685 17.964 24.8885 17.3092 25.1198C16.652 25.3518 15.9698 25.3627 15.2924 25.3021C14.7895 25.2572 14.2947 25.131 13.8268 24.915C13.3084 24.6755 12.7813 24.4557 12.2578 24.2275C11.9233 24.0815 11.5918 23.9274 11.2526 23.7941C11.0088 23.6981 10.7582 23.6128 10.5032 23.5546C10.0626 23.4536 9.61927 23.3529 9.17127 23.2995C8.87686 23.2644 8.57269 23.3188 8.2729 23.3178C8.22136 23.3178 8.14793 23.2508 8.12468 23.1971C8.09807 23.1345 8.11424 23.0525 8.11424 22.979C8.11424 21.8414 8.11424 20.7038 8.11424 19.5659C8.11424 19.2213 8.16376 19.174 8.49218 19.0628C9.01665 18.8852 9.55426 18.8111 10.101 18.8624C10.3832 18.889 10.6692 18.9539 10.9367 19.0499C11.5228 19.2601 12.0927 19.5176 12.6799 19.7238C13.1578 19.8915 13.6466 20.0279 14.1637 20.0303C15.6135 20.0374 17.0636 20.0667 18.5134 20.0643C19.0517 20.0636 19.4269 20.4092 19.5263 20.8858C19.6125 21.2985 19.3461 21.8333 18.8991 21.9816C18.7549 22.0295 18.5959 22.05 18.4433 22.0517C17.771 22.0588 17.0983 22.0547 16.4256 22.0547V22.0561H16.4266Z" fill="white"></path><path d="M20.1463 17.0899H18.1265C18.1265 16.9572 18.1265 16.83 18.1265 16.7028C18.1269 16.1537 18.1282 15.6047 18.1276 15.0553C18.1276 14.8801 18.0349 14.7743 17.8891 14.775C17.7284 14.7756 17.6634 14.8369 17.661 15.0151C17.6563 15.3716 17.659 15.7285 17.6587 16.085C17.6587 16.3623 17.6553 16.6399 17.6607 16.9171C17.663 17.0494 17.6078 17.0967 17.4808 17.0964C16.4325 17.0937 15.3843 17.092 14.336 17.0964C14.1952 17.0971 14.1683 17.0396 14.1693 16.9137C14.1733 16.2854 14.1723 15.6571 14.1689 15.0287C14.1679 14.8233 14.0473 14.7215 13.8725 14.7852C13.7371 14.8345 13.6984 14.9576 13.699 15.0985C13.701 15.6873 13.7 16.2759 13.7 16.8647C13.7 16.9321 13.7 16.9994 13.7 17.0811H11.6857C11.6813 17.0375 11.6729 16.9943 11.6729 16.9508C11.6729 15.9149 11.6685 14.8787 11.6779 13.8429C11.6823 13.3608 11.8679 12.9329 12.1226 12.5328C12.4443 12.0273 12.8994 11.6847 13.4467 11.4769C13.6805 11.3881 13.9392 11.3285 14.1878 11.3248C15.3142 11.3085 16.4413 11.3051 17.5677 11.3204C18.3324 11.3309 18.9676 11.6653 19.4736 12.2334C19.7919 12.5906 20.0291 13.0016 20.0914 13.4914C20.1197 13.7129 20.152 13.9357 20.1537 14.1582C20.1611 15.0753 20.1577 15.9925 20.1574 16.9093C20.1574 16.9644 20.151 17.0198 20.1466 17.0899H20.1463Z" fill="white"></path><path d="M14.1526 8.46123C14.0762 7.48933 15.0557 6.64329 15.9622 6.68377C16.8929 6.72561 17.7775 7.51824 17.6767 8.6844C17.6033 9.53588 16.8249 10.3455 15.8204 10.2887C14.9227 10.238 14.1021 9.49914 14.1526 8.46089V8.46123Z" fill="white"></path><path d="M6.49414 24.598C6.49414 24.4809 6.49414 24.4023 6.49414 24.3238C6.49414 22.2636 6.49448 20.2034 6.49481 18.1436C6.49481 17.9188 6.49481 17.9171 6.71444 17.9154C6.97213 17.9137 7.23015 17.9218 7.4875 17.9126C7.61955 17.9079 7.64986 17.9623 7.64852 18.0821C7.64313 18.5573 7.64346 19.0329 7.64346 19.5081C7.64346 21.1379 7.64279 22.7681 7.64582 24.3979C7.64582 24.5405 7.64683 24.6235 7.4518 24.6054C7.14358 24.5772 6.83099 24.598 6.49414 24.598Z" fill="white"></path></g><defs><clipPath id="clip0_1190_232664"><rect width="18.6667" height="18.6667" fill="white" transform="translate(6.66602 6.66675)"></rect></clipPath></defs></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Responsible Gaming</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>
      </div>
    </div>

    <!-- Accordion 2: Live Plaza -->
    <div class="section-card rounded-lg bg-[#141414]  px-2 py-3 mb-2 shadow-sm">
      <button
        type="button"
        class="flex w-full items-center justify-between text-left cursor-pointer select-none"
        @click="toggleSection('livePlaza')"
      >
        <span class="text-[16px] font-bold text-white">Live Plaza</span>
        <ChevronUp v-if="openSections.livePlaza" class="h-4 w-4 text-[#7a807d]" />
        <ChevronDown v-else class="h-4 w-4 text-[#7a807d]" />
      </button>

      <div v-show="openSections.livePlaza" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-4">
        <!-- Streamer Broadcast -->
        <NuxtLink to="/explore/live-plaza/streamer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#3a1a54] text-[#b388ff]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#9747FF]"></rect><path d="M16.5245 8.99329C16.0889 8.99329 15.7334 9.35352 15.7334 9.7938V11.4949C15.7334 13.5662 14.0534 15.2473 11.9911 15.2473C9.92891 15.2473 8.24891 13.5662 8.24891 11.4949V9.7938C8.24891 9.35352 7.89336 8.99329 7.4578 8.99329C7.02225 8.99329 6.66669 9.35352 6.66669 9.7938V11.4949C6.66669 14.1766 8.64002 16.398 11.2 16.7782V18.3993H9.6178C9.18225 18.3993 8.82669 18.7595 8.82669 19.1998C8.82669 19.6401 9.18225 20.0003 9.6178 20.0003H14.3822C14.8178 20.0003 15.1734 19.6401 15.1734 19.1998C15.1734 18.7595 14.8178 18.3993 14.3822 18.3993H12.8V16.7782C15.36 16.398 17.3334 14.1666 17.3334 11.4949V9.7938C17.3334 9.35352 16.9778 8.99329 16.5422 8.99329H16.5245Z" fill="white"></path><path d="M11.9911 13.9961C10.5245 13.9961 9.32446 12.6352 9.32446 10.9842V7.01167C9.32446 5.35061 10.5245 3.99976 11.9911 3.99976C13.4578 3.99976 14.6578 5.36062 14.6578 7.01167V10.9842C14.6578 12.6453 13.4578 13.9961 11.9911 13.9961Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Streamer Broadcast</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Match Predictions -->
        <NuxtLink to="/explore/live-plaza/expert-predictions" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d45] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#1EB1A5" class=""></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M4.81528 14.6522C4.34665 15.1208 4.34665 15.8806 4.81528 16.3492C5.28391 16.8178 6.04371 16.8178 6.51233 16.3492L9.05892 13.8026L10.8432 15.5827C11.0686 15.8076 11.3742 15.9337 11.6926 15.9332C12.011 15.9327 12.3162 15.8057 12.5409 15.5801L16.7999 11.3048V13.2C16.7999 13.8627 17.3372 14.4 17.9999 14.4C18.6627 14.4 19.1999 13.8627 19.1999 13.2V8.39995C19.1999 8.23554 19.1669 8.07886 19.107 7.93618C19.0482 7.79563 18.9615 7.66401 18.8468 7.54981C18.6171 7.32094 18.3179 7.20441 18.0173 7.20008L17.9982 7.19995H13.1999C12.5372 7.19995 11.9999 7.73721 11.9999 8.39995C11.9999 9.06269 12.5372 9.59995 13.1999 9.59995H15.1107L11.6881 13.0355L9.90545 11.257C9.43666 10.7894 8.67763 10.7898 8.20939 11.258L4.81528 14.6522Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Match Predictions</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Results -->
        <button type="button" class="menu-item flex items-center justify-between group text-left w-full cursor-pointer" @click="showDemoMessage('Match Results')">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4d2a12] text-[#ff9800]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#FF6161]"></rect><path d="M18.3588 12.6387H13.2726C12.9197 12.6387 12.6336 12.9247 12.6336 13.2775V18.3612C12.6336 18.714 12.9197 19 13.2726 19H18.3588C18.7117 19 18.9978 18.714 18.9978 18.3612V13.2775C18.9978 12.9247 18.7117 12.6387 18.3588 12.6387Z" fill="white"></path><path d="M15.0147 9.99625C15.5224 9.99625 15.9776 9.83 16.3628 9.5675L17.9736 11.2562C18.2099 11.51 18.5864 11.51 18.8227 11.2738C19.0591 11.02 19.0591 10.635 18.8227 10.39L17.1419 8.64C17.317 8.29 17.4046 7.905 17.4046 7.5025C17.4046 6.12875 16.3278 5.00875 15.0059 5.00875C13.6841 5.00875 12.6073 6.12875 12.6073 7.5025C12.6073 8.87625 13.6841 9.99625 15.0059 9.99625H15.0147ZM15.0147 6.25125C15.68 6.25125 16.214 6.8025 16.214 7.5025C16.214 8.2025 15.68 8.75375 15.0147 8.75375C14.3494 8.75375 13.8154 8.2025 13.8154 7.5025C13.8154 6.8025 14.3494 6.25125 15.0147 6.25125Z" fill="white"></path><path d="M10.7252 12.6387H5.63905C5.28611 12.6387 5 12.9247 5 13.2775V18.3612C5 18.714 5.28611 19 5.63905 19H10.7252C11.0781 19 11.3642 18.714 11.3642 18.3612V13.2775C11.3642 12.9247 11.0781 12.6387 10.7252 12.6387Z" fill="white"></path><path d="M10.7252 5H5.63905C5.28611 5 5 5.28598 5 5.63875V10.7225C5 11.0753 5.28611 11.3612 5.63905 11.3612H10.7252C11.0781 11.3612 11.3642 11.0753 11.3642 10.7225V5.63875C11.3642 5.28598 11.0781 5 10.7252 5Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Results</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </button>
      </div>
    </div>

    <!-- Accordion 3: Game Settings -->
    <div class="section-card rounded-lg bg-[#141414]  px-2 py-3 mb-2 shadow-sm">
      <button
        type="button"
        class="flex w-full mb-2 items-center justify-between text-left cursor-pointer select-none"
        @click="toggleSection('gameSettings')"
      >
        <span class="text-[16px] font-bold text-white">Game Settings</span>
        <ChevronUp v-if="openSections.gameSettings" class="h-4 w-4 text-[#7a807d]" />
        <ChevronDown v-else class="h-4 w-4 text-[#7a807d]" />
      </button>

      <div v-show="openSections.gameSettings" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-4">
        <!-- Odds Settings -->
        <div class="menu-item flex items-center justify-between relative">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#242625] text-white/90">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" class="fill-black"></rect><path d="M11.6102 19C8.07127 19 5 16.9429 5 12.7252C5 8.07822 8.58575 5 12.8575 5C16.6147 5 19 7.42706 19 10.9049C19 13.9387 16.8797 15.4778 15.1025 15.4778C14.0891 15.4778 13.2784 15.0338 13.1069 14.2051H13.0757C12.5612 14.871 11.6882 15.3446 10.9399 15.3446C9.59911 15.3446 8.64811 14.3827 8.64811 12.8436C8.64811 10.8605 10.1448 8.77378 12.1871 8.77378C12.7795 8.77378 13.2472 9.02537 13.5434 9.60254H13.5902L13.8241 8.89218H15.2584L14.4788 12.518C14.1982 13.5983 14.4944 14.1163 15.3363 14.1163C16.4276 14.1163 17.5345 12.9027 17.5345 10.9641C17.5345 8.4482 16.069 6.34672 12.6704 6.34672C9.58352 6.34672 6.57461 8.84778 6.57461 12.6808C6.57461 15.981 8.95991 17.6533 11.7973 17.6533C12.7483 17.6533 13.7929 17.3573 14.5256 16.9725L15.0557 18.186C13.9955 18.7336 12.8575 19 11.6102 19ZM11.4232 13.9387C11.8285 13.9387 12.2183 13.7315 12.7171 13.1099L13.1693 10.7273C12.9354 10.3573 12.6548 10.1945 12.2494 10.1945C11.0958 10.1945 10.3942 11.63 10.3942 12.7104C10.3942 13.5539 10.7996 13.9387 11.4232 13.9387Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white">Odds Settings</span>
          </div>
          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-1 rounded bg-black px-2 py-0.5 text-[14px] text-white hover:bg-[#282a29] transition-colors cursor-pointer"
              @click="isOddsDropdownOpen = !isOddsDropdownOpen"
            >
              <span>{{ selectedOdds }}</span>
              <ChevronDown class="h-3 w-3 text-[#7a807d]" />
            </button>
            <div
              v-if="isOddsDropdownOpen"
              class="absolute right-0 top-full mt-1 z-30 rounded-lg bg-[#1f1f1f]/90  border border-white/10 shadow-lg py-1 min-w-[100px]"
            >
              <button
                v-for="opt in oddsOptions"
                :key="opt"
                type="button"
                class="w-full text-left px-3 py-1 text-[14px] hover:bg-white/10 transition-colors"
                :class="selectedOdds === opt ? 'text-[#00c74d] font-bold' : 'text-white'"
                @click="selectedOdds = opt; isOddsDropdownOpen = false"
              >
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <!-- Event Settings -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#242625] text-white/90">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#666]"></rect><path d="M7.00997 13.425V4.005H5.86997V13.425C4.87997 13.675 4.15997 14.535 4.15997 15.565C4.15997 16.595 4.88997 17.465 5.86997 17.705V19.995H7.00997V17.705C7.99997 17.455 8.71997 16.595 8.71997 15.565C8.71997 14.535 7.98997 13.665 7.00997 13.425ZM6.43997 16.675C5.80997 16.675 5.29997 16.175 5.29997 15.565C5.29997 14.955 5.80997 14.455 6.43997 14.455C7.06997 14.455 7.57997 14.955 7.57997 15.565C7.57997 16.175 7.06997 16.675 6.43997 16.675Z" fill="white"></path><path d="M12.57 5.74V4H11.43V5.74C10.44 5.99 9.71997 6.85 9.71997 7.88C9.71997 8.91 10.45 9.78 11.43 10.02V20H12.57V10.02C13.56 9.77 14.28 8.91 14.28 7.88C14.28 6.85 13.55 5.98 12.57 5.74ZM12 8.99C11.37 8.99 10.86 8.49 10.86 7.88C10.86 7.27 11.37 6.77 12 6.77C12.63 6.77 13.14 7.27 13.14 7.88C13.14 8.49 12.63 8.99 12 8.99Z" fill="white"></path><path d="M19.84 13.355C19.84 12.325 19.11 11.455 18.13 11.215V4.005H16.99V11.205C16 11.455 15.28 12.315 15.28 13.345C15.28 14.375 16.01 15.245 16.99 15.485V19.995H18.13V15.485C19.12 15.235 19.84 14.375 19.84 13.345V13.355ZM17.55 14.465C16.92 14.465 16.41 13.965 16.41 13.355C16.41 12.745 16.92 12.245 17.55 12.245C18.18 12.245 18.69 12.745 18.69 13.355C18.69 13.965 18.18 14.465 17.55 14.465Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Event Settings</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Theme -->
        <div class="menu-item flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#3a1a54] text-[#b388ff]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#9747FF]"></rect><path d="M13 6C13 5.44772 12.5523 5 12 5H5C4.44772 5 4 5.44772 4 6V13C4 13.5523 4.44772 14 5 14H12C12.5523 14 13 13.5523 13 13V6Z" fill="white"></path><path d="M20 16C20 15.4477 19.5523 15 19 15H5C4.44772 15 4 15.4477 4 16V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V16Z" fill="white"></path><path d="M20 6C20 5.44772 19.5523 5 19 5H15C14.4477 5 14 5.44772 14 6V8C14 8.55228 14.4477 9 15 9H19C19.5523 9 20 8.55228 20 8V6Z" fill="white"></path><path d="M20 11C20 10.4477 19.5523 10 19 10H15C14.4477 10 14 10.4477 14 11V13C14 13.5523 14.4477 14 15 14H19C19.5523 14 20 13.5523 20 13V11Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white">Theme</span>
          </div>
          <!-- Toggle Pill -->
          <div class="flex items-center rounded-full bg-black p-0.5 text-[14px]">
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="selectedTheme === 'International' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white '"
              @click="selectedTheme = 'International'"
            >
              International
            </button>
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="selectedTheme === 'Asia' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white '"
              @click="selectedTheme = 'Asia'"
            >
              Asia
            </button>
          </div>
        </div>

        <!-- Market Display -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d35] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><rect width="24" height="24" rx="8" fill="#36C65D"></rect><rect x="4.29932" y="4.45911" width="9.21484" height="7.04085" rx="1.5" fill="white"></rect><rect width="9.21484" height="7.04085" rx="1.5" transform="matrix(-1 0 0 1 19.7007 12.5)" fill="white"></rect><rect x="14.4976" y="4.45911" width="5.20296" height="7.04085" rx="1.5" fill="white"></rect><rect width="5.20296" height="7.04085" rx="1.5" transform="matrix(-1 0 0 1 9.50244 12.5)" fill="white"></rect></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Market Display</span>
          </div>
          <div class="flex items-center gap-1 text-[14px] text-white  transition-colors">
            <span>Default (Features Bets)</span>
            <ChevronRight class="h-3.5 w-3.5 text-[#555a57]" />
          </div>
        </a>
      </div>
    </div>

    <!-- Accordion 4: System Settings -->
    <div class="section-card rounded-lg bg-[#141414]  px-2 py-3 mb-2 shadow-sm">
      <button
        type="button"
        class="flex w-full mb-2 items-center justify-between text-left cursor-pointer select-none"
        @click="toggleSection('systemSettings')"
      >
        <span class="text-[16px] font-bold text-white">System Settings</span>
        <ChevronUp v-if="openSections.systemSettings" class="h-4 w-4 text-[#7a807d]" />
        <ChevronDown v-else class="h-4 w-4 text-[#7a807d]" />
      </button>

      <div v-show="openSections.systemSettings" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-4">
        <!-- Language -->
        <NuxtLink to="/explore/account/language" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d35] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#36C65D" class=""></rect><path d="M12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4ZM6.043 10.398C5.969 10.472 5.969 10.472 6.043 10.544C5.846 10.863 5.423 10.902 5.12 10.71C4.94726 11.6323 4.96167 12.5799 5.16237 13.4966C5.36306 14.4132 5.74596 15.2802 6.2883 16.0459C6.83064 16.8117 7.52136 17.4606 8.31943 17.9542C9.1175 18.4477 10.0066 18.7758 10.934 18.919L10.928 18.914L10.808 18.854C11.033 18.782 11.331 18.782 11.553 18.782C11.479 18.344 11.479 17.981 11.479 17.542C11.479 17.542 9.767 16.304 9.767 15.574C9.767 14.844 9.99 14.481 9.767 14.481C9.394 14.481 8.947 14.773 8.873 14.481C8.724 14.043 8.426 13.679 7.979 13.534C6.954 13.534 6.807 12.43 6.789 11.292L6.788 10.982C6.788 10.616 6.341 10.616 6.043 10.398ZM12.423 5.013L12.509 5.036C13.643 5.382 13.676 6.526 12.745 6.386C12.745 6.749 12.745 7.186 12.671 7.624C12.596 8.354 11.702 8.136 11.479 8.5C11.257 8.865 11.926 9.229 12.671 9.083C12.894 9.083 12.671 8.863 12.821 8.791C13.118 8.719 13.49 8.719 13.788 8.791C13.4846 9.44669 13.1361 10.0805 12.745 10.688C12.595 10.906 12.745 11.344 12.745 11.635C12.745 13.824 11.702 11.125 11.553 11.198C11.404 11.344 10.735 11.052 10.437 11.052C10.139 11.052 10.287 11.635 9.99 11.635C9.394 11.635 9.543 11.489 9.543 11.707C9.543 11.999 9.616 12.583 9.616 13.458C9.616 13.75 10.212 13.386 10.584 13.386C11.031 13.386 11.329 13.75 11.627 13.896C12.147 14.116 12.669 14.845 13.041 14.916C13.413 14.991 13.115 15.573 13.561 15.5C13.784 15.428 14.082 15.574 14.231 15.792C14.455 16.084 14.306 16.45 14.008 16.668C13.562 17.105 13.413 17.615 13.19 18.636C13.312 18.596 13.456 18.698 13.575 18.821C14.6958 18.5616 15.7355 18.0304 16.6024 17.2742C17.4693 16.5181 18.1368 15.5601 18.546 14.485C17.98 15.086 17.326 15.132 17.52 14.623C17.296 14.186 16.998 13.82 16.626 13.456C15.955 12.873 15.359 11.778 17.445 10.246C17.122 9.424 17.922 8.656 18.43 9.232C17.9177 8.04155 17.0849 7.01671 16.0245 6.27162C14.9641 5.52654 13.7176 5.09047 12.424 5.012L12.423 5.013Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Language</span>
          </div>
          <div class="flex items-center gap-1 text-[14px] text-white  transition-colors">
            <span>{{ selectedLanguageLabel }}</span>
            <ChevronRight class="h-3.5 w-3.5 text-[#555a57]" />
          </div>
        </NuxtLink>

        <!-- Time Zone -->
        <NuxtLink to="/explore/account/timezone" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#183a54] text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#4C9EEA" class=""></rect><path d="M15.8494 11.755C13.5794 11.755 11.7294 13.595 11.7294 15.865C11.7294 16.985 12.1794 17.995 12.8994 18.735C12.5294 18.825 12.0994 18.845 11.9094 18.845H11.8194C11.9094 18.595 11.9394 18.305 11.8694 18.015C11.7394 17.485 11.3094 17.045 10.5094 16.615L10.1794 16.435C9.63939 16.155 9.34939 16.005 9.17939 15.765C9.00939 15.535 8.88939 15.165 8.72939 14.365C8.61939 13.815 8.31939 13.395 7.85939 13.155C7.54939 12.995 7.16939 12.905 6.72939 12.905C6.41939 12.905 6.06939 12.945 5.70939 13.025C5.52939 13.065 5.35939 13.115 5.19939 13.155C5.12939 12.775 5.09939 12.365 5.09939 11.965C5.09939 9.535 6.36939 7.395 8.27939 6.165C8.28939 6.385 8.33939 6.615 8.43939 6.845C8.69939 7.40499 9.23939 7.755 10.0294 7.905C10.0694 7.915 10.0994 7.915 10.1294 7.915H10.1694C10.2394 7.915 10.4994 8.025 10.7794 8.125C11.1494 8.275 11.4194 8.325 11.4894 8.725C11.6594 9.975 11.7594 10.595 11.5194 11.325C11.4994 11.385 11.4894 11.445 11.4894 11.505C11.4894 11.805 11.7394 12.065 12.0494 12.065C12.1994 12.065 12.3394 12.005 12.4494 11.905C12.5594 11.805 14.9194 11.135 15.5294 10.365C15.5994 10.275 15.6694 10.195 15.7494 10.105C16.0394 9.765 16.3494 9.415 16.4594 8.90499C16.5894 8.345 16.4094 7.835 16.0194 7.075C15.7394 6.525 15.6894 6.285 15.6794 6.195C15.6894 6.185 15.7094 6.175 15.7294 6.165C17.4694 7.275 18.6794 9.14499 18.8794 11.345C18.9094 11.635 19.1394 11.855 19.4394 11.855H19.4894C19.7894 11.845 20.0194 11.585 19.9994 11.265C19.8194 9.285 18.9194 7.445 17.4394 6.105C15.9494 4.755 14.0294 3.995 12.0094 3.995C10.9294 3.995 9.87939 4.205 8.88939 4.625C8.87939 4.625 8.87939 4.635 8.86939 4.635C8.85939 4.635 8.85939 4.645 8.84939 4.645C7.90939 5.045 7.06939 5.615 6.33939 6.345C5.59939 7.085 5.01939 7.935 4.61939 8.895C4.20939 9.875 3.99939 10.925 3.99939 12.005C3.99939 12.705 4.08939 13.375 4.25939 14.035C4.25939 14.055 4.26939 14.075 4.27939 14.095C4.62939 15.385 5.29939 16.575 6.25939 17.565C7.50939 18.835 9.10939 19.645 10.8394 19.895C10.8594 19.895 10.8694 19.905 10.8894 19.905C11.1694 19.945 11.4694 19.975 11.7594 19.975H11.9394C12.2794 19.975 12.9394 19.945 13.4894 19.755C13.6294 19.705 13.7394 19.605 13.7994 19.475C13.7994 19.465 13.7994 19.445 13.8094 19.435C14.4194 19.785 15.1094 20.005 15.8694 20.005C18.1494 20.005 19.9894 18.165 19.9894 15.895C19.9894 13.625 18.1394 11.785 15.8694 11.785L15.8494 11.755ZM9.47939 5.555C10.2594 5.255 11.0994 5.085 11.9794 5.085C12.9294 5.085 13.8394 5.275 14.6694 5.625C14.6094 5.735 14.5594 5.865 14.5394 6.025C14.4994 6.415 14.6394 6.905 15.0094 7.605C15.5594 8.65499 15.3594 8.83499 14.8794 9.40499C14.7994 9.495 14.7194 9.585 14.6394 9.685C14.3394 10.065 13.4894 10.065 12.7994 10.795C12.7994 10.445 12.7794 10.035 12.7494 9.605C12.6794 8.615 12.5994 8.615 12.5994 8.585V8.555C12.4494 7.755 11.9194 7.285 11.1594 7.005C10.7294 6.845 10.3394 6.825 10.1894 6.825C9.79939 6.745 9.54939 6.595 9.44939 6.395C9.32939 6.155 9.40939 5.795 9.48939 5.575L9.47939 5.555ZM10.6494 18.725C8.20939 18.265 6.25939 16.535 5.46939 14.245C5.82939 14.145 6.30939 14.035 6.72939 14.035C6.97939 14.035 7.18939 14.075 7.33939 14.155C7.49939 14.245 7.58939 14.375 7.62939 14.595C7.79939 15.455 7.94939 16.025 8.28939 16.465C8.60939 16.885 9.02939 17.105 9.65939 17.435H9.67939C9.76939 17.495 9.87939 17.545 9.97939 17.605C10.6194 17.945 10.7594 18.185 10.7894 18.295C10.8194 18.405 10.7494 18.565 10.6594 18.725H10.6494ZM15.8494 18.855C14.1994 18.855 12.8394 17.515 12.8394 15.855C12.8394 14.195 14.1894 12.855 15.8494 12.855C17.5094 12.855 18.8594 14.195 18.8594 15.855C18.8594 17.515 17.4994 18.855 15.8494 18.855Z" fill="white"></path><path d="M16.2494 16.015V14.115C16.2494 13.815 15.9994 13.555 15.6894 13.555C15.3794 13.555 15.1294 13.805 15.1294 14.115V16.245C15.1294 16.395 15.1894 16.525 15.2894 16.635L16.2894 17.645C16.3894 17.745 16.5294 17.805 16.6794 17.805C16.8294 17.805 16.9594 17.745 17.0794 17.645C17.1794 17.545 17.2394 17.405 17.2394 17.255C17.2394 17.105 17.1794 16.965 17.0794 16.865L16.2394 16.015H16.2494Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Time Zone</span>
          </div>
          <div class="flex items-center gap-1 text-[14px] text-white  transition-colors">
            <span>{{ selectedTimeZone.offset }}</span>
            <ChevronRight class="h-3.5 w-3.5 text-[#555a57]" />
          </div>
        </NuxtLink>

        <!-- Mode -->
        <div class="menu-item flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 shrink-0 place-items-center">
              <svg
                class="block h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect width="24" height="24" rx="8" fill="#ffff" />
                <path
                  d="M11.9816 4C12.1916 4 12.3816 4.12004 12.4816 4.30011C12.5816 4.48018 12.5816 4.71026 12.4816 4.89033C11.1416 7.28121 11.9816 10.3023 14.3716 11.6428C15.1216 12.063 15.9616 12.2831 16.8116 12.2831C17.6216 12.2831 18.4116 12.083 19.1216 11.7028C19.3116 11.6028 19.5316 11.6128 19.7116 11.7229C19.8916 11.8329 19.9916 12.033 19.9916 12.243C19.8616 16.6647 16.1716 20.136 11.7516 19.9959C7.34158 19.8659 3.87158 16.1745 4.00158 11.7629C4.13158 7.44127 7.66158 4.01 11.9816 4ZM18.5016 8.18154C18.6716 8.18154 18.8116 8.3216 18.8216 8.49166C18.8216 8.96183 19.2216 9.34197 19.6916 9.34197C19.8616 9.34197 20.0016 9.48202 20.0016 9.65209C20.0016 9.82215 19.8616 9.9622 19.6916 9.9622C19.2216 9.9622 18.8316 10.3423 18.8216 10.8125C18.8216 10.9826 18.6616 11.1226 18.4916 11.1126C18.3316 11.1126 18.2016 10.9726 18.1916 10.8125C18.1916 10.3423 17.7916 9.9622 17.3216 9.9622C17.1516 9.9622 17.0116 9.82215 17.0116 9.65209C17.0116 9.48202 17.1516 9.34197 17.3216 9.34197H17.3716C17.8216 9.32197 18.1816 8.95183 18.1916 8.49166C18.1916 8.3216 18.3316 8.18154 18.5116 8.18154H18.5016ZM15.5116 4C15.6816 4 15.8216 4.14005 15.8216 4.31011C15.8216 5.41052 16.7216 6.31085 17.8216 6.31085C17.9916 6.31085 18.1316 6.45091 18.1316 6.62097C18.1316 6.79103 17.9916 6.93108 17.8216 6.93108C16.7216 6.93108 15.8216 7.83141 15.8216 8.93182C15.8216 9.10188 15.6816 9.24194 15.5116 9.24194C15.3416 9.24194 15.2016 9.10188 15.2016 8.93182C15.2016 7.83141 14.3016 6.93108 13.2016 6.93108C13.0616 6.93108 12.9316 6.84105 12.9016 6.711C12.8616 6.54094 12.9616 6.38088 13.1316 6.34086C13.1516 6.34086 13.1816 6.34086 13.2016 6.34086C14.3016 6.34086 15.2016 5.44053 15.2016 4.34013C15.2016 4.17006 15.3316 4.03001 15.5016 4.02001C15.5016 4.02001 15.5116 4.02001 15.5216 4.02001L15.5116 4Z"
                  fill="#333333"
                />
              </svg>
            </div>
            <span class="text-[14px] text-white">Mode</span>
          </div>
          <!-- Segmented Toggle -->
          <div class="flex items-center rounded-full bg-black p-0.5 text-[14px]">
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="themePreference === 'light' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white '"
              :aria-pressed="themePreference === 'light'"
              @click="setThemePreference('light')"
            >
              Light
            </button>
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="themePreference === 'dark' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white '"
              :aria-pressed="themePreference === 'dark'"
              @click="setThemePreference('dark')"
            >
              Dark
            </button>
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="themePreference === 'auto' ? 'bg-[#015A3C] text-white font-bold shadow' : 'text-white '"
              :aria-pressed="themePreference === 'auto'"
              @click="setThemePreference('auto')"
            >
              Auto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Accordion 5: Help -->
    <div class="section-card rounded-lg bg-[#141414]  px-2 py-3 mb-2 shadow-xl">
      <button
        type="button"
        class="flex w-full mb-2 items-center justify-between text-left cursor-pointer select-none"
        @click="toggleSection('help')"
      >
        <span class="text-[16px] font-bold text-white">Help</span>
        <ChevronUp v-if="openSections.help" class="h-4 w-4 text-[#7a807d]" />
        <ChevronDown v-else class="h-4 w-4 text-[#7a807d]" />
      </button>

      <div v-show="openSections.help" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-4">
        <!-- 24/7 Services -->
        <NuxtLink to="/explore/egames/customer-service" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#183a54] text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#0976FF" class="fill-blue-15"></rect><path d="M12.005 3C7.59225 3 4 6.74792 4 11.3654C4 14.0639 5.23077 16.5625 7.31207 18.1416L6.0813 20.2404C5.97123 20.4203 5.99124 20.6602 6.13133 20.8201C6.22139 20.93 6.36148 21 6.49156 21C6.55159 21 6.61163 20.99 6.67167 20.96L9.98374 19.4609C10.6442 19.6408 11.3246 19.7307 11.995 19.7307C16.4078 19.7307 20 15.9828 20 11.3654C20 6.74792 16.4178 3 12.005 3ZM15.4171 13.884C15.3871 13.9639 14.5766 15.8029 12.2652 15.8029C9.7636 15.8029 9.1232 13.9239 9.09318 13.844C8.99312 13.5341 9.16323 13.2043 9.48343 13.1044C9.80363 13.0044 10.1438 13.1743 10.2439 13.4842C10.2839 13.6041 10.7042 14.6335 12.2652 14.6335C13.8261 14.6335 14.2964 13.4542 14.2964 13.4442C14.4265 13.1444 14.7767 13.0044 15.0869 13.1244C15.3971 13.2443 15.5472 13.5941 15.4171 13.8939V13.884Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">24/7 Services</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Transaction Tutorial -->
        <NuxtLink to="/tutorial/transactions/deposit" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d35] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#80B100]"></rect><path d="M16.55 4H7.45C5.82 4 5 4.81051 5 6.44153V17.5585C5 19.1895 5.82 20 7.45 20H16.55C18.18 20 19 19.1895 19 17.5585V6.44153C19 4.81051 18.18 4 16.55 4ZM8.42 18.0888C8.42 18.389 8.27 18.5391 7.97 18.5391C7.67 18.5391 7.52 18.389 7.52 18.0888V5.43089C7.52 5.13071 7.67 4.98061 7.97 4.98061C8.27 4.98061 8.42 5.13071 8.42 5.43089V18.0888ZM15.99 9.4334C15.99 9.7636 15.59 9.93371 15.35 9.70356L14.26 8.67292L13.17 9.70356C12.93 9.93371 12.53 9.7636 12.53 9.4334V4.99062H15.98V9.4334H15.99Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Transaction Tutorial</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Tutorial -->
        <NuxtLink to="/tutorial/mock-betting" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d35] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#80B100]"></rect><path d="M17.275 20H6.70499C5.91499 20 5.27499 19.36 5.27499 18.57V5.43C5.27499 4.64 5.91499 4 6.70499 4H8.13499V9C8.13499 9.16 8.19499 9.3 8.30499 9.4L9.85499 7.85L11.405 9.4C11.515 9.29 11.575 9.15 11.575 9V4H17.295C18.085 4 18.725 4.64 18.725 5.43V18.57C18.725 19.36 18.085 20 17.295 20H17.275ZM15.565 12.43H8.70499C8.31499 12.43 7.99499 12.75 7.99499 13.14C7.99499 13.53 8.31499 13.85 8.70499 13.85H15.565C15.955 13.85 16.275 13.53 16.275 13.14C16.275 12.75 15.955 12.43 15.565 12.43ZM15.565 15.86H8.70499C8.31499 15.86 7.99499 16.18 7.99499 16.57C7.99499 16.96 8.31499 17.28 8.70499 17.28H15.565C15.955 17.28 16.275 16.96 16.275 16.57C16.275 16.18 15.955 15.86 15.565 15.86Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Tutorial</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Game Rules -->
        <NuxtLink to="/game-rules/sports-betting-rules" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4d3c12] text-[#ffc83d]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#FFBA00]"></rect><path d="M11.57 4H17.29C18.08 4 18.72 4.64 18.72 5.43V18.57C18.72 19.36 18.08 20 17.29 20H6.71C5.92 20 5.28 19.36 5.28 18.57V5.43C5.28 4.64 5.92 4 6.71 4H8.14M15.57 12.43H8.71C8.32 12.43 8 12.75 8 13.14C8 13.53 8.32 13.85 8.71 13.85H15.57C15.96 13.85 16.28 13.53 16.28 13.14C16.28 12.75 15.96 12.43 15.57 12.43ZM15.57 15.86H8.71C8.32 15.86 8 16.18 8 16.57C8 16.96 8.32 17.28 8.71 17.28H15.57C15.96 17.28 16.28 16.96 16.28 16.57C16.28 16.18 15.96 15.86 15.57 15.86Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Game Rules</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Responsible Gaming -->
        <NuxtLink to="/responsible-gaming" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#3a1a54] text-[#b388ff]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="8" fill="#D80027" class=""></rect><rect width="24" height="24" rx="8" fill="#9747FF"></rect><path d="M13.2187 4.59381C13.2447 4.60002 13.2707 4.60623 13.2975 4.61263C14.2633 4.85171 15.1395 5.2882 15.8697 5.96832C15.9344 6.02847 16.0009 6.08561 16.0684 6.14264C16.8643 6.83788 17.3736 7.89725 17.625 8.90631C17.6349 8.94474 17.6349 8.94474 17.6449 8.98393C17.8467 9.80607 17.8272 10.7744 17.625 11.5938C17.6152 11.6339 17.6152 11.6339 17.6052 11.6747C17.3718 12.5935 16.9235 13.423 16.2819 14.1186C16.2269 14.1787 16.1747 14.24 16.123 14.3028C16.0196 14.4235 15.9036 14.5239 15.7812 14.6251C15.7568 14.6457 15.7568 14.6457 15.7318 14.6667C14.4717 15.7253 12.9124 16.1194 11.2907 15.9909C10.1177 15.8611 8.99892 15.333 8.13464 14.5351C8.06828 14.4741 8.00041 14.4157 7.93163 14.3575C7.13333 13.6603 6.63044 12.6048 6.37499 11.5938C6.36507 11.5555 6.36507 11.5555 6.35494 11.5164C6.15301 10.6997 6.16501 9.71953 6.37499 8.90631C6.38152 8.88014 6.38806 8.85396 6.39478 8.827C6.62973 7.90867 7.07224 7.07397 7.71826 6.38031C7.7784 6.31562 7.83554 6.24914 7.89257 6.1817C8.58563 5.38824 9.64812 4.87116 10.6562 4.62506C10.683 4.61849 10.7098 4.61192 10.7374 4.60515C11.511 4.42553 12.4436 4.40719 13.2187 4.59381ZM11.5806 7.83975C11.5411 7.90816 11.5064 7.97742 11.4726 8.04889C11.4599 8.07451 11.4472 8.10013 11.434 8.12652C11.4071 8.18087 11.3804 8.23536 11.3539 8.28998C11.3113 8.37747 11.2674 8.4642 11.2231 8.55084C11.1399 8.71429 11.1399 8.71429 11.0574 8.87811C11.0463 8.90019 11.0352 8.92227 11.0237 8.94502C10.9959 8.99964 10.9959 8.99964 11 9.06256C10.9815 9.06491 10.963 9.06726 10.9439 9.06968C10.7229 9.09785 10.5021 9.1269 10.2812 9.15631C10.2508 9.16032 10.2203 9.16432 10.1889 9.16844C10.1044 9.17966 10.02 9.19135 9.93554 9.20319C9.91013 9.2065 9.88472 9.20982 9.85854 9.21324C9.67186 9.24015 9.50094 9.28248 9.38085 9.43952C9.29726 9.55178 9.27543 9.60486 9.27148 9.74225C9.27031 9.76852 9.26914 9.79478 9.26794 9.82184C9.30046 10.0283 9.47074 10.1606 9.61889 10.2928C9.66014 10.3311 9.70132 10.3695 9.74242 10.408C9.80661 10.468 9.87102 10.5273 9.93688 10.5855C10.2905 10.899 10.2905 10.899 10.3263 11.0636C10.3313 11.216 10.2914 11.3546 10.25 11.5001C10.2381 11.5653 10.2269 11.6307 10.2165 11.6962C10.2002 11.7852 10.1834 11.8741 10.1664 11.963C10.0937 12.3396 10.0937 12.3396 10.2187 12.6876C10.3343 12.804 10.4335 12.8694 10.6001 12.8836C10.7378 12.8737 10.8398 12.8308 10.9609 12.7696C10.9834 12.7586 11.0059 12.7476 11.0291 12.7363C11.4942 12.5125 11.4942 12.5125 11.9375 12.2501C12.1307 12.2518 12.2883 12.3642 12.4512 12.4571C12.7604 12.6293 12.7604 12.6293 13.0762 12.7891C13.1109 12.806 13.1457 12.823 13.1815 12.8404C13.3133 12.8862 13.4309 12.8983 13.5648 12.8532C13.7133 12.7623 13.8182 12.6704 13.875 12.5001C13.8886 12.3152 13.8675 12.1387 13.8329 11.9576C13.8242 11.9094 13.8155 11.8611 13.8068 11.8129C13.793 11.7382 13.7792 11.6634 13.7652 11.5887C13.7517 11.5157 13.7386 11.4427 13.7255 11.3697C13.7212 11.3475 13.7169 11.3252 13.7125 11.3023C13.6731 11.0818 13.6731 11.0818 13.7187 10.9688C13.7815 10.8906 13.8524 10.8222 13.9247 10.7529C13.9453 10.7326 13.9659 10.7123 13.9871 10.6914C14.053 10.6267 14.1192 10.5624 14.1855 10.4981C14.2517 10.4337 14.3177 10.3692 14.3836 10.3045C14.4246 10.2643 14.4657 10.2243 14.507 10.1844C14.5257 10.1661 14.5444 10.1479 14.5636 10.1291C14.58 10.1132 14.5964 10.0973 14.6133 10.0809C14.724 9.95305 14.7322 9.83459 14.7286 9.67096C14.7096 9.52269 14.6296 9.43912 14.5229 9.34162C14.1832 9.10182 13.4083 9.06256 13 9.06256C12.9881 9.02378 12.9881 9.02378 12.976 8.98421C12.9324 8.86071 12.8786 8.74601 12.8207 8.62873C12.8093 8.6057 12.798 8.58268 12.7863 8.55896C12.7624 8.51055 12.7384 8.46218 12.7144 8.41384C12.6778 8.34009 12.6418 8.26609 12.6058 8.19208C12.5824 8.1449 12.559 8.09774 12.5355 8.0506C12.5249 8.02859 12.5143 8.00658 12.5033 7.98391C12.4373 7.85293 12.3741 7.77198 12.25 7.68756C12.2313 7.67467 12.2126 7.66178 12.1934 7.6485C11.9559 7.5671 11.732 7.64038 11.5806 7.83975Z" fill="white"></path><path d="M7.96875 15.89C8.06184 15.9089 8.12729 15.9375 8.20569 15.9907C8.22682 16.0048 8.24795 16.019 8.26972 16.0335C8.29221 16.0487 8.31471 16.0638 8.33789 16.0795C9.23799 16.6703 10.2232 16.9767 11.2813 17.14C11.2611 17.2925 11.1978 17.4175 11.1313 17.5542C11.1133 17.592 11.1133 17.592 11.0948 17.6305C11.0556 17.7125 11.0161 17.7944 10.9766 17.8763C10.9222 17.9895 10.868 18.1028 10.8138 18.2161C10.8004 18.2442 10.7869 18.2724 10.773 18.3014C10.691 18.4726 10.6102 18.6444 10.5309 18.8169C10.5216 18.8372 10.5122 18.8574 10.5026 18.8783C10.46 18.9711 10.4175 19.064 10.3753 19.1571C10.1901 19.5612 10.1901 19.5612 10.0449 19.6674C9.8497 19.7313 9.67332 19.736 9.48303 19.6559C9.34625 19.5715 9.29052 19.4514 9.22266 19.3099C9.20969 19.2841 9.19673 19.2583 9.18337 19.2318C9.1423 19.1495 9.10228 19.0667 9.0625 18.9838C9.04883 18.9554 9.03515 18.9271 9.02106 18.8979C8.93982 18.7292 8.86001 18.5599 8.78125 18.39C8.7005 18.4075 8.61977 18.4251 8.53906 18.4427C8.51405 18.4482 8.48904 18.4536 8.46327 18.4593C8.32536 18.4897 8.1885 18.5224 8.05213 18.5592C8.01117 18.5701 8.01117 18.5701 7.96939 18.5812C7.91689 18.5953 7.86449 18.6098 7.81223 18.6248C7.59825 18.6818 7.40964 18.6895 7.20899 18.5873C7.09547 18.4896 7.01462 18.411 6.9879 18.2584C6.9747 17.978 7.08403 17.7589 7.20313 17.5131C7.22412 17.4685 7.24506 17.4239 7.26594 17.3793C7.30995 17.2855 7.35435 17.1919 7.39906 17.0985C7.47059 16.949 7.54098 16.7989 7.61121 16.6488C7.72976 16.3956 7.84903 16.1427 7.96875 15.89Z" fill="white"></path><path d="M16.0312 15.89C16.2181 16.28 16.4036 16.6705 16.588 17.0617C16.6218 17.1333 16.6559 17.2049 16.6899 17.2765C16.744 17.3901 16.7969 17.5043 16.8496 17.6185C16.8652 17.651 16.8807 17.6835 16.8968 17.7169C16.99 17.9222 17.0318 18.1016 17 18.3275C16.9279 18.4801 16.8374 18.5637 16.6875 18.64C16.494 18.6836 16.3313 18.6664 16.1428 18.6128C16.1073 18.6034 16.1073 18.6034 16.0711 18.5937C15.9965 18.5738 15.9221 18.5532 15.8477 18.5326C15.7725 18.5122 15.6974 18.4919 15.6222 18.4718C15.5756 18.4593 15.5291 18.4466 15.4827 18.4337C15.3917 18.4088 15.3136 18.39 15.2188 18.39C15.2035 18.4223 15.1882 18.4546 15.1725 18.4879C15.1154 18.6084 15.058 18.7286 15.0004 18.8487C14.9755 18.9007 14.9508 18.9526 14.9263 19.0047C14.8908 19.0797 14.8549 19.1545 14.819 19.2292C14.8082 19.2524 14.7973 19.2755 14.7862 19.2993C14.7019 19.4731 14.597 19.6354 14.4062 19.7025C14.3265 19.713 14.3265 19.713 14.2402 19.7142C14.212 19.7151 14.1838 19.716 14.1547 19.7169C14.0332 19.6979 13.9388 19.6539 13.8438 19.5775C13.7831 19.4878 13.7831 19.4878 13.7324 19.3763C13.7114 19.3314 13.6904 19.2864 13.6693 19.2415C13.6576 19.2159 13.6459 19.1903 13.6338 19.1639C13.5883 19.0659 13.5412 18.9687 13.4938 18.8716C13.3076 18.49 13.1245 18.107 12.9453 17.722C12.9297 17.6887 12.914 17.6553 12.8979 17.6209C12.8245 17.4623 12.7599 17.31 12.7188 17.14C12.7364 17.1374 12.7541 17.1347 12.7723 17.132C13.8837 16.962 14.9476 16.6135 15.8593 15.9406C15.9375 15.89 15.9375 15.89 16.0312 15.89Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Responsible Gaming</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Terms of Use -->
        <NuxtLink to="/terms-of-use" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d45] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="8" fill="#00B386" class=""></rect><path d="M8.07867 4.64814C8.11362 4.64802 8.14856 4.6479 8.18457 4.64778C8.30098 4.64746 8.41739 4.64758 8.5338 4.64771C8.61754 4.64757 8.70129 4.64741 8.78503 4.64722C8.9885 4.64682 9.19196 4.64677 9.39542 4.64684C9.56092 4.6469 9.72641 4.64684 9.8919 4.64671C9.9155 4.64669 9.93911 4.64667 9.96343 4.64665C10.0114 4.64661 10.0593 4.64658 10.1073 4.64654C10.5566 4.6462 11.0058 4.64627 11.4551 4.64646C11.8654 4.64662 12.2757 4.64627 12.686 4.64567C13.1081 4.64507 13.5301 4.64481 13.9521 4.64493C14.1888 4.64499 14.4255 4.64491 14.6621 4.64447C14.8636 4.64409 15.0651 4.64405 15.2666 4.64443C15.3692 4.64461 15.4719 4.6446 15.5745 4.64427C16.3076 4.64212 16.9192 4.70552 17.4688 5.25004C17.8509 5.68578 18.0149 6.1537 18.0123 6.72827C18.0125 6.76884 18.0127 6.80941 18.0129 6.85121C18.0134 6.9629 18.0134 7.07459 18.0132 7.18628C18.0131 7.30708 18.0136 7.42788 18.0139 7.54869C18.0146 7.78495 18.0147 8.02121 18.0147 8.25748C18.0146 8.44952 18.0148 8.64156 18.015 8.8336C18.0151 8.889 18.0151 8.94441 18.0152 8.99982C18.0152 9.04119 18.0152 9.04119 18.0153 9.0834C18.0159 9.60431 18.0158 10.1252 18.0156 10.6461C18.0155 11.1225 18.0161 11.599 18.0171 12.0754C18.0182 12.565 18.0187 13.0545 18.0185 13.5441C18.0185 13.8188 18.0186 14.0936 18.0194 14.3683C18.0201 14.602 18.0202 14.8357 18.0196 15.0695C18.0193 15.1887 18.0192 15.3079 18.0199 15.4271C18.0206 15.5564 18.0201 15.6857 18.0194 15.815C18.0198 15.8525 18.0202 15.8901 18.0206 15.9288C18.018 16.1782 17.9714 16.3347 17.7987 16.5161C17.6593 16.6429 17.5296 16.6875 17.3438 16.6875C17.344 16.7063 17.3443 16.725 17.3446 16.7443C17.3474 16.9411 17.3493 17.1378 17.3506 17.3345C17.3512 17.4077 17.3521 17.481 17.3532 17.5542C17.3547 17.66 17.3554 17.7658 17.356 17.8716C17.3566 17.9039 17.3573 17.9361 17.3579 17.9693C17.358 18.3572 17.2304 18.6826 16.9688 18.9688C16.6541 19.2564 16.3047 19.3634 15.8838 19.3595C15.8315 19.3597 15.8315 19.3597 15.7781 19.36C15.6623 19.3604 15.5465 19.3599 15.4307 19.3595C15.3473 19.3596 15.2638 19.3598 15.1804 19.36C14.9779 19.3604 14.7754 19.3602 14.5729 19.3597C14.3367 19.3592 14.1005 19.3593 13.8643 19.3594C13.4425 19.3596 13.0208 19.3591 12.5991 19.3584C12.1906 19.3576 11.7822 19.3574 11.3737 19.3577C10.9281 19.3581 10.4825 19.3581 10.0369 19.3577C9.98932 19.3576 9.94172 19.3576 9.89413 19.3576C9.87071 19.3575 9.8473 19.3575 9.82318 19.3575C9.65885 19.3573 9.49453 19.3574 9.3302 19.3575C9.12969 19.3577 8.92918 19.3575 8.72866 19.3569C8.62652 19.3566 8.52439 19.3564 8.42225 19.3566C7.69065 19.3579 7.07966 19.2934 6.53126 18.75C6.13062 18.2931 5.98516 17.8165 5.98789 17.2173C5.98776 17.1704 5.98759 17.1235 5.98738 17.0766C5.98693 16.9485 5.98706 16.8205 5.98729 16.6924C5.98744 16.5539 5.98705 16.4155 5.98673 16.277C5.98619 16.0061 5.98617 15.7352 5.98633 15.4643C5.98646 15.244 5.98641 15.0237 5.98625 14.8034C5.98622 14.772 5.9862 14.7406 5.98617 14.7082C5.98613 14.6445 5.98608 14.5807 5.98603 14.5169C5.9856 13.9191 5.98577 13.3213 5.98613 12.7236C5.98644 12.1773 5.98604 11.631 5.98529 11.0846C5.98453 10.5231 5.98423 9.96153 5.98443 9.39997C5.98454 9.08494 5.98447 8.76992 5.98393 8.45489C5.98347 8.1867 5.98345 7.9185 5.98399 7.65031C5.98426 7.5136 5.98433 7.37691 5.98385 7.24021C5.98341 7.11481 5.98356 6.98943 5.98417 6.86403C5.98428 6.81892 5.98419 6.77381 5.98386 6.72871C5.97979 6.12535 6.17469 5.6234 6.59376 5.18754C7.02406 4.79996 7.50995 4.64605 8.07867 4.64814ZM7.53053 16.8728C7.38652 17.0801 7.32484 17.233 7.35841 17.4878C7.39789 17.6655 7.52018 17.7768 7.64783 17.897C7.85535 18.0156 8.10528 18.0089 8.33754 18.0076C8.3869 18.0076 8.3869 18.0076 8.43726 18.0077C8.54695 18.0078 8.65663 18.0075 8.76631 18.0071C8.84517 18.0071 8.92403 18.0071 9.00289 18.0072C9.17236 18.0072 9.34184 18.007 9.51131 18.0066C9.75634 18.0061 10.0014 18.006 10.2464 18.0059C10.644 18.0058 11.0416 18.0053 11.4392 18.0048C11.8253 18.0042 12.2114 18.0037 12.5975 18.0035C12.6213 18.0035 12.6451 18.0034 12.6697 18.0034C12.7892 18.0033 12.9087 18.0033 13.0282 18.0032C14.0188 18.0025 15.0094 18.0014 16 18C16 17.5669 16 17.1338 16 16.6875C14.9652 16.6847 13.9304 16.6825 12.8956 16.6812C12.7734 16.681 12.6512 16.6808 12.529 16.6807C12.5047 16.6806 12.4804 16.6806 12.4553 16.6806C12.0615 16.68 11.6677 16.679 11.2739 16.6779C10.8698 16.6767 10.4657 16.676 10.0616 16.6758C9.81226 16.6756 9.56294 16.6751 9.31361 16.674C9.12237 16.6733 8.93112 16.6732 8.73987 16.6734C8.66146 16.6734 8.58306 16.6731 8.50465 16.6726C8.39758 16.672 8.29054 16.6722 8.18346 16.6725C8.15246 16.6721 8.12145 16.6718 8.0895 16.6714C7.86821 16.6733 7.69378 16.7172 7.53053 16.8728Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Terms of Use</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Privacy Policy -->
        <NuxtLink to="/privacy-policy" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4d1618] text-[#ff5252]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="8" fill="#D80027" class=""></rect><path d="M7.15974 4.77273C7.20032 4.77254 7.20032 4.77254 7.24172 4.77234C7.33226 4.77196 7.42279 4.77182 7.51333 4.77169C7.57831 4.77147 7.64328 4.77124 7.70825 4.771C7.92158 4.77027 8.1349 4.76991 8.34822 4.76956C8.42179 4.76942 8.49535 4.76928 8.56892 4.76913C8.91466 4.76847 9.2604 4.76798 9.60614 4.76769C10.0046 4.76735 10.403 4.76644 10.8014 4.76503C11.1098 4.76398 11.4181 4.76347 11.7265 4.76336C11.9105 4.76328 12.0944 4.76297 12.2784 4.76209C12.4517 4.76128 12.625 4.76114 12.7983 4.76149C12.8616 4.76151 12.9249 4.76129 12.9882 4.76081C13.3521 4.75821 13.6634 4.78035 14.0069 4.91673C14.0382 4.92913 14.0695 4.94154 14.1018 4.95433C14.521 5.13062 14.8824 5.52612 15.0658 5.93547C15.179 6.22074 15.2274 6.45604 15.2261 6.76064C15.2261 6.79216 15.2261 6.82368 15.2261 6.85616C15.2261 6.96005 15.2258 7.06394 15.2255 7.16784C15.2255 7.23999 15.2254 7.31214 15.2254 7.38429C15.2252 7.57397 15.2249 7.76366 15.2245 7.95334C15.2242 8.14699 15.224 8.34063 15.2238 8.53428C15.2235 8.91408 15.2229 9.29387 15.2221 9.67367C15.1986 9.683 15.175 9.69234 15.1507 9.70195C15.1042 9.72048 15.1042 9.72048 15.0566 9.73938C15.0106 9.75768 15.0106 9.75768 14.9635 9.77635C14.5211 9.95712 14.1083 10.2072 13.6957 10.4461C13.5405 10.5357 13.3849 10.6245 13.2293 10.7133C13.1458 10.7609 13.0625 10.8086 12.9791 10.8565C12.7898 10.9651 12.6002 11.0728 12.4086 11.1772C11.6807 11.5758 11.1512 12.0859 10.9057 12.905C10.5539 14.3447 11.0077 16.0518 11.7152 17.3126C11.7797 17.4179 11.8456 17.5214 11.9148 17.6237C11.9583 17.6945 11.9583 17.6945 11.9583 17.7639C11.325 17.7672 10.6917 17.7696 10.0584 17.7711C9.76435 17.7719 9.47026 17.7728 9.17617 17.7744C8.91959 17.7758 8.66303 17.7767 8.40645 17.777C8.27081 17.7772 8.13519 17.7776 7.99955 17.7786C7.17639 17.7846 6.45225 17.7833 5.81974 17.1807C5.79441 17.1555 5.76907 17.1302 5.74297 17.1042C5.72337 17.0854 5.70376 17.0666 5.68357 17.0473C5.33159 16.6785 5.2114 16.1922 5.21285 15.6989C5.2127 15.6594 5.21254 15.6199 5.21238 15.5792C5.21194 15.4472 5.21199 15.3151 5.21205 15.1831C5.21188 15.0883 5.21161 14.9935 5.21135 14.8987C5.21077 14.668 5.21058 14.4374 5.21054 14.2068C5.21051 14.0192 5.21036 13.8317 5.21014 13.6441C5.20953 13.1118 5.20921 12.5795 5.20926 12.0471C5.20927 12.0185 5.20927 11.9898 5.20927 11.9603C5.20927 11.9316 5.20928 11.9029 5.20928 11.8733C5.20931 11.4082 5.20864 10.9432 5.20766 10.4782C5.20667 10.0001 5.20619 9.52201 5.20625 9.04394C5.20627 8.77577 5.20608 8.5076 5.20533 8.23943C5.2047 8.01108 5.20455 7.78273 5.20502 7.55438C5.20525 7.43801 5.20518 7.32166 5.20465 7.20529C5.20411 7.07878 5.20444 6.9523 5.20497 6.82579C5.20461 6.7895 5.20426 6.75321 5.20389 6.71582C5.20889 6.17745 5.44481 5.70432 5.81635 5.32525C6.19089 4.96643 6.64036 4.77259 7.15974 4.77273ZM9.06112 7.21273C8.95374 7.3515 8.92375 7.4859 8.93742 7.65978C8.99404 7.82336 9.08028 7.93379 9.2152 8.04173C9.42247 8.10681 9.61186 8.12185 9.82812 8.12161C9.87498 8.12184 9.87498 8.12184 9.92278 8.12206C9.98846 8.12226 10.0541 8.12228 10.1198 8.12213C10.2196 8.12202 10.3193 8.12284 10.419 8.12372C10.4832 8.1238 10.5474 8.12382 10.6115 8.12378C10.6557 8.12426 10.6557 8.12426 10.7007 8.12475C10.9569 8.12279 11.198 8.08497 11.3853 7.8985C11.4906 7.75974 11.5204 7.62406 11.5069 7.45145C11.4502 7.28773 11.3628 7.17891 11.2291 7.0695C11.0307 6.99642 10.8479 6.9894 10.6379 6.98962C10.6049 6.98947 10.572 6.98932 10.5381 6.98916C10.4688 6.98897 10.3995 6.98895 10.3302 6.9891C10.2248 6.98921 10.1193 6.98839 10.0139 6.98751C9.94626 6.98743 9.87865 6.98741 9.81103 6.98745C9.7642 6.98697 9.7642 6.98697 9.71642 6.98648C9.47759 6.98821 9.22588 7.0195 9.06112 7.21273Z" fill="white"></path><path d="M16.8107 11.0408C16.8867 11.0844 16.9626 11.128 17.0386 11.1715C17.0962 11.2049 17.0962 11.2049 17.155 11.2389C17.3401 11.3454 17.5269 11.449 17.7135 11.5529C17.8553 11.6324 17.9971 11.712 18.1388 11.7916C18.1729 11.8107 18.207 11.8298 18.2421 11.8495C19.462 12.534 19.462 12.534 19.6666 13.25C19.6734 13.3415 19.6772 13.4292 19.6771 13.5206C19.6774 13.5591 19.6774 13.5591 19.6777 13.5984C19.6781 13.6812 19.6779 13.764 19.6775 13.8468C19.6774 13.8891 19.6774 13.8891 19.6772 13.9324C19.6755 14.3493 19.6635 14.7532 19.5624 15.1597C19.5554 15.1887 19.5483 15.2177 19.541 15.2475C19.1935 16.6305 18.4283 17.8973 17.2013 18.6666C17.1804 18.6798 17.1595 18.693 17.1379 18.7065C16.7001 18.9771 16.0999 19.3338 15.5694 19.2222C14.9289 19.0491 14.3352 18.7154 13.8333 18.2847C13.8046 18.2601 13.8046 18.2601 13.7754 18.235C13.512 18.0062 13.2798 17.7654 13.0694 17.4861C13.0416 17.4502 13.0139 17.4143 12.9853 17.3773C12.2455 16.399 11.877 15.1732 11.8741 13.954C11.8736 13.8727 11.8719 13.7915 11.8702 13.7103C11.8651 13.2401 11.9666 12.8325 12.3055 12.4861C12.5089 12.3076 12.7284 12.1746 12.9674 12.0499C13.2467 11.901 13.5217 11.7465 13.7942 11.5855C15.7641 10.4255 15.7641 10.4255 16.8107 11.0408ZM16.2636 14.0829C16.2174 14.1301 16.1713 14.1773 16.1251 14.2244C16.053 14.2985 15.981 14.3727 15.9093 14.4471C15.8397 14.5192 15.7696 14.5908 15.6993 14.6623C15.6672 14.6961 15.6672 14.6961 15.6344 14.7306C15.6143 14.751 15.5941 14.7714 15.5733 14.7924C15.5557 14.8106 15.5382 14.8288 15.5201 14.8475C15.4652 14.8819 15.4652 14.8819 15.3937 14.8744C15.297 14.8353 15.2448 14.7716 15.1744 14.6953C15.0135 14.5302 14.903 14.4414 14.6688 14.4153C14.4649 14.4243 14.3359 14.5142 14.2 14.6606C14.1277 14.8167 14.112 14.9558 14.1458 15.125C14.2559 15.3751 14.4506 15.5494 14.6427 15.7391C14.6749 15.7716 14.707 15.8042 14.7401 15.8377C14.9996 16.1051 14.9996 16.1051 15.3341 16.2533C15.5851 16.2453 15.7382 16.1498 15.9122 15.9757C15.9439 15.9442 15.9756 15.9126 16.0083 15.8802C16.0423 15.8459 16.0763 15.8116 16.1103 15.7772C16.1456 15.7419 16.181 15.7066 16.2163 15.6713C16.2902 15.5974 16.3638 15.5234 16.4373 15.4493C16.5314 15.3544 16.6259 15.2599 16.7206 15.1655C16.7935 15.0926 16.8663 15.0197 16.939 14.9466C16.9737 14.9117 17.0086 14.8768 17.0435 14.842C17.0922 14.7933 17.1406 14.7444 17.189 14.6954C17.2304 14.6538 17.2304 14.6538 17.2726 14.6113C17.4082 14.4576 17.4252 14.3347 17.4205 14.1343C17.3986 13.9609 17.3045 13.8708 17.1796 13.7578C16.7808 13.5657 16.5299 13.8053 16.2636 14.0829Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Privacy Policy</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Affiliate -->
        <NuxtLink to="/affiliate" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#183a54] text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#428ACD]"></rect><path d="M18.0699 7.57376H18.995C19.5432 7.57376 20 7.98528 20 8.50508V13.1508C20 13.6598 19.5546 14.0822 19.0064 14.0822H17.1906L13.0107 8.46176L12.5196 7.82284L9.53888 9.10069C9.34474 9.18733 9.12775 9.20898 8.92218 9.16567C8.00855 8.9924 7.71162 8.70001 8.00855 8.27767C8.29406 7.86615 9.52746 7.04313 11.6973 5.80859C11.7544 5.7761 11.8115 5.74361 11.8686 5.72196C12.7823 5.32127 13.8215 5.46205 14.9978 6.15513C15.9686 6.72908 16.9964 7.19474 18.0699 7.56293V7.57376Z" fill="white"></path><path d="M4.68524 14.0277C4.27411 13.8978 4.00002 13.5512 4.00002 13.1506V8.5048C4.00002 7.99583 4.44541 7.57349 5.00501 7.57349H7.31194C6.7866 8.01749 6.74091 8.78637 7.22057 9.27368C7.26625 9.317 7.31194 9.36032 7.36904 9.40364C8.09994 9.95593 9.09352 10.1075 9.97289 9.80432L12.2227 9.04627L13.7987 11.1688C13.7987 11.1688 13.8901 11.2554 13.9244 11.3096L16.6881 15.024C16.9964 15.4464 16.8937 16.0203 16.4368 16.3127C16.4026 16.3344 16.3569 16.356 16.3112 16.3777L11.9029 18.4028C11.6974 18.5002 11.469 18.5219 11.2634 18.4786L11.4233 18.327C12.1885 17.6014 12.1885 16.4427 11.4233 15.7171L8.22557 12.7066C7.64313 12.1543 6.69523 12.1543 6.10137 12.6957C6.10137 12.6957 6.10137 12.6957 6.08995 12.7066L4.69666 14.0169L4.68524 14.0277Z" fill="white"></path><path d="M7.81439 13.6268L10.6467 16.2908C10.8979 16.5291 10.9893 16.8648 10.8979 17.1788L10.7494 17.677C10.6352 18.056 10.2241 18.2834 9.80154 18.1859C9.71018 18.1643 9.61882 18.121 9.53887 18.0668L5.89576 15.5761C5.45037 15.2729 5.359 14.6881 5.67877 14.2766C5.71304 14.2441 5.73588 14.2008 5.77014 14.1791L6.364 13.616C6.75229 13.2478 7.38042 13.2478 7.78013 13.616L7.81439 13.6268Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Affiliate</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Download APP -->
        <NuxtLink to="/download-app" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4a2612] text-[#ff8042]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#F90]"></rect><path d="M15.2246 4.5H8.77536C7.7971 4.5 7 5.28385 7 6.24584V17.7542C7 18.7162 7.7971 19.5 8.77536 19.5H15.2246C16.2029 19.5 17 18.7162 17 17.7542V6.24584C17 5.28385 16.2029 4.5 15.2246 4.5ZM11.4203 5.07007H12.5797C12.7246 5.07007 12.8696 5.21259 12.8696 5.35511C12.8696 5.49762 12.7246 5.64014 12.5797 5.64014H11.4203C11.2754 5.64014 11.1304 5.49762 11.1304 5.35511C11.1304 5.21259 11.2754 5.07007 11.4203 5.07007ZM12 18.7874C11.6014 18.7874 11.2391 18.4667 11.2391 18.0392C11.2391 17.6473 11.5652 17.291 12 17.291C12.3986 17.291 12.7609 17.6116 12.7609 18.0392C12.7609 18.4667 12.4348 18.7874 12 18.7874ZM15.8043 14.4002C15.8043 15.5048 14.9089 16.4002 13.8043 16.4002H10.1957C9.09108 16.4002 8.19565 15.5048 8.19565 14.4002V8.75C8.19565 7.64543 9.09108 6.75 10.1957 6.75H13.8043C14.9089 6.75 15.8043 7.64543 15.8043 8.75V14.4002Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">Download APP</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- About Us -->
        <NuxtLink to="/about-us" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#183a54] text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#4C9EEA" class=""></rect><path d="M11.99 5.5C11.58 5.5 11.24 5.623 10.95 5.92026C10.64 6.19702 10.5 6.55578 10.5 6.99654C10.5 7.4373 10.64 7.77556 10.95 8.07282C11.24 8.37008 11.58 8.51358 11.99 8.51358C12.39 8.51358 12.78 8.35983 13.07 8.09332C13.36 7.79606 13.5 7.4373 13.5 6.99654C13.5 6.55578 13.36 6.19702 13.07 5.92026C12.78 5.623 12.42 5.5 11.99 5.5Z" fill="white"></path><path d="M10.5 10.8822V17.0771C10.5 17.8611 11.17 18.5 12 18.5C12.83 18.5 13.5 17.8611 13.5 17.0771V10.8822C13.5 10.0981 12.83 9.45925 12 9.45925C11.17 9.46893 10.5 10.0981 10.5 10.8822Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">About Us</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>
      </div>
    </div>

    </div>
  </div>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .me-mobile-view {
    position: relative;
    isolation: isolate;
  }

  .me-hero-background {
    position: sticky;
    top: 0;
    z-index: -1;
    height: 0;
    pointer-events: none;
  }

  .me-hero-background::before {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    height: 300px;
    background: #0d6047 url('/images/me/me-bg.webp') right top / 100% auto no-repeat;
    border-radius: 0 0 20px 20px;
  }

  .me-mobile-header {
    position: relative;
    isolation: isolate;
    min-height: 60px;
  }

  .me-mobile-header--sticky {
    position: sticky;
    top: 0;
  }

  .me-mobile-header--sticky::before {
    content: '';
    position: absolute;
    inset: 0 0 -24px;
    z-index: -1;
    pointer-events: none;

    background-image: 
    url('/images/me/me-bg.webp');
    background-size: cover;
    background-position: top;
     mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  /* Webkit support for Safari/older browsers */
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  height: 120px;
    
  }

  .me-mobile-view .me-hero-wrapper {
    background: transparent;
  }
}

.me-hero-wrapper {
  background-image: url("/images/me/me-bg.webp");
  background-size: cover;
  background-position: right top;
  background-repeat: no-repeat;
      border-radius: 0 0 50px 50px;
}

.me-buttons{
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia) !important;
      --tw-backdrop-blur: blur(8px) !important;
}

</style>
