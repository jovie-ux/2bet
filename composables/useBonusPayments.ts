import { BONUS_CURRENCIES } from '~/data/bonus-currencies'
import { type PromotionItem } from '~/data/promotions'
import { filterBonusesByPayment } from '~/utils/bonus-payments'

export const useBonusPayments = () => {
  const selectedCurrency = useState<string>('bonus-payment-currency', () => 'all')
  const selectedCurrencyLabel = computed(() => (
    BONUS_CURRENCIES.find(currency => currency.code === selectedCurrency.value)?.label || 'All'
  ))

  const filterPromotions = (items: PromotionItem[]): PromotionItem[] => (
    filterBonusesByPayment(items, selectedCurrency.value)
  )

  return { selectedCurrency, selectedCurrencyLabel, filterPromotions }
}
