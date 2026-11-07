<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

interface SlotFilterState {
  theme: string
  feature: string
  winningLine: string
}

const props = defineProps<{
  open: boolean
  modelValue: SlotFilterState
}>()

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'update:modelValue', value: SlotFilterState): void
}>()

const { translate } = useSiteLocale()

const themes = [
  'All',
  'Myth & History',
  'Entertainment',
  'Nature',
  'Sports',
  'Movie',
  'Adventures',
  'Foods',
  'Romantic',
  'Anime',
  'Science Fiction',
  'Others',
]

const features = ['All', 'Buy Spins', 'Prize Pool', 'Auto Game', 'Free Spins']
const winningLines = ['All', '≤10 lines', '11–99 lines', '≥100 lines']

const cancelButton = ref<HTMLButtonElement | null>(null)
const draft = ref<SlotFilterState>({
  theme: 'All',
  feature: 'All',
  winningLine: 'All',
})

let previousBodyOverflow = ''

const copyCurrentFilters = (): void => {
  draft.value = { ...props.modelValue }
}

const close = (): void => {
  emit('update:open', false)
}

const reset = (): void => {
  draft.value = {
    theme: 'All',
    feature: 'All',
    winningLine: 'All',
  }
}

const apply = (): void => {
  emit('update:modelValue', { ...draft.value })
  close()
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') close()
}

const unlockPage = (): void => {
  if (!import.meta.client) return
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener('keydown', handleKeydown)
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return

    if (isOpen) {
      copyCurrentFilters()
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeydown)
      await nextTick()
      cancelButton.value?.focus({ preventScroll: true })
    } else {
      unlockPage()
    }
  },
  { immediate: true },
)

onBeforeUnmount(unlockPage)
</script>

<template>
  <Teleport to="body">
    <Transition name="slot-filter-fade">
      <div
        v-if="open"
        class="slot-filter-backdrop"
        role="presentation"
        @mousedown.self="close"
      >
        <section
          class="slot-filter-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="slot-filter-title"
        >
          <!-- Pull bar / Handle at the very top -->
          <div class="slot-filter-drag-handle" aria-hidden="true">
            <span class="slot-filter-pill-handle" />
          </div>

          <header class="slot-filter-header">
            <button
              ref="cancelButton"
              type="button"
              class="slot-filter-cancel"
              @click="close"
            >
              {{ translate('Cancel') }}
            </button>
            <h2 id="slot-filter-title">{{ translate('Filter') }}</h2>
            <span class="slot-filter-header-spacer" aria-hidden="true" />
          </header>

          <div class="slot-filter-content no-scrollbar">
            <fieldset class="slot-filter-group">
              <legend>{{ translate('Theme') }}</legend>
              <div class="slot-filter-grid">
                <button
                  v-for="theme in themes"
                  :key="theme"
                  type="button"
                  class="slot-filter-option"
                  :class="{ 'slot-filter-option--active': draft.theme === theme }"
                  :aria-pressed="draft.theme === theme"
                  @click="draft.theme = theme"
                >
                  {{ translate(theme) }}
                </button>
              </div>
            </fieldset>

            <fieldset class="slot-filter-group">
              <legend>{{ translate('Features') }}</legend>
              <div class="slot-filter-grid">
                <button
                  v-for="feature in features"
                  :key="feature"
                  type="button"
                  class="slot-filter-option"
                  :class="{ 'slot-filter-option--active': draft.feature === feature }"
                  :aria-pressed="draft.feature === feature"
                  @click="draft.feature = feature"
                >
                  {{ translate(feature) }}
                </button>
              </div>
            </fieldset>

            <fieldset class="slot-filter-group">
              <legend>{{ translate('Winning Line') }}</legend>
              <div class="slot-filter-grid">
                <button
                  v-for="line in winningLines"
                  :key="line"
                  type="button"
                  class="slot-filter-option"
                  :class="{ 'slot-filter-option--active': draft.winningLine === line }"
                  :aria-pressed="draft.winningLine === line"
                  @click="draft.winningLine = line"
                >
                  {{ translate(line) }}
                </button>
              </div>
            </fieldset>
          </div>

          <footer class="slot-filter-actions">
            <button type="button" class="slot-filter-action slot-filter-reset" @click="reset">
              {{ translate('Reset') }}
            </button>
            <button type="button" class="slot-filter-action slot-filter-ok" @click="apply">
              {{ translate('OK') }}
            </button>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slot-filter-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.68);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.slot-filter-modal {
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  max-height: calc(100dvh - 56px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #f5f5f5;
  background: #181919;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -8px 36px rgba(0, 0, 0, 0.7);
}

.slot-filter-drag-handle {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 2px;
}

.slot-filter-pill-handle {
  width: 36px;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.22);
}

