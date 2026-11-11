<script setup lang="ts">
import { Layers } from 'lucide-vue-next'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

export interface ProviderItem {
  id: string
  name: string
  logo: string
  category: string
  categoryTone: 'emerald' | 'amber' | 'blue' | 'purple' | 'red'
  gamesCount: string
  to: string
  tag?: string
}

const PROVIDERS: ProviderItem[] = [
  {
    id: 'pp',
    name: 'Pragmatic Play',
    logo: '/images/providers/pp.webp',
    category: 'Slots & Live',
    categoryTone: 'emerald',
    gamesCount: '350+ Games',
    to: '/egames/slots?provider=pp',
    tag: 'Popular',
  },
  {
    id: 'pg',
    name: 'PG Soft',
    logo: '/images/providers/pg.webp',
    category: 'Mobile Slots',
    categoryTone: 'purple',
    gamesCount: '120+ Games',
    to: '/egames/slots?provider=pg',
    tag: 'Hot',
  },
  {
    id: 'jili',
    name: 'JILI',
    logo: '/images/providers/jili.webp',
    category: 'Slots & Arcade',
    categoryTone: 'amber',
    gamesCount: '95+ Games',
    to: '/egames/slots?provider=jili',
    tag: 'Top',
  },
  {
    id: 'jdb',
    name: 'JDB Gaming',
    logo: '/images/providers/jdb.webp',
    category: 'Jackpots',
    categoryTone: 'amber',
    gamesCount: '80+ Games',
    to: '/egames/jackpot/jdb',
    tag: 'Jackpot',
  },
  {
    id: 'cq9',
    name: 'CQ9 Gaming',
    logo: '/images/providers/cq9.webp',
    category: 'Asian Slots',
    categoryTone: 'blue',
    gamesCount: '160+ Games',
    to: '/egames/slots?provider=cq9',
    tag: 'Top',
  },
  {
    id: 'red-tiger',
    name: 'Red Tiger',
    logo: '/images/providers/red-tiger.webp',
    category: 'Daily Drops',
    categoryTone: 'red',
    gamesCount: '210+ Games',
    to: '/egames/slots?provider=red-tiger',
    tag: 'Jackpot',
  },
  {
    id: 'netent',
    name: 'NetEnt',
    logo: '/images/providers/netent.webp',
    category: 'Premium Slots',
    categoryTone: 'emerald',
    gamesCount: '190+ Games',
    to: '/egames/slots?provider=netent',
    tag: 'Classic',
  },
  {
    id: 'mg',
    name: 'Microgaming',
    logo: '/images/providers/mg.webp',
    category: 'Mega Moolah',
    categoryTone: 'blue',
    gamesCount: '420+ Games',
    to: '/egames/slots?provider=mg%2B',
    tag: 'Mega',
  },
  {
    id: 'bs',
    name: 'BetSoft',
    logo: '/images/providers/bs.webp',
    category: '3D Cinematic',
    categoryTone: 'purple',
    gamesCount: '115+ Games',
    to: '/egames/slots?provider=bs',
    tag: '3D',
  },
  {
    id: 'choice',
    name: 'Choice Gaming',
    logo: '/images/providers/choice.webp',
    category: 'Video Slots',
    categoryTone: 'amber',
    gamesCount: '70+ Games',
    to: '/egames/slots?provider=choice',
    tag: 'New',
  },
  {
    id: 'lgd',
    name: 'LGD Gaming',
    logo: '/images/providers/lgd.webp',
    category: 'eSports & Slots',
    categoryTone: 'red',
    gamesCount: '65+ Games',
    to: '/egames/slots?provider=lgd',
    tag: 'Hot',
  },
  {
    id: '2bet',
    name: '2Bet Originals',
    logo: '/images/providers/2bet.webp',
    category: 'VIP Exclusive',
    categoryTone: 'emerald',
    gamesCount: 'Exclusive',
    to: '/egames/slots?provider=2bet',
    tag: 'VIP',
  },
  {
    id: 'db',
    name: 'DB Live Casino',
    logo: '/images/providers/db.webp',
    category: 'Live Baccarat',
    categoryTone: 'amber',
    gamesCount: 'Live Tables',
    to: '/entertainment/live-casino',
    tag: 'Live',
  },
  {
    id: 'ky',
    name: 'KY Card & Board',
    logo: '/images/providers/ky.webp',
    category: 'P2P Tables',
    categoryTone: 'blue',
    gamesCount: 'Card Games',
    to: '/entertainment/poker',
    tag: 'Cards',
  },
  {
    id: 'v8',
    name: 'V8 Gaming',
    logo: '/images/providers/v8.webp',
    category: 'Poker & Dice',
    categoryTone: 'purple',
    gamesCount: 'Poker Rooms',
    to: '/entertainment/poker',
    tag: 'Table',
  },
  {
    id: 'ks',
    name: 'KS Casual',
    logo: '/images/providers/ks.webp',
    category: 'Arcade & Table',
    categoryTone: 'blue',
    gamesCount: 'Casual Games',
    to: '/entertainment/poker',
    tag: 'Casual',
  },
]

