<script setup lang="ts">
const { bybetRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const railItems = createRailItems(bybetRedirectUrl, bybetRedirectCode)
import { Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import UnderMaintenance from '~/components/modals/UnderMaintenance.vue'
import DepositReminderModal from '~/components/modals/DepositReminderModal.vue'
import { createRailItems } from '~/data/homepage'
import type { RailItem, RailSubItem } from '~/data/homepage'
import type { LanguageOption, ThemePreference } from '~/composables/useSitePreferences'

const props = defineProps<{
  open: boolean
  collapsed: boolean
}>()

const emit = defineEmits<{
  close: []
  'toggle-collapse': []
  'demo-action': [label: string]
}>()

const route = useRoute()
const nuxtLinkComponent = resolveComponent('NuxtLink')
const activeItemLabel = ref('Home')
const maintenanceOpen = ref(false)
const fundsReminderOpen = ref(false)
const expandedMenus = ref(
  railItems
    .filter(item => Boolean(item.children?.length))
    .map(item => item.label),
)
const {
  locale,
  selectedLanguageLabel,
  setLocale,
  translate,
} = useSiteLocale()
const {
  applyTheme,
  setThemePreference,
  themePreference,
} = useSiteTheme()
let systemThemeQuery: MediaQueryList | undefined

const isExpandable = (item: RailItem): boolean => {
  return Boolean(item.children?.length || item.control)
}

const isExpanded = (item: RailItem): boolean => {
  return expandedMenus.value.includes(item.label)
}

const getItemLabel = (item: RailItem): string => {
  if (item.control === 'language') {
    return selectedLanguageLabel.value
  }

  if (item.control === 'theme') {
    const preferenceLabel = themePreference.value.charAt(0).toUpperCase() + themePreference.value.slice(1)
    return translate(preferenceLabel)
  }

  return translate(item.label)
}

const getItemAttributes = (item: RailItem): Record<string, string | boolean> => {
  if (item.to) {
    const isExt = Boolean(item.external || item.to.startsWith('http://') || item.to.startsWith('https://'))
    return {
      to: item.to,
      ...(isExt ? { external: true } : {}),
    }
  }

  if (item.sectionId && !isExpandable(item)) {
    return { href: `#${item.sectionId}` }
  }

  return { type: 'button' }
}

const getSubmenuItemAttributes = (childItem: RailSubItem): Record<string, string | boolean> => {
  if (childItem.underMaintenance || childItem.showFundsModal || childItem.label.toLowerCase() === 'funds') {
    return { type: 'button' }
  }

  const isExt = Boolean(childItem.external || childItem.to.startsWith('http://') || childItem.to.startsWith('https://'))
  return {
    to: childItem.to,
    ...(isExt ? { external: true } : {}),
  }
}

const isSubmenuItemActive = (childItem: RailSubItem): boolean => {
  if (childItem.underMaintenance || childItem.showFundsModal || childItem.label.toLowerCase() === 'funds') {
    return false
  }
  if (childItem.external || childItem.to.startsWith('http://') || childItem.to.startsWith('https://')) {
    return false
  }
  return route.path === childItem.to || route.path.startsWith(`${childItem.to}/`)
}

const isItemActive = (item: RailItem): boolean => {
  return item.to
    ? route.path === item.to || route.path.startsWith(`${item.to}/`)
    : item.label === activeItemLabel.value
}

const toggleMenu = (item: RailItem): void => {
  if (isExpanded(item)) {
    expandedMenus.value = expandedMenus.value.filter(label => label !== item.label)
    return
  }

  expandedMenus.value = [...expandedMenus.value, item.label]
}

const handleItemClick = (item: RailItem): void => {
  if (isExpandable(item)) {
    if (props.collapsed) {
      emit('toggle-collapse')
    }
    toggleMenu(item)
    return
  }

  activeItemLabel.value = item.label

  if (!item.sectionId && !item.to) {
    emit('demo-action', item.label)
  }

  emit('close')
}

const handleSubmenuNavigation = (item: RailSubItem): void => {
  if (item.underMaintenance) {
    maintenanceOpen.value = true
    return
  }
  if (item.showFundsModal || item.label.toLowerCase() === 'funds') {
    fundsReminderOpen.value = true
    return
  }
  activeItemLabel.value = item.label
  emit('close')
}

const selectLanguage = (language: LanguageOption): void => {
  setLocale(language.code)
}

const selectTheme = (preference: ThemePreference): void => {
  setThemePreference(preference)
}

const handleSystemThemeChange = (): void => {
  if (themePreference.value === 'auto') {
    applyTheme()
  }
}

onMounted(() => {
  const savedLanguage = window.localStorage.getItem('bybet-language')
  const savedLanguageOption = languageOptions.find(option => option.code === savedLanguage)
  if (savedLanguageOption) {
    setLocale(savedLanguageOption.code)
  }

  const savedTheme = window.localStorage.getItem('bybet-theme')
  if (savedTheme === 'auto' || savedTheme === 'light' || savedTheme === 'dark') {
    setThemePreference(savedTheme)
  }

  systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemThemeQuery.addEventListener('change', handleSystemThemeChange)
  applyTheme()
})

onBeforeUnmount(() => {
  systemThemeQuery?.removeEventListener('change', handleSystemThemeChange)
})
</script>

<template>
  <div v-if="open" class="rail-scrim" aria-hidden="true" @click="emit('close')" />
  <aside
    id="mobile-navigation"
    class="sidebar"
    :class="{ 'sidebar--open': open, 'sidebar--collapsed': collapsed }"
    :aria-label="translate('Main navigation')"
  >
    <div class="rail-viewport">
      <nav id="rail-navigation" class="rail-pill">
        <template v-for="(item, itemIndex) in railItems" :key="`${item.label}-${itemIndex}`">
          <component
            :is="item.to ? nuxtLinkComponent : item.sectionId && !isExpandable(item) ? 'a' : 'button'"
            v-bind="getItemAttributes(item)"
            class="rail-link"
            :class="{
              'rail-link--active': isItemActive(item),
              'rail-link--surface': item.surface,
              'rail-link--utility': Boolean(item.control),
              'rail-link--utility-start': item.control === 'language',
            }"
            :title="getItemLabel(item)"
            :aria-label="getItemLabel(item)"
            :aria-expanded="isExpandable(item) ? isExpanded(item) : undefined"
            :aria-current="isItemActive(item) ? 'page' : undefined"
            @click="handleItemClick(item)"
          >
            <component
              :is="item.icon"
              class="rail-icon"
              :size="17"
              :stroke-width="2"
              aria-hidden="true"
            />
            <span class="rail-label">{{ getItemLabel(item) }}</span>
            <ChevronRight
              v-if="isExpandable(item)"
              class="rail-chevron"
              :class="{ 'rail-chevron--expanded': isExpanded(item) }"
              :size="12"
              aria-hidden="true"
            />
          </component>

          <div
            v-if="item.children && isExpanded(item)"
            class="rail-submenu"
            :aria-label="`${translate(item.label)} submenu`"
          >
            <component
              :is="childItem.underMaintenance || childItem.showFundsModal || childItem.label.toLowerCase() === 'funds' ? 'button' : nuxtLinkComponent"
              v-for="childItem in item.children"
              :key="childItem.to"
              v-bind="getSubmenuItemAttributes(childItem)"
              class="rail-submenu-link"
              :class="{
                'rail-submenu-link--active': isSubmenuItemActive(childItem),
                'rail-submenu-link--maintenance': childItem.underMaintenance,
              }"
              :aria-haspopup="childItem.underMaintenance || childItem.showFundsModal || childItem.label.toLowerCase() === 'funds' ? 'dialog' : undefined"
              :title="translate(childItem.label)"
              :aria-label="translate(childItem.label)"
              @click="handleSubmenuNavigation(childItem)"
            >
              <img
                v-if="childItem.iconImage"
                class="rail-submenu-icon-image"
                :src="childItem.iconImage"
                alt=""
                width="24"
                height="24"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              >
              <component
                v-else
                :is="childItem.icon"
                :style="{ color: childItem.accentColor }"
                :size="15"
                :stroke-width="2"
                aria-hidden="true"
              />
              <span>{{ translate(childItem.label) }}</span>
            </component>
          </div>

          <div
            v-else-if="item.control === 'language' && isExpanded(item)"
            class="rail-submenu rail-submenu--panel language-options"
            :aria-label="translate('Select language')"
          >
            <button
              v-for="language in languageOptions"
              :key="language.code"
              type="button"
              class="language-option"
              :class="{ 'language-option--active': locale === language.code }"
              @click="selectLanguage(language)"
            >
              <span>{{ language.label }}</span>
              <span class="language-radio" aria-hidden="true">
                <Check v-if="locale === language.code" :size="9" :stroke-width="3" />
              </span>
            </button>
          </div>

          <div
            v-else-if="item.control === 'theme' && isExpanded(item)"
            class="rail-submenu rail-submenu--panel theme-options"
            :aria-label="translate('Color theme')"
          >
            <button
              v-for="preference in (['auto', 'light', 'dark'] as ThemePreference[])"
              :key="preference"
              type="button"
              :class="{ 'theme-option--active': themePreference === preference }"
              @click="selectTheme(preference)"
            >
              {{ translate(preference.charAt(0).toUpperCase() + preference.slice(1)) }}
            </button>
          </div>
        </template>
      </nav>

      <button
        type="button"
        class="rail-toggle"
        :aria-expanded="!collapsed"
        aria-controls="rail-navigation"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="emit('toggle-collapse')"
      >
        <ChevronRight v-if="collapsed" :size="11" :stroke-width="3" aria-hidden="true" />
        <ChevronLeft v-else :size="11" :stroke-width="3" aria-hidden="true" />
      </button>
    </div>
  </aside>
  <UnderMaintenance v-if="maintenanceOpen" @close="maintenanceOpen = false" />
  <DepositReminderModal v-if="fundsReminderOpen" @close="fundsReminderOpen = false" />
