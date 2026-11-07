<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-vue-next'
import { faqItems, type FaqItem } from '~/data/homepage'

const props = withDefaults(defineProps<{
  faqs?: FaqItem[]
}>(), {
  faqs: () => faqItems,
})

const { translate } = useSiteLocale()

const steps = [
  { title: 'Discover', description: 'Browse our games and features.', to: '/explore/egames/slots', image: '/icons/casino-steps/choose-table.webp' },
  { title: 'Choose', description: 'Find what you love across every category.', to: '/explore/entertainment/live-casino/baccarat', image: '/icons/casino-steps/check-rules.webp' },
  { title: 'Enjoy', description: 'Start exploring here at 2Bet.', to: '/explore/egames/bingo/top', image: '/icons/casino-steps/join-action.webp' },
]
const faqDetails = ref<HTMLDetailsElement[]>([])

function showAllFaqs() {
  faqDetails.value.forEach(detail => { detail.open = true })
}
</script>

<template>
  <div class="homepage-getting-started grid">
    <section class="homepage-start-panel" aria-labelledby="allgames-start-title">
      <p class="help-eyebrow">{{ translate('GET STARTED') }} <span aria-hidden="true" /></p>
      <h2 id="allgames-start-title" class="allgames-section-title">{{ translate('Your next favorite starts here.') }}</h2>
      <p class="getting-started-intro">{{ translate('Explore 2Bet in three simple steps.') }}</p>

      <ol class="getting-started-steps grid" :aria-label="translate('Get started in three steps')">
        <li v-for="(step, index) in steps" :key="step.title" class="min-w-0">
          <NuxtLink :to="step.to" class="getting-started-card">
            <span class="getting-started-icon"><img :src="step.image" :alt="translate(step.title)" width="128" height="128" loading="lazy" decoding="async"></span>
            <div class="getting-started-card-copy">
              <span class="getting-started-number">{{ translate('STEP') }} 0{{ index + 1 }}</span>
              <strong>{{ translate(step.title) }}</strong>
              <p>{{ translate(step.description) }}</p>
            </div>
            <ArrowUpRight class="getting-started-card-arrow" :size="18" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ol>

      <div class="getting-started-actions flex">
        <NuxtLink to="/explore/egames/slots" class="getting-started-explore homepage-primary-action">{{ translate('Explore all games') }} <ArrowRight :size="20" :stroke-width="1.8" aria-hidden="true" /></NuxtLink>
        <p>{{ translate('Choose your experience. Play at your pace.') }}</p>
      </div>
    </section>

    <section class="getting-started-faq" aria-labelledby="allgames-faq-title">
      <p class="help-eyebrow">{{ translate('HERE TO HELP') }} <span aria-hidden="true" /></p>
      <div class="getting-started-faq-heading flex">
        <h2 id="allgames-faq-title" class="allgames-section-title">{{ translate('A little help, before you play.') }}</h2>
        <button type="button" class="getting-started-all-faqs" aria-controls="homepage-faq-list" @click="showAllFaqs">{{ translate('View all FAQs') }} <ArrowUpRight :size="16" aria-hidden="true" /></button>
      </div>
      <div id="homepage-faq-list" class="getting-started-faq-list grid">
        <details
          v-for="(faq, index) in (props.faqs || faqItems)"
          :key="faq.question"
          :ref="(el) => { if (el) faqDetails[index] = el as HTMLDetailsElement }"
          :open="index === 0"
        >
          <summary>
            {{ translate(faq.question) }}
            <span class="getting-started-faq-toggle" aria-hidden="true"><Plus class="faq-plus" :size="22" /><Minus class="faq-minus" :size="22" /></span>
          </summary>
          <p>{{ translate(faq.answer) }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage-getting-started { --help-accent: var(--allgames-accent, #62ddb0); --help-border: var(--allgames-edge, #ffffff14); --help-muted: #a8bcb1; grid-template-columns: minmax(0,1fr); gap: 24px; margin-top: 34px; }
.homepage-getting-started :is(a,button,summary):focus-visible { outline: 2px solid var(--help-accent); outline-offset: 4px; }
.homepage-start-panel,.getting-started-faq { min-width: 0; padding: 28px; border: 1px solid var(--help-border); border-radius: 10px; background: #0e1b14; box-shadow: inset 0 1px 0 #ffffff03; }
.help-eyebrow { display: flex; align-items: center; gap: 12px; color: #FFCB00; font-size: 10px; font-weight: 800; line-height: 1.4; letter-spacing: 1.6px; }
.help-eyebrow>span { width: 28px; height: 1px; background: currentColor; opacity: .55; }
.homepage-getting-started h2 { margin-top: 8px; }
.homepage-start-panel .getting-started-intro { margin-top: 8px; color: var(--help-muted); font-size: 14px; line-height: 1.6; }
.getting-started-steps { grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; margin-top: 24px; padding: 0; list-style: none; }
.getting-started-card { position: relative; display: flex; align-items: center; gap: 18px; min-width: 0; height: 100%; min-height: 172px; padding: 22px 24px 22px 16px; border: 1px solid #ffffff0c; border-radius: 8px; background: radial-gradient(ellipse at 12% 65%,#4fbd8b15,transparent 65%),linear-gradient(115deg,#162b20,#102119); box-shadow: inset 0 1px 0 #ffffff06; transition: border-color .2s,background .2s; }
.getting-started-icon { position: relative; display: grid; place-items: center; flex: 0 0 104px; width: 104px; height: 112px; }
.getting-started-icon::before { content: ''; position: absolute; inset: auto 12% 2px; height: 10px; border-radius: 50%; background: #0005; filter: blur(5px); }
.getting-started-icon img { position: relative; display: block; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 8px 6px #0005); transition: transform .25s ease; }
.getting-started-card-copy { min-width: 0; flex: 1; }
.getting-started-number { display: block; margin-bottom: 7px; color: var(--help-accent); font-size: 10px; font-weight: 800; line-height: 1.4; letter-spacing: 1.4px; font-variant-numeric: tabular-nums; }
.getting-started-card-copy>strong { display: block; color: #f4f7f5; font-family: var(--homepage-display-font); font-size: 24px; font-weight: var(--homepage-display-weight); line-height: 1.2; }
.getting-started-card-copy>p { margin-top: 7px; color: #afc3b8; font-size: 13px; font-weight: var(--homepage-body-weight); line-height: 1.6; }
.getting-started-card-arrow { position: absolute; top: 14px; right: 14px; color: #83b89b; transition: color .2s,transform .2s; }
.getting-started-card:is(:hover,:focus-visible) { border-color: #62ddb04d; background: radial-gradient(ellipse at 12% 65%,#4fbd8b22,transparent 65%),linear-gradient(115deg,#1a3527,#13281e); }
.getting-started-card:is(:hover,:focus-visible) .getting-started-icon img { transform: translateY(-3px); }
.getting-started-card:is(:hover,:focus-visible) .getting-started-card-arrow { color: var(--help-accent); transform: translate(2px,-2px); }
.getting-started-actions { align-items: center; gap: 24px; margin-top: 24px; padding-top: 22px; border-top: 1px solid var(--help-border); }
.getting-started-explore { flex-shrink: 0; }
.getting-started-explore svg { flex-shrink: 0; transition: transform .2s; }
.getting-started-explore:is(:hover,:focus-visible) svg { transform: translateX(3px); }
.getting-started-actions>p { color: var(--help-muted); font-size: 13px; line-height: 1.6; }
.getting-started-faq-heading { align-items: center; justify-content: space-between; gap: 24px; }
.getting-started-all-faqs { display: inline-flex; align-items: center; flex-shrink: 0; gap: 8px; min-height: 44px; color: #FBC800; font-size: 13px; font-weight: 700; line-height: 1.4; transition: color .2s; }
.getting-started-all-faqs:hover { color: #ffffff; text-decoration: underline; text-underline-offset: 4px; }
#allgames-faq-title { scroll-margin-top: calc(var(--header-height) + 20px); }
.getting-started-faq-list { gap: 10px; margin-top: 22px; }
.getting-started-faq-list details { min-width: 0; border: 1px solid var(--help-border); border-radius: 7px; background: #112219; transition: border-color .2s; }
.getting-started-faq-list details[open] { border-color: #62ddb033; }
.getting-started-faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 58px; padding: 12px 18px; border-radius: inherit; color: #e9f1ed; font-size: 14px; font-weight: 700; line-height: 1.5; list-style: none; cursor: pointer; transition: background .2s; }
.getting-started-faq-list summary:hover { background: #62ddb008; }
.getting-started-faq-list summary::-webkit-details-marker { display: none; }
.getting-started-faq-toggle { display: grid; place-items: center; flex-shrink: 0; width: 28px; height: 28px; border: 1px solid #62ddb024; border-radius: 5px; color: var(--help-accent); background: #62ddb009; transition: background .2s; }
.getting-started-faq-list summary:hover .getting-started-faq-toggle { background: #62ddb018; }
.faq-minus,.getting-started-faq-list details[open] .faq-plus { display: none; }
.getting-started-faq-list details[open] .faq-minus { display: block; }
.getting-started-faq-list details>p { padding: 0 64px 18px 18px; color: var(--help-muted); font-size: 14px; line-height: 1.7; }
@media (max-width: 1199px) and (min-width: 701px) {
  .getting-started-card { flex-direction: column; align-items: flex-start; gap: 14px; padding: 20px; }
  .getting-started-icon { flex-basis: auto; width: 88px; height: 88px; }
}
@media (max-width: 700px) {
  .homepage-getting-started { gap: 18px; margin-top: 28px; }
  .homepage-start-panel,.getting-started-faq { padding: 22px 18px; }
  .getting-started-steps { grid-template-columns: minmax(0,1fr); gap: 12px; margin-top: 20px; }
  .getting-started-card { min-height: 136px; gap: 20px; padding: 18px 28px 18px 12px; }
  .getting-started-icon { flex-basis: 86px; width: 86px; height: 94px; }
  .getting-started-card-copy>strong { font-size: 22px; }
  .getting-started-actions { align-items: flex-start; flex-direction: column; gap: 12px; margin-top: 20px; padding-top: 20px; }
  .getting-started-faq-heading { align-items: flex-start; flex-wrap: wrap; gap: 4px 16px; }
  .getting-started-faq-heading h2 { flex: 1 1 260px; }
  .getting-started-faq-list { margin-top: 16px; }
  .getting-started-faq-list summary { padding: 12px; }
  .getting-started-faq-list details>p { padding: 0 48px 16px 12px; }
}
@media (max-width: 359px) {
  .getting-started-card { gap: 12px; }
  .getting-started-icon { flex-basis: 64px; width: 64px; height: 80px; }
  .getting-started-explore { width: 100%; }
}
@media (prefers-reduced-motion: reduce) { .homepage-getting-started * { transition: none !important; } .homepage-getting-started :is(a:hover,a:focus-visible) :is(img,svg) { transform: none; } }
</style>
