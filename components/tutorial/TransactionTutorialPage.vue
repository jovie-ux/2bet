<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'
import TransactionTutorialVisual from '~/components/tutorial/TransactionTutorialVisual.vue'

type TransactionTutorialMode = 'deposit' | 'withdraw'
type TransactionVisualVariant =
  | 'deposit-method'
  | 'deposit-amount'
  | 'deposit-transfer'
  | 'deposit-proof'
  | 'deposit-verification'
  | 'withdraw-schedule'
  | 'withdraw-identity'
  | 'withdraw-review'
  | 'withdraw-balance'
  | 'withdraw-complete'

interface TutorialStep {
  title: string
  description: string
  visual: TransactionVisualVariant
  imageDark?: string
  imageLight?: string
}

const props = defineProps<{
  mode: TransactionTutorialMode
}>()

const depositSteps: TutorialStep[] = [
  {
    title: 'Deposit Method',
    description: 'Select "Bank Direct Scan"',
    visual: 'deposit-method',
    imageDark: '/tutorial/transactions/visual-dark.webp',
    imageLight: '/tutorial/transactions/visual-light.webp',
  },
  {
    title: 'Deposit Amount',
    description: 'Select a range and amount for quicker processing',
    visual: 'deposit-amount',
    imageDark: '/tutorial/transactions/deposit 2 dark.webp',
    imageLight: '/tutorial/transactions/deposit 2.webp',
  },
  {
    title: 'Timely Transfer',
    description: 'Complete transfer on time to avoid account update delays',
    visual: 'deposit-transfer',
    imageDark: '/tutorial/transactions/deposit 3 dark.webp',
    imageLight: '/tutorial/transactions/deposit 3.webp',
  },
  {
    title: 'Upload Proof',
    description: 'Take photo of proof and upload it. Contact 24/7 support if you encounter issues',
    visual: 'deposit-proof',
    imageDark: '/tutorial/transactions/deposit 4 dark.webp',
    imageLight: '/tutorial/transactions/deposit 4.webp',
  },
  {
    title: 'Wait for Verification',
    description: 'After uploading proof, wait for platform to verify and update balance automatically',
    visual: 'deposit-verification',
    imageDark: '/tutorial/transactions/deposit 5 dark.webp',
    imageLight: '/tutorial/transactions/deposit 5.webp',
  },
]

const withdrawalSteps: TutorialStep[] = [
  {
    title: 'Schedule Withdrawal',
    description: 'Withdrawals need to be scheduled to comply with regulations',
    visual: 'withdraw-schedule',
    imageDark: '/tutorial/transactions/withdraw 1 dark.webp',
    imageLight: '/tutorial/transactions/withdraw 1.webp',
  },
  {
    title: 'Identity Verification',
    description: 'Select and complete security verification',
    visual: 'withdraw-identity',
    imageDark: '/tutorial/transactions/withdraw 2 dark.webp',
    imageLight: '/tutorial/transactions/withdraw 2.webp',
  },
  {
    title: 'Withdrawal Review',
    description: 'After submission, please wait for platform to process request',
    visual: 'withdraw-review',
    imageDark: '/tutorial/transactions/withdraw 3 dark.webp',
    imageLight: '/tutorial/transactions/withdraw 3.webp',
  },
  {
    title: 'Check Account Balance',
    description: 'Confirm funds immediately upon notification. Click "Received" on withdrawal page if funds have arrived',
    visual: 'withdraw-balance',
    imageDark: '/tutorial/transactions/withdraw 4 dark.webp',
    imageLight: '/tutorial/transactions/withdraw 4.webp',
  },
  {
    title: 'Complete Withdrawal',
    description: 'Finalize withdrawal to receive bonus based on remaining time',
    visual: 'withdraw-complete',
    imageDark: '/tutorial/transactions/withdraw 5 dark.webp',
    imageLight: '/tutorial/transactions/withdraw 5.webp',
  },
]

const steps = computed(() => (props.mode === 'deposit' ? depositSteps : withdrawalSteps))
</script>

