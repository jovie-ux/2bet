<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { getTournamentLogo } from '~/data/sports'
import type { SportsEvent } from '~/types/sports'

const props = withDefaults(defineProps<{ fixture: SportsEvent; highlighted?: boolean }>(), { highlighted: false })
const { timeZone } = useTimeZonePreference()
const { locale, translate } = useSiteLocale()
const kickoff = computed(() => {
  const date = new Date(props.fixture.commence_time)
  const formatLocale = locale.value === 'pt' ? 'pt-BR' : 'en-US'
  return {
    time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: timeZone.value }).format(date),
    date: new Intl.DateTimeFormat(formatLocale, { month: 'short', day: 'numeric', year: 'numeric', timeZone: timeZone.value }).format(date),
  }
})
const hasLiveScore = computed(() => {
  return props.fixture.scoreAvailable || (props.fixture.homeScore !== undefined && props.fixture.awayScore !== undefined) || (props.fixture.scores && props.fixture.scores.length >= 2)
})
const displayScore = computed(() => {
  if (props.fixture.homeScore !== undefined && props.fixture.awayScore !== undefined) {
    return `${props.fixture.homeScore} - ${props.fixture.awayScore}`
  }
  if (props.fixture.scores && props.fixture.scores.length >= 2) {
    return `${props.fixture.scores[0]?.score || 0} - ${props.fixture.scores[1]?.score || 0}`
  }
  return '0 - 0'
})
const isLive = computed(() => {
  return hasLiveScore.value || !props.fixture.completed
})

const teamImages: Record<string, string> = {
  'Boston Celtics': '/images/teams/nba/boston-celtics.svg',
  'Los Angeles Lakers': '/images/teams/nba/los-angeles-lakers.svg',
  'Golden State Warriors': '/images/teams/nba/golden-state-warriors.svg',
  'Denver Nuggets': '/images/teams/nba/denver-nuggets.svg',
  'Dallas Mavericks': '/images/teams/nba/dallas-mavericks.svg',
  'Phoenix Suns': '/images/teams/nba/phoenix-suns.svg',
}
// Recolor the two arena halves to match the reference's team lighting.
const arenaHueShifts: Record<string, string> = {
  'Boston Celtics': '-65deg',
  'Los Angeles Lakers': '240deg',
  'Golden State Warriors': '0deg',
  'Denver Nuggets': '8deg',
  'Dallas Mavericks': '0deg',
  'Phoenix Suns': '-14deg',
}
const hoverTeamAccents: Record<string, string> = {
  'Golden State Warriors': '0 86 157',
  'Denver Nuggets': '190 150 0',
}
// NBA accents come from the bundled logo SVG fills; other clubs use their team colors.
const teamAccents: Record<string, string> = {
  'Boston Celtics': '0 131 72',
  'Los Angeles Lakers': '84 44 129',
  'Golden State Warriors': '29 66 138',
  'Denver Nuggets': '139 35 50',
  'Dallas Mavericks': '0 100 177',
  'Phoenix Suns': '228 96 37',
  'Real Madrid Baloncesto': '224 227 234',
  'Panathinaikos BC': '0 128 68',
  'FC Barcelona Basquet': '165 0 68',
  'Olympiacos BC': '220 35 42',
  'Duke Blue Devils': '0 48 135',
  'North Carolina Tar Heels': '123 175 212',
  Arsenal: '220 31 45',
  Chelsea: '35 74 157',
  'Manchester City': '108 172 228',
  Liverpool: '200 24 47',
  'Manchester United': '218 41 28',
  'Tottenham Hotspur': '225 228 239',
  'Real Madrid': '224 227 234',
  'Bayern Munich': '220 5 45',
  'Paris Saint-Germain': '22 49 84',
  'Inter Milan': '0 87 184',
  'Bayer Leverkusen': '216 30 45',
  'Borussia Dortmund': '237 214 0',
  'AC Milan': '195 29 45',
  Barcelona: '165 0 68',
  'Atletico Madrid': '207 34 52',
}
const teams = computed(() => [props.fixture.home_team, props.fixture.away_team].map((name, index) => {
  const accent = teamAccents[name || ''] || '148 163 170'
  const [red = 0, green = 0, blue = 0] = accent.split(' ').map(Number)
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  return {
    name: name || translate('To be confirmed'),
    image: teamImages[name || ''],
    accent,
    hoverAccent: hoverTeamAccents[name || ''] || accent,
    arenaHue: arenaHueShifts[name || ''] || `${Math.round((Math.atan2(Math.sqrt(3) * (green - blue), 2 * red - green - blue) * 180 / Math.PI + 360) % 360) - (index === 0 ? 210 : 40)}deg`,
    ink: brightness > 150 ? '45 55 65' : accent,
    initials: name ? name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('') : 'TBC',
  }
}))
const destination = computed(() => {
  const rawSport = (props.fixture.sport || props.fixture.sport_key?.split('_')[0] || 'basketball').toLowerCase()
  const sport = rawSport === 'football' ? 'soccer' : rawSport
  return `/explore/sports/${sport}/inplay`
})
const sportName = computed(() => {
  const rawSport = (props.fixture.sport || props.fixture.sport_key?.split('_')[0] || '').toLowerCase()
  const names: Record<string, string> = {
    basketball: 'Basketball',
    soccer: 'Football',
    football: 'Football',
    tennis: 'Tennis',
    baseball: 'Baseball',
  }
  return translate(names[rawSport] || 'Sports')
})
</script>

