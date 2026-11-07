<script setup lang="ts">
import { homepageChannels } from '~/data/homepage'

const { translate } = useSiteLocale()
const route = useRoute()

const isChannelActive = (channelTo: string, channelLabel: string): boolean => {
  if (route.path === channelTo) {
    return true
  }

  return channelLabel === 'Slots' && route.path === '/'
}
</script>

<template>
  <nav class="channel-tabs" :aria-label="translate('Browse categories')">
    <NuxtLink
      v-for="channel in homepageChannels"
      :key="channel.label"
      :to="channel.to"
      class="channel-tab"
      :class="{ 'channel-tab--active': isChannelActive(channel.to, channel.label) }"
    >
      <span class="channel-tab-icon-wrap">
        <img
          :src="channel.iconImage"
          :alt="channel.label"
          width="28"
          height="28"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        >
      </span>
      <span class="channel-tab-label">{{ translate(channel.label) }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.channel-tabs {
  display: none;
}

@media (max-width: 63.99rem) {
  .channel-tabs {
    display: flex;
    margin: 0.38rem 0 0;
    gap: 0.28rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .channel-tabs::-webkit-scrollbar {
    display: none;
  }

  .channel-tab {
    display: flex;
    min-width: 3.4rem;
    min-height: 3rem;
    flex: 1 0 3.4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.28rem 0.18rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.4rem;
    color: #b8c5be;
    font-size: 0.4rem;
    font-weight: 600;
    line-height: 1.15;
    text-align: center;
    text-decoration: none;
    background: linear-gradient(180deg, rgba(17, 27, 23, 0.96), rgba(8, 16, 13, 0.96));
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.04);
    gap: 0.22rem;
  }

  .channel-tab-icon-wrap {
    display: grid;
    width: 1.45rem;
    height: 1.45rem;
    place-items: center;
  }

  .channel-tab-icon-wrap img {
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    object-fit: contain;
  }

  .channel-tab--active {
    border-color: rgba(50, 212, 154, 0.65);
    color: #ffffff;
    background: linear-gradient(145deg, rgba(9, 130, 88, 0.7), rgba(3, 66, 46, 0.86));
    box-shadow:
      inset 0 1px rgba(255, 255, 255, 0.12),
      0 0 0.35rem rgba(50, 212, 154, 0.22);
  }
}
</style>