.slot-filter-header {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 44px;
  padding: 4px 16px 8px;
}

.slot-filter-header h2 {
  grid-column: 2;
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;
}

.slot-filter-cancel {
  justify-self: start;
  min-width: 52px;
  margin: 0;
  padding: 6px 0;
  color: #c5cac7;
  background: transparent;
  border: 0;
  border-radius: 6px;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
  transition: color 140ms ease;
}

.slot-filter-cancel:hover {
  color: #ffffff;
}

.slot-filter-header-spacer {
  grid-column: 3;
  justify-self: end;
  width: 52px;
}

.slot-filter-content {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 4px 16px 16px;
  scrollbar-width: none;
}

.slot-filter-content::-webkit-scrollbar {
  display: none;
}

.slot-filter-group {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.slot-filter-group + .slot-filter-group {
  margin-top: 20px;
}

.slot-filter-group legend {
  display: block;
  width: 100%;
  margin: 0 0 10px;
  padding: 0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
}

.slot-filter-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.slot-filter-option {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 42px;
  margin: 0;
  padding: 4px 6px;
  color: #e2e8e5;
  background: #1e201f;
  border: 1px solid transparent;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease;
}

.slot-filter-option:hover {
  background: #252726;
  color: #ffffff;
}

.slot-filter-option--active {
  background: #161817;
  border-color: #008d62;
  color: #ffffff;
  font-weight: 500;
}

.slot-filter-actions {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px 16px max(16px, env(safe-area-inset-bottom));
  background: #181919;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.slot-filter-action {
  height: 46px;
  margin: 0;
  padding: 0 12px;
  color: #ffffff;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 140ms ease;
}

.slot-filter-reset {
  background: #2a2c2b;
}

.slot-filter-reset:hover {
  background: #343735;
}

.slot-filter-ok {
  background: var(--main-color);
  font-weight: 700;
}

.slot-filter-ok:hover {
  background: #047a52;
}

.slot-filter-cancel:focus-visible,
.slot-filter-option:focus-visible,
.slot-filter-action:focus-visible {
  outline: 2px solid #008d62;
  outline-offset: 2px;
}

/* Animations */
.slot-filter-fade-enter-active,
.slot-filter-fade-leave-active {
  transition: opacity 220ms ease;
}

.slot-filter-fade-enter-active .slot-filter-modal,
.slot-filter-fade-leave-active .slot-filter-modal {
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1), opacity 220ms ease;
}

.slot-filter-fade-enter-from,
.slot-filter-fade-leave-to {
  opacity: 0;
}

.slot-filter-fade-enter-from .slot-filter-modal,
.slot-filter-fade-leave-to .slot-filter-modal {
  transform: translateY(100%);
  opacity: 0;
}

@media (min-width: 640px) {
  .slot-filter-backdrop {
    align-items: center;
    padding: 16px;
  }

  .slot-filter-modal {
    border-radius: 20px;
    max-height: min(720px, calc(100dvh - 64px));
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .slot-filter-fade-enter-from .slot-filter-modal,
  .slot-filter-fade-leave-to .slot-filter-modal {
    transform: translateY(16px) scale(0.97);
    opacity: 0;
  }
}

@media (max-width: 350px) {
  .slot-filter-content {
    padding-inline: 12px;
  }

  .slot-filter-grid {
    gap: 8px;
  }

  .slot-filter-option {
    padding-inline: 2px;
    font-size: 12px;
  }
}
</style>
