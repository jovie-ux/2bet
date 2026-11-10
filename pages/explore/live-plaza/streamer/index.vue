<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

useAppSeo({
  title: 'Transmissões ao Vivo de Partidas e Mesas de Jogos | 2bet',
  description: 'Assista a partidas e jogos em tempo real com streamers oficiais na 2bet Brasil. Interaja com a comunidade e confira dicas exclusivas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Praça ao Vivo', path: '/live-plaza/home' },
    { name: 'Streamers', path: '/live-plaza/streamer' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '2Bet Live Streamers',
    url: 'https://2bet.com/live-plaza/streamer',
  },
})

const router = useRouter()
const { translate } = useSiteLocale()

const handleAllStreamersClick = (): void => {
  router.push('/live-plaza/streamer/all')
}
</script>

<template>
  <div class="live-plaza-streamer-page w-full min-w-0 pb-16 text-white">
    <!-- Reusable Top SEO Header Bar -->
    <SeoHeader
      sticky
      :title="translate('Streamer')"
      :show-back="false"
    />

    <!-- Section 1: You may be interested -->
    <section class="streamer-card rounded-xl bg-[#141414] px-2.5 sm:px-2.5 pt-1.5 mb-2 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm sm:text-[18px] font-bold text-white tracking-tight">
          {{ translate('You may be interested') }}
        </h2>
        <button
          type="button"
          class="all-streamers-btn flex items-center gap-0.5 sm:gap-1 text-[13px] text-white  transition-colors cursor-pointer select-none"
          @click="handleAllStreamersClick"
        >
          <span>{{ translate('All Streamers') }}</span>
          <ChevronRight class="w-3.5 h-3.5 bg-[#232323] rounded-full" />
        </button>
      </div>

      <div class="empty-state-box flex items-center justify-center min-h-[90px] sm:min-h-[110px] text-[18px]  text-[#666] select-none">
        {{ translate('No related streamer') }}
      </div>
    </section>

    <!-- Section 2: Streaming -->
    <section class="streamer-card rounded-xl bg-[#141414] px-2.5 sm:px-2.5 pt-1.5 mb-2 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm sm:text-[18px] font-bold text-white tracking-tight">
          {{ translate('Streaming') }}
        </h2>
      </div>

      <div class="empty-state-box flex items-center justify-center min-h-[220px] sm:min-h-[300px] text-[18px]  text-[#666] select-none">
        {{ translate('No related streamer') }}
      </div>
    </section>
  </div>
</template>

<style scoped>
.live-plaza-streamer-page {
  max-width: 100%;
}
</style>

