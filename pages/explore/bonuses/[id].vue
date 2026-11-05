<script setup lang="ts">
definePageMeta({
  middleware: to => navigateTo({
    path: to.params.id === 'payments' ? '/explore/bonuses' : `/explore/bonus/${to.params.id}`,
    query: to.query,
    hash: to.hash,
  }, { redirectCode: 301, replace: true }),
})
</script>

<template>
  <div />
</template>

<style scoped>
/* scoped */
</style>
