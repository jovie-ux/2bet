<script setup lang="ts">
import { ChevronLeft, Search, X } from 'lucide-vue-next'

useAppSeo({
  title: 'Todos os Streamers e Canais de Transmissão ao Vivo | 2bet',
  description: 'Explore todos os canais e transmissões ao vivo disponíveis na 2bet Brasil. Acompanhe jogos de futebol, basquete e sessões de cassino.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Praça ao Vivo', path: '/live-plaza/home' },
    { name: 'Streamers', path: '/live-plaza/streamer' },
    { name: 'Todos os Streamers', path: '/live-plaza/streamer/all' },
  ],
})

const router = useRouter()
const { translate } = useSiteLocale()

const searchQuery = ref('')

const handleBack = (): void => {
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/live-plaza/streamer')
  }
}
</script>

<template>
  <div class="live-plaza-all-streamers-page w-full min-w-0 pb-16  text-white">
    <!-- Reusable Top SEO Header Bar -->
    <SeoHeader
      sticky
      :title="translate('All Streamers')"
      back-to="/live-plaza/streamer"
    />

    <!-- Search Section -->
    <section class="search-card rounded-xl bg-[#141414] p-2.5 sm:p-3 mb-2 shadow-sm flex justify-center">
      <div class="relative w-full max-w-[540px] flex items-center">
        <Search class="pointer-events-none absolute left-3 w-3 h-3 text-white" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="translate('Search: Streamer, League, Team, Event...')"
          class="w-full h-6 pl-8 pr-7 rounded-full bg-black  text-[14px] text-white placeholder-white focus:outline-none  "
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute right-2.5 text-[#666666] hover:text-white transition-colors cursor-pointer"
          aria-label="Clear search"
          @click="searchQuery = ''"
        >
          <X class="w-3 h-3" />
        </button>
      </div>
    </section>

    <!-- Main Empty State Card -->
    <section class="streamers-content-card rounded-xl bg-[#141414] p-4 min-h-[320px] sm:min-h-[420px] flex items-center justify-center shadow-sm">
      <div class="text-xs sm:text-[18px] text-[#737373] select-none">
        {{ translate('No related streamer') }}
      </div>
    </section>
  </div>
</template>

<style scoped>
.live-plaza-all-streamers-page {
  max-width: 100%;
}
</style>

