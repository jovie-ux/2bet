export type PokerGameCategory = 'fishing' | 'mahjong' | 'poker' | 'blackjack' | 'bullbull' | 'baccarat' | 'roulette' | 'sic-bo' | 'other'

export interface PokerGame {
  id: string
  title: string
  image: string
  provider: string
  providerLogo?: string
  category: PokerGameCategory | PokerGameCategory[]
  categories?: PokerGameCategory[]
  href?: string
  demoHref?: string
}

export interface PokerCategory {
  key: PokerGameCategory
  label: string
  iconName: string
}

export interface PokerProvider {
  key: string
  label: string
  logo?: string
}

export interface PokerSection {
  key: PokerGameCategory
  label: string
  games: PokerGame[]
}

export const POKER_CATEGORIES: PokerCategory[] = [
  { key: 'fishing', label: 'Fishing', iconName: 'Fish' },
  { key: 'mahjong', label: 'Mahjong', iconName: 'RectangleVertical' },
  { key: 'poker', label: 'Poker', iconName: 'Spade' },
  { key: 'bullbull', label: 'Bull Bull', iconName: 'Swords' },
  { key: 'baccarat', label: 'Baccarat', iconName: 'Dices' },
  { key: 'other', label: 'Other', iconName: 'Shapes' },
]

// Add provider options here. Use the same key in each game's provider field.
export const POKER_PROVIDERS: PokerProvider[] = [
  { key: 'all', label: 'All' },
  { key: 'DB', label: 'DB', logo: '/images/providers/db.webp' },
  { key: 'KY', label: 'KY', logo: '/images/providers/ky.webp' },
  { key: 'V8', label: 'V8', logo: '/images/providers/v8.webp' },
  { key: 'KS', label: 'KS', logo: '/images/providers/ks.webp' },
]

export const POKER_PROVIDER_LOGOS: Record<string, string> = {
  DB: '/images/providers/db.webp',
  KY: '/images/providers/ky.webp',
  V8: '/images/providers/v8.webp',
  KS: '/images/providers/ks.webp',
}

export const getPokerProviderLogo = (provider: string): string => {
  const norm = (provider || '').trim().toUpperCase()
  return POKER_PROVIDER_LOGOS[norm] || ''
}

