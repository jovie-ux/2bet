<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

if (props.error?.statusCode === 404) {
  await navigateTo('/', { redirectCode: 302, replace: true })
}

onMounted(() => {
  if (props.error?.statusCode === 404) {
    clearError({ redirect: '/' })
  }
})
</script>

<template>
  <div />
</template>