</template>

<style scoped>
.sidebar {
  position: fixed;
  z-index: 40;
  top: var(--header-height);
  bottom: 0;
  left: max(0px, calc((100vw - var(--site-max-width)) / 2));
  width: var(--sidebar-width);
  pointer-events: none;
  transition: width 180ms ease;
}

.rail-viewport {
  position: relative;
  height: 100%;
}

.rail-pill {
  --tw-backdrop-blur: blur(12px) !important;

  display: flex;
  height: calc(100% - 0.7rem);
  max-height: calc(100% - 0.7rem);
  margin: 0.35rem 0.25rem;
  padding: 0.3rem;
  overflow-y: auto;
  flex-direction: column;
  border: 1px solid rgba(232, 245, 239, 0.16);
  border-radius: 0.5rem;
  background:rgba(255, 255, 255, 0.10);
  box-shadow:
    inset 1px 0 rgba(255, 255, 255, 0.1),
    inset -1px 0 rgba(255, 255, 255, 0.035),
    inset 0 1px rgba(255, 255, 255, 0.16),
    0 0.5rem 1.4rem rgba(0, 0, 0, 0.38);
  backdrop-filter: var(--tw-backdrop-blur) saturate(1.35) !important;
  -webkit-backdrop-filter: blur(12px) saturate(1.35) !important;
  gap: 0.1rem;
  pointer-events: auto;
  scrollbar-width: none;
  transition: width 180ms ease, padding 180ms ease;
}

