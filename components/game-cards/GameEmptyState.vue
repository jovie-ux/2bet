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

defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <div class="game-empty-state my-12 flex flex-col items-center justify-center text-center px-4 select-none">
    <img
      :src="image"
      alt="Empty state"
      class="w-48 sm:w-56 max-w-full h-auto object-contain pointer-events-none"
      loading="lazy"
      decoding="async"
    />
    <p class="mt-4 text-sm font-medium text-[#8e9491]">
      {{ text }}
    </p>
    <button
      v-if="showReset"
      type="button"
      class="mt-3 rounded-full bg-[var(--main-color)] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#047b53] transition-colors cursor-pointer"
      @click="$emit('reset')"
    >
      {{ resetText }}
    </button>
    <slot />
  </div>
</template>

