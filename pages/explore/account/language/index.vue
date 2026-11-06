<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'
import { Check } from 'lucide-vue-next'

const { locale, setLocale } = useSiteLocale()

useAppSeo({
  title: 'Language Settings — Choose Your Preferred Locale | 2Bet',
  description: 'Customize your language and regional display preferences on 2Bet. Select English, Filipino, or regional settings for a tailored gaming experience.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Account', path: '/explore/account/me' },
    { name: 'Language', path: '/explore/account/language' },
  ],
})
</script>

<template>
  <section class="preference-page language-page w-full min-w-0 pb-16 text-white">
    <SubpageHeader
      title="Language"
      back-to="/explore/account/me"
      class="mb-2 sm:mb-3"
    />

    <div class="px-2.5 sm:px-0">
      <div class="preference-list overflow-hidden rounded-xl">
        <button
          v-for="language in languageOptions"
          :key="language.code"
          type="button"
          class="preference-row flex w-full items-center justify-between px-3 text-left"
          :class="{ 'preference-row--selected': locale === language.code }"
          :aria-current="locale === language.code ? 'true' : undefined"
          @click="setLocale(language.code)"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="flag" aria-hidden="true">{{ language.flag }}</span>
            <span
              class="truncate text-[14px]"
              :class="locale === language.code ? 'font-bold text-[#20c997]' : 'text-[#eceeed]'"
            >
              {{ language.label }}
            </span>
          </span>
          <span
            v-if="locale === language.code"
            class="selected-check grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full"
            aria-label="Selected"
          >
            <Check class="h-3 w-3" :stroke-width="3.5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.preference-page {
  min-height: calc(100vh - var(--header-height));
  background:
    linear-gradient(180deg, rgba(3, 98, 66, 0.96) 0, rgba(3, 98, 66, 0.96) 1.45rem, #000 1.45rem, #000 100%);
}

.preference-header {
  border: 1px solid rgba(255, 255, 255, 0.02);
  color: #f5f7f6;
  background: linear-gradient(180deg, #1b1e1d, #181a19);
}

.back-button {
  color: #13b982;
  background: #101413;
  transition: color 140ms ease, background-color 140ms ease;
}

.back-button:hover,
.back-button:focus-visible {
  color: #35d8a2;
  background: #242826;
  outline: none;
}

.preference-list {
  border: 1px solid rgba(255, 255, 255, 0.035);
  background: #141414;
}

.preference-row {
  min-height: 50px;
  border-bottom: 1px solid #414141;
  transition: background-color 140ms ease;
}

.preference-row:last-child {
  border-bottom: 0;
}

.preference-row:hover,
.preference-row:focus-visible {
  background: rgba(255, 255, 255, 0.045);
  outline: none;
}

.flag {
  width: 24px;
  flex: 0 0 24px;
  font-size: 22px;
  line-height: 1;
  text-align: center;
}

.selected-check {
  color: white;
  background: #087b5b;
}
</style>

