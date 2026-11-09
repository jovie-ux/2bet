<template>
  <span class="mobile-sports-roulette">
    <RouletteEntryButton style="border: 0" />
  </span>
</template>

<style scoped>
.mobile-sports-roulette { display: none; }

@media (max-width: 63.99rem) {
  .mobile-sports-roulette { display: block; flex: 0 0 36px; width: 36px; height: 36px; }
  .mobile-sports-roulette :deep(.roulette-entry) {
    --roulette-entry-size: 36px;
    display: block;
    width: 36px;
    height: 36px;
    min-height: 36px;
    padding: 0;
    border: 1px solid #d1bb53;
    border-radius: 50%;
    background: var(--main-color);
  }
}
</style>
