<script setup lang="ts">
import DepositReminderModal from '~/components/modals/DepositReminderModal.vue'

useAppSeo({
  title: 'Gestão de Saldo e Recompensas na Praça ao Vivo | 2bet',
  description: 'Gerencie seu saldo e resgate recompensas promocionais na 2bet Brasil. Acompanhe movimentações financeiras com segurança e rapidez.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Praça ao Vivo', path: '/live-plaza/home' },
    { name: 'Fundos', path: '/live-plaza/funds' },
  ],
})

const showModal = ref(true)
const router = useRouter()

const handleClose = () => {
  showModal.value = false
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/live-plaza/home')
  }
}
</script>

<template>
  <div>
    <ComingSoonFallback :disable-seo="true" />
    <DepositReminderModal v-if="showModal" @close="handleClose" />
  </div>
</template>
