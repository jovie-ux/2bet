<script setup lang="ts">
import { ChevronLeft, ChevronRight, Layers, Pause, Play, Sparkles } from 'lucide-vue-next'
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
    class="providers-glass-section"
    aria-labelledby="providers-section-title"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleMouseEnter"
    @touchend.passive="handleTouchEnd"
  >
    <!-- Glassmorphic Section Header -->
    <header class="providers-glass-header flex items-center justify-between flex-wrap gap-3">
      <div class="header-titles flex items-center gap-2.5">
        <div class="icon-orb flex items-center justify-center">
          <Layers :size="18" class="text-[#32d49a]" aria-hidden="true" />
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <h2 id="providers-section-title" class="section-title">
              {{ translate('Featured Providers') }}
            </h2>
            <span class="partners-badge hidden sm:inline-flex items-center gap-1">
              <Sparkles :size="11" class="text-[#32d49a]" />
              16 {{ translate('Official Partners') }}
            </span>
          </div>
          <p class="section-subtitle">
            {{ translate('World-class gaming studios powering 2Bet') }}
          </p>
        </div>
      </div>

    </header>

    <!-- Glassmorphic Auto-Sliding Carousel Viewport -->
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
/* Glassmorphism Section Container */
.providers-glass-section {
  position: relative;
  margin: 18px 0 24px;
  padding: 16px 18px 20px;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(6, 20, 11, 0.88) 0%, rgba(0, 0, 0, 0.96) 100%);
  background-image:
    radial-gradient(circle at 10% 0%, rgba(1, 148, 64, 0.3) 0%, transparent 48%),
    radial-gradient(circle at 90% 100%, rgba(1, 148, 64, 0.16) 0%, transparent 52%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(1, 148, 64, 0.28);
  border-top: 1px solid rgba(1, 148, 64, 0.55);
  box-shadow:
    0 16px 40px -8px rgba(0, 0, 0, 0.85),
    0 0 24px -4px rgba(1, 148, 64, 0.15),
    inset 0 1px 1px 0 rgba(1, 148, 64, 0.3);
  overflow: hidden;
}

/* Header Elements */
.icon-orb {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(1, 148, 64, 0.2);
  border: 1px solid rgba(1, 148, 64, 0.45);
  box-shadow: inset 0 1px 1px rgba(1, 148, 64, 0.3), 0 4px 14px rgba(1, 148, 64, 0.35);
}

.section-title {
  font-family: Impact, 'Arial Narrow', 'Manrope', sans-serif;
  font-size: clamp(20px, 2.2vw, 24px);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #ffffff;
  line-height: 1.2;
}

.partners-badge {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(1, 148, 64, 0.14);
  border: 1px solid rgba(1, 148, 64, 0.32);
  color: #e5e7eb;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.section-subtitle {
  font-size: 12px;
  color: #94a39b;
  margin-top: 2px;
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
  margin-top: 14px;
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

/* Glassmorphism Card */
.provider-glass-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 205px;
  width: 205px;
  height: 134px;
  padding: 12px 14px;
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(1, 148, 64, 0.08) 0%, rgba(0, 0, 0, 0.78) 55%, #000000 100%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(1, 148, 64, 0.2);
  border-top: 1px solid rgba(1, 148, 64, 0.45);
  box-shadow:
    0 8px 26px -4px rgba(0, 0, 0, 0.7),
    inset 0 1px 1px 0 rgba(1, 148, 64, 0.25);
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
              border-color 260ms ease,
              box-shadow 260ms ease,
              background 260ms ease;
  overflow: hidden;
}

.provider-glass-card:hover {
  transform: translateY(-4px) scale(1.015);
  background: linear-gradient(145deg, rgba(1, 148, 64, 0.18) 0%, rgba(0, 0, 0, 0.85) 55%, #000000 100%);
  border-color: #019440;
  box-shadow:
    0 14px 34px -4px rgba(0, 0, 0, 0.8),
    0 0 24px rgba(1, 148, 64, 0.42),
    inset 0 1px 1px 0 rgba(1, 148, 64, 0.4);
}

/* Diagonal Gloss Reflection */
.glass-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 52%;
  background: linear-gradient(135deg, rgba(1, 148, 64, 0.12) 0%, transparent 80%);
  pointer-events: none;
  border-radius: 13px 13px 0 0;
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
  border-top: 1px solid rgba(1, 148, 64, 0.16);
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

/* Light Theme Overrides */
html[data-theme='light']:not(#_) .providers-glass-section {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(243, 246, 244, 0.94) 100%);
  background-image:
    radial-gradient(circle at 8% 0%, rgba(1, 148, 64, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 92% 100%, rgba(245, 158, 11, 0.06) 0%, transparent 50%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 1);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.06),
    inset 0 1px 1px rgba(255, 255, 255, 1);
}

html[data-theme='light']:not(#_) .section-title {
  color: #111827;
}

html[data-theme='light']:not(#_) .section-subtitle {
  color: #6b7280;
}

html[data-theme='light']:not(#_) .partners-badge {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
  color: #374151;
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
@media (max-width: 639px) {
  .providers-glass-section {
    padding: 14px 12px 16px;
    margin: 14px 0 20px;
    border-radius: 12px;
  }

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

  .section-subtitle { font-size: 14px; }
  .provider-title { font-size: 14px; }
  .games-count-pill { font-size: 12px; }
  .provider-rank { font-size: 12px; }
}
</style>
