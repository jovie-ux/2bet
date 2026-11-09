<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import type { LiveStream } from '~/types/livestream'

const props = defineProps<{
  thumbnail?: string
  sources?: LiveStream['sources']
  label: string
}>()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`

function cloudflareThumbnail(source?: string): string | undefined {
  const match = source?.match(/(https:\/\/[^/]+\.cloudflarestream\.com\/[a-zA-Z0-9]+)/)
  return match ? `${match[1]}/thumbnails/thumbnail.jpg` : undefined
}

const thumbnailUrl = computed(() => {
  if (props.thumbnail) return props.thumbnail
  for (const source of props.sources ?? []) {
    const url = cloudflareThumbnail(source.url)
    if (url) return url
  }
  return ''
})

const imageFailed = ref(false)
watch(thumbnailUrl, () => { imageFailed.value = false })
</script>

<template>
  <a
    :href="bybetRedirectUrl"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Watch ${label} on ByBet`"
    :title="`Watch ${label}`"
    class="group relative block h-[20px] w-[28px] shrink-0 overflow-hidden   bg-cover bg-center"
  >
    <img
      v-if="thumbnailUrl && !imageFailed"
      :src="thumbnailUrl"
      alt=""
      loading="lazy"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      @error="imageFailed = true"
    >
    <span class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
      <Play :size="11" class="fill-black rounded-full text-white drop-shadow bg-white" aria-hidden="true" />
    </span>
  </a>
</template>
