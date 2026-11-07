<script setup lang="ts">
interface Props {
  text?: string
  image?: string
  showReset?: boolean
  resetText?: string
}

withDefaults(defineProps<Props>(), {
  text: 'This is no game currently.',
  image: '/images/empty/no-games.webp',
  showReset: false,
  resetText: 'Reset Filters',
})

const { translate } = useSiteLocale()

defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <div class="game-empty-state my-12 flex flex-col items-center justify-center text-center px-4 select-none">
    <img
      :src="image"
      :alt="translate('Empty state')"
      class="w-48 sm:w-56 max-w-full h-auto object-contain pointer-events-none"
      loading="lazy"
      decoding="async"
    />
    <p class="mt-4 text-sm font-medium text-[#8e9491]">
      {{ translate(text) }}
    </p>
    <slot />
  </div>
</template>

