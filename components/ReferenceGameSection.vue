<script setup lang="ts">
import { ArrowRight, Flame, Spade, Star, ThumbsUp, UsersRound } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { ReferenceGame } from '~/data/homepage'

interface Props {
  id: string
  title: string
  games: ReferenceGame[]
  variant: 'popular' | 'new' | 'recommended' | 'live'
  to: string
}

const props = defineProps<Props>()

const { translate } = useSiteLocale()

const sectionIcons: Record<Props['variant'], Component> = {
  popular: Flame,
  new: Star,
  recommended: ThumbsUp,
  live: Spade,
}

const gameTitles = computed(() => props.games.map((game) => game.title))
const sectionKey = computed(() => props.id)

const { getDisplayCount } = useRumblingPlayerCount(
  () => gameTitles.value,
  () => sectionKey.value,
)

const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl
const gameRowElement = ref<HTMLElement | null>(null)
let autoplayTimer: ReturnType<typeof setInterval> | undefined
let reducedMotionQuery: MediaQueryList | undefined

const stopAutoplay = (): void => {
  if (autoplayTimer === undefined) {
    return
  }

  clearInterval(autoplayTimer)
  autoplayTimer = undefined
}

const advanceGameSlider = (): void => {
  const gameRow = gameRowElement.value
  if (!gameRow || gameRow.scrollWidth <= gameRow.clientWidth + 1) {
    return
  }

  const firstGameCard = gameRow.querySelector<HTMLElement>('.reference-game')
  if (!firstGameCard) {
    return
  }

  const columnGap = Number.parseFloat(getComputedStyle(gameRow).columnGap) || 0
  const scrollStep = firstGameCard.offsetWidth + columnGap
  const maximumScrollLeft = gameRow.scrollWidth - gameRow.clientWidth
  const reachedLastGame = gameRow.scrollLeft >= maximumScrollLeft - scrollStep / 2

  gameRow.scrollTo({
    left: reachedLastGame ? 0 : Math.min(gameRow.scrollLeft + scrollStep, maximumScrollLeft),
    behavior: 'smooth',
  })
}

const startAutoplay = (): void => {
  stopAutoplay()

  if (document.hidden || reducedMotionQuery?.matches) {
    return
  }

  autoplayTimer = setInterval(advanceGameSlider, 3_500)
}

const handleVisibilityChange = (): void => {
  if (document.hidden) {
    stopAutoplay()
    return
  }

  startAutoplay()
}

