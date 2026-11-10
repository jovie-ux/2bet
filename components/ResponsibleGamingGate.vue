<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const SESSION_KEY = '2bet-responsible-gaming-accepted-v1'

const isReady = ref(false)
const isOpen = ref(false)
const ageConfirmed = ref(true)
const termsConfirmed = ref(true)
const ageCheckbox = ref<HTMLInputElement | null>(null)
const dialog = ref<HTMLElement | null>(null)

let previousBodyOverflow = ''
let hasLockedPageScroll = false

const canAccept = computed(() => ageConfirmed.value && termsConfirmed.value)

const restorePageScroll = (): void => {
  if (!import.meta.client || !hasLockedPageScroll) return
  document.body.style.overflow = previousBodyOverflow
  hasLockedPageScroll = false
}

const focusFirstConfirmation = async (): Promise<void> => {
  await nextTick()
  ageCheckbox.value?.focus({ preventScroll: true })
}

const accept = (): void => {
  if (!canAccept.value) return

  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // The gate still works when storage is unavailable; it will return on reload.
  }

  isOpen.value = false
  restorePageScroll()
}

const keepFocusInsideDialog = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    event.preventDefault()
    return
  }

  if (event.key !== 'Tab' || !dialog.value) return

  const focusable = Array.from(
    dialog.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(element => !element.hasAttribute('hidden'))

  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

onMounted(() => {
  let alreadyAccepted = false

  try {
    alreadyAccepted = window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    alreadyAccepted = false
  }

  isOpen.value = !alreadyAccepted
  isReady.value = true

  if (isOpen.value) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    hasLockedPageScroll = true
    void focusFirstConfirmation()
  }
})

onBeforeUnmount(restorePageScroll)
</script>

