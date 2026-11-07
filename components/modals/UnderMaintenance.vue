<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Under maintenance',
  message: 'This game is undergoing maintenance, sorry for the inconvenience caused.',
})

const emit = defineEmits<{ close: [] }>()
const { translate } = useSiteLocale()
const dialog = ref<HTMLDialogElement | null>(null)
let previousOverflow = ''

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
      class="maintenance-modal mobile-modal-slide-up prompt-sheet"
      aria-labelledby="maintenance-title"
      aria-describedby="maintenance-description"
      @cancel.prevent="emit('close')"
      @click="handleBackdropClick"
    >
      <div class="maintenance-content">
        <div class="maintenance-symbol" aria-hidden="true">!</div>
        <h2 id="maintenance-title">{{ translate(title) }}</h2>
        <p id="maintenance-description">
          {{ translate(message) }}
        </p>
        <button type="button" autofocus @click="emit('close')">{{ translate('OK') }}</button>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.maintenance-modal {
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

.maintenance-modal::backdrop {
  background: rgb(0 0 0 / 70%);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.maintenance-content {
  padding: 22px 16px 20px;
}

.maintenance-symbol {
  display: grid;
  width: 44px;
  height: 44px;
  margin: 0 auto 12px;
  place-items: center;
  border-radius: 50%;
  background: #00875e;
  color: #fff;
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}

h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  color: #fff;
}

p {
  max-width: 290px;
  margin: 8px auto 20px;
  font-size: 14px;
  line-height: 19px;
  color: #e5e7eb;
}

button {
  width: 100%;
  min-height: 50px;
  padding: 12px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  background: #00875e;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 150ms ease;
}

button:hover {
  background: #047954;
}

button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -3px;
}
</style>
