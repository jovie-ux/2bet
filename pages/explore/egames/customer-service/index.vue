<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const { closeComments } = useCommentPanel()
const { translate } = useSiteLocale()

useAppSeo({
  title: '24/7 Customer Support & Help Center | 2Bet Philippines',
  description: 'Contact 2Bet 24/7 Customer Support for fast assistance with deposits, withdrawals, promotions, and account verification. Chat live with us anytime.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Help', path: '/explore/help/contact-us' },
    { name: 'Customer Service', path: '/explore/egames/customer-service' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: '2Bet Customer Support',
    url: 'https://2bet.com/explore/egames/customer-service',
  },
})

onMounted(() => {
  closeComments()
})
</script>

<template>
  <div class="customer-service-page w-full min-w-0 pb-16 text-white">
    <!-- Reusable Top SEO Header Bar -->
    <SeoHeader
      sticky
      title="24/7 Services"
      meta-title="24/7 Customer Support & Help Center | 2Bet Philippines"
      description="Contact 2Bet 24/7 Customer Support for fast assistance with deposits, withdrawals, promotions, and account verification. Chat live with us anytime."
      back-to="/explore/account/me"
    />

    <!-- Welcome Greeting Card -->
    <div class="welcome-card flex items-center gap-1 rounded-lg bg-[#141414] p-1 sm:p-2 mb-2 shadow-sm">
      <div class="logo-box h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[var(--main-color)] p-1 flex items-center justify-center shadow-sm">
        <img
          src="/icons/2bet-square.webp"
          alt="2Bet"
          class="h-full w-full object-contain"
        >
      </div>
      <div class="welcome-info flex flex-col justify-center">
        <h2 class="text-[16px] font-bold leading-tight text-white">
          {{ translate('Hi, Dear Customer') }}
        </h2>
        <p class="text-[12px] text-[#7a807d] mt-1">
          {{ translate('Welcome to Customer Service Center') }}
        </p>
      </div>
    </div>

    <!-- Service Options Card -->
    <div class="services-card px-0.5 rounded-md bg-[#141414] overflow-hidden shadow-sm" :aria-label="translate('Customer service channels')">
      <!-- 24/7 Services 1 -->
      <NuxtLink
        to="/explore/egames/customer-service/1"
        class="service-row flex w-full items-center justify-between p-2 text-left transition-colors  group cursor-pointer "
      >
        <div class="flex items-center gap-3">
          <div class="p-[1px] rounded-md shrink-0 bg-[var(--main-color)] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Aæçå½©è²icon"><rect width="32" height="32" rx="8" class="fill-primary"></rect><path id="Vector" d="M16.0054 4C10.1217 4 5.33203 8.99722 5.33203 15.1538C5.33203 18.7518 6.97306 22.0833 9.74812 24.1888L8.1071 26.9872C7.96034 27.2271 7.98702 27.5469 8.17381 27.7601C8.29388 27.9067 8.48067 28 8.65411 28C8.73416 28 8.81421 27.9867 8.89426 27.9467L13.3104 25.9478C14.1909 26.1877 15.0981 26.3076 15.992 26.3076C21.8757 26.3076 26.6654 21.3104 26.6654 15.1538C26.6654 8.99722 21.889 4 16.0054 4ZM20.5549 18.5119C20.5149 18.6185 19.4342 21.0705 16.3523 21.0705C13.0168 21.0705 12.163 18.5652 12.1229 18.4586C11.9895 18.0455 12.2163 17.6058 12.6433 17.4725C13.0702 17.3393 13.5238 17.5658 13.6572 17.9789C13.7106 18.1388 14.271 19.5114 16.3523 19.5114C18.4336 19.5114 19.0606 17.9389 19.0606 17.9256C19.2341 17.5258 19.701 17.3393 20.1146 17.4992C20.5282 17.6591 20.7283 18.1255 20.5549 18.5253V18.5119Z" fill="white"></path></g></svg>
          </div>
          
          <span class="text-[13px] sm:text-[14px] font-medium text-white transition-colors">
            {{ translate('24/7 Services 1') }}
          </span>
        </div>
        <ChevronRight class="h-4 w-4 text-[#7a807d] transition-colors shrink-0" />
      </NuxtLink>

      <!-- Divider -->
      <div class="divider h-px bg-white/30 mx-1 mb-3" />

    </div>
  </div>
</template>

<style scoped>
.customer-service-page {
  max-width: 100%;
}

.service-row {
  user-select: none;
}
</style>