const handleSliderFocusOut = (event: FocusEvent): void => {
  const nextFocusedElement = event.relatedTarget
  if (
    nextFocusedElement instanceof Node
    && event.currentTarget instanceof Node
    && event.currentTarget.contains(nextFocusedElement)
  ) {
    return
  }

  startAutoplay()
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  document.addEventListener('visibilitychange', handleVisibilityChange)
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

watch(
  () => props.games.length,
  async () => {
    await nextTick()
    gameRowElement.value?.scrollTo({ left: 0 })
    startAutoplay()
  },
)
</script>

<template>
  <section :id="id" class="reference-section" :class="`reference-section--${variant}`" :aria-labelledby="`${id}-title`">
    <header class="reference-heading">
      <div>
        <component :is="sectionIcons[props.variant]" :size="16" fill="currentColor" aria-hidden="true" />
        <h2 :id="`${id}-title`">{{ translate(title) }}</h2>
      </div>
      <NuxtLink :to="to">
        {{ translate('View All') }} <ArrowRight :size="10" />
      </NuxtLink>
    </header>

    <slot name="after-heading" />

    <div
      ref="gameRowElement"
      class="reference-game-row"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
      @focusin="stopAutoplay"
      @focusout="handleSliderFocusOut"
      @touchstart.passive="stopAutoplay"
      @touchend.passive="startAutoplay"
    >
      <a
        v-for="game in games"
        :key="game.id ?? game.title"
        class="reference-game"
        :class="{ 'reference-game--fallback': game.image === '/brand/2bet-logo.webp' }"
        :href="externalSiteUrl"
        target="_blank"
        rel="nofollow noopener noreferrer"
        :aria-label="`${translate('Play Real')} — ${game.title} by ${game.provider} on 2bet`"
      >
        <picture>
          <source
            v-if="game.image === '/brand/2bet-logo.webp'"
            media="(max-width: 63.99rem)"
            srcset="/reference/mobile-game-fallback.webp"
          >
          <img
            :src="game.image"
            :alt="game.image === '/brand/2bet-logo.webp'
              ? `2bet placeholder for ${game.title}`
              : `${game.title} slot game artwork`"
            :width="100"
            :height="100"
            loading="lazy"
            decoding="async"
          >
        </picture>
        <span class="reference-game-caption">
          <strong>{{ game.title }}</strong>
          <small>{{ game.provider }}</small>
        </span>
        <span
          v-if="variant === 'popular' || variant === 'new' || variant === 'recommended' || variant === 'live'"
          class="popular-hover-overlay"
          aria-hidden="true"
        >
          <span class="popular-hover-heading">{{ game.title }}</span>
          <span class="popular-hover-action">
            {{ translate('Play Real') }}
          </span>
          <span class="popular-hover-players">
            <UsersRound :size="11" />
            <span class="popular-hover-players-count">{{ getDisplayCount(game.title) }}</span>
          </span>
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.reference-section {
  margin-top: 0.2rem;
}

.reference-section--recommended {
  margin-top: 0.6rem;
}

.reference-section--live .reference-heading > div {
  color: #e2c37b;
}

.reference-heading {
  display: flex;
  min-height: 1.35rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.18rem;
}

.reference-heading > div {
  display: flex;
  align-items: center;
  color: #ffc94d;
  gap: 0.32rem;
}

.reference-heading h2 {
  margin: 0;
  color: var(--text);
  font-size: var(--font-section-heading);
  font-weight: 750;
  letter-spacing: -0.02em;
}

.reference-heading > a {
  display: inline-flex;
  position: relative;
  isolation: isolate;
  align-items: center;
  min-height: 1.15rem;
  padding: 0.12rem 0.38rem;
  overflow: hidden;
  border: 1px solid rgba(214, 232, 222, 0.17);
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.37rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.13), transparent 52%),
    rgba(3, 18, 13, 0.62);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px rgba(0, 0, 0, 0.28),
    0 0.16rem 0.42rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(18px) saturate(1.45);
  -webkit-backdrop-filter: blur(18px) saturate(1.45);
  gap: 0.18rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.reference-heading > a::before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 10%;
  left: 10%;
  height: 50%;
  border-radius: 0 0 50% 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), transparent);
  content: '';
  pointer-events: none;
}

.reference-heading > a:hover {
  border-color: rgba(91, 230, 179, 0.5);
  color: #ffffff;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.17), transparent 52%),
    rgba(4, 53, 38, 0.68);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.26),
    inset 0 -1px rgba(0, 25, 17, 0.3),
    0 0.2rem 0.5rem rgba(0, 0, 0, 0.26),
    0 0 0.45rem rgba(50, 212, 154, 0.1);
  transform: translateY(-1px);
}

.reference-game-row {
  display: grid;
  grid-auto-columns: calc((100% - 1.54rem) / 8);
  grid-auto-flow: column;
  grid-template-columns: none;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
  gap: 0.22rem;
}

.reference-game-row::-webkit-scrollbar {
  display: none;
}

