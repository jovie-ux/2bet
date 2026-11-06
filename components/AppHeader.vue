<script setup lang="ts">
import { Bell, Headphones, Menu, X } from 'lucide-vue-next'

defineProps<{
  drawerOpen: boolean
}>()

const emit = defineEmits<{
  'toggle-drawer': []
}>()

const { translate } = useSiteLocale()
const externalSiteUrl = useRuntimeConfig().public.bybetRedirectUrl
</script>

<template>
  <header class="app-header-shell">
    <button
      class="menu-button hidden sm:flex"
      type="button"
      :aria-expanded="drawerOpen"
      aria-controls="mobile-navigation"
      :aria-label="drawerOpen ? translate('Close navigation') : translate('Open navigation')"
      @click="emit('toggle-drawer')"
    >
      <X v-if="drawerOpen" :size="17" />
      <Menu v-else :size="17" />
    </button>

    <NuxtLink class="brand" to="/" aria-label="2bet home">
      <img
        src="/brand/2bet-logo.webp"
        alt="2Bet"
        width="210"
        height="64"
        fetchpriority="high"
        decoding="async"
      >
    </NuxtLink>

    <div class="header-actions">
      <RouletteEntryButton />
      <a
        class="header-glass-icon header-glass-icon--utility"
        :href="externalSiteUrl"
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label="Open 2bet notifications in a new tab"
      >
        <Bell :size="20" :stroke-width="2" />
      </a>
      <NuxtLink
        to="/explore/egames/customer-service"
        class="header-glass-icon header-glass-icon--utility"
        aria-label="Customer service"
      >
        <Headphones :size="20" :stroke-width="2" />
      </NuxtLink>
      <a
        class="header-glass-button header-glass-button--login"
        :href="externalSiteUrl"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {{ translate('Login') }}
      </a>
      <a
        class="header-glass-button header-glass-button--signup"
        :href="externalSiteUrl"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {{ translate('Sign Up') }}
      </a>
      <NuxtLink
        to="/explore/account/me"
        class="header-glass-icon header-glass-icon--profile"
        aria-label="Open profile"
      >
        <svg id="_圖層_1" data-name="圖層_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 56 56" class="h-full w-full" fill="currentColor"><path d="M28,0C12.54,0,0,12.54,0,28s12.54,28,28,28,28-12.54,28-28S43.46,0,28,0ZM28,12.26c3.53,0,6.41,2.86,6.41,6.41s-2.86,6.41-6.41,6.41-6.41-2.86-6.41-6.41,2.86-6.41,6.41-6.41ZM28,49.5c-9.97,0-18.03-5.07-18.03-11.28s8.06-11.28,18.03-11.28,18.03,5.07,18.03,11.28-8.06,11.28-18.03,11.28Z" class="fill-theme-header-text"></path><path d="M28,25.09c3.56,0,6.41-2.88,6.41-6.41s-2.88-6.41-6.41-6.41-6.41,2.86-6.41,6.41,2.88,6.41,6.41,6.41Z" class="fill-transparent"></path><path d="M28,26.94c-9.97,0-18.03,5.07-18.03,11.28s8.06,11.28,18.03,11.28,18.03-5.07,18.03-11.28-8.06-11.28-18.03-11.28Z" class="fill-transparent"></path></svg>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.app-header-shell {
  --header-control-size: 32px;
  --header-button-radius: 7px;
  --header-action-gap: 6px;

  display: flex;
  position: fixed;
  z-index: 30;
  top: 0;
  right: 0;
  left: 0;
  height: var(--header-height);
  align-items: center;
  padding:
    0 max(0.55rem, calc((100% - var(--site-max-width)) / 2 + 0.55rem))
    0 max(0.85rem, calc((100% - var(--site-max-width)) / 2 + 0.85rem));
  pointer-events: none;
  background: transparent;
}

.brand,
.header-actions,
.menu-button {
  position: relative;
  z-index: 30;
  pointer-events: auto;
}

.brand {
  display: flex;
  align-items: center;
}

.brand img {
  display: block;
  width: 3.35rem;
  height: auto;
}

.header-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: var(--header-action-gap);
}

.header-glass-icon,
.header-glass-button,
.menu-button {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  flex: 0 0 auto;
  text-decoration: none;
}

.header-glass-icon {
  display: grid;
  width: var(--header-control-size);
  height: var(--header-control-size);
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 50%;
  color: var(--header-text);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: none;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;
}

.header-glass-icon:hover {
  border-color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.14);
}

.header-glass-icon--profile {
  border-width: 1.5px;
  padding: 3px;
}

.header-glass-button {
  display: inline-flex;
  min-width: 68px;
  height: var(--header-control-size);
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  box-shadow: inset 1px 1px #ffffff4d, inset -1px -1px #ffffff80, inset 2px 2px 4px #00000005, inset -4px -4px 8px #00000005, 0 0 4px #0000000a, 0 4px 8px #00000014;
  border-radius: var(--header-button-radius);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  background: rgba(255, 255, 255, 0.2);
  transition:
    border-color 160ms ease,
    filter 160ms ease,
    background-color 160ms ease;
}

.fill-theme-header-text {
  fill: var(--header-text);
}

.header-glass-button--login {
  min-width: 68px;
  background: rgba(255, 255, 255, 0.2);
}

.header-glass-button--signup {
  min-width: 80px;
  border-color: rgba(255, 255, 255, 0.54);
  background: rgba(255, 255, 255, 0.2);
}

.header-glass-button:hover {
  border-color: rgba(255, 255, 255, 0.68);
  filter: brightness(1.04);
}

.menu-button {
  display: none;
  width: var(--header-control-size);
  height: var(--header-control-size);
  place-items: center;
  margin-right: 0.25rem;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  color: var(--header-text);
  background: rgba(255, 255, 255, 0.2);
}

@media (min-width: 48rem) {
  .app-header-shell {
    --header-control-size: 28px;
    --header-button-radius: 6px;
    --header-action-gap: 6px;
  }

  .brand img {
    width: 85px;
  }

  .header-glass-button {
    font-size: 13px;
  }

  .header-glass-button--login {
    min-width: 68px;
  }

  .header-glass-button--signup {
    min-width: 80px;
  }
}

@media (max-width: 63.99rem) {
  .app-header-shell {
    padding: 0 0.5rem;
  }

  .menu-button {
    display: none;
  }

}

@media (max-width: 47.99rem) {
  .app-header-shell {
    --header-control-size: 30px;
    --header-action-gap: 10px;
  }

  .brand {
    display: none;
  }

  .header-glass-button {
    font-size: 13px;
    color: #fff;
  }

  .header-glass-button--login {
    min-width: 76px;
  }

  .header-glass-button--signup {
    min-width: 92px;
    margin-left: -6px;
  }
}

@media (max-width: 22rem) {
  .app-header-shell {
    --header-action-gap: 6px;
  }

  .header-glass-button--login {
    min-width: 68px;
  }

  .header-glass-button--signup {
    min-width: 80px;
    margin-left: 0;
  }
}
</style>
