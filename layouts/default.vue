<script setup lang="ts">
import { X } from 'lucide-vue-next'
import MobileBottomNav from '~/components/MobileBottomNav.vue'
import CommentPanel from '~/components/comments/CommentPanel.vue'
import MobileLivePlazaHeader from '~/components/live-plaza/MobileLivePlazaHeader.vue'

const { context: commentContext, openSportsComments, openGameComments, closeComments } = useCommentPanel()
const route = useRoute()
const mobileViewport = ref(false)
const normalizedPath = computed(() => route.path.replace(/\/+$/, '') || '/')
const isCustomerServicePage = computed(() => (
  normalizedPath.value === '/explore/egames/customer-service'
  || normalizedPath.value.startsWith('/explore/egames/customer-service/')
))
const isCustomerServiceChatPage = computed(() => (
  /^\/explore\/egames\/customer-service\/[12]$/.test(normalizedPath.value)
))
const desktopShellKind = computed<'sports' | 'games' | null>(() => {
  const path = normalizedPath.value

  if (
    path === '/explore/sports/live'
    || /^\/explore\/sports\/[^/]+\/[^/]+(?:\/.*)?$/.test(path)
  ) {
    return 'sports'
  }

  if (
    /^\/explore\/entertainment\/live-casino\/[^/]+(?:\/.*)?$/.test(path)
    || path === '/explore/egames/slots'
    || path.startsWith('/explore/egames/slots/')
    || path === '/explore/egames/bingo'
    || path.startsWith('/explore/egames/bingo/')
    || /^\/explore\/egames\/jackpot\/[^/]+(?:\/.*)?$/.test(path)
  ) {
    return 'games'
  }

  return null
})
const usesDesktopReferenceShell = computed(() => desktopShellKind.value !== null)
const usesDesktopContentReferenceShell = computed(() => {
  const path = normalizedPath.value

  return isCustomerServicePage.value
    || path === '/explore/bonuses'
    || path.startsWith('/explore/bonuses/')
    || path.startsWith('/explore/bonus/')
    || path.startsWith('/explore/live-plaza/')
    || path === '/explore/account/me'
    || path.startsWith('/explore/account/')
    || path.startsWith('/tutorial/transactions/')
    || path.startsWith('/game-rules/')
    || path === '/tutorial/mock-betting'
    || path === '/tutorial'
    || [
      '/responsible-gaming',
      '/privacy-policy',
      '/affiliate',
      '/download-app',
      '/about-us',
      '/terms-of-use',
    ].includes(path)
})
const isSportsPage = computed(() => route.path.startsWith('/explore/sports/'))
const isEgamesPage = computed(() => route.path.startsWith('/explore/egames/') && !isCustomerServicePage.value)
const isLiveCasinoPage = computed(() => route.path.startsWith('/explore/entertainment/live-casino'))
const isGameChatPage = computed(() => isEgamesPage.value || isLiveCasinoPage.value)
const isAffiliatePage = computed(() => route.path === '/affiliate')
const isBonusesPage = computed(() => /^\/explore\/bonuses?(?:\/|$)/.test(route.path))
const isLivePlazaPage = computed(() => route.path.startsWith('/explore/live-plaza'))
const isJackpotPage = computed(() => route.path.startsWith('/explore/egames/jackpot'))
const isAccountSettingsPage = computed(() => [
  '/explore/account/me',
  '/explore/account/language',
  '/explore/account/timezone',
  '/tutorial',
  '/affiliate',
].some(path => route.path.startsWith(path)))
const isDockedChatPage = computed(() => usesDesktopReferenceShell.value)
const isTutorialPage = computed(() => route.path === '/tutorial' || route.path.startsWith('/tutorial/'))
const isDedicatedMobileHeaderPage = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return [
    '/tutorial',
    '/affiliate',
    '/responsible-gaming',
    '/terms-of-use',
    '/privacy-policy',
    '/about-us',
    '/game-rules',
    '/download-app',
    '/explore/live-plaza',
    '/explore/account/language',
    '/explore/account/timezone',
    '/explore/bonuses',
    '/explore/bonus',
  ].some(prefix => path === prefix || path.startsWith(prefix + '/'))
})
const isMobileDevice = (): boolean => {
  if (import.meta.client) {
    return window.innerWidth < 1024
  }
  const headers = useRequestHeaders(['user-agent'])
  const ua = headers['user-agent'] || ''
  return /mobile|android|iphone|ipad|ipod/i.test(ua)
}