.reference-game {
  display: block;
  position: relative;
  isolation: isolate;
  min-width: 0;
  aspect-ratio: 1 / 1;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(50, 212, 154, 0.1);
  border-radius: 0.3rem;
  color: inherit;
  text-decoration: none;
  background:
    linear-gradient(132deg, transparent 0 45%, rgba(0, 45, 31, 0.2) 45.5% 69%, transparent 69.5%),
    radial-gradient(ellipse 110% 82% at 0% 0%, rgba(3, 98, 66, 0.5), rgba(1, 50, 35, 0.22) 52%, transparent 76%),
    linear-gradient(155deg, #001c14, #000d09 64%, #000705);
  box-shadow:
    inset 0 1px rgba(50, 212, 154, 0.04),
    0 0.18rem 0.42rem rgba(0, 0, 0, 0.22);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.reference-game::before {
  position: absolute;
  z-index: -1;
  bottom: 8%;
  left: -82%;
  width: 126%;
  aspect-ratio: 1;
  border: 1px solid rgba(23, 141, 99, 0.16);
  border-radius: 50%;
  content: '';
  transform: rotate(-24deg);
}

.reference-game::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(132deg, transparent 44%, rgba(5, 85, 59, 0.08) 44.5% 67%, transparent 67.5%);
  clip-path: polygon(55% 0, 100% 0, 100% 100%, 12% 100%);
  content: '';
}

.reference-section--popular .reference-game {
  aspect-ratio: 1 / 1;
}

.reference-game:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.reference-game img {
  display: block;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 14%;
  object-fit: contain;
}

.reference-game picture {
  display: block;
  width: 100%;
  height: 100%;
}

.reference-game:not(.reference-game--fallback) img {
  padding: 0;
  object-fit: cover;
}

.popular-hover-overlay {
  display: flex;
  position: absolute;
  z-index: 3;
  inset: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.42rem;
  opacity: 0;
  color: #ffffff;
  background:
    radial-gradient(circle at 50% 42%, rgba(104, 54, 10, 0.28), transparent 48%),
    linear-gradient(180deg, rgba(13, 11, 8, 0.72), rgba(5, 10, 7, 0.9));
  backdrop-filter: blur(1px) saturate(1.15);
  -webkit-backdrop-filter: blur(1px) saturate(1.15);
  pointer-events: none;
  transition: opacity 180ms ease;
}

.popular-hover-heading {
  position: absolute;
  top: 0.4rem;
  right: 0.35rem;
  left: 0.35rem;
  overflow: hidden;
  font-size: clamp(0.42rem, 0.8vw, 0.62rem);
  font-weight: 850;
  line-height: 1.15;
  text-align: center;
  text-overflow: ellipsis;
  text-shadow: 0 1px 0.25rem rgba(0, 0, 0, 0.75);
  white-space: nowrap;
}

.popular-hover-action {
  display: inline-flex;
  position: relative;
  z-index: 4;
  min-width: 62%;
  min-height: clamp(1.25rem, 2.6vw, 1.8rem);
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(91, 230, 179, 0.52);
  border-radius: 0.38rem;
  color: #ffffff;
  font-size: clamp(0.42rem, 0.9vw, 0.62rem);
  font-weight: 850;
  line-height: 1;
  text-decoration: none;
  text-shadow: 0 1px 0 rgba(0, 34, 23, 0.45);
  background: linear-gradient(145deg, rgba(10, 151, 103, 0.82), rgba(3, 98, 66, 0.68));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.18),
    inset 0 -1px rgba(0, 52, 35, 0.3),
    0 0.18rem 0.5rem rgba(0, 52, 35, 0.3);
  transition:
    border-color 160ms ease,
    filter 160ms ease,
    transform 160ms ease;
}

.popular-hover-action:hover {
  border-color: rgba(130, 242, 200, 0.78);
  filter: brightness(1.04);
  transform: translateY(-1px);
}

.popular-hover-players {
  display: inline-flex;
  position: absolute;
  bottom: 0.35rem;
  left: 0.35rem;
  align-items: center;
  color: #ffffff;
  font-size: clamp(0.36rem, 0.7vw, 0.52rem);
  font-weight: 700;
  text-shadow: 0 1px 0.2rem rgba(0, 0, 0, 0.9);
  gap: 0.16rem;
}

.popular-hover-players-count {
  font-variant-numeric: tabular-nums;
  transition: opacity 160ms ease;
}

