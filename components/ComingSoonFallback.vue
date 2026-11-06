<script setup lang="ts">
import { ArrowLeft, Clock3, Home, Sparkles } from 'lucide-vue-next'
import { formatSeoDescription, isHomepageRoute } from '~/composables/useAppSeo'

const route = useRoute()
const router = useRouter()
const { translate, locale } = useSiteLocale()

const pathSegments = computed(() => {
  const routePath = route.params.path

  if (Array.isArray(routePath)) {
    return routePath
  }

  return route.path
    .split('/')
    .filter(Boolean)
    .slice(1)
})

const formatSegment = (segment: string): string => {
  return segment
    .split('-')
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === 'vip') {
        return 'VIP'
      }

      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

const sectionTitle = computed(() => formatSegment(pathSegments.value[0] ?? 'Explore'))
const pageTitle = computed(() => formatSegment(pathSegments.value.at(-1) ?? 'Coming Soon'))

const props = withDefaults(
  defineProps<{
    disableSeo?: boolean
  }>(),
  {
    disableSeo: false,
  }
)

if (!props.disableSeo) {
  const config = useRuntimeConfig()
  const siteName = String(config.public.siteName || '2bet Slots')
    .trim()
    .replace(/^['"]+|['"]+$/g, '')
  const description = computed(() => {
    const raw = locale.value === 'pt'
      ? `${translate(pageTitle.value)} em ${translate(sectionTitle.value)} estará disponível em breve na 2Bet.`
      : `${pageTitle.value} in ${sectionTitle.value} is coming soon to 2Bet.`
    return formatSeoDescription(raw, siteName, isHomepageRoute(route.path), false, locale.value)
  })

  useSeoMeta({
    title: () => locale.value === 'pt'
      ? `${translate(pageTitle.value)} — Em breve | 2Bet`
      : `${pageTitle.value} — Coming Soon | 2Bet`,
    description,
    ogDescription: description,
    twitterDescription: description,
    robots: 'noindex, follow',
  })
}
</script>

<template>
  <section class="coming-soon-page">
    <div class="coming-soon-card">
      <span class="status-icon" aria-hidden="true">
        <Clock3 :size="30" />
        <Sparkles :size="14" />
      </span>
      <nav :aria-label="translate('Breadcrumb')">
        <NuxtLink to="/">{{ translate('Home') }}</NuxtLink>
        <span>/</span>
        <span>{{ translate(sectionTitle) }}</span>
      </nav>
      <p class="eyebrow">{{ translate(sectionTitle) }}</p>
      <h1>{{ translate(pageTitle) }}</h1>
      <p class="description">
        {{ translate('This experience is being prepared. Check back soon for something new.') }}
      </p>
      <div class="page-actions">
        <NuxtLink to="/">
          <Home :size="15" aria-hidden="true" />
          {{ translate('Back to Home') }}
        </NuxtLink>
        <button type="button" @click="router.back()">
          <ArrowLeft :size="15" aria-hidden="true" />
          {{ translate('Go Back') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.coming-soon-page {
  display: grid;
  min-height: calc(100vh - var(--header-height) - 1rem);
  place-items: center;
  padding: clamp(1.25rem, 4vw, 3rem);
  color: var(--text);
  background:
    radial-gradient(circle at 50% 35%, rgba(3, 98, 66, 0.26), transparent 32rem),
    var(--page);
}

.coming-soon-card {
  width: min(100%, 30rem);
  padding: clamp(1.5rem, 5vw, 3rem);
  border: 1px solid rgba(50, 212, 154, 0.24);
  border-radius: 1rem;
  text-align: center;
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(14px);
}

.status-icon {
  display: inline-grid;
  position: relative;
  width: 4rem;
  height: 4rem;
  place-items: center;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(50, 212, 154, 0.34);
  border-radius: 50%;
  color: var(--bright);
  background: rgba(3, 98, 66, 0.18);
}

.status-icon svg:last-child {
  position: absolute;
  top: 0.25rem;
  right: 0.1rem;
  color: #ffe56a;
}

.coming-soon-card nav {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--secondary);
  font-size: 0.72rem;
  gap: 0.45rem;
}

.coming-soon-card nav a:hover {
  color: var(--bright);
}

.eyebrow {
  margin: 0;
  color: var(--bright);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.coming-soon-card h1 {
  margin: 0.55rem 0 0;
  font-size: clamp(2rem, 7vw, 3.5rem);
  line-height: 1;
  letter-spacing: -0.045em;
}

.description {
  max-width: 24rem;
  margin: 1rem auto 0;
  color: var(--secondary);
  font-size: clamp(0.82rem, 2vw, 1rem);
  line-height: 1.6;
}

.page-actions {
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.page-actions a,
.page-actions button {
  display: inline-flex;
  min-height: 2.6rem;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  border: 1px solid rgba(50, 212, 154, 0.35);
  border-radius: 0.55rem;
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  background: #076f4c;
  gap: 0.45rem;
}

.page-actions button {
  color: var(--text);
  background: transparent;
}

.page-actions a:hover,
.page-actions button:hover {
  border-color: var(--bright);
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: no-preference) {
  .coming-soon-card {
    animation: card-enter 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .status-icon {
    animation: icon-enter 520ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
  }
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes icon-enter {
  from {
    opacity: 0;
    transform: scale(0.88);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
