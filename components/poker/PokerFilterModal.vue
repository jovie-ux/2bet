<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { POKER_PROVIDERS, type PokerProvider } from '~/data/poker'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

interface PokerFilters {
  provider: string
  sort: 'default' | 'title-asc' | 'title-desc'
}

const props = withDefaults(defineProps<{
  open: boolean
  modelValue: PokerFilters
  providers?: PokerProvider[]
}>(), {
  providers: () => POKER_PROVIDERS,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:modelValue': [value: PokerFilters]
}>()

const { translate } = useSiteLocale()
const { effectiveTheme } = useSiteTheme()

const dialog = ref<HTMLDialogElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const draft = ref<PokerFilters>({ provider: 'all', sort: 'default' })
const sortOptions = computed<{ key: PokerFilters['sort']; label: string }[]>(() => [
  { key: 'default', label: translate('Original order') },
  { key: 'title-asc', label: 'A–Z' },
  { key: 'title-desc', label: 'Z–A' },
])

const isOptionActive = (providerKey: string): boolean => {
  if (props.providers.length === 1) {
    return true
  }
  return draft.value.provider.toLowerCase() === providerKey.toLowerCase()
}

let previousBodyOverflow = ''
let hasScrollLock = false

const unlockPage = (): void => {
  if (!import.meta.client || !hasScrollLock) return
  document.body.style.overflow = previousBodyOverflow
  hasScrollLock = false
}

const syncDialog = async (): Promise<void> => {
  if (!import.meta.client) return
  await nextTick()
  const element = dialog.value
  if (!element) return

  if (props.open) {
    if (element.open) return
    draft.value = { ...props.modelValue }
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    hasScrollLock = true
    element.showModal()
    closeButton.value?.focus({ preventScroll: true })
  } else {
    element.close()
    unlockPage()
  }
}

const close = (): void => emit('update:open', false)

const handleBackdropClick = (event: MouseEvent): void => {
  if (event.target !== dialog.value || !dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
}

const reset = (): void => {
  draft.value = { provider: 'all', sort: 'default' }
}

const apply = (): void => {
  emit('update:modelValue', { ...draft.value })
  close()
}

const handleNativeClose = (): void => {
  unlockPage()
  if (props.open) close()
}

watch(() => props.open, syncDialog, { flush: 'post' })
onMounted(syncDialog)
onBeforeUnmount(() => {
  dialog.value?.close()
  unlockPage()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="poker-filter-modal"
      aria-labelledby="poker-filter-title"
      @cancel.prevent="close"
      @close="handleNativeClose"
      @click="handleBackdropClick"
    >
      <header class="poker-filter-header">
        <div id="poker-filter-title" class="poker-filter-title" role="heading" aria-level="2">{{ translate('Filter games') }}</div>
        <button ref="closeButton" type="button" class="poker-filter-close" :aria-label="translate('Close filters')" @click="close">
          <X :size="18" aria-hidden="true" />
        </button>
      </header>

      <div class="poker-filter-content">
        <fieldset v-if="providers.length">
          <legend>{{ translate('Provider') }}</legend>
          <div class="poker-filter-options">
            <button
              v-for="provider in providers"
              :key="provider.key"
              type="button"
              class="poker-filter-option"
              :class="{ 'poker-filter-option--active': isOptionActive(provider.key) }"
              :aria-pressed="isOptionActive(provider.key)"
              :aria-label="provider.key === 'all' ? translate('All') : provider.label"
              @click="draft.provider = provider.key"
            >
              <img
                v-if="provider.logo"
                :src="getProviderLogoForTheme(provider.logo, effectiveTheme)"
                :alt="provider.label"
                class="poker-provider-modal-logo"
              />
              <span v-else>{{ provider.key === 'all' ? translate('All') : provider.label }}</span>
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend>{{ translate('Sort by') }}</legend>
          <div class="poker-filter-options">
            <button
              v-for="option in sortOptions"
              :key="option.key"
              type="button"
              class="poker-filter-option"
              :class="{ 'poker-filter-option--active': draft.sort === option.key }"
              :aria-pressed="draft.sort === option.key"
              @click="draft.sort = option.key"
            >
              {{ option.label }}
            </button>
          </div>
        </fieldset>
      </div>

      <footer class="poker-filter-actions">
        <button type="button" class="poker-filter-reset" @click="reset">{{ translate('Reset') }}</button>
        <button type="button" class="poker-filter-apply" @click="apply">{{ translate('Apply') }}</button>
      </footer>
    </dialog>
  </Teleport>
</template>

<style scoped>
.poker-filter-modal {
  width: min(440px, calc(100vw - 32px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 18px;
  color: var(--text);
  background: var(--surface);
  box-shadow: 0 20px 70px rgb(0 0 0 / 35%);
}

.poker-filter-modal::backdrop {
  background: rgb(0 0 0 / 65%);
  backdrop-filter: blur(3px);
}

.poker-filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--border);
}

.poker-filter-title,
h2 {
  margin: 0;
  color: var(--heading);
  font-size: 18px;
  font-weight: 700;
}

button {
  cursor: pointer;
  font: inherit;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}

button:focus-visible {
  outline: 2px solid var(--main-color);
  outline-offset: 3px;
}

.poker-filter-close {
  display: grid;
  width: 32px;
  height: 32px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--secondary);
  background: var(--odd-btn);
}

.poker-filter-close:hover {
  color: var(--heading);
}

.poker-filter-content {
  display: grid;
  gap: 24px;
  padding: 24px 20px;
}

fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend {
  margin-bottom: 12px;
  padding: 0;
  color: var(--heading);
  font-size: 14px;
  font-weight: 600;
}

.poker-filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.poker-filter-option {
  min-width: 58px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--secondary);
  background: var(--odd-btn);
  font-size: 13px;
}

.poker-provider-modal-logo {
  height: 18px;
  max-width: 65px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.poker-filter-option:hover {
  color: var(--heading);
}

.poker-filter-option--active,
.poker-filter-option--active:hover {
  border-color: var(--main-color);
  color: #fff;
  background: var(--main-color);
}

.poker-filter-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px 20px 20px;
  border-top: 1px solid var(--border);
}

.poker-filter-actions button {
  min-height: 42px;
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
}

.poker-filter-reset {
  color: var(--text);
  background: var(--odd-btn);
}

.poker-filter-reset:hover {
  background: var(--odd-btn-hover);
}

.poker-filter-apply {
  border-color: var(--main-color) !important;
  color: #fff;
  background: var(--main-color);
}

.poker-filter-apply:hover {
  background: var(--brand-hover);
}

@media (max-width: 639px) {
  .poker-filter-modal {
    inset: auto 0 0;
    width: 100%;
    max-height: calc(100dvh - 24px);
    margin: 0;
    border-radius: 20px 20px 0 0;
  }

  .poker-filter-actions {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>
