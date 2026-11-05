<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import type { CasinoGame } from '~/types/casino'

interface Props {
  game: CasinoGame
  eager?: boolean
}

withDefaults(defineProps<Props>(), {
  eager: false,
})

const emit = defineEmits<{
  launch: [title: string]
}>()
</script>

<template>
  <article class="game-card">
    <button
      class="game-cover"
      type="button"
      :style="{ '--game-accent': game.accent }"
      :aria-label="`Open demo for ${game.title}`"
      @click="emit('launch', game.title)"
    >
      <span v-if="game.badge" class="game-badge">{{ game.badge }}</span>
      <span class="game-texture" aria-hidden="true" />
      <span class="game-emblem" aria-hidden="true">{{ game.symbol }}</span>
      <span class="game-title-art" aria-hidden="true">{{ game.title }}</span>
      <span class="play-control" aria-hidden="true"><Play :size="17" fill="currentColor" /></span>
    </button>
    <div class="game-meta">
      <strong :title="game.title">{{ game.title }}</strong>
      <span>{{ game.provider }}</span>
    </div>
  </article>
</template>

<style scoped>
.game-card {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  .game-card {
    width: 100%;
    max-width: 100%;
  }
}

.game-cover {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 0.73 / 1;
  overflow: hidden;
  border: 0;
  border-radius: var(--radius);
  color: white;
  background:
    radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--game-accent) 74%, white 8%), transparent 31%),
    linear-gradient(155deg, color-mix(in srgb, var(--game-accent) 90%, #17271f), color-mix(in srgb, var(--game-accent) 33%, #080d0b) 72%);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.12), 0 0.5rem 1.2rem rgba(0, 0, 0, 0.14);
}

.game-cover::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(3, 5, 4, 0.74), transparent 48%);
  content: '';
}

.game-cover:hover {
  filter: saturate(1.12) brightness(1.06);
  transform: translateY(-3px);
}

.game-texture {
  position: absolute;
  top: -12%;
  left: -30%;
  width: 160%;
  aspect-ratio: 1;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 44%;
  box-shadow:
    inset 0 0 0 1.2rem rgba(255, 255, 255, 0.025),
    inset 0 0 0 2.8rem rgba(0, 0, 0, 0.04);
  transform: rotate(32deg);
}

.game-emblem {
  position: absolute;
  z-index: 1;
  top: 35%;
  left: 50%;
  max-width: 90%;
  color: rgba(255, 255, 255, 0.96);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.5rem, 4.3vw, 4.6rem);
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 0.6rem 1.2rem rgba(0, 0, 0, 0.48);
  transform: translate(-50%, -50%) rotate(-3deg);
}

.game-title-art {
  position: absolute;
  z-index: 2;
  right: 0.55rem;
  bottom: 0.7rem;
  left: 0.55rem;
  overflow: hidden;
  color: white;
  font-size: clamp(0.62rem, 0.9vw, 0.82rem);
  font-weight: 850;
  line-height: 1.05;
  text-align: center;
  text-overflow: ellipsis;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: -0.015em;
  white-space: nowrap;
}

.game-badge {
  position: absolute;
  z-index: 3;
  top: 0.45rem;
  left: 0.45rem;
  padding: 0.18rem 0.34rem;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.48rem;
  font-weight: 850;
  background: var(--brand);
}

.play-control {
  display: grid;
  position: absolute;
  z-index: 4;
  top: 50%;
  left: 50%;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border-radius: 50%;
  opacity: 0;
  color: white;
  background: rgba(3, 98, 66, 0.9);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.38);
  transform: translate(-50%, -40%) scale(0.85);
  transition: opacity 140ms ease, transform 140ms ease;
}

.game-cover:hover .play-control,
.game-cover:focus-visible .play-control {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.game-meta {
  padding: 0.48rem 0.12rem 0;
}

.game-meta strong,
.game-meta span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.game-meta strong {
  color: var(--text);
  font-size: 0.7rem;
  font-weight: 670;
}

.game-meta span {
  margin-top: 0.16rem;
  color: #75867d;
  font-size: 0.58rem;
}

@media (prefers-reduced-motion: reduce) {
  .play-control {
    transition: none;
  }
}
</style>
