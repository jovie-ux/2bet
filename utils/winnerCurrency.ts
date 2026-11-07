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

export const WINNER_CURRENCY_CODES = ['BRL'] as const
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
  currencyCode = 'BRL',
): ConvertedWinning {
  const normalizedCode = (currencyCode || 'BRL').toUpperCase()
  const rate = USD_EXCHANGE_RATES[normalizedCode] ?? 1.0
  const converted = Math.round(usdAmount * rate * 100) / 100

  const symbol = normalizedCode === 'BRL' ? 'R$' : normalizedCode
  const formatted = `${symbol} ${converted.toLocaleString('en-US', {
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
 * Generates a realistic winning amount focused strictly between 100 USD and 1,000 USD,
 * converted to Brazilian Real (BRL).
 */
export function generateWinnerWinning(
  minUsd = 100,
  maxUsd = 1000,
  targetCurrency = 'BRL',
): string {
  // Focus winning from 100 USD to 1,000 USD
  const baseUsd = Math.round((Math.random() * (maxUsd - minUsd) + minUsd) * 100) / 100
  const currency = targetCurrency || 'BRL'

  return convertUsdToCurrency(baseUsd, currency).formatted
}

