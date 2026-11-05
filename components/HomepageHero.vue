<script setup lang="ts">
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-vue-next'

const slideDuration = 8000
const slides = [
  {
    category: 'Sports',
    id: 'sports',
    headline: 'Every game.',
    subheadline: 'One destination.',
    description: 'Get closer to the games you love. Explore football, basketball and tennis.',
    action: 'Explore sports',
    to: '/explore/sports/popular/league',
    image: '/hero/editorial/sports.webp',
  },
  {
    category: 'Slots',
    id: 'slots',
    headline: 'Find your spin.',
    subheadline: 'Make it a moment.',
    description: 'Discover your favourites, new releases and a world of slot games.',
    action: 'Explore slots',
    to: '/explore/egames/slots',
    image: '/hero/editorial/slots.webp',
  },
  {
    category: 'Live Casino',
    id: 'live-casino',
    headline: 'Real dealers.',
    subheadline: 'Your seat awaits.',
    description: 'Enjoy baccarat, roulette and blackjack, live from the table.',
    action: 'Explore live casino',
    to: '/explore/entertainment/live-casino/baccarat',
    image: '/hero/editorial/live-casino.webp',
  },
  {
    category: 'Promotions',
    id: 'promotions',
    headline: 'A little extra.',
    subheadline: 'Every day.',
    description: 'Explore exclusive offers, seasonal events and rewards across your favourite games.',
    action: 'Discover promotions',
    to: '/explore/bonuses',
    image: '/hero/editorial/promotions.webp',
  },
]

const activeIndex = ref(0)
const autoplayPaused = ref(false)
const slide = computed(() => slides[activeIndex.value]!)
const nextSlide = computed(() => slides[(activeIndex.value + 1) % slides.length]!)
const slideNumber = computed(() => String(activeIndex.value + 1).padStart(2, '0'))
let autoplayTimer: ReturnType<typeof setTimeout> | undefined
let motionPreference: MediaQueryList | undefined
let mounted = false
let pointerInside = false
let keyboardFocusInside = false
let touchStart: { x: number; y: number } | undefined

function stopAutoplay() {
  clearTimeout(autoplayTimer)
  autoplayTimer = undefined
}

function startAutoplay() {
  stopAutoplay()
  if (!mounted || autoplayPaused.value || pointerInside || keyboardFocusInside || document.hidden) return
  autoplayTimer = setTimeout(() => changeSlide(1), slideDuration)
}

function selectSlide(index: number) {
  activeIndex.value = (index + slides.length) % slides.length
  startAutoplay()
}

function changeSlide(direction: number) {
  selectSlide(activeIndex.value + direction)
}

function toggleAutoplay() {
  autoplayPaused.value = !autoplayPaused.value
  if (!autoplayPaused.value) keyboardFocusInside = false
  startAutoplay()
}

function handlePointerEnter(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  pointerInside = true
  stopAutoplay()
}

function handlePointerLeave() {
  pointerInside = false
  startAutoplay()
}

function handleFocusIn(event: FocusEvent) {
  if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) {
    keyboardFocusInside = true
    stopAutoplay()
  }
}

function handleFocusOut(event: FocusEvent) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
  keyboardFocusInside = false
  startAutoplay()
}

function handleMotionPreference() {
  if (motionPreference?.matches) autoplayPaused.value = true
  startAutoplay()
}

function handleTouchStart(event: TouchEvent) {
  const touch = event.touches.length === 1 ? event.touches[0] : undefined
  touchStart = touch ? { x: touch.clientX, y: touch.clientY } : undefined
  stopAutoplay()
}

function handleTouchEnd(event: TouchEvent) {
  const start = touchStart
  const touch = event.changedTouches[0]
  touchStart = undefined
  if (start && touch) {
    const distance = touch.clientX - start.x
    if (Math.abs(distance) > 45 && Math.abs(distance) > Math.abs(touch.clientY - start.y) * 1.2) {
      if (event.cancelable) event.preventDefault()
      changeSlide(distance < 0 ? 1 : -1)
    }
  }
  startAutoplay()
}

