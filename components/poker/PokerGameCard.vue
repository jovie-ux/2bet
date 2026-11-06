<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { POKER_PROVIDERS, type PokerGame } from '~/data/poker'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

const props = defineProps<{ game: PokerGame }>()
const emit = defineEmits<{ select: [game: PokerGame] }>()
const { effectiveTheme } = useSiteTheme()
const failedImage = ref(false)
const provider = computed(() => POKER_PROVIDERS.find(item => item.key.toLowerCase() === props.game.provider.toLowerCase()))
const providerLogo = computed(() => getProviderLogoForTheme(props.game.providerLogo || provider.value?.logo || '', effectiveTheme.value))
const fallbackCategory = computed(() => {
  const cat = props.game.category
  if (Array.isArray(cat)) return cat[0] || 'other'
  return cat || 'other'
})
const image = computed(() => failedImage.value || !props.game.image
  ? `/images/poker/placeholders/${fallbackCategory.value}.svg`
  : props.game.image)

watch(() => props.game.image, () => { failedImage.value = false })
</script>

<template>
  <button
    type="button"
    class="poker-game-card"
    :aria-label="`Play ${game.title} by ${provider?.label || game.provider}`"
    @click="emit('select', game)"
  >
    <span class="poker-game-artwork">
      <img :src="image" alt="" loading="lazy" decoding="async" @error="failedImage = true" />
    </span>
    <span class="poker-game-title" :title="game.title">{{ game.title }}</span>
    <img v-if="providerLogo" :src="providerLogo" :alt="provider?.label || game.provider" class="poker-game-provider-logo" />
    <span v-else class="poker-game-provider">{{ provider?.label || game.provider }}</span>
  </button>
</template>

<style scoped>
.poker-game-card {
  display: flex;
  min-width: 0;
  min-height: 178px;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px 17px;
  border: 1px solid var(--border);
  border-radius: 16px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 96%, var(--text) 4%);
  cursor: pointer;
  scroll-snap-align: start;
  transition: border-color 150ms ease, background-color 150ms ease, transform 150ms ease;
}


.poker-game-card:focus-visible {
  outline: 2px solid var(--main-color);
  outline-offset: -2px;
}

.poker-game-artwork {
  display: block;
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  margin-bottom: 14px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 20%);
}

.poker-game-artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poker-game-title {
  display: block;
  max-width: 100%;
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.poker-game-provider,
.poker-game-provider-logo {
  height: 17px;
  margin-top: 6px;
}

.poker-game-provider {
  color: var(--secondary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 17px;
}

.poker-game-provider-logo {
  width: auto;
  max-width: 55px;
  object-fit: contain;
  opacity: 0.65;
}

@media (max-width: 639px) {
  .poker-game-card {
    min-height: 148px;
    padding: 15px 7px 12px;
    border-radius: 12px;
  }

  .poker-game-artwork {
    width: 64px;
    height: 64px;
    margin-bottom: 10px;
    border-radius: 12px;
  }

  .poker-game-title { font-size: 11px; }
}
</style>
