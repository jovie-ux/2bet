<script setup lang="ts">
import { ArrowRight, ChevronLeft, ChevronRight, CircleDot, Dices, Gift, Spade } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  id: string
  title: string
  description: string
  viewAllTo: string
  viewAllLabel: string
  itemCount: number
  visibleCards?: number
  itemsPerSlide?: number
  featuredFirst?: boolean
  resetKey?: string
  mobileDots?: boolean
}>(), { visibleCards: 5 })

const track = ref<HTMLElement | null>(null)
const { translate } = useSiteLocale()
const sectionIdentity = computed(() => ({
  slots: { icon: Dices, label: translate('THE SPIN COLLECTION') },
  'live-casino': { icon: Spade, label: translate('A SEAT AT THE TABLE') },
  bingo: { icon: CircleDot, label: translate('FIND YOUR LUCKY NUMBERS') },
  promotions: { icon: Gift, label: translate('A LITTLE SOMETHING EXTRA') },
}[props.id]))
const atStart = ref(true)
const atEnd = ref(false)
const firstVisible = ref(1)
let resizeObserver: ResizeObserver | undefined

function updatePosition() {
  const element = track.value
  if (!element) return
  atStart.value = element.scrollLeft <= 2
  atEnd.value = element.scrollWidth - element.clientWidth - element.scrollLeft <= 2
  const card = element.firstElementChild as HTMLElement | null
  const step = (card?.getBoundingClientRect().width || 0) + parseFloat(getComputedStyle(element).columnGap || '0')
  if (props.featuredFirst) {
    const left = element.getBoundingClientRect().left
    const distances = Array.from(element.children, child => Math.abs(child.getBoundingClientRect().left - left))
    firstVisible.value = distances.indexOf(Math.min(...distances)) + 1
    return
  }
  firstVisible.value = step ? Math.min(props.itemCount, Math.round(element.scrollLeft / step) + 1) : 1
}

function move(direction: number) {
  const element = track.value
  if (!element) return
  if (props.featuredFirst) {
    const left = element.getBoundingClientRect().left
    const positions = Array.from(element.children, child => child.getBoundingClientRect().left - left + element.scrollLeft)
    const destination = direction > 0
      ? positions.find(position => position > element.scrollLeft + 2) ?? element.scrollWidth
      : positions.filter(position => position < element.scrollLeft - 2).pop() ?? 0
    element.scrollTo({ left: destination, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    return
  }
  const card = element.firstElementChild as HTMLElement | null
  const gap = parseFloat(getComputedStyle(element).columnGap || '0')
  const step = (card?.getBoundingClientRect().width || 0) + gap
  const visible = step ? Math.max(1, Math.floor((element.clientWidth + gap + 1) / step)) : 1
  element.scrollBy({
    left: direction * step * (props.itemsPerSlide ?? visible),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

function goTo(index: number) {
  const element = track.value
  const card = element?.children[index] as HTMLElement | undefined
  if (!element || !card) return
  element.scrollTo({
    left: card.getBoundingClientRect().left - element.getBoundingClientRect().left + element.scrollLeft,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

function handleKey(event: KeyboardEvent) {
  // Links retain their own keyboard behaviour; browse from the track itself.
  if (event.target !== track.value || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') move(event.key === 'ArrowLeft' ? -1 : 1)
  else track.value?.scrollTo({ left: event.key === 'Home' ? 0 : track.value.scrollWidth, behavior: 'instant' })
}

watch([() => props.itemCount, () => props.resetKey], async () => {
  await nextTick()
  track.value?.scrollTo({ left: 0, behavior: 'instant' })
  updatePosition()
})
onMounted(() => {
  updatePosition()
  resizeObserver = new ResizeObserver(updatePosition)
  if (track.value) resizeObserver.observe(track.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <section :id="id" class="allgames-section allgames-slider-section" :aria-labelledby="`${id}-title`" aria-roledescription="carousel">
    <slot name="header" :first-visible="firstVisible" :at-start="atStart" :at-end="atEnd" :move="move">
    <header class="allgames-section-heading flex items-center justify-between gap-3">
      <div class="allgames-heading-copy flex items-center"><div><span v-if="sectionIdentity" class="allgames-section-eyebrow">{{ sectionIdentity.label }}</span><h2 :id="`${id}-title`"><component :is="sectionIdentity.icon" v-if="sectionIdentity" class="allgames-heading-symbol" :size="22" :stroke-width="1.6" aria-hidden="true" />{{ title }}</h2><p>{{ description }}</p></div></div>
      <div class="allgames-section-actions flex items-center">
        <NuxtLink :to="viewAllTo" class="allgames-view-all">{{ viewAllLabel }} <ArrowRight :size="17" /></NuxtLink>
        <div class="allgames-row-controls flex items-center" :aria-label="`${title} slider controls`">
          <span class="allgames-row-position" aria-live="polite" aria-atomic="true">{{ firstVisible }} / {{ itemCount }}</span>
          <button type="button" :disabled="atStart" :aria-label="`Previous ${title} items`" :aria-controls="`${id}-track`" @click="move(-1)"><ChevronLeft :size="18" /></button>
          <button type="button" :disabled="atEnd" :aria-label="`Next ${title} items`" :aria-controls="`${id}-track`" @click="move(1)"><ChevronRight :size="18" /></button>
        </div>
      </div>
    </header>
    </slot>
    <div
      :id="`${id}-track`"
      ref="track"
      class="allgames-game-track"
      :class="{ 'allgames-game-track--wide': visibleCards === 3, 'allgames-game-track--portrait': visibleCards === 7 }"
      :style="{ '--allgames-visible-cards': visibleCards }"
      :data-items-per-slide="itemsPerSlide"
      role="group"
      :aria-label="`${title}: swipe or use the arrow keys to browse all ${itemCount} items`"
      tabindex="0"
      @scroll.passive="updatePosition"
      @keydown="handleKey"
    ><slot :first-visible="firstVisible" /></div>
    <slot name="footer" :first-visible="firstVisible" :at-start="atStart" :at-end="atEnd" :move="move">
      <div v-if="mobileDots && itemCount > 1" class="homepage-slider-dots" role="group" :aria-label="`${title} slide navigation`">
        <button v-for="index in itemCount" :key="index" type="button" :aria-label="`Show ${title} slide ${index} of ${itemCount}`" :aria-controls="`${id}-track`" :aria-current="firstVisible === index ? 'true' : undefined" @click="goTo(index - 1)"><span aria-hidden="true" /></button>
      </div>
    </slot>
  </section>
</template>
