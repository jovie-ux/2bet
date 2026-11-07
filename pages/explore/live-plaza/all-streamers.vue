<script setup lang="ts">
useAppSeo({
  title: 'Canais Esportivos ao Vivo e Criadores de Conteúdo | 2bet',
  description: 'Descubra todos os streamers esportivos da Praça ao Vivo na 2bet Brasil. Transmissões de jogos, debates de partidas e análises táticas.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Praça ao Vivo', path: '/explore/live-plaza/home' },
    { name: 'Streamers', path: '/explore/live-plaza/streamer/all' },
  ],
})

await navigateTo('/explore/live-plaza/streamer/all', { replace: true })
</script>

<template>
  <div />
</template>

