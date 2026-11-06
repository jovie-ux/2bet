import { computed, type ComputedRef } from 'vue'

export interface BreadcrumbItem {
  name: string
  path?: string
}

export interface AppSeoOptions {
  title: string | ComputedRef<string> | (() => string)
  description: string | ComputedRef<string> | (() => string)
  keywords?: string | ComputedRef<string> | (() => string)
  image?: string | ComputedRef<string> | (() => string)
  type?: 'website' | 'article'
  includeSiteName?: boolean | ComputedRef<boolean> | (() => boolean)
  withSiteName?: boolean | ComputedRef<boolean> | (() => boolean)
  includeCheckMore?: boolean | ComputedRef<boolean> | (() => boolean)
  siteName?: string | boolean | ComputedRef<string | boolean> | (() => string | boolean)
  breadcrumbs?: BreadcrumbItem[] | ComputedRef<BreadcrumbItem[]> | (() => BreadcrumbItem[])
  schema?: Record<string, any> | Record<string, any>[] | ComputedRef<any> | (() => any)
  robots?: string | ComputedRef<string> | (() => string)
}

const resolveVal = <T>(val: T | ComputedRef<T> | (() => T) | undefined): T | undefined => {
  if (val === undefined) return undefined
  if (typeof val === 'function') {
    return (val as () => T)()
  }
  if (val && typeof val === 'object' && 'value' in val) {
    return (val as ComputedRef<T>).value
  }
  return val as T
}

// Edit segment display names here to customize URL-based breadcrumb labels
const BREADCRUMB_SEGMENT_LABELS: Record<string, string> = {
  explore: 'Explore',
  egames: 'E-Games',
  entertainment: 'Entertainment',
  'live-casino': 'Live Casino',
  'live-plaza': 'Live Plaza',
  'customer-service': 'Customer Service',
  'max-rpt': 'Max RTP',
  'max-rtp': 'Max RTP',
  'top-pick': 'Top Pick',
  inplay: 'In-Play',
  'pre-match': 'Pre-Match',
  'smart-pick': 'Smart Pick',
  jili: 'JILI',
  jdb: 'JDB',
  cq9: 'CQ9',
  fc: 'FC',
  vip: 'VIP',
  faq: 'FAQ',
}

const BREADCRUMB_SEGMENT_LABELS_PT: Record<string, string> = {
  explore: 'Explorar',
  egames: 'eGames',
  entertainment: 'Entretenimento',
  'live-casino': 'Cassino ao Vivo',
  'live-plaza': 'Praça ao Vivo',
  'customer-service': 'Atendimento ao Cliente',
  'max-rpt': 'Maior RTP',
  'max-rtp': 'Maior RTP',
  'top-pick': 'Mais Populares',
  inplay: 'Ao Vivo',
  'pre-match': 'Pré-Jogo',
  'smart-pick': 'Escolha Inteligente',
  jili: 'JILI',
  jdb: 'JDB',
  cq9: 'CQ9',
  fc: 'FC',
  vip: 'VIP',
  faq: 'Perguntas Frequentes',
  poker: 'Pôquer',
  fishing: 'Pesca',
  mahjong: 'Mahjong',
  blackjack: 'Blackjack',
  bullbull: 'Bull Bull',
  baccarat: 'Bacará',
  other: 'Outros',
  slots: 'Slots',
  // bingo: 'Bingo',
  jackpot: 'Jackpot',
  sports: 'Esportes',
  popular: 'Popular',
  bonuses: 'Bônus',
  bonus: 'Bônus',
  account: 'Minha Conta',
  deposit: 'Depósito',
  withdraw: 'Saque',
  history: 'Histórico',
  timezone: 'Fuso Horário',
  language: 'Idioma',
  promotions: 'Promoções',
  help: 'Ajuda',
  legal: 'Legal',
  'cookie-policy': 'Política de Cookies',
  'terms-of-service': 'Termos de Serviço',
  'privacy-policy': 'Política de Privacidade',
  'general-terms': 'Termos Gerais',
  'betting-rules': 'Regras de Apostas',
  'responsible-gaming': 'Jogo Responsável',
  'contact-us': 'Fale Conosco',
  'about-us': 'Sobre Nós',
  affiliate: 'Afiliados',
  'download-app': 'Baixar Aplicativo',
  streamer: 'Streamers',
  'expert-predictions': 'Previsões de Especialistas',
  experts: 'Especialistas',
  funds: 'Fundos',
  'game-rules': 'Regras de Jogo',
  tutorial: 'Tutoriais',
}

