<script setup lang="ts">
import SportsPreview from './SportsPreview.vue'

defineProps<{ docked?: boolean; embedded?: boolean }>()

const { context } = useCommentPanel()
</script>

<template>
  <aside
    v-if="context && context.kind === 'sports'"
    id="comment-panel"
    class="comment-panel"
    :class="{
      'comment-panel--docked': docked,
      'comment-panel--embedded': embedded,
    }"
    aria-label="Sports TV"
  >
    <div class="flex h-full min-h-0 flex-col gap-2 p-0 sm:pb-2 sm:pr-2 text-white">
      <SportsPreview class="shrink-0" />
    </div>
  </aside>
</template>

<style scoped>
.comment-panel {
  width: var(--comment-width, min(375px, 23.4375rem));
  height: 100dvh;
  max-width: 100vw;
  max-height: 100dvh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.comment-panel--docked {
  position: sticky;
  top: var(--content-sticky-top, var(--header-height));
  align-self: start;
  z-index: 40;
  width: var(--comment-width, 100%);
  min-width: 0;
  height: calc(100dvh - var(--content-sticky-top, var(--header-height)));
  max-height: calc(100dvh - var(--content-sticky-top, var(--header-height)));
}

.comment-panel--embedded {
  width: 100%;
  height: 100%;
  max-height: 100%;
  border: 0;
  background: transparent;
}

@media (max-width: 63.99rem) {
  .comment-panel--docked {
    position: relative;
    top: auto;
    inset: auto;
    width: min(23.4375rem, 100%);
    height: auto;
    max-height: none;
    margin: 16px auto;
    z-index: auto;
  }
}
</style>
