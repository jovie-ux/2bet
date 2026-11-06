/**
 * Currency conversion and winning generation for Winners Lists.
 * Focuses on winnings in the range of 100 USD to 1,000 USD.
 * If another currency is used, it converts from USD to the selected currency.
 */

export const USD_EXCHANGE_RATES: Readonly<Record<string, number>> = {
  USD: 1.0,
  USDT: 1.0,
  BRL: 5.75, // 1 USD ≈ 5.75 BRL
  PHP: 58.0, // 1 USD ≈ 58.00 PHP
  INR: 84.5, // 1 USD ≈ 84.50 INR
  TRX: 6.25, // 1 USD ≈ 6.25 TRX
}

export const WINNER_CURRENCY_CODES = ['USD', 'USDT', 'BRL', 'PHP', 'INR'] as const
export type WinnerCurrencyCode = (typeof WINNER_CURRENCY_CODES)[number]

export interface ConvertedWinning {
  amount: number
  formatted: string
  currency: string
  usdEquivalent: number
}

/**
 * Converts a base USD amount (between 100 and 1,000 USD) to the target currency.
 */
export function convertUsdToCurrency(
  usdAmount: number,
  currencyCode = 'USD',
): ConvertedWinning {
  const normalizedCode = (currencyCode || 'USD').toUpperCase()
  const rate = USD_EXCHANGE_RATES[normalizedCode] ?? 1.0
  const converted = Math.round(usdAmount * rate * 100) / 100

  const formatted = `${normalizedCode} ${converted.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return {
    amount: converted,
    formatted,
    currency: normalizedCode,
    usdEquivalent: usdAmount,
  }
}

/**
 * Generates a realistic winning amount focused strictly between 100 USD and 1,000 USD.
 * If targetCurrency is omitted, picks from the supported currencies (USD, USDT, BRL, PHP, INR)
 * and converts the USD amount to the selected currency.
 */
export function generateWinnerWinning(
  minUsd = 100,
  maxUsd = 1000,
  targetCurrency?: string,
): string {
  // Focus winning from 100 USD to 1,000 USD
  const baseUsd = Math.round((Math.random() * (maxUsd - minUsd) + minUsd) * 100) / 100
  const currency = targetCurrency || WINNER_CURRENCY_CODES[Math.floor(Math.random() * WINNER_CURRENCY_CODES.length)] || 'USD'

  return convertUsdToCurrency(baseUsd, currency).formatted
}

