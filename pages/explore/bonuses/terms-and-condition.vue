<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'
import { PROMOTIONS } from '~/data/promotions'

const route = useRoute()
const pageTitle = 'Terms and Conditions for Promotion'
const backPath = computed(() => {
  const slug = typeof route.query.promotion === 'string' ? route.query.promotion : ''
  return PROMOTIONS.some(item => item.slug === slug)
    ? `/bonus/${slug}`
    : '/bonuses'
})

const terms = [
  'All offer is restricted to only one free open account per individual, family, household address, email address, telephone number, bank account and IP address.',
  'Our offers are intended for recreational players only and 2bet may in our sole discretion limit the eligibility of customers to participate in any promotion.',
  'We reserve the right to alter, amend or terminate this Promotion, or any aspect of it, at any time and without prior notice. All 2bet Terms & Conditions and Rules apply.',
  'Only 1 active bonus in each product is allowed.',
  'Rollover must be fulfilled within 30 days to prevent forfeited of Bonus and winning amount.',
  'Zero tolerance for bonus abuse and/or bonus fraud. We are aware of Bonus Abuse & Fraud taking place on our products. In light of that and to protect our genuine customers and to allow us to provide more bonuses for them, the following terms are effective forthwith',
]

const abuseClauses = [
  {
    text: 'Promotions and bonuses are there to reward our valued players – We have a zero tolerance policy on bonus abuse and fraudulent activity. We reserve the right to block bonuses from any player who we deem to be abusing our promotions. If fraudulent activity or abuse is suspected, we reserve the right to remove bonuses and associated winnings from the account and any associated accounts.',
  },
  {
    text: 'The determination of what constitutes bonus abuse shall be at the sole discretion of the company, but for clarity what will be considered evidence of bonus abuse shall include, but not be limited to, the following examples:',
    examples: [
      'Wagering the bonus money on excluded games',
      'Multiple account strategy / proxy account strategy',
      'Cross platform betting strategy',
      'Arbing of bets',
      'Two tier betting strategy',
      'Bonus stacking strategy',
      'Using a VPN or masking IP address',
      'Affiliate CPA or revenue share abuse',
    ],
  },
  {
    text: 'We reserve the right to review transaction records and logs from time to time and for any reason. If, upon review, we discover a player whom has benefited from promotional funds by participating in betting patterns or strategies at our sole discretion deems to be abusive, we reserve the right to withdraw the bonus amount and any associated winnings.',
  },
  {
    text: 'We reserve the right to refuse participation in any promotion, set such eligibility criteria for participation in a promotion as it seems fit and will be the sole judge of all promotions and any disputes relating thereto.',
  },
  {
    text: 'Any person deviating from promotional rules may be disqualified, meaning that the bonus and any associated winnings will be forfeited.',
  },
  {
    text: 'We reserve the right to end or amend any promotion at any time for any reason without giving notice.',
  },
  {
    text: 'Withdrawals may be subject to audit and/or identity verification before being processed. You may be requested to furnish proof of identification, address, age and/or proof of deposit, proof of game play or telephone number. Failure to provide this information to us within 72 hours of a request being made may result in the bonus and any associated winnings being withdrawn',
  },
]

useAppSeo({
  title: 'Termos e Condições Gerais das Promoções e Bônus | 2bet',
  description: 'Consulte os requisitos de rollover e regras das promoções da 2bet Brasil. Informações claras para você aproveitar seus bônus com confiança.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Bônus', path: '/bonuses' },
    { name: 'Termos e Condições da Promoção', path: '/bonuses/terms-and-condition' },
  ],
})
</script>

<template>
  <div class="promotion-terms-page">
    <SubpageHeader :title="pageTitle" :back-to="backPath" />
    <article class="promotion-terms-card" lang="en" aria-labelledby="promotion-terms-title">
      <img
        class="promotion-terms-banner"
        src="/brand/about-hero-banner.webp"
        alt="2bet promotion terms banner"
        width="1976"
        height="486"
        decoding="async"
      >
      <h2 id="promotion-terms-title">{{ pageTitle }}</h2>
      <ol class="promotion-terms-list">
        <li v-for="(term, index) in terms" :key="term">
          <p>{{ term }}</p>
          <ul v-if="index === terms.length - 1" class="promotion-abuse-clauses">
            <li v-for="clause in abuseClauses" :key="clause.text">
              <p>{{ clause.text }}</p>
              <ol v-if="clause.examples" class="promotion-abuse-examples">
                <li v-for="example in clause.examples" :key="example">{{ example }}</li>
              </ol>
            </li>
          </ul>
        </li>
      </ol>
    </article>
  </div>
</template>

<style scoped>
.promotion-terms-page { width: 100%; min-width: 0; color: #f4f4f4; }
.promotion-terms-page :deep(.subpage-header--sticky) { top: var(--content-sticky-top, 0px); }
.promotion-terms-card { margin-top: 8px; padding: 36px 28px 28px; border-radius: 15px; background: #121212; }
.promotion-terms-banner { display: block; width: 100%; height: auto; aspect-ratio: 4.55 / 1; object-fit: cover; border-radius: 12px; }
.promotion-terms-card h2 { margin: 24px 0 22px; padding: 12px 16px; border-radius: 8px; color: #fff; background: #242424; font-size: 12px; font-weight: 600; line-height: 16px; }
.promotion-terms-list { margin: 0; padding-left: 20px; list-style: decimal; }
.promotion-terms-list, .promotion-abuse-clauses { font-size: 14px; font-weight: 400; line-height: 21px; text-align: justify; overflow-wrap: break-word; }
.promotion-terms-list p { margin: 0; }
.promotion-terms-list > li + li { margin-top: 20px; }
.promotion-abuse-clauses { margin: 16px 0 0; padding-left: 20px; list-style: disc; }
.promotion-abuse-clauses > li + li { margin-top: 12px; }
.promotion-abuse-examples { margin: 16px 0 0; padding-left: 22px; list-style: none; counter-reset: abuse-example; }
.promotion-abuse-examples > li { position: relative; counter-increment: abuse-example; }
.promotion-abuse-examples > li::before { position: absolute; right: calc(100% + 4px); content: counter(abuse-example, lower-alpha) ')'; }
@media (max-width: 63.99rem) {
  .promotion-terms-card { padding: 20px 16px 24px; }
}
@media (max-width: 479px) {
  .promotion-terms-card { padding: 16px 12px 20px; }
  .promotion-terms-banner { aspect-ratio: 1976 / 486; }
  .promotion-terms-card h2 { margin-top: 20px; }
  .promotion-terms-list, .promotion-abuse-clauses { text-align: left; }
}
</style>