// Merged master catalogue of poker and table games, with display and filtering based on category.
export const POKER_GAMES: PokerGame[] = [
  {
    id: "fishing-happy-fishing-king",
    title: "Happy Fishing King",
    image: "/images/poker/fishing-happy-fishing-king.webp",
    provider: "DB",
    category: "fishing",
  },
  {
    id: "fishing-golden-dragon",
    title: "Golden Dragon",
    image: "/images/poker/fishing-golden-dragon.webp",
    provider: "KY",
    category: "fishing",
  },
  {
    id: "fishing-lk-fishing",
    title: "LK Fishing",
    image: "/images/poker/fishing-lk-fishing.webp",
    provider: "KY",
    category: "fishing",
  },
  {
    id: "fishing-chinyuan-fishing",
    title: "ChinYuan Fishing",
    image: "/images/poker/fishing-chinyuan-fishing.webp",
    provider: "KY",
    category: "fishing",
  },
  {
    id: "fishing-fishing-wars",
    title: "Fishing Wars",
    image: "/images/poker/fishing-fishing-wars.webp",
    provider: "V8",
    category: "fishing",
  },
  {
    id: "fishing-fishing",
    title: "Fishing",
    image: "/images/poker/fishing-fishing.webp",
    provider: "KY",
    category: "fishing",
  },
  {
    id: "fishing-three-kingdom-fishing",
    title: "Three Kingdom Fishing",
    image: "/images/poker/fishing-three-kingdom-fishing.webp",
    provider: "KS",
    category: "fishing",
  },
  {
    id: "mahjong-okey",
    title: "OKEY",
    image: "/images/poker/mahjong-okey.webp",
    provider: "KY",
    category: "mahjong",
  },
  {
    id: "mahjong-bleeding-mahjong",
    title: "Bleeding Mahjong",
    image: "/images/poker/mahjong-bleeding-mahjong.webp",
    provider: "KY",
    category: "mahjong",
  },
  {
    id: "mahjong-two-eight-bar",
    title: "Two-Eight Bar",
    image: "/images/poker/mahjong-two-eight-bar.webp",
    provider: "KY",
    category: "mahjong",
  },
  {
    id: "mahjong-2-persons-mahjong",
    title: "2 Persons’ Mahjong",
    image: "/images/poker/mahjong-2-persons-mahjong.webp",
    provider: "KY",
    category: "mahjong",
  },
  {
    id: "poker-arena-of-cards",
    title: "Arena of Cards",
    image: "/images/poker/poker-arena-of-cards.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-tu-sac-four-color",
    title: "Tu Sac-Four Color",
    image: "/images/poker/poker-tu-sac-four-color.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-killer-6",
    title: "Killer 6",
    image: "/images/poker/poker-killer-6.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-teen-patti",
    title: "Teen Patti",
    image: "/images/poker/poker-teen-patti.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-guandan",
    title: "GuanDan",
    image: "/images/poker/poker-guandan.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "blackjack-lightning-blackjack",
    title: "Lightning BlackJack",
    image: "/images/poker/blackjack-lightning-blackjack.webp",
    provider: "KY",
    category: ["poker"],
  },
  {
    id: "poker-ta-la-phom",
    title: "Ta La-Phom",
    image: "/images/poker/poker-ta-la-phom.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-fight-the-landlord",
    title: "Fight The Landlord",
    image: "/images/poker/poker-fight-the-landlord.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-all-in-or-fold",
    title: "All-In or Fold",
    image: "/images/poker/poker-all-in-or-fold.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-three-facecard-after-check",
    title: "Three-Facecard After Check",
    image: "/images/poker/poker-three-facecard-after-check.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-three-cards",
    title: "Three Cards",
    image: "/images/poker/poker-three-cards.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "blackjack-black-jack",
    title: "Black Jack",
    image: "/images/poker/blackjack-black-jack.webp",
    provider: "V8",
    category: ["poker"],
  },
  {
    id: "poker-texas-holdem-poker",
    title: "Texas Holdem Poker",
    image: "/images/poker/poker-texas-holdem-poker.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-thirteen-cards",
    title: "Thirteen Cards",
    image: "/images/poker/poker-thirteen-cards.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-three-toy",
    title: "Three Toy",
    image: "/images/poker/poker-three-toy.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-six-cards",
    title: "Six Cards",
    image: "/images/poker/poker-six-cards.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-killer-13",
    title: "Killer 13",
    image: "/images/poker/poker-killer-13.webp",
    provider: "V8",
    category: "poker",
  },
  {
    id: "poker-hong-kong-stud",
    title: "Hong Kong Stud",
    image: "/images/poker/poker-hong-kong-stud.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-golden-flower",
    title: "Golden Flower",
    image: "/images/poker/poker-golden-flower.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-speed-golden-flower",
    title: "Speed Golden Flower",
    image: "/images/poker/poker-speed-golden-flower.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "blackjack-black-jack-2",
    title: "Black Jack",
    image: "/images/poker/blackjack-black-jack-2.webp",
    provider: "KY",
    category: ["poker"],
  },
  {
    id: "poker-landlord",
    title: "Landlord",
    image: "/images/poker/poker-landlord.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-texas-hold-em-poker",
    title: "Texas Hold'em Poker",
    image: "/images/poker/poker-texas-hold-em-poker.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-pineapple-poker",
    title: "Pineapple Poker",
    image: "/images/poker/poker-pineapple-poker.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-run-fast",
    title: "Run Fast",
    image: "/images/poker/poker-run-fast.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "poker-three-facecard",
    title: "Three-Facecard",
    image: "/images/poker/poker-three-facecard.webp",
    provider: "KY",
    category: "poker",
  },
  {
    id: "baccarat-malaysia-bull-bull",
    title: "Malaysia Bull-Bull",
    image: "/images/poker/baccarat-malaysia-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-speed-bull-bull",
    title: "Speed Bull-Bull",
    image: "/images/poker/baccarat-speed-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-lai-zi-niu-niu",
    title: "Lai Zi Niu-niu",
    image: "/images/poker/baccarat-lai-zi-niu-niu.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-black-myth-niu-niu-for-thousands-person",
    title: "Black Myth Niu-niu For Thousands Person",
    image: "/images/poker/baccarat-black-myth-niu-niu-for-thousands-person.webp",
    provider: "KY",
    category: ["bullbull", "baccarat"],
  },
  {
    id: "baccarat-see-card-bull",
    title: "See Card Bull",
    image: "/images/poker/baccarat-see-card-bull.webp",
    provider: "V8",
    category: ["bullbull"],
  },
  {
    id: "baccarat-four-cards-bull",
    title: "Four Cards Bull",
    image: "/images/poker/baccarat-four-cards-bull.webp",
    provider: "V8",
    category: ["bullbull"],
  },
  {
    id: "baccarat-ten-times-bull-bull",
    title: "Ten Times Bull-Bull",
    image: "/images/poker/baccarat-ten-times-bull-bull.webp",
    provider: "KY",
    category: ["bullbull", "baccarat"],
  },
  {
    id: "baccarat-crazy-banker-bull-bull",
    title: "Crazy Banker Bull-Bull",
    image: "/images/poker/baccarat-crazy-banker-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-bull-bull",
    title: "Bull-Bull",
    image: "/images/poker/baccarat-bull-bull.webp",
    provider: "V8",
    category: ["bullbull"],
  },
  {
    id: "baccarat-hundred-people-of-bull",
    title: "Hundred People of Bull",
    image: "/images/poker/baccarat-hundred-people-of-bull.webp",
    provider: "V8",
    category: ["bullbull", "baccarat"],
  },
  {
    id: "baccarat-1v1-bull-bull",
    title: "1v1 Bull-Bull",
    image: "/images/poker/baccarat-1v1-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-bet-3-players-bull-bull",
    title: "Bet 3 Players Bull-Bull",
    image: "/images/poker/baccarat-bet-3-players-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-golden-bull",
    title: "Golden Bull",
    image: "/images/poker/baccarat-golden-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-banker-bull-bull",
    title: "Banker Bull-Bull",
    image: "/images/poker/baccarat-banker-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-casino-bull-bull",
    title: "Casino Bull-Bull",
    image: "/images/poker/baccarat-casino-bull-bull.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-banker-bull-bull-after-check-card",
    title: "Banker Bull-Bull After Check Card",
    image: "/images/poker/baccarat-banker-bull-bull-after-check-card.webp",
    provider: "KY",
    category: ["bullbull"],
  },
  {
    id: "baccarat-niu-niu-for-thousands-person",
    title: "Niu–niu for thousands person",
    image: "/images/poker/baccarat-niu-niu-for-thousands-person.webp",
    provider: "KY",
    category: ["bullbull", "baccarat"],
  },
  {
    id: "baccarat-color-game",
    title: "Color Game",
    image: "/images/poker/baccarat-color-game.webp",
    provider: "V8",
    category: "baccarat",
  },
  {
    id: "baccarat-forest-party",
    title: "Forest Party",
    image: "/images/poker/baccarat-forest-party.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "baccarat-macau-baccarat-lucky-six",
    title: "Macau Baccarat Lucky Six",
    image: "/images/poker/baccarat-macau-baccarat-lucky-six.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "roulette-european-roulette",
    title: "European Roulette",
    image: "/images/poker/roulette-european-roulette.webp",
    provider: "V8",
    category: ["baccarat", "roulette"],
  },
  {
    id: "baccarat-h-baccarat",
    title: "H-Baccarat",
    image: "/images/poker/baccarat-h-baccarat.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "baccarat-forest-dance",
    title: "Forest Dance",
    image: "/images/poker/baccarat-forest-dance.webp",
    provider: "V8",
    category: "baccarat",
  },
  {
    id: "baccarat-speed-baccarat",
    title: "Speed Baccarat",
    image: "/images/poker/baccarat-speed-baccarat.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "baccarat-red-black-war",
    title: "Red & Black War",
    image: "/images/poker/baccarat-red-black-war.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "sic-bo-hundred-sic-bo",
    title: "Hundred Sic Bo",
    image: "/images/poker/sic-bo-hundred-sic-bo.webp",
    provider: "V8",
    category: ["baccarat", "sic-bo"],
  },
  {
    id: "fishing-fish-shrimp-crab",
    title: "Fish-Shrimp-Crab",
    image: "/images/poker/fishing-fish-shrimp-crab.webp",
    provider: "V8",
    category: ["baccarat"],
  },
  {
    id: "baccarat-baccarat",
    title: "Baccarat",
    image: "/images/poker/baccarat-baccarat.webp",
    provider: "V8",
    category: ["baccarat"],
  },
  {
    id: "baccarat",
    title: "Baccarat",
    image: "/images/poker/baccarat.webp",
    provider: "KY",
    category: ["baccarat"],
  },
  {
    id: "baccarat-red-black-war-2",
    title: "Red-Black War",
    image: "/images/poker/baccarat-red-black-war-2.webp",
    provider: "V8",
    category: "baccarat",
  },
  {
    id: "baccarat-fruit-machine",
    title: "Fruit Machine",
    image: "/images/poker/baccarat-fruit-machine.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "fishing-fish-prawn-crab-dice",
    title: "Fish-Prawn-Crab Dice",
    image: "/images/poker/fishing-fish-prawn-crab-dice.webp",
    provider: "KY",
    category: ["baccarat"],
  },
  {
    id: "baccarat-gold-shark-silver-shark",
    title: "Gold Shark & Silver Shark",
    image: "/images/poker/baccarat-gold-shark-silver-shark.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "baccarat-golden-flower-for-thousands-person",
    title: "Golden Flower for thousands person",
    image: "/images/poker/baccarat-golden-flower-for-thousands-person.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "baccarat-benz-bmw",
    title: "Benz & BMW",
    image: "/images/poker/baccarat-benz-bmw.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "baccarat-five-stars",
    title: "Five Stars",
    image: "/images/poker/baccarat-five-stars.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "sic-bo-sic-bo",
    title: "Sic Bo",
    image: "/images/poker/sic-bo-sic-bo.webp",
    provider: "KY",
    category: ["baccarat", "sic-bo"],
  },
  {
    id: "baccarat-dragon-tiger",
    title: "Dragon-Tiger",
    image: "/images/poker/baccarat-dragon-tiger.webp",
    provider: "KY",
    category: "baccarat",
  },
  {
    id: "blackjack-world-cup-blackjack",
    title: "World Cup Blackjack",
    image: "/images/poker/blackjack-world-cup-blackjack.webp",
    provider: "KY",
    category: "other",
  },
  {
    id: "blackjack-wealth-arrival",
    title: "Wealth Arrival",
    image: "/images/poker/blackjack-wealth-arrival.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-fortune-flow",
    title: "Fortune Flow",
    image: "/images/poker/blackjack-fortune-flow.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-high-dream",
    title: "High Dream",
    image: "/images/poker/blackjack-high-dream.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-piggy-run",
    title: "Piggy Run",
    image: "/images/poker/blackjack-piggy-run.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-smashy-house",
    title: "Smashy House",
    image: "/images/poker/blackjack-smashy-house.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-dominoes",
    title: "Dominoes",
    image: "/images/poker/blackjack-dominoes.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-fire-blast",
    title: "Fire Blast",
    image: "/images/poker/blackjack-fire-blast.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-immortal-road",
    title: "Immortal Road",
    image: "/images/poker/blackjack-immortal-road.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-aviator",
    title: "Aviator",
    image: "/images/poker/blackjack-aviator.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-lost-treasure",
    title: "Lost Treasure",
    image: "/images/poker/blackjack-lost-treasure.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-monopoly",
    title: "Monopoly",
    image: "/images/poker/blackjack-monopoly.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-ring",
    title: "Ring",
    image: "/images/poker/blackjack-ring.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-go-for-gold",
    title: "Go For Gold",
    image: "/images/poker/blackjack-go-for-gold.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-hi-lo",
    title: "HI-LO",
    image: "/images/poker/blackjack-hi-lo.webp",
    provider: "KY",
    category: "other",
  },
  {
    id: "blackjack-lightning-bingo",
    title: "Lightning Bingo",
    image: "/images/poker/blackjack-lightning-bingo.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-rummy",
    title: "Rummy",
    image: "/images/poker/blackjack-rummy.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-monkey-king-black-wukong",
    title: "Monkey king : black wukong",
    image: "/images/poker/blackjack-monkey-king-black-wukong.webp",
    provider: "KY",
    category: "other",
  },
  {
    id: "blackjack-cai-shen-dao",
    title: "Cai Shen Dao",
    image: "/images/poker/blackjack-cai-shen-dao.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-fan-tan",
    title: "Fan Tan",
    image: "/images/poker/blackjack-fan-tan.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "blackjack-xoc-dia",
    title: "Xoc Dia",
    image: "/images/poker/blackjack-xoc-dia.webp",
    provider: "V8",
    category: "other",
  },
  {
    id: "poker-paigow",
    title: "Paigow",
    image: "/images/poker/poker-paigow.webp",
    provider: "KY",
    category: "other",
  }
]

