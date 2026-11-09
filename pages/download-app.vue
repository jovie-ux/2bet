<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'

const { showDemoMessage } = useDemoInteraction()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

useAppSeo({
  title: 'Baixar Aplicativo Oficial — Download APK no Celular | 2bet',
  description: 'Baixe o aplicativo 2bet oficial para celular Android e iOS. Tenha acesso rápido a apostas esportivas, jogos de cassino e suporte 24 horas.',
  keywords: '2bet app, baixar 2bet, 2bet apk, app de apostas, cassino mobile',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Baixar Aplicativo', path: '/download-app' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '2bet Mobile App',
    operatingSystem: 'Android, iOS',
    applicationCategory: 'GameApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
  },
})

const selectedPlatform = ref<'ios' | 'android'>('ios')

onMounted(() => {
  if (import.meta.client) {
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) {
      selectedPlatform.value = 'android'
    } else {
      selectedPlatform.value = 'ios'
    }
  }
})

const handleGooglePlay = (): void => {
  showDemoMessage('Downloading 2Bet Official Android App from Google Play...')
  if (import.meta.client) {
    window.open('https://play.google.com/store/apps/details?id=com.bygame.sports&hl=en')
  }
}

const handleAppStore = (): void => {
  showDemoMessage('Redirecting to 2Bet on the Apple App Store...')
  if (import.meta.client) {
    window.open('https://apps.apple.com/ph/app/bygame/id6748813909')
  }
}
</script>

