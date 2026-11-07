<script setup lang="ts">
import type { LiveStream } from '~/types/livestream'
import ByBetSpinner from '~/components/ByBetSpinner.vue'

const props = defineProps<{ sources: NonNullable<LiveStream['sources']>; preview?: boolean; compact?: boolean }>()
const emit = defineEmits<{ ended: []; unavailable: [] }>()
const video = ref<HTMLVideoElement | null>(null)
const state = ref<'loading' | 'ready' | 'unavailable'>('loading')

watch([video, () => JSON.stringify(props.sources)], async ([element], _, onCleanup) => {
  const sources = props.sources
  if (!element) return
  let cancelled = false
  let disposePlayer = () => {}
  let timer: ReturnType<typeof setTimeout> | undefined
  let attempt = 0
  const cleanPlayer = () => {
    clearTimeout(timer)
    element.onended = null
    element.onerror = null
    element.onloadeddata = null
    element.onwaiting = null
    element.onplaying = null
    element.oncanplay = null
    disposePlayer()
    disposePlayer = () => {}
    element.removeAttribute('src')
    element.load()
  }
  onCleanup(() => {
    cancelled = true
    cleanPlayer()
  })
  state.value = 'loading'

  try {
    const [{ default: mpegts }, { default: Hls }] = await Promise.all([
      import('mpegts.js'), import('hls.js'),
    ])
    if (cancelled) return
    const validUrl = (url?: string): url is string => {
      if (!url) return false
      try {
        const parsed = new URL(url)
        return parsed.protocol === 'https:' || (location.protocol === 'http:' && parsed.protocol === 'http:')
      } catch { return false }
    }
    const flv = sources.filter(source => validUrl(source.url) && (source.type === 'flv' || /\.flv(?:[?#]|$)/i.test(source.url!)))
      .map(source => ({ type: 'flv', url: source.url! }))
    const hls = sources.flatMap(source => [
      ...(validUrl(source.fallbackUrl) ? [{ type: 'hls', url: source.fallbackUrl }] : []),
      ...(validUrl(source.url) && (source.type === 'hls' || /\.m3u8(?:[?#]|$)/i.test(source.url)) ? [{ type: 'hls', url: source.url }] : []),
    ])
    const candidates = [
      ...(mpegts.getFeatureList().mseLivePlayback ? flv : []),
      ...(element.canPlayType('application/vnd.apple.mpegurl') || Hls.isSupported() ? hls : []),
    ]
    let index = 0
    function nextSource() {
      if (cancelled) return
      const currentAttempt = ++attempt
      cleanPlayer()
      const source = candidates[index++]
      if (!source) { state.value = 'unavailable'; emit('unavailable'); return }
      state.value = 'loading'
      const fail = () => {
        if (!cancelled && currentAttempt === attempt) nextSource()
      }
      const ended = () => {
        if (!cancelled && currentAttempt === attempt) emit('ended')
      }
      element!.onended = ended
      element!.onerror = fail
      element!.onloadeddata = () => {
        if (cancelled || currentAttempt !== attempt) return
        clearTimeout(timer)
        if (props.preview) element!.pause()
        state.value = 'ready'
      }
      element!.onwaiting = () => {
        if (cancelled || currentAttempt !== attempt) return
        state.value = 'loading'
      }
      element!.onplaying = () => {
        if (cancelled || currentAttempt !== attempt) return
        state.value = 'ready'
      }
      element!.oncanplay = () => {
        if (cancelled || currentAttempt !== attempt) return
        state.value = 'ready'
      }
      timer = setTimeout(fail, 15000)
      try {
        if (source.type === 'flv') {
          const player = mpegts.createPlayer({ type: 'flv', isLive: true, url: source.url })
          disposePlayer = () => { player.off(mpegts.Events.ERROR, fail); player.off(mpegts.Events.LOADING_COMPLETE, ended); player.destroy() }
          player.on(mpegts.Events.ERROR, fail)
          player.on(mpegts.Events.LOADING_COMPLETE, ended)
          player.attachMediaElement(element!)
          player.load()
        } else if (element!.canPlayType('application/vnd.apple.mpegurl')) {
          element!.src = source.url
        } else {
          const player = new Hls()
          disposePlayer = () => player.destroy()
          player.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) fail() })
          player.loadSource(source.url)
          player.attachMedia(element!)
        }
        // Keep native controls available when the browser blocks autoplay.
        if (!props.preview) void element!.play().catch(() => {})
      } catch { fail() }
    }
    nextSource()
  } catch {
    if (!cancelled) state.value = 'unavailable'
  }
}, { flush: 'post' })
</script>

<template>
  <div class="relative h-full w-full bg-black">
    <video ref="video" :controls="!preview" :autoplay="!preview" muted playsinline preload="auto" class="h-full w-full object-contain" aria-label="Live sports stream" />
    <div v-if="state !== 'ready' && !compact" class="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#14261d] px-5 text-center text-sm text-white/70" role="status">
      <ByBetSpinner v-if="state === 'loading'" size="md" theme="dark" />
      <span v-else>Stream unavailable</span>
    </div>
  </div>
</template>
