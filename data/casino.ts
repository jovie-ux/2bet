import type {
  CasinoGame,
  GameSectionData,
  NavigationGroup,
  OriginalGame,
  PromoBanner,
  WinRow,
} from '~/types/casino'

export const navigationGroups: NavigationGroup[] = [
  {
    items: [
      { label: 'Get crypto', icon: 'circle-dollar', href: '#casino' },
      { label: 'Games', icon: 'gamepad-2', href: '#casino', active: true },
      { label: 'Originals', icon: 'sparkles', href: '#originals' },
      { label: 'Casino', icon: 'spade', href: '#top-spin' },
      { label: 'Slots', icon: 'cherry', href: '#new-arrivals' },
      { label: 'Crypto Casino', icon: 'bitcoin', href: '#win-big' },
      { label: 'Live Casino', icon: 'radio', href: '#live-casino' },
    ],
  },
  {
    items: [
      { label: 'Sports book', icon: 'swords', href: '#sports' },
      { label: 'Loot boxes', icon: 'boxes', href: '#buy-feature' },
      { label: 'Community', icon: 'users', href: '#support' },
      { label: 'Tournaments', icon: 'trophy', href: '#tournaments' },
      { label: 'Tribes', icon: 'users', href: '#support' },
    ],
  },
  {
    items: [
      { label: 'Earn', icon: 'gem', href: '#promotions' },
      { label: 'Promotions', icon: 'megaphone', href: '#promotions' },
    ],
  },
]

export const promoBanners: PromoBanner[] = [
  {
    id: 'welcome',
    eyebrow: 'WELCOME OFFER',
    title: 'Level up your first play',
    copy: 'A demo welcome experience built for the bold.',
    action: 'View promotion',
    accent: 'var(--main-color)',
    symbol: '♠',
  },
  {
    id: 'drops',
    eyebrow: 'WEEKLY DROPS',
    title: 'Climb the rewards vault',
    copy: 'New challenges and surprises every week.',
    action: 'Explore rewards',
    accent: '#6B35B5',
    symbol: '◆',
  },
  {
    id: 'sports',
    eyebrow: 'SPORTS HUB',
    title: 'Big match energy',
    copy: 'Follow today’s fixtures in one compact view.',
    action: 'See fixtures',
    accent: '#B44C24',
    symbol: '⚡',
  },
]

export const originalGames: OriginalGame[] = [
  { id: 'blackjack', title: 'Blackjack', subtitle: 'Beat the dealer', accent: '#174F44', symbol: 'A♠' },
  { id: 'roulette', title: 'Roulette', subtitle: 'Pick your number', accent: '#85392F', symbol: '17' },
  { id: 'mines', title: 'Mines', subtitle: 'Watch your step', accent: '#354A84', symbol: '✦' },
  { id: 'duck', title: 'The Duck?', subtitle: 'A quacking mystery', accent: '#B87A27', symbol: '♢' },
  { id: 'dice', title: 'Dice', subtitle: 'Roll with it', accent: '#74449C', symbol: '⚄' },
  { id: 'croc', title: 'Croc Dentist', subtitle: 'Choose carefully', accent: '#237E5C', symbol: '⌁' },
]

const createGame = (
  id: string,
  title: string,
  provider: string,
  accent: string,
  symbol: string,
  badge?: string,
): CasinoGame => ({
  id,
  title,
  provider,
  category: 'Casino',
  accent,
  symbol,
  badge,
})

