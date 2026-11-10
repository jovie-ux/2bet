<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'

withDefaults(
  defineProps<{
    title: string
    backTo?: string
    bannerSrc?: string
    bannerAlt?: string
    showDocumentTitle?: boolean
  }>(),
  {
    backTo: '/account/me',
    bannerSrc: '/brand/about-hero-banner.webp',
    bannerAlt: '2Bet',
    showDocumentTitle: true,
  }
)
</script>

<template>
  <div class="legal-doc-page max-w-4xl mx-auto pb-16 text-white">
    <!-- Top Universal Emerald Subpage Header -->
    <SubpageHeader
      :title="title"
      :back-to="backTo"
      class="mb-2.5 sm:mb-3"
    />

    <div class="px-2.5 sm:px-4">
      <!-- Main Content Card -->
      <div class="doc-card rounded-2xl bg-[#141414] p-4 sm:p-6 lg:p-8 border border-white/5 shadow-md">
        <!-- Top Hero Banner -->
        <div class="hero-banner-wrapper mb-6 overflow-hidden rounded-2xl">
          <img
            :src="bannerSrc"
            :alt="bannerAlt"
            class="w-full h-auto object-cover rounded-2xl block"
            loading="eager"
          />
        </div>

        <!-- Centered Document Title -->
        <h2 v-if="showDocumentTitle" class="text-center font-bold text-base sm:text-lg text-white mb-6">
          {{ title }}
        </h2>

        <!-- Document Body Content -->
        <div class="doc-body text-[#959799] text-xs sm:text-[13.5px] leading-relaxed space-y-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-doc-page {
  opacity: 1 !important;
  transform: none !important;
}

.doc-card {
  word-break: break-word;
}
</style>