.rail-pill::-webkit-scrollbar {
  display: none;
}

.sidebar--collapsed .rail-pill {
  --tw-backdrop-blur: blur(12px) !important;

  width: 56px;
  height: 100%;
  max-height: 100%;
  margin: 0 0 0 8px;
  padding: 7px 7px;
  border-color: rgba(232, 245, 239, 0.055);
  border-radius: 14px;
  background:rgba(255, 255, 255, 0.10);
  box-shadow:
    inset 1px 0 rgba(255, 255, 255, 0),
    inset -1px 0 rgba(255, 255, 255, 0.04),
    inset 0 1px rgba(255, 255, 255, 0),
    inset 0 -1px rgba(0, 0, 0, 0.2),
    0 0.55rem 1.5rem rgba(0, 0, 0, 0.38);
  backdrop-filter: var(--tw-backdrop-blur) saturate(1.4) !important;
  -webkit-backdrop-filter: blur(12px) saturate(1.4) !important;
  gap: 4px;
}

@media (min-width: 64rem) {
  .sidebar {
    top: var(--content-sticky-top);
    bottom: 8px;
  }

  .sidebar:not(.sidebar--collapsed) .rail-pill {
    height: 100%;
    max-height: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }
}

.rail-link {
  display: flex;
  position: relative;
  width: 100%;
  min-height: 1.6rem;
  flex: 0 0 auto;
  align-items: center;
  padding: 0 0.55rem;
  border: 0;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.52rem;
  font-weight: 500;
  text-align: left;
  background: transparent;
  gap: 0.54rem;
}

