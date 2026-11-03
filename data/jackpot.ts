export interface JackpotGame {
  id: string
  title: string
  provider: string
  providerLogo?: string
  image: string
  badge?: string
  buyBonus?: boolean
  promo?: boolean
  rtpPercent?: string
  jackpotPool?: string
  livePlayers?: number
  href?: string
}

export interface JackpotSection {
  id: string
  provider: string
  providerLogo: string
  count: number
  jackpotCharacter: 'dragon' | 'genie' | 'panda'
  showCounter: boolean
  jackpotAmount: number
  games: JackpotGame[]
}

export interface JackpotWinner {
  id: string
  providerLogo: string
  username: string
  amount: string
  date: string
}

export const JACKPOT_NAV_TABS = [
  { key: 'all', label: '777', logo: '/images/jackpot/all_slot_selected.webp', isAll: true },
  { key: 'jili', label: 'JILI', logo: '/images/providers/jili.webp' },
  { key: 'jdb', label: 'JDB', logo: '/images/providers/jdb.webp' },
  { key: 'cq9', label: 'CQ9', logo: '/images/providers/cq9.webp' },
]

export const JACKPOT_SECTIONS: JackpotSection[] = [
  {
    id: 'jili',
    provider: 'JILI',
    providerLogo: '/images/providers/jili.webp',
    count: 27,
    jackpotCharacter: 'dragon',
    showCounter: true,
    jackpotAmount: 7854.20,
    games: [
      {
        id: '3-coin-treasures-2',
        title: '3 Coin Treasures 2',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/popular/fortune-gems-2.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'romax',
        title: 'RomaX',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/new-releases/spin-and-score-megaways.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'golden-empire',
        title: 'Golden Empire',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/popular/golden-empire.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'mega-ace',
        title: 'Mega Ace',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/popular/mega-ace.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'jili-caishen',
        title: 'JILI CAISHEN',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/new-releases/chinese-new-year-deluxe.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'pirate-queen',
        title: 'Pirate Queen',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/new-releases/lucky-neko.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'elf-bingo',
        title: 'Elf Bingo',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/popular/sweet-bonanza-1000.webp',
        rtpPercent: '97.0%',
      },
      {
        id: 'jackpot-bingo',
        title: 'Jackpot Bingo',
        provider: 'JILI',
        providerLogo: '/images/providers/jili.webp',
        image: '/images/games/new-releases/777-strike.webp',
        rtpPercent: '97.0%',
      },
    ],
  },
  {
    id: 'cq9',
    provider: 'CQ9',
    providerLogo: '/images/providers/cq9.webp',
    count: 0,
    jackpotCharacter: 'genie',
    showCounter: true,
    jackpotAmount: 6328.50,
    games: [
      {
        id: 'golden-egg-jp',
        title: 'Golden Egg JP',
        provider: 'CQ9',
        providerLogo: '/images/providers/cq9.webp',
        image: '/images/games/new-releases/7-wheel-money.webp',
        rtpPercent: '96.1%',
      },
      {
        id: 'treasure-bowl-jp',
        title: 'Treasure Bowl JP',
        provider: 'CQ9',
        providerLogo: '/images/providers/cq9.webp',
        image: '/images/games/popular/sugar-rush-dice.webp',
        rtpPercent: '96.0%',
      },
      {
        id: 'lucky-bats-jp',
        title: 'Lucky Bats JP',
        provider: 'CQ9',
        providerLogo: '/images/providers/cq9.webp',
        image: '/images/games/popular/sweet-bonanza-1000.webp',
        rtpPercent: '96.1%',
      },
    ],
  },
  {
    id: 'jdb',
    provider: 'JDB',
    providerLogo: '/images/providers/jdb.webp',
    count: 30,
    jackpotCharacter: 'panda',
    showCounter: true,
    jackpotAmount: 3015.46,
    games: [
      {
        id: 'piggy-bank',
        title: 'Piggy Bank',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/super-ace.webp',
        rtpPercent: '96.5%',
        buyBonus: true,
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'dragon-soar',
        title: 'Dragon Soar - Hy...',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/wild-hop-and-drop.webp',
        rtpPercent: '96.9%',
        buyBonus: true,
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'billionaire',
        title: 'Billionaire',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/open-sesame.webp',
        rtpPercent: '96.5%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'dragon',
        title: 'Dragon',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/fortune-rabbit-xtreme.webp',
        rtpPercent: '96.2%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'kingsman',
        title: 'Kingsman',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/super-wildrix.webp',
        rtpPercent: '96.2%',
        promo: true,
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'orient-animals',
        title: 'OrientAnimals',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/fortune-gems-2.webp',
        rtpPercent: '95.9%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'dragons-world',
        title: 'DragonsWorld',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/golden-empire.webp',
        rtpPercent: '95.9%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'fortune-treasure',
        title: 'Fortune Treasure',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/7-wheel-money.webp',
        rtpPercent: '95.9%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'mjolnir',
        title: 'Mjolnir',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/spin-and-score-megaways.webp',
        rtpPercent: '96.5%',
        buyBonus: true,
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'spindrift-2',
        title: 'Spindrift2',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/sugar-rush-dice.webp',
        rtpPercent: '97.0%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'kong',
        title: 'Kong',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/mega-ace.webp',
        rtpPercent: '95.8%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'wonder-elephant',
        title: 'Wonder Elephant',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/sweet-bonanza-1000.webp',
        rtpPercent: '95.9%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'lantern-wealth',
        title: 'Lantern Wealth',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/chinese-new-year-deluxe.webp',
        rtpPercent: '95.9%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'blossom-of-wealth',
        title: 'Blossom of Wealth',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/lucky-neko.webp',
        rtpPercent: '96.0%',
        buyBonus: true,
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'glamorous-girl',
        title: 'GlamorousGirl',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/super-ace-2.webp',
        rtpPercent: '95.8%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'prosperity-tiger',
        title: 'Prosperity Tiger',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/golden-empire.webp',
        rtpPercent: '96.0%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'elemental-link-fire',
        title: 'Elemental Link Fire',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/bigger-bass-blizzard.webp',
        rtpPercent: '96.0%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'rooster-in-love',
        title: 'Rooster In Love',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/wild-bandito.webp',
        rtpPercent: '96.7%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'lucky-dragons',
        title: 'Lucky Dragons',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/john-hunter-book-of-tut-respin.webp',
        rtpPercent: '96.1%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'flirting-scholar-tang',
        title: 'Flirting Scholar Tang',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/gates-of-olympus.webp',
        rtpPercent: '96.4%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'winning-mask',
        title: 'Winning Mask',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/777-strike.webp',
        rtpPercent: '96.0%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'the-llama-adventure',
        title: 'The Llama Adventure',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/new-releases/snakes-and-ladders-snake-eyes.webp',
        rtpPercent: '96.2%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'formosa-bear',
        title: 'Formosa Bear',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/super-ace.webp',
        rtpPercent: '96.3%',
        jackpotPool: '₱3,012.91',
      },
      {
        id: 'new-year',
        title: 'New Year',
        provider: 'JDB',
        providerLogo: '/images/providers/jdb.webp',
        image: '/images/games/popular/golden-empire.webp',
        rtpPercent: '96.3%',
        jackpotPool: '₱3,012.91',
      },
    ],
  },
]

export const JACKPOT_WINNERS: JackpotWinner[] = [
  { id: '1', providerLogo: '/images/providers/jdb.webp', username: 'm******a', amount: 'PHP 640.83', date: '16-10 22:39' },
  { id: '2', providerLogo: '/images/providers/jdb.webp', username: 'G******a', amount: 'PHP 700.19', date: '14-10 19:26' },
  { id: '3', providerLogo: '/images/providers/jdb.webp', username: 'p******1', amount: 'PHP 1,538.85', date: '13-10 13:36' },
  { id: '4', providerLogo: '/images/providers/jdb.webp', username: 's******e', amount: 'PHP 671.24', date: '11-10 19:18' },
  { id: '5', providerLogo: '/images/providers/jdb.webp', username: 'k*****n', amount: 'PHP 720.88', date: '08-10 13:32' },
]

