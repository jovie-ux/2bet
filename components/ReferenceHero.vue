<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { translate } = useSiteLocale()
const nuxtLinkComponent = resolveComponent('NuxtLink')
const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl

interface HeroSlide {
  eyebrow: string
  titleTop: string
  titleBottom: string
  description: string
  primaryAction: string
  secondaryAction: string
  primaryTo: string
  secondaryTo: string
  primaryExternal: boolean
  secondaryExternal: boolean
  image: string
  imageAlt: string
}

const slides: HeroSlide[] = [
  {
    eyebrow: '2bet SLOTS',
    titleTop: 'SPIN BIG WINS',
    titleBottom: 'AT 2bet',
    description: 'Thousands of Slot Games | Big Jackpots • Daily Bonuses',
    primaryAction: 'Play Now',
    secondaryAction: 'Explore Games',
    primaryTo: '/explore/egames/slots',
    secondaryTo: '/explore/egames/slots',
    primaryExternal: true,
    secondaryExternal: false,
    image: '/hero/slots-games.webp',
    imageAlt: 'Slot reels with a fantasy king, dragon, coins, and gems',
  },
  {
    eyebrow: '2bet PROMOTIONS',
    titleTop: 'MORE REWARDS',
    titleBottom: 'AWAIT YOU',
    description: 'Open a world of bonuses, gifts, and promotions',
    primaryAction: 'View Offers',
    secondaryAction: 'Explore Rewards',
    primaryTo: '/explore/bonuses',
    secondaryTo: '/explore/bonuses',
    primaryExternal: false,
    secondaryExternal: true,
    image: '/hero/promotions.webp',
    imageAlt: 'Treasure chest filled with gold coins and colorful gemstones',
  },
  {
    eyebrow: '2bet VIP',
    titleTop: 'REIGN ABOVE',
    titleBottom: 'THE REST',
    description: 'Discover elevated rewards made for VIP players',
    primaryAction: 'Join VIP',
    secondaryAction: 'Explore Benefits',
    primaryTo: '/explore/account/vip',
    secondaryTo: '/explore/account/vip',
    primaryExternal: false,
    secondaryExternal: true,
    image: '/hero/vip.webp',
    imageAlt: 'Emerald and gold crown beside a premium membership card',
  },
]

const getActionAttributes = (destination: string, external: boolean): Record<string, string> => {
  if (external) {
    return {
      href: externalSiteUrl,
      target: '_blank',
      rel: 'nofollow noopener noreferrer',
    }
  }

  return { to: destination }
}

const activeSlideIndex = ref(0)
const reducedMotionPreferred = ref(false)
let autoplayTimer: ReturnType<typeof setInterval> | undefined
let touchStartX = 0
let reducedMotionQuery: MediaQueryList | undefined
let pointerIsHovering = false
let focusIsWithinHero = false

const stopAutoplay = (): void => {
  if (!autoplayTimer) {
    return
  }

  clearInterval(autoplayTimer)
  autoplayTimer = undefined
}

const showSlide = (slideIndex: number): void => {
  activeSlideIndex.value = (slideIndex + slides.length) % slides.length
}

const showNextSlide = (): void => {
  showSlide(activeSlideIndex.value + 1)
}

const showPreviousSlide = (): void => {
  showSlide(activeSlideIndex.value - 1)
}

const startAutoplay = (): void => {
  stopAutoplay()

  if (
    reducedMotionPreferred.value
    || document.hidden
    || pointerIsHovering
    || focusIsWithinHero
  ) {
    return
  }

  autoplayTimer = setInterval(showNextSlide, 6000)
}

const handleVisibilityChange = (): void => {
  if (document.hidden) {
    stopAutoplay()
    return
  }

  startAutoplay()
}

const handleReducedMotionChange = (event: MediaQueryListEvent): void => {
  reducedMotionPreferred.value = event.matches
  startAutoplay()
}

const handlePointerEnter = (): void => {
  pointerIsHovering = true
  stopAutoplay()
}

const handlePointerLeave = (): void => {
  pointerIsHovering = false
  startAutoplay()
}

const handleFocusIn = (): void => {
  focusIsWithinHero = true
  stopAutoplay()
}

