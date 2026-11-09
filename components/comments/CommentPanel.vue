<script setup lang="ts">
const { bybetRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const loginRedirectUrl = `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
import { ChevronDown, X } from 'lucide-vue-next'
import SportsPreview from './SportsPreview.vue'
import SportsChat from './SportsChat.vue'

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
    <div class="flex h-full w-full min-h-0 min-w-0 flex-1 flex-col gap-[8px] p-0 sm:pb-2 sm:pr-2 text-white">
      <SportsPreview class="w-full min-w-0 shrink-0" />
      <SportsChat />
    </div>
  </aside>
</template>

<style scoped>
.comment-panel {
  width: var(--comment-width, min(375px, 23.4375rem));
  min-width: 0;
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
