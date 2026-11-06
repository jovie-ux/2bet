<script setup lang="ts">
import DepositReminderModal from '~/components/modals/DepositReminderModal.vue'

useAppSeo({
  title: 'Live Plaza Funds & Reward Management | 2Bet Platform',
  description: 'Manage your Live Plaza streamer tips, gift balances, and reward distributions on 2Bet. Secure wallet operations for community streaming interactions.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Live Plaza', path: '/explore/live-plaza/home' },
    { name: 'Funds', path: '/explore/live-plaza/funds' },
  ],
})

const showModal = ref(true)
const router = useRouter()

const handleClose = () => {
  showModal.value = false
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/explore/live-plaza/home')
  }
}
</script>

<template>
  <div>
    <ComingSoonFallback :disable-seo="true" />
    <DepositReminderModal v-if="showModal" @close="handleClose" />
  </div>
</template>
