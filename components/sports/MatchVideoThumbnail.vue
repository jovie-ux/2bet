<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import type { LiveStream } from '~/types/livestream'
import StreamPlayer from '../comments/StreamPlayer.vue'

defineProps<{ sources?: LiveStream['sources']; label: string }>()
const bybetRedirectUrl = useRuntimeConfig().public.bybetRedirectUrl
const thumbnail = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (!thumbnail.value || typeof IntersectionObserver === 'undefined') {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(entries => {
    visible.value = entries.some(entry => entry.isIntersecting)
  })
  observer.observe(thumbnail.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <a
    ref="thumbnail"
    :href="bybetRedirectUrl"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Watch ${label} on 2Bet`"
    :title="`Watch ${label}`"
    class="relative block h-3 w-4 shrink-0 overflow-hidden rounded-md border border-white/15 bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
  >
    <StreamPlayer v-if="visible && sources?.length" :sources="sources" preview compact class="pointer-events-none" />
    <span class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
      <Play :size="7" class="fill-white text-white drop-shadow" aria-hidden="true" />
    </span>
  </a>
</template>
