<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { useSiteLocale, useSiteTheme } from '~/composables/useSitePreferences'

const { effectiveTheme } = useSiteTheme()
const { translate } = useSiteLocale()

const partnerLogos = computed(() => {
  const isLight = effectiveTheme.value === 'light'
  return [
    {
      name: 'DPO DPS',
      src: '/responsible-gaming/dpo-dps.webp',
      heightClass: 'h-7',
    },
    {
      name: 'GamCare',
      src: isLight
        ? '/responsible-gaming/gamcare-light.webp'
        : '/responsible-gaming/gamcare-dark.webp',
      heightClass: 'h-6',
    },
    {
      name: 'Be Gamble Aware',
      src: isLight
        ? '/responsible-gaming/be-gamble-aware-light.webp'
        : '/responsible-gaming/be-gamble-aware-dark.webp',
      heightClass: 'h-6',
    },
    {
      name: 'Technical Systems Testing',
      src: isLight
        ? '/responsible-gaming/technical-systems-testing-light.webp'
        : '/responsible-gaming/technical-systems-testing-dark.webp',
      heightClass: 'h-7',
    },
  ]
})

const footerBrandLogo = computed(() => {
  return effectiveTheme.value === 'light'
    ? '/brand/2bet-light.webp'
    : '/brand/2bet-dark.webp'
})

const legalLogos = [
  { name: 'ONJN', src: '/footer-logos/onjn.svg', width: 32, height: 32 },
  { name: '18+', src: '/footer-logos/18-plus.svg', width: 32, height: 32 },
  { name: 'IBIA', src: '/footer-logos/ibia.svg', width: 129, height: 32 },
  { name: 'Joc Responsabil', src: '/footer-logos/joc-responsabil.svg', width: 34, height: 32 },
  { name: 'Rombet', src: '/footer-logos/rombet.svg', width: 108, height: 32 },
  { name: 'BetBlocker', src: '/footer-logos/betblocker.svg', width: 112, height: 32 },
]

const consumerLogos = [
  { name: 'ANPC', src: '/footer-logos/anpc.avif', width: 193, height: 55 },
  { name: 'SAL — Alternative Dispute Resolution', src: '/footer-logos/sal.svg', width: 175, height: 50 },
]

const openSections = reactive({
  specialPromotion: true,
  help: true,
  responsibility: true,
  aboutUs: true,
})

const toggleSection = (key: keyof typeof openSections): void => {
  openSections[key] = !openSections[key]
}

// Real-time GMT+8 clock
const serverTime = ref('')
let clockTimer: ReturnType<typeof setInterval> | undefined

