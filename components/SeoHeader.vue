<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'
import { formatSeoTitle, formatSeoDescription, isHomepageRoute } from '~/composables/useAppSeo'

interface Props {
  title: string
  metaTitle?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'book' | 'profile'
  backTo?: string
  showBack?: boolean
  showFlag?: boolean
  sticky?: boolean
  customClass?: string
  includeSiteName?: boolean
  includeCheckMore?: boolean
  robots?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  keywords: undefined,
  ogImage: '/brand/2bet-logo.webp',
  showBack: true,
  showFlag: true,
  sticky: false,
  customClass: '',
  includeSiteName: undefined,
  includeCheckMore: undefined,
  robots: undefined,
})

const emit = defineEmits<{
  (e: 'back'): void
}>()

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { locale, translate } = useSiteLocale()

const siteName = computed(() =>
  String(config.public.siteName || '2bet')
    .trim()
    .replace(/^['"]+|['"]+$/g, ''),
)
const siteUrl = computed(() => String(config.public.siteUrl || 'https://2bet.com').replace(/\/+$/, ''))

const isHomepage = computed(() => isHomepageRoute(route.path))

const shouldIncludeSiteName = computed(() => {
  if (typeof props.includeSiteName === 'boolean') {
    return props.includeSiteName
  }
  return !isHomepage.value
})

const shouldIncludeCheckMore = computed(() => {
  if (typeof props.includeCheckMore === 'boolean') {
    return props.includeCheckMore
  }
  return false
})

const displayTitle = computed(() => translate(props.title))

// Only override page-level useAppSeo metadata when explicit metaTitle or description props are passed
if (props.metaTitle || props.description) {
  const fullTitle = computed(() => {
    return formatSeoTitle(props.metaTitle || props.title, siteName.value, shouldIncludeSiteName.value, locale.value)
  })

  const fullDescription = computed(() => {
    return formatSeoDescription(
      props.description,
      siteName.value,
      isHomepage.value,
      shouldIncludeCheckMore.value,
      locale.value,
    )
  })

  const keywords = computed(() => {
    if (props.keywords) return props.keywords
    if (locale.value === 'pt') {
      return `${siteName.value}, apostas esportivas, cassino online, slots, cassino ao vivo, jogos online`
    }
    return `${siteName.value}, sports betting, online casino, slots, live casino, Brasil gaming`
  })

  const robots = computed(() => {
    if (props.robots) return props.robots
    return config.public.indexFollow ? 'index, follow' : 'noindex, nofollow'
  })

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    ogSiteName: siteName,
    description: fullDescription,
    ogDescription: fullDescription,
    keywords,
    ogImage: () => props.ogImage,
    ogType: () => props.ogType || 'website',
    twitterTitle: fullTitle,
    twitterDescription: fullDescription,
    twitterImage: () => props.ogImage,
    twitterCard: 'summary_large_image',
    robots,
  })
}

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: `${siteUrl.value}${route.path}`,
    },
  ],
}))

const handleBack = (): void => {
  emit('back')
  if (props.backTo) {
    router.push(props.backTo)
    return
  }
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div
    v-if="sticky"
    class="seo-header-sticky-wrapper sticky-header-seal sticky top-[var(--content-sticky-top)] z-20 -mx-1 p-0 pb-1 rounded-t-xl"
  >
    <header
      class="seo-header flex items-center justify-between  rounded-lg bg-[#1f1f1f] px-2.5  shadow-sm select-none"
      :class="customClass"
    >
      <!-- Left: Back Button & Title -->
      <div class="flex items-center gap-1.5 min-w-0">
        <button
          v-if="showBack"
          type="button"
          class="flex items-center justify-center h-6 w-6 bg-[#141414] rounded-full text-[#1FA779] transition-colors cursor-pointer shrink-0"
          :aria-label="translate('Go back')"
          @click="handleBack"
        >
          <ChevronLeft class="h-3 w-3" />
        </button>

        <!-- Page Title (SEO H1) -->
        <h1 class="text-[16px] font-bold text-white tracking-tight truncate leading-tight">
          <slot name="title">
            {{ displayTitle }}
          </slot>
        </h1>
      </div>

      <slot name="actions" />
    </header>
  </div>

  <header
    v-else
    class="seo-header flex items-center justify-between gap-2 rounded-lg  px-1 py-2 mb-2 shadow-sm select-none"
    :class="customClass"
  >
    <!-- Left: Back Button & Title -->
    <div class="flex items-center gap-1.5 min-w-0">
      <button
        v-if="showBack"
        type="button"
        class="flex items-center justify-center h-6 w-6 bg-[#141414] rounded-full text-[#1FA779] transition-colors cursor-pointer shrink-0"
        :aria-label="translate('Go back')"
        @click="handleBack"
      >
        <ChevronLeft class="h-3 w-3" />
      </button>

      <!-- Page Title (SEO H1) -->
      <h1 class="text-[15px] font-bold text-white tracking-tight truncate leading-tight">
        <slot name="title">
          {{ displayTitle }}
        </slot>
      </h1>
    </div>

    <slot name="actions" />
  </header>
</template>

<style scoped>
.seo-header {
  min-height: 40px;
}
</style>

