export interface HomepageWinner {
  id: string
  provider: string
  providerLogo: string
  username: string
  amount: string
  date: string
}

// All winning amounts focus strictly on 100 USD to 1,000 USD converted to Brazilian Real (BRL, 1 USD ≈ 5.75 BRL).
export const HOMEPAGE_WINNERS: HomepageWinner[] = [
  { id: 'home-pp-1', provider: 'Pragmatic Play', providerLogo: '/images/providers/pp.webp', username: 'r******3', amount: 'R$ 4,930.00', date: '16-10 22:42' },
  { id: 'home-pg-1', provider: 'PG Soft', providerLogo: '/images/providers/pg.webp', username: 'l******2', amount: 'R$ 3,248.75', date: '16-10 22:40' },
  { id: 'home-jili-1', provider: 'JILI', providerLogo: '/images/providers/jili.webp', username: 'j******8', amount: 'R$ 3,684.60', date: '16-10 22:38' },
  { id: 'home-netent-1', provider: 'NetEnt', providerLogo: '/images/providers/netent.webp', username: 'v******k', amount: 'R$ 4,487.88', date: '16-10 22:37' },
  { id: 'home-jdb-1', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'm******a', amount: 'R$ 4,151.50', date: '16-10 22:35' },
  { id: 'home-cq9-1', provider: 'CQ9', providerLogo: '/images/providers/cq9.webp', username: 'a******7', amount: 'R$ 3,565.00', date: '16-10 22:34' },
  { id: 'home-mg-1', provider: 'Microgaming', providerLogo: '/images/providers/mg.webp', username: 't******9', amount: 'R$ 4,140.00', date: '16-10 22:33' },
  { id: 'home-red-tiger-1', provider: 'Red Tiger', providerLogo: '/images/providers/red-tiger.webp', username: 'b******9', amount: 'R$ 2,443.75', date: '16-10 22:30' },
  { id: 'home-bs-1', provider: 'BetSoft', providerLogo: '/images/providers/bs.webp', username: 'd******5', amount: 'R$ 3,098.39', date: '16-10 22:28' },
  { id: 'home-choice-1', provider: 'Choice Gaming', providerLogo: '/images/providers/choice.webp', username: 'c******1', amount: 'R$ 3,997.40', date: '16-10 22:25' },
  { id: 'home-lgd-1', provider: 'LGD Gaming', providerLogo: '/images/providers/lgd.webp', username: 'x******8', amount: 'R$ 2,587.50', date: '16-10 22:22' },
  { id: 'home-2bet-1', provider: '2Bet', providerLogo: '/images/providers/2bet.webp', username: 'w******4', amount: 'R$ 3,162.50', date: '16-10 22:19' },
  { id: 'home-pp-2', provider: 'Pragmatic Play', providerLogo: '/images/providers/pp.webp', username: 'k*****n', amount: 'R$ 2,486.30', date: '14-10 19:26' },
  { id: 'home-pg-2', provider: 'PG Soft', providerLogo: '/images/providers/pg.webp', username: 's******e', amount: 'R$ 3,859.65', date: '13-10 13:36' },
  { id: 'home-jdb-2', provider: 'JDB', providerLogo: '/images/providers/jdb.webp', username: 'G******a', amount: 'R$ 4,145.06', date: '11-10 19:18' },
]
