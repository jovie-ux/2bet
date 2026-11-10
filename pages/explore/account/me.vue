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
const loginUrl = bybetRedirectUrl
const bybetRedirectRegister = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/registered?p=${bybetRedirectCode || 'xjSD'}`
const { selectedLanguageLabel, translate, locale } = useSiteLocale()
const { selectedTimeZone } = useTimeZonePreference()
const { setThemePreference, themePreference } = useSiteTheme()

useAppSeo({
  title: computed(() => locale.value === 'pt' ? 'Minha Conta — Perfil do Jogador e Nível do Clube VIP | 2bet' : 'My Account Profile & VIP Overview | 2Bet Brasil'),
  description: computed(() => locale.value === 'pt' ? 'Acesse sua conta na 2bet Brasil para gerenciar saldo em BRL, conferir seu nível no Clube VIP e acompanhar transações com total segurança.' : 'Manage your 2Bet account profile, security settings, VIP tier status, and transaction history. Fast, secure account management on 2Bet Brasil.'),
  keywords: '2bet login, minha conta 2bet, clube vip 2bet, perfil 2bet',
  breadcrumbs: computed(() => [
    { name: translate('Home'), path: '/' },
    { name: translate('My Account'), path: '/explore/account/me' },
  ]),
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
    <div class="me-mobile-view lg:hidden w-full min-w-0 pb-3 text-white">
      <!-- Mobile Dedicated Header (Hidden on Desktop) -->
      <header
        class="me-mobile-header lg:hidden z-30 flex items-center justify-between px-4 py-3"
        :class="{ 'me-mobile-header--sticky': headerScrollFade > 0 }"
      >
        <h1 class="text-[19px] font-bold text-white tracking-tight">{{ translate('Me') }}</h1>
        <div class="flex items-center gap-2">
          <NuxtLink
            to="/explore/egames/customer-service"
            class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/25 backdrop-blur-md flex items-center justify-center text-[#FEDF00] transition-all "
            :aria-label="translate('Customer Service')"
          >
            <Headphones class="w-5 h-5 text-[#FEDF00]" />
          </NuxtLink>
          <a 
            :href="bybetRedirectUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Account Login"  
          >
            <button
              type="button"
              class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-sm cursor-pointer"
              aria-label="Notifications"
            >
              <Bell class="w-4 h-4 text-white" />
            </button>
          </a>
          
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/25 backdrop-blur-md flex items-center justify-center text-[#FEDF00] transition-all shadow-sm cursor-pointer"
            :aria-label="translate('Notifications')"
            @click="showDemoMessage(translate('No new notifications'))"
          >
            <Bell class="w-5 h-5 text-[#FEDF00]" />
          </button>
        </div>
      </header>

    <!-- Hero Area with Green Felt Texture & "2Bet" Watermark -->
    <div class="me-hero-wrapper relative w-full overflow-hidden">
      <!-- Frosted Profile Card -->
      <div class="px-3.5 pt-2 pb-4 lg:px-6 lg:py-6">
        <div class="me-frosted-card mx-auto max-w-xl rounded-[20px] p-4 lg:p-6 bg-white/[0.14] backdrop-blur-xl border border-white/25 shadow-0 ">
          <!-- User Avatar Silhouette -->
          <div class="w-14 h-14 rounded-full border border-white/30 bg-white/10 flex items-center justify-center mx-auto mb-3 ">
            <UserRound class="w-7 h-7 text-white/70" :stroke-width="2" />
          </div>

          <!-- Login & Sign Up Pill Buttons -->
          <div class="mx-auto mb-3 grid w-full max-w-[282px] grid-cols-2 gap-3">
            <a
              :href="loginUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white font-medium text-[14px] flex items-center justify-center transition-all shadow-sm max-w-[135px]"
            >
              {{ translate('Login') }}
            </a>
            <a
              :href="bybetRedirectRegister"
              target="_blank"
              rel="noopener noreferrer"
              class="h-9 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 text-white font-medium text-[14px] flex items-center justify-center transition-all shadow-sm  max-w-[135px]"
            >
              {{ translate('Sign Up') }}
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
              {{ translate('Deposit') }}
            </a>
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              {{ translate('Withdraw') }}
            </a>
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              {{ translate('VIP') }}
            </a>
            <a
              :href="bybetRedirectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/15 text-white text-[13px] font-normal flex items-center justify-center transition-all shadow-sm"
            >
              {{ translate('Bonus') }}
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
              <span class="text-[14px] text-white">{{ translate('Betting History') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Bonuses -->
          <NuxtLink to="/explore/bonuses" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FFBA00"></rect><path d="M18.0058 19.5H6.00076C5.56593 19.5 5.16687 19.1208 5.16687 18.58V9.83301H18.8397V18.58C18.8397 19.1208 18.4406 19.5 18.0058 19.5Z" stroke="white"></path><path d="M14.9645 4C14.7711 4 14.5844 4.08 14.4443 4.22667L12.0033 6.78675L9.56229 4.22667C9.4289 4.08 9.23549 4 9.04207 4C6.99455 4 5.33386 5.74672 5.33386 7.88679C5.33386 8.31347 5.66733 8.66681 6.07417 8.66681H17.9324C18.3393 8.66681 18.6728 8.31347 18.6728 7.88679C18.6728 5.74672 17.0121 4 14.9645 4ZM6.9412 7.11343C7.21465 6.30007 7.90827 5.69339 8.74862 5.57338L10.2159 7.11343H6.9412ZM13.7907 7.11343L15.258 5.57338C16.0983 5.68672 16.792 6.30007 17.0654 7.11343H13.7907Z" fill="white"></path><path d="M19.6999 12.6664H4.30679C4.13339 12.6664 4 12.4998 4 12.2931V10.073C4 9.66635 4.28012 9.33301 4.61359 9.33301H19.3864C19.7266 9.33301 20 9.66635 20 10.073V12.2931C20 12.4998 19.8599 12.6664 19.6932 12.6664H19.6999Z" fill="white"></path><path d="M10.4026 9.33301H13.6039V20H10.4026V9.33301Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Bonuses') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Coupon Center -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#F5A46E"></rect><path d="M20 10.2V7.22C20 6.54 19.42 6 18.71 6H5.29C4.58 6 4 6.55 4 7.22V10.2C5.05 10.2 5.89 11.01 5.89 12C5.89 12.99 5.04 13.8 4 13.8V16.78C4 17.46 4.58 18 5.29 18H18.71C19.42 18 20 17.45 20 16.78V13.8C18.95 13.8 18.11 12.99 18.11 12C18.11 11.01 18.96 10.2 20 10.2ZM9.68 15C9.68 15.33 9.4 15.6 9.05 15.6C8.7 15.6 8.42 15.33 8.42 15V9C8.42 8.67 8.7 8.4 9.05 8.4C9.4 8.4 9.68 8.67 9.68 9V15Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Coupon Center') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Referral Bonus -->
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#428ACD"></rect><path d="M19.8866 11.4559C19.8866 11.6743 19.7729 11.6743 19.6592 11.7836L14.7841 16.3634C14.443 16.5819 13.8768 16.3634 13.6495 16.0357C13.5701 15.9038 13.5315 15.7513 13.5358 15.5988V13.0903C10.5845 11.4538 6.72605 12.3257 5.02307 15.0546C4.44826 15.9389 4.13512 16.9571 4.11367 18C4 17.5651 4 17.1281 4 16.5819C4.00214 12.2185 7.86279 8.7269 12.5149 8.7269H13.5358V6.76469C13.5251 6.35246 13.864 6.01031 14.2929 6C14.3058 6 14.3187 6 14.3315 6C14.5567 6 14.6704 6 14.7841 6.10924L19.552 10.3696C19.9531 10.5613 20.1139 11.0292 19.9144 11.4146C19.908 11.4291 19.8994 11.4414 19.8909 11.4559H19.8844H19.8866Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Referral Bonus') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

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
              <span class="text-[14px] text-white">{{ translate('Streamer Broadcast') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Match Predictions -->
          <NuxtLink to="/explore/live-plaza/expert-predictions" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#1EB1A5"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M4.81528 14.6522C4.34665 15.1208 4.34665 15.8806 4.81528 16.3492C5.28391 16.8178 6.04371 16.8178 6.51233 16.3492L9.05892 13.8026L10.8432 15.5827C11.0686 15.8076 11.3742 15.9337 11.6926 15.9332C12.011 15.9327 12.3162 15.8057 12.5409 15.5801L16.7999 11.3048V13.2C16.7999 13.8627 17.3372 14.4 17.9999 14.4C18.6627 14.4 19.1999 13.8627 19.1999 13.2V8.39995C19.1999 8.23554 19.1669 8.07886 19.107 7.93618C19.0482 7.79563 18.9615 7.66401 18.8468 7.54981C18.6171 7.32094 18.3179 7.20441 18.0173 7.20008L17.9982 7.19995H13.1999C12.5372 7.19995 11.9999 7.73721 11.9999 8.39995C11.9999 9.06269 12.5372 9.59995 13.1999 9.59995H15.1107L11.6881 13.0355L9.90545 11.257C9.43666 10.7894 8.67763 10.7898 8.20939 11.258L4.81528 14.6522Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Match Predictions') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Results -->
          <button type="button" class="menu-item flex items-center justify-between group text-left w-full cursor-pointer" @click="showDemoMessage(translate('Match Results'))">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FF6161"></rect><path d="M18.3588 12.6387H13.2726C12.9197 12.6387 12.6336 12.9247 12.6336 13.2775V18.3612C12.6336 18.714 12.9197 19 13.2726 19H18.3588C18.7117 19 18.9978 18.714 18.9978 18.3612V13.2775C18.9978 12.9247 18.7117 12.6387 18.3588 12.6387Z" fill="white"></path><path d="M15.0147 9.99625C15.5224 9.99625 15.9776 9.83 16.3628 9.5675L17.9736 11.2562C18.2099 11.51 18.5864 11.51 18.8227 11.2738C19.0591 11.02 19.0591 10.635 18.8227 10.39L17.1419 8.64C17.317 8.29 17.4046 7.905 17.4046 7.5025C17.4046 6.12875 16.3278 5.00875 15.0059 5.00875C13.6841 5.00875 12.6073 6.12875 12.6073 7.5025C12.6073 8.87625 13.6841 9.99625 15.0059 9.99625H15.0147ZM15.0147 6.25125C15.68 6.25125 16.214 6.8025 16.214 7.5025C16.214 8.2025 15.68 8.75375 15.0147 8.75375C14.3494 8.75375 13.8154 8.2025 13.8154 7.5025C13.8154 6.8025 14.3494 6.25125 15.0147 6.25125Z" fill="white"></path><path d="M10.7252 12.6387H5.63905C5.28611 12.6387 5 12.9247 5 13.2775V18.3612C5 18.714 5.28611 19 5.63905 19H10.7252C11.0781 19 11.3642 18.714 11.3642 18.3612V13.2775C11.3642 12.9247 11.0781 12.6387 10.7252 12.6387Z" fill="white"></path><path d="M10.7252 5H5.63905C5.28611 5 5 5.28598 5 5.63875V10.7225C5 11.0753 5.28611 11.3612 5.63905 11.3612H10.7252C11.0781 11.3612 11.3642 11.0753 11.3642 10.7225V5.63875C11.3642 5.28598 11.0781 5 10.7252 5Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Results') }}</span>
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
              <span class="text-[14px] text-white">{{ translate('Odds Settings') }}</span>
            </div>
            <div class="relative">
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-[13px] text-white hover:bg-[#2e312f] transition-colors cursor-pointer"
                @click="isOddsDropdownOpen = !isOddsDropdownOpen"
              >
                <span>{{ translate(selectedOdds) }}</span>
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
                  {{ translate(opt) }}
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
              <span class="text-[14px] text-white">{{ translate('Event Settings') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </a>

          <!-- Theme -->
          <div class="menu-item flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#9747FF"></rect><path d="M13 6C13 5.44772 12.5523 5 12 5H5C4.44772 5 4 5.44772 4 6V13C4 13.5523 4.44772 14 5 14H12C12.5523 14 13 13.5523 13 13V6Z" fill="white"></path><path d="M20 16C20 15.4477 19.5523 15 19 15H5C4.44772 15 4 15.4477 4 16V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V16Z" fill="white"></path><path d="M20 6C20 5.44772 19.5523 5 19 5H15C14.4477 5 14 5.44772 14 6V8C14 8.55228 14.4477 9 15 9H19C19.5523 9 20 8.55228 20 8V6Z" fill="white"></path><path d="M20 11C20 10.4477 19.5523 10 19 10H15C14.4477 10 14 10.4477 14 11V13C14 13.5523 14.4477 14 15 14H19C19.5523 14 20 13.5523 20 13V11Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Theme') }}</span>
            </div>
            <!-- Segmented Pill Toggle -->
            <div class="flex items-center rounded-full bg-black p-0.5 text-[13px]">
              <button
                type="button"
                class="rounded-full px-3 py-1 text-[12px] font-medium transition-all cursor-pointer"
                :class="selectedTheme === 'International' ? 'bg-[var(--main-color)] text-white font-semibold shadow' : 'text-white/70 hover:text-white'"
                @click="selectedTheme = 'International'"
              >
                {{ translate('International') }}
              </button>
              <button
                type="button"
                class="rounded-full px-3 py-1 text-[12px] font-medium transition-all cursor-pointer"
                :class="selectedTheme === 'Asia' ? 'bg-[var(--main-color)] text-white font-semibold shadow' : 'text-white/70 hover:text-white'"
                @click="selectedTheme = 'Asia'"
              >
                {{ translate('Asia') }}
              </button>
            </div>
          </div>

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
              <span class="text-[14px] text-white">{{ translate('Language') }}</span>
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
              <span class="text-[14px] text-white">{{ translate('Time Zone') }}</span>
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
              <span class="text-[14px] text-white">{{ translate('Mode') }}</span>
            </div>
            <!-- Segmented Pill Toggle -->
            <div class="flex items-center rounded-full bg-black p-0.5 text-[13px]">
              <button
                type="button"
                class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
                :class="themePreference === 'light' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white/70 hover:text-white'"
                :aria-pressed="themePreference === 'light'"
                @click="setThemePreference('light')"
              >
                {{ translate('Light') }}
              </button>
              <button
                type="button"
                class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
                :class="themePreference === 'dark' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white/70 hover:text-white'"
                :aria-pressed="themePreference === 'dark'"
                @click="setThemePreference('dark')"
              >
                {{ translate('Dark') }}
              </button>
              <button
                type="button"
                class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
                :class="themePreference === 'auto' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white/70 hover:text-white'"
                :aria-pressed="themePreference === 'auto'"
                @click="setThemePreference('auto')"
              >
                {{ translate('Auto') }}
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
              <span class="text-[14px] text-white">{{ translate('24/7 Services') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Tutorial -->
          <NuxtLink to="/tutorial/mock-betting" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#80B100"></rect><path d="M17.275 20H6.70499C5.91499 20 5.27499 19.36 5.27499 18.57V5.43C5.27499 4.64 5.91499 4 6.70499 4H8.13499V9C8.13499 9.16 8.19499 9.3 8.30499 9.4L9.85499 7.85L11.405 9.4C11.515 9.29 11.575 9.15 11.575 9V4H17.295C18.085 4 18.725 4.64 18.725 5.43V18.57C18.725 19.36 18.085 20 17.295 20H17.275ZM15.565 12.43H8.70499C8.31499 12.43 7.99499 12.75 7.99499 13.14C7.99499 13.53 8.31499 13.85 8.70499 13.85H15.565C15.955 13.85 16.275 13.53 16.275 13.14C16.275 12.75 15.955 12.43 15.565 12.43ZM15.565 15.86H8.70499C8.31499 15.86 7.99499 16.18 7.99499 16.57C7.99499 16.96 8.31499 17.28 8.70499 17.28H15.565C15.955 17.28 16.275 16.96 16.275 16.57C16.275 16.18 15.955 15.86 15.565 15.86Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Tutorial') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Game Rules -->
          <NuxtLink to="/game-rules/sports-betting-rules" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FFBA00"></rect><path d="M11.57 4H17.29C18.08 4 18.72 4.64 18.72 5.43V18.57C18.72 19.36 18.08 20 17.29 20H6.71C5.92 20 5.28 19.36 5.28 18.57V5.43C5.28 4.64 5.92 4 6.71 4H8.14M15.57 12.43H8.71C8.32 12.43 8 12.75 8 13.14C8 13.53 8.32 13.85 8.71 13.85H15.57C15.96 13.85 16.28 13.53 16.28 13.14C16.28 12.75 15.96 12.43 15.57 12.43ZM15.57 15.86H8.71C8.32 15.86 8 16.18 8 16.57C8 16.96 8.32 17.28 8.71 17.28H15.57C15.96 17.28 16.28 16.96 16.28 16.57C16.28 16.18 15.96 15.86 15.57 15.86Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Game Rules') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Affiliate -->
          <NuxtLink to="/affiliate" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#428ACD"></rect><path d="M18.0699 7.57376H18.995C19.5432 7.57376 20 7.98528 20 8.50508V13.1508C20 13.6598 19.5546 14.0822 19.0064 14.0822H17.1906L13.0107 8.46176L12.5196 7.82284L9.53888 9.10069C9.34474 9.18733 9.12775 9.20898 8.92218 9.16567C8.00855 8.9924 7.71162 8.70001 8.00855 8.27767C8.29406 7.86615 9.52746 7.04313 11.6973 5.80859C11.7544 5.7761 11.8115 5.74361 11.8686 5.72196C12.7823 5.32127 13.8215 5.46205 14.9978 6.15513C15.9686 6.72908 16.9964 7.19474 18.0699 7.56293V7.57376Z" fill="white"></path><path d="M4.68524 14.0277C4.27411 13.8978 4.00002 13.5512 4.00002 13.1506V8.5048C4.00002 7.99583 4.44541 7.57349 5.00501 7.57349H7.31194C6.7866 8.01749 6.74091 8.78637 7.22057 9.27368C7.26625 9.317 7.31194 9.36032 7.36904 9.40364C8.09994 9.95593 9.09352 10.1075 9.97289 9.80432L12.2227 9.04627L13.7987 11.1688C13.7987 11.1688 13.8901 11.2554 13.9244 11.3096L16.6881 15.024C16.9964 15.4464 16.8937 16.0203 16.4368 16.3127C16.4026 16.3344 16.3569 16.356 16.3112 16.3777L11.9029 18.4028C11.6974 18.5002 11.469 18.5219 11.2634 18.4786L11.4233 18.327C12.1885 17.6014 12.1885 16.4427 11.4233 15.7171L8.22557 12.7066C7.64313 12.1543 6.69523 12.1543 6.10137 12.6957C6.10137 12.6957 6.10137 12.6957 6.08995 12.7066L4.69666 14.0169L4.68524 14.0277Z" fill="white"></path><path d="M7.81439 13.6268L10.6467 16.2908C10.8979 16.5291 10.9893 16.8648 10.8979 17.1788L10.7494 17.677C10.6352 18.056 10.2241 18.2834 9.80154 18.1859C9.71018 18.1643 9.61882 18.121 9.53887 18.0668L5.89576 15.5761C5.45037 15.2729 5.359 14.6881 5.67877 14.2766C5.71304 14.2441 5.73588 14.2008 5.77014 14.1791L6.364 13.616C6.75229 13.2478 7.38042 13.2478 7.78013 13.616L7.81439 13.6268Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Affiliate') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- Download APP -->
          <NuxtLink to="/download-app" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#F90"></rect><path d="M15.2246 4.5H8.77536C7.7971 4.5 7 5.28385 7 6.24584V17.7542C7 18.7162 7.7971 19.5 8.77536 19.5H15.2246C16.2029 19.5 17 18.7162 17 17.7542V6.24584C17 5.28385 16.2029 4.5 15.2246 4.5ZM11.4203 5.07007H12.5797C12.7246 5.07007 12.8696 5.21259 12.8696 5.35511C12.8696 5.49762 12.7246 5.64014 12.5797 5.64014H11.4203C11.2754 5.64014 11.1304 5.49762 11.1304 5.35511C11.1304 5.21259 11.2754 5.07007 11.4203 5.07007ZM12 18.7874C11.6014 18.7874 11.2391 18.4667 11.2391 18.0392C11.2391 17.6473 11.5652 17.291 12 17.291C12.3986 17.291 12.7609 17.6116 12.7609 18.0392C12.7609 18.4667 12.4348 18.7874 12 18.7874ZM15.8043 14.4002C15.8043 15.5048 14.9089 16.4002 13.8043 16.4002H10.1957C9.09108 16.4002 8.19565 15.5048 8.19565 14.4002V8.75C8.19565 7.64543 9.09108 6.75 10.1957 6.75H13.8043C14.9089 6.75 15.8043 7.64543 15.8043 8.75V14.4002Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('Download APP') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>

          <!-- About Us -->
          <NuxtLink to="/about-us" class="menu-item flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#4C9EEA"></rect><path d="M11.99 5.5C11.58 5.5 11.24 5.623 10.95 5.92026C10.64 6.19702 10.5 6.55578 10.5 6.99654C10.5 7.4373 10.64 7.77556 10.95 8.07282C11.24 8.37008 11.58 8.51358 11.99 8.51358C12.39 8.51358 12.78 8.35983 13.07 8.09332C13.36 7.79606 13.5 7.4373 13.5 6.99654C13.5 6.55578 13.36 6.19702 13.07 5.92026C12.78 5.623 12.42 5.5 11.99 5.5Z" fill="white"></path><path d="M10.5 10.8822V17.0771C10.5 17.8611 11.17 18.5 12 18.5C12.83 18.5 13.5 17.8611 13.5 17.0771V10.8822C13.5 10.0981 12.83 9.45925 12 9.45925C11.17 9.46893 10.5 10.0981 10.5 10.8822Z" fill="white"></path></svg>
              </div>
              <span class="text-[14px] text-white">{{ translate('About Us') }}</span>
            </div>
            <ChevronRight class="h-4 w-4 text-white/40" />
          </NuxtLink>
        </div>
      </div>
    </div>

    </div>

    <!-- Desktop View: Classic Dashboard Layout (>= 1024px) -->
    <div class="me-desktop-view hidden lg:block w-full min-w-0 rounded-full  text-white">
    <!-- Top Account Card: Login / Sign Up & Action Buttons -->
    <div class="sticky-header-seal sticky top-[var(--content-sticky-top)] z-20 -mx-1 px-1  pb-1 mb-2">
      <div class="account-card rounded-lg bg-[#141414] px-2 py-3 shadow-sm">
      <div class="px-2">
        <div class="flex items-center gap-1">
          <a
            :href="loginUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[#2b2b2b] rounded-lg border border-[#1fa779] px-4 py-1 text-[12px] font-semibold text-[#1fa779] hover:bg-[#252525] transition-colors"
          >
            {{ translate('Login') }}
          </a>
          <a
            :href="bybetRedirectRegister"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg bg-[var(--main-color)] px-4 py-1 text-[12px] font-bold text-white hover:bg-[#122F25] transition-colors"
          >
            {{ translate('Sign Up') }}
          </a>
        </div>

        <p class="mt-2 text-[12px] text-[#707070]">{{ translate('Hi, please log in/register first.') }}</p>
      </div>
      

      <!-- 4 Quick Actions: Deposit, Withdraw, VIP, Bonus -->
      <div class="grid grid-cols-4 gap-1 mt-4">
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[var(--main-color)] py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          {{ translate('Deposit') }}
        </a>
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[var(--main-color)]  py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          {{ translate('Withdraw') }}
        </a>
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[var(--main-color)]  py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          {{ translate('VIP') }}
        </a>
        <a
          :href="bybetRedirectUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn flex items-center justify-center rounded-lg bg-[var(--main-color)]  py-2 text-[14px] font-semibold text-white transition-colors shadow-sm"
        >
          {{ translate('Bonus') }}
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
        <span class="text-[16px] font-bold text-white">{{ translate('General') }}</span>
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
            <span class="text-[14px] text-white  transition-colors">{{ translate('Betting History') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Bonuses -->
        <NuxtLink to="/explore/bonuses" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded  text-[#ffc83d]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#FFBA00]"></rect><path d="M18.0058 19.5H6.00076C5.56593 19.5 5.16687 19.1208 5.16687 18.58V9.83301H18.8397V18.58C18.8397 19.1208 18.4406 19.5 18.0058 19.5Z" stroke="white"></path><path d="M14.9645 4C14.7711 4 14.5844 4.08 14.4443 4.22667L12.0033 6.78675L9.56229 4.22667C9.4289 4.08 9.23549 4 9.04207 4C6.99455 4 5.33386 5.74672 5.33386 7.88679C5.33386 8.31347 5.66733 8.66681 6.07417 8.66681H17.9324C18.3393 8.66681 18.6728 8.31347 18.6728 7.88679C18.6728 5.74672 17.0121 4 14.9645 4ZM6.9412 7.11343C7.21465 6.30007 7.90827 5.69339 8.74862 5.57338L10.2159 7.11343H6.9412ZM13.7907 7.11343L15.258 5.57338C16.0983 5.68672 16.792 6.30007 17.0654 7.11343H13.7907Z" fill="white"></path><g filter="url(#filter0_b_4992_814)"><path d="M19.6999 12.6664H4.30679C4.13339 12.6664 4 12.4998 4 12.2931V10.073C4 9.66635 4.28012 9.33301 4.61359 9.33301H19.3864C19.7266 9.33301 20 9.66635 20 10.073V12.2931C20 12.4998 19.8599 12.6664 19.6932 12.6664H19.6999Z" fill="white"></path></g><g filter="url(#filter1_b_4992_814)"><path d="M10.4026 9.33301H13.6039V20H10.4026V9.33301Z" fill="white"></path></g><defs><filter id="filter0_b_4992_814" x="0" y="5.33301" width="24" height="11.3335" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"></feGaussianBlur><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4992_814"></feComposite><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4992_814" result="shape"></feBlend></filter><filter id="filter1_b_4992_814" x="6.40259" y="5.33301" width="11.2013" height="18.667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"></feGaussianBlur><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4992_814"></feComposite><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4992_814" result="shape"></feBlend></filter></defs></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Bonuses') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Coupon Center -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center bg-[#F5A46E] rounded text-[#ff8042]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-layer-46"></rect><path d="M20 10.2V7.22C20 6.54 19.42 6 18.71 6H5.29C4.58 6 4 6.55 4 7.22V10.2C5.05 10.2 5.89 11.01 5.89 12C5.89 12.99 5.04 13.8 4 13.8V16.78C4 17.46 4.58 18 5.29 18H18.71C19.42 18 20 17.45 20 16.78V13.8C18.95 13.8 18.11 12.99 18.11 12C18.11 11.01 18.96 10.2 20 10.2ZM9.68 15C9.68 15.33 9.4 15.6 9.05 15.6C8.7 15.6 8.42 15.33 8.42 15V9C8.42 8.67 8.7 8.4 9.05 8.4C9.4 8.4 9.68 8.67 9.68 9V15Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white transition-colors">{{ translate('Coupon Center') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Referral Bonus -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded  text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#428ACD]"></rect><path d="M19.8866 11.4559C19.8866 11.6743 19.7729 11.6743 19.6592 11.7836L14.7841 16.3634C14.443 16.5819 13.8768 16.3634 13.6495 16.0357C13.5701 15.9038 13.5315 15.7513 13.5358 15.5988V13.0903C10.5845 11.4538 6.72605 12.3257 5.02307 15.0546C4.44826 15.9389 4.13512 16.9571 4.11367 18C4 17.5651 4 17.1281 4 16.5819C4.00214 12.2185 7.86279 8.7269 12.5149 8.7269H13.5358V6.76469C13.5251 6.35246 13.864 6.01031 14.2929 6C14.3058 6 14.3187 6 14.3315 6C14.5567 6 14.6704 6 14.7841 6.10924L19.552 10.3696C19.9531 10.5613 20.1139 11.0292 19.9144 11.4146C19.908 11.4291 19.8994 11.4414 19.8909 11.4559H19.8844H19.8866Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Referral Bonus') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

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
            <span class="text-[14px] text-white  transition-colors">{{ translate('Streamer Broadcast') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Match Predictions -->
        <NuxtLink to="/explore/live-plaza/expert-predictions" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d45] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#1EB1A5" class=""></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M4.81528 14.6522C4.34665 15.1208 4.34665 15.8806 4.81528 16.3492C5.28391 16.8178 6.04371 16.8178 6.51233 16.3492L9.05892 13.8026L10.8432 15.5827C11.0686 15.8076 11.3742 15.9337 11.6926 15.9332C12.011 15.9327 12.3162 15.8057 12.5409 15.5801L16.7999 11.3048V13.2C16.7999 13.8627 17.3372 14.4 17.9999 14.4C18.6627 14.4 19.1999 13.8627 19.1999 13.2V8.39995C19.1999 8.23554 19.1669 8.07886 19.107 7.93618C19.0482 7.79563 18.9615 7.66401 18.8468 7.54981C18.6171 7.32094 18.3179 7.20441 18.0173 7.20008L17.9982 7.19995H13.1999C12.5372 7.19995 11.9999 7.73721 11.9999 8.39995C11.9999 9.06269 12.5372 9.59995 13.1999 9.59995H15.1107L11.6881 13.0355L9.90545 11.257C9.43666 10.7894 8.67763 10.7898 8.20939 11.258L4.81528 14.6522Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Match Predictions') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Results -->
        <button type="button" class="menu-item flex items-center justify-between group text-left w-full cursor-pointer" @click="showDemoMessage('Match Results')">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4d2a12] text-[#ff9800]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#FF6161]"></rect><path d="M18.3588 12.6387H13.2726C12.9197 12.6387 12.6336 12.9247 12.6336 13.2775V18.3612C12.6336 18.714 12.9197 19 13.2726 19H18.3588C18.7117 19 18.9978 18.714 18.9978 18.3612V13.2775C18.9978 12.9247 18.7117 12.6387 18.3588 12.6387Z" fill="white"></path><path d="M15.0147 9.99625C15.5224 9.99625 15.9776 9.83 16.3628 9.5675L17.9736 11.2562C18.2099 11.51 18.5864 11.51 18.8227 11.2738C19.0591 11.02 19.0591 10.635 18.8227 10.39L17.1419 8.64C17.317 8.29 17.4046 7.905 17.4046 7.5025C17.4046 6.12875 16.3278 5.00875 15.0059 5.00875C13.6841 5.00875 12.6073 6.12875 12.6073 7.5025C12.6073 8.87625 13.6841 9.99625 15.0059 9.99625H15.0147ZM15.0147 6.25125C15.68 6.25125 16.214 6.8025 16.214 7.5025C16.214 8.2025 15.68 8.75375 15.0147 8.75375C14.3494 8.75375 13.8154 8.2025 13.8154 7.5025C13.8154 6.8025 14.3494 6.25125 15.0147 6.25125Z" fill="white"></path><path d="M10.7252 12.6387H5.63905C5.28611 12.6387 5 12.9247 5 13.2775V18.3612C5 18.714 5.28611 19 5.63905 19H10.7252C11.0781 19 11.3642 18.714 11.3642 18.3612V13.2775C11.3642 12.9247 11.0781 12.6387 10.7252 12.6387Z" fill="white"></path><path d="M10.7252 5H5.63905C5.28611 5 5 5.28598 5 5.63875V10.7225C5 11.0753 5.28611 11.3612 5.63905 11.3612H10.7252C11.0781 11.3612 11.3642 11.0753 11.3642 10.7225V5.63875C11.3642 5.28598 11.0781 5 10.7252 5Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Results') }}</span>
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
        <span class="text-[16px] font-bold text-white">{{ translate('Game Settings') }}</span>
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
            <span class="text-[14px] text-white">{{ translate('Odds Settings') }}</span>
          </div>
          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-1 rounded bg-black px-2 py-0.5 text-[14px] text-white hover:bg-[#282a29] transition-colors cursor-pointer"
              @click="isOddsDropdownOpen = !isOddsDropdownOpen"
            >
              <span>{{ translate(selectedOdds) }}</span>
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
                {{ translate(opt) }}
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
            <span class="text-[14px] text-white  transition-colors">{{ translate('Event Settings') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Event Settings -->
        <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#FD9602] text-white/90">
              <em data-testid="mine-menu-liveScore-icon" class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#FD9602" class=""></rect><path d="M13.6153 6.61526C13.6153 5.72311 12.8921 4.99988 12 4.99988C11.1078 4.99988 10.3846 5.72311 10.3846 6.61526V17.3845C10.3846 18.2766 11.1078 18.9999 12 18.9999C12.8921 18.9999 13.6153 18.2766 13.6153 17.3845V6.61526Z" fill="white"></path><path d="M18.9999 10.1153C18.9999 9.22311 18.2767 8.49988 17.3845 8.49988C16.4924 8.49988 15.7692 9.22311 15.7692 10.1153V17.3845C15.7692 18.2766 16.4924 18.9999 17.3845 18.9999C18.2767 18.9999 18.9999 18.2766 18.9999 17.3845V10.1153Z" fill="white"></path><path d="M8.23076 13.6153C8.23076 12.7231 7.50753 11.9999 6.61538 11.9999C5.72323 11.9999 5 12.7231 5 13.6153V17.3845C5 18.2766 5.72323 18.9999 6.61538 18.9999C7.50753 18.9999 8.23076 18.2766 8.23076 17.3845V13.6153Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Livescore') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </a>

        <!-- Theme -->
        <div class="menu-item flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#3a1a54] text-[#b388ff]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#9747FF]"></rect><path d="M13 6C13 5.44772 12.5523 5 12 5H5C4.44772 5 4 5.44772 4 6V13C4 13.5523 4.44772 14 5 14H12C12.5523 14 13 13.5523 13 13V6Z" fill="white"></path><path d="M20 16C20 15.4477 19.5523 15 19 15H5C4.44772 15 4 15.4477 4 16V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V16Z" fill="white"></path><path d="M20 6C20 5.44772 19.5523 5 19 5H15C14.4477 5 14 5.44772 14 6V8C14 8.55228 14.4477 9 15 9H19C19.5523 9 20 8.55228 20 8V6Z" fill="white"></path><path d="M20 11C20 10.4477 19.5523 10 19 10H15C14.4477 10 14 10.4477 14 11V13C14 13.5523 14.4477 14 15 14H19C19.5523 14 20 13.5523 20 13V11Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white">{{ translate('Theme') }}</span>
          </div>
          <!-- Toggle Pill -->
          <div class="flex items-center rounded-full bg-black p-0.5 text-[14px]">
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="selectedTheme === 'International' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white '"
              @click="selectedTheme = 'International'"
            >
              {{ translate('International') }}
            </button>
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="selectedTheme === 'Asia' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white '"
              @click="selectedTheme = 'Asia'"
            >
              {{ translate('Asia') }}
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Accordion 4: System Settings -->
    <div class="section-card rounded-lg bg-[#141414]  px-2 py-3 mb-2 shadow-sm">
      <button
        type="button"
        class="flex w-full mb-2 items-center justify-between text-left cursor-pointer select-none"
        @click="toggleSection('systemSettings')"
      >
        <span class="text-[16px] font-bold text-white">{{ translate('System Settings') }}</span>
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
            <span class="text-[14px] text-white  transition-colors">{{ translate('Language') }}</span>
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
            <span class="text-[14px] text-white  transition-colors">{{ translate('Time Zone') }}</span>
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
            <span class="text-[14px] text-white">{{ translate('Mode') }}</span>
          </div>
          <!-- Segmented Toggle -->
          <div class="flex items-center rounded-full bg-black p-0.5 text-[14px]">
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="themePreference === 'light' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white '"
              :aria-pressed="themePreference === 'light'"
              @click="setThemePreference('light')"
            >
              {{ translate('Light') }}
            </button>
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="themePreference === 'dark' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white '"
              :aria-pressed="themePreference === 'dark'"
              @click="setThemePreference('dark')"
            >
              {{ translate('Dark') }}
            </button>
            <button
              type="button"
              class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all cursor-pointer"
              :class="themePreference === 'auto' ? 'bg-[var(--main-color)] text-white font-bold shadow' : 'text-white '"
              :aria-pressed="themePreference === 'auto'"
              @click="setThemePreference('auto')"
            >
              {{ translate('Auto') }}
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
        <span class="text-[16px] font-bold text-white">{{ translate('Help') }}</span>
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
            <span class="text-[14px] text-white  transition-colors">{{ translate('24/7 Services') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>


        <!-- Tutorial -->
        <NuxtLink to="/tutorial/mock-betting" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#124d35] text-[#34d399]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#80B100]"></rect><path d="M17.275 20H6.70499C5.91499 20 5.27499 19.36 5.27499 18.57V5.43C5.27499 4.64 5.91499 4 6.70499 4H8.13499V9C8.13499 9.16 8.19499 9.3 8.30499 9.4L9.85499 7.85L11.405 9.4C11.515 9.29 11.575 9.15 11.575 9V4H17.295C18.085 4 18.725 4.64 18.725 5.43V18.57C18.725 19.36 18.085 20 17.295 20H17.275ZM15.565 12.43H8.70499C8.31499 12.43 7.99499 12.75 7.99499 13.14C7.99499 13.53 8.31499 13.85 8.70499 13.85H15.565C15.955 13.85 16.275 13.53 16.275 13.14C16.275 12.75 15.955 12.43 15.565 12.43ZM15.565 15.86H8.70499C8.31499 15.86 7.99499 16.18 7.99499 16.57C7.99499 16.96 8.31499 17.28 8.70499 17.28H15.565C15.955 17.28 16.275 16.96 16.275 16.57C16.275 16.18 15.955 15.86 15.565 15.86Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Tutorial') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Game Rules -->
        <NuxtLink to="/game-rules/sports-betting-rules" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4d3c12] text-[#ffc83d]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#FFBA00]"></rect><path d="M11.57 4H17.29C18.08 4 18.72 4.64 18.72 5.43V18.57C18.72 19.36 18.08 20 17.29 20H6.71C5.92 20 5.28 19.36 5.28 18.57V5.43C5.28 4.64 5.92 4 6.71 4H8.14M15.57 12.43H8.71C8.32 12.43 8 12.75 8 13.14C8 13.53 8.32 13.85 8.71 13.85H15.57C15.96 13.85 16.28 13.53 16.28 13.14C16.28 12.75 15.96 12.43 15.57 12.43ZM15.57 15.86H8.71C8.32 15.86 8 16.18 8 16.57C8 16.96 8.32 17.28 8.71 17.28H15.57C15.96 17.28 16.28 16.96 16.28 16.57C16.28 16.18 15.96 15.86 15.57 15.86Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Game Rules') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>
        <!-- Affiliate -->
        <NuxtLink to="/affiliate" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#183a54] text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#428ACD]"></rect><path d="M18.0699 7.57376H18.995C19.5432 7.57376 20 7.98528 20 8.50508V13.1508C20 13.6598 19.5546 14.0822 19.0064 14.0822H17.1906L13.0107 8.46176L12.5196 7.82284L9.53888 9.10069C9.34474 9.18733 9.12775 9.20898 8.92218 9.16567C8.00855 8.9924 7.71162 8.70001 8.00855 8.27767C8.29406 7.86615 9.52746 7.04313 11.6973 5.80859C11.7544 5.7761 11.8115 5.74361 11.8686 5.72196C12.7823 5.32127 13.8215 5.46205 14.9978 6.15513C15.9686 6.72908 16.9964 7.19474 18.0699 7.56293V7.57376Z" fill="white"></path><path d="M4.68524 14.0277C4.27411 13.8978 4.00002 13.5512 4.00002 13.1506V8.5048C4.00002 7.99583 4.44541 7.57349 5.00501 7.57349H7.31194C6.7866 8.01749 6.74091 8.78637 7.22057 9.27368C7.26625 9.317 7.31194 9.36032 7.36904 9.40364C8.09994 9.95593 9.09352 10.1075 9.97289 9.80432L12.2227 9.04627L13.7987 11.1688C13.7987 11.1688 13.8901 11.2554 13.9244 11.3096L16.6881 15.024C16.9964 15.4464 16.8937 16.0203 16.4368 16.3127C16.4026 16.3344 16.3569 16.356 16.3112 16.3777L11.9029 18.4028C11.6974 18.5002 11.469 18.5219 11.2634 18.4786L11.4233 18.327C12.1885 17.6014 12.1885 16.4427 11.4233 15.7171L8.22557 12.7066C7.64313 12.1543 6.69523 12.1543 6.10137 12.6957C6.10137 12.6957 6.10137 12.6957 6.08995 12.7066L4.69666 14.0169L4.68524 14.0277Z" fill="white"></path><path d="M7.81439 13.6268L10.6467 16.2908C10.8979 16.5291 10.9893 16.8648 10.8979 17.1788L10.7494 17.677C10.6352 18.056 10.2241 18.2834 9.80154 18.1859C9.71018 18.1643 9.61882 18.121 9.53887 18.0668L5.89576 15.5761C5.45037 15.2729 5.359 14.6881 5.67877 14.2766C5.71304 14.2441 5.73588 14.2008 5.77014 14.1791L6.364 13.616C6.75229 13.2478 7.38042 13.2478 7.78013 13.616L7.81439 13.6268Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Affiliate') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- Download APP -->
        <NuxtLink to="/download-app" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#4a2612] text-[#ff8042]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="none" class="fill-[#F90]"></rect><path d="M15.2246 4.5H8.77536C7.7971 4.5 7 5.28385 7 6.24584V17.7542C7 18.7162 7.7971 19.5 8.77536 19.5H15.2246C16.2029 19.5 17 18.7162 17 17.7542V6.24584C17 5.28385 16.2029 4.5 15.2246 4.5ZM11.4203 5.07007H12.5797C12.7246 5.07007 12.8696 5.21259 12.8696 5.35511C12.8696 5.49762 12.7246 5.64014 12.5797 5.64014H11.4203C11.2754 5.64014 11.1304 5.49762 11.1304 5.35511C11.1304 5.21259 11.2754 5.07007 11.4203 5.07007ZM12 18.7874C11.6014 18.7874 11.2391 18.4667 11.2391 18.0392C11.2391 17.6473 11.5652 17.291 12 17.291C12.3986 17.291 12.7609 17.6116 12.7609 18.0392C12.7609 18.4667 12.4348 18.7874 12 18.7874ZM15.8043 14.4002C15.8043 15.5048 14.9089 16.4002 13.8043 16.4002H10.1957C9.09108 16.4002 8.19565 15.5048 8.19565 14.4002V8.75C8.19565 7.64543 9.09108 6.75 10.1957 6.75H13.8043C14.9089 6.75 15.8043 7.64543 15.8043 8.75V14.4002Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('Download APP') }}</span>
          </div>
          <ChevronRight class="h-3.5 w-3.5 text-[#555a57]  transition-colors" />
        </NuxtLink>

        <!-- About Us -->
        <NuxtLink to="/about-us" class="menu-item flex items-center justify-between group">
          <div class="flex items-center gap-2.5">
            <div class="grid h-4 w-4 place-items-center rounded bg-[#183a54] text-[#4ea8de]">
              <em class="relative min-h-6 min-w-6 mr-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="8" fill="#4C9EEA" class=""></rect><path d="M11.99 5.5C11.58 5.5 11.24 5.623 10.95 5.92026C10.64 6.19702 10.5 6.55578 10.5 6.99654C10.5 7.4373 10.64 7.77556 10.95 8.07282C11.24 8.37008 11.58 8.51358 11.99 8.51358C12.39 8.51358 12.78 8.35983 13.07 8.09332C13.36 7.79606 13.5 7.4373 13.5 6.99654C13.5 6.55578 13.36 6.19702 13.07 5.92026C12.78 5.623 12.42 5.5 11.99 5.5Z" fill="white"></path><path d="M10.5 10.8822V17.0771C10.5 17.8611 11.17 18.5 12 18.5C12.83 18.5 13.5 17.8611 13.5 17.0771V10.8822C13.5 10.0981 12.83 9.45925 12 9.45925C11.17 9.46893 10.5 10.0981 10.5 10.8822Z" fill="white"></path></svg></em>
            </div>
            <span class="text-[14px] text-white  transition-colors">{{ translate('About Us') }}</span>
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