<template>
  <div class="download-app-page max-w-4xl mx-auto pb-16 text-white">
    <!-- Top Universal Emerald Subpage Header -->
    <SubpageHeader
      title="Download APP"
      back-to="/explore/account/me"
      class="mb-2.5 sm:mb-3"
    />

    <div class="px-2 sm:px-4">
      <!-- Main Visual & Download Card matching mobile screenshot -->
      <div class="app-card rounded-[22px] bg-[#141514] border border-white/5 p-3.5 sm:p-6 lg:p-8 mb-5 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
        <!-- Center Player Graphic with "LEAGUE" Background -->
        <div class="w-full flex items-center justify-center pt-1 pb-3 sm:py-4">
          <img
            src="/images/app/league-player.webp"
            alt="2Bet App League"
            class="w-full max-w-[340px] sm:max-w-[440px] h-auto object-contain select-none pointer-events-none drop-shadow-2xl mx-auto block"
            loading="eager"
          />
        </div>

        <!-- Download Action Area -->
        <div class="w-full pt-1 sm:pt-2">
          <!-- Mobile View: Single Platform Card matching user screenshot -->
          <div class="sm:hidden w-full">
            <!-- iOS Card (matches screenshot) -->
            <div
              class="app-store-pill flex items-center justify-between rounded-2xl bg-[#1e1f1e] border border-white/10 px-4 py-3 shadow-md mb-2"
            >
              <div class="text-left pr-2">
                <h2 class="text-[15px] font-bold text-white tracking-tight leading-tight">Apple Store</h2>
                <p class="text-[12px] text-[#8e918f] font-normal leading-tight mt-0.5">iOS Download</p>
              </div>

              <button
                type="button"
                class="app-badge-btn flex items-center gap-2 rounded-[10px] bg-black px-3.5 py-1.5 border border-white/25 active:scale-95 transition-all cursor-pointer shadow-lg shrink-0"
                aria-label="Download on the App Store"
                @click="handleAppStore"
              >
                <!-- Official Apple Logo SVG -->
                <svg class="h-6 w-6 shrink-0 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.09-7.65-7.94-11.86-14.54-6.41-10.08-11.41-21.47-15-34.18-3.59-12.7-5.39-24.52-5.39-35.45 0-14.07 3.51-25.75 10.53-35.04 7.02-9.29 16.03-14.05 27.03-14.29 5.86 0 12.18 1.48 18.96 4.45 6.78 2.97 11.2 4.51 13.26 4.62 1.5.08 5.66-1.52 12.48-4.8 6.82-3.28 13.06-4.78 18.72-4.5 13.88.75 25.07 6.13 33.56 16.14-12.22 7.42-18.17 17.65-17.86 30.68.3 10.3 4.22 18.84 11.75 25.62 7.54 6.78 16.64 10.59 27.31 11.44-2.14 6.53-4.69 13.04-7.65 19.52zM119.22 33.64c0-7.25 2.62-14.28 7.86-21.08 5.24-6.8 11.85-11.39 19.82-13.76.62 2.14.93 4.3.93 6.48 0 7.2-2.73 14.22-8.19 21.05-5.46 6.83-12.2 11.47-20.22 13.91-.07-2.2-.2-4.4-.2-6.6z" />
                </svg>
                <div class="text-left leading-none">
                  <span class="block text-[8.5px] font-medium text-white/80 tracking-tight">Download on the</span>
                  <span class="block text-[14px] font-bold text-white tracking-tight -mt-0.5 font-sans">App Store</span>
                </div>
              </button>
            </div>

            <!-- Android Card -->
            <div
              class="app-store-pill flex items-center justify-between rounded-2xl bg-[#1e1f1e] border border-white/10 px-4 py-3 shadow-md"
            >
              <div class="text-left pr-2">
                <h2 class="text-[15px] font-bold text-white tracking-tight leading-tight">Google Play</h2>
                <p class="text-[12px] text-[#8e918f] font-normal leading-tight mt-0.5">Android Download</p>
              </div>

              <button
                type="button"
                class="app-badge-btn flex items-center gap-2 rounded-[10px] bg-black px-3.5 py-1.5 border border-white/25 active:scale-95 transition-all cursor-pointer shadow-lg shrink-0"
                aria-label="Get it on Google Play"
                @click="handleGooglePlay"
              >
                <!-- Official Google Play Logo SVG -->
                <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186A2.298 2.298 0 0 1 3 20.627V3.373c0-.62.23-1.19.609-1.559z" fill="#00D2FF"/>
                  <path d="M17.37 8.423l-3.578 3.577 3.578 3.577 4.08-2.317a1.442 1.442 0 0 0 0-2.52l-4.08-2.317z" fill="#FFCE00"/>
                  <path d="M3.609 22.186l10.183-10.186 3.578 3.577-11.458 6.51a2.127 2.127 0 0 1-2.303.099z" fill="#FF3A44"/>
                  <path d="M3.609 1.814c.73-.418 1.62-.387 2.303.099l11.458 6.51-3.578 3.577L3.609 1.814z" fill="#00E676"/>
                </svg>
                <div class="text-left leading-none">
                  <span class="block text-[8px] font-medium text-white/80 uppercase tracking-tight">GET IT ON</span>
                  <span class="block text-[13.5px] font-bold text-white tracking-tight -mt-0.5 font-sans">Google Play</span>
                </div>
              </button>
            </div>

            <!-- Subtle Platform Toggle for testing/accessibility -->
            <!-- <div class="flex items-center justify-center mt-2.5">
              <button
                type="button"
                class="text-[11.5px] font-medium text-[#1fa779] hover:text-[#32d49a] transition-colors cursor-pointer select-none"
                @click="selectedPlatform = selectedPlatform === 'ios' ? 'android' : 'ios'"
              >
                {{ selectedPlatform === 'ios' ? 'Looking for Android? Switch to Google Play' : 'Looking for iOS? Switch to Apple Store' }}
              </button>
            </div> -->
          </div>

          <!-- Desktop View: Both cards displayed side-by-side -->
          <div class="hidden sm:grid grid-cols-2 gap-3.5 w-full">
            <!-- Apple Store Card -->
            <div class="app-store-pill flex items-center justify-between rounded-2xl bg-[#1e1f1e] border border-white/10 px-4 py-3 shadow-md">
              <div class="text-left pr-2">
                <h2 class="text-[15px] font-bold text-white tracking-tight leading-tight">Apple Store</h2>
                <p class="text-[12px] text-[#8e918f] font-normal leading-tight mt-0.5">iOS Download</p>
              </div>

              <button
                type="button"
                class="app-badge-btn flex items-center gap-2 rounded-[10px] bg-black px-3.5 py-1.5 border border-white/25 hover:border-white/40 active:scale-95 transition-all cursor-pointer shadow-lg shrink-0"
                aria-label="Download on the App Store"
                @click="handleAppStore"
              >
                <svg class="h-6 w-6 shrink-0 fill-white" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.09-7.65-7.94-11.86-14.54-6.41-10.08-11.41-21.47-15-34.18-3.59-12.7-5.39-24.52-5.39-35.45 0-14.07 3.51-25.75 10.53-35.04 7.02-9.29 16.03-14.05 27.03-14.29 5.86 0 12.18 1.48 18.96 4.45 6.78 2.97 11.2 4.51 13.26 4.62 1.5.08 5.66-1.52 12.48-4.8 6.82-3.28 13.06-4.78 18.72-4.5 13.88.75 25.07 6.13 33.56 16.14-12.22 7.42-18.17 17.65-17.86 30.68.3 10.3 4.22 18.84 11.75 25.62 7.54 6.78 16.64 10.59 27.31 11.44-2.14 6.53-4.69 13.04-7.65 19.52zM119.22 33.64c0-7.25 2.62-14.28 7.86-21.08 5.24-6.8 11.85-11.39 19.82-13.76.62 2.14.93 4.3.93 6.48 0 7.2-2.73 14.22-8.19 21.05-5.46 6.83-12.2 11.47-20.22 13.91-.07-2.2-.2-4.4-.2-6.6z" />
                </svg>
                <div class="text-left leading-none">
                  <span class="block text-[8.5px] font-medium text-white/80 tracking-tight">Download on the</span>
                  <span class="block text-[14px] font-bold text-white tracking-tight -mt-0.5 font-sans">App Store</span>
                </div>
              </button>
            </div>

            <!-- Google Play Card -->
            <div class="app-store-pill flex items-center justify-between rounded-2xl bg-[#1e1f1e] border border-white/10 px-4 py-3 shadow-md">
              <div class="text-left pr-2">
                <h2 class="text-[15px] font-bold text-white tracking-tight leading-tight">Google Play</h2>
                <p class="text-[12px] text-[#8e918f] font-normal leading-tight mt-0.5">Android Download</p>
              </div>

              <button
                type="button"
                class="app-badge-btn flex items-center gap-2 rounded-[10px] bg-black px-3.5 py-1.5 border border-white/25 hover:border-white/40 active:scale-95 transition-all cursor-pointer shadow-lg shrink-0"
                aria-label="Get it on Google Play"
                @click="handleGooglePlay"
              >
                <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186A2.298 2.298 0 0 1 3 20.627V3.373c0-.62.23-1.19.609-1.559z" fill="#00D2FF"/>
                  <path d="M17.37 8.423l-3.578 3.577 3.578 3.577 4.08-2.317a1.442 1.442 0 0 0 0-2.52l-4.08-2.317z" fill="#FFCE00"/>
                  <path d="M3.609 22.186l10.183-10.186 3.578 3.577-11.458 6.51a2.127 2.127 0 0 1-2.303.099z" fill="#FF3A44"/>
                  <path d="M3.609 1.814c.73-.418 1.62-.387 2.303.099l11.458 6.51-3.578 3.577L3.609 1.814z" fill="#00E676"/>
                </svg>
                <div class="text-left leading-none">
                  <span class="block text-[8px] font-medium text-white/80 uppercase tracking-tight">GET IT ON</span>
                  <span class="block text-[13.5px] font-bold text-white tracking-tight -mt-0.5 font-sans">Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-app-page {
  opacity: 1 !important;
  transform: none !important;
}

.app-card {
  word-break: break-word;
}

.app-store-pill {
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.app-store-pill:hover {
  border-color: rgba(255, 255, 255, 0.16);
}
</style>
