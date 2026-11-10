<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Reminder',
  message: 'Deposit is coming soon\nStay tuned!',
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'ok'): void
}>()

const { translate } = useSiteLocale()
const dialog = ref<HTMLDialogElement | null>(null)
let previousOverflow = ''

const handleOk = (): void => {
  emit('ok')
  emit('close')
}

const handleBackdropClick = (event: MouseEvent): void => {
  if (event.target === dialog.value) {
    emit('close')
  }
}

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  dialog.value?.showModal()
})

onBeforeUnmount(() => {
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="reminder-modal mobile-modal-slide-up prompt-sheet"
      aria-labelledby="reminder-title"
      aria-describedby="reminder-description"
      @cancel.prevent="emit('close')"
      @click="handleBackdropClick"
    >
      <div class="reminder-content">
        <div class="reminder-symbol" aria-hidden="true">!</div>
        <div id="reminder-title" class="reminder-title" role="heading" aria-level="2">{{ translate(title) }}</div>
        <p id="reminder-description">
          <template v-if="message.includes('\n')">
            <span v-for="(line, idx) in message.split('\n')" :key="idx" class="block">
              {{ translate(line) }}
            </span>
          </template>
          <template v-else>
            {{ translate(message) }}
          </template>
        </p>
        <button type="button" autofocus @click="handleOk">{{ translate('OK') }}</button>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.reminder-modal {
  position: fixed;
  inset: 0;
  width: min(375px, calc(100vw - 24px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  overflow-y: auto;
  border: 0;
  border-radius: 11px;
  color: #fff;
  background: #1e1e1e;
  text-align: center;
  box-shadow: 0 16px 48px rgb(0 0 0 / 30%);
}

.reminder-modal::backdrop {
  background: rgb(0 0 0 / 70%);
}

.reminder-content {
  padding: 22px 12px 20px;
}

.reminder-symbol {
  display: grid;
  width: 44px;
  height: 44px;
  margin: 0 auto 12px;
  place-items: center;
  border-radius: 50%;
  background: var(--main-highlight);
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
}

.reminder-title,
h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
}

p {
  max-width: 235px;
  margin: 6px auto 16px;
  font-size: 14px;
  line-height: 20px;
  color: #e5e7eb;
}

.block {
  display: block;
}

button {
  width: 100%;
  min-height: 54px;
  padding: 12px;
  border: 0;
  border-radius: 13px;
  color: #fff;
  background: var(--main-highlight);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms ease;
}

button:hover {
  background: #087957;
}

button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -5px;
}
</style>

