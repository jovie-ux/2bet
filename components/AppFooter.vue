<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { useSiteTheme } from '~/composables/useSitePreferences'

const { effectiveTheme } = useSiteTheme()

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
    ? '/brand/bybet-footer-logo-dark.webp'
    : '/brand/bybet-logo.webp'
})

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

updateServerTime()

onMounted(() => {
  updateServerTime()
  clockTimer = setInterval(updateServerTime, 1000)
})

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<template>
  <footer id="support" class="app-footer w-full text-[#8e9491] select-none border-t border-white/[0.04] mt-4 ">
    <div class="footer-inner max-w-5xl mx-auto px-4 sm:px-6  pb-20 sm:pb-12">
      <!-- Section 1: Special Promotion -->
      <div class="footer-accordion-item border-b border-white/[0.06] py-3.5">
        <button
          type="button"
          class="flex w-full items-center justify-between text-left cursor-pointer group"
          :aria-expanded="openSections.specialPromotion"
          @click="toggleSection('specialPromotion')"
        >
          <span class="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#1fa779] transition-colors">Special Promotion</span>
          <ChevronUp v-if="openSections.specialPromotion" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.specialPromotion" class="pt-3 pb-1 text-[13px] sm:text-[14px] text-[#8e9491] space-y-2">
            <div>
              <NuxtLink to="/explore/bonuses" class="hover:text-white transition-colors inline-block">
                Your Deposit. Your Reward.
              </NuxtLink>
            </div>
            <div>
              <NuxtLink to="/explore/bonuses" class="hover:text-white transition-colors inline-block">
                Latest Deals
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
          <span class="text-[14px] sm:text-[15px] font-bold text-white uppercase tracking-wider group-hover:text-[#1fa779] transition-colors">HELP</span>
          <ChevronUp v-if="openSections.help" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.help" class="pt-3 pb-1 text-[13px] sm:text-[14px] text-[#8e9491] space-y-2">
            <div><NuxtLink to="/explore/egames/customer-service" class="hover:text-white transition-colors inline-block">24/7 Services</NuxtLink></div>
            <div><NuxtLink to="/game-rules/sports-betting-rules" class="hover:text-white transition-colors inline-block">Game Rules</NuxtLink></div>
            <div><NuxtLink to="/responsible-gaming" class="hover:text-white transition-colors inline-block">Responsible Gaming</NuxtLink></div>
            <div><NuxtLink to="/terms-of-use" class="hover:text-white transition-colors inline-block">Terms of Use</NuxtLink></div>
            <div><NuxtLink to="/privacy-policy" class="hover:text-white transition-colors inline-block">Privacy Policy</NuxtLink></div>
            <div><NuxtLink to="/about-us" class="hover:text-white transition-colors inline-block">About Us</NuxtLink></div>
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
          <span class="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#1fa779] transition-colors">Responsibility & Reputation</span>
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
          <span class="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#1fa779] transition-colors">About Us</span>
          <ChevronUp v-if="openSections.aboutUs" class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
          <ChevronDown v-else class="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
        </button>

        <Transition name="accordion">
          <div v-show="openSections.aboutUs" class="pt-4 pb-2 text-[13px] sm:text-[13.5px] text-[#8e9491] leading-relaxed space-y-3">
            <!-- Brand Logo -->
            <NuxtLink to="/" class="inline-block mb-1">
              <img
                :src="footerBrandLogo"
                alt="ByBet"
                class="h-6 sm:h-7 w-auto object-contain"
                loading="lazy"
              />
            </NuxtLink>

            <p>
              ByBet is an online sports betting and gaming platform designed to provide users with a secure, reliable, and premium wagering experience. We uphold the highest standards of integrity, transparency, and responsible gaming—earning the trust of sports fans and bettors alike.
            </p>
            <p>
              Our platform is designed with the user in mind, offering secure technology, seamless navigation, and competitive markets across a wide range of sports and gaming options. ByBet continuously invests in innovation, compliance, and customer protection to ensure a fair and enjoyable experience for every player.
            </p>
            <p>
              At ByBet, player safety and data security are paramount. We implement robust safeguards and follow applicable regulatory requirements to protect personal information and transactions, providing our users with confidence and peace of mind.
            </p>
            <p>
              Join ByBet today and experience a trusted platform that elevates your sports betting journey to the next level.
            </p>

            <span class="font-bold text-white pt-2 text-[14px]">Cookies & User Experience</span>
            <p>
              To enhance your experience and improve platform performance, ByBet uses cookies and similar technologies to collect information from our servers when you access or use the website. By registering with ByBet or continuing to use the platform, you consent to our use of cookies in accordance with our Cookie Policy.
            </p>
            <p>
              Please note that deleting or disabling cookies may limit your access to certain features or areas of the platform and may affect overall functionality.
            </p>
          </div>
        </Transition>
      </div>


      <!-- Server Time & Copyright -->
      <div class="text-[11px] sm:text-[12px] mt-5 text-[#717673] space-y-1 mb-8">
        <p>Server Time: {{ serverTime }} (GMT+08:00)</p>
        <p>Copyright © {{ new Date().getFullYear() }} ByBet Group. All Rights Reserved.</p>
      </div>

      <!-- Regulatory / Compliance Footer Block (Centered) -->
      <div class="compliance-footer flex flex-col items-center justify-center text-center gap-3">
        <!-- Badges: Circular PAGCOR + 21+ Box -->
        <div class="flex items-center justify-center gap-3">
          <div class=" rounded-full bg-white flex items-center justify-center shadow">
            <img
              src="/responsible-gaming/pagcor.webp"
              alt="PAGCOR Regulated"
              class="h-12 w-12 object-cover"
              loading="lazy"
            />
          </div>
          <div class="h-10 rounded-lg bg-white flex items-center  shadow">
            <img
              src="/responsible-gaming/age-restriction.webp"
              alt="21+ Gambling Can Be Addictive. Know When To Stop."
              class="h-15 w-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Links in Red -->
        <div class="text-[10px] font-bold text-[#c10001] tracking-wide mt-1">
          <a href="https://www.pagcor.ph/regulatory" target="_blank" rel="noopener noreferrer" class="hover:underline">WWW.PAGCOR.PH/REGULATORY</a>
          <span class="mx-2.5">•</span>
          <a href="mailto:keepitfun@pagcor.ph" class="hover:underline">KEEPITFUN@PAGCOR.PH</a>
        </div>

        <!-- Warning in Blue -->
        <p class="text-[12px] font-bold text-[#25408e] max-w-sm uppercase leading-relaxed text-center mt-0.5">
          GAMBLING DOESN'T GUARANTEE EARNINGS OR <br/>FINANCIAL IMPROVEMENT. STAY WITHIN YOUR<br/> LIMITS.
        </p>

        <!-- Hotline image banner -->
        <div class="mt-1 flex items-center justify-center">
          <img
            src="/responsible-gaming/support-hotline.webp"
            alt="Responsible gaming support hotline"
            class="h-15 w-auto object-contain rounded"
            loading="lazy"
          />
        </div>
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