// Duplicate 3 times for a completely seamless, infinite carousel loop
const duplicatedProviders = [...PROVIDERS, ...PROVIDERS, ...PROVIDERS]

const { translate } = useSiteLocale()
const { effectiveTheme } = useSiteTheme()

const themedLogo = (logo: string): string => {
  return getProviderLogoForTheme(logo, effectiveTheme.value)
}

const trackRef = ref<HTMLElement | null>(null)
const isPaused = ref(false)
const isHovered = ref(false)
const isVisible = ref(false)
let animationFrameId: number | null = null
let cachedSingleSetWidth = 0
let observer: IntersectionObserver | null = null
const SCROLL_SPEED = 0.85 // pixels per animation frame (~50px/sec)

const updateSingleSetWidth = (): void => {
  if (trackRef.value) {
    cachedSingleSetWidth = trackRef.value.scrollWidth / 3
  }
}

const startAnimation = (): void => {
  if (animationFrameId === null && isVisible.value && !isPaused.value && !isHovered.value && typeof document !== 'undefined' && !document.hidden) {
    animationFrameId = requestAnimationFrame(updateCarouselLoop)
  }
}

const stopAnimation = (): void => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const updateCarouselLoop = (): void => {
  if (trackRef.value && !isPaused.value && !isHovered.value && isVisible.value && !document.hidden) {
    trackRef.value.scrollLeft += SCROLL_SPEED
    const singleSet = cachedSingleSetWidth || (trackRef.value.scrollWidth / 3)

    // Seamless loop: when passing set 2, reset by 1 set without visual jump
    if (trackRef.value.scrollLeft >= singleSet * 2) {
      trackRef.value.scrollLeft -= singleSet
    }
    animationFrameId = requestAnimationFrame(updateCarouselLoop)
  } else {
    animationFrameId = null
  }
}

const scrollManual = (direction: 'left' | 'right'): void => {
  if (!trackRef.value) return
  const cardStep = 240
  const singleSet = cachedSingleSetWidth || (trackRef.value.scrollWidth / 3)

  if (direction === 'left') {
    if (trackRef.value.scrollLeft <= singleSet * 0.2) {
      trackRef.value.scrollLeft += singleSet
    }
    trackRef.value.scrollBy({ left: -cardStep, behavior: 'smooth' })
  } else {
    if (trackRef.value.scrollLeft >= singleSet * 2.2) {
      trackRef.value.scrollLeft -= singleSet
    }
    trackRef.value.scrollBy({ left: cardStep, behavior: 'smooth' })
  }
}

const togglePause = (): void => {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

const handleMouseEnter = (): void => {
  isHovered.value = true
  stopAnimation()
}

const handleMouseLeave = (): void => {
  isHovered.value = false
  startAnimation()
}

const handleTouchEnd = (): void => {
  setTimeout(() => {
    isHovered.value = false
    startAnimation()
  }, 1200)
}

const handleVisibilityChange = (): void => {
  if (typeof document !== 'undefined' && document.hidden) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

onMounted(() => {
  if (import.meta.client && trackRef.value) {
    updateSingleSetWidth()
    trackRef.value.scrollLeft = cachedSingleSetWidth

    // Check motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isPaused.value = true
    }

    window.addEventListener('resize', updateSingleSetWidth, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible.value = Boolean(entry?.isIntersecting)
        if (isVisible.value) {
          updateSingleSetWidth()
          startAnimation()
        } else {
          stopAnimation()
        }
      }, { rootMargin: '100px' })
      observer.observe(trackRef.value)
    } else {
      isVisible.value = true
      startAnimation()
    }
  }
})