const shouldExpandRailByDefault = (): boolean => {
  return isAffiliatePage.value
    || isBonusesPage.value
    || isLivePlazaPage.value
    || isJackpotPage.value
    || usesDesktopReferenceShell.value
    || usesDesktopContentReferenceShell.value
}

const railCollapsed = ref(!shouldExpandRailByDefault())

watch(() => route.path, () => {
  railCollapsed.value = !shouldExpandRailByDefault()

  if (isMobileDevice()) {
    closeComments()
  } else if (desktopShellKind.value === 'sports') {
    openSportsComments()
  } else if (desktopShellKind.value === 'games') {
    openGameComments()
  } else {
    closeComments()
  }
}, { immediate: true })

const drawerOpen = ref(false)
const pageContentElement = ref<HTMLElement | null>(null)
let sectionRevealObserver: IntersectionObserver | undefined
const {
  clearDemoMessage,
  showDemoMessage,
  toastMessage,
} = useDemoInteraction()

const closeDrawer = (): void => {
  drawerOpen.value = false
}

const toggleRailCollapsed = (): void => {
  railCollapsed.value = !railCollapsed.value
}

const handleEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeDrawer()
  }
}

const initializeSectionMotion = (): void => {
  if (!pageContentElement.value) {
    return
  }

  const reducedMotionPreferred = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotionPreferred) {
    return
  }

  const sectionElements = Array.from(pageContentElement.value.children) as HTMLElement[]
  pageContentElement.value.classList.add('page-content--motion-ready')
  sectionRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue
        }

        entry.target.classList.add('section-reveal--visible')
        observer.unobserve(entry.target)
      }
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -5% 0px',
    },
  )

  sectionElements.forEach((sectionElement, index) => {
    if (sectionElement.classList.contains('hero') || sectionElement.querySelector('.hero')) {
      return
    }

    sectionElement.classList.add('section-reveal')
    sectionElement.style.setProperty('--section-reveal-delay', `${(index % 3) * 35}ms`)
    sectionRevealObserver?.observe(sectionElement)
  })
}

const handleResize = (): void => {
  const nextMobile = window.innerWidth < 1024
  if (nextMobile !== mobileViewport.value) {
    mobileViewport.value = nextMobile
    if (nextMobile) closeComments()
    else if (desktopShellKind.value === 'sports') openSportsComments()
    else if (desktopShellKind.value === 'games') openGameComments()
    else closeComments()
  }
}

onMounted(() => {
  mobileViewport.value = window.innerWidth < 1024
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('resize', handleResize, { passive: true })

  if (window.innerWidth < 1024) {
    closeComments()
  }

  initializeSectionMotion()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', handleResize)
  sectionRevealObserver?.disconnect()
  clearDemoMessage()
})
</script>

