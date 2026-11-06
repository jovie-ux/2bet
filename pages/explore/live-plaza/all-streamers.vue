<script setup lang="ts">
useAppSeo({
  title: 'All Sports & Casino Streamers — Live Plaza | 2Bet',
  description: 'Browse and follow top sports streamers, live casino hosts, and gaming commentators on 2Bet Live Plaza. Join interactive broadcasts with live chat.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Live Plaza', path: '/explore/live-plaza/home' },
    { name: 'Streamers', path: '/explore/live-plaza/streamer/all' },
  ],
})

await navigateTo('/explore/live-plaza/streamer/all', { replace: true })
</script>

<template>
  <div />
</template>