<template>
  <Teleport to="body">
    <Transition name="responsible-gaming-fade">
      <div
        v-if="isReady && isOpen"
        class="responsible-gaming-backdrop"
        role="presentation"
      >
        <section
          ref="dialog"
          class="responsible-gaming-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="responsible-gaming-title"
          aria-describedby="responsible-gaming-description"
          @keydown="keepFocusInsideDialog"
        >
          <div class="responsible-gaming-content">
            <div class="responsible-gaming-masthead">
              <header class="responsible-gaming-header">
                <img
                  src="/brand/2bet-logo.webp"
                  alt="2Bet"
                  class="responsible-gaming-logo"
                >
                <span class="responsible-gaming-divider" aria-hidden="true" />
                <div id="responsible-gaming-title" role="heading" aria-level="2">
                  By entering this website,<br>
                  I acknowledge and confirm:
                </div>
              </header>

              <p id="responsible-gaming-description" class="responsible-gaming-intro">
                Read our
                <NuxtLink class="text-[#4c9eea]" to="/responsible-gaming" target="_blank">
                  Responsible Gaming
                </NuxtLink>
                guidelines
              </p>
            </div>

            <div class="responsible-gaming-body">
              <div class="eligibility-panel">
              <label class="eligibility-row eligibility-row--interactive">
                <input
                  ref="ageCheckbox"
                  v-model="ageConfirmed"
                  type="checkbox"
                >
                <span
                  class="confirmation-check"
                  :class="{ 'confirmation-check--active': ageConfirmed }"
                  aria-hidden="true"
                >
                  <Check :size="8" :stroke-width="3" />
                </span>
                <span>I am over 21 years of age</span>
              </label>

              <div class="eligibility-row">
                <span class="confirmation-check confirmation-check--active" aria-hidden="true">
                  <Check :size="8" :stroke-width="3" />
                </span>
                <span>
                  I am not a government official, or employee connected directly with the
                  operation of the Government or any of its agencies, member of the Armed
                  Forces of the Philippines, including the Army, Navy, Air Force, or the
                  Philippine National Police.
                </span>
              </div>
              <div class="eligibility-row">
                <span class="confirmation-check confirmation-check--active" aria-hidden="true">
                  <Check :size="8" :stroke-width="3" />
                </span>
                <span>
                  I am not a Gaming Employment License (GEL) holder.
                </span>
              </div>
              <div class="eligibility-row">
                <span class="confirmation-check confirmation-check--active" aria-hidden="true">
                  <Check :size="8" :stroke-width="3" />
                </span>
                <span>
                  I am not included in the PAGCOR's National Database of Restricted Persons(NDRP).
                </span>
              </div>
              </div>

            <ul class="responsible-gaming-list">
              <li>
                Fund or credits in the account of any player who is found ineligible to play
                shall mean forfeiture of said fund/credits in favor of the Government.
              </li>
              <li>Keep online gaming private. Avoid playing online games in open and public spaces.</li>
            </ul>

            <div class="responsible-gaming-copy">
              <p>
                In line with PAGCOR’s Responsible Gaming (RG) Program and to further strengthen
                our commitment to promoting responsible gaming, we at 2Bet fully support
                PAGCOR’s RG initiatives.
              </p>
              <ul>
                <li>
                  To Self-Exclude (Self-Ban):
                  <a
                    href="https://osea.pagcor.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                  >https://osea.pagcor.ph</a>
                </li>
                <li>
                  To learn more about PAGCOR’s Responsible Gaming Program:
                  <a
                    href="https://www.pagcor.ph/regulatory/responsible-gaming.php"
                    target="_blank"
                    rel="noopener noreferrer"
                  >www.pagcor.ph/regulatory/responsible-gaming.php</a>
                </li>
              </ul>
              <p>
                We encourage all our players to game responsibly and make informed decisions
                while enjoying our platform.
              </p>
            </div>

            <label class="terms-confirmation">
              <input v-model="termsConfirmed" type="checkbox">
              <span
                class="confirmation-check"
                :class="{ 'confirmation-check--active': termsConfirmed }"
                aria-hidden="true"
              >
                <Check :size="8" :stroke-width="3" />
              </span>
              <span>
                I have read and agree to 2Bet’s
                <NuxtLink to="/terms-of-use" target="_blank">Terms of Use</NuxtLink>
              </span>
            </label>

            <button
              type="button"
              class="responsible-gaming-accept"
              :disabled="!canAccept"
              @click="accept"
            >
              Accept
            </button>

            <div class="responsible-gaming-badges">
              <span class="pagcor-badge">
                <img src="/responsible-gaming/pagcor.webp" alt="PAGCOR regulated">
              </span>
              <span class="age-restriction-badge">
                <img
                  src="/responsible-gaming/age-restriction.webp"
                  alt="21 plus. Gambling can be addictive. Know when to stop."
                >
              </span>
            </div>

            <div class="responsible-gaming-contacts">
              <a
                href="https://www.pagcor.ph/regulatory"
                target="_blank"
                rel="noopener noreferrer"
              >WWW.PAGCOR.PH/REGULATORY</a>
              <a href="mailto:keepitfun@pagcor.ph">KEEPITFUN@PAGCOR.PH</a>
            </div>

              <p class="responsible-gaming-warning">
                Gambling doesn’t guarantee earnings or financial improvement. Stay within your limits.
              </p>

              <img
                class="responsible-gaming-hotline"
                src="/responsible-gaming/support-hotline.webp"
                alt="Responsible gaming support hotline"
              >
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.responsible-gaming-backdrop {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  place-items: center;
  padding: 4px;
  background: rgb(0 0 0 / 78%);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.responsible-gaming-gate {
  width: min(376px, calc(100vw - 8px));
  max-height: calc(100dvh - 8px);
  overflow-x: hidden;
  overflow-y: auto;
  color: #f7f7f7;
  background: var(--main-color);
  border: 0;
  border-radius: 20px;
  box-shadow: 0 24px 80px rgb(0 0 0 / 70%);
  scrollbar-color: #2b745f #303131;
  scrollbar-width: thin;
  overscroll-behavior: contain;
}

.responsible-gaming-gate::-webkit-scrollbar {
  width: 5px;
}

.responsible-gaming-gate::-webkit-scrollbar-track {
  background: #303131;
}

.responsible-gaming-gate::-webkit-scrollbar-thumb {
  background: #2b745f;
  border-radius: 999px;
}

.responsible-gaming-content {
  padding: 0;
}

.responsible-gaming-masthead {
  padding: 12px 11px 10px;
}

.responsible-gaming-body {
  margin: 0 11px 11px;
  padding: 6px 0 14px;
  border-radius: 20px 20px 14px 14px;
  background: #111313;
}

.responsible-gaming-header {
  display: grid;
  grid-template-columns: 60px 2px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
}

.responsible-gaming-logo {
  width: 60px;
  height: auto;
}

.responsible-gaming-divider {
  width: 2px;
  height: 30px;
  background: rgb(255 255 255 / 38%);
}

.responsible-gaming-header h2,
.responsible-gaming-header #responsible-gaming-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.55;
}