onBeforeUnmount(() => {
  stopAnimation()
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (import.meta.client) {
    window.removeEventListener('resize', updateSingleSetWidth)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
})
</script>

<template>
  <section
    id="game-providers"
    class="homepage-providers-section"
    aria-labelledby="providers-section-title"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleMouseEnter"
    @touchend.passive="handleTouchEnd"
  >
    <header class="providers-header flex items-center justify-between">
      <div class="providers-heading flex items-center min-w-0">
        <h2 id="providers-section-title">
          <Layers class="allgames-heading-symbol" :size="28" :stroke-width="1.6" aria-hidden="true" />
          {{ translate('Featured Providers') }}
        </h2>
        <p>
          {{ translate('World-class gaming studios powering 2Bet') }}
          <span class="providers-partners-note hidden sm:inline"> · 16 {{ translate('Official Partners') }}</span>
        </p>
      </div>
    </header>

    <!-- Auto-sliding carousel -->
    <div class="providers-carousel-wrapper">
      <div
        ref="trackRef"
        class="providers-carousel-track"
        tabindex="0"
        role="region"
        :aria-label="translate('Game providers carousel')"
      >
        <NuxtLink
          v-for="(provider, index) in duplicatedProviders"
          :key="`${provider.id}-${index}`"
          :to="provider.to"
          class="provider-glass-card group"
          :aria-label="`${provider.name} - ${provider.category} (${provider.gamesCount})`"
        >
          <!-- Card Header Pill -->
          <div class="card-glass-top flex items-center justify-between">
            <span class="category-pill flex items-center gap-1.5" :data-tone="provider.categoryTone">
              <span class="status-dot" aria-hidden="true" />
              {{ translate(provider.category) }}
            </span>
            <span v-if="provider.tag" class="tag-pill hidden sm:block">
              {{ translate(provider.tag) }}
            </span>
          </div>

          <!-- Glass Logo Showcase -->
          <div class="card-glass-body flex items-center justify-center">
            <img
              :src="themedLogo(provider.logo)"
              :alt="provider.name"
              class="provider-logo-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          <!-- Card Glass Footer -->
          <div class="card-glass-footer flex items-center justify-between">
            <span class="provider-title truncate">{{ provider.name }}</span>
            <span class="games-count-pill hidden sm:block">{{ provider.gamesCount }}</span>
          </div>

          <!-- Subtle Diagonal Light Reflection -->
          <div class="glass-reflection" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.homepage-providers-section {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 24px;
  color: #f4f7f5;
}

.providers-header {
  min-height: 48px;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ffffff18;
}

.providers-heading {
  gap: 22px;
}

.providers-heading h2 {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 12px;
  color: #fff;
  font-size: var(--allgames-heading-size);
  font-weight: var(--homepage-display-weight);
  line-height: 1.2;
  letter-spacing: 0.01em;
}

.providers-heading > p {
  padding-left: 22px;
  border-left: 1px solid #ffffff26;
  color: #a8b6bc;
  font-size: 14px;
  line-height: 22px;
}

.providers-partners-note {
  color: #8fac9b;
}

/* Control Buttons */
.glass-control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(1, 148, 64, 0.28);
  color: #d1d5db;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 180ms ease;
  cursor: pointer;
}

.glass-control-btn:hover {
  background: #019440;
  border-color: #32d49a;
  color: #ffffff;
  box-shadow: 0 0 12px rgba(1, 148, 64, 0.5);
  transform: translateY(-1px);
}

/* Carousel Wrapper & Mask */
.providers-carousel-wrapper {
  position: relative;
  margin-top: 18px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent 0%, #000 24px, #000 calc(100% - 24px), transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 24px, #000 calc(100% - 24px), transparent 100%);
}

.providers-carousel-track {
  display: flex;
  align-items: center;
  gap: 14px;
  overflow-x: auto;
  scroll-behavior: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 6px 12px 10px;
  cursor: grab;
  user-select: none;
}

.providers-carousel-track::-webkit-scrollbar {
  display: none;
}

.providers-carousel-track:active {
  cursor: grabbing;
}

.provider-glass-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 205px;
  width: 205px;
  height: 134px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #03110d;
  border: 1px solid #ffffff12;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  transition: transform 200ms ease, border-color 200ms ease, background-color 200ms ease;
  overflow: hidden;
}

