<script setup lang="ts">
import UnderMaintenance from '~/components/modals/UnderMaintenance.vue'
import MobileBottomNavIcon from '~/components/MobileBottomNavIcon.vue'
const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`

type NavMode = 'primary' | 'casino' | 'egames' | 'live-plaza'

const { translate } = useSiteLocale()
const route = useRoute()
const isMaintenanceOpen = ref(false)

const casinoItems = [
  { label: 'Live Casino', icon: '/icons/entertainment/live-casino.webp', to: '/explore/entertainment/live-casino/good-road' },
  { label: 'Gaming', icon: '/icons/entertainment/gaming.webp', to: `${bybetBaseUrl}/sportEvents/eSport?p=${bybetRedirectCode}` },
  { label: 'Poker', icon: '/icons/entertainment/poker.webp', to: '/explore/entertainment/poker' },
  { label: 'RACE', icon: '/icons/entertainment/lottery.webp', to: '/explore/entertainment/lottery' },
]

const eGamesItems = [
  { label: 'Slots', icon: '/icons/egames/slots.webp', to: '/explore/egames/slots' },
  { label: 'Jackpot', icon: '/icons/egames/jackpot.webp', to: '/explore/egames/jackpot' },
  { label: 'History', icon: '/icons/egames/history.webp', to: bybetRedirectUrl },
  { label: 'CS', icon: 'CS', to: '/explore/egames/customer-service' },
]

const getNavModeForPath = (path: string): NavMode => {
  if (path.startsWith('/explore/live-plaza/')) {
    return 'live-plaza'
  }
  if (path.startsWith('/explore/entertainment/')) {
    return 'casino'
  }
  if (path.startsWith('/explore/egames/')) {
    return 'egames'
  }
  return 'primary'
}

const activeNavMode = ref<NavMode>(getNavModeForPath(route.path))
const displayedNavMode = ref<NavMode>(activeNavMode.value)
const navModes: NavMode[] = ['primary', 'casino', 'egames', 'live-plaza']
const doorPosition = ref(activeNavMode.value === 'primary' ? 0 : 4)
const isNavVisible = ref(true)
const isDoorAnimating = ref(false)
const isMobileViewport = ref(false)
const isBonusDetailPage = computed(() => route.path.startsWith('/explore/bonus/'))
const isCustomerServiceChatPage = computed(() => /^\/explore\/egames\/customer-service\/[12]\/?$/.test(route.path))
const showNavigation = computed(() => !isBonusDetailPage.value && (isDoorAnimating.value || isNavVisible.value))
const updateViewport = (): void => { isMobileViewport.value = window.innerWidth < 1024 }

const SCROLL_DIRECTION_THRESHOLD = 8
const TOP_VISIBILITY_THRESHOLD = 16

let lastScrollY = 0
let scrollFrameId: number | null = null

const updateNavVisibility = () => {
  const currentScrollY = Math.max(window.scrollY, 0)

  if (currentScrollY <= TOP_VISIBILITY_THRESHOLD) {
    isNavVisible.value = true
    lastScrollY = currentScrollY
    scrollFrameId = null
    return
  }

  const scrollDelta = currentScrollY - lastScrollY

  if (Math.abs(scrollDelta) >= SCROLL_DIRECTION_THRESHOLD) {
    isNavVisible.value = scrollDelta < 0
    lastScrollY = currentScrollY
  }

  scrollFrameId = null
}

const handleScroll = () => {
  if (scrollFrameId === null) {
    scrollFrameId = window.requestAnimationFrame(updateNavVisibility)
  }
}

watch(() => route.path, (path) => {
  void changeNavMode(getNavModeForPath(path))
  isNavVisible.value = true
  lastScrollY = Math.max(window.scrollY, 0)
})

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport, { passive: true })
  lastScrollY = Math.max(window.scrollY, 0)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  doorRequest++
  cancelDoorAnimation()
  window.removeEventListener('resize', updateViewport)
  window.removeEventListener('scroll', handleScroll)

  if (scrollFrameId !== null) {
    window.cancelAnimationFrame(scrollFrameId)
  }
})

const isPathActive = (destination: string): boolean => {
  if (destination === '/') {
    return route.path === '/'
  }

  return route.path === destination || route.path.startsWith(`${destination}/`)
}

const isCasinoItemActive = (item: { label: string; to: string }): boolean => {
  if (item.label === 'Poker') {
    return isPathActive('/explore/entertainment/poker')
  }
  if (item.label === 'Live Casino') {
    return (
      route.path.startsWith('/explore/entertainment/live-casino')
      || route.path === '/explore/entertainment'
    )
  }
  return isPathActive(item.to)
}

const isEGamesItemActive = (item: { label: string; to: string }): boolean => {
  return isPathActive(item.to)
}

const isSportsActive = computed(() => (
  route.path.startsWith('/explore/sports/')
  && !route.path.startsWith('/explore/sports/live')
))

const isInPlayActive = computed(() => route.path.startsWith('/explore/sports/live'))
const isEGamesActive = computed(() => route.path.startsWith('/explore/egames/'))
const isAccountActive = computed(() => route.path.startsWith('/explore/account/'))

interface NavCell {
  key: string
  label: string
  icon: string
  to?: string
  mode?: NavMode
  maintenance?: boolean
  active?: boolean
  group?: NavMode
}

const nuxtLinkComponent = resolveComponent('NuxtLink')
const navRow = ref<HTMLElement | null>(null)
const movingDoorRadius = ref<string>()
const livePlazaItems = [
  { label: 'Plaza', icon: 'plaza', to: '/explore/live-plaza/home' },
  { label: 'Streamer', icon: 'streamer', to: '/explore/live-plaza/streamer' },
  { label: 'Predict', icon: 'predict', to: '/explore/live-plaza/expert-predictions' },
  { label: 'Funds', icon: 'funds', to: '/explore/live-plaza/funds' },
]
const isPlazaItemActive = (label: string, to: string): boolean => {
  const path = route.path.replace(/\/$/, '')
  if (label === 'Predict') return path.endsWith('/expert-predictions') || path.endsWith('/experts')
  if (label === 'Streamer') return path.includes('/streamer') || path.endsWith('/all-streamers')
  return path === to
}
// Semantic keys identify real menu items, never interchangeable slot numbers.
// Every group stays mounted; only visibility changes after the slide settles.
const regularCells = computed<NavCell[]>(() => [
  { key: 'primary-sports', group: 'primary', label: 'Sports', icon: 'Sports', to: '/explore/sports/popular', active: isSportsActive.value },
  { key: 'primary-inplay', group: 'primary', label: 'In-Play', icon: 'In-Play', to: '/explore/sports/live', active: isInPlayActive.value },
  { key: 'primary-egames', group: 'primary', label: 'eGames', icon: 'eGames', to: '/explore/egames/slots', mode: 'egames', active: isEGamesActive.value },
  { key: 'primary-me', group: 'primary', label: 'Me', icon: 'Me', to: '/explore/account/me', active: isAccountActive.value },
  ...casinoItems.map(item => ({
    key: 'casino-' + item.label, group: 'casino' as NavMode,
    label: item.label, icon: item.label,
    to: item.label === 'Lottery' ? undefined : item.to,
    maintenance: item.label === 'Lottery',
    active: isCasinoItemActive(item),
  })),
  ...eGamesItems.map(item => ({
    key: 'egames-' + item.label, group: 'egames' as NavMode,
    label: item.label, icon: item.label, to: item.to, active: isEGamesItemActive(item),
  })),
  ...livePlazaItems.map(item => ({
    ...item, key: 'plaza-' + item.label, group: 'live-plaza' as NavMode,
    active: isPlazaItemActive(item.label, item.to),
  })),
])
const allNavCells = computed<NavCell[]>(() => [
  {
    key: 'door',
    label: activeNavMode.value === 'primary' ? 'To casino games' : 'Back to main navigation',
    icon: 'primary-door',
    to: activeNavMode.value === 'primary' ? '/explore/entertainment/live-casino/baccarat' : '/explore/sports/popular/league',
    mode: activeNavMode.value === 'primary' ? 'casino' : 'primary',
  },
  ...regularCells.value,
])
const navCells = computed<NavCell[]>(() => {
  const cells = regularCells.value.filter(cell => cell.group === displayedNavMode.value)
  cells.splice(doorPosition.value, 0, allNavCells.value[0]!)
  return cells
})
const navSlots = computed(() => new Map(navCells.value.map((cell, index) => [cell.key, index + 1])))
const navColumns = computed(() => navCells.value.map(cell => cell.key === 'door' ? '60px' : 'minmax(0, 1fr)').join(' '))

const DOOR_DURATION = 400
const DOOR_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
let doorFrame: number | null = null
let doorTimer: ReturnType<typeof setTimeout> | null = null
let doorRequest = 0
let settleSlide: ((completed: boolean) => void) | null = null

const getCells = (): HTMLElement[] => Array.from(navRow.value?.querySelectorAll<HTMLElement>('[data-nav-visible="true"]') || [])

function cancelDoorAnimation(): void {
  if (doorFrame !== null) window.cancelAnimationFrame(doorFrame)
  if (doorTimer !== null) clearTimeout(doorTimer)
  doorFrame = null
  doorTimer = null
  const settle = settleSlide
  settleSlide = null
  settle?.(false)
}

function finishDoorAnimation(): void {
  cancelDoorAnimation()
  for (const cell of navRow.value?.querySelectorAll<HTMLElement>('[data-nav-cell]') || []) {
    cell.style.removeProperty('transition')
    cell.style.removeProperty('transform')
  }
  displayedNavMode.value = activeNavMode.value
  doorPosition.value = activeNavMode.value === 'primary' ? 0 : 4
  isDoorAnimating.value = false
  movingDoorRadius.value = undefined
}

function slideCells(
  cells: HTMLElement[],
  target: (cell: HTMLElement) => number,
  request: number,
): Promise<boolean> {
  // Preserve the rendered positions when a running slide is interrupted.
  const first = cells.map(cell => cell.getBoundingClientRect().left)
  for (const cell of cells) {
    cell.style.transition = 'none'
    cell.style.transform = 'translateX(0px)'
  }
  const base = cells.map(cell => cell.getBoundingClientRect().left)
  cells.forEach((cell, index) => {
    cell.style.transform = 'translateX(' + (first[index]! - base[index]!) + 'px)'
  })
  void navRow.value?.offsetWidth

  return new Promise(resolve => {
    settleSlide = resolve
    // Give the inverted positions a paint before moving both lanes together.
    doorFrame = window.requestAnimationFrame(() => {
      if (request !== doorRequest) return
      doorFrame = window.requestAnimationFrame(() => {
        doorFrame = null
        if (request !== doorRequest) return
        for (const cell of cells) {
          cell.style.transition = 'transform ' + DOOR_DURATION + 'ms ' + DOOR_EASING
          cell.style.transform = 'translateX(' + target(cell) + 'px)'
        }
        doorTimer = setTimeout(() => {
          doorTimer = null
          settleSlide = null
          resolve(true)
        }, DOOR_DURATION)
      })
    })
  })
}

async function changeNavMode(mode: NavMode): Promise<void> {
  if (mode === activeNavMode.value) return
  const request = ++doorRequest
  const animate = Boolean(import.meta.client
    && isMobileViewport.value
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const door = navRow.value?.querySelector<HTMLElement>('.mobile-bottom-nav__switch')
  movingDoorRadius.value = animate && door ? getComputedStyle(door).borderRadius : undefined
  cancelDoorAnimation()
  activeNavMode.value = mode
  isDoorAnimating.value = animate

  if (!animate) {
    finishDoorAnimation()
    return
  }

  // Reversing before the outgoing menu has left restores that same menu.
  if (mode === displayedNavMode.value) {
    if (await slideCells(getCells(), () => 0, request) && request === doorRequest) {
      finishDoorAnimation()
    }
    return
  }

  const width = navRow.value?.getBoundingClientRect().width || 0
  const doorWidth = door?.getBoundingClientRect().width || 60
  const outgoingPrimary = displayedNavMode.value === 'primary'

  // The reference moves the whole icon tray out one side and the green
  // control out the other. Their graphics stay attached to their own nodes.
  const left = await slideCells(getCells(), cell => cell.dataset.navCell === 'door'
    ? (outgoingPrimary ? -doorWidth : doorWidth)
    : (outgoingPrimary ? width : -width), request)
  if (!left || request !== doorRequest) return

  // Change menus only when both outgoing lanes are outside the clipped row.
  displayedNavMode.value = mode
  doorPosition.value = mode === 'primary' ? 0 : 4
  movingDoorRadius.value = undefined
  await nextTick()
  if (request !== doorRequest) return

  const incoming = getCells()
  const incomingPrimary = mode === 'primary'
  for (const cell of incoming) {
    const start = cell.dataset.navCell === 'door'
      ? (incomingPrimary ? -doorWidth : doorWidth)
      : (incomingPrimary ? width : -width)
    cell.style.transition = 'none'
    cell.style.transform = 'translateX(' + start + 'px)'
  }

  // Bring the new icon tray and its green control in from opposite edges.
  if (await slideCells(incoming, () => 0, request) && request === doorRequest) {
    finishDoorAnimation()
  }
}

const handleNavCell = (cell: NavCell): void => {
  if (cell.mode) {
    void changeNavMode(cell.mode)
  }
  if (cell.maintenance) isMaintenanceOpen.value = true
}
</script>

<template>
  <nav
    v-show="!isBonusDetailPage && !isCustomerServiceChatPage"
    class="mobile-bottom-nav"
    :class="{
      'mobile-bottom-nav--hidden': !showNavigation,
      'mobile-bottom-nav--live-plaza': displayedNavMode === 'live-plaza',
    }"
    :aria-label="displayedNavMode === 'live-plaza' ? 'Live Plaza navigation' : translate('Primary navigation')"
    :aria-hidden="!showNavigation ? 'true' : undefined"
    :inert="!showNavigation"
  >
    <div
      ref="navRow"
      class="mobile-bottom-nav__row"
      :class="displayedNavMode === 'primary' ? 'mobile-bottom-nav__row--primary' : 'mobile-bottom-nav__row--inner'"
      :data-nav-mode="displayedNavMode"
      :data-nav-target="activeNavMode"
      :style="{ gridTemplateColumns: navColumns }"
      :data-sliding="isDoorAnimating ? 'true' : undefined"
    >
      <div
        v-for="cell in allNavCells"
        v-show="cell.key === 'door' || cell.group === displayedNavMode"
        :key="cell.key"
        :data-nav-cell="cell.key"
        :data-nav-visible="cell.key === 'door' || cell.group === displayedNavMode ? 'true' : 'false'"
        :style="{ gridColumn: navSlots.get(cell.key) }"
        class="mobile-bottom-nav__cell"
        :class="{ 'mobile-bottom-nav__cell--door': cell.key === 'door' }"
      >
        <component
          :is="cell.to ? nuxtLinkComponent : 'button'"
          v-bind="cell.to ? { to: cell.to } : { type: 'button' }"
          class="mobile-bottom-nav__control"
          :class="[
            cell.key === 'door'
              ? ['mobile-bottom-nav__switch', displayedNavMode === 'primary' ? 'mobile-bottom-nav__switch--home' : 'mobile-bottom-nav__switch--back']
              : 'mobile-bottom-nav__item',
            {
              'mobile-bottom-nav__item--active': cell.active,
              'mobile-bottom-nav__item--plaza': cell.key !== 'door' && displayedNavMode === 'live-plaza',
              'mobile-bottom-nav__switch--plaza': cell.key === 'door' && displayedNavMode === 'live-plaza',
            },
          ]"
          :style="cell.key === 'door' && movingDoorRadius ? { borderRadius: movingDoorRadius } : undefined"
          :aria-label="translate(cell.label)"
          :aria-current="cell.active && cell.to ? 'page' : undefined"
          @click="handleNavCell(cell)"
        >
          <span v-if="cell.key === 'door'" class="mobile-bottom-nav__switch-circle" aria-hidden="true">
            <span v-for="mode in navModes" :key="mode" v-show="mode === displayedNavMode" class="mobile-bottom-nav__door-art">
              <MobileBottomNavIcon :name="mode === 'primary' ? 'primary-door' : mode + '-back'" />
            </span>
          </span>
          <template v-else>
            <span v-if="cell.key === 'egames-CS' || cell.icon === 'CS' || cell.label === 'CS'" class="mobile-bottom-nav__icon-wrap" aria-hidden="true">
              <svg width="21" height="20" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg" class=""><path d="M16.0527 20C14.7621 19.96 13.7617 18.89 13.7918 17.6V13.92C13.7617 12.64 14.7722 11.58 16.0527 11.54H19.154C19.154 11.54 19.214 11.51 19.214 11.47V10.24C19.4341 5.46 15.7626 1.4 10.9806 1.15H10.6204C8.45956 1.15 6.37871 1.98 4.80806 3.46C3.11737 5.03 2.12696 7.21 2.03692 9.52V11.47C2.03692 11.47 2.06694 11.54 2.10695 11.54H5.20823C6.47875 11.59 7.48916 12.65 7.45915 13.92V17.61C7.48916 18.89 6.48875 19.96 5.20823 20H2.10695C1.26661 19.98 0.596333 19.28 0.626345 18.44V10.25C0.536308 4.68 4.97813 0.1 10.5404 0H10.6204C13.2515 0 15.7826 1.05 17.6433 2.92C19.5441 4.81 20.6246 7.39 20.6246 10.08V18.43C20.6446 19.27 19.9843 19.97 19.154 20H16.0527ZM15.9526 10.19V10.1C15.9827 8.55 15.3324 7.06 14.1819 6.02L14.0719 5.93C13.7617 5.67 13.6917 5.21 13.9318 4.88C14.1419 4.57 14.5621 4.49 14.8722 4.7C16.4829 6.02 17.3932 8 17.3532 10.08V10.16L17.2732 10.18H15.9526V10.19Z" class="fill-icon-3"></path></svg>
            </span>
            <span v-else-if="['race', 'lottery'].includes(cell.label?.toLowerCase()) || ['race', 'lottery'].includes(cell.icon?.toLowerCase()) || cell.key?.toLowerCase() === 'casino-race' || cell.key?.toLowerCase() === 'casino-lottery'" class="mobile-bottom-nav__icon-wrap" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10.0366 1.90048C10.0366 2.03187 10.0625 2.16198 10.1128 2.28338C10.1631 2.40477 10.2368 2.51508 10.3297 2.60799C10.4226 2.7009 10.5329 2.7746 10.6543 2.82488C10.7757 2.87517 10.9058 2.90105 11.0372 2.90105C11.1686 2.90105 11.2987 2.87517 11.4201 2.82488C11.5415 2.7746 11.6518 2.7009 11.7447 2.60799C11.8376 2.51508 11.9113 2.40477 11.9616 2.28338C12.0119 2.16198 12.0378 2.03187 12.0378 1.90048C12.0378 1.76908 12.0119 1.63897 11.9616 1.51757C11.9113 1.39618 11.8376 1.28588 11.7447 1.19296C11.6518 1.10005 11.5415 1.02635 11.4201 0.976066C11.2987 0.925783 11.1686 0.899902 11.0372 0.899902C10.9058 0.899902 10.7757 0.925783 10.6543 0.976066C10.5329 1.02635 10.4226 1.10005 10.3297 1.19296C10.2368 1.28588 10.1631 1.39618 10.1128 1.51757C10.0625 1.63897 10.0366 1.76908 10.0366 1.90048Z" class="fill-icon-3"></path><path d="M11.573 13.6952H13.1902L11.1285 18.8294C10.9315 19.2236 10.2996 19.0669 10.2996 18.6272L11.573 13.6952ZM6.68634 13.0332V15.9894L8.53584 18.4453C8.76995 18.9574 8.21749 19.1731 7.92944 18.9304L5.74052 16.3938C5.67457 16.3174 5.62766 16.2264 5.60362 16.1284L5.17041 14.3672L6.68634 13.0332Z" class="fill-icon-3"></path><path d="M19.3957 5.2256L19.9415 4.65954C20.0502 4.47388 20.0061 4.36112 19.8201 4.31592H16.869C15.5706 4.44342 14.4369 4.88036 13.5337 5.75116C13.808 6.94161 13.1329 7.15579 12.24 7.14591L11.7448 7.97475H11.1889C11.8266 8.40084 11.8045 8.84426 11.7448 9.28865L9.875 12.4621C9.17771 13.133 7.63132 12.4116 8.03554 11.229L9.08277 9.44499C9.10756 9.40271 9.0946 9.34843 9.05345 9.32186L7.27409 8.17564C7.1113 8.07069 6.92212 8.01396 6.72844 8.01201L5.02377 7.99484C4.40311 8.16041 4.02142 8.45657 3.76042 8.8185L2.59314 8.86402C2.28662 8.98926 2.08394 9.2569 1.94121 9.60684L0.0346778 13.7023C-0.0507015 13.8858 0.0269013 14.1041 0.209 14.1924C1.06944 14.6099 1.83137 14.1592 2.11197 13.2231C2.11958 13.1978 2.1238 13.1715 2.12542 13.1451L2.28986 10.2437C2.40067 9.70437 2.73846 9.48873 3.21461 9.47059C2.69002 10.3109 2.80521 11.1203 3.1673 11.9179C3.18869 11.9651 3.1997 12.0162 3.20035 12.0681L3.21461 13.3517L1.88046 14.9587L1.30435 18.7032C1.36494 19.1429 1.87041 19.1732 1.98657 18.7638L2.85073 15.7621L6.50973 12.5909C6.63512 12.4824 6.81334 12.4595 6.9619 12.5331L8.15672 13.1242L13.0593 13.1672C13.243 13.1688 13.4115 13.2696 13.5 13.4306L16.495 18.8853C16.7679 19.3048 17.4041 19.1065 17.2531 18.5064L15.2238 12.1846C15.1824 12.0561 15.2288 11.9161 15.338 11.8367C15.4677 11.7425 15.5748 11.6059 15.6461 11.411L16.7301 7.14591C16.7522 7.05907 16.8717 7.04984 16.9069 7.13214L17.8499 9.33693C17.8921 9.43527 17.991 9.49699 18.0978 9.49132L19.2129 9.43268C19.2528 9.43058 19.2903 9.41335 19.3179 9.3845C19.3455 9.35566 19.361 9.31738 19.3613 9.27747L19.3957 5.2256Z" class="fill-icon-3"></path><path d="M11.0062 5.75588H12.7958C13.1563 5.83834 13.126 6.53579 12.7958 6.60481H10.2992C10.0556 6.57597 9.92061 6.36698 9.95155 6.01785C9.95609 5.96682 9.8887 5.94494 9.86294 5.98901L9.12304 7.25091C9.09161 7.30453 9.10878 7.37371 9.16176 7.40627L11.0372 8.56043C11.4177 8.74853 11.3808 9.01017 11.0372 9.40936L9.47573 12.1533C9.00574 12.3874 8.33875 11.8753 8.52068 11.5014L9.77496 9.32447C9.81109 9.26177 9.79116 9.1819 9.72993 9.14351L7.20176 7.55986C6.93056 7.40158 6.95275 6.95848 7.20176 6.55929L8.99067 3.46652C9.31405 3.0521 9.74062 2.82269 10.2996 3.13294C10.5243 3.29074 10.6981 3.46554 10.8026 3.66352C10.8172 3.69139 10.8253 3.72217 10.8254 3.7536L10.839 5.58949C10.8394 5.68168 10.9142 5.75588 11.0062 5.75588Z" class="fill-icon-3"></path></svg>
            </span>
            <MobileBottomNavIcon v-else :name="cell.icon" />
            <span>{{ translate(cell.label) }}</span>
          </template>
        </component>
      </div>
    </div>
    <UnderMaintenance v-if="isMaintenanceOpen" @close="isMaintenanceOpen = false" />
  </nav>
</template>

<style scoped>
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 63.99rem) {
  .mobile-bottom-nav {
    display: block;
    position: fixed;
    z-index: 48;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: calc(66px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    overflow: visible;
    border: 0;
    border-radius: 20px 20px 0 0;
    color: #8c8c8c;
    background: rgba(17, 17, 17, 0.98);
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.34);
    backdrop-filter: blur(18px) saturate(1.12);
    -webkit-backdrop-filter: blur(18px) saturate(1.12);
    transform: translate3d(0, 0, 0);
    visibility: visible;
    transition:
      transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
      visibility 0s linear;
    will-change: transform;
  }

  .mobile-bottom-nav--hidden {
    pointer-events: none;
    transform: translate3d(0, calc(100% + 8px), 0);
    visibility: hidden;
    transition-delay: 0s, 220ms;
  }

  .mobile-bottom-nav--live-plaza {
    min-height: calc(58px + env(safe-area-inset-bottom));
    border-radius: 20px 20px 0 0;
    background: #141414;
  }

  .mobile-bottom-nav--live-plaza .mobile-bottom-nav__row {
    height: 58px;
  }

  .mobile-bottom-nav__row {
    display: grid;
    height: 66px;
    align-items: stretch;
    overflow: hidden;
  }

  .mobile-bottom-nav__cell {
    grid-row: 1;
    position: relative;
    z-index: 2;
    min-width: 0;
    transform: translateX(0px);
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mobile-bottom-nav__cell--door {
    z-index: 1;
    height: 58px;
    align-self: end;
  }

  .mobile-bottom-nav__row[data-sliding] > .mobile-bottom-nav__cell {
    will-change: transform;
  }

  .mobile-bottom-nav__door-art {
    display: contents;
  }

  .mobile-bottom-nav__control {
    width: 100%;
    height: 100%;
  }

  .mobile-bottom-nav__item.mobile-bottom-nav__item--plaza {
    font-size: 11px;
  }

  .mobile-bottom-nav__switch--plaza {
    background: var(--main-color);
  }

  .mobile-bottom-nav__switch--plaza .mobile-bottom-nav__switch-circle {
    width: 38px;
    height: 38px;
    background: #101010;
  }

  .mobile-bottom-nav__row--primary {
    grid-template-columns: 60px repeat(4, minmax(0, 1fr));
  }

  .mobile-bottom-nav__row--inner,
  .mobile-bottom-nav__row--egames,
  .mobile-bottom-nav__row--casino {
    grid-template-columns: repeat(4, minmax(0, 1fr)) 60px;
  }

  .mobile-bottom-nav__item,
  .mobile-bottom-nav__switch {
    appearance: none;
    min-width: 0;
    border: 0;
    font-family: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .mobile-bottom-nav__item {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 6px 2px 5px;
    color: #8d8d8d;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    background: transparent;
    gap: 5px;
    transition: color 140ms ease;
  }

  .mobile-bottom-nav__item svg,
  .mobile-bottom-nav__item :deep(svg) {
    flex: none;
    fill: #959799;
    transition: fill 140ms ease;
  }

  .mobile-bottom-nav__icon-wrap {
    display: grid;
    place-items: center;
    width: 29px;
    height: 29px;
    flex: none;
  }

  .mobile-bottom-nav__item .fill-nav-bar-icon-button,
  .mobile-bottom-nav__item :deep(.fill-nav-bar-icon-button),
  .mobile-bottom-nav__item .fill-icon-3,
  .mobile-bottom-nav__item :deep(.fill-icon-3) {
    fill: #959799;
    transition: fill 140ms ease;
  }

  .mobile-bottom-nav__item img {
    display: block;
    width: 29px;
    height: 29px;
    flex: none;
    object-fit: contain;
    filter: grayscale(1) brightness(1.25);
    opacity: 0.74;
    transition: filter 140ms ease;
  }

  .mobile-bottom-nav__item span:last-child {
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-bottom-nav__item:hover,
  .mobile-bottom-nav__item--active {
    color: var(--main-color);
  }

  .mobile-bottom-nav__item:hover svg,
  .mobile-bottom-nav__item--active svg,
  .mobile-bottom-nav__item:hover :deep(svg),
  .mobile-bottom-nav__item--active :deep(svg),
  .mobile-bottom-nav__item:hover .fill-nav-bar-icon-button,
  .mobile-bottom-nav__item--active .fill-nav-bar-icon-button,
  .mobile-bottom-nav__item:hover :deep(.fill-nav-bar-icon-button),
  .mobile-bottom-nav__item--active :deep(.fill-nav-bar-icon-button),
  .mobile-bottom-nav__item:hover .fill-icon-3,
  .mobile-bottom-nav__item--active .fill-icon-3,
  .mobile-bottom-nav__item:hover :deep(.fill-icon-3),
  .mobile-bottom-nav__item--active :deep(.fill-icon-3) {
    fill: var(--main-color);
  }

  .mobile-bottom-nav__item--active img {
    filter: none;
    opacity: 1;
  }

  .mobile-bottom-nav__switch {
    display: grid;
    height: 58px;
    align-self: end;
    place-items: center;
    color: #f4f7f5;
    background: var(--main-color);
  }

  .mobile-bottom-nav__switch--home {
    padding-right: 8px;
    border-radius: 0 31px 31px 0;
  }

  .mobile-bottom-nav__switch--back {
    padding: 0 10px 0 10px;
    border-radius: 31px 31px 0 31px;
  }

  .mobile-bottom-nav__switch-circle {
    display: grid;
    width: 35px;
    height: 35px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    color: #f4f7f5;
    background: #101010;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.38);
  }

  .mobile-bottom-nav__switch--back .mobile-bottom-nav__switch-circle {
    color: #f4f7f5;
    background: #141414;
  }

  .mobile-bottom-nav__inplay-icon {
    display: grid;
    position: relative;
    width: 31px;
    height: 29px;
    place-items: center;
    overflow: visible !important;
  }

  .mobile-bottom-nav__play {
    position: absolute;
    right: -2px;
    bottom: -1px;
    color: currentColor;
    filter: drop-shadow(0 0 2px #111);
  }

  .mobile-bottom-nav__badge {
    display: grid;
    position: absolute;
    top: -8px;
    right: -12px;
    min-width: 20px;
    height: 20px;
    place-items: center;
    padding: 0 4px;
    border-radius: 10px;
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    background: var(--main-color);
    box-shadow: 0 0 0 2px #111111;
  }

  @media (max-width: 22rem) {
    .mobile-bottom-nav__item {
      font-size: 11px;
    }

    .mobile-bottom-nav__switch-circle {
      width: 44px;
      height: 44px;
    }
  }
}

@media (max-width: 63.99rem) and (prefers-reduced-motion: reduce) {
  .mobile-bottom-nav {
    transition: none;
  }

  .mobile-bottom-nav__cell {
    transition: none !important;
  }
}
</style>
