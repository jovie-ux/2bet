export interface HomepageWinner {
  id: string
  provider: string
  providerLogo: string
  username: string
  amount: string
  date: string
}

// All winning amounts focus strictly on 100 USD to 1,000 USD.
// When a record uses another currency, it is converted from USD to that selected currency:
// USD / USDT (1.0), BRL (5.75), PHP (58.00), INR (84.50).
export const HOMEPAGE_WINNERS: HomepageWinner[] = [
  { id: 'home-pp-1', provider: 'Pragmatic Play', providerLogo: '/images/providers/pp.webp', username: 'r******3', amount: 'PHP 49,300.00', date: '16-10 22:42' },
  { id: 'home-pg-1', provider: 'PG Soft', providerLogo: '/images/providers/pg.webp', username: 'l******2', amount: 'BRL 3,248.75', date: '16-10 22:40' },
  { id: 'home-jili-1', provider: 'JILI', providerLogo: '/images/providers/jili.webp', username: 'j******8', amount: 'USD 640.80', date: '16-10 22:38' },
  { id: 'home-netent-1', provider: 'NetEnt', providerLogo: '/images/providers/netent.webp', username: 'v******k', amount: 'USDT 780.50', date: '16-10 22:37' },
  { id: 'home-jdb-1', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'm******a', amount: 'PHP 41,876.00', date: '16-10 22:35' },
  { id: 'home-cq9-1', provider: 'CQ9', providerLogo: '/images/providers/cq9.webp', username: 'a******7', amount: 'INR 52,390.00', date: '16-10 22:34' },
  { id: 'home-mg-1', provider: 'Microgaming', providerLogo: '/images/providers/mg.webp', username: 't******9', amount: 'BRL 4,140.00', date: '16-10 22:33' },
  { id: 'home-red-tiger-1', provider: 'Red Tiger', providerLogo: '/images/providers/red-tiger.webp', username: 'b******9', amount: 'PHP 24,650.00', date: '16-10 22:30' },
  { id: 'home-bs-1', provider: 'BetSoft', providerLogo: '/images/providers/bs.webp', username: 'd******5', amount: 'USD 538.85', date: '16-10 22:28' },
  { id: 'home-choice-1', provider: 'Choice Gaming', providerLogo: '/images/providers/choice.webp', username: 'c******1', amount: 'USDT 695.20', date: '16-10 22:25' },
  { id: 'home-lgd-1', provider: 'LGD Gaming', providerLogo: '/images/providers/lgd.webp', username: 'x******8', amount: 'INR 38,025.00', date: '16-10 22:22' },
  { id: 'home-2bet-1', provider: '2Bet', providerLogo: '/images/providers/2bet.webp', username: 'w******4', amount: 'PHP 31,900.00', date: '16-10 22:19' },
  { id: 'home-pp-2', provider: 'Pragmatic Play', providerLogo: '/images/providers/pp.webp', username: 'k*****n', amount: 'BRL 2,486.30', date: '14-10 19:26' },
  { id: 'home-pg-2', provider: 'PG Soft', providerLogo: '/images/providers/pg.webp', username: 's******e', amount: 'INR 56,719.78', date: '13-10 13:36' },
  { id: 'home-jdb-2', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'G******a', amount: 'USD 720.88', date: '11-10 19:18' },
]