export const gameSections: GameSectionData[] = [
  {
    id: 'top-spin',
    title: 'Top Spin',
    icon: 'flame',
    games: [
      createGame('sugar-rush', 'Sugar Rush', 'Pragmatic Play', '#B63D7A', '🍭', 'TOP'),
      createGame('gates', 'Gates of Olympus', 'Pragmatic Play', '#2B69A0', '⚡'),
      createGame('wanted', 'Wanted Dead or a Wild', 'Hacksaw', '#59372B', '★'),
      createGame('le-bandit', 'Le Bandit', 'Hacksaw', '#396D77', '♣'),
      createGame('sweet-bonanza', 'Sweet Bonanza', 'Pragmatic Play', '#8A4BB0', '🍬'),
      createGame('money-train', 'Money Train 4', 'Relax Gaming', '#684221', '🚂'),
      createGame('wild-west', 'Wild West Gold', 'Pragmatic Play', '#A45125', 'W'),
      createGame('chaos-crew', 'Chaos Crew II', 'Hacksaw', '#6A326D', '☠'),
    ],
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    icon: 'sparkles',
    games: [
      createGame('storm-forged', 'Storm Forged', 'North Star', '#254D76', '⚒', 'NEW'),
      createGame('moon-princess', 'Moon Princess', 'Play’n GO', '#6C3C8E', '☾'),
      createGame('temple-tumble', 'Temple Tumble', 'Relax Gaming', '#89722C', '◆'),
      createGame('neon-city', 'Neon City', 'Push Gaming', '#315E82', 'N'),
      createGame('forest-fortune', 'Forest Fortune', 'Octoplay', '#276247', '♜'),
      createGame('hot-fiesta', 'Hot Fiesta', 'Pragmatic Play', '#9F392E', '✹'),
      createGame('deep-dive', 'Deep Dive', 'Print Studios', '#17566D', '≈'),
    ],
  },
  {
    id: 'win-big',
    title: 'Win Big',
    icon: 'trophy',
    games: [
      createGame('mega-wheel', 'Mega Wheel', 'Pragmatic Play', '#9B612C', '7'),
      createGame('book-dead', 'Book of Dead', 'Play’n GO', '#7C5528', '𓂀'),
      createGame('cash-compass', 'Cash Compass', 'Push Gaming', '#2B685A', '$'),
      createGame('big-bamboo', 'Big Bamboo', 'Push Gaming', '#347047', '竹'),
      createGame('fruit-party', 'Fruit Party', 'Pragmatic Play', '#A43F55', '🍒'),
      createGame('royal-mint', 'Royal Mint', 'Relax Gaming', '#6A4487', '♛'),
      createGame('diamond-heist', 'Diamond Heist', 'Hacksaw', '#255D79', '♦'),
    ],
  },
  {
    id: 'buy-feature',
    title: 'Buy Feature',
    icon: 'badge-percent',
    games: [
      createGame('rip-city', 'Rip City', 'Hacksaw', '#8A302D', 'R'),
      createGame('rotten', 'Rotten', 'Hacksaw', '#4B653A', '☣'),
      createGame('hand-anubis', 'Hand of Anubis', 'Hacksaw', '#5E4935', '𓁢'),
      createGame('stack-em', 'Stack ’Em', 'Hacksaw', '#295F7D', '▦'),
      createGame('mental', 'Mental', 'NoLimit City', '#633E64', '☻'),
      createGame('fire-hole', 'Fire in the Hole 2', 'NoLimit City', '#8E4D25', '♨'),
      createGame('tomb-riches', 'Tomb of Riches', 'Relax Gaming', '#867333', '✧'),
    ],
  },
]

export const liveCasinoGames: CasinoGame[] = [
  { ...createGame('crazy-time', 'Crazy Time', 'Evolution', '#8D432B', '☸', 'LIVE'), viewers: '2.4K playing' },
  { ...createGame('lightning-roulette', 'Lightning Roulette', 'Evolution', '#4C3D89', '⚡'), viewers: '912 playing' },
  { ...createGame('blackjack-vip', 'Blackjack VIP', 'Evolution', '#285849', 'A♠'), viewers: '604 playing' },
  { ...createGame('monopoly-live', 'Monopoly Live', 'Evolution', '#8A3737', 'M'), viewers: '1.1K playing' },
  { ...createGame('baccarat-squeeze', 'Baccarat Squeeze', 'Pragmatic Play', '#394D72', 'B'), viewers: '388 playing' },
]

export const providers = [
  'Pragmatic Play',
  'Evolution',
  'Hacksaw',
  'Play’n GO',
  'Relax Gaming',
  'Push Gaming',
  'NoLimit City',
  'Octoplay',
]

export const recentWins: WinRow[] = [
  { game: 'Gates of Olympus', gameSymbol: '⚡', player: 'demo_ace', time: 'Just now', multiplier: '128.4×', amount: '2,568.00', currency: 'USDT' },
  { game: 'Le Bandit', gameSymbol: '♣', player: 'sample_wolf', time: '18 sec ago', multiplier: '42.8×', amount: '856.40', currency: 'USDT' },
  { game: 'Blackjack', gameSymbol: 'A♠', player: 'test_player', time: '31 sec ago', multiplier: '5.0×', amount: '250.00', currency: 'USDT' },
  { game: 'Sweet Bonanza', gameSymbol: '🍬', player: 'demo_star', time: '1 min ago', multiplier: '76.2×', amount: '1,143.00', currency: 'USDT' },
  { game: 'Money Train 4', gameSymbol: '🚂', player: 'preview_7', time: '2 min ago', multiplier: '21.6×', amount: '432.00', currency: 'USDT' },
]