const handleFocusOut = (event: FocusEvent): void => {
  const nextFocusedElement = event.relatedTarget
  if (nextFocusedElement instanceof Node && event.currentTarget instanceof Node) {
    if (event.currentTarget.contains(nextFocusedElement)) {
      return
    }
  }

  focusIsWithinHero = false
  startAutoplay()
}

const handleTouchStart = (event: TouchEvent): void => {
  touchStartX = event.changedTouches[0]?.clientX ?? 0
  stopAutoplay()
}

const handleTouchEnd = (event: TouchEvent): void => {
  const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
  const swipeDistance = touchEndX - touchStartX

  if (Math.abs(swipeDistance) >= 40) {
    if (swipeDistance > 0) {
      showPreviousSlide()
    } else {
      showNextSlide()
    }
  }

  startAutoplay()
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionPreferred.value = reducedMotionQuery.matches
  reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
  reducedMotionQuery?.removeEventListener('change', handleReducedMotionChange)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <section
    class="hero"
    aria-roledescription="carousel"
    :aria-label="translate('Featured promotions')"
    @mouseenter="handlePointerEnter"
    @mouseleave="handlePointerLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <Transition name="hero-slide">
      <article
        :key="activeSlideIndex"
        class="hero-slide"
        :aria-label="`${activeSlideIndex + 1} of ${slides.length}`"
      >
        <img
          :src="slides[activeSlideIndex].image"
          :alt="slides[activeSlideIndex].imageAlt"
          width="1024"
          height="343"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        >
        <div class="hero-copy">
          <span>{{ translate(slides[activeSlideIndex].eyebrow) }}</span>
          <h1>
            <span>{{ translate(slides[activeSlideIndex].titleTop) }}</span>
            <span class="hero-title-accent">{{ translate(slides[activeSlideIndex].titleBottom) }}</span>
          </h1>
          <p>{{ translate(slides[activeSlideIndex].description) }}</p>
          <div>
            <component
              :is="slides[activeSlideIndex].primaryExternal ? 'a' : nuxtLinkComponent"
              v-bind="getActionAttributes(
                slides[activeSlideIndex].primaryTo,
                slides[activeSlideIndex].primaryExternal,
              )"
              class="hero-primary"
            >
              {{ translate(slides[activeSlideIndex].primaryAction) }}
              <ChevronRight :size="11" :stroke-width="2.6" aria-hidden="true" />
            </component>
            <component
              :is="slides[activeSlideIndex].secondaryExternal ? 'a' : nuxtLinkComponent"
              v-bind="getActionAttributes(
                slides[activeSlideIndex].secondaryTo,
                slides[activeSlideIndex].secondaryExternal,
              )"
              class="hero-secondary"
            >
              {{ translate(slides[activeSlideIndex].secondaryAction) }}
            </component>
          </div>
        </div>
      </article>
    </Transition>

    <button type="button" class="hero-arrow hero-arrow--left" aria-label="Previous slide" @click="showPreviousSlide">
      <ChevronLeft :size="12" />
    </button>
    <button type="button" class="hero-arrow hero-arrow--right" aria-label="Next slide" @click="showNextSlide">
      <ChevronRight :size="12" />
    </button>
    <div class="hero-dots" role="group" aria-label="Choose featured slide">
      <button
        v-for="(slide, slideIndex) in slides"
        :key="slide.titleTop"
        type="button"
        :class="{ active: slideIndex === activeSlideIndex }"
        :aria-label="`Show slide ${slideIndex + 1}: ${slide.titleTop} ${slide.titleBottom}`"
        :aria-current="slideIndex === activeSlideIndex ? 'true' : undefined"
        @click="showSlide(slideIndex)"
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  /* margin-top: 15px; */
  aspect-ratio: 4.58 / 1;
  min-height: 7.55rem;
  overflow: hidden;
  border: 1px solid rgba(50, 212, 154, 0.22);
  border-radius: 0.42rem;
  background:
    radial-gradient(circle at 35% 100%, rgba(16, 154, 88, 0.42), transparent 45%),
    linear-gradient(105deg, #073524, #06402b 45%, #031f17);
  box-shadow: inset 0 0 2rem rgba(50, 212, 154, 0.08);
}

.hero-slide {
  position: absolute;
  inset: 0;
}

.hero-slide > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(2, 18, 13, 0.62) 0%, rgba(2, 24, 17, 0.3) 34%, transparent 55%);
  content: '';
}

