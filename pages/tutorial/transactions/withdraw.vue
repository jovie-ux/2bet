<script setup lang="ts">
import TransactionTutorialPage from '~/components/tutorial/TransactionTutorialPage.vue'

useAppSeo({
  title: 'Como Sacar Ganhos na Conta — Guia de Saque Rápido | 2bet',
  description: 'Aprenda a retirar seus lucros na 2bet Brasil passo a passo. Solicite retiradas com agilidade via PIX diretamente para sua conta bancária.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Tutoriais', path: '/tutorial' },
    { name: 'Tutorial de Saque', path: '/tutorial/transactions/withdraw' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Sacar Ganhos na Plataforma 2bet',
    description: 'Aprenda a retirar seus lucros na 2bet Brasil passo a passo. Solicite retiradas com agilidade via PIX diretamente para sua conta bancária.',
  },
})
</script>

<template>
  <h1 class="hidden">Como Sacar na Plataforma 2bet — Guia de Saque Rápido</h1>
  <TransactionTutorialPage mode="withdraw" />
</template>
