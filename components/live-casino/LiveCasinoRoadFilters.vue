<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import LiveCasinoRoadPatternIcon from '~/components/live-casino/LiveCasinoRoadPatternIcon.vue'
import { LIVE_CASINO_ROAD_PATTERNS, type LiveCasinoRoadPatternKey } from '~/utils/liveCasinoRoadPatterns'

const props = defineProps<{ modelValue: LiveCasinoRoadPatternKey }>()
const emit = defineEmits<{ 'update:modelValue': [value: LiveCasinoRoadPatternKey]; 'update:open': [value: boolean] }>()
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const isOpen = ref(false)
const selected = computed(() => LIVE_CASINO_ROAD_PATTERNS.find(pattern => pattern.key === props.modelValue))
const options = computed(() => [{ key: 'all' as const, label: 'All Roads', title: 'All Roads', sample: undefined }, ...LIVE_CASINO_ROAD_PATTERNS])
const setOpen = (open: boolean): void => {
  isOpen.value = open
  emit('update:open', open)
}
const closeOutside = (event: MouseEvent): void => {
  if (isOpen.value && event.target instanceof Node && !root.value?.contains(event.target)) setOpen(false)
}
const closeWithKeyboard = (): void => {
  setOpen(false)
  trigger.value?.focus()
}
onMounted(() => document.addEventListener('click', closeOutside))
onBeforeUnmount(() => document.removeEventListener('click', closeOutside))
</script>

<template>
  <div ref="root" class="casino-road-filter" @keydown.esc.stop.prevent="closeWithKeyboard">
    <div v-if="isOpen" class="casino-road-pattern-menu" role="group" aria-label="Road patterns">
      <button
        v-for="option in options"
        :key="option.key"
        type="button"
        class="casino-road-pattern-option"
        :class="{ 'casino-road-pattern-option--active': modelValue === option.key, 'casino-road-pattern-option--long': option.key.startsWith('two-rooms') }"
        :aria-pressed="modelValue === option.key"
        :title="option.title"
        @click="emit('update:modelValue', option.key)"
      >
        <LiveCasinoRoadPatternIcon :sample="option.sample" />
        <span>{{ option.key.startsWith('two-rooms') ? option.title : option.label }}</span>
      </button>
    </div>
    <button ref="trigger" type="button" class="casino-road-filter-trigger" :class="{ 'casino-road-filter-trigger--open': isOpen }" :aria-expanded="isOpen" aria-label="Filter table roadmaps" @click="setOpen(!isOpen)">
      <LiveCasinoRoadPatternIcon :sample="selected?.sample" />
      <span>{{ selected?.label || 'All Roads' }}</span>
      <ChevronDown :size="12" :class="{ 'casino-road-filter-chevron--open': isOpen }" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.casino-road-filter { position: relative; min-width: 0; }
.casino-road-filter-trigger { display: flex; min-height: 32px; align-items: center; justify-content: center; gap: 5px; padding: 0 10px; border: 1px solid transparent; border-radius: 18px; color: #929292; background: #282828; font-size: 10px; white-space: nowrap; cursor: pointer; }
.casino-road-filter-trigger > span { max-width: 95px; overflow: hidden; text-overflow: ellipsis; }
.casino-road-filter-trigger--open { border-color: var(--main-color); color: var(--main-color); }
.casino-road-filter-chevron--open { transform: rotate(180deg); }
.casino-road-pattern-menu { position: absolute; z-index: 35; top: 50%; right: calc(100% + 6px); display: flex; align-items: stretch; gap: 6px; transform: translateY(-50%); }
.casino-road-pattern-option { display: flex; width: 64px; min-height: 66px; flex: 0 0 auto; align-items: center; justify-content: center; gap: 2px; padding: 5px 4px; border: 1px solid transparent; border-radius: 16px; color: #d5d5d5; background: #0b0b0b; font-size: 10px; line-height: 13px; cursor: pointer; }
.casino-road-pattern-option:first-child { width: 72px; }
.casino-road-pattern-option--long { width: 90px; }
.casino-road-pattern-option--active { border-color: var(--main-color); color: var(--main-color); background: #282828; }
.casino-road-pattern-option:hover { background: #222; }
.casino-road-pattern-option span { min-width: 0; text-align: center; }
.casino-road-pattern-option :deep(svg) { width: 18px; height: 20px; }
.casino-road-filter button:focus-visible { outline: 2px solid var(--main-color); outline-offset: 2px; }
@media (max-width: 1439px) {
  .casino-road-pattern-menu { top: calc(100% + 8px); right: 0; max-width: min(1000px, calc(100vw - 230px)); overflow-x: auto; padding: 5px; border: 1px solid #292929; border-radius: 18px; background: #080808; box-shadow: 0 8px 24px #0009; transform: none; }
}
@media (max-width: 639px) {
  .casino-road-filter-trigger { gap: 3px; padding: 0 7px; }
  .casino-road-filter-trigger > span { max-width: 68px; }
  .casino-road-pattern-menu { right: -62px; max-width: calc(100vw - 28px); }
}
</style>
