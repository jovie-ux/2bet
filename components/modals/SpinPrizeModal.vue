<script setup lang="ts">
import { Sparkles, Trophy, X } from 'lucide-vue-next'
import { useId } from 'vue'

interface Prize {
  name: string
  image: string
  accent: string
  value: number
  details?: string
}
const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl

const props = defineProps<{ prize: Prize }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const dialog = ref<HTMLDialogElement | null>(null)
const modalId = useId()
const titleId = `${modalId}-title`
const descriptionId = `${modalId}-description`
const formattedValue = computed(() => new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
}).format(props.prize.value))
let previousOverflow = ''

const close = (): void => emit('close')

const handleBackdropClick = (event: MouseEvent): void => {
  if (event.target === dialog.value) close()
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
      class="spin-prize-modal"
      :style="{ '--prize-accent': prize.accent }"
      :aria-labelledby="titleId"
      :aria-describedby="descriptionId"
      @cancel.prevent="close"
      @click="handleBackdropClick"
    >
      <div class="prize-modal-content">
        <div class="prize-confetti" aria-hidden="true">
          <span v-for="piece in 7" :key="piece" :style="{ '--piece': piece }" />
        </div>

        <button class="prize-modal-close" type="button" aria-label="Close prize result" @click="close">
          <X :size="20" aria-hidden="true" />
        </button>

        <span class="prize-modal-eyebrow"><Trophy :size="15" aria-hidden="true" /> Spin result</span>
        <h2 :id="titleId">You won!</h2>

        <div class="prize-modal-image">
          <Sparkles class="prize-sparkle prize-sparkle--left" :size="25" aria-hidden="true" />
          <img :src="prize.image" :alt="prize.name">
          <Sparkles class="prize-sparkle prize-sparkle--right" :size="18" aria-hidden="true" />
        </div>

        <h3>{{ prize.name }}</h3>
        <p v-if="prize.details" class="prize-modal-details">{{ prize.details }}</p>

        <div class="prize-modal-value">
          <span>Estimated retail value</span>
          <strong>{{ formattedValue }}</strong>
        </div>

        <p :id="descriptionId" class="prize-modal-note">Prize preview — no reward has been credited.</p>
        <NuxtLink :to="externalSiteUrl">
          <button class="prize-modal-done" type="button" autofocus>Spin For Real</button>
        </NuxtLink>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.spin-prize-modal {
  position: fixed;
  inset: 0;
  width: min(460px, calc(100vw - 28px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid rgba(198, 255, 230, 0.4);
  border-radius: 28px;
  color: #fff;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(177, 255, 219, 0.18), transparent 62%),
    linear-gradient(145deg, rgba(20, 69, 50, 0.88), rgba(2, 22, 15, 0.94));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.22), 0 24px 100px rgba(0, 0, 0, 0.55), 0 0 50px rgba(29, 219, 144, 0.12);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  backdrop-filter: blur(24px) saturate(145%);
  text-align: center;
}

.spin-prize-modal[open] { animation: prize-modal-appear 260ms ease-out; }

.spin-prize-modal::backdrop {
  background: rgba(0, 9, 6, 0.72);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.prize-modal-content {
  position: relative;
  overflow: hidden;
  padding: 30px;
}

.prize-modal-close {
  display: grid;
  position: absolute;
  z-index: 2;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgba(216, 255, 237, 0.2);
  border-radius: 50%;
  color: #d4f5e5;
  background: rgba(255, 255, 255, 0.07);
  cursor: pointer;
}

.prize-modal-eyebrow {
  display: inline-flex;
  position: relative;
  align-items: center;
  gap: 7px;
  margin: 4px 0 8px;
  color: #6af4bb;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h2 {
  position: relative;
  margin: 0;
  font-size: clamp(30px, 6vw, 40px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.prize-modal-image {
  display: grid;
  position: relative;
  height: 210px;
  margin: 14px 0;
  place-items: center;
  background: radial-gradient(ellipse, color-mix(in srgb, var(--prize-accent) 22%, transparent), transparent 66%);
}

.prize-modal-image img {
  position: relative;
  max-width: 84%;
  width: 210px;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 12px 15px rgba(0, 0, 0, 0.4));
}

.prize-sparkle { position: absolute; color: #ffdf83; }
.prize-sparkle--left { left: 10%; top: 25%; transform: rotate(-15deg); }
.prize-sparkle--right { right: 12%; bottom: 20%; }

h3 {
  position: relative;
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.3;
}

.prize-modal-details {
  position: relative;
  margin: 7px 0 0;
  color: #c3dbcf;
  font-size: 12px;
  line-height: 1.5;
}

.prize-modal-value {
  display: grid;
  position: relative;
  margin-top: 20px;
  padding: 14px;
  gap: 5px;
  border: 1px solid rgba(255, 225, 141, 0.22);
  border-radius: 16px;
  background: linear-gradient(125deg, rgba(255, 238, 179, 0.08), rgba(205, 255, 232, 0.03));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1);
}

.prize-modal-value span {
  color: #cfe3d8;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.prize-modal-value strong { color: #ffe39a; font-size: 30px; font-weight: 900; line-height: 1.2; }

.prize-modal-note {
  position: relative;
  margin: 16px 0;
  color: #bbd0c6;
  font-size: 12px;
  line-height: 1.5;
}

.prize-modal-done {
  position: relative;
  width: 100%;
  min-height: 48px;
  padding: 12px 18px;
  border: 1px solid rgba(157, 255, 214, 0.65);
  border-radius: 14px;
  color: #fff;
  background: linear-gradient(150deg, rgba(20, 205, 137, 0.9), rgba(5, 121, 81, 0.8));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.25), 0 5px 22px rgba(1, 220, 142, 0.13);
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

.prize-modal-done:hover { background: linear-gradient(150deg, rgba(32, 223, 153, 0.95), rgba(9, 143, 96, 0.9)); }
.prize-modal-close:hover { color: #fff; background: rgba(255, 255, 255, 0.13); }
button:focus-visible { outline: 2px solid #d8ffed; outline-offset: 3px; }

.prize-confetti { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.prize-confetti span {
  position: absolute;
  top: -12px;
  left: calc(4% + var(--piece) * 12%);
  width: 5px;
  height: 10px;
  border-radius: 2px;
  opacity: 0;
  background: #ffe39a;
  animation: prize-confetti-fall 2.6s ease-out forwards;
  animation-delay: calc(var(--piece) * 70ms);
}
.prize-confetti span:nth-child(even) { background: #6af4bb; width: 4px; height: 7px; }

@keyframes prize-modal-appear {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes prize-confetti-fall {
  0% { opacity: 0; transform: translateY(0) rotate(0); }
  12% { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(280px) rotate(220deg); }
}

@media (max-width: 30rem) {
  .prize-modal-content { padding: 28px 20px 20px; }
  .prize-modal-image { height: 180px; margin-block: 12px; }
  h3 { font-size: 19px; }
}

@media (prefers-reduced-motion: reduce) {
  .spin-prize-modal[open], .prize-confetti span { animation: none; }
  .prize-confetti { display: none; }
}
</style>
