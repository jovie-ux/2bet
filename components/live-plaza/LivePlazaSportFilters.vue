<script setup lang="ts">
import { Star } from 'lucide-vue-next'

export type LivePlazaSportFilter = 'all' | 'basketball' | 'soccer'

defineProps<{
  modelValue: LivePlazaSportFilter
}>()

const emit = defineEmits<{
  'update:modelValue': [value: LivePlazaSportFilter]
}>()

const { translate } = useSitePreferences()

const filters: Array<{
  id: LivePlazaSportFilter
  label: string
  icon?: string
}> = [
  { id: 'all', label: 'All' },
  { id: 'basketball', label: 'Basketball', icon: '/icons/sports/basketball.webp' },
  { id: 'soccer', label: 'Soccer', icon: '/icons/sports/soccer.webp' },
]
</script>

<template>
  <div class="sport-filters" role="group" :aria-label="translate('Filter predictions by sport')">
    <button
      v-for="filter in filters"
      :key="filter.id"
      type="button"
      class="sport-filter"
      :class="{ 'sport-filter--active': modelValue === filter.id }"
      :aria-pressed="modelValue === filter.id"
      @click="emit('update:modelValue', filter.id)"
    >
      <span v-if="filter.id === 'all'" class="sport-filter__all-icon" aria-hidden="true">
        <Star :size="10" :stroke-width="2.6" />
      </span>
      <img
        v-else
        :src="filter.icon"
        :alt="translate(filter.label)"
        class="sport-filter__icon"
        width="17"
        height="17"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      >
      <span>{{ translate(filter.label) }}</span>
    </button>
  </div>
</template>

<style scoped>
.sport-filters {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.28rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.sport-filters::-webkit-scrollbar {
  display: none;
}

.sport-filter {
  display: inline-flex;
  min-height: 30px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 0.18rem 0.44rem;
  border: 0;
  border-radius: 0.55rem;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.58rem;
  font-weight: 700;
  line-height: 1;
  background: transparent;
  cursor: pointer;
  gap: 0.22rem;
  transition: color 150ms ease, background-color 150ms ease;
}

.sport-filter:hover {
  background: rgba(255, 255, 255, 0.055);
}

.sport-filter--active,
.sport-filter--active:hover {
  color: #ffffff;
  background: var(--main-color);
}

.sport-filter__all-icon {
  display: grid;
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: #ffad2f;
}

.sport-filter__all-icon :deep(svg) {
  fill: currentColor;
}

.sport-filter__icon {
  display: block;
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  object-fit: contain;
}

@media (max-width: 47.99rem) {
  .sport-filter {
    min-height: 28px;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    font-size: 12px;
  }
}
</style>
