import type { PromotionItem } from '~/data/promotions'

/** Currency codes are assigned explicitly; missing assignments stay unassigned. */
export const getBonusPaymentCodes = (promotion: Pick<PromotionItem, 'paymentMethods'>): string[] => (
  [...new Set((promotion.paymentMethods || []).map(code => code.trim().toUpperCase()).filter(Boolean))]
)

export const filterBonusesByPayment = (items: PromotionItem[], currency: string): PromotionItem[] => (
  currency === 'all'
    ? items
    : items.filter(item => getBonusPaymentCodes(item).includes(currency.toUpperCase()))
)

export const getUnassignedBonuses = (items: PromotionItem[]): PromotionItem[] => (
  items.filter(item => getBonusPaymentCodes(item).length === 0)
)
