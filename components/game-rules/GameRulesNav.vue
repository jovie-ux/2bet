<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'

const route = useRoute()
const router = useRouter()

const ruleTabs = [
  { label: 'FOOTBALL', to: '/game-rules/football' },
  { label: 'BASKETBALL', to: '/game-rules/basketball' },
  { label: 'TENNIS', to: '/game-rules/tennis' },
  { label: 'SPORTS BETTING RULES', to: '/game-rules/sports-betting-rules' },
  { label: 'BASEBALL', to: '/game-rules/baseball' },
  { label: 'PARLAYS / MULTIPLES', to: '/game-rules/parlays-multiples' },
  { label: 'CASH OUT', to: '/game-rules/cash-out' },
  { label: 'OUTRIGHT', to: '/game-rules/outright' },
  { label: 'TABLE TENNIS', to: '/game-rules/table-tennis' },
  { label: 'BADMINTON', to: '/game-rules/badminton' },
]

const isActive = (tabTo: string): boolean => {
  const currentPath = route.path.replace(/\/$/, '')
  const targetPath = tabTo.replace(/\/$/, '')
  return currentPath === targetPath
}

const handleBack = (): void => {
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/explore/account/me')
  }
}

// Interactive text size scaler for 'AA' button (80% | 100% | 120%)
export type TextSize = '80%' | '100%' | '120%'

const textSizeLevel = useState<TextSize>('game-rules-text-size', () => '100%')
const isPickerOpen = ref(false)
const textSizePickerRef = ref<HTMLElement | null>(null)

const applyTextSize = (size: TextSize) => {
  textSizeLevel.value = size
  if (import.meta.client) {
    try {
      localStorage.setItem('bybet-game-rules-text-size', size)
    } catch {}
    const root = document.querySelector('.site-shell') || document.documentElement
    root.classList.remove('rules-text-80', 'rules-text-100', 'rules-text-120', 'rules-text-normal', 'rules-text-large', 'rules-text-xlarge')
    root.classList.add(size === '80%' ? 'rules-text-80' : size === '120%' ? 'rules-text-120' : 'rules-text-100')
  }
}

const togglePicker = () => {
  isPickerOpen.value = !isPickerOpen.value
}

const closePicker = () => {
  isPickerOpen.value = false
}

const selectTextSize = (size: TextSize) => {
  applyTextSize(size)
  closePicker()
}

const handleClickOutside = (event: MouseEvent) => {
  if (textSizePickerRef.value && !textSizePickerRef.value.contains(event.target as Node)) {
    closePicker()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closePicker()
  }
}

const navContainerRef = ref<HTMLElement | null>(null)

const scrollToActiveTab = () => {
  if (!import.meta.client || !navContainerRef.value) return
  nextTick(() => {
    const nav = navContainerRef.value
    if (!nav) return
    const activeEl = nav.querySelector('.tab-pill--active') as HTMLElement | null
    if (!activeEl) return
    const navRect = nav.getBoundingClientRect()
    const activeRect = activeEl.getBoundingClientRect()
    // Only scroll if active tab is actually overflowing/hidden outside viewport
    if (activeRect.left < navRect.left || activeRect.right > navRect.right) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}

onMounted(() => {
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('bybet-game-rules-text-size') as TextSize | null
      if (saved && ['80%', '100%', '120%'].includes(saved)) {
        applyTextSize(saved)
      } else {
        applyTextSize(textSizeLevel.value)
      }
    } catch {
      applyTextSize(textSizeLevel.value)
    }
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
  }
  scrollToActiveTab()
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleKeyDown)
  }
})

watch(() => route.path, () => {
  scrollToActiveTab()
})
</script>