<template>
  <div
    id="home"
    class="site-shell"
    :class="{
      'site-shell--rail-collapsed': railCollapsed,
      'site-shell--sports-chat': isDockedChatPage && Boolean(commentContext),
      'site-shell--desktop-reference': usesDesktopReferenceShell,
      'site-shell--desktop-content-reference': usesDesktopContentReferenceShell,
      'site-shell--bonuses': isBonusesPage,
      'site-shell--live-plaza': isLivePlazaPage,
      'site-shell--me': route.path === '/explore/account/me',
      'site-shell--dedicated-header': isDedicatedMobileHeaderPage,
      'site-shell--green-header': isSportsPage || isEgamesPage || route.path.startsWith('/explore/entertainment/'),
    }"
  >
    <div class="app-header-underlay" aria-hidden="true" />
    <div class="app-header-occlusion-plate" aria-hidden="true" />
    <AppHeader
      :drawer-open="drawerOpen"
      @toggle-drawer="drawerOpen = !drawerOpen"
    />
    <AppSidebar
      :open="drawerOpen"
      :collapsed="railCollapsed"
      @close="closeDrawer"
      @toggle-collapse="toggleRailCollapsed"
      @demo-action="showDemoMessage"
    />

    <div class="content-layout">
      <div class="content-main-area">
        <main ref="pageContentElement" class="page-content pt-0">
          <MobileLivePlazaHeader v-if="isLivePlazaPage && normalizedPath !== '/explore/live-plaza/experts'" />
          <slot />
        </main>

        <AppFooter v-if="!isCustomerServiceChatPage" />
      </div>

      <CommentPanel
        v-if="commentContext && !mobileViewport"
        :key="isSportsPage ? 'sports-sidebar' : isGameChatPage ? 'casino-sidebar' : 'game-dialog'"
        :docked="isDockedChatPage"
      />
    </div>

    <MobileBottomNav />
    <ResponsibleGamingGate />

    <Transition name="toast">
      <div v-if="toastMessage" class="demo-toast" role="status">
        <span>{{ toastMessage }}</span>
        <button type="button" aria-label="Dismiss message" @click="clearDemoMessage">
          <X :size="12" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.site-shell {
  --content-gutter: 0.5rem;
  --comment-width: 0px;
  --desktop-top-overlap: 12px;
  --content-sticky-top: var(--header-height);
  --sidebar-width: 190px;

  position: relative;
  width: 100%;
  max-width: var(--site-max-width);
  min-height: 100vh;
  margin: 0 auto;
  padding-top: var(--header-height);
}

.site-shell--rail-collapsed {
  --sidebar-width: 72px;
}

.site-shell--sports-chat {
  --comment-width: min(375px, 23.4375rem);
  --comment-panel-width: 23.4375rem;
}

.site-shell--bonuses {
  --site-max-width: 100%;
  max-width: 100%;
}

.app-header-underlay,
.app-header-occlusion-plate {
  position: fixed;
  top: 0;
  pointer-events: none;
  background: #036242;
}

.app-header-underlay {
  z-index: 10;
  right: 0;
  left: 0;
  height: var(--header-height);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08);
}

.app-header-occlusion-plate {
  z-index: 25;
  left: 50%;
  width: min(100%, var(--site-max-width));
  height: var(--content-sticky-top);
  overflow: hidden;
  transform: translateX(-50%);
  margin-right: var(--comment-width);
  margin-left: cal(var(--sidebar-width) - 10px);
  transition: margin-right 180ms ease, margin-left 180ms ease;
}

.content-layout {
  position: relative;
  z-index: 20;
  min-width: 0;
  margin-left: var(--sidebar-width);
  background: transparent;
  transition: margin-left 180ms ease;
}

.content-main-area {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.page-content {
  min-width: 0;
  min-height: calc(100vh - var(--header-height));
  width: 100%;
  padding: 0 0.62rem 0 var(--content-gutter);
}

.page-content--motion-ready > :deep(.section-reveal) {
  opacity: 0;
  transform: translate3d(0, 0.8rem, 0) scale(0.995);
  transition:
    opacity 460ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 460ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--section-reveal-delay, 0ms);
  will-change: opacity, transform;
}