.reference-section--popular .reference-game:focus-visible .popular-hover-overlay,
.reference-section--new .reference-game:focus-visible .popular-hover-overlay,
.reference-section--recommended .reference-game:focus-visible .popular-hover-overlay,
.reference-section--live .reference-game:focus-visible .popular-hover-overlay {
  opacity: 1;
}

@media (hover: hover) {
  .reference-section--popular .reference-game:hover .popular-hover-overlay,
  .reference-section--new .reference-game:hover .popular-hover-overlay,
  .reference-section--recommended .reference-game:hover .popular-hover-overlay,
  .reference-section--live .reference-game:hover .popular-hover-overlay {
    opacity: 1;
  }
}

:global(html[data-theme='light']) .reference-game {
  border-color: rgba(3, 98, 66, 0.15);
  background:
    linear-gradient(132deg, transparent 0 45%, rgba(0, 45, 31, 0.2) 45.5% 69%, transparent 69.5%),
    radial-gradient(ellipse 110% 82% at 0% 0%, rgba(3, 98, 66, 0.5), rgba(1, 50, 35, 0.22) 52%, transparent 76%),
    linear-gradient(155deg, #001c14, #000d09 64%, #000705);
}

@media (min-width: 48rem) {
  .reference-heading > a {
    font-size: 0.5rem;
  }
}

.reference-game-caption {
  display: none;
}

@media (max-width: 63.99rem) {
  .reference-section {
    margin-top: 0.45rem;
  }

  .reference-heading {
    min-height: 1.85rem;
    margin-bottom: 0.35rem;
  }

  .reference-heading > div {
    gap: 0.38rem;
  }

  .reference-heading h2 {
    font-size: 0.95rem;
  }

  .reference-heading > a {
    min-height: 1.65rem;
    padding: 0.22rem 0.65rem;
    font-size: 0.75rem;
    gap: 0.24rem;
  }

  .reference-heading > a :deep(svg) {
    width: 0.75rem;
    height: 0.75rem;
  }

  .reference-game-row {
    grid-auto-columns: calc((100% - 0.76rem) / 3);
    grid-auto-flow: column;
    grid-template-columns: none;
    margin-right: calc(var(--page-padding) * -1);
    padding-right: var(--page-padding);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-padding-inline: 0 var(--page-padding);
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
    gap: 0.38rem;
  }

  .reference-game-row::-webkit-scrollbar {
    display: none;
  }

  .reference-section--popular .reference-game,
  .reference-game {
    display: flex;
    flex-direction: column;
    height: auto;
    aspect-ratio: auto;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    border-radius: 0.45rem;
    background: #0b1411;
  }

  .reference-game::before,
  .reference-game::after {
    display: none;
  }

  .reference-game img {
    aspect-ratio: 1 / 1;
    height: auto;
    padding: 0;
    border-radius: 0.45rem 0.45rem 0 0;
    object-fit: cover;
    background: linear-gradient(155deg, #082a1d, #03150f);
  }

  .reference-game picture {
    height: auto;
  }

  .reference-game--fallback picture {
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .reference-game--fallback img {
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
    object-fit: cover;
  }

  .reference-game-caption {
    display: flex;
    min-height: 2.35rem;
    flex-direction: column;
    justify-content: center;
    padding: 0.28rem 0.35rem 0.32rem;
    gap: 0.08rem;
  }

  .reference-game-caption strong {
    overflow: hidden;
    color: #f4f7f5;
    font-size: 0.78rem;
    font-weight: 750;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .reference-game-caption small {
    overflow: hidden;
    color: #8ea097;
    font-size: 0.66rem;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .popular-hover-heading {
    top: 0.5rem;
    padding-top: 0;
    font-size: 0.75rem;
  }

  .popular-hover-action {
    min-height: 1.65rem;
    padding: 0.22rem 0.55rem;
    font-size: 0.7rem;
  }

  .popular-hover-players {
    bottom: 2.6rem;
    font-size: 0.68rem;
  }
}

@media (min-width: 35.01rem) and (max-width: 63.99rem) {
  .reference-game-row {
    grid-auto-columns: calc((100% - 0.84rem) / 4);
  }
}
</style>
