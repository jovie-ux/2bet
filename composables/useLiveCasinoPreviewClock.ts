import { onBeforeUnmount, onMounted, readonly, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

// A single clock drives every visible table rather than creating a timer per card.
export const useLiveCasinoPreviewClock = (enabled: MaybeRefOrGetter<boolean> = true) => {
  const elapsedMs = ref(0)
  let startedAt = 0
  let mounted = false
  let timer: ReturnType<typeof setInterval> | undefined

  const tick = (): void => {
    elapsedMs.value = performance.now() - startedAt
  }

  const stop = (): void => {
    if (timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
  }

  const sync = (): void => {
    stop()
    if (!mounted || !toValue(enabled) || document.hidden) return
    tick()
    timer = setInterval(tick, 250)
  }

  onMounted(() => {
    startedAt = performance.now()
    mounted = true
    document.addEventListener('visibilitychange', sync)
    sync()
  })

  watch(() => toValue(enabled), sync)

  onBeforeUnmount(() => {
    mounted = false
    stop()
    document.removeEventListener('visibilitychange', sync)
  })

  return readonly(elapsedMs)
}
