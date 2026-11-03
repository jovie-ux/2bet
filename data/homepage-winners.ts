export interface HomepageWinner {
  id: string
  provider: string
  providerLogo: string
  username: string
  amount: string
  date: string
}

// Homepage-only sample records. Jackpot routes retain their separate JDB winners.
export const HOMEPAGE_WINNERS: HomepageWinner[] = [
  { id: 'home-jdb-1', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'm******a', amount: 'PHP 640.83', date: '16-10 22:39' },
  { id: 'home-jili-1', provider: 'JILI', providerLogo: '/images/providers/jili.webp', username: 'j******8', amount: 'PHP 2,486.50', date: '16-10 22:38' },
  { id: 'home-pp-1', provider: 'Pragmatic Play', providerLogo: '/images/providers/pp.webp', username: 'r******3', amount: 'PHP 3,812.75', date: '16-10 22:36' },
  { id: 'home-cq9-1', provider: 'CQ9', providerLogo: '/images/providers/cq9.webp', username: 'a******7', amount: 'PHP 1,695.20', date: '16-10 22:34' },
  { id: 'home-pg-1', provider: 'PG Soft', providerLogo: '/images/providers/pg.webp', username: 'l******2', amount: 'PHP 2,240.60', date: '16-10 22:32' },
  { id: 'home-red-tiger-1', provider: 'Red Tiger', providerLogo: '/images/providers/red-tiger.webp', username: 'b******9', amount: 'PHP 1,875.40', date: '16-10 22:30' },
  { id: 'home-jdb-2', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'G******a', amount: 'PHP 700.19', date: '14-10 19:26' },
  { id: 'home-jdb-3', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'p******1', amount: 'PHP 1,538.85', date: '13-10 13:36' },
  { id: 'home-jdb-4', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 's******e', amount: 'PHP 671.24', date: '11-10 19:18' },
  { id: 'home-jdb-5', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'k*****n', amount: 'PHP 720.88', date: '08-10 13:32' },
]
