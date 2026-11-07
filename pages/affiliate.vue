<script setup lang="ts">
import SubpageHeader from '~/components/SubpageHeader.vue'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Link as LinkIcon,
  Mail,
  Network,
  Phone,
  Share2,
} from 'lucide-vue-next'

type AffiliateTabId = 'cooperation' | 'products' | 'advantages' | 'commission' | 'questions' | 'contact'
type QuestionTabId = 'information' | 'share' | 'payment' | 'other'

interface AffiliateTab {
  id: AffiliateTabId
  label: string
}

interface QuestionCategory {
  id: QuestionTabId
  label: string
  title: string
  items: Array<{ question: string, answer: string }>
}

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const { bybetRedirectUrl: bybetBaseUrl, bybetRedirectCode } = runtimeConfig.public
const bybetRedirectUrl = `${bybetBaseUrl}/login?p=${bybetRedirectCode}`
const affiliateSystemUrl = 'https://partnerships.2bet.com/'

const activeTab = ref<AffiliateTabId>('cooperation')
const activeQuestionTab = ref<QuestionTabId>('information')
const expandedAdvantages = ref<Set<string>>(new Set([
  'account',
  'commission',
  'support',
  'payments',
  'communication',
]))
const copiedContact = ref<'phone' | 'email' | null>(null)
let copyResetTimer: ReturnType<typeof setTimeout> | null = null

useAppSeo({
  title: 'Programa de Afiliados Oficial e Comissões Exclusivas | 2bet',
  description: 'Torne-se parceiro da 2bet Brasil e receba até 50% de comissões contínuas. Acompanhe relatórios em tempo real e receba pagamentos pontuais.',
  breadcrumbs: [
    { name: 'Início', path: '/' },
    { name: 'Programa de Afiliados', path: '/affiliate' },
  ],
})

const affiliateTabs: AffiliateTab[] = [
  { id: 'cooperation', label: 'Cooperation Methods' },
  { id: 'products', label: 'Our Products' },
  { id: 'advantages', label: 'Service Advantages' },
  { id: 'commission', label: 'Commission Program' },
  { id: 'questions', label: 'Affiliate Questions' },
  { id: 'contact', label: 'Contact Us' },
]

const cooperationSteps = [
  { step: 'Step 1', label: 'Get Affiliate Now', icon: LinkIcon, tone: 'red' },
  { step: 'Step 2', label: 'Get Affiliation Promotion Link', icon: Network, tone: 'gold' },
  { step: 'Step 3', label: 'Promote 2Bet on the Internet', icon: Share2, tone: 'green' },
]

const products = [
  { label: 'SPORTS', image: '/images/sports/soccer.webp' },
  { label: 'LIVE CASINO', image: '/images/casino/card1.webp' },
  { label: 'SLOTS', image: '/images/games/popular/gates-of-olympus.webp' },
  { label: 'LOTTERY', image: '/images/games/new-releases/777-strike.webp' },
]

const advantages = [
  {
    id: 'account',
    title: 'Personalized Account Management',
    points: ['Track player activities anytime', 'Receive latest informations', 'Customized service'],
  },
  {
    id: 'commission',
    title: 'Lifetime Commission',
    points: ['Industry-leading 50% commission', 'Players are your fixed assets', 'Earn for life from player bets'],
  },
  {
    id: 'support',
    title: 'Your Reliable Support',
    points: ['Share & Enjoy the Marketing Resource', 'Positive Brand Equity Effects', 'Distinctive Marketing Techniques'],
  },
  {
    id: 'payments',
    title: 'Timely Commission Payments',
    points: ['Outstanding reputation', 'Get Paid At The Beginning Of Month And It Never Delays!', 'Flexible payment options'],
  },
  {
    id: 'communication',
    title: 'Zero Communication Barriers',
    points: ['Account Manager', 'Speak Your Language', 'Understand Your Culture'],
  },
  {
    id: 'fun',
    title: 'Unstoppable Fun',
    points: ['Premium sports and gaming products', 'Fresh campaigns and promotions', 'Entertainment for every player'],
  },
]