<template>
  <section class="transaction-tutorial" :class="`transaction-tutorial--${mode}`">
    <SubpageHeader mobile-tabs back-to="/explore/account/me" class="mb-2 sm:mb-3">
      <template #center>
        <div class="transaction-pill-group" role="tablist">
          <NuxtLink
            to="/tutorial/transactions/deposit"
            class="transaction-pill"
            :class="{ 'transaction-pill--active': mode === 'deposit' }"
            role="tab"
            :aria-selected="mode === 'deposit'"
          >
            Deposit
          </NuxtLink>
          <NuxtLink
            to="/tutorial/transactions/withdraw"
            class="transaction-pill"
            :class="{ 'transaction-pill--active': mode === 'withdraw' }"
            role="tab"
            :aria-selected="mode === 'withdraw'"
          >
            Withdrawal
          </NuxtLink>
        </div>
      </template>
    </SubpageHeader>

    <div class="transaction-board-wrapper px-2.5 sm:px-0">
      <div class="transaction-board">
        <article
          v-for="(step, index) in steps"
          :key="step.title"
          class="transaction-step"
        >
          <div class="transaction-copy">
            <component :is="index === 0 ? 'h2' : 'h2'">{{ step.title }}</component>
            <p>{{ step.description }}</p>
          </div>
          <TransactionTutorialVisual
            :variant="step.visual"
            :image-dark="step.imageDark"
            :image-light="step.imageLight"
            :alt="step.title"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 63.99rem) {
  .transaction-tutorial {
    background: linear-gradient(var(--main-color) 0 74px, transparent 74px);
  }
  .transaction-board-wrapper { padding-right: 8px; padding-left: 8px; }
  .transaction-board-wrapper .transaction-board { margin-top: 0; }
}

.transaction-tutorial {
  width: min(100%, 1170px);
  margin: 0 auto 28px;
  color: #f4f4f4;
}

.transaction-pill-group {
  display: inline-flex;
  align-items: center;
  background-color: #0a402d;
  border-radius: 9999px;
  padding: 2.5px;
  gap: 2px;
}

.transaction-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  transition: all 150ms ease;
  text-decoration: none;
  line-height: 1.2;
}

.transaction-pill:hover {
  color: #ffffff;
}

.transaction-pill--active {
  background-color: #ffffff;
  color: var(--main-color);
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

@media (min-width: 64rem) {
  .transaction-pill-group {
    padding: 0;
    border-radius: 0;
    background: transparent;
    gap: 8px;
  }

  .transaction-pill {
    min-width: 118px;
    height: 32px;
    padding: 0 22px;
    border-radius: 7px;
    color: #f4f4f4;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    background: #6b6c6b;
    box-shadow: none;
  }

  .transaction-pill:hover {
    color: #ffffff;
    background: #7a7b7a;
  }

  .transaction-pill--active,
  .transaction-pill--active:hover {
    color: #ffffff;
    background: #007653;
  }
}

.transaction-board {
  margin-top: 8px;
  overflow: hidden;
  border-radius: 11px;
  background: #141414;
}

.transaction-step {
  display: grid;
  min-height: 226px;
  grid-template-columns: minmax(0, 1fr) minmax(390px, 1fr);
  align-items: center;
  padding: 24px 54px;
  border-bottom: 1px solid #494949;
}

.transaction-step:last-child {
  border-bottom: 0;
}

.transaction-copy {
  width: min(100%, 390px);
  justify-self: center;
  padding: 0 22px;
  text-align: center;
}

.transaction-copy h1,
.transaction-copy h2 {
  margin: 0 0 3px;
  color: #f5f5f5;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.015em;
  line-height: 1.25;
}

.transaction-copy p {
  max-width: 330px;
  margin: 0 auto;
  color: #969696;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
}

@media (max-width: 75rem) {
  .transaction-step {
    padding-inline: 28px;
  }
}

@media (max-width: 50rem) {
  .transaction-tutorial {
    margin-top: 0;
  }

  .transaction-step {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 16px;
    text-align: center;
  }

  .transaction-copy {
    width: 100%;
    padding: 0;
  }
}
</style>