<template>
  <div class="game-rules-sticky-wrapper sticky-header-seal sticky top-0 lg:top-[var(--content-sticky-top)] z-30 bg-[#000000] -mx-2 sm:-mx-4 pb-2 mb-2 sm:mb-3 rounded-t-2xl">
    <header class="game-rules-header-wrapper">
      <!-- Universal Emerald Subpage Header with AA text scaler -->
      <SubpageHeader
        title="Game Rules"
        back-to="/explore/account/me"
        :sticky="false"
        class="mb-2"
      >
        <template #right>
          <div ref="textSizePickerRef" class="relative flex items-center">
            <button
              type="button"
              class="game-rules-aa flex items-baseline justify-center px-2 py-1 text-[#1fa779] hover:text-[#32d49a] transition-colors cursor-pointer select-none bg-transparent border-0"
              :title="`Text size: ${textSizeLevel}`"
              aria-label="Adjust font size"
              :aria-expanded="isPickerOpen"
              @click.stop="togglePicker"
            >
              <span class="text-[18px] font-bold leading-none tracking-tight">A</span>
              <span class="text-[14px] font-bold leading-none tracking-tight">A</span>
            </button>

            <!-- Text Size Popover Menu matching user mockup -->
            <Transition name="rules-popover-fade">
              <div
                v-if="isPickerOpen"
                class="text-size-popover"
                role="menu"
                aria-label="Font size selector"
                @click.stop
              >
                <!-- Notch / Arrow pointing up towards AA button -->
                <div class="popover-arrow" aria-hidden="true" />

                <button
                  type="button"
                  class="text-size-btn"
                  :class="{ 'text-size-btn--active': textSizeLevel === '80%' }"
                  role="menuitem"
                  @click="selectTextSize('80%')"
                >
                  80%
                </button>

                <div class="popover-divider" aria-hidden="true" />

                <button
                  type="button"
                  class="text-size-btn"
                  :class="{ 'text-size-btn--active': textSizeLevel === '100%' }"
                  role="menuitem"
                  @click="selectTextSize('100%')"
                >
                  100%
                </button>

                <div class="popover-divider" aria-hidden="true" />

                <button
                  type="button"
                  class="text-size-btn"
                  :class="{ 'text-size-btn--active': textSizeLevel === '120%' }"
                  role="menuitem"
                  @click="selectTextSize('120%')"
                >
                  120%
                </button>
              </div>
            </Transition>
          </div>
        </template>
      </SubpageHeader>

      <!-- Category Navigation Tabs (cornered layout matching screenshot) -->
      <nav
        ref="navContainerRef"
        class="game-rules-category-nav flex items-center gap-2 overflow-x-auto py-1 px-2 sm:px-4 scrollbar-none"
        aria-label="Game Rules Categories"
      >
        <NuxtLink
          v-for="tab in ruleTabs"
          :key="tab.to"
          :to="tab.to"
          class="game-rules-tab shrink-0 text-xs sm:text-sm font-semibold uppercase transition-all whitespace-nowrap select-none px-4 py-1.5 rounded-full border border-white/5"
          :class="isActive(tab.to)
            ? 'tab-pill--active bg-[var(--main-color)] text-white shadow font-bold'
            : 'bg-[#242625] text-[#8e9491] hover:text-white'"
        >
          {{ tab.label }}
        </NuxtLink>
      </nav>
    </header>
  </div>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .game-rules-sticky-wrapper {
    padding-bottom: 0;
    border-radius: 0;
    background: linear-gradient(var(--main-color) 0 74px, #000 74px);
  }
  .game-rules-header-wrapper :deep(.subpage-header) {
    height: 48px;
    min-height: 48px;
    margin-bottom: 0;
    padding: 0 12px;
    background: var(--main-color);
    box-shadow: none;
  }
  .game-rules-header-wrapper :deep(.subpage-header__title) { font-size: 16px; }
  .game-rules-header-wrapper :deep(.subpage-header__back-btn) { width: 30px; height: 30px; border-color: #ffffff60; }
  .game-rules-header-wrapper .game-rules-aa,
  .game-rules-header-wrapper .game-rules-aa:hover { color: #fff; }
  .game-rules-header-wrapper .game-rules-category-nav {
    min-height: 46px;
    margin: 0 8px;
    padding: 8px 12px;
    border-radius: 12px;
    background: #141414;
    gap: 8px;
  }
  .game-rules-category-nav .game-rules-tab {
    min-height: 30px;
    padding: 5px 12px;
    border: 0;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    background: transparent;
    box-shadow: none;
  }
  .game-rules-category-nav .game-rules-tab.tab-pill--active { background: var(--main-color); }
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (min-width: 64rem) {
  .game-rules-sticky-wrapper {
    margin-right: 0;
    margin-bottom: 8px;
    margin-left: 0;
    padding-bottom: 0;
  }

  .game-rules-category-nav {
    min-height: 46px;
    padding: 5px 12px;
    border: 1px solid rgba(255, 255, 255, 0.035);
    border-radius: 11px;
    color: #ececec;
    background: #1c1d1c;
    gap: 7px;
  }

  .game-rules-tab {
    min-height: 30px;
    padding: 5px 13px;
    border-color: transparent;
    border-radius: 16px;
    color: #ececec;
    font-size: 14px;
    line-height: 20px;
    background: transparent;
    box-shadow: none;
  }

  .game-rules-tab:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }

  .game-rules-tab.tab-pill--active {
    color: #ffffff;
    background: var(--main-color);
  }
}

.game-rules-aa {
  display: flex;
  align-items: baseline;
  gap: 0.5px;
  color: #1fa779;
  background: transparent;
  padding: 2px 6px;
  border: 0;
  cursor: pointer;
  transition: color 150ms ease, opacity 150ms ease;
}

.game-rules-aa:hover {
  color: #32d49a;
}

/* Text Size Popover Menu matching user mockup */
.text-size-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: -6px;
  z-index: 60;
  display: flex;
  align-items: center;
  background-color: #000000;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
  user-select: none;
}

.popover-arrow {
  position: absolute;
  top: -6px;
  right: 18px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #000000;
}

.popover-divider {
  width: 1px;
  height: 22px;
  background-color: rgba(255, 255, 255, 0.15);
}

.text-size-btn {
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  color: #9ca3af;
  background: transparent;
  border: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: color 150ms ease;
}

.text-size-btn:hover {
  color: #ffffff;
}

.text-size-btn--active {
  color: #1fa779 !important;
  font-weight: 700;
}

.rules-popover-fade-enter-active,
.rules-popover-fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.rules-popover-fade-enter-from,
.rules-popover-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}

