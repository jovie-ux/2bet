<script setup lang="ts">
import TransactionTutorialPage from '~/components/tutorial/TransactionTutorialPage.vue'

useAppSeo({
  title: 'Como Fazer Depósito na Conta — Passo a Passo Simples | 2bet',
  description: 'Guia prático de depósito na 2bet Brasil. Siga etapas simples para adicionar saldo instantaneamente via PIX com total segurança digital.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Tutoriais', path: '/tutorial' },
    { name: 'Tutorial de Depósito', path: '/tutorial/transactions/deposit' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Como Fazer Depósito na Plataforma 2bet',
    description: 'Guia prático de depósito na 2bet Brasil. Siga etapas simples para adicionar saldo instantaneamente via PIX com total segurança digital.',
  },
})
</script>

<template>
  <h1 class="hidden">Como Depositar na Plataforma 2bet — Passo a Passo</h1>
  <TransactionTutorialPage mode="deposit" />
</template>
