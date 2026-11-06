export const use2BetLoader = () => {
  const isLoading = useState<boolean>('2bet-global-loading', () => true)
  const loadingLabel = useState<string>('2bet-global-loading-label', () => '')

  const showLoader = (label = ''): void => {
    loadingLabel.value = label
    isLoading.value = true
  }

  const hideLoader = (): void => {
    isLoading.value = false
    loadingLabel.value = ''
  }

  const checkAssetsAndDismiss = (minDisplayMs = 250, maxTimeoutMs = 2500): Promise<void> => {
    if (!import.meta.client) return Promise.resolve()

    return new Promise<void>((resolve) => {
      const startTime = Date.now()

      const dismiss = () => {
        cleanup()
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, minDisplayMs - elapsed)
        setTimeout(() => {
          hideLoader()
          resolve()
        }, remaining)
      }

      const areEagerAssetsReady = (): boolean => {
        if (document.readyState !== 'complete') return false
        const eagerImages = Array.from(document.querySelectorAll<HTMLImageElement>('img:not([loading="lazy"])'))
        return eagerImages.every(img => img.complete)
      }

      let fallbackTimer: ReturnType<typeof setTimeout> | null = null

      const onWindowLoad = () => {
        requestAnimationFrame(() => {
          dismiss()
        })
      }

      const cleanup = () => {
        window.removeEventListener('load', onWindowLoad)
        if (fallbackTimer) clearTimeout(fallbackTimer)
      }

      if (areEagerAssetsReady()) {
        dismiss()
        return
      }

      window.addEventListener('load', onWindowLoad, { once: true })
      fallbackTimer = setTimeout(dismiss, maxTimeoutMs)
    })
  }

  return {
    isLoading,
    loadingLabel,
    showLoader,
    hideLoader,
    checkAssetsAndDismiss,
  }
}

export const useByBetLoader = use2BetLoader