<template>
  <NuxtLink
    :to="destination"
    class="sports-match-card"
    :class="{ 'sports-match-card--highlighted': highlighted }"
    :data-sport="(fixture.sport || fixture.sport_key.split('_')[0] || '').toLowerCase()"
    :style="{ '--home-arena-hue': teams[0]!.arenaHue, '--away-arena-hue': teams[1]!.arenaHue, '--home-hover-color': teams[0]!.hoverAccent, '--away-hover-color': teams[1]!.hoverAccent }"
    :aria-label="`${fixture.home_team} ${translate('VS')} ${fixture.away_team} - ${fixture.sport_title}`"
  >
    <div class="sports-match-heading flex items-center justify-between">
      <span class="sports-league flex items-center min-w-0">
        <img :src="getTournamentLogo(fixture.sport_key)" :class="{ 'sports-league-logo--nba': fixture.sport_key.includes('_nba') }" :alt="fixture.sport_title || sportName" width="18" height="26" loading="lazy" decoding="async">
        <span class="sports-league-copy flex items-center min-w-0"><strong :title="fixture.sport_title">{{ fixture.sport_title }}</strong><span aria-hidden="true">&middot;</span><span class="sports-league-sport">{{ sportName }}</span></span>
      </span>
      <span class="sports-match-status inline-flex items-center" :class="{ 'sports-match-status--live': isLive }">
        <span aria-hidden="true" />
        {{ translate(isLive ? 'In-Play' : 'Upcoming') }}
      </span>
    </div>

    <div class="sports-match-arena">
      <span class="sports-arena-side sports-arena-side--home" aria-hidden="true" />
      <span class="sports-arena-side sports-arena-side--away" aria-hidden="true" />
      <span class="sports-hover-panel sports-hover-panel--home" aria-hidden="true" />
      <span class="sports-hover-panel sports-hover-panel--away" aria-hidden="true" />
      <div class="sports-match-teams grid">
        <div class="sports-team flex flex-col items-center" :style="{ '--team-ink': teams[0]!.ink }">
          <span class="sports-team-badge">
            <img v-if="teams[0]!.image" :src="teams[0]!.image" :alt="teams[0]!.name" width="64" height="64" loading="lazy" decoding="async">
            <span v-else class="sports-team-initials" aria-hidden="true">{{ teams[0]!.initials }}</span>
          </span>
          <strong>{{ teams[0]!.name }}</strong>
        </div>

        <div class="sports-match-center flex flex-col items-center">
          <div v-if="hasLiveScore" class="sports-live-score flex flex-col items-center justify-center">
            <span v-if="fixture.clock" class="sports-live-clock">{{ fixture.clock }}</span>
            <strong class="sports-live-score-digits">{{ displayScore }}</strong>
            <span class="sports-live-label">{{ translate('Live') }}</span>
          </div>
          <template v-else>
            <span class="sports-versus" aria-hidden="true">{{ translate('VS') }}</span>
            <time class="sports-kickoff flex flex-col items-center justify-center" :datetime="fixture.commence_time">
              <strong>{{ kickoff.time }}</strong>
              <span>{{ kickoff.date }}</span>
            </time>
          </template>
        </div>

        <div class="sports-team flex flex-col items-center" :style="{ '--team-ink': teams[1]!.ink }">
          <span class="sports-team-badge">
            <img v-if="teams[1]!.image" :src="teams[1]!.image" :alt="teams[1]!.name" width="64" height="64" loading="lazy" decoding="async">
            <span v-else class="sports-team-initials" aria-hidden="true">{{ teams[1]!.initials }}</span>
          </span>
          <strong>{{ teams[1]!.name }}</strong>
        </div>
      </div>
    </div>

    <div class="sports-match-footer flex items-center justify-between">
      <p class="sports-match-category">{{ sportName }}<span aria-hidden="true"> &middot; </span>{{ fixture.sport_title }}</p>
      <span class="sports-preview inline-flex items-center justify-center">{{ translate('View match') }} <ArrowRight :size="16" :stroke-width="1.8" aria-hidden="true" /></span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.sports-match-card { --sports-hover-opacity: 0; --sports-hover-logo-scale: 1; position: relative; display: flex; flex-direction: column; min-width: 0; overflow: hidden; container-type: inline-size; border: 1px solid var(--sports-edge, #ffffff12); border-radius: 7px; color: #f4f7f5; background: #061713; transition: border-color 160ms ease; }
.sports-match-card--highlighted { border-color: #ffffff18; }
.sports-match-card:is(:hover,:focus-visible) { border-color: #ffffff30; }
.sports-match-heading { min-height: 40px; gap: 10px; padding: 5px 12px; border-bottom: 1px solid #ffffff12; background: linear-gradient(180deg,#1a2b2b,#0a1718); }
.sports-league { gap: 7px; }
.sports-league img { flex-shrink: 0; width: 15px; height: 26px; object-fit: contain; }
.sports-league img.sports-league-logo--nba { object-fit: cover; }
.sports-league-copy { gap: 5px; color: #e8eeeb; font-size: 10px; line-height: 1.3; }
.sports-league strong { min-width: 0; overflow: hidden; max-width: 90px; font-weight: 700; white-space: nowrap; text-overflow: ellipsis; }
.sports-league-sport { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.sports-match-status { flex-shrink: 0; gap: 7px; min-height: 24px; padding: 3px 9px; border: 1px solid #fac80058; border-radius: 9px; color: #fac80097; background: #00291d80; font-size: 9px; line-height: 1.3; }
.sports-match-status > span { width: 6px; height: 6px; border-radius: 50%; background: #FAC700; }
.sports-match-status--live { border-color: #00ea7658; color: #00ea76; background: #00291d99; }
.sports-match-status--live > span { background: #00ea76; box-shadow: 0 0 6px #00ea76; }
.sports-match-arena { position: relative; isolation: isolate; height: clamp(156px,52cqw,190px); overflow: hidden; background: #020909; }
.sports-arena-side { position: absolute; z-index: -1; inset: 0; background: url('/images/sports/match-arena-neon-v2.webp') center / 100% 100% no-repeat; pointer-events: none; }
.sports-arena-side--home { clip-path: inset(0 50% 0 0); filter: hue-rotate(var(--home-arena-hue)) saturate(1.05) brightness(.74); }
.sports-arena-side--away { clip-path: inset(0 0 0 50%); filter: hue-rotate(var(--away-arena-hue)) saturate(1.05) brightness(.74); }
.sports-match-arena::after { content: ''; position: absolute; z-index: -1; inset: 0; background: linear-gradient(180deg,transparent 45%,#0000002b 70%,#00100c5c); pointer-events: none; }
.sports-hover-panel { position: absolute; z-index: -1; top: 0; bottom: 0; width: 60%; background: radial-gradient(ellipse at 50% 0%,#ffffff1f,transparent 65%),linear-gradient(180deg,#00000008,#000000b3),rgb(var(--panel-team-color)); transition: transform 420ms cubic-bezier(.22,.61,.36,1); pointer-events: none; }
/* Complementary trapezoids each cover 50% of the arena and share one diagonal. */
.sports-hover-panel--home { --panel-team-color: var(--home-hover-color); left: 0; clip-path: polygon(0 0,100% 0,66.666667% 100%,0 100%); transform: translateX(calc((var(--sports-hover-opacity) - 1) * 105%)); }
.sports-hover-panel--away { --panel-team-color: var(--away-hover-color); right: 0; clip-path: polygon(33.333333% 0,100% 0,100% 100%,0 100%); transform: translateX(calc((1 - var(--sports-hover-opacity)) * 105%)); }
.sports-hover-panel--home::after { content: ''; position: absolute; inset: 0; background: #c8cbbb; clip-path: polygon(96.5% 0,100% 0,66.666667% 100%,63.166667% 100%); }
.sports-match-teams { grid-template-columns: minmax(0,1fr) 34% minmax(0,1fr); align-items: start; gap: 0; height: 100%; padding: 32px 8px 10px; }
.sports-team { min-width: 0; gap: 9px; text-align: center; }
.sports-team-badge { display: grid; place-items: center; flex-shrink: 0; width: 64px; height: 64px; overflow: hidden; border: 2px solid #e3e9e6; border-radius: 50%; background: #f7f9f8; box-shadow: 0 2px 5px #0006; transform: scale(var(--sports-hover-logo-scale)); transition: transform 180ms ease; }
.sports-team-badge img { width: 91%; height: 91%; object-fit: contain; }
.sports-team-initials { color: rgb(var(--team-ink)); font-size: 21px; font-weight: 800; letter-spacing: -.04em; }
.sports-team strong { min-width: 0; max-width: min(100%,104px); font-size: clamp(10px,3.7cqw,12px); font-weight: 800; line-height: 1.25; letter-spacing: -.02em; text-wrap: balance; overflow-wrap: anywhere; text-shadow: 0 1px 4px #000; }
.sports-match-center { min-width: 0; gap: 8px; padding-top: 2px; }
.sports-versus { color: #f0f4f2; font-size: 10px; font-weight: 800; line-height: 1; text-shadow: 0 1px 4px #000; }
.sports-kickoff { width: 100%; min-height: 36px; padding: 3px 2px; border: 1px solid #ffffff0e; border-radius: 18px; background: #010b0ce8; white-space: nowrap; }
.sports-kickoff strong { font-size: clamp(14px,4.7cqw,16px); font-weight: 800; line-height: 1.1; letter-spacing: -.03em; }
.sports-kickoff > span { display: block; margin-top: 3px; color: #bccac4; font-size: clamp(7px,2.7cqw,9px); line-height: 1.2; }
.sports-live-score { width: 100%; min-height: 48px; padding: 4px 6px; border: 1px solid #00ea7626; border-radius: 12px; background: #010b0ce8; white-space: nowrap; }
.sports-live-clock { color: #fac800; font-size: clamp(9px,3cqw,11px); font-weight: 700; line-height: 1.1; }
.sports-live-score-digits { font-size: clamp(16px,5.2cqw,20px); font-weight: 800; line-height: 1.1; letter-spacing: .02em; color: #fff; }
.sports-live-label { margin-top: 2px; color: #00ea76; font-size: clamp(8px,2.5cqw,10px); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
.sports-match-footer { min-height: 56px; margin-top: auto; gap: 10px; padding: 10px 12px; border-top: 1px solid #ffffff0c; background: #061713; }
.sports-match-category { min-width: 0; overflow: hidden; margin: 0; color: #b4c5bd; font-size: 10px; line-height: 1.4; white-space: nowrap; text-overflow: ellipsis; }
.sports-preview { flex-shrink: 0; gap: 8px; width: 46%; max-width: 140px; min-height: 32px; border-radius: 5px; color: #fff; background: var(--sports-button, var(--brand)); font-size: 14px; font-weight: 800; white-space: nowrap; transition: background-color 160ms ease; }
.sports-match-card:is(:hover,:focus-visible) .sports-preview { background: var(--brand-hover); }
@container (max-width: 250px) {
  .sports-match-heading { gap: 6px; padding-inline: 9px; }
  .sports-league { gap: 5px; }
  .sports-league-copy { gap: 3px; font-size: 9px; }
  .sports-match-status { gap: 4px; padding-inline: 6px; font-size: 8px; }
  .sports-team-badge { width: 54px; height: 54px; }
  .sports-match-footer { gap: 7px; padding-inline: 9px; }
  .sports-preview { gap: 5px; font-size: 10px; }
  .sports-match-category { font-size: 9px; }
}
@media (max-width: 600px) {
  .sports-league-copy { font-size: 12px; }
  .sports-match-status { font-size: 11px; }
  .sports-team strong { font-size: 13px; }
  .sports-versus { font-size: 12px; }
  .sports-kickoff > span { font-size: 11px; }
  .sports-match-category { font-size: 12px; }
  .sports-preview { font-size: 14px; }
}
@media (pointer: coarse) { .sports-preview { min-height: 40px; } }
.sports-match-card:focus-visible { --sports-hover-opacity: 1; --sports-hover-logo-scale: 1.03; }
@media (hover: hover) and (pointer: fine) {
  .sports-match-card:hover { --sports-hover-opacity: 1; --sports-hover-logo-scale: 1.03; }
}
@media (prefers-reduced-motion: reduce) { .sports-match-card,.sports-preview,.sports-hover-panel,.sports-team-badge { transition: none; } }
</style>