function cancelTouch() {
  touchStart = undefined
  startAutoplay()
}

onMounted(() => {
  mounted = true
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', handleMotionPreference)
  document.addEventListener('visibilitychange', startAutoplay)
  handleMotionPreference()
})

onBeforeUnmount(() => {
  mounted = false
  stopAutoplay()
  motionPreference?.removeEventListener('change', handleMotionPreference)
  document.removeEventListener('visibilitychange', startAutoplay)
})
</script>

<template>
  <section
    id="allgames-featured"
    class="homepage-hero relative overflow-hidden"
    :class="{ 'homepage-hero--paused': autoplayPaused }"
    :style="{ '--hero-slide-duration': `${slideDuration}ms` }"
    aria-roledescription="carousel"
    aria-label="Featured categories"
    aria-labelledby="homepage-hero-title"
    :data-slide="slide.id"
    @keydown.left.prevent="changeSlide(-1)"
    @keydown.right.prevent="changeSlide(1)"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @touchstart.passive="handleTouchStart"
    @touchend="handleTouchEnd"
    @touchcancel="cancelTouch"
  >
    <Transition
      v-for="(item, index) in slides"
      :key="item.id"
      name="hero-photo"
      type="transition"
    >
      <img
        v-show="activeIndex === index"
        class="homepage-hero__photo"
        :class="{ 'is-active': activeIndex === index }"
        :data-category="item.id"
        :src="item.image"
        alt=""
        width="1672"
        height="941"
        :fetchpriority="index === 0 ? 'high' : 'low'"
        decoding="async"
      >
    </Transition>
    <div class="homepage-hero__shade" aria-hidden="true" />

    <div class="homepage-hero__markers flex" aria-label="Choose a featured category">
      <button
        v-for="(item, index) in slides"
        :key="item.id"
        type="button"
        :class="{ 'is-active': activeIndex === index }"
        :aria-label="`Show ${item.category}`"
        :aria-pressed="activeIndex === index"
        aria-controls="homepage-hero-content"
        @click="selectSlide(index)"
      ><span aria-hidden="true" /></button>
    </div>

    <div id="homepage-hero-content" class="homepage-hero__copy" :aria-live="autoplayPaused ? 'polite' : 'off'" aria-atomic="true">
      <div :key="slide.id" class="homepage-hero__copy-content">
        <p class="homepage-hero__eyebrow">{{ slide.category }}</p>
        <h1 id="homepage-hero-title"><span>{{ slide.headline }}</span><span>{{ slide.subheadline }}</span></h1>
        <p class="homepage-hero__description">{{ slide.description }}</p>
        <NuxtLink :to="slide.to" class="homepage-hero__action homepage-primary-action inline-flex items-center justify-center">
          {{ slide.action }} <ArrowRight :size="20" :stroke-width="1.8" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>

    <div class="homepage-hero__preview">
      <p class="homepage-hero__counter" aria-hidden="true">{{ slideNumber }} <span>/ {{ String(slides.length).padStart(2, '0') }}</span></p>
      <div class="homepage-hero__preview-row flex">
        <button type="button" class="homepage-hero__thumbnail overflow-hidden" :aria-label="`Preview ${nextSlide.category}`" aria-controls="homepage-hero-content" @click="changeSlide(1)">
          <img :src="nextSlide.image" alt="" width="1672" height="941" decoding="async">
          <span>{{ nextSlide.category }}</span>
        </button>
        <div class="homepage-hero__arrows flex flex-col">
          <button type="button" aria-label="Previous featured category" aria-controls="homepage-hero-content" @click="changeSlide(-1)"><ChevronLeft :size="22" :stroke-width="1.5" aria-hidden="true" /></button>
          <button type="button" aria-label="Next featured category" aria-controls="homepage-hero-content" @click="changeSlide(1)"><ChevronRight :size="22" :stroke-width="1.5" aria-hidden="true" /></button>
        </div>
      </div>
    </div>

    <div class="homepage-hero__footer flex items-center justify-between">
      <a href="#sports" class="homepage-hero__scroll inline-flex items-center">
        <span class="homepage-hero__scroll-icon" aria-hidden="true"><ArrowDown :size="17" /></span>
        <span class="homepage-hero__scroll-label">Scroll to explore</span>
      </a>
      <button type="button" class="homepage-hero__playback inline-flex items-center" :aria-label="autoplayPaused ? 'Resume hero autoplay' : 'Pause hero autoplay'" :aria-pressed="autoplayPaused" @click="toggleAutoplay">
        <Play v-if="autoplayPaused" :size="15" aria-hidden="true" /><Pause v-else :size="15" aria-hidden="true" />
        <span>{{ autoplayPaused ? 'Play slideshow' : 'Pause slideshow' }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.homepage-hero {
  --hero-accent: var(--brand);
  width: calc(100% - 2 * var(--allgames-content-padding));
  min-width: 0;
  min-height: 540px;
  max-height: 750px;
  aspect-ratio: 1701 / 925;
  margin-inline: var(--allgames-content-padding);
  border: 1px solid #ffffff12;
  border-radius: 10px;
  background: #07110d;
  color: #fff;
  isolation: isolate;
  container-type: inline-size;
  touch-action: pan-y pinch-zoom;
}
.homepage-hero__photo,.homepage-hero__shade { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.homepage-hero__photo { z-index: -2; object-fit: cover; transform-origin: 70% center; animation: hero-photo-zoom-out var(--hero-slide-duration) linear both; transition: opacity 550ms ease; }
.hero-photo-enter-from,.hero-photo-leave-to { opacity: 0; }
.homepage-hero--paused .homepage-hero__photo { animation-play-state: paused; }
.homepage-hero__shade { z-index: -1; background: linear-gradient(90deg,#020c0a38,transparent 75%),linear-gradient(0deg,#020c0a66,transparent 25%); }
.homepage-hero__copy { position: absolute; top: 19%; left: 13.5%; width: 65%; }
.homepage-hero__copy-content { animation: hero-copy-in 380ms ease both; }
.homepage-hero .homepage-hero__eyebrow { margin-bottom: 19px; font-size: clamp(14px,1.1cqw,17px); font-weight: 600; letter-spacing: .28em; text-transform: uppercase; }
.homepage-hero h1 { font-family: var(--homepage-display-font,Impact,'Arial Narrow','Manrope',sans-serif); font-size: clamp(56px,6.5cqw,90px); font-weight: var(--homepage-display-weight,400); line-height: 1.04; letter-spacing: -.02em; }
.homepage-hero h1 span { display: block; white-space: nowrap; animation: hero-title-reveal 780ms cubic-bezier(.16,1,.3,1) both; }
.homepage-hero h1 span+span { animation-delay: 150ms; }
.homepage-hero h1 span:first-child {
  color: var(--hero-accent);
  background: linear-gradient(105deg,var(--hero-accent) 42%,#5bd79c 50%,var(--hero-accent) 58%);
  background-size: 260% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hero-title-reveal 780ms cubic-bezier(.16,1,.3,1) both,hero-title-sheen 1500ms ease 450ms both;
}
.homepage-hero .homepage-hero__description { max-width: 44cqw; margin-top: 28px; color: #edf1ee; font-size: clamp(14px,1.4cqw,20px); line-height: 1.6; text-wrap: pretty; }
.homepage-hero .homepage-hero__action { position: relative; isolation: isolate; overflow: hidden; margin-top: 34px; }
.homepage-hero__action::before { content: ''; position: absolute; z-index: -1; top: -90%; left: -65%; width: 42%; height: 280%; background: linear-gradient(90deg,transparent,#ffffff26 20%,#ffffffb3 50%,#ffffff26 80%,transparent); opacity: 0; transform: translateX(0) skewX(-24deg); pointer-events: none; }
.homepage-hero .homepage-hero__action:is(:hover,:focus-visible) { background: var(--brand-hover); }
.homepage-hero__action:is(:hover,:focus-visible)::before { animation: hero-button-splash 700ms cubic-bezier(.2,.65,.3,1) both; }
.homepage-hero__action svg { flex-shrink: 0; transition: transform 180ms; }
.homepage-hero__action:is(:hover,:focus-visible) svg { transform: translateX(3px); }
.homepage-hero__markers { position: absolute; z-index: 2; top: 43%; left: 6%; flex-direction: column; gap: 2px; }
.homepage-hero__markers button { display: grid; place-items: center; width: 32px; height: 30px; border: 1px solid transparent; background: transparent; }
.homepage-hero__markers button span { width: 6px; height: 6px; background: #fff; }
.homepage-hero__markers button.is-active { border-color: var(--hero-accent); }
.homepage-hero__markers button.is-active span { width: 8px; height: 8px; background: var(--hero-accent); outline: 1px solid var(--hero-accent); outline-offset: 3px; }
.homepage-hero__preview { position: absolute; top: 37%; right: 0; width: 18%; }
.homepage-hero .homepage-hero__counter { margin-bottom: 7px; font-size: clamp(14px,1.5cqw,23px); line-height: 1.2; font-variant-numeric: tabular-nums; text-shadow: 0 1px 8px #0009; }
.homepage-hero__counter span { color: #e9ece9; }
.homepage-hero__preview-row { height: clamp(88px,8.1cqw,130px); }
.homepage-hero__thumbnail { position: relative; flex: 1; min-width: 0; border: 1px solid #ffffff38; background: #091610; text-align: left; }
.homepage-hero__thumbnail img { width: 100%; height: 100%; object-fit: cover; object-position: 75% center; transition: transform 250ms; }
.homepage-hero__thumbnail:hover img { transform: scale(1.04); }
.homepage-hero__thumbnail span { position: absolute; inset: auto 0 0; padding: 16px 10px 7px; background: linear-gradient(transparent,#000b); color: #fff; font-size: 10px; font-weight: 700; }
.homepage-hero__arrows { flex-shrink: 0; width: clamp(40px,3.8cqw,60px); background: var(--hero-accent); }
.homepage-hero__arrows button { display: grid; flex: 1; place-items: center; min-height: 44px; color: #fff; transition: background 180ms; }
.homepage-hero__arrows button:hover { background: var(--brand-hover); }
.homepage-hero__footer { position: absolute; right: 7%; bottom: 6%; left: 7%; gap: 20px; }
.homepage-hero__scroll { gap: 10px; min-height: 44px; font-size: 14px; font-weight: 600; transition: color 220ms ease; }
.homepage-hero__scroll-icon { display: grid; place-items: center; flex-shrink: 0; width: 32px; height: 32px; border: 1px solid #ffffffb3; transition: border-color 220ms ease,background-color 220ms ease,box-shadow 220ms ease; }
.homepage-hero__scroll-icon svg { animation: hero-scroll-nudge 3s ease-in-out infinite; }
.homepage-hero__scroll-label { position: relative; }
.homepage-hero__scroll-label::after { content: ''; position: absolute; right: 0; bottom: -4px; left: 0; height: 1px; background: var(--hero-accent); opacity: .65; transform: scaleX(.2); transform-origin: left; transition: transform 240ms ease,opacity 240ms ease; }
.homepage-hero__scroll:is(:hover,:focus-visible) .homepage-hero__scroll-icon { border-color: var(--hero-accent); background: rgb(var(--color-primary) / .18); box-shadow: 0 0 0 4px rgb(var(--color-primary) / .1); }
.homepage-hero__scroll:is(:hover,:focus-visible) .homepage-hero__scroll-label::after { opacity: 1; transform: scaleX(1); }
.homepage-hero__playback { min-height: 44px; gap: 8px; color: #e8eeea; font-size: 10px; }
.homepage-hero__scroll:hover,.homepage-hero__playback:hover { color: #a6e9c2; }
.homepage-hero :is(a,button):focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
@keyframes hero-copy-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes hero-photo-zoom-out { from { transform: scale(1.09); } to { transform: scale(1); } }
@keyframes hero-title-reveal { from { opacity: 0; transform: translateY(.22em); filter: blur(5px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
@keyframes hero-title-sheen { from { background-position: 100% 0; } to { background-position: 0% 0; } }
@keyframes hero-scroll-nudge { 0%,60%,100% { transform: translateY(0); } 75% { transform: translateY(4px); } 88% { transform: translateY(0); } }
@keyframes hero-button-splash { 0% { opacity: 0; transform: translateX(0) skewX(-24deg); } 15%,75% { opacity: 1; } 100% { opacity: 0; transform: translateX(420%) skewX(-24deg); } }
@media (max-width: 1199px) and (min-width: 701px) {
  .homepage-hero { min-height: 500px; }
  .homepage-hero__copy { top: 17%; left: 12%; }
  .homepage-hero h1 { font-size: 7.5cqw; }
  .homepage-hero .homepage-hero__description { max-width: 48cqw; font-size: 14px; }
  .homepage-hero .homepage-hero__action { margin-top: 24px; }
  .homepage-hero__markers { left: 4%; }
  .homepage-hero__preview { width: 19%; top: 40%; }
  .homepage-hero__footer { bottom: 5%; }
}
@media (max-width: 700px) {
  .homepage-hero { min-height: 560px; aspect-ratio: auto; border-radius: 8px; }
  .homepage-hero__photo { object-position: 88% top; transform-origin: 88% 20%; }
  .homepage-hero__shade { background: linear-gradient(0deg,#03110ff5 5%,#03110fe8 25%,#03110fbb 52%,#03110f08 90%); }
  .homepage-hero__copy { top: auto; right: 22px; bottom: 154px; left: 22px; width: auto; }
  .homepage-hero .homepage-hero__eyebrow { margin-bottom: 14px; font-size: 14px; letter-spacing: .24em; }
  .homepage-hero h1 { font-size: clamp(32px,10.5cqw,65px); line-height: 1.08; }
  .homepage-hero .homepage-hero__description { max-width: 365px; margin-top: 20px; font-size: 14px; }
  .homepage-hero .homepage-hero__action { margin-top: 24px; }
  .homepage-hero__markers { top: auto; bottom: 36px; left: 12px; flex-direction: row; gap: 0; }
  .homepage-hero__markers button { height: 44px; width: 28px; }
  .homepage-hero__preview { top: auto; right: 22px; bottom: 24px; width: 132px; }
  .homepage-hero .homepage-hero__counter { margin-bottom: 6px; font-size: 12px; }
  .homepage-hero__preview-row { height: 88px; }
  .homepage-hero__arrows { width: 40px; }
  .homepage-hero__thumbnail span { padding: 12px 6px 5px; font-size: 8px; }
  .homepage-hero__footer { top: 15px; right: 15px; bottom: auto; left: auto; }
  .homepage-hero__scroll { display: none; }
  .homepage-hero__playback { justify-content: center; width: 40px; border: 1px solid #ffffff50; border-radius: 50%; background: #04100b99; }
  .homepage-hero__playback>span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .homepage-hero__photo,.homepage-hero__thumbnail img,.homepage-hero__action svg,.homepage-hero__scroll,.homepage-hero__scroll-icon,.homepage-hero__scroll-label::after { transition: none; }
  .homepage-hero__photo,.homepage-hero__copy-content,.homepage-hero h1 span,.homepage-hero__scroll-icon svg { animation: none; }
  .homepage-hero__action::before { animation: none; opacity: 0; }
  .homepage-hero h1 span:first-child { background: none; -webkit-text-fill-color: currentColor; }
}
@media (forced-colors: active) {
  .homepage-hero h1 span:first-child { background: none; color: CanvasText; -webkit-text-fill-color: currentColor; }
}
</style>