const updateServerTime = (): void => {
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const gmt8 = new Date(utc + 3600000 * 8)
  const hours = String(gmt8.getHours()).padStart(2, '0')
  const minutes = String(gmt8.getMinutes()).padStart(2, '0')
  const seconds = String(gmt8.getSeconds()).padStart(2, '0')
  serverTime.value = `${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateServerTime()
  clockTimer = setInterval(updateServerTime, 1000)
})

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<template>
  <footer id="support" class="app-footer  w-full text-[#8e9491] select-none border-t border-white/[0.04] mt-1 sm:mt-4 px-3 sm:px-0">
    <div class="footer-inner max-w-5xl mx-auto bg-[#141414] sm:bg-transparent rounded-xl px-4 sm:px-6  pb-20 sm:pb-12">
      <!-- Section 1: Special Promotion -->
      <div class="footer-accordion-item border-b border-white/[0.06] py-3.5">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer group"
          :aria-expanded="openSections.specialPromotion"
          @click="toggleSection('specialPromotion')"
        >
          <span class="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#1fa779] transition-colors">{{ translate('Special Promotion') }}</span>
          <ChevronUp v-if="openSections.specialPromotion" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.specialPromotion" class="pt-3 pb-1 text-[13px] sm:text-[14px] text-[#8e9491] space-y-2">
            <div>
              <NuxtLink to="/explore/bonus/share-and-earn" class="hover:text-white transition-colors inline-block">
                {{ translate('分享賺錢計劃') }}
              </NuxtLink>
            </div>
            <div>
              <NuxtLink to="/explore/bonuses" class="hover:text-white transition-colors inline-block">
                {{ translate('Latest Deals') }}
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Section 2: HELP -->
      <div class="footer-accordion-item border-b border-white/[0.06] py-3.5">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer group"
          :aria-expanded="openSections.help"
          @click="toggleSection('help')"
        >
          <span class="text-[14px] sm:text-[15px] font-bold text-white uppercase tracking-wider group-hover:text-[#1fa779] transition-colors">{{ translate('HELP') }}</span>
          <ChevronUp v-if="openSections.help" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.help" class="pt-3 pb-1 text-[13px] sm:text-[14px] text-[#8e9491] space-y-2">
            <div><NuxtLink to="/explore/egames/customer-service" class="hover:text-white transition-colors inline-block">{{ translate('24/7 Services') }}</NuxtLink></div>
            <div><NuxtLink to="/game-rules/sports-betting-rules" class="hover:text-white transition-colors inline-block">{{ translate('Game Rules') }}</NuxtLink></div>
            <div><NuxtLink to="/responsible-gaming" class="hover:text-white transition-colors inline-block">{{ translate('Responsible Gaming') }}</NuxtLink></div>
            <div><NuxtLink to="/terms-of-use" class="hover:text-white transition-colors inline-block">{{ translate('Terms of Use') }}</NuxtLink></div>
            <div><NuxtLink to="/privacy-policy" class="hover:text-white transition-colors inline-block">{{ translate('Privacy Policy') }}</NuxtLink></div>
            <div><NuxtLink to="/about-us" class="hover:text-white transition-colors inline-block">{{ translate('About Us') }}</NuxtLink></div>
          </div>
        </Transition>
      </div>

      <!-- Section 3: Responsibility & Reputation -->
      <div class="footer-accordion-item border-b border-white/[0.06] py-3.5">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer group"
          :aria-expanded="openSections.responsibility"
          @click="toggleSection('responsibility')"
        >
          <span class="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#1fa779] transition-colors">{{ translate('Responsibility & Reputation') }}</span>
          <ChevronUp v-if="openSections.responsibility" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.responsibility" class="flex flex-wrap items-center gap-6 pt-4 pb-2">
            <img
              v-for="logo in partnerLogos"
              :key="logo.name"
              :src="logo.src"
              :alt="logo.name"
              :class="[logo.heightClass, 'w-auto object-contain opacity-85 hover:opacity-100 transition-opacity']"
              loading="lazy"
            />
          </div>
        </Transition>
      </div>

      <!-- Section 4: About Us -->
      <div class="footer-accordion-item border-b border-white/[0.06] py-3.5">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer group"
          :aria-expanded="openSections.aboutUs"
          @click="toggleSection('aboutUs')"
        >
          <span class="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#1fa779] transition-colors">{{ translate('About Us') }}</span>
          <ChevronUp v-if="openSections.aboutUs" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.aboutUs" class="pt-4 pb-2 text-[13px] sm:text-[13.5px] text-[#8e9491] leading-relaxed space-y-3">
            <!-- Brand Logo -->
            <NuxtLink to="/" class="inline-block mb-1">
              <img
                :src="footerBrandLogo"
                alt="2Bet Logo"
                class="h-6 sm:h-7 w-auto object-contain"
                loading="lazy"
              />
            </NuxtLink>

            <p>
              {{ translate('Since 2011, 2bet has been committed to providing a high-quality betting experience for sports enthusiasts worldwide, upholding the principles of reliability and excellent service. Backed by a gold-standard team of global sports betting experts, 2bet delivers an exceptional daily experience to thousands of users with its professional service standards and state-of-the-art betting system. With its outstanding reputation and stable services, 2bet has established a strong foundation of trust, becoming a legitimate and highly respected brand in the online entertainment and betting industry.') }}
            </p>
            <p>
              {{ translate('2bet offers a wide range of sports betting options from around the world, covering everything from globally renowned events to a diverse selection of sports, ensuring that users have plenty of choices to suit their interests. While enjoying the thrill of the matches, users can also experience greater excitement and entertainment.') }}
            </p>
            <p>
              {{ translate('Currently, 2bet is operated by Excel Network Limited, a company registered in Samoa (registered address: Vaea Street, Le Sanalele Complex, Ground Floor, Saleufi, Apia, Samoa) and holds a legitimate betting license issued under Section 007 of the 2005 Computer Gaming Licensing Act by the Anjouan Offshore Financial Authority, with regulatory oversight managed in collaboration with Anjouan Licensing Services Inc. According to the licensing agreement, 2bet restricts its services in certain regions, including but not limited to Australia, Austria, France, Germany, the United States, and other territories designated as restricted by Anjouan.') }}
            </p>
            <p>
              {{ translate('As 2bet continues to expand, it remains committed to innovation and optimization, striving to set new benchmarks in the sports betting industry while creating a better future for its users. Our customer service team is available 24/7, providing dedicated support via phone to ensure a seamless and secure betting experience anytime, anywhere.') }}
            </p>

            <p>
              {{ translate('In order to improve the user experience, we may use Cookies technology to collect customer information from the server after using this website. If you register at 2bet or continue to use the site, you will be seen as agreeing to our use of cookies.') }}
            </p>
            <p>
              {{ translate('Deleting our cookies or disabling our future cookies will prevent you from using certain areas or features of the platform.') }}
            </p>
          </div>
        </Transition>
      </div>


      <div class="footer-legal-logos" role="group" :aria-label="translate('Legal and responsible gaming logos')">
        <div class="footer-legal-logos__row">
          <img
            v-for="logo in legalLogos"
            :key="logo.name"
            :src="logo.src"
            :alt="logo.name"
            :width="logo.width"
            :height="logo.height"
            loading="lazy"
          >
        </div>
        <div class="footer-legal-logos__row footer-legal-logos__row--consumer">
          <img
            v-for="logo in consumerLogos"
            :key="logo.name"
            :src="logo.src"
            :alt="logo.name"
            :width="logo.width"
            :height="logo.height"
            loading="lazy"
          >
        </div>
      </div>

      <!-- Server Time & Copyright -->
      <div class="text-[11px] sm:text-[12px] mt-5 text-[#717673] space-y-1 mb-8">
        <ClientOnly>
          <p>{{ translate('Server Time') }}: {{ serverTime }} (GMT+08:00)</p>
          <template #fallback>
            <p>{{ translate('Server Time') }}: --:--:-- (GMT+08:00)</p>
          </template>
        </ClientOnly>
        <p>Copyright © {{ new Date().getFullYear() }} 2bet Group. {{ translate('All Rights Reserved.') }}</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  z-index: 20;
  width: 100%;
  color: #8e9491;
}

.footer-inner {
  width: 100%;
}

.footer-legal-logos {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding: 20px 16px;
  border-radius: 8px;
}

.footer-legal-logos__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px 24px;
}

.footer-legal-logos__row img {
  display: block;
  width: auto;
  max-width: 100%;
  height: 32px;
  object-fit: contain;
}

.footer-legal-logos__row--consumer img {
  height: 50px;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Light Mode Overrides */
:global(html[data-theme='light']) .app-footer {
  background: #edf4f0 !important;
  color: #5d7066 !important;
  border-top-color: rgba(3, 98, 66, 0.12) !important;
}

:global(html[data-theme='light']) .app-footer .footer-accordion-item {
  border-bottom-color: rgba(10, 62, 39, 0.08) !important;
}

:global(html[data-theme='light']) .app-footer button span {
  color: #14251d !important;
}

:global(html[data-theme='light']) .app-footer button svg {
  color: #5d7066 !important;
}

:global(html[data-theme='light']) .app-footer button:hover span {
  color: var(--main-color) !important;
}

:global(html[data-theme='light']) .app-footer a {
  color: #5d7066;
}

:global(html[data-theme='light']) .app-footer a:hover {
  color: var(--main-color) !important;
}

:global(html[data-theme='light']) .app-footer h4 {
  color: #14251d !important;
}

:global(html[data-theme='light']) .app-footer p {
  color: #5d7066;
}

:global(html[data-theme='light']) .app-footer .border-white\/\[0\.08\] {
  border-top-color: rgba(10, 62, 39, 0.08) !important;
}
</style>