export const isGameInPokerCategory = (game: PokerGame, categoryKey: string): boolean => {
  const norm = (categoryKey || '').trim().toLowerCase()
  if (norm === 'all' || norm === 'popular') return true
  const list: string[] = []
  if (Array.isArray(game.category)) {
    list.push(...game.category)
  } else if (game.category) {
    list.push(game.category)
  }
  if (game.categories && Array.isArray(game.categories)) {
    list.push(...game.categories)
  }
  return list.some(c => c.toLowerCase() === norm)
}

// Derived category lists for backwards compatibility and direct category imports
export const FISHING: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'fishing'))
export const MAHJONG: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'mahjong'))
export const POKER: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'poker'))
export const BLACKJACK: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'blackjack'))
export const BULLBULL: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'bullbull'))
export const BACCARAT: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'baccarat'))
export const OTHER: PokerGame[] = POKER_GAMES.filter(game => isGameInPokerCategory(game, 'other'))

export const buildPokerSections = (games: PokerGame[] = POKER_GAMES): PokerSection[] => {
  return POKER_CATEGORIES.map(category => ({
    key: category.key,
    label: category.label,
    games: games.filter(game => isGameInPokerCategory(game, category.key)),
  })).filter(section => section.games.length > 0)
}

export const POKER_SECTIONS: PokerSection[] = buildPokerSections(POKER_GAMES)

