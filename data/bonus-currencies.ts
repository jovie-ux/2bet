export type BonusCurrencyCode =
  | 'all' | 'USD' | 'BRL' | 'INR' | 'USDT' | 'BTC' | 'ETH' | 'TRX'
  | 'DOGE' | 'BCH' | 'ETC' | 'AAVE' | 'DASH' | 'DAI' | 'UNI' | 'WBTC'

export interface BonusCurrency {
  code: BonusCurrencyCode
  label: string
  icon: string
}

const svgIcon = (content: string): string => `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">${content}</svg>`,
)}`

const symbolIcon = (background: string, symbol: string): string => svgIcon(
  `<circle cx="12" cy="12" r="12" fill="${background}"/><text x="12" y="17.3" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="white">${symbol}</text>`,
)

export const BONUS_CURRENCIES: BonusCurrency[] = [
  {
    code: 'all', label: 'All',
    icon: svgIcon('<circle cx="12" cy="12" r="12" fill="#00a94f"/><g fill="white"><rect x="5" y="5" width="6" height="6" rx="2.5"/><rect x="13" y="5" width="6" height="6" rx="2.5"/><rect x="5" y="13" width="6" height="6" rx="2.5"/><rect x="13" y="13" width="6" height="6" rx="2.5"/></g>'),
  },
  { code: 'USD', label: 'USD', icon: symbolIcon('#2c9b6d', '$') },
  {
    code: 'BRL', label: 'BRL',
    icon: svgIcon('<circle cx="12" cy="12" r="12" fill="#00a651"/><path d="M12 3 23 12 12 21 1 12Z" fill="#ffdf00"/><circle cx="12" cy="12" r="5.7" fill="#0047ab"/><path d="M6.7 10.6q6.1-.7 10.5 4" fill="none" stroke="white" stroke-width="1.2"/>'),
  },
  {
    code: 'INR', label: 'INR',
    icon: svgIcon('<defs><clipPath id="c"><circle cx="12" cy="12" r="12"/></clipPath></defs><g clip-path="url(#c)"><path fill="#ff9933" d="M0 0h24v8H0z"/><path fill="white" d="M0 8h24v8H0z"/><path fill="#138808" d="M0 16h24v8H0z"/></g><circle cx="12" cy="12" r="3" fill="none" stroke="#000080" stroke-width=".8"/><path d="M12 9v6m-3-3h6m-5-2 4 4m0-4-4 4" stroke="#000080" stroke-width=".5"/>'),
  },
  {
    code: 'USDT', label: 'USDT',
    icon: svgIcon('<circle cx="12" cy="12" r="12" fill="#60b7a0"/><path d="M5 5h14v3h-5.5v11h-3V8H5Z" fill="white"/><ellipse cx="12" cy="10.5" rx="8" ry="2" fill="none" stroke="white" stroke-width="1.2"/>'),
  },
  { code: 'BTC', label: 'BTC (Bitcoin)', icon: symbolIcon('#f7931a', '₿') },
  {
    code: 'ETH', label: 'ETH (ERC20)',
    icon: svgIcon('<circle cx="12" cy="12" r="12" fill="#e5e5e5"/><path d="m12 2 6 10-6 3-6-3Z" fill="#373b3b"/><path d="M12 2v13l6-3Z" fill="#767b7b"/><path d="m6 13 6 9 6-9-6 4Z" fill="#454949"/>'),
  },
  {
    code: 'TRX', label: 'TRX',
    icon: svgIcon('<circle cx="12" cy="12" r="12" fill="#ef0027"/><path d="m5 5 15 3-9 13Zm0 0 9 6 6-3m-6 3-3 10m3-10L5 5" fill="none" stroke="white" stroke-width="1" stroke-linejoin="round"/>'),
  },
  { code: 'DOGE', label: 'DOGE', icon: symbolIcon('#c5a829', 'Ð') },
  { code: 'BCH', label: 'BCH', icon: symbolIcon('#0dcb7b', '₿') },
  {
    code: 'ETC', label: 'ETC',
    icon: svgIcon('<circle cx="12" cy="12" r="12" fill="#d8f1cd"/><path d="m12 2 7 10-7 4-7-4Zm-7 12 7 8 7-8-7 4Z" fill="#00a856"/><path d="m5 12 7-3 7 3" fill="none" stroke="#d8f1cd" stroke-width="1"/>'),
  },
  { code: 'AAVE', label: 'AAVE (ERC20)', icon: symbolIcon('#8d79bd', 'A') },
  { code: 'DASH', label: 'DASH', icon: symbolIcon('#278ce7', 'Ð') },
  { code: 'DAI', label: 'DAI (ERC20)', icon: symbolIcon('#f8ad00', '◈') },
  { code: 'UNI', label: 'UNI (ERC20)', icon: symbolIcon('#ff007a', 'U') },
  { code: 'WBTC', label: 'WBTC (ERC20)', icon: symbolIcon('#767c8a', '₿') },
]

export const getBonusCurrency = (code: string): BonusCurrency =>
  BONUS_CURRENCIES.find(currency => currency.code === code) || BONUS_CURRENCIES[0]!
