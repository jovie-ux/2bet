<script setup lang="ts">
const route = useRoute()
const redirectUrl = useRuntimeConfig().public.bybetRedirectUrl
const { isLoading } = useByBetLoader()
</script>

<template>
  <a
    class="roulette-entry"
    :href="redirectUrl"
    target="_blank"
    rel="nofollow noopener noreferrer"
    aria-label="Open roulette in a new tab"
    title="Roulette"
  >
    <span
      :key="route.path"
      class="roulette-entry__motion"
      :class="{ 'roulette-entry__motion--rolling': !isLoading }"
      aria-hidden="true"
    >
      <img
        class="roulette-entry__wheel"
        src="/images/roulette-entry/roulette-wheel.png"
        alt=""
        width="288"
        height="288"
        decoding="async"
        draggable="false"
      >
      <span class="roulette-entry__ball-track">
        <img
          class="roulette-entry__ball"
          src="/images/roulette-entry/roulette-ball.png"
          alt=""
          width="96"
          height="96"
          decoding="async"
          draggable="false"
        >
      </span>
    </span>
    <span class="roulette-entry__logo-panel" aria-hidden="true">
      <img
        class="roulette-entry__logo"
        src="/images/roulette-entry/2bet-logo.png"
        alt=""
        width="148"
        height="54"
        decoding="async"
        draggable="false"
      >
    </span>
  </a>
</template>

<style scoped>
.roulette-entry {
  position: relative;
  isolation: isolate;
  display: block;
  width: var(--roulette-entry-size, var(--header-control-size, 30px));
  height: var(--roulette-entry-size, var(--header-control-size, 30px));
  overflow: hidden;
  flex: 0 0 auto;
  border: 1px solid #d1bb53;
  border-radius: 50%;
  background: var(--main-color, #019440);
  outline-offset: 3px;
  transition: filter 160ms ease;
}

.roulette-entry:hover {
  filter: brightness(1.12);
}

.roulette-entry:focus-visible {
  outline: 2px solid #fedf00;
}

.roulette-entry__motion,
.roulette-entry__wheel,
.roulette-entry__ball-track {
  position: absolute;
  inset: 0;
}

.roulette-entry__motion {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 50%;
  width: 85px;
  height: 85px;
  transform: translateX(-50%);
}

.roulette-entry__wheel {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.roulette-entry__ball-track {
  transform: rotate(0deg);
}

.roulette-entry__ball {
  position: absolute;
  top: 5%;
  left: 50%;
  display: block;
  width: 13%;
  height: 13%;
  object-fit: contain;
  transform: translateX(-50%);
}

.roulette-entry__logo-panel {
  position: absolute;
  inset: 0 0 48%;
  z-index: 1;
  background: var(--main-color, #019440);
  pointer-events: none;
}

.roulette-entry__logo {
  position: absolute;
  top: 20%;
  left: 50%;
  display: block;
  width: 74%;
  height: auto;
  transform: translateX(-50%);
}

.roulette-entry__motion--rolling .roulette-entry__wheel {
  animation: roulette-wheel-roll 1.8s cubic-bezier(0.12, 0.65, 0.18, 1) both;
}

.roulette-entry__motion--rolling .roulette-entry__ball-track {
  animation: roulette-ball-roll 1.8s cubic-bezier(0.12, 0.65, 0.18, 1) both;
}

@keyframes roulette-wheel-roll {
  from { transform: rotate(-900deg); }
  to { transform: rotate(0deg); }
}

@keyframes roulette-ball-roll {
  from { transform: rotate(1080deg); }
  to { transform: rotate(0deg); }
}

@media (prefers-reduced-motion: reduce) {
  .roulette-entry,
  .roulette-entry__motion--rolling .roulette-entry__wheel,
  .roulette-entry__motion--rolling .roulette-entry__ball-track {
    animation: none;
    transition: none;
  }
}
</style>
