<script setup lang="ts">
const { translate } = useSiteLocale()
</script>

<template>
  <div class="bonus-empty-state" role="status">
    <img src="/images/empty/no-events.webp" alt="" width="214" height="133" decoding="async">
    <p>{{ translate('No Event') }}</p>
  </div>
</template>

<style scoped>
.bonus-empty-state { display: flex; width: 100%; min-height: max(320px, calc(100dvh - 300px)); flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center; }
.bonus-empty-state img { display: block; width: 214px; max-width: 60vw; height: auto; }
.bonus-empty-state p { margin: 0; color: #959799; font-size: 16px; font-weight: 400; line-height: 24px; }
@media (max-width: 63.99rem) {
  .bonus-empty-state { min-height: max(320px, calc(100dvh - 250px)); }
}
</style>