.responsible-gaming-intro {
  margin: 12px 0 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.responsible-gaming-intro a,
.terms-confirmation a {
  color: #4c9eea;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.terms-confirmation a {
  color: var(--main-color);
}
.eligibility-panel {
  max-height: 145px;
  margin: 0 32px;
  padding: 13px 11px;
  overflow-y: auto;
  border-radius: 23px;
  background: #1d1f1f;
  scrollbar-color: #747474 transparent;
  scrollbar-width: thin;
}

.eligibility-panel::-webkit-scrollbar {
  width: 4px;
}

.eligibility-panel::-webkit-scrollbar-thumb {
  background: #747474;
  border-radius: 999px;
}

.eligibility-row,
.terms-confirmation {
  display: grid;
  grid-template-columns: 13px minmax(0, 1fr);
  align-items: start;
  gap: 8px;
  font-size: 11px;
  line-height: 1.52;
}

.eligibility-row + .eligibility-row {
  margin-top: 7px;
}

.eligibility-row--interactive,
.terms-confirmation {
  cursor: pointer;
}

.eligibility-row input,
.terms-confirmation input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.confirmation-check {
  display: grid;
  width: 12px;
  height: 12px;
  margin-top: 2px;
  place-items: center;
  flex: 0 0 auto;
  color: transparent;
  background: #3a4140;
  border-radius: 50%;
  transition: color 150ms ease, background 150ms ease, box-shadow 150ms ease;
}

.confirmation-check--active,
input:checked + .confirmation-check {
  color: #fff;
  background: var(--main-color);
}

input:focus-visible + .confirmation-check {
  box-shadow: none;
}

.responsible-gaming-list {
  margin: 10px 13px 9px;
  padding-left: 14px;
  color: #929594;
  font-size: 9.5px;
  line-height: 1.45;
  list-style: disc;
}

.responsible-gaming-copy {
  margin: 0 10px;
  font-size: 9.5px;
  font-weight: 650;
  line-height: 1.45;
}

.responsible-gaming-copy p {
  margin: 0 0 3px;
}

.responsible-gaming-copy ul {
  margin: 0 0 3px;
  padding-left: 13px;
  list-style: disc;
}

.responsible-gaming-copy a {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.terms-confirmation {
  width: max-content;
  max-width: calc(100% - 50px);
  margin: 12px auto;
  font-size: 10.5px;
  font-weight: 700;
}

.responsible-gaming-accept {
  display: block;
  width: min(280px, calc(100% - 30px));
  min-height: 53px;
  margin: 0 auto;
  border: 0;
  border-radius: 13px;
  color: #fff;
  background: var(--main-color);
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, opacity 150ms ease, transform 150ms ease;
}

.responsible-gaming-accept:hover:not(:disabled) {
  background: #152A22;
}

.responsible-gaming-accept:active:not(:disabled) {
  transform: translateY(1px);
}

.responsible-gaming-accept:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -5px;
}

.responsible-gaming-accept:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.responsible-gaming-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 28px;
}

.pagcor-badge,
.age-restriction-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fff;
}

.pagcor-badge {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.age-restriction-badge {
  width: 190px;
  height: 70px;
  border-radius: 13px;
}

.responsible-gaming-badges img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.responsible-gaming-contacts {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 26px 0 13px;
  color: #f23838;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.responsible-gaming-contacts a:hover {
  text-decoration: underline;
}

.responsible-gaming-warning {
  max-width: 320px;
  margin: 0 auto;
  color: #2755a1;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.45;
  text-align: center;
  text-transform: uppercase;
}

.responsible-gaming-hotline {
  display: block;
  width: 125px;
  height: auto;
  margin: 20px auto 0;
  border-radius: 4px;
  background: #ffffff;
}

.responsible-gaming-fade-enter-active,
.responsible-gaming-fade-leave-active {
  transition: opacity 160ms ease;
}

.responsible-gaming-fade-enter-from,
.responsible-gaming-fade-leave-to {
  opacity: 0;
}

@media (min-width: 640px) {
  .responsible-gaming-backdrop {
    padding: 12px;
  }

  .responsible-gaming-gate {
    max-height: calc(90dvh - 24px);
  }
}

@media (max-width: 360px) {
  .responsible-gaming-header {
    grid-template-columns: 56px 2px minmax(0, 1fr);
    gap: 7px;
  }

  .responsible-gaming-logo {
    width: 56px;
  }

  .eligibility-panel {
    margin-inline: 20px;
  }

  .responsible-gaming-accept {
    width: calc(100% - 36px);
  }

  .responsible-gaming-badges {
    gap: 10px;
  }

  .age-restriction-badge {
    width: 172px;
  }

  .responsible-gaming-contacts {
    gap: 8px;
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .responsible-gaming-fade-enter-active,
  .responsible-gaming-fade-leave-active {
    transition: none;
  }
}
</style>