const questionCategories: QuestionCategory[] = [
  {
    id: 'information',
    label: 'Information',
    title: 'Information',
    items: [
      {
        question: 'What is 2Bet affiliate program?',
        answer: '2Bet is your business partner. If players successfully sign up as 2Bet players through any of your promotional banners or promotion links and make deposits and valid bets, you can get commission from the net profits from their bets.',
      },
      {
        question: 'Advantages of joining 2Bet affiliate program.',
        answer: '2Bet has been well-known in the industry for more than 10 years with an excellent reputation. Our philosophy is to provide the great games and pay the players on time.\nJoining 2Bet is completely free. You only need to own the promotional websites to receive promotional tools such as advertising banners and affiliate links.\nByBet does have a commission cap. The more players bet, the more profit you will earn. You can earn generous commission from the players you referred anytime. Enjoy your free working hours by working from your home.',
      },
      {
        question: "Can I join even when I don't have my own website?",
        answer: 'Owning your own website is definitely the best way to promote our business. Even without it, we will also provide the promotion links and banners for you. If you have other promotional ideas that you want to share with us, please feel free to contact and discuss with our affiliate team.',
      },
      {
        question: 'What incentive does 2Bet give to affiliates with good performing?',
        answer: 'Your promotional performance is directly proportional to your income. The higher turnover from your players, the more commission. The current commission is tiered, the lowest commission starts at 30% and goes up to 50%. Please Click "Commission System" to discover more in details! Should you have any requests for the commission, please contact our affiliate team to discuss further.',
      },
    ],
  },
  {
    id: 'share',
    label: 'Share',
    title: 'Share',
    items: [
      {
        question: 'Which promotional links can I use to promote 2Bet?',
        answer: 'After you have successfully registered as an affiliate, you need to log in to the 2Bet affiliate page to view your own promotional link.',
      },
      {
        question: 'Can I use the 2Bet logo and its other content on my website?',
        answer: "Once you join our affiliate program, you will use only the promotional links we provide. You are not allowed to make any changes to the content without the 2Bet's permission.",
      },
      {
        question: 'Where should I put the promotional link and pictures on my website?',
        answer: 'You can place promotional banners and links on your website or other high-traffic pages in order to bring more referrals. You can also contact our affiliate department to work out the best promotion plan.',
      },
      {
        question: 'How does 2Bet know that players came through my website?',
        answer: 'If a player registers through your promotional link, the 2Bet system will automatically record the source of this registration and it will also display player information on affiliate panel. Through this process, we can easily trace down where the player came from.',
      },
    ],
  },
  {
    id: 'payment',
    label: 'Commission Payment',
    title: 'Commission Payment',
    items: [
      {
        question: 'How do I earn commission?',
        answer: 'Once you put our promotional links on your website and when the users click on the 2Bet promotional banners/link or visit our website through email, register, deposit and play to become valid players, you can earn commission from the net profit generated by the players you referred. The more referrals you get to us, the more income you will generate.',
      },
      {
        question: 'What is a valid player?',
        answer: 'A valid player is someone who successfully signed up and played betting more than PHP20.',
      },
      {
        question: 'How to calculate the joint commission?',
        answer: 'The affiliate commission is calculated according to the commission plan. Commission settlement must meet 2 conditions: The number of valid players and net profit value. The extent of these two conditions is related to the percentage of commission. For more details, please refer to the affiliate plan.',
      },
    ],
  },
  {
    id: 'other',
    label: 'Other Questions',
    title: 'Other Questions',
    items: [
      {
        question: "I'm not sure if my referral link is working fine or not. How do I know if my referrals are working?",
        answer: 'You can log in to the 2Bet agent panel and click on the promotion URL to check whether your exclusive link is displayed normally. In addition, you can view your referred member registration status. Should you have any questions, please contact our 24/7 customer service.',
      },
      {
        question: 'What can I do if I forgot my password?',
        answer: 'Please log in to the affiliate page, click on "Forgot Password" and enter affiliate account and password verification to reset password.',
      },
      {
        question: 'How to change my account information?',
        answer: 'For security, please contact our 24/7 customer service and provide the account information to proceed further verification.',
      },
      {
        question: 'How do I change my bank information?',
        answer: 'Log in the affiliate panel and click "Funds Management" to change the bank for online withdrawal.',
      },
      {
        question: 'Can you provide more information about the members I referred?',
        answer: 'For security reason, 2Bet will not provide any personal information. We will guarantee the security and privacy of personal information both for agents and players. In order to help the affiliate manage and track the downline members better, the affiliate page shows their betting activities.',
      },
      {
        question: 'Does 2Bet accept global partnership?',
        answer: 'We welcome the partners from all around the world. If you are interested in working with us, you can directly log in our website or contact our affiliate team to learn more about the partnership.',
      },
    ],
  },
]