const SEO_TITLES_PT: Record<string, string> = {
  '2Bet Casino Slots – More Spins, Big Wins': '2Bet Cassino Slots – Mais Giros, Grandes Vitórias',
  'Download 2Bet App — Android APK & iOS | Official Mobile': 'Baixar Aplicativo 2Bet — Android APK e iOS | Mobile Oficial',
  'Sports Betting Tutorial — Step-by-Step Guide | 2Bet': 'Tutorial de Apostas Esportivas — Guia Passo a Passo | 2Bet',
  'Casino Game Guides & How to Play Tutorials | 2Bet': 'Guias de Jogos de Cassino e Tutoriais de Como Jogar | 2Bet',
  'Interactive Casino Game Guides & Rules | 2Bet Help': 'Guias Interativos de Jogos de Cassino e Regras | Ajuda 2Bet',
  'Deposit & Withdrawal Transaction Guides | 2Bet Help': 'Guias de Transações de Depósito e Saque | Ajuda 2Bet',
  'How to Deposit Funds via GCash and Maya Guide in 2Bet Casino': 'Como Depositar Fundos no Cassino 2Bet | Guia Passo a Passo',
  'How to Withdraw Winnings Step-by-Step Guide by 2Bet Casino': 'Como Sacar Ganhos no Cassino 2Bet | Guia Passo a Passo',
  'Mock Betting Simulator & Practice Tutorial | 2Bet': 'Simulador de Apostas e Tutorial Prático | 2Bet',
  'Terms of Use & Player Service Agreement | 2Bet Platform': 'Termos de Uso e Contrato de Serviço do Jogador | Plataforma 2Bet',
  'Online Lottery & Numbers Games | 2Bet Philippines': 'Loteria Online e Jogos de Números | 2Bet',
  'Online Entertainment & Mini Games | 2Bet Philippines': 'Entretenimento Online e Minijogos | 2Bet',
  'Live Casino — Live Baccarat, Roulette & Blackjack | 2Bet': 'Cassino ao Vivo — Bacará, Roleta e Blackjack ao Vivo | 2Bet',
  'Live Plaza Funds & Reward Management | 2Bet Platform': 'Fundos da Praça ao Vivo e Gestão de Recompensas | Plataforma 2Bet',
  'Top Sports Betting Experts & Tipsters | 2Bet Plaza': 'Melhores Especialistas em Apostas Esportivas | Praça 2Bet',
  'Live Plaza — Popular Games & Expert Predictions | 2Bet': 'Praça ao Vivo — Jogos Populares e Previsões de Especialistas | 2Bet',
  'All Sports & Casino Streamers — Live Plaza | 2Bet': 'Todos os Streamers de Esportes e Cassino — Praça ao Vivo | 2Bet',
  'Live Streamers & Match Broadcasts | 2Bet Live Plaza': 'Streamers ao Vivo e Transmissões de Partidas | Praça ao Vivo 2Bet',
  'Browse All Live Plaza Streamers & Channels | 2Bet': 'Explorar Todos os Streamers e Canais da Praça ao Vivo | 2Bet',
  'Expert Predictions & High Hit Rate Tips | 2Bet Plaza': 'Previsões de Especialistas e Dicas de Alta Precisão | Praça 2Bet',
  'Sports Betting Odds, Lines & Live Scores | 2Bet': 'Odds de Apostas Esportivas, Linhas e Placar ao Vivo | 2Bet',
  'Popular Sports Leagues — Live Odds & Matches | 2Bet': 'Ligas Esportivas Populares — Odds ao Vivo e Partidas | 2Bet',
  'Popular In-Play Live Betting — Real-Time Odds | 2Bet': 'Apostas ao Vivo Populares — Odds em Tempo Real | 2Bet',
  'Popular Upcoming Sports Matches & Betting Odds | 2Bet': 'Próximas Partidas Populares e Odds de Apostas | 2Bet',
  'Popular Pre-Match Sports Odds & Match Previews | 2Bet': 'Odds Pré-Jogo Populares e Prévias de Partidas | 2Bet',
  'Popular Smart Pick Sports AI Betting Insights | 2Bet': 'Smart Pick Popular — Análises com Inteligência Artificial | 2Bet',
  'Popular Championship Outrights & Futures Odds | 2Bet': 'Apostas Futuras e Vencedor do Campeonato | 2Bet',
  'Popular Sports Betting Odds & Live Matches | 2Bet': 'Odds de Apostas Esportivas Populares e Partidas ao Vivo | 2Bet',
  '24/7 Customer Support & Help Center | 2Bet Philippines': 'Suporte ao Cliente 24/7 e Central de Ajuda | 2Bet',
  '24/7 Customer Support & Help Center': 'Suporte ao Cliente 24/7 e Central de Ajuda',
  '24/7 Services': 'Atendimento 24/7',
  'Betting History & Transaction Records | 2Bet Platform': 'Histórico de Apostas e Registro de Transações | Plataforma 2Bet',
  'Jackpot Games — Progressive & Daily Drops | 2Bet': 'Jogos de Jackpot — Acumulados e Prêmios Diários | 2Bet',
  'Standalone Jackpot Games & High Multipliers | 2Bet': 'Jogos de Jackpot Standalone e Grandes Multiplicadores | 2Bet',
  'Bingo Games — Color Game, Lottery & Fast Keno | 2Bet': 'Jogos de Bingo — Color Game, Loteria e Keno Rápido | 2Bet',
  'Online Slots — Jackpots, Megaways & Classic Slots | 2Bet': 'Slots Online — Jackpots, Megaways e Caça-Níqueis Clássicos | 2Bet',
  'Terms and Conditions for Promotion | 2bet': 'Termos e Condições da Promoção | 2Bet',
  'Time Zone Settings — Match Schedule Preference | 2Bet': 'Fuso Horário — Preferência de Horário de Partidas | 2Bet',
  'Deposit Funds — GCash, Maya, Bank Transfer | 2Bet': 'Depositar Fundos — Métodos de Pagamento Seguros | 2Bet',
  'My Account Profile & VIP Overview | 2Bet Philippines': 'Perfil da Minha Conta e Visão Geral VIP | 2Bet',
  'Fast Withdrawals — Instant Payouts via GCash | 2Bet': 'Saques Rápidos — Pagamentos Instantâneos | 2Bet',
  'Language Settings — Choose Your Preferred Locale | 2Bet': 'Configurações de Idioma — Escolha seu Idioma | 2Bet',
  'VIP Club & Loyalty Rewards Program | 2Bet Philippines': 'Clube VIP e Programa de Recompensas de Fidelidade | 2Bet',
  'Explore Games, Sports & Casino Entertainment | 2Bet': 'Explore Jogos, Esportes e Entretenimento de Cassino | 2Bet',
  'Cookie Policy — Web Tracking & Privacy Standards | 2Bet': 'Política de Cookies — Rastreamento e Padrões de Privacidade | 2Bet',
  'General Terms & Conditions of Service | 2Bet Platform': 'Termos Gerais e Condições de Serviço | Plataforma 2Bet',
  'Privacy Policy & Personal Data Protection | 2Bet Ph': 'Política de Privacidade e Proteção de Dados | 2Bet',
  'Privacy Policy & Personal Data Protection': 'Política de Privacidade e Proteção de Dados',
  'Official Sports Betting Rules & Guidelines | 2Bet': 'Regras Oficiais de Apostas Esportivas e Diretrizes | 2Bet',
  'Terms of Service & User Agreement | 2Bet Philippines': 'Termos de Serviço e Contrato do Usuário | 2Bet',
  'Contact Us — 24/7 Live Chat & Email Support | 2Bet': 'Fale Conosco — Chat ao Vivo 24/7 e Suporte | 2Bet',
  'Responsible Gaming & Player Assistance | 2Bet Philippines': 'Jogo Responsável e Assistência ao Jogador | 2Bet',
  'About Us — Online Sports & Casino Gaming | 2Bet': 'Sobre Nós — Apostas Esportivas e Cassino Online | 2Bet',
  'Affiliate Partnership Program — Earn Up to 50% | 2Bet': 'Programa de Parceria de Afiliados — Ganhe até 50% | 2Bet',
  'Privacy Policy & Data Protection (RA 10173) | 2Bet': 'Política de Privacidade e Proteção de Dados | 2Bet',
  'Sports Betting Rules & Settlement Directory | 2Bet': 'Regras de Apostas Esportivas e Diretório de Liquidação | 2Bet',
  'Parlay & Multiples Combo Bet Settlement Rules | 2Bet': 'Regras de Liquidação de Apostas Múltiplas e Combinadas | 2Bet',
  'Cash Out Rules, Terms & Settlement Standards | 2Bet': 'Regras de Encerrar Aposta (Cash Out) e Termos | 2Bet',
  'Tennis Betting Rules & Retirement Settlement | 2Bet': 'Regras de Apostas em Tênis e Liquidação de Abandono | 2Bet',
  'Outright Betting Rules & Tournament Futures | 2Bet': 'Regras de Apostas de Longo Prazo e Vencedor Final | 2Bet',
  'Badminton Betting Rules & Settlement Standards | 2Bet': 'Regras de Apostas em Badminton e Padrões de Liquidação | 2Bet',
  'General Sports Betting Rules & Settlement Standards | 2Bet': 'Regras Gerais de Apostas Esportivas e Liquidação | 2Bet',
  'Football / Soccer Betting Rules & Settlement | 2Bet': 'Regras de Apostas em Futebol e Liquidação | 2Bet',
  'Basketball Betting Rules (NBA, PBA & FIBA) | 2Bet': 'Regras de Apostas em Basquete (NBA, NBB e FIBA) | 2Bet',
  'Table Tennis Betting Rules & Match Settlement | 2Bet': 'Regras de Apostas em Tênis de Mesa e Liquidação | 2Bet',
  'Baseball Betting Rules (MLB, NPB & KBO) | 2Bet Sports': 'Regras de Apostas em Beisebol (MLB, NPB e KBO) | 2Bet',
  'Responsible Gaming & Player Protection | 2Bet Philippines': 'Jogo Responsável e Proteção ao Jogador | 2Bet',
  Deposit: 'Depositar',
  Withdraw: 'Sacar',
  VIP: 'VIP',
  Me: 'Minha Conta',
  Sports: 'Esportes',
  Slots: 'Slots',
  Jackpot: 'Jackpot',
  Bingo: 'Bingo',
  Poker: 'Pôquer',
  Bonuses: 'Bônus',
  'Live Casino': 'Cassino ao Vivo',
}

