import { LIVE_CASINO_TABLES } from './live-casino'

export interface HomepageCasinoCategory {
  key: string
  category: string
  title: string
  description: string
  image: string
  tableCount: number
}

const category = (key: string, title: string, description: string, filename: string): HomepageCasinoCategory => ({
  key,
  category: key,
  title,
  description,
  image: `/images/homepage-casino/${filename}.webp`,
  tableCount: LIVE_CASINO_TABLES.filter(table => table.category === key).length,
})

export const HOMEPAGE_CASINO_CATEGORIES: HomepageCasinoCategory[] = [
  // Keep the supplied portrait artwork in this homepage carousel.
  category('baccarat', 'Speed Baccarat', 'Fast-paced baccarat with real dealers.', 'baccarat'),
  category('roulette', 'Immersive Roulette', 'A cinematic roulette experience.', 'roullete'),
  category('blackjack', 'Classic Blackjack', 'Timeless blackjack, live and real.', 'blackjack'),
  category('game-show', 'Game Shows', 'Big moments. Live entertainment.', 'game-show'),
  category('dragon-tiger', 'Dragon Tiger', 'Two cards. One thrilling reveal.', 'dragon-tiger'),
  category('sicbo', 'Sic Bo', 'Three dice. All the excitement.', 'sic-bo'),
  category('fan-tan', 'Fan Tan', 'A classic with a little anticipation.', 'fantan'),
  category('poker', 'Poker', 'Find your hand. Make your move.', 'poker'),
]

export const HOMEPAGE_CASINO_FAQS = [
  { question: 'What is live casino?', answer: 'Live casino brings real dealers and real tables to your screen through a live video stream. Choose a game and follow the action as it happens.' },
  { question: 'What game types are available?', answer: 'Explore Baccarat, Roulette, Blackjack, Dragon Tiger, Sic Bo, Fan Tan, Poker and live Game Shows. Select a category to see its tables.' },
  { question: 'How do I join a live table?', answer: 'Choose a game category, find a table, then follow the sign-in instructions on ByBet. This lobby is a preview and does not accept wagers.' },
  { question: 'Is live casino fair?', answer: 'Check the operator’s licensing, game rules and testing information before you play. The dealer and game action are streamed live, and the rules explain how each result is settled.' },
  { question: 'What about responsible play?', answer: 'Play only if you are 21 or older. Set time and spending limits, take regular breaks, and visit our Responsible Gaming page for support and more information.' },
]
