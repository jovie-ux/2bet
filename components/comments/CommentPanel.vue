<script setup lang="ts">
const { bybetRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const loginRedirectUrl = `${(bybetRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
import { ChevronDown, X } from 'lucide-vue-next'
import SportsPreview from './SportsPreview.vue'
import EmptyConversation from './EmptyConversation.vue'
import GameConversation from './GameConversation.vue'

const props = defineProps<{ docked?: boolean; embedded?: boolean }>()

const { context, closeComments } = useCommentPanel()
const dialog = ref<HTMLElement | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)
const isScrolledUp = ref(false)
const isMobile = ref(false)
const chatHeaderState = ref<'visible' | 'lowered'>('visible')
const route = useRoute()
let previousOverflow = ''
let previousPageScrollY = 0
let headerScrollFrameId: number | null = null

const HEADER_SCROLL_THRESHOLD = 8
const PAGE_TOP_THRESHOLD = 16

const updateIsMobile = (): void => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 1024
  }
}

const updateChatHeaderFromPageScroll = (): void => {
  const currentScrollY = Math.max(window.scrollY, 0)
  const scrollDelta = currentScrollY - previousPageScrollY

  if (currentScrollY <= PAGE_TOP_THRESHOLD || scrollDelta <= -HEADER_SCROLL_THRESHOLD) {
    chatHeaderState.value = 'visible'
  } else if (scrollDelta >= HEADER_SCROLL_THRESHOLD) {
    chatHeaderState.value = 'lowered'
  }

  if (Math.abs(scrollDelta) >= HEADER_SCROLL_THRESHOLD || currentScrollY <= PAGE_TOP_THRESHOLD) {
    previousPageScrollY = currentScrollY
  }

  headerScrollFrameId = null
}

const handlePageScroll = (): void => {
  if (headerScrollFrameId === null) {
    headerScrollFrameId = window.requestAnimationFrame(updateChatHeaderFromPageScroll)
  }
}

const initializeChatHeaderMotion = (): void => {
  previousPageScrollY = Math.max(window.scrollY, 0)
  window.addEventListener('scroll', handlePageScroll, { passive: true })
}

const handleScroll = (): void => {
  if (!scrollContainer.value) return
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value
  const distanceToBottom = scrollHeight - scrollTop - clientHeight
  isScrolledUp.value = distanceToBottom > 35
}

const scrollToLatest = (behavior: ScrollBehavior = 'smooth'): void => {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollTo({
    top: scrollContainer.value.scrollHeight,
    behavior,
  })
}

const handleBackdropClick = (event: MouseEvent): void => {
  if (!props.docked && !props.embedded && event.target === dialog.value) {
    closeComments()
  }
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile, { passive: true })

  if (props.docked) {
    initializeChatHeaderMotion()
  }

  if (!props.docked && !props.embedded) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (dialog.value instanceof HTMLDialogElement) dialog.value.showModal()
  }

  nextTick(() => {
    scrollToLatest('instant')
    setTimeout(() => scrollToLatest('instant'), 150)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
  window.removeEventListener('scroll', handlePageScroll)

  if (headerScrollFrameId !== null) {
    window.cancelAnimationFrame(headerScrollFrameId)
  }

  if (props.docked || props.embedded) return

  if (dialog.value instanceof HTMLDialogElement) dialog.value.close()
  document.body.style.overflow = previousOverflow
})

watch(() => route.path, () => {
  if (!props.docked) closeComments()
})

watch(() => context.value, () => {
  nextTick(() => {
    scrollToLatest('instant')
  })
})
</script>

<template>
  <Teleport to="body" :disabled="docked || embedded">
    <component
      :is="docked || embedded ? 'aside' : 'dialog'"
      id="comment-panel"
      ref="dialog"
      class="comment-panel"
      :class="{
        'comment-panel--docked': docked,
        'comment-panel--embedded': embedded,
        'mobile-modal-slide-up': !docked && !embedded,
      }"
      :aria-labelledby="embedded ? 'mobile-chat-title' : 'comment-panel-title'"
      @cancel.prevent="!docked && closeComments()"
      @click="handleBackdropClick"
    >
      <div v-if="context" class="flex h-full min-h-0 flex-col gap-2 p-0 sm:pb-2 sm:pr-2 text-white">
        <template v-if="!embedded && (context.kind !== 'sports' || isMobile)">
          <header
            class="chat-room-header flex shrink-0 items-center justify-between gap-3 rounded-lg bg-[#131313] px-1 py-2"
            :class="{ 'chat-room-header--lowered': chatHeaderState === 'lowered' }"
          >
            <span id="comment-panel-title" class="text-[16px] font-bold">Chat Room</span>
            <button type="button" class="grid h-4 w-4 place-items-center rounded-full bg-[#252525] text-[#a2a5a3] hover:text-white" aria-label="Close comments" autofocus @click="closeComments">
              <X :size="10" aria-hidden="true" />
            </button>
          </header>
        </template>
        <div class="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          <SportsPreview v-if="context.kind === 'sports'" class="shrink-0" />
         
          <section class="relative flex min-h-0 flex-1 flex-col rounded-lg border border-white/5 bg-[#131313] overflow-hidden" aria-label="Conversation">
            <!-- Scrollable chat container with bottom clearance for transparent overlay footer -->
            <div
              ref="scrollContainer"
              class="min-h-0 flex-1 overflow-y-auto"
              @scroll="handleScroll"
            >
              <div class="pb-[64px]">
                <EmptyConversation v-if="context.kind === 'sports'" class="min-h-[260px] py-8" />
                <GameConversation v-else />
              </div>
            </div>

            <!-- Back to latest button (bottom right) -->
            <Transition name="fade-slide">
              <button
                v-if="isScrolledUp"
                type="button"
                class="back-to-latest-btn absolute bottom-[62px] right-3 z-20 flex items-center rounded-full bg-[var(--main-color)] px-1 py-1  text-white  shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md  transition-all cursor-pointer select-none whitespace-nowrap"
                aria-label="Back to latest comments"
                @click="scrollToLatest('smooth')"
              >
                <ChevronDown class="h-4 w-4 transition-transform" />
              </button>
            </Transition>

            <!-- Transparent footer overlaying the comments -->
            <footer
              class="comment-footer absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 p-2 pb-[max(8px,env(safe-area-inset-bottom))] bg-transparent pointer-events-none"
            >
              <a :href="loginRedirectUrl" class="chat-login pointer-events-auto flex min-h-[44px] min-w-0 flex-1 items-center rounded-full px-3 text-[14px] text-[#9ca3af]">Log in to chat</a>
              <a :href="loginRedirectUrl" class="chat-login chat-login--icon pointer-events-auto grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full text-[#9ca3af]" aria-label="Log in to send a message">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-1 -1 22 22" fill="none" class="h-5 w-5 shrink-0" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.858 0V0.013C12.1678 0.0463357 12.4027 0.307863 12.4027 0.6195C12.4027 0.931137 12.1678 1.19266 11.858 1.226V1.245H2.905C1.99022 1.24554 1.24785 1.98523 1.244 2.9V17.1C1.2462 18.0159 1.98905 18.7575 2.905 18.758H15.084C15.9996 18.7569 16.7418 18.0156 16.744 17.1V9.365H16.763C16.7635 9.02635 17.0374 8.75165 17.376 8.75C17.5395 8.75079 17.6961 8.81659 17.8111 8.93289C17.926 9.0492 17.9901 9.20645 17.989 9.37V17.1C17.9846 18.7017 16.6858 19.9984 15.084 20H2.905C1.30325 19.9984 0.00440563 18.7017 0 17.1V2.9C0.00440563 1.29825 1.30325 0.00164637 2.905 0H11.858ZM13.605 13.79C13.9482 13.79 14.2265 14.0683 14.2265 14.4115C14.2265 14.7547 13.9482 15.033 13.605 15.033H4.585C4.24176 15.033 3.9635 14.7547 3.9635 14.4115C3.9635 14.0683 4.24176 13.79 4.585 13.79H13.605ZM13.717 9.378C14.0602 9.378 14.3385 9.65626 14.3385 9.9995C14.3385 10.3427 14.0602 10.621 13.717 10.621H4.697C4.35375 10.621 4.0755 10.3427 4.0755 9.9995C4.0755 9.65626 4.35375 9.378 4.697 9.378H13.717ZM16.503 0L20 3.4L16.503 6.786V4.848C14.3797 4.68687 12.3162 5.5967 11.003 7.273C11.003 7.273 11.643 1.938 16.503 1.938V0ZM8.319 4.966C8.66224 4.966 8.9405 5.24426 8.9405 5.5875C8.9405 5.93075 8.66224 6.209 8.319 6.209H4.696C4.35276 6.209 4.0745 5.93075 4.0745 5.5875C4.0745 5.24426 4.35276 4.966 4.696 4.966H8.319Z" fill="currentColor" /></svg>
              </a>
            </footer>
          </section>
        </div>
        
      </div>
    </component>
  </Teleport>
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
    height: 650px;
    max-height: none;
    margin: 16px auto;
    z-index: auto;
  }
}

.comment-panel::backdrop {
  background: rgb(0 0 0 / 40%);
}

.chat-login {
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.025) 55%, rgba(255, 255, 255, 0.07));
  color: #b8bfbd;
  backdrop-filter: blur(8px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.32),
    inset 0 -1px 2px rgba(255, 255, 255, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.24);
  transition: border-color 160ms ease, background-color 160ms ease, color 160ms ease;
}


.chat-login--icon svg {
  display: block;
  width: 22px;
  height: 22px;
}

.comment-panel :deep(button:focus-visible),
.comment-panel a:focus-visible {
  outline: 2px solid #30cf99;
  outline-offset: -3px;
}

.comment-footer {
  background: transparent;
}

.chat-room-header {
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 160ms ease;
  will-change: transform, opacity;
}

.chat-room-header--lowered {
  /* transform: translateY(6px); */
  opacity: 0.88;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 200ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .chat-room-header {
    transition: none;
  }

  .chat-room-header--lowered {
    transform: none;
  }
}
</style>