const SEO_DESCRIPTIONS_PT: Record<string, string> = {
  'Experience top-tier gaming on 2Bet Casino. We provide competitive odds and a vast selection of digital casino titles for every visitor.':
    'Experimente jogos de alto nível no Cassino 2Bet. Oferecemos odds competitivas e uma vasta seleção de títulos de cassino digital para todos os jogadores.',
  'Download the official 2Bet mobile app for Android and iOS devices. Enjoy real-time sports odds, seamless live casino streams, and lightning-fast deposits.':
    'Baixe o aplicativo oficial da 2Bet para Android e iOS. Aproveite odds esportivas em tempo real, transmissões de cassino ao vivo e depósitos rápidos.',
  'Contact 2Bet 24/7 Customer Support for fast assistance with deposits, withdrawals, promotions, and account verification. Chat live with us anytime.':
    'Entre em contato com o suporte ao cliente 24/7 da 2Bet para assistência rápida com depósitos, saques, promoções e verificação de conta. Converse ao vivo conosco a qualquer momento.',
  'Manage your 2Bet account profile, security settings, VIP tier status, and transaction history. Fast, secure account management on 2Bet Philippines.':
    'Gerencie o perfil da sua conta na 2Bet, configurações de segurança, status VIP e histórico de transações. Gerenciamento de conta rápido e seguro na 2Bet.',
  'Deposit funds securely to your 2Bet wallet using GCash, Maya, ShopeePay, or online banking. Instant processing and zero transaction fees 24/7.':
    'Deposite fundos com segurança na sua carteira 2Bet com métodos rápidos e seguros. Processamento instantâneo e zero taxas 24 horas por dia.',
  'Withdraw your winnings quickly and securely from 2Bet via GCash, Maya, or direct bank transfer. High limits, zero fees, and 24/7 processing.':
    'Retire seus ganhos com rapidez e segurança na 2Bet. Limites altos, zero taxas e processamento 24 horas por dia.',
  'Explore top-tier online slots at 2Bet. Play progressive jackpots, Megaways, and classic fruit games from world-class gaming providers.':
    'Explore os melhores slots online na 2Bet. Jogue jackpots progressivos, Megaways e clássicos caça-níqueis dos maiores provedores do mundo.',
  'Play live dealer baccarat, blackjack, roulette, and gameshows in HD. Experience authentic casino action with real-time streaming on 2Bet.':
    'Jogue bacará, blackjack, roleta e game shows com crupiês reais em HD. Viva a autêntica emoção de cassino com transmissões em tempo real na 2Bet.',
  'Bet on live in-play and pre-match sports at 2Bet. Competitive odds, real-time match tracking, and comprehensive betting markets.':
    'Aposte em esportes ao vivo e pré-jogo na 2Bet. Odds competitivas, acompanhamento de partidas em tempo real e mercados completos de apostas.',
}

