<script setup lang="ts">
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import { providerLogoByName } from '~/data/homepage'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

defineProps<{
  providers: string[]
}>()

const { translate } = useSiteLocale()
const { effectiveTheme } = useSiteTheme()
const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = useRuntimeConfig().public
const externalSiteUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`

const providerLogo = (provider: string): string => {
  return getProviderLogoForTheme(providerLogoByName[provider], effectiveTheme.value)
}
</script>

<template>
  <section class="provider-section" aria-labelledby="featured-providers-title">
    <header>
      <div><Sparkles :size="16" fill="currentColor" aria-hidden="true" /><h2 id="featured-providers-title">{{ translate('Featured Providers') }}</h2></div>
      <a :href="externalSiteUrl" target="_blank" rel="nofollow noopener noreferrer">{{ translate('View All') }} <ArrowRight :size="9" /></a>
    </header>
    <div class="provider-grid">
      <a
        v-for="provider in providers"
        :key="provider"
        :href="externalSiteUrl"
        target="_blank"
        rel="nofollow noopener noreferrer"
        :aria-label="provider"
      >
        <img
          v-if="providerLogo(provider)"
          :src="providerLogo(provider)"
          :alt="`${provider} logo`"
          width="120"
          height="44"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        >
        <strong v-else aria-hidden="true">{{ provider }}</strong>
      </a>
    </div>
  </section>
</template>

<style scoped>
.provider-section {
  margin-top: 0.38rem;
}

.provider-section header {
  display: flex;
  min-height: 1.35rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.18rem;
}

.provider-section header > div {
  display: flex;
  align-items: center;
  color: #ff6b41;
  gap: 0.3rem;
}

.provider-section h2 {
  margin: 0;
  color: white;
  font-size: var(--font-section-heading);
  font-weight: 750;
}

.provider-section header > a {
  display: flex;
  position: relative;
  isolation: isolate;
  align-items: center;
  min-height: 1.15rem;
  padding: 0.12rem 0.38rem;
  overflow: hidden;
  border: 1px solid rgba(214, 232, 222, 0.17);
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.37rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.13), transparent 52%),
    rgba(3, 18, 13, 0.62);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px rgba(0, 0, 0, 0.28),
    0 0.16rem 0.42rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(18px) saturate(1.45);
  -webkit-backdrop-filter: blur(18px) saturate(1.45);
  gap: 0.18rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.provider-section header > a::before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 10%;
  left: 10%;
  height: 50%;
  border-radius: 0 0 50% 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), transparent);
  content: '';
  pointer-events: none;
}

.provider-section header > a:hover {
  border-color: rgba(91, 230, 179, 0.5);
  color: #ffffff;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.17), transparent 52%),
    rgba(4, 53, 38, 0.68);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.26),
    inset 0 -1px rgba(0, 25, 17, 0.3),
    0 0.2rem 0.5rem rgba(0, 0, 0, 0.26),
    0 0 0.45rem rgba(50, 212, 154, 0.1);
  transform: translateY(-1px);
}

.provider-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.28rem;
}

.provider-grid a {
  display: flex;
  position: relative;
  isolation: isolate;
  min-width: 0;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.2rem;
  overflow: hidden;
  border: 1px solid rgba(214, 232, 222, 0.14);
  border-radius: 0.3rem;
  color: #aebbb5;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 45%),
    linear-gradient(135deg, rgba(35, 82, 66, 0.11), rgba(5, 14, 11, 0.76));
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.16),
    inset 0 -1px rgba(0, 0, 0, 0.3),
    0 0.2rem 0.52rem rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  gap: 0.18rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.provider-grid a::before {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 5%;
  left: 5%;
  height: 46%;
  border-radius: 0 0 50% 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.11), transparent);
  content: '';
  pointer-events: none;
}

.provider-grid a:hover {
  border-color: rgba(91, 230, 179, 0.4);
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.22),
    inset 0 -1px rgba(0, 30, 20, 0.32),
    0 0.26rem 0.65rem rgba(0, 0, 0, 0.3),
    0 0 0.5rem rgba(50, 212, 154, 0.08);
  transform: translateY(-1px);
}

.provider-grid img {
  display: block;
  width: min(80%, 4.8rem);
  height: 1.8rem;
  object-fit: contain;
}

.provider-grid strong {
  overflow: hidden;
  color: white;
  font-size: 0.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 48rem) {
  .provider-section header > a {
    font-size: 0.5rem;
  }

  .provider-grid img {
    width: min(84%, 7rem);
    height: 1.5rem;
  }
}

@media (max-width: 63.99rem) {
  .provider-section {
    margin-top: 0.5rem;
  }

  .provider-section header {
    min-height: 1.85rem;
    margin-bottom: 0.35rem;
  }

  .provider-section header > div {
    gap: 0.38rem;
  }

  .provider-section h2 {
    font-size: 0.95rem;
  }

  .provider-section header > a {
    min-height: 1.65rem;
    padding: 0.22rem 0.65rem;
    font-size: 0.75rem;
    gap: 0.24rem;
  }

  .provider-section header > a :deep(svg) {
    width: 0.75rem;
    height: 0.75rem;
  }

  .provider-grid {
    grid-auto-columns: calc((100% - 1.14rem) / 4);
    grid-auto-flow: column;
    grid-template-columns: none;
    margin-right: calc(var(--page-padding) * -1);
    padding-right: var(--page-padding);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    touch-action: pan-x;
    -webkit-overflow-scrolling: touch;
    gap: 0.38rem;
  }

  .provider-grid::-webkit-scrollbar {
    display: none;
  }

  .provider-grid a {
    height: 3.1rem;
    border-radius: 0.45rem;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  .provider-grid img {
    width: min(82%, 5.2rem);
    height: 1.65rem;
  }

  .provider-grid strong {
    font-size: 0.78rem;
  }
}

@media (max-width: 35rem) {
  .provider-grid {
    grid-auto-columns: calc((100% - 0.76rem) / 3);
  }
}
</style>