.rail-icon {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  color: #fff;
}

.rail-link:hover {
  color: var(--bright);
  background: rgba(255, 255, 255, 0.045);
}

.rail-link--active,
.rail-link--active:hover {
  color: white;
  background: var(--main-color);
}

.rail-link--surface {
  min-height: 1.8rem;
  margin-top: 0.18rem;
  border-radius: 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.045);
  background: rgba(5, 9, 8, 0.28);
}

.rail-link--utility-start {
  margin-top: auto;
}

.rail-link--utility + .rail-link--utility {
  margin-top: 0;
}

.rail-label {
  min-width: 0;
  flex: 1;
  overflow-wrap: anywhere;
  white-space: nowrap;
}

.rail-link--surface .rail-label {
  white-space: normal;
}

.rail-chevron {
  flex: 0 0 auto;
  color: #c7cfcb;
  transform: rotate(90deg);
  transition: transform 160ms ease;
}

.rail-chevron--expanded {
  transform: rotate(-90deg);
}

.rail-submenu {
  display: grid;
  margin: 0 0 0.2rem;
  padding: 0.15rem 0;
  gap: 0.05rem;
}

.rail-submenu-link {
  display: flex;
  min-height: 2rem;
  align-items: center;
  padding: 0 0.65rem;
  border-radius: 0.4rem;
  color: #e8eeeb;
  font-size: 0.48rem;
  font-weight: 500;
  gap: 0.62rem;
}

.rail-submenu-link svg {
  width: 0.85rem;
  height: 0.85rem;
  flex: 0 0 auto;
}

.rail-submenu-link--maintenance {
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  opacity: 0.55;
  cursor: pointer;
}

.rail-submenu-icon-image {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  flex: 0 0 auto;
  object-fit: contain;
}

.rail-submenu-link:hover {
  color: white;
  background: #5B5B5B;
}

.rail-submenu-link--active,
.rail-submenu-link--active:hover {
  color: white;
  background: var(--main-color);
  box-shadow: none;
}

.rail-submenu--panel {
  margin: 0.05rem 0 0.25rem;
  padding: 0.32rem;
  border-radius: 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(37, 41, 39, 0.78);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.language-options {
  gap: 0.05rem;
}

.language-option {
  display: flex;
  width: 100%;
  min-height: 2rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.35rem;
  border: 0;
  color: #afc0b7;
  font-size: 0.46rem;
  font-weight: 500;
  text-align: left;
  background: transparent;
  gap: 0.4rem;
}

.language-option:hover {
  color: white;
}

.language-radio {
  display: grid;
  width: 0.7rem;
  height: 0.7rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #65726c;
  border-radius: 50%;
}

.language-option--active .language-radio {
  border-color: #0cae78;
  color: white;
  background: #0cae78;
}

.theme-options {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.15rem;
}

.theme-options button {
  min-width: 0;
  height: 1.55rem;
  padding: 0 0.15rem;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  color: #c9d3ce;
  font-size: 0.42rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.07);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.035);
}

