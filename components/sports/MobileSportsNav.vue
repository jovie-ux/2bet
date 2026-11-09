<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { buildBybetRedirectUrl } from '~/utils/sportsRedirect'

const route = useRoute()
const { bybetRedirectUrl: rawRedirectUrl, bybetRedirectCode } = useRuntimeConfig().public
const bybetRedirectUrl = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/login?p=${bybetRedirectCode || 'xjSD'}`
const bybetRedirectSearch = `${(rawRedirectUrl || 'https://bybet.com').replace(/\/+$/, '')}/sportEvents/search?p=${bybetRedirectCode || 'xjSD'}`
const { translate } = useSiteLocale()

interface MobileSportNavItem {
  key: string
  label: string
  image?: string
  emoji?: string
  external?: boolean
  to?: string
  url?: string
}

const resolveExternalSportUrl = (target?: string): string => {
  if (!target) {
    return buildBybetRedirectUrl('login', rawRedirectUrl, bybetRedirectCode)
  }
  if (target.startsWith('http://') || target.startsWith('https://')) {
    return target
  }
  return buildBybetRedirectUrl(target, rawRedirectUrl, bybetRedirectCode)
}

const sports: MobileSportNavItem[] = [
  { key: 'popular', label: 'Popular', image: '/icons/sports/popular.webp' },
  { key: 'basketball', label: 'Basketball', image: '/icons/sports/basketball.webp' },
  { key: 'soccer', label: 'Soccer', image: '/icons/sports/soccer.webp' },
  { key: 'tennis', label: 'Tennis', image: '/icons/sports/tennis.webp', external: true, url: 'sportEvents/inplay/tennis' },
  { key: 'table-tennis', label: 'Table Tennis', image: '/icons/sports/table-tennis.webp', external: true, url: 'sportEvents/incoming/tableTennis' },
  { key: 'esports', label: 'eSports', image: '/icons/sports/egame.webp', external: true, url: 'sportEvents/eSportGame' },
  { key: 'all', label: 'All Sports', image: '/icons/sports/esports.webp', external: true, url: 'sportEvents/eSportBall' },
  { key: 'live', label: 'Live', image: '/icons/sports/live.webp', to: '/explore/sports/live' },
  { key: 'live-plaza', label: 'Live Plaza', image: '/icons/sports/live-plaza.webp', to: '/explore/live-plaza/home' },
  { key: 'bonuses', label: 'Bonuses', image: '/icons/sports/bonus.webp', to: '/explore/bonuses' },
]

const isLive = computed(() => route.path.startsWith('/explore/sports/live'))
const selectedSport = computed(() => {
  if (route.path.startsWith('/explore/sports/popular')) return 'popular'
  return String(route.params.sport || 'popular')
})

const destination = (sport: typeof sports[number]): string => {
  if (isLive.value && (sport.key === 'esports' || sport.key === 'all-esports')) {
    return resolveExternalSportUrl('sportEvents/liveGame/eSportBallGroup')
  }
  if (sport.url) {
    return resolveExternalSportUrl(sport.url)
  }
  if (sport.to) {
    if (sport.external || sport.to.startsWith('sportEvents/') || sport.to.startsWith('http')) {
      return resolveExternalSportUrl(sport.to)
    }
    return sport.to
  }
  if (sport.external) {
    return resolveExternalSportUrl()
  }
  const key = sport.key === 'all' ? 'popular' : sport.key
  if (isLive.value) return key === 'popular' ? '/explore/sports/live' : `/explore/sports/live/${key}`

  const currentTab = String(route.params.tab || 'league')
  const availableTabs = ['league', 'inplay', 'upcoming', 'pre-match', 'smart-pick', 'outright']
  if (key === 'soccer') availableTabs.push('replay')
  const tab = availableTabs.includes(currentTab) ? currentTab : 'league'
  return `/explore/sports/${key}/${tab}`
}
</script>

<template>
  <nav class="mobile-sports-nav" :aria-label="translate('Sports')">
    <NuxtLink
      v-for="sport in sports"
      :key="sport.key"
      :to="destination(sport)"
      :external="sport.external || Boolean(destination(sport).startsWith('http'))"
      class="mobile-sports-nav__item"
      :class="{ 'mobile-sports-nav__item--active': selectedSport === sport.key }"
      :aria-label="translate(sport.label)"
      :aria-current="selectedSport === sport.key ? 'page' : undefined"
      :title="translate(sport.label)"
    >
      <img v-if="sport.image" :src="sport.image" alt="" width="30" height="30" aria-hidden="true">
      <span v-else-if="sport.emoji" class="mobile-sports-nav__emoji" aria-hidden="true">{{ sport.emoji }}</span>
      <svg v-else-if="sport.key === 'bonuses'" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <path d="M3 12L15 6L27 12V24L15 30L3 24V12Z" fill="#78AFF2" />
        <path d="M3 12L15 18L27 12L15 6L3 12Z" fill="#DAECFF" />
        <path d="M15 18L27 12V24L15 30V18Z" fill="#4D87DB" />
        <path d="M8 14.5L12 16.5V28.5L8 26.5V14.5ZM19 16L23 14V26L19 28V16Z" fill="#F1F7FF" />
        <path d="M8 9.5L20 15.5L23.5 13.75L11.5 7.75L8 9.5Z" fill="#3775C8" />
        <path d="M7 6C4 0 11 0 15 7C19 0 26 0 23 6L15 11L7 6Z" fill="#94C6FF" />
        <path d="M7 6L15 7L23 6L15 11L7 6Z" fill="#3A79CD" />
      </svg>
      <span v-else class="mobile-sports-nav__all" aria-hidden="true"><span>⚽</span><span>🎾</span><span>🏀</span><span>🏐</span></span>
    </NuxtLink>
    <NuxtLink
      :to="bybetRedirectSearch"
      external
      class="mobile-sports-nav__item mobile-sports-nav__search"
      :aria-label="translate('Search sports')"
    >
      <Search :size="24" :stroke-width="1.5" aria-hidden="true" />
    </NuxtLink>
  </nav>
</template>

<style scoped>
.mobile-sports-nav { display: none; }

@media (max-width: 63.99rem) {
  .mobile-sports-nav {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 9px;
    overflow-x: auto;
    margin-bottom: 8px;
    padding: 9px 8px;
    border-radius: 14px;
    background: #202020;
    scrollbar-width: none;
    overscroll-behavior-inline: contain;
  }

  .mobile-sports-nav::-webkit-scrollbar { display: none; }

  .mobile-sports-nav__item {
    display: grid;
    width: 42px;
    height: 34px;
    flex: 0 0 42px;
    place-items: center;
    border-radius: 12px;
  }

  .mobile-sports-nav__item--active { background: #087c59; }
  .mobile-sports-nav__search { border: 0; color: #fff; background: transparent; }
  .mobile-sports-nav__item img { width: 30px; height: 30px; object-fit: contain; }
  .mobile-sports-nav__emoji { font-size: 28px; line-height: 1; }
  .mobile-sports-nav__all { display: grid; grid-template-columns: repeat(2, 13px); font-size: 12px; line-height: 14px; }
}
</style>
