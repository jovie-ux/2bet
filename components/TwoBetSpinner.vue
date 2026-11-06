<script setup lang="ts">
import ByBetSpinner from '~/components/ByBetSpinner.vue'

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

withDefaults(
  defineProps<{
    size?: SpinnerSize
    speed?: number
    label?: string
    fullscreen?: boolean
    overlay?: boolean
    theme?: 'auto' | 'dark' | 'light'
    customClass?: string
  }>(),
  {
    size: 'md',
    speed: 1.1,
    label: '',
    fullscreen: false,
    overlay: false,
    theme: 'auto',
    customClass: '',
  }
)
</script>

<template>
  <ByBetSpinner
    :size="size"
    :speed="speed"
    :label="label"
    :fullscreen="fullscreen"
    :overlay="overlay"
    :theme="theme"
    :custom-class="customClass"
  />
</template>