/* Scaling rules for content cards across all game rule pages */
:global(.rules-text-80 .editor-container),
:global(.rules-text-80 .sports-betting-rules-card),
:global(.rules-text-80 [class*="-rules-card"]),
:global(.rules-text-80 .sports-betting-rules-content) {
  font-size: 0.85rem !important;
  zoom: 0.85;
}

:global(.rules-text-100 .editor-container),
:global(.rules-text-100 .sports-betting-rules-card),
:global(.rules-text-100 [class*="-rules-card"]),
:global(.rules-text-100 .sports-betting-rules-content) {
  font-size: 1rem !important;
  zoom: 1;
}

:global(.rules-text-120 .editor-container),
:global(.rules-text-120 .sports-betting-rules-card),
:global(.rules-text-120 [class*="-rules-card"]),
:global(.rules-text-120 .sports-betting-rules-content) {
  font-size: 1.2rem !important;
  zoom: 1.2;
}

/* Backward compatibility for legacy classes */
:global(.rules-text-normal .editor-container),
:global(.rules-text-normal [class*="-rules-card"]) {
  font-size: 1rem !important;
  zoom: 1;
}

:global(.rules-text-large .editor-container),
:global(.rules-text-large [class*="-rules-card"]) {
  font-size: 1.125rem !important;
  zoom: 1.1;
}

:global(.rules-text-xlarge .editor-container),
:global(.rules-text-xlarge [class*="-rules-card"]) {
  font-size: 1.25rem !important;
  zoom: 1.2;
}
</style>
