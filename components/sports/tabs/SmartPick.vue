<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'

const emit = defineEmits<{
  explore: []
}>()
const { translate } = useSiteLocale()
</script>

<template>
  <div class="empty">
    <Sparkles
      :size="32"
      aria-hidden="true"
    />
    <h2>{{ translate('Smart Pick is coming soon') }}</h2>
    <p>{{ translate('Match insights and selections aren’t available yet. Explore the leagues and upcoming matches.') }}</p>
    <button
      type="button"
      @click="emit('explore')"
    >
      {{ translate('Explore leagues') }}
    </button>
  </div>
</template>
