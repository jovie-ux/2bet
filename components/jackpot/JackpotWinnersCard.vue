<script setup lang="ts">
import type { JackpotWinner } from '~/data/jackpot'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

defineProps<{
  winners: JackpotWinner[]
}>()

const { effectiveTheme } = useSiteTheme()
const { translate } = useSiteLocale()

const themedProviderLogo = (providerLogo: string): string => {
  return getProviderLogoForTheme(providerLogo, effectiveTheme.value)
}
</script>

<template>
  <section class="winners-card mb-8 rounded-md bg-[#171817] shadow-sm">
    <div class="flex items-center justify-between px-4 pt-2">
      <h3 class="text-[16px] font-bold text-white">{{ translate('Winners List') }}</h3>
    </div>

    <TransitionGroup name="winner-fade" tag="div" class="divide-y divide-white/5">
      <div
        v-for="winner in winners"
        :key="winner.id"
        class="winner-item flex items-center justify-between px-2 py-1.5 text-[12px] transition-colors"
      >
        <div class="flex items-center gap-3">
          <img
            :src="themedProviderLogo(winner.providerLogo)"
            :alt="`${winner.username} provider`"
            class="h-4 max-w-[36px] object-contain opacity-80"
            :class="{ 'brightness-125': effectiveTheme === 'dark' }"
          />
          <span class="font-mono text-white">{{ winner.username }}</span>
        </div>
        <span class="text-white">{{ winner.amount }}</span>
        <span class="font-mono text-[11px] text-[#626664]">{{ winner.date }}</span>
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.winner-item:nth-child(even) {
  background-color: #000;
}

.winner-fade-enter-active {
  transition: all 400ms ease-out;
}

.winner-fade-leave-active {
  display: none;
  transition: all 300ms ease-in;
}

.winner-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.winner-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