.provider-glass-card:hover {
  transform: translateY(-2px);
  border-color: #ffffff30;
  background: #061713;
}

.glass-reflection {
  display: none;
}

/* Card Header Components */
.category-pill {
  padding: 2.5px 7px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(1, 148, 64, 0.22);
  color: #d1d5db;
}

.category-pill .status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #019440;
  box-shadow: 0 0 6px #019440;
}

.category-pill[data-tone="purple"] .status-dot { background-color: #a78bfa; box-shadow: 0 0 6px #a78bfa; }
.category-pill[data-tone="amber"] .status-dot { background-color: #fbbf24; box-shadow: 0 0 6px #fbbf24; }
.category-pill[data-tone="blue"] .status-dot { background-color: #60a5fa; box-shadow: 0 0 6px #60a5fa; }
.category-pill[data-tone="red"] .status-dot { background-color: #f87171; box-shadow: 0 0 6px #f87171; }

.tag-pill {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(1, 148, 64, 0.2);
  border: 1px solid rgba(1, 148, 64, 0.45);
  color: #32d49a;
}

/* Card Body Logo */
.card-glass-body {
  height: 52px;
  padding: 4px 0;
}

.provider-logo-img {
  width: auto;
  height: auto;
  max-width: 100px;
  max-height: 38px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
  transition: transform 260ms ease, filter 260ms ease;
}

.provider-glass-card:hover .provider-logo-img {
  transform: scale(1.08);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7));
}

/* Card Footer */
.card-glass-footer {
  padding-top: 6px;
  border-top: 1px solid #ffffff12;
}

.provider-title {
  font-size: 12px;
  font-weight: 700;
  color: #f3f4f6;
  max-width: 110px;
}

.games-count-pill {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(1, 148, 64, 0.15);
  padding: 1px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.provider-glass-card:hover .games-count-pill {
  color: #32d49a;
  background: rgba(1, 148, 64, 0.22);
  border-color: rgba(1, 148, 64, 0.45);
}

html[data-theme='light']:not(#_) .providers-heading h2 {
  color: #111827;
}

html[data-theme='light']:not(#_) .providers-heading > p {
  color: #6b7280;
}

html[data-theme='light']:not(#_) .providers-header {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

html[data-theme='light']:not(#_) .glass-control-btn {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
  color: #4b5563;
}

html[data-theme='light']:not(#_) .glass-control-btn:hover {
  background: rgba(1, 148, 64, 0.12);
  border-color: var(--brand);
  color: var(--brand);
}

html[data-theme='light']:not(#_) .provider-glass-card {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px #ffffff;
}

html[data-theme='light']:not(#_) .provider-glass-card:hover {
  background: rgba(255, 255, 255, 0.92);
  border-color: var(--brand);
  box-shadow:
    0 12px 28px rgba(1, 148, 64, 0.14),
    inset 0 1px 1px #ffffff;
}

html[data-theme='light']:not(#_) .provider-title {
  color: #111827;
}

html[data-theme='light']:not(#_) .category-pill {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.06);
  color: #4b5563;
}

html[data-theme='light']:not(#_) .card-glass-footer {
  border-top-color: rgba(0, 0, 0, 0.06);
}

html[data-theme='light']:not(#_) .provider-logo-img {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

/* Responsive Scaling */
@media (max-width: 767px) {
  .providers-heading {
    gap: 12px;
  }

  .providers-heading > p {
    padding-left: 14px;
    font-size: 12px;
    line-height: 1.4;
  }
}
@media (max-width: 639px) {
  .providers-carousel-wrapper {
    mask-image: linear-gradient(90deg, transparent 0%, #000 12px, #000 calc(100% - 12px), transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 12px, #000 calc(100% - 12px), transparent 100%);
  }

  .provider-glass-card {
    min-width: 172px;
    width: 172px;
    height: 122px;
    padding: 10px 12px;
    border-radius: 12px;
  }

  .card-glass-body {
    height: 44px;
  }

  .provider-logo-img {
    max-width: 108px;
    height: 32px;
  }

  .providers-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .providers-heading > p {
    padding: 0;
    border: 0;
    font-size: 13px;
  }

  .provider-title { font-size: 14px; }
  .games-count-pill { font-size: 12px; }
}
</style>
