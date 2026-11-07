<script setup lang="ts">
const { translate } = useSiteLocale()
</script>

<template>
  <div class="empty">
    <img
      src="/images/empty/no-events.webp"
      :alt="translate('No replays available')"
      class="h-auto w-full max-w-[200px] object-contain"
    />
    <h2>{{ translate('No replays available') }}</h2>
    <p>{{ translate('Soccer match replays will appear here when they become available.') }}</p>
  </div>
</template>
