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
const failedImages = ref<Record<number, boolean>>({})
function onImageError(index: number) {
  failedImages.value[index] = true
}

function parseColorToRgb(color?: string | null): [number, number, number] | null {
  if (!color) return null
  const trimmed = color.trim()
  if (trimmed.startsWith('#') || /^[0-9a-fA-F]{3,8}$/.test(trimmed)) {
    const hex = trimmed.replace('#', '')
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16)
      const g = parseInt(hex[1] + hex[1], 16)
      const b = parseInt(hex[2] + hex[2], 16)
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return [r, g, b]
    } else if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return [r, g, b]
    }
  }
  const parts = trimmed.split(/[\s,]+/).map(Number)
  if (parts.length >= 3 && parts.every(n => !Number.isNaN(n) && n >= 0 && n <= 255)) {
    return [parts[0]!, parts[1]!, parts[2]!]
  }
  return null
}

function rgbToHueDegrees(r: number, g: number, b: number): number {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max === min) return 0
  let h = 0
  const d = max - min
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) * 60
  } else if (max === g) {
    h = ((b - r) / d + 2) * 60
  } else {
    h = ((r - g) / d + 4) * 60
  }
  return Math.round(h)
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
const teams = computed(() => [
  { name: props.fixture.home_team, data: props.fixture.home, logo: props.fixture.home_team_logo || props.fixture.home?.logo },
  { name: props.fixture.away_team, data: props.fixture.away, logo: props.fixture.away_team_logo || props.fixture.away?.logo },
].map((team, index) => {
  const name = team.name || ''
  const apiAccent = team.data?.accent
  const parsedApiRgb = parseColorToRgb(apiAccent)
  const fallbackRgbStr = teamAccents[name] || (index === 0 ? '0 131 72' : '220 31 45')
  const parsedFallbackRgb = parseColorToRgb(fallbackRgbStr) || [148, 163, 170]

  const [red, green, blue] = parsedApiRgb || parsedFallbackRgb
  const rgbString = `${red} ${green} ${blue}`
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  const image = team.logo || teamImages[name]

  // Calculate arena hue rotation so that the neon arena side matches the team accent hue:
  const teamHue = rgbToHueDegrees(red, green, blue)
  // Left arena side has base hue ~210 deg (cyan/blue); right arena side has base hue ~40 deg (orange/red).
  const baseSideHue = index === 0 ? 210 : 40
  const computedHueShift = `${(teamHue - baseSideHue + 360) % 360}deg`
  const arenaHue = (!apiAccent && arenaHueShifts[name]) ? arenaHueShifts[name] : computedHueShift

  return {
    name: name || translate('To be confirmed'),
    image,
    accent: rgbString,
    hoverAccent: parsedApiRgb ? rgbString : (hoverTeamAccents[name] || rgbString),
    arenaHue,
    ink: brightness > 150 ? '45 55 65' : rgbString,
    initials: name ? name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('') : 'TBC',
  }
}))
const competitionLogo = computed(() => {
  return props.fixture.competition_logo || getTournamentLogo(`${props.fixture.sport || ''} ${props.fixture.sport_title || ''} ${props.fixture.sport_key || ''}`)
})
const destination = computed(() => {
  const rawSport = (props.fixture.sport || props.fixture.sport_key?.split('_')[0] || 'basketball').toLowerCase()
  const sport = rawSport === 'football' ? 'soccer' : rawSport
  return `/sports/${sport}/inplay`
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
const isBasketball = computed(() => {
  const rawSport = (props.fixture.sport || props.fixture.sport_key?.split('_')[0] || '').toLowerCase()
  return rawSport === 'basketball'
})
</script>

<template>
  <NuxtLink
    :to="destination"
    class="sports-match-card"
    :class="{
      'sports-match-card--highlighted': highlighted,
      'sports-match-card--basketball': isBasketball,
    }"
    :data-sport="(fixture.sport || fixture.sport_key.split('_')[0] || '').toLowerCase()"
    :style="{
      '--home-arena-hue': teams[0]!.arenaHue,
      '--away-arena-hue': teams[1]!.arenaHue,
      '--home-hover-color': teams[0]!.hoverAccent,
      '--away-hover-color': teams[1]!.hoverAccent,
    }"
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
            <img
              v-if="teams[0]!.image && !failedImages[0]"
              :src="teams[0]!.image"
              :alt="teams[0]!.name"
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
              @error="onImageError(0)"
            >
            <span v-else class="sports-team-initials" aria-hidden="true">{{ teams[0]!.initials }}</span>
          </span>
          <strong>{{ teams[0]!.name }}</strong>
        </div>

        <div class="sports-match-center flex flex-col items-center">
          <img
            v-if="competitionLogo"
            :src="competitionLogo"
            :alt="fixture.sport_title || ''"
            class="sports-center-watermark"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          >
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
            <img
              v-if="teams[1]!.image && !failedImages[1]"
              :src="teams[1]!.image"
              :alt="teams[1]!.name"
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
              @error="onImageError(1)"
            >
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
.sports-arena-side--home { clip-path: inset(0 50% 0 0); filter: hue-rotate(var(--home-arena-hue)) saturate(1.3) brightness(.82); }
.sports-arena-side--away { clip-path: inset(0 0 0 50%); filter: hue-rotate(var(--away-arena-hue)) saturate(1.3) brightness(.82); }
.sports-match-arena::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    radial-gradient(ellipse at 25% 40%, rgba(var(--home-hover-color), 0.38) 0%, transparent 68%),
    radial-gradient(ellipse at 75% 40%, rgba(var(--away-hover-color), 0.38) 0%, transparent 68%);
  pointer-events: none;
}
.sports-match-arena::after { content: ''; position: absolute; z-index: -1; inset: 0; background: linear-gradient(180deg,transparent 45%,#0000002b 70%,#00100c5c); pointer-events: none; }
.sports-hover-panel {
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  width: 60%;
  background: radial-gradient(ellipse at 50% 0%, #ffffff1f, transparent 65%), linear-gradient(180deg, #00000008, #000000b3), rgb(var(--panel-team-color));
  transition: transform 400ms cubic-bezier(.22, .61, .36, 1);
  pointer-events: none;
}
.sports-hover-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 16%, transparent 84%, rgba(0, 0, 0, 0.45) 100%);
  pointer-events: none;
}
/* Complementary trapezoids each cover 50% of the arena and share one diagonal. */
.sports-hover-panel--home {
  --panel-team-color: var(--home-hover-color);
  left: 0;
  clip-path: polygon(0 0, 100% 0, 66.666667% 100%, 0 100%);
  transform: translateX(calc((var(--sports-hover-opacity) - 1) * 105%));
}
.sports-hover-panel--away {
  --panel-team-color: var(--away-hover-color);
  right: 0;
  clip-path: polygon(33.333333% 0, 100% 0, 100% 100%, 0 100%);
  transform: translateX(calc((1 - var(--sports-hover-opacity)) * 105%));
}
/* Accents for closing door leading diagonal edges on hover */
.sports-hover-panel--home::after,
.sports-hover-panel--away::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(var(--panel-team-color), 0.92) 28%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(var(--panel-team-color), 0.92) 72%,
    rgba(255, 255, 255, 0.98) 100%
  );
  filter: drop-shadow(0 0 6px rgba(var(--panel-team-color), 0.8)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.85));
}
.sports-hover-panel--home::after {
  clip-path: polygon(96.5% 0, 100% 0, 66.666667% 100%, 63.166667% 100%);
}
.sports-hover-panel--away::after {
  clip-path: polygon(33.333333% 0, 36.833333% 0, 3.5% 100%, 0 100%);
}
.sports-match-teams { grid-template-columns: minmax(0,1fr) 34% minmax(0,1fr); align-items: start; gap: 0; height: 100%; padding: 32px 8px 10px; }
.sports-team { min-width: 0; gap: 9px; text-align: center; }
.sports-team-badge { display: grid; place-items: center; flex-shrink: 0; width: 64px; height: 64px; overflow: hidden; border: 2px solid #e3e9e6; border-radius: 50%; background: #f7f9f8; box-shadow: 0 2px 5px #0006; transform: scale(var(--sports-hover-logo-scale)); transition: transform 180ms ease; }
.sports-team-badge img { width: 91%; height: 91%; object-fit: contain; }
.sports-team-initials { color: rgb(var(--team-ink)); font-size: 21px; font-weight: 800; letter-spacing: -.04em; }
.sports-team strong { min-width: 0; max-width: min(100%,104px); font-size: clamp(10px,3.7cqw,12px); font-weight: 800; line-height: 1.25; letter-spacing: -.02em; text-wrap: balance; overflow-wrap: anywhere; text-shadow: 0 1px 4px #000; }
.sports-match-center { position: relative; min-width: 0; gap: 8px; padding-top: 2px; height: 100%; align-self: stretch; }
.sports-center-watermark {
  position: absolute;
  top: calc(50% + 24px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(52px, 16cqw, 66px);
  height: clamp(52px, 16cqw, 66px);
  object-fit: contain;
  opacity: 0.42;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.75)) contrast(1.15) brightness(1.1);
  pointer-events: none;
  z-index: 0;
}
.sports-versus, .sports-kickoff, .sports-live-score { position: relative; z-index: 1; }
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