const translateTitleToPt = (raw: string): string => {
  const trimmed = raw.trim()
  if (SEO_TITLES_PT[trimmed]) return SEO_TITLES_PT[trimmed]

  const withoutBrand = trimmed.replace(/\s*\|\s*(?:2Bet|ByBet)(?:\s+[^|]*)?$/i, '').trim()
  if (SEO_TITLES_PT[withoutBrand]) return SEO_TITLES_PT[withoutBrand]

  return trimmed
    .replace(/\bPhilippines\b/gi, '')
    .replace(/\bLeagues & Tournaments Betting Odds\b/gi, 'Odds de Apostas em Ligas e Torneios')
    .replace(/\bLive In-Play\b/gi, 'Ao Vivo em Jogo')
    .replace(/\bBetting & Match Odds\b/gi, 'Apostas e Odds de Partidas')
    .replace(/\bUpcoming Matches & Betting Lines\b/gi, 'Próximas Partidas e Linhas de Aposta')
    .replace(/\bUpcoming (.*?) Matches\b/gi, 'Próximas Partidas de $1')
    .replace(/\bPre-Match (.*?) Odds & Game Predictions\b/gi, 'Odds Pré-Jogo e Previsões de $1')
    .replace(/\bSmart Pick (.*?) AI Betting Tips & Picks\b/gi, 'Smart Pick $1 — Dicas de Apostas com IA')
    .replace(/\bChampionship Outrights & Futures Odds\b/gi, 'Odds de Apostas Futuras e Campeão')
    .replace(/\bMatch Highlights & Video Replays\b/gi, 'Melhores Momentos e Vídeos')
    .replace(/\bBetting Odds & Live Match Lines\b/gi, 'Odds de Apostas e Linhas ao Vivo')
    .replace(/\bBetting Odds, Lines & Live Matches\b/gi, 'Odds de Apostas, Linhas e Partidas ao Vivo')
    .replace(/\bLive Casino — Real Dealer Tables\b/gi, 'Cassino ao Vivo — Mesas com Crupiê Real')
    .replace(/\bOnline Slots — Real Money Games\b/gi, 'Slots Online — Jogos Valendo Dinheiro')
    .replace(/\bPoker & Table Games\b/gi, 'Pôquer e Jogos de Mesa')
    .replace(/\bSoccer\b/gi, 'Futebol')
    .replace(/\bFootball\b/gi, 'Futebol')
    .replace(/\bBasketball\b/gi, 'Basquete')
    .replace(/\bTennis\b/gi, 'Tênis')
    .replace(/\bBaseball\b/gi, 'Beisebol')
    .replace(/\bTable Tennis\b/gi, 'Tênis de Mesa')
    .replace(/\bBadminton\b/gi, 'Badminton')
    .replace(/\bVolleyball\b/gi, 'Vôlei')
    .replace(/\bEsports\b/gi, 'eSports')
    .replace(/\bFishing\b/gi, 'Pesca')
    .replace(/\bMahjong\b/gi, 'Mahjong')
    .replace(/\bBlackjack\b/gi, 'Blackjack')
    .replace(/\bBull Bull\b/gi, 'Bull Bull')
    .replace(/\bBaccarat\b/gi, 'Bacará')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

const formatBreadcrumbSegment = (segment: string, locale: string = 'pt'): string => {
  const decoded = decodeURIComponent(segment).trim()
  const lower = decoded.toLowerCase()
  if (locale === 'pt' && BREADCRUMB_SEGMENT_LABELS_PT[lower]) {
    return BREADCRUMB_SEGMENT_LABELS_PT[lower]
  }
  if (BREADCRUMB_SEGMENT_LABELS[lower]) {
    return BREADCRUMB_SEGMENT_LABELS[lower]
  }
  return decoded
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const buildBreadcrumbsFromUrl = (routePath: string, locale: string = 'pt'): BreadcrumbItem[] => {
  const cleanPath = (routePath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  if (cleanPath === '/') {
    return []
  }

  const segments = cleanPath.split('/').filter(Boolean)
  const homeName = locale === 'pt' ? 'Início' : 'Home'
  const items: BreadcrumbItem[] = [{ name: homeName, path: '/' }]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    items.push({
      name: formatBreadcrumbSegment(segment, locale),
      path: currentPath,
    })
  }

  return items
}

const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const formatSeoTitle = (
  rawTitle: string | undefined,
  siteName: string,
  includeSiteName: boolean = true,
  locale: string = 'pt',
): string => {
  const cleanSiteName = (siteName || '2Bet').trim().replace(/^['"]+|['"]+$/g, '')
  let raw = (rawTitle || '').trim()
  if (!raw) {
    return cleanSiteName
  }

  if (locale === 'pt') {
    raw = translateTitleToPt(raw)
  }

  if (!includeSiteName) {
    return raw
  }

  const escapedSite = escapeRegExp(cleanSiteName)
  const trailingBrandRegex = new RegExp(
    `\\s*\\|\\s*(?:${escapedSite}(?:\\s+[^|]*)?|ByBet(?:\\s+[^|]*)?|2Bet(?:\\s+[^|]*)?)\\s*$`,
    'i',
  )
  const baseTitle = raw.replace(trailingBrandRegex, '').trim()

  if (!baseTitle || baseTitle.toLowerCase() === cleanSiteName.toLowerCase()) {
    return cleanSiteName
  }

  return `${baseTitle} | ${cleanSiteName}`
}

export const isHomepageRoute = (routePath?: string): boolean => {
  const cleanPath = (routePath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  return cleanPath === '/'
}

export const formatSeoDescription = (
  rawDescription: string | undefined,
  siteName: string,
  isHomepage: boolean = false,
  includeCheckMore: boolean = !isHomepage,
  locale: string = 'pt',
): string => {
  const cleanSiteName = (siteName || '2Bet').trim().replace(/^['"]+|['"]+$/g, '')
  let raw = (rawDescription || '').trim()
  const fallback = locale === 'pt'
    ? `${cleanSiteName} — Os Melhores Jogos Online, Cassino Ao Vivo, Apostas Esportivas e Slots.`
    : `${cleanSiteName} — Premier Online Gaming, Live Casino, Sports Betting, and Slots.`

  if (locale === 'pt' && raw) {
    if (SEO_DESCRIPTIONS_PT[raw]) {
      raw = SEO_DESCRIPTIONS_PT[raw]
    } else {
      raw = raw
        .replace(/in the Philippines\.?/gi, '.')
        .replace(/Explore fishing, mahjong, poker, Bull Bull, baccarat and more games on 2Bet\. Browse games by category and provider\./gi, 'Explore jogos de pesca, mahjong, pôquer, Bull Bull, bacará e muito mais na 2Bet. Navegue por categoria e provedor.')
        .replace(/Explore (.*?) games on 2Bet\. Browse games by category and provider\./gi, 'Explore jogos de $1 na 2Bet. Navegue por categoria e provedor.')
        .replace(/Bet on (.*?) on 2Bet\. High odds, live coverage and fast payouts\./gi, 'Aposte em $1 na 2Bet. Odds altas, cobertura ao vivo e pagamentos rápidos.')
        .replace(/Check back soon for something new\./gi, 'Volte em breve para novidades.')
        .replace(/\s{2,}/g, ' ')
        .trim()
    }
  }

  const base = raw || fallback

  if (!includeCheckMore || isHomepage) {
    return base
  }

  const suffix = locale === 'pt' ? `confira mais em ${cleanSiteName}` : `check more at ${cleanSiteName}`
  const escapedSuffix = escapeRegExp(suffix)
  if (new RegExp(escapedSuffix, 'i').test(base)) {
    return base
  }

  const separator = /[.!?]$/.test(base) ? ' ' : '. '
  return `${base}${separator}${suffix}`
}

export const useAppSeo = (options: AppSeoOptions) => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const { locale, translate } = useSiteLocale()
  const isHomepage = computed(() => isHomepageRoute(route.path))

  const siteName = computed(() => {
    const custom = resolveVal(options.siteName)
    if (typeof custom === 'string' && custom.trim()) {
      return custom.trim().replace(/^['"]+|['"]+$/g, '')
    }
    return String(config.public.siteName || '2Bet Slots')
      .trim()
      .replace(/^['"]+|['"]+$/g, '')
  })
  const siteUrl = computed(() => String(config.public.siteUrl || 'https://2bet.com').replace(/\/+$/, ''))

  const shouldIncludeSiteName = computed(() => {
    const optSiteName = resolveVal(options.siteName)
    if (optSiteName === false) return false
    const inc = resolveVal(options.includeSiteName)
    if (typeof inc === 'boolean') return inc
    const withName = resolveVal(options.withSiteName)
    if (typeof withName === 'boolean') return withName
    // Default: false on homepage ('/'), true everywhere else
    return !isHomepage.value
  })

  const shouldIncludeCheckMore = computed(() => {
    const custom = resolveVal(options.includeCheckMore)
    if (typeof custom === 'boolean') return custom
    return !isHomepage.value
  })

  const title = computed(() => {
    const raw = resolveVal(options.title)
    return formatSeoTitle(raw, siteName.value, shouldIncludeSiteName.value, locale.value)
  })

  const description = computed(() => {
    const raw = resolveVal(options.description)
    return formatSeoDescription(
      raw,
      siteName.value,
      isHomepage.value,
      shouldIncludeCheckMore.value,
      locale.value,
    )
  })

  const keywords = computed(() => {
    const custom = resolveVal(options.keywords)
    if (custom) return custom
    if (locale.value === 'pt') {
      return `${siteName.value}, apostas esportivas, cassino online, slots, cassino ao vivo, jogos online`
    }
    return `${siteName.value}, sports betting, online casino, slots, live casino, Philippines gaming`
  })

  const image = computed(() => {
    return resolveVal(options.image) || '/brand/2bet-logo.webp'
  })

  const canonicalUrl = computed(() => {
    const p = route.path || '/'
    return `${siteUrl.value}${p}`
  })

  const defaultRobots = computed(() => {
    return config.public.indexFollow ? 'index, follow' : 'noindex, nofollow'
  })

  const robots = computed(() => {
    const custom = resolveVal(options.robots)
    if (typeof custom === 'string' && custom.trim()) {
      return custom.trim()
    }
    return defaultRobots.value
  })

  useSeoMeta({
    title,
    ogTitle: title,
    ogSiteName: siteName,
    twitterTitle: title,
    description,
    ogDescription: description,
    twitterDescription: description,
    keywords,
    ogImage: image,
    twitterImage: image,
    twitterCard: 'summary_large_image',
    ogType: options.type || 'website',
    robots,
  })

  useHead(() => {
    const scripts: Array<{ key: string; type: string; children: string }> = []

    // Follow custom breadcrumbs or current URL path, localized to active locale
    const rawBreadcrumbs = resolveVal(options.breadcrumbs)
    const activeBreadcrumbs = rawBreadcrumbs && rawBreadcrumbs.length > 0
      ? (locale.value === 'pt'
          ? rawBreadcrumbs.map(item => ({
              ...item,
              name: item.name.toLowerCase() === 'home'
                ? 'Início'
                : (BREADCRUMB_SEGMENT_LABELS_PT[item.name.toLowerCase()] || translate(item.name)),
            }))
          : rawBreadcrumbs)
      : buildBreadcrumbsFromUrl(route.path, locale.value)

    if (activeBreadcrumbs.length > 0) {
      const itemListElement = activeBreadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.path
          ? item.path.startsWith('http')
            ? item.path
            : `${siteUrl.value}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
          : `${siteUrl.value}${route.path}`,
      }))

      scripts.push({
        key: 'schema-breadcrumb',
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement,
        }),
      })
    }

    const customSchema = resolveVal(options.schema)
    if (customSchema) {
      const schemaList = Array.isArray(customSchema) ? customSchema : [customSchema]
      schemaList
        .filter((s) => s && s['@type'] !== 'BreadcrumbList')
        .forEach((s, index) => {
          const schemaType = typeof s['@type'] === 'string' ? s['@type'].toLowerCase() : `item-${index}`
          scripts.push({
            key: `schema-custom-${schemaType}-${index}`,
            type: 'application/ld+json',
            children: JSON.stringify(s),
          })
        })
    }

    return {
      link: [
        {
          key: 'canonical',
          rel: 'canonical',
          href: canonicalUrl.value,
        },
      ],
      script: scripts,
    }
  })
}