.page-content--motion-ready > :deep(.section-reveal--visible) {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.demo-toast {
  display: flex;
  position: fixed;
  z-index: 80;
  right: 0.65rem;
  bottom: 0.65rem;
  min-height: 2.3rem;
  align-items: center;
  padding: 0.45rem 0.45rem 0.45rem 0.7rem;
  border: 1px solid rgba(50, 212, 154, 0.25);
  border-radius: 0.4rem;
  color: white;
  font-size: 0.55rem;
  background: #10271d;
  box-shadow: 0 0.7rem 1.8rem rgba(0, 0, 0, 0.42);
  gap: 0.6rem;
}

.demo-toast button {
  display: grid;
  width: 1.55rem;
  height: 1.55rem;
  place-items: center;
  border: 0;
  border-radius: 0.3rem;
  color: var(--secondary);
  background: rgba(255, 255, 255, 0.05);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 140ms ease, transform 140ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(0.35rem);
}

@media (min-width: 64rem) {
  .site-shell--desktop-content-reference {
    --desktop-content-max-width: 1368px;
    --desktop-content-offset: max(0px, calc((100% - var(--desktop-content-max-width)) / 2));
    --site-max-width: 100vw;

    max-width: 100%;
  }

  .site-shell--desktop-content-reference :deep(.sidebar) {
    left: var(--desktop-content-offset);
  }

  .site-shell--desktop-content-reference .content-layout {
    width: min(
      calc(100% - var(--sidebar-width)),
      calc(var(--desktop-content-max-width) - var(--sidebar-width))
    );
    margin-left: calc(var(--desktop-content-offset) + var(--sidebar-width));
  }

  .site-shell--desktop-content-reference .app-header-occlusion-plate {
    right: 0;
    left: 0;
    width: auto;
    margin: 0;
    transform: none;
  }

  .site-shell--desktop-content-reference :deep(.join-bar) {
    right: var(--desktop-content-offset);
    left: calc(var(--desktop-content-offset) + var(--sidebar-width));
  }

  .site-shell--desktop-reference {
    --site-max-width: 100vw;

    max-width: 100%;
  }

  .site-shell--desktop-reference .app-header-occlusion-plate {
    right: var(--comment-width);
    left: var(--sidebar-width);
    width: auto;
    margin: 0;
    transform: none;
  }

  .site-shell {
    --content-sticky-top: calc(var(--header-height) - var(--desktop-top-overlap));
  }

  .content-layout {
    margin-top: calc(0px - var(--desktop-top-overlap));
  }

  .page-content {
    min-height: calc(100vh - var(--header-height) + var(--desktop-top-overlap));
  }

  .site-shell--sports-chat .content-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) var(--comment-width);
    align-items: start;
    gap: 8px;
  }
}

@media (max-width: 63.99rem) {
  .site-shell--green-header .page-content :deep(.sticky-header-seal),
  .site-shell--green-header .page-content :deep(.sports-navigation) {
    isolation: isolate;
  }

  .site-shell--green-header .page-content :deep(.sticky-header-seal)::before,
  .site-shell--green-header .page-content :deep(.sports-navigation)::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: calc(0px - var(--header-height));
    right: calc(0px - var(--page-padding));
    left: calc(0px - var(--page-padding));
    height: calc(var(--header-height) + 28px);
    border-radius: 0 0 16px 16px;
    background: #036242;
    pointer-events: none;
  }

  .site-shell--me,
  .site-shell--dedicated-header {
    padding-top: 0 !important;
  }

  .site-shell--live-plaza :deep(.seo-header-sticky-wrapper) {
    display: none;
  }

  .site-shell--live-plaza :deep(.live-plaza-page),
  .site-shell--live-plaza :deep(.expert-predictions-page),
  .site-shell--live-plaza :deep(.live-plaza-streamer-page),
  .site-shell--live-plaza :deep(.live-plaza-all-streamers-page) {
    padding-right: 8px;
    padding-left: 8px;
  }

  .site-shell--me > .app-header-shell,
  .site-shell--dedicated-header > .app-header-shell,
  .site-shell--me > .app-header-underlay,
  .site-shell--me > .app-header-occlusion-plate,
  .site-shell--dedicated-header > .app-header-underlay,
  .site-shell--dedicated-header > .app-header-occlusion-plate {
    display: none !important;
  }

  .site-shell--me .content-layout,
  .site-shell--dedicated-header .content-layout {
    margin-top: 0 !important;
  }

  .site-shell--me .page-content,
  .site-shell--dedicated-header .page-content {
    padding: 0 !important;
  }

  .content-layout {
    margin-left: 0;
  }

  .page-content {
    padding: 0.5rem 3px;
    background: var(--page);
  }
}

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .page-content :deep(.promotion-grid a:hover),
  .page-content :deep(.jackpot-grid > a:hover),
  .page-content :deep(.provider-grid a:hover) {
    transform: translateY(-2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-content--motion-ready > :deep(.section-reveal),
  .page-content--motion-ready > :deep(.section-reveal--visible) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
@media screen and (max-width: 1000px) {
  .app-header-occlusion-plate{
    margin:0;
  }
}
</style>