export const getPokerGames = (category = 'all', provider = 'all'): PokerGame[] => {
  const normalizedCategory = category.trim().toLowerCase()
  const normalizedProvider = provider.trim().toLowerCase()

  return POKER_GAMES.filter(game => (
    isGameInPokerCategory(game, normalizedCategory)
    && (normalizedProvider === 'all' || game.provider.toLowerCase() === normalizedProvider)
  ))
}

export const getPokerGamesByCategory = (category: string, games: PokerGame[] = POKER_GAMES): PokerGame[] => {
  const norm = (category || '').trim().toLowerCase()
  if (norm === 'all' || norm === 'popular') return games
  return games.filter(game => isGameInPokerCategory(game, norm))
}

export const getPokerProvidersByCategory = (category = 'all', games: PokerGame[] = POKER_GAMES): PokerProvider[] => {
  const norm = (category || '').trim().toLowerCase()
  const targetGames = norm === 'all' || norm === 'popular'
    ? games
    : games.filter(g => isGameInPokerCategory(g, norm))

  const activeKeys = new Set(targetGames.map(g => (g.provider || '').trim().toUpperCase()).filter(Boolean))
  const knownMatched = POKER_PROVIDERS.filter(p => p.key !== 'all' && activeKeys.has(p.key.toUpperCase()))

  const knownKeys = new Set(POKER_PROVIDERS.map(p => p.key.toUpperCase()))
  const extraProviders: PokerProvider[] = []
  activeKeys.forEach(key => {
    if (!knownKeys.has(key)) {
      extraProviders.push({
        key,
        label: key,
        logo: getPokerProviderLogo(key),
      })
    }
  })

  const matched = [...knownMatched, ...extraProviders]

  if (matched.length <= 1) {
    return matched
  }

  const allOption = POKER_PROVIDERS.find(p => p.key === 'all') || { key: 'all', label: 'All' }
  return [allOption, ...matched]
}