.hero-copy {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: clamp(3rem, 9vw, 3.85rem);
  transform: translateY(-50%);
}

.hero-copy > span {
  color: #d6e9df;
  font-size: 0.36rem;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.hero h1 {
  display: grid;
  margin: 0.2rem 0 0;
  font-size: var(--font-hero-title);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

.hero h1 > span {
  color: #ffd65a;
  background: linear-gradient(180deg, #fffbe0 0%, #ffe27b 42%, #f4b52f 78%, #d98b10 100%);
  background-size: 180% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0.1rem 0.08rem rgba(0, 0, 0, 0.7));
}

.hero h1 > .hero-title-accent {
  color: #52e7b2;
  background: linear-gradient(180deg, #c4ffec 0%, #68efc2 40%, #28d69c 72%, #0aa773 100%);
  background-size: 180% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0.1rem 0.08rem rgba(0, 34, 23, 0.72));
}

.hero p {
  margin: 0.3rem 0 0.42rem;
  color: #e2ede7;
  font-size: var(--font-hero-body);
}

.hero-copy > div {
  display: flex;
  gap: 0.35rem;
}

.hero-copy a {
  display: inline-flex;
  height: clamp(1.35rem, 3.8vw, 1.65rem);
  align-items: center;
  justify-content: center;
  padding: 0 clamp(0.72rem, 1.8vw, 0.95rem);
  border-radius: 0.38rem;
  color: white;
  font-size: clamp(0.5rem, 0.12rem + 1.1vw, 0.64rem);
  font-weight: 800;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  gap: 0.25rem;
}

.hero-primary {
  border: 1px solid rgba(91, 230, 179, 0.52);
  background:
    linear-gradient(145deg, rgba(10, 151, 103, 0.82), rgba(3, 98, 66, 0.68));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.18),
    inset 0 -1px rgba(0, 52, 35, 0.3),
    0 0.22rem 0.55rem rgba(0, 52, 35, 0.3);
}

.hero-primary:hover {
  border-color: rgba(130, 242, 200, 0.78);
  background:
    linear-gradient(145deg, rgba(13, 174, 119, 0.88), rgba(4, 123, 83, 0.74));
  transform: translateY(-1px);
}

.hero-secondary {
  border: 1px solid rgba(50, 212, 154, 0.72);
  background:
    linear-gradient(145deg, rgba(11, 47, 35, 0.58), rgba(2, 18, 13, 0.48));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.1),
    inset 0 0 0 1px rgba(50, 212, 154, 0.08),
    0 0.2rem 0.5rem rgba(0, 31, 21, 0.22);
}

.hero-secondary:hover {
  border-color: rgba(130, 242, 200, 0.9);
  background:
    linear-gradient(145deg, rgba(5, 119, 81, 0.68), rgba(3, 61, 43, 0.58));
  transform: translateY(-1px);
}

.hero-copy a:active {
  transform: translateY(0);
}

.hero-arrow {
  display: grid;
  position: absolute;
  z-index: 3;
  top: 50%;
  width: 1.7rem;
  height: 1.7rem;
  place-items: center;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  color: white;
  background:
    linear-gradient(145deg, rgba(14, 58, 43, 0.66), rgba(2, 13, 10, 0.48));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.12),
    0 0.3rem 0.85rem rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(10px) saturate(1.25);
  -webkit-backdrop-filter: blur(10px) saturate(1.25);
  transform: translateY(-50%);
}

.hero-arrow:hover {
  border-color: rgba(82, 231, 178, 0.7);
  background:
    linear-gradient(145deg, rgba(4, 123, 83, 0.82), rgba(3, 55, 40, 0.72));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.18),
    0 0.35rem 1rem rgba(0, 0, 0, 0.38);
}

.hero-arrow--left {
  left: 0.38rem;
}

.hero-arrow--right {
  right: 0.38rem;
}

.hero-dots {
  display: flex;
  position: absolute;
  z-index: 3;
  bottom: 0.35rem;
  left: 50%;
  align-items: center;
  gap: 0.5rem;
  transform: translateX(-50%);
}

.hero-dots button {
  width: 0.48rem;
  height: 0.48rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(158, 174, 165, 0.72);
  transition:
    width 220ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 180ms ease,
    opacity 180ms ease;
}

