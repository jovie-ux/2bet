<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { BONUS_CURRENCIES, getBonusCurrency, type BonusCurrency } from '~/data/bonus-currencies'

const props = withDefaults(defineProps<{
  modelValue?: string
  currencies?: BonusCurrency[]
  ariaLabel?: string
  optionsLabel?: string
}>(), {
  modelValue: 'all',
  currencies: () => BONUS_CURRENCIES,
  ariaLabel: '',
  optionsLabel: 'Bonus currencies',
})
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const { translate } = useSitePreferences()

const isOpen = ref(false)
const trigger = ref<HTMLButtonElement | null>(null)
const dialog = ref<HTMLDivElement | null>(null)
const titleId = useId()
const triggerCurrency = computed(() => {
  const code = props.modelValue === 'all' ? 'BRL' : props.modelValue
  return props.currencies.find(currency => currency.code === code) || getBonusCurrency(code)
})
const triggerAriaLabel = computed(() => props.ariaLabel || `Select bonus currency: ${
  (props.currencies.find(currency => currency.code === props.modelValue) || getBonusCurrency(props.modelValue)).label
}`)
let previousOverflow = ''
let scrollLocked = false

const close = (): void => { isOpen.value = false }
const selectCurrency = (code: string): void => {
  emit('update:modelValue', code)
  close()
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (!isOpen.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    close()
    return
  }
  if (event.key !== 'Tab') return

  const buttons = Array.from(dialog.value?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') || [])
  const first = buttons[0]
  const last = buttons.at(-1)
  if (!first || !last) return
  if (event.shiftKey && (document.activeElement === first || !dialog.value?.contains(document.activeElement))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (document.activeElement === last || !dialog.value?.contains(document.activeElement))) {
    event.preventDefault()
    first.focus()
  }
}

const releaseModal = (): void => {
  document.removeEventListener('keydown', handleKeydown, true)
  if (scrollLocked) {
    document.body.style.overflow = previousOverflow
    scrollLocked = false
  }
}

watch(isOpen, async (open) => {
  if (!import.meta.client) return
  if (open) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    scrollLocked = true
    document.addEventListener('keydown', handleKeydown, true)
    await nextTick()
    if (!isOpen.value) return
    const selected = dialog.value?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
    selected?.focus({ preventScroll: true })
    selected?.scrollIntoView({ block: 'nearest' })
  } else {
    releaseModal()
    trigger.value?.focus({ preventScroll: true })
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) releaseModal()
})
</script>

<template>
  <button
    ref="trigger"
    class="bonus-currency-trigger"
    type="button"
    aria-haspopup="dialog"
    :aria-expanded="isOpen"
    :aria-label="triggerAriaLabel"
    @click="isOpen = true"
  >
    <img :src="triggerCurrency.icon" :alt="triggerCurrency.label" width="24" height="24">
  </button>

  <Teleport to="body">
    <div v-if="isOpen" class="bonus-currency-overlay" @click.self="close">
      <div
        ref="dialog"
        class="bonus-currency-dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <div class="bonus-currency-dialog__header">
          <h2 :id="titleId">{{ translate('Currency') }}</h2>
          <button class="bonus-currency-dialog__close" type="button" :aria-label="translate('Close currency selector')" @click="close">
            <X :size="18" aria-hidden="true" />
          </button>
        </div>
        <div class="bonus-currency-options" role="group" :aria-label="translate(optionsLabel)">
          <button
            v-for="currency in currencies"
            :key="currency.code"
            class="bonus-currency-option"
            type="button"
            :aria-pressed="modelValue === currency.code"
            @click="selectCurrency(currency.code)"
          >
            <img :src="currency.icon" :alt="translate(currency.label)" width="24" height="24">
            <span>{{ translate(currency.label) }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.bonus-currency-trigger {
  display: grid;
  width: 32px;
  height: 32px;
  padding: 4px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #303a36;
  cursor: pointer;
}

.bonus-currency-trigger img,
.bonus-currency-option img {
  display: block;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
}

.bonus-currency-trigger:focus-visible,
.bonus-currency-dialog__close:focus-visible {
  outline: 2px solid #22c66c;
  outline-offset: 3px;
}

.bonus-currency-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 12px;
  background: rgb(0 0 0 / 72%);
}

.bonus-currency-dialog {
  width: 375px;
  max-width: 100%;
  max-height: calc(100dvh - 40px);
  padding: 0 12px 20px;
  overflow: hidden;
  border-radius: 10px;
  background: #202020;
  color: #f5f5f5;
  font-family: 'Manrope', Arial, sans-serif;
}

.bonus-currency-dialog__header {
  position: relative;
  display: flex;
  height: 44px;
  align-items: center;
  justify-content: center;
}

.bonus-currency-dialog__header h2 {
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;
}

.bonus-currency-dialog__close {
  position: absolute;
  top: 9px;
  right: 0;
  display: grid;
  width: 28px;
  height: 28px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #aaa;
  background: transparent;
  cursor: pointer;
}

.bonus-currency-dialog__close:hover { color: #fff; }

.bonus-currency-options {
  max-height: min(680px, calc(100dvh - 104px));
  padding: 12px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-radius: 12px 0 0 12px;
  background: #333;
  scrollbar-color: #c5c5c5 #f5f5f5;
  scrollbar-width: auto;
}

.bonus-currency-options::-webkit-scrollbar { width: 15px; }
.bonus-currency-options::-webkit-scrollbar-track { background: #f5f5f5; }
.bonus-currency-options::-webkit-scrollbar-thumb {
  border: 3px solid #f5f5f5;
  border-radius: 10px;
  background: #c5c5c5;
}

.bonus-currency-option {
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  gap: 12px;
  padding: 10px 11px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: #f5f5f5;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
}

.bonus-currency-option:hover,
.bonus-currency-option:focus-visible {
  outline: none;
  background: #3e3e3e;
}

.bonus-currency-option[aria-pressed='true'] {
  border-color: #00a845;
  background: #2d4034;
  font-weight: 700;
}
</style>
