export const AFFILIATE_CURRENCY_CODES = ['INR', 'BRL', 'USDT'] as const
export type AffiliateCurrencyCode = typeof AFFILIATE_CURRENCY_CODES[number]

export interface AffiliateCommissionTier {
  validMembers: number
  minimumProfit: number
  maximumProfit: number | null
  commission: number
}

interface AffiliateCommissionProgram {
  title: string[]
  introduction: string[]
  tiers: AffiliateCommissionTier[]
  adjustmentNotice?: string
}

const fiatIntroduction = {
  title: [
    'Your Trusted Agent, Supporting Your Success Every Step!',
    'Professional Service, Efficient Connection, Making Choices Easier!',
  ],
  introduction: [
    '2bet has been a trusted name in the industry for over a decade, earning an outstanding reputation. Whether you play on a mobile phone, tablet, laptop, or desktop, you can enjoy a seamless and stable gaming experience, ensuring both fun and profits.',
    'Our carefully designed high-return commission system makes earnings easier, with monthly commissions of up to 55%, creating a true win-win partnership!',
  ],
}

export const AFFILIATE_COMMISSION_PROGRAMS: Record<AffiliateCurrencyCode, AffiliateCommissionProgram> = {
  INR: {
    ...fiatIntroduction,
    tiers: [
      { validMembers: 5, minimumProfit: 100, maximumProfit: 150000, commission: 30 },
      { validMembers: 15, minimumProfit: 150001, maximumProfit: 7000000, commission: 35 },
      { validMembers: 30, minimumProfit: 7000001, maximumProfit: 45000000, commission: 45 },
      { validMembers: 50, minimumProfit: 45000001, maximumProfit: 9999999999, commission: 55 },
    ],
  },
  BRL: {
    ...fiatIntroduction,
    tiers: [
      { validMembers: 5, minimumProfit: 1, maximumProfit: 10000, commission: 30 },
      { validMembers: 15, minimumProfit: 10001, maximumProfit: 500000, commission: 35 },
      { validMembers: 30, minimumProfit: 500001, maximumProfit: 3000000, commission: 45 },
      { validMembers: 50, minimumProfit: 3000001, maximumProfit: 9999999999, commission: 55 },
    ],
  },
  USDT: {
    title: ['Partner with 2bet to build a prosperous future together'],
    introduction: [
      'With over 10 years of experience in the industry, 2bet has established a strong reputation through its stable system and high-quality services. The platform supports mobile phones, tablets, laptops, and desktop computers, providing a seamless and reliable multi-device experience.',
      'In addition, 2bet offers an efficient commission system that helps partners steadily grow their earnings, with up to 55% in monthly commission returns.',
    ],
    adjustmentNotice: 'The commission rate will be automatically adjusted based on the monthly net profit. Once the required number of active members and profit targets are achieved, revenue will be settled according to the corresponding tiered commission structure.',
    tiers: [
      { validMembers: 5, minimumProfit: 1, maximumProfit: 40000, commission: 30 },
      { validMembers: 10, minimumProfit: 40001, maximumProfit: 150000, commission: 35 },
      { validMembers: 15, minimumProfit: 150001, maximumProfit: 300000, commission: 40 },
      { validMembers: 25, minimumProfit: 300001, maximumProfit: 500000, commission: 45 },
      { validMembers: 35, minimumProfit: 500001, maximumProfit: 1000000, commission: 50 },
      { validMembers: 50, minimumProfit: 1000001, maximumProfit: null, commission: 55 },
    ],
  },
}

export const AFFILIATE_COMMISSION_DESCRIPTION = "2bet Commissions will be calculated as a percentage based on the monthly net income of sports betting, live dealers, slot machines and lotteries. Net income is defined as: the company's gross profit from sports betting, live dealers, slot machines and lotteries minus customer transaction costs, wrong payment collection, taxes, platform fees, bonuses and other rewards, etc. Referral fees and commissions are calculated based on 2bet statistical methods and data collection methods."

export const AFFILIATE_VALID_MEMBERS_DESCRIPTION = "Within the monthly settlement period, members must complete at least 100 USDT in valid deposits and place at least 500 USDT in valid bets to be considered valid members. Agents must have at least 5 valid members per month to qualify for commission. The platform bears the risk associated with the member's wins and losses, and commissions are calculated based on the total net profit from all games for the month and are paid on the 5th of each month. Further details are subject to the platform's regulations."

export const AFFILIATE_COMMISSION_PAY_DESCRIPTION = 'Affiliate commissions are calculated monthly, from the 1st to the last day of each month. Earnings are based on member net profits after deductions of applicable bonuses and administrative fees. Customer service will confirm the settlement amount with agents between the 2nd and 3rd of each month, and payments will be issued to the agent’s registered wallet on the 5th. All monthly performance metrics are reset after settlement. Final terms are subject to the latest affiliate program rules.'

export const isAffiliateCurrencyCode = (code: string): code is AffiliateCurrencyCode =>
  AFFILIATE_CURRENCY_CODES.some(currency => currency === code)

export const formatAffiliateProfitRange = (tier: AffiliateCommissionTier): string =>
  tier.maximumProfit === null
    ? `${tier.minimumProfit} and above`
    : `${tier.minimumProfit}~${tier.maximumProfit}`
