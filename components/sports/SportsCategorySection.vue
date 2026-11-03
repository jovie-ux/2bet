<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { getSportsCategoryBackground, getSportsCategoryBanner, getSportsCategoryLabel } from '~/data/sports-category-banners'

const props = withDefaults(defineProps<{
  sport: string
  label?: string
  defaultExpanded?: boolean
  showBanner?: boolean
}>(), {
  defaultExpanded: true,
  showBanner: true,
})

const expanded = ref(props.defaultExpanded)
const title = computed(() => props.label || getSportsCategoryLabel(props.sport))
const banner = computed(() => getSportsCategoryBanner(props.sport))
const background = computed(() => getSportsCategoryBackground(props.sport))
const panelId = useId()
const sportsRouteBase = useSportsRouteBase()
const isPopular = computed(() => sportsRouteBase.value === '/explore/sports/popular')
const toggleExpanded = (): void => {
  expanded.value = !expanded.value
}
</script>

<template>
  <section class="sports-category-section" :class="{ 'sports-category-section--compact': isPopular }">
    <button
      v-if="showBanner"
      type="button"
      class="sports-category-banner"
      :style="{ backgroundImage: `url(${banner}), url(${background})` }"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="toggleExpanded"
    >
      <span>{{ title }}</span>
      <span class="sports-category-banner__toggle" aria-hidden="true">
        <ChevronDown :size="17" :class="{ 'rotate-180': expanded }" />
      </span>
    </button>

    <div v-show="expanded" :id="panelId" class="sports-category-section__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.sports-category-section {
  min-width: 0;
}

.sports-category-banner {
  position: relative;
  isolation: isolate;
  display: flex;
  width: 100%;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 8px 10px 8px 12px;
  border: 0;
  border-radius: 10px 10px 0 0;
  background-color: #051a16;
  background-position: right center, center;
  background-repeat: no-repeat;
  background-size: auto 100%, cover;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
}

.sports-category-banner::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(90deg, rgba(30, 39, 37, .78) 0%, rgba(4, 27, 23, .38) 36%, rgba(0, 0, 0, .04) 74%);
  content: '';
}

.sports-category-banner__toggle {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .22);
  border-radius: 999px;
  background: rgba(255, 255, 255, .18);
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
}

.sports-category-banner__toggle :deep(svg) {
  transition: transform .2s ease;
}

.sports-category-section__content {
  min-width: 0;
}

.sports-category-banner:focus-visible {
  outline: 2px solid #48daa6;
  outline-offset: 2px;
}

.sports-category-section--compact .sports-category-banner {
  height: 80px;
  min-height: 80px;
  align-items: flex-start;
  padding: 8px 12px;
  border-radius: 12px 12px 0 0;
  background-size: auto 80px, cover;
  font-size: 16px;
  line-height: 28px;
}

.sports-category-section--compact .sports-category-banner::before {
  background: linear-gradient(90deg, rgba(142, 153, 149, .66), rgba(51, 66, 62, .4) 24%, transparent 48%);
}

.sports-category-section--compact .sports-category-banner__toggle {
  width: 28px;
  height: 28px;
}

.sports-category-section--compact .sports-category-section__content {
  position: relative;
  margin-top: -36px;
  padding: 0 8px;
}

@media (max-width: 600px) {
  .sports-category-banner {
    min-height: 42px;
    font-size: 15px;
  }
}
</style>
