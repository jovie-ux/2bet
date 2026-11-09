<script setup lang="ts">
import { providerLogoByName } from '~/data/homepage'
import { getProviderLogoForTheme } from '~/utils/providerLogo'

defineProps<{
  providers: string[]
}>()

const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const externalSiteUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const { effectiveTheme } = useSiteTheme()

const providerLogo = (provider: string): string => {
  return getProviderLogoForTheme(providerLogoByName[provider], effectiveTheme.value)
}
</script>

<template>
  <section class="provider-section" aria-labelledby="providers-title">
    <p id="providers-title">Game providers</p>
    <div class="provider-list">
      <a
        v-for="provider in providers"
        :key="provider"
        :href="externalSiteUrl"
        target="_blank"
        rel="nofollow noopener noreferrer"
        :aria-label="`Browse ${provider} games on 2bets in a new tab`"
      >
        <img
          v-if="providerLogo(provider)"
          :src="providerLogo(provider)"
          :alt="`${provider} logo`"
          width="120"
          height="44"
          loading="lazy"
          decoding="async"
        >
        <span v-else aria-hidden="true">{{ provider.charAt(0) }}</span>
        <span class="provider-name">{{ provider }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.provider-section {
  padding: 1.25rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.provider-section p {
  margin: 0 0 0.8rem;
  color: #73827b;
  font-size: 0.59rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.provider-list {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.provider-list::-webkit-scrollbar {
  display: none;
}

.provider-list a {
  display: inline-flex;
  min-width: max-content;
  height: 3.4rem;
  align-items: center;
  padding: 0 0.9rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: #83938b;
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.018);
  gap: 0.5rem;
  overflow: hidden;
}

.provider-list a:hover {
  color: var(--text);
  background: var(--surface);
}

.provider-list span {
  display: grid;
  width: 1.45rem;
  height: 1.45rem;
  place-items: center;
  border-radius: 50%;
  color: white;
  font-size: 0.64rem;
  background: var(--elevated);
}

.provider-list img {
  width: 6rem;
  height: 2.45rem;
  flex: 0 0 auto;
  object-fit: contain;
}

.provider-list .provider-name {
  display: none;
}
</style>