.theme-options button:hover,
.theme-options .theme-option--active {
  border-color: rgba(50, 212, 154, 0.45);
  color: white;
  background: #086b4d;
}

.sidebar--collapsed .rail-link {
  display: grid;
  width: 40px;
  min-height: 42px;
  place-items: center;
  padding: 0;
  border-radius: 9px;
}

.sidebar--collapsed .rail-link--surface {
  min-height: 42px;
  margin-top: 0;
  background: transparent;
}

.sidebar--collapsed .rail-link--utility-start {
  margin-top: auto;
}

.sidebar--collapsed .rail-label,
.sidebar--collapsed .rail-chevron {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.sidebar--collapsed .rail-submenu {
  display: grid;
  margin: 0;
  padding: 0;
  gap: 3px;
}

.sidebar--collapsed .rail-submenu-link {
  display: grid;
  width: 40px;
  min-height: 34px;
  place-items: center;
  padding: 0;
  border-radius: 8px;
  gap: 0;
}

.sidebar--collapsed .rail-submenu-link > span {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.sidebar--collapsed .rail-submenu-icon-image,
.sidebar--collapsed .rail-submenu-link svg {
  width: 18px;
  height: 18px;
}

.sidebar--collapsed .maintenance-indicator {
  display: none !important;
}

.rail-toggle {
  display: grid;
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 0;
  width: 14px;
  height: 56px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 999px;
  color: var(--bright);
  background: linear-gradient(90deg, #191c1b 0%, #242725 52%, #1a1d1c 100%);
  box-shadow:
    inset 1px 0 rgba(255, 255, 255, 0.035),
    inset -1px 0 rgba(0, 0, 0, 0.22),
    0 0.16rem 0.42rem rgba(0, 0, 0, 0.42);
  pointer-events: auto;
  transform: translateY(-50%);
}

.rail-toggle:hover {
  color: #43e0aa;
  background: linear-gradient(90deg, #1d211f 0%, #2b302d 52%, #1e2220 100%);
}

.rail-scrim {
  display: none;
}

@media (max-width: 63.99rem) {
  .sidebar {
    z-index: 45;
    bottom: 0;
    left: 0;
    width: min(13rem, calc(100vw - 3rem));
    visibility: hidden;
    transform: translateX(-100%);
    transition: transform 160ms ease, visibility 0s linear 160ms;
  }

  .sidebar--open {
    visibility: visible;
    transform: translateX(0);
    transition-delay: 0s;
  }

  .rail-viewport {
    height: 100%;
  }

  .rail-pill,
  .sidebar--collapsed .rail-pill {
    height: 100%;
    width: auto;
    max-height: none;
    margin: 0;
    padding: 0.5rem;
    visibility: visible;
    opacity: 1;
    border-radius: 0 1rem 1rem 0;
    transform: none;
  }

  .rail-link,
  .sidebar--collapsed .rail-link {
    display: flex;
    width: 100%;
    height: 2.6rem;
    min-height: 2.6rem;
    align-items: center;
    padding: 0 0.7rem;
    gap: 0.75rem;
  }

  .rail-label,
  .sidebar--collapsed .rail-label {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    font-size: 0.52rem;
    font-weight: 500;
  }

  .rail-chevron,
  .sidebar--collapsed .rail-chevron {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
  }

  .sidebar--collapsed .rail-submenu {
    display: grid;
  }

  .sidebar--collapsed .rail-submenu-link > span {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
  }

  .sidebar--collapsed .maintenance-indicator {
    display: inline-block !important;
  }

  .rail-toggle {
    display: none;
  }

  .rail-scrim {
    display: block;
    position: fixed;
    z-index: 44;
    inset: var(--header-height) 0 0;
    background: rgba(0, 0, 0, 0.58);
  }
}
</style>