.hero-dots button:hover {
  background: rgba(244, 247, 245, 0.9);
}

.hero-dots .active {
  width: 1.35rem;
  background: #08b77d;
}

.hero-dots button:focus-visible {
  outline-offset: 0.2rem;
}

.hero-slide-enter-active,
.hero-slide-leave-active {
  transition: opacity 420ms ease, transform 420ms ease;
}

.hero-slide-enter-from {
  opacity: 0;
  transform: translateX(1.2%);
}

.hero-slide-leave-to {
  opacity: 0;
  transform: translateX(-1.2%);
}

@media (min-width: 48rem) {
  .hero-copy > span {
    font-size: 0.54rem;
  }
}

@media (min-width: 64rem) {
  .hero {
    z-index: 1;
  }
}

@media (max-width: 35rem) {
  .hero {
    min-height: 10.5rem;
    aspect-ratio: 1.95 / 1;
    border-radius: 0.55rem;
  }

  .hero-slide > img {
    object-position: 72% center;
  }

  .hero::after {
    background: linear-gradient(90deg, rgba(2, 18, 13, 0.9) 0%, rgba(2, 24, 17, 0.58) 52%, transparent 82%);
  }

  .hero-copy {
    top: 47%;
    left: 0.85rem;
    width: 64%;
  }

  .hero-copy > span {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
  }

  .hero h1 {
    margin-top: 0.18rem;
    font-size: clamp(1.3rem, 6vw, 1.65rem);
    line-height: 0.95;
  }

  .hero p {
    margin: 0.28rem 0 0.48rem;
    font-size: clamp(0.68rem, 2.7vw, 0.78rem);
    line-height: 1.3;
  }

  .hero-copy > div {
    width: 100%;
    gap: 0.35rem;
  }

  .hero-copy a {
    min-width: 0;
    height: 1.95rem;
    flex: 1 1 0;
    padding-inline: 0.5rem;
    border-radius: 0.42rem;
    font-size: clamp(0.68rem, 2.8vw, 0.78rem);
    white-space: nowrap;
  }

  .hero-arrow {
    display: none;
  }

  .hero-dots {
    bottom: 0.38rem;
  }
}

@media (min-width: 35.01rem) and (max-width: 63.99rem) {
  .hero {
    min-height: 11.5rem;
    aspect-ratio: 2.9 / 1;
    border-radius: 0.55rem;
  }

  .hero-slide > img {
    object-position: 70% center;
  }

  .hero::after {
    background: linear-gradient(90deg, rgba(2, 18, 13, 0.86) 0%, rgba(2, 24, 17, 0.52) 48%, transparent 80%);
  }

  .hero-copy {
    left: 1.2rem;
    width: 52%;
  }

  .hero-copy > span {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
  }

  .hero p {
    margin: 0.32rem 0 0.55rem;
    font-size: clamp(0.75rem, 2vw, 0.88rem);
    line-height: 1.35;
  }

  .hero-arrow {
    display: none;
  }

  .hero-copy a {
    min-width: 0;
    height: 2.15rem;
    flex: 1 1 0;
    font-size: clamp(0.75rem, 1.8vw, 0.85rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide-enter-active,
  .hero-slide-leave-active {
    transition: none;
  }

  .hero-dots button {
    transition: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hero-slide > img {
    animation: hero-art-enter 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .hero-copy > span,
  .hero p,
  .hero-copy > div {
    animation: hero-copy-reveal 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .hero-copy > span {
    animation-delay: 40ms;
  }

  .hero p {
    animation-delay: 220ms;
  }

  .hero-copy > div {
    animation-delay: 290ms;
  }

  .hero h1 > span {
    animation:
      hero-title-reveal 520ms cubic-bezier(0.22, 1, 0.36, 1) both,
      hero-title-shine 1100ms ease-out 120ms both;
  }

  .hero h1 > .hero-title-accent {
    animation-delay: 90ms, 210ms;
  }
}

@keyframes hero-art-enter {
  from {
    opacity: 0.78;
    transform: scale(1.035);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes hero-copy-reveal {
  from {
    opacity: 0;
    transform: translateY(0.35rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-title-reveal {
  from {
    opacity: 0;
    transform: translateY(0.45rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-title-shine {
  from {
    background-position: 100% 0;
  }

  to {
    background-position: 0 0;
  }
}
</style>
