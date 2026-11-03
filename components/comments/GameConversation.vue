<script setup lang="ts">
import { SLOTS_COMMENTS } from '~/data/comments'

const messages = SLOTS_COMMENTS

const isImageUrl = (avatar?: string): boolean => {
  if (!avatar) return false
  return avatar.startsWith('/') || avatar.startsWith('http') || /\.(png|jpe?g|webp|svg|gif)$/i.test(avatar)
}

const getLevelBadge = (level?: string, vip?: number): { src: string; alt: string } => {
  if (vip === 0 || level === 'K0' || level === 'VIP 0' || level === 'VIP0') {
    return { src: '/images/vip/vip-0.webp', alt: 'VIP 0' }
  }
  if (vip === 2 || level === 'K2' || level === 'VIP 2' || level === 'VIP2') {
    return { src: '/images/vip/vip-2.webp', alt: 'VIP 2' }
  }
  if (vip === 1 || level === 'K1' || level === 'VIP 1' || level === 'VIP1') {
    return { src: '/images/vip/vip-1.webp', alt: 'VIP 1' }
  }
  if (level?.includes('0')) {
    return { src: '/images/vip/vip-0.webp', alt: 'VIP 0' }
  }
  if (level?.includes('2')) {
    return { src: '/images/vip/vip-2.webp', alt: 'VIP 2' }
  }
  return { src: '/images/vip/vip-1.webp', alt: 'VIP 1' }
}
</script>

<template>
  <div class="space-y-4 p-3">
    <article
      v-for="(message, index) in messages"
      :key="message.id || index"
      class="flex items-start gap-2.5"
    >
      <!-- Avatar -->
      <div
        class="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full text-[15px] font-bold text-white shadow-sm"
        :style="{ backgroundColor: (message.avatarType === 'image' || isImageUrl(message.avatar)) ? 'transparent' : (message.avatarBg || 'var(--main-highlight)') }"
        aria-hidden="true"
      >
        <img
          v-if="message.avatarType === 'image' || isImageUrl(message.avatar)"
          :src="message.avatar"
          :alt="message.name"
          class="h-full w-full object-cover"
          width="20"
          height="20"
        />
        <template v-else>
          {{ message.avatar }}
        </template>
      </div>

      <!-- Content -->
      <div class="min-w-0 flex-1">
        <!-- Header: Level Badge + Name -->
        <div class="mb-1 flex items-center gap-1 text-[12px]">
          <img
            :src="getLevelBadge(message.level, message.vip).src"
            :alt="getLevelBadge(message.level, message.vip).alt"
            class="h-2 w-auto shrink-0 object-contain"
            width="29"
            height="16"
          />
          <span class="truncate font-semibold text-[#34d399] text-[12px]">{{ message.name }}</span>
        </div>

        <!-- Message Bubble -->
        <p class="w-fit max-w-[95%] break-words rounded-[16px] bg-[#242523] px-1 py-1 text-[13px] leading-relaxed text-[#f0f2f1]">
          {{ message.text }}
        </p>

        <!-- Reaction -->
        <div
          v-if="message.reaction"
          class="inline-flex items-center gap-1 rounded-full bg-[#1e201f] px-1 py-0.5 text-[11px] text-white shadow-sm"
        >
          <span>{{ message.reaction }}</span>
        </div>
      </div>
    </article>
  </div>
</template>