const activeQuestionCategory = computed(() => (
  questionCategories.find(category => category.id === activeQuestionTab.value) ?? questionCategories[0]
))

const handleBack = (): void => {
  if (import.meta.client && window.history.length > 1) {
    router.back()
    return
  }

  router.push('/explore/account/me')
}

const toggleAdvantage = (id: string): void => {
  const nextExpanded = new Set(expandedAdvantages.value)
  if (nextExpanded.has(id)) {
    nextExpanded.delete(id)
  } else {
    nextExpanded.add(id)
  }
  expandedAdvantages.value = nextExpanded
}

const copyContact = async (type: 'phone' | 'email', value: string): Promise<void> => {
  if (!import.meta.client) return

  try {
    await navigator.clipboard.writeText(value)
    copiedContact.value = type
    if (copyResetTimer) clearTimeout(copyResetTimer)
    copyResetTimer = setTimeout(() => {
      copiedContact.value = null
    }, 1800)
  } catch {
    copiedContact.value = null
  }
}

onBeforeUnmount(() => {
  if (copyResetTimer) clearTimeout(copyResetTimer)
})
</script>

<template>
  <div class="affiliate-page">
    <SubpageHeader
      title="Affiliate"
      back-to="/explore/account/me"
      class="mb-1.5 sm:mb-2.5"
    />

    <div class="affiliate-content-container px-2 sm:px-0">
      <nav class="affiliate-tabs" aria-label="Affiliate sections" role="tablist">
        <button
          v-for="tab in affiliateTabs"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :class="{ 'affiliate-tab--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>

      <main class="affiliate-main">
      <section v-if="activeTab === 'cooperation'" class="affiliate-panel affiliate-cooperation">
        <div class="affiliate-hero">
          <div class="affiliate-hero-copy">
            <h2>Provide highest commission rate<br>to make big money easily!</h2>
            <p>Get up to 50% commission every month</p>
          </div>
          <div class="affiliate-hero-rate"><strong>50</strong><span>%</span></div>
        </div>

        <div class="cooperation-card">
          <h2>「Earn for life」 on your 「player bets」!</h2>
          <ol class="cooperation-steps">
            <li v-for="step in cooperationSteps" :key="step.step">
              <span class="step-icon" :class="`step-icon--${step.tone}`">
                <component :is="step.icon" :size="24" />
              </span>
              <span>
                <strong>{{ step.step }}</strong>
                <small>{{ step.label }}</small>
              </span>
            </li>
          </ol>
          <div class="cooperation-description">
            <strong>Complete three easy steps to start earning high commission!</strong>
            <p>2Bet has been well-known in the industry for more than 10 years with excellent reputation. Players able to use all types of smart devices to enjoy the excellent gaming experience, is a reliable guarantee for your profit. A well-designed commission system makes it easier for you to make money. Get up to 50% commission every month.</p>
          </div>
        </div>

        <div class="affiliate-actions">
          <a :href="bybetRedirectUrl" target="_blank" rel="noopener noreferrer" class="affiliate-action affiliate-action--primary">Apply Now</a>
          <a :href="affiliateSystemUrl" target="_blank" rel="noopener noreferrer" class="affiliate-action">Affiliate System</a>
        </div>
      </section>

      <section v-else-if="activeTab === 'products'" class="affiliate-panel products-panel">
        <div class="affiliate-surface">
          <h2 class="section-label">Games</h2>
          <div class="product-grid">
            <article v-for="product in products" :key="product.label" class="product-card">
              <span>{{ product.label }}</span>
              <img :src="product.image" :alt="product.label" loading="lazy">
            </article>
          </div>
          <p class="products-copy">
            2Bet integrates premium gaming resources from around the world and is committed to delivering a secure, professional, and seamless entertainment experience. No matter which device players use, we strive to provide a high-quality gaming experience at every touchpoint.<br>
            As a platform licensed by the Philippine Amusement and Gaming Corporation (PAGCOR), 2Bet provides partners with a compliant and reliable foundation for building strong and sustainable business relationships.
          </p>
        </div>
      </section>

      <section v-else-if="activeTab === 'advantages'" class="affiliate-panel advantages-panel">
        <article v-for="advantage in advantages" :key="advantage.id" class="advantage-card">
          <button type="button" :aria-expanded="expandedAdvantages.has(advantage.id)" @click="toggleAdvantage(advantage.id)">
            <strong>{{ advantage.title }}</strong>
            <ChevronUp v-if="expandedAdvantages.has(advantage.id)" :size="16" />
            <ChevronDown v-else :size="16" />
          </button>
          <ul v-if="expandedAdvantages.has(advantage.id)">
            <li v-for="point in advantage.points" :key="point">{{ point }}</li>
          </ul>
        </article>
        <p class="advantages-note">2Bet provides multi-gradient rebates. The more profit your downline players generate on the platform, the more commissions you can receive. Please refer to the details shown on your management centre.</p>
      </section>

      <section v-else-if="activeTab === 'commission'" class="affiliate-panel">
        <div class="affiliate-surface commission-panel">
          <span class="commission-flag" aria-label="Brasil"><img
                src="/icons/PHP.webp"
                alt="2Bet"
                class="h-7 sm:h-5 w-auto object-contain"
                loading="lazy"
              /></span>
          <h2>Earn up to 50% commission every month<br>Affiliate Partnership Program</h2>
          <p>Affiliates receive commissions based on a percentage of the monthly net revenue generated from sports betting, online casino, slot games, and other gaming products.</p>

          <h3>Commission Program</h3>
          <p>2Bet Commissions will be calculated as a percentage based on the monthly net income of sports betting, live dealers, slot machines and lotteries. Net income is defined as: the company's gross profit from sports betting, live dealers, slot machines and lotteries minus customer transaction costs, wrong payment collection, taxes, platform fees, bonuses and other rewards, etc. Referral fees and commissions are calculated based on 2Bet statistical methods and data collection methods.</p>

          <div class="commission-table-wrap">
            <table class="commission-table">
              <thead>
                <tr><th>Valid Members of the Month</th><th>Monthly Profit</th><th>Commission %</th></tr>
              </thead>
              <tbody>
                <tr><td>≥5</td><td>10000~300000</td><td>30%</td></tr>
                <tr><td>≥20</td><td>300001~60000000</td><td>40%</td></tr>
                <tr><td>≥50</td><td>above60000001</td><td>50%</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Definition of Valid Members</h3>
          <p>Members are encouraged to make a minimum deposit of PHP 20 or more and place valid bets of at least PHP 20 within the monthly settlement period. If the agent does not reach the minimum 5 members of [Monthly Minimum Valid Member] on the current month, commissions cannot be calculated. Your agency account losses are borne by the company, and you don't have to bear the risk of customer wins or losses. Monthly commissions are calculated based on the total profits of all games, and commissions are settled on the 7th of every month. All your withdrawals will reach your designated bank account within 3 working days. The above calculation method is for reference only, please refer to the detailed regulations for details.</p>

          <h3>Commission Pay</h3>
          <p>Affiliate commission is calculated from the first day to the last day of the month, according to the bonus system of affiliate program. After deducting the member bonus and administrative expenses, the commission is paid to the affiliates. After the customer service confirms the amount with them on 2nd or 3rd of each month, the commission will be directly deposited into their bank accounts on 5th. The monthly performance of the affiliates will be reset to zero after this settlement. The above calculation method is for reference only, and please refer to the specific regulations.</p>
        </div>
      </section>

      <section v-else-if="activeTab === 'questions'" class="affiliate-panel questions-panel">
        <nav class="question-tabs" aria-label="Affiliate question categories" role="tablist">
          <button
            v-for="category in questionCategories"
            :key="category.id"
            type="button"
            role="tab"
            :aria-selected="activeQuestionTab === category.id"
            :class="{ 'question-tab--active': activeQuestionTab === category.id }"
            @click="activeQuestionTab = category.id"
          >
            {{ category.label }}
          </button>
        </nav>
        <div class="affiliate-surface questions-content">
          <h2>{{ activeQuestionCategory.title }}</h2>
          <article v-for="item in activeQuestionCategory.items" :key="item.question">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </section>

      <section v-else class="affiliate-panel">
        <div class="affiliate-surface contact-panel">
          <h2>Contact Us</h2>
          <p class="contact-intro">Let’s shape a great future together, beginning now. Have questions? Just get in touch!</p>
          <div class="contact-row">
            <span class="contact-icon contact-icon--phone"><Phone :size="25" fill="currentColor" /></span>
            <span class="contact-copy"><strong>Agent Phone</strong><small>09176861888</small></span>
            <button type="button" @click="copyContact('phone', '09176861888')">
              <Check v-if="copiedContact === 'phone'" :size="15" />
              <Copy v-else :size="15" />
              {{ copiedContact === 'phone' ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <div class="contact-row">
            <span class="contact-icon contact-icon--email"><Mail :size="25" /></span>
            <span class="contact-copy"><strong>Agent Email</strong><small>partnerships@2bet.com</small></span>
            <button type="button" @click="copyContact('email', 'partnerships@2bet.com')">
              <Check v-if="copiedContact === 'email'" :size="15" />
              <Copy v-else :size="15" />
              {{ copiedContact === 'email' ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
      </section>
    </main>
    </div>
  </div>
</template>

<style scoped>
.affiliate-page {
  display: flex;
  min-width: 0;
  min-height: calc(100vh - var(--header-height));
  flex-direction: column;
  padding: 0;
  color: #f5f5f5;
  background: #000;
}

@media (min-width: 64rem) {
  .affiliate-page {
    padding: 0 4px;
  }
}

.affiliate-tabs,
.affiliate-surface,
.cooperation-card,
.advantage-card,
.question-tabs {
  background: #151515;
}

.affiliate-titlebar {
  display: flex;
  min-height: 45px;
  align-items: center;
  border-radius: 12px;
  padding: 5px 12px;
  gap: 10px;
}

.affiliate-titlebar h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.affiliate-back {
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: #00a97a;
  background: #10211c;
  cursor: pointer;
}

.affiliate-tabs {
  display: flex;
  min-height: 48px;
  align-items: center;
  margin-top: 8px;
  overflow-x: auto;
  border-radius: 12px;
  padding: 7px 12px;
  scrollbar-width: none;
  gap: 7px;
}

.affiliate-tabs::-webkit-scrollbar {
  display: none;
}

.affiliate-tabs button {
  flex: 0 0 auto;
  min-height: 32px;
  border: 0;
  border-radius: 18px;
  padding: 6px 13px;
  color: #f1f1f1;
  font-size: 14px;
  font-weight: 700;
  background: transparent;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;
}

.affiliate-tabs button:hover,
.affiliate-tabs .affiliate-tab--active {
  color: #fff;
  background: #007554;
}

.affiliate-main,
.affiliate-panel {
  min-width: 0;
}

.affiliate-panel {
  padding-top: 8px;
}

.affiliate-cooperation {
  display: grid;
  gap: 8px;
}

.affiliate-hero {
  display: flex;
  position: relative;
  min-height: 160px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 12px;
  padding: 24px 32px;
  background: linear-gradient(90deg, rgba(12, 24, 31, 0.52), rgba(79, 52, 7, 0.22)), url('/hero/promotions.webp') center 58% / cover no-repeat;
}

.affiliate-hero::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(90deg, rgba(206, 217, 228, 0.36), transparent 42%, rgba(0, 0, 0, 0.08));
  pointer-events: none;
}

.affiliate-hero-copy,
.affiliate-hero-rate {
  position: relative;
  z-index: 1;
}

.affiliate-hero h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.2;
}

.affiliate-hero p {
  margin: 20px 0 0;
  font-size: 13px;
}

.affiliate-hero-rate {
  display: flex;
  align-items: flex-end;
  padding-right: 2px;
  line-height: 1;
}

.affiliate-hero-rate strong {
  font-size: 78px;
  font-weight: 300;
}

.affiliate-hero-rate span {
  padding-bottom: 9px;
  font-size: 29px;
}

.cooperation-card {
  border-radius: 12px;
  padding: 12px;
}

.cooperation-card > h2 {
  margin: 0 0 17px;
  text-align: center;
  font-size: 17px;
  font-weight: 750;
  letter-spacing: 0.06em;
}

.cooperation-steps {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 9px;
}

.cooperation-steps li {
  display: flex;
  align-items: center;
  gap: 15px;
}

.step-icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  color: #111;
}

.step-icon--red { background: #d92931; }
.step-icon--gold { background: #ffab00; }
.step-icon--green { background: #20c79b; }

.cooperation-steps strong,
.cooperation-steps small {
  display: block;
}

.cooperation-steps strong {
  margin-bottom: 2px;
  font-size: 14px;
}

.cooperation-steps small {
  color: #949494;
  font-size: 14px;
}

.cooperation-description {
  margin-top: 14px;
  border-top: 1px solid #555;
  padding-top: 14px;
}

.cooperation-description strong {
  font-size: 14px;
}

.cooperation-description p,
.products-copy,
.commission-panel > p,
.questions-content p,
.advantages-note {
  color: #929292;
  font-size: 12px;
  line-height: 1.38;
}

.cooperation-description p {
  margin: 6px 0 0;
}

.affiliate-actions {
  display: grid;
  width: min(592px, 100%);
  margin: 12px auto 0;
  gap: 12px;
}

.affiliate-action {
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  background: #303030;
  transition: filter 150ms ease, transform 150ms ease;
}

.affiliate-action:hover {
  filter: brightness(1.12);
  transform: translateY(-1px);
}

.affiliate-action--primary {
  background: #007554;
}

.affiliate-surface {
  border-radius: 12px;
  padding: 12px;
}

.section-label {
  margin: 0 0 20px;
  font-size: 16px;
}

.product-grid {
  display: grid;
  width: min(500px, 100%);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.product-card {
  position: relative;
  aspect-ratio: 0.74;
  overflow: hidden;
  border-radius: 12px;
  background: #252525;
}

.product-card::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.34), transparent 34%, rgba(0, 0, 0, 0.18));
}

.product-card span {
  position: absolute;
  z-index: 2;
  top: 14px;
  left: 16px;
  font-size: 13px;
}

.product-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.products-copy {
  margin: 26px 0 0;
}

.advantages-panel {
  display: grid;
  gap: 8px;
}

.advantage-card {
  overflow: hidden;
  border-radius: 12px;
}

.advantage-card button {
  display: flex;
  width: 100%;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  border: 0;
  padding: 9px 12px;
  color: #f4f4f4;
  background: transparent;
  cursor: pointer;
}

.advantage-card button strong {
  font-size: 14px;
}

.advantage-card button svg {
  color: #979797;
}

.advantage-card ul {
  display: grid;
  margin: 0;
  padding: 0 12px 11px;
  color: #909090;
  font-size: 12px;
  list-style: none;
  gap: 8px;
}

.advantages-note {
  margin: 0;
}

.commission-panel {
  position: relative;
  padding: 14px 12px 12px;
}

.commission-panel > h2,
.questions-content > h2,
.contact-panel > h2 {
  margin: 0;
  text-align: center;
  font-size: 18px;
  line-height: 1.45;
}

.commission-panel > p {
  margin: 17px 0;
}

.commission-panel h3 {
  margin: 16px 0 7px;
  font-size: 14px;
}

.commission-flag {
  position: absolute;
  top: 25px;
  right: 20px;
  font-size: 28px;
}

.commission-table-wrap {
  overflow-x: auto;
  border-radius: 12px;
  padding: 8px;
  background: #000;
}

.commission-table {
  width: 100%;
  min-width: 590px;
  border-collapse: separate;
  border-spacing: 0 8px;
  color: #909090;
  font-size: 12px;
}

.commission-table th {
  padding: 3px 12px;
  color: #fff;
  text-align: left;
  font-size: 12px;
}

.commission-table th:nth-child(2),
.commission-table td:nth-child(2) {
  text-align: center;
}

.commission-table th:last-child,
.commission-table td:last-child {
  text-align: right;
}

.commission-table td {
  padding: 12px;
  background: #171717;
}

.commission-table td:first-child {
  border-radius: 11px 0 0 11px;
}

.commission-table td:last-child {
  border-radius: 0 11px 11px 0;
}

.question-tabs {
  display: grid;
  min-height: 44px;
  align-items: center;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-radius: 12px;
  padding: 5px 22px;
}

.question-tabs button {
  position: relative;
  border: 0;
  padding: 9px 6px;
  color: #f0f0f0;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
}

.question-tabs button::after {
  position: absolute;
  bottom: 3px;
  left: 50%;
  width: 0;
  height: 2px;
  content: '';
  background: #fff;
  transform: translateX(-50%);
  transition: width 150ms ease;
}

.question-tabs .question-tab--active {
  font-weight: 700;
}

.question-tabs .question-tab--active::after {
  width: 68px;
}

.questions-content {
  margin-top: 8px;
}

.questions-content article {
  margin-top: 15px;
}

.questions-content h3 {
  margin: 0 0 6px;
  font-size: 14px;
}

.questions-content p {
  margin: 0;
  white-space: pre-line;
}

.contact-panel {
  padding: 11px 12px 0;
}

.contact-intro {
  margin: 20px 0 14px;
  color: #929292;
  font-size: 14px;
}

.contact-row {
  display: flex;
  min-height: 73px;
  align-items: center;
  border-top: 1px solid #050505;
  gap: 12px;
}

.contact-icon {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 7px;
  color: #fff;
}

.contact-icon--phone { background: #3bbf2c; }
.contact-icon--email { background: #3695f5; }

.contact-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.contact-copy strong {
  font-size: 14px;
}

.contact-copy small {
  color: #929292;
  font-size: 12px;
}

.contact-row button {
  display: flex;
  min-width: 68px;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 18px;
  padding: 7px 12px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  background: #000;
  cursor: pointer;
  gap: 5px;
}

.affiliate-regulatory {
  display: flex;
  min-height: 260px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: auto;
  padding: 42px 12px 20px;
  text-align: center;
  gap: 14px;
}

.regulatory-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.regulatory-logos img:first-child {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.regulatory-logos img:last-child {
  width: 184px;
  height: 66px;
  border-radius: 9px;
  image-rendering: auto;
}

.regulatory-links {
  display: flex;
  justify-content: center;
  color: #f01818;
  font-size: 10px;
  font-weight: 700;
  gap: 15px;
}

.affiliate-regulatory > strong {
  color: #145bc1;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.45;
}

.regulatory-hotline {
  width: 126px;
  height: 69px;
  object-fit: contain;
}

@media (min-width: 768px) {
  .products-panel .affiliate-surface {
    min-height: 320px;
  }

  .questions-content {
    min-height: 280px;
  }

  .contact-panel {
    min-height: 235px;
  }
}

@media (max-width: 767px) {
  .affiliate-page {
    padding: 0;
  }

  .affiliate-titlebar,
  .affiliate-tabs,
  .affiliate-hero,
  .cooperation-card,
  .affiliate-surface,
  .advantage-card,
  .question-tabs {
    border-radius: 9px;
  }

  .affiliate-titlebar {
    min-height: 43px;
  }

  .affiliate-tabs {
    padding-inline: 7px;
  }

  .affiliate-tabs button {
    padding-inline: 11px;
    font-size: 12px;
  }

  .affiliate-hero {
    min-height: 132px;
    padding: 18px;
  }

  .affiliate-hero h2 {
    font-size: 16px;
  }

  .affiliate-hero p {
    margin-top: 13px;
    font-size: 11px;
  }

  .affiliate-hero-rate strong {
    font-size: 52px;
  }

  .affiliate-hero-rate span {
    padding-bottom: 5px;
    font-size: 21px;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .product-card {
    aspect-ratio: 1.1;
  }

  .commission-flag {
    top: 16px;
    right: 12px;
    font-size: 20px;
  }

  .commission-panel > h2 {
    padding-inline: 24px;
    font-size: 15px;
  }

  .question-tabs {
    padding-inline: 4px;
  }

  .question-tabs button {
    font-size: 10px;
  }

  .question-tabs .question-tab--active::after {
    width: 48px;
  }

  .regulatory-logos img:first-child {
    width: 68px;
    height: 68px;
  }

  .regulatory-logos img:last-child {
    width: 154px;
    height: 55px;
  }
}

@media (max-width: 479px) {
  .affiliate-hero-rate {
    align-self: flex-end;
  }

  .affiliate-hero-rate strong {
    font-size: 42px;
  }

  .cooperation-card > h2 {
    font-size: 14px;
  }

  .affiliate-actions {
    margin-top: 6px;
  }

  .affiliate-action {
    min-height: 48px;
  }

  .contact-row button svg {
    display: none;
  }

  .regulatory-links {
    flex-direction: column;
    gap: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .affiliate-tabs button,
  .affiliate-action,
  .question-tabs button::after {
    transition: none;
  }
}
</style>
