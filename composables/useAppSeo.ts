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
  'most-popular': 'Mais Populares',
  bonuses: 'Bônus',
  bonus: 'Bônus',
  account: 'Minha Conta',
  deposit: 'Depósito',
  'new-member': 'Novo Membro',
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
  '2Bet Casino Slots – More Spins, Big Wins': '2bet Cassino Online e Slots – Mais Giros e Grandes Prêmios',
  'Download 2Bet App — Android APK & iOS | Official Mobile': 'Baixar Aplicativo 2bet — Android APK e iOS Mobile | 2bet',
  'Sports Betting Tutorial — Step-by-Step Guide | 2Bet': 'Tutorial de 2bet Apostas — Guia Passo a Passo | 2bet',
  'Casino Game Guides & How to Play Tutorials | 2Bet': 'Guias de 2bet Game e Jogos de Cassino Online | 2bet',
  'Interactive Casino Game Guides & Rules | 2Bet Help': 'Guias de Jogos e Regras do 2bet Casino Online | 2bet',
  'Deposit & Withdrawal Transaction Guides | 2Bet Help': 'Guia de Depósito e Saque na Plataforma 2bet | 2bet',
  'How to Deposit Funds via GCash and Maya Guide in 2Bet Casino': 'Como Fazer Depósito Rápido na Plataforma 2bet | 2bet',
  'How to Withdraw Winnings Step-by-Step Guide by 2Bet Casino': 'Como Sacar Ganhos de Apostas na Plataforma 2bet | 2bet',
  'Mock Betting Simulator & Practice Tutorial | 2Bet': 'Simulador de Apostas Esportivas em 2bet Bet | 2bet',
  'Terms of Use & Player Service Agreement | 2Bet Platform': 'Termos de Uso e Contrato de Serviço do Jogador | 2bet',
  'Online Lottery & Numbers Games | 2Bet Brasil': 'Loteria Online e Jogos de Números com Sorteios | 2bet',
  'Online Entertainment & Mini Games | 2Bet Brasil': 'Entretenimento Online, Arcade e Minijogos de Cassino | 2bet',
  'Live Casino — Live Baccarat, Roulette & Blackjack | 2Bet': 'Cassino ao Vivo — Bacará, Roleta e Blackjack HD | 2bet',
  'Live Plaza Funds & Reward Management | 2Bet Platform': 'Fundos da Praça ao Vivo e Gestão de Recompensas | 2bet',
  'Top Sports Betting Experts & Tipsters | 2Bet Plaza': 'Melhores Especialistas em Apostas Esportivas | 2bet',
  'Live Plaza — Popular Games & Expert Predictions | 2Bet': 'Praça ao Vivo — Jogos Populares e Dicas de Apostas | 2bet',
  'All Sports & Casino Streamers — Live Plaza | 2Bet': 'Todos os Streamers de Esportes e Cassino ao Vivo | 2bet',
  'Live Streamers & Match Broadcasts | 2Bet Live Plaza': 'Streamers ao Vivo e Transmissões de Partidas | 2bet',
  'Browse All Live Plaza Streamers & Channels | 2Bet': 'Explorar Todos os Streamers e Canais da Praça | 2bet',
  'Expert Predictions & High Hit Rate Tips | 2Bet Plaza': 'Previsões de Especialistas e Dicas de Alta Precisão | 2bet',
  'Sports Betting Odds, Lines & Live Scores | 2Bet': 'Odds de Apostas Esportivas, Linhas e Placar ao Vivo | 2bet',
  'Popular Sports Leagues — Live Odds & Matches | 2Bet': 'Ligas Esportivas Populares — Odds ao Vivo e Jogos | 2bet',
  'Popular In-Play Live Betting — Real-Time Odds | 2Bet': 'Apostas Esportivas ao Vivo — Odds em Tempo Real | 2bet',
  'Popular Upcoming Sports Matches & Betting Odds | 2Bet': 'Próximas Partidas Esportivas e Odds de Apostas | 2bet',
  'Popular Pre-Match Sports Odds & Match Previews | 2Bet': 'Odds Pré-Jogo Populares e Prévias de Partidas | 2bet',
  'Popular Smart Pick Sports AI Betting Insights | 2Bet': 'Smart Pick Esportivo — Dicas de Apostas com IA | 2bet',
  'Popular Championship Outrights & Futures Odds | 2Bet': 'Apostas Futuras e Vencedores de Campeonatos | 2bet',
  'Popular Sports Betting Odds & Live Matches | 2Bet': 'Odds de Apostas Esportivas Populares e Ao Vivo | 2bet',
  'Popular Sports Betting — Top Match Odds & Events | 2Bet': 'Apostas Esportivas Populares — Melhores Odds e Jogos | 2bet',
  'Live Sports Betting Hub — In-Play Match Odds | 2Bet': 'Central de Apostas Esportivas ao Vivo — Odds Reais | 2bet',
  'Live In-Play Sports Betting — Real-Time Odds | 2Bet': 'Apostas Esportivas ao Vivo em Jogo — Odds Reais | 2bet',
  '24/7 Customer Support & Help Center | 2Bet Brasil': 'Suporte ao Cliente 24/7 e Central de Ajuda Online | 2bet',
  '24/7 Customer Support & Help Center': 'Suporte ao Cliente 24/7 e Central de Ajuda Online | 2bet',
  '24/7 Services': 'Atendimento ao Cliente 24/7 e Suporte Online no Brasil | 2bet',
  'Betting History & Transaction Records | 2Bet Platform': 'Histórico de Apostas e Registro de Transações | 2bet',
  'E-Games History — Slots & Casino Session Logs | 2Bet': 'Histórico de Jogos — Registro de Sessões de Slots | 2bet',
  'Jackpot Games — Progressive & Daily Drops | 2Bet': 'Jogos de Jackpot — Acumulados e Prêmios Diários | 2bet',
  'Progressive Jackpots — Big Win Casino Slots | 2Bet': 'Jackpots Progressivos — Slots com Grandes Prêmios | 2bet',
  'Standalone Jackpot Games & High Multipliers | 2Bet': 'Jogos de Jackpot Standalone e Multiplicadores | 2bet',
  'Standalone Jackpot Games — Betsoft Slots | 2Bet': 'Jogos de Jackpot Standalone — Slots Betsoft Online | 2bet',
  'Bingo Games — Color Game, Lottery & Fast Keno | 2Bet': 'Jogos de Bingo Online — Loteria e Keno Rápido | 2bet',
  'Online Bingo Games — Fast Paced Fun & Wins | 2Bet': 'Jogos de Bingo Online — Sorteios Rápidos e Prêmios | 2bet',
  'Online Slots — Jackpots, Megaways & Classic Slots | 2Bet': 'Slots Online — Jackpots, Megaways e Caça-Níqueis | 2bet',
  'Online Slots — Real Money Slots & Jackpots | 2Bet': 'Slots Online — Caça-Níqueis e Jackpots em R$ | 2bet',
  'Terms and Conditions for Promotion | 2bet': 'Termos e Condições Oficiais das Promoções e Bônus | 2bet',
  'Time Zone Settings — Match Schedule Preference | 2Bet': 'Configurações de Fuso Horário — Agenda de Jogos | 2bet',
  'Deposit Funds — GCash, Maya, Bank Transfer | 2Bet': 'Depositar Fundos — Pagamentos Rápidos e Seguros | 2bet',
  'My Account Profile & VIP Overview | 2Bet Brasil': 'Perfil da Minha Conta e Visão Geral do Clube VIP | 2bet',
  'Minha Conta e Visão Geral VIP | 2Bet': 'Perfil da Minha Conta e Visão Geral do Clube VIP | 2bet',
  'Fast Withdrawals — Instant Payouts via GCash | 2Bet': 'Saques Rápidos — Pagamentos Instantâneos na Conta | 2bet',
  'Language Settings — Choose Your Preferred Locale | 2Bet': 'Configurações de Idioma — Escolha a Sua Região | 2bet',
  'VIP Club & Loyalty Rewards Program | 2Bet Brasil': 'Clube VIP e Programa de Recompensas e Fidelidade | 2bet',
  'Explore Games, Sports & Casino Entertainment | 2Bet': 'Explore Jogos, Apostas Esportivas e Cassino Online | 2bet',
  'Cookie Policy — Web Tracking & Privacy Standards | 2Bet': 'Política de Cookies — Padrões de Privacidade Web | 2bet',
  'General Terms & Conditions of Service | 2Bet Platform': 'Termos Gerais e Condições de Serviço da Plataforma | 2bet',
  'Privacy Policy & Personal Data Protection | 2Bet Brasil': 'Política de Privacidade e Proteção de Dados Pessoais | 2bet',
  'Privacy Policy & Personal Data Protection': 'Política de Privacidade e Proteção de Dados Pessoais | 2bet',
  'Official Sports Betting Rules & Guidelines | 2Bet': 'Regras Oficiais de Apostas Esportivas e Diretrizes | 2bet',
  'Terms of Service & User Agreement | 2Bet Brasil': 'Termos de Serviço e Contrato Oficial do Usuário | 2bet',
  'Contact Us — 24/7 Live Chat & Email Support | 2Bet': 'Fale Conosco — Chat ao Vivo 24/7 e Suporte Online | 2bet',
  'Responsible Gaming & Player Assistance | 2Bet Brasil': 'Jogo Responsável e Assistência Segura ao Jogador | 2bet',
  'About Us — Online Sports & Casino Gaming | 2Bet': 'Sobre Nós — Apostas Esportivas e Cassino Online | 2bet',
  'Affiliate Partnership Program — Earn Up to 50% | 2Bet': 'Programa de Parceria de Afiliados — Ganhe até 50% | 2bet',
  'Privacy Policy & Data Protection (RA 10173) | 2Bet': 'Política de Privacidade e Proteção de Dados LGPD | 2bet',
  'Sports Betting Rules & Settlement Directory | 2Bet': 'Regras Oficiais de 2bet Apostas e Liquidação | 2bet',
  'Parlay & Multiples Combo Bet Settlement Rules | 2Bet': 'Apostas Múltiplas e Combinadas em 2bet Bet Online | 2bet',
  'Cash Out Rules, Terms & Settlement Standards | 2Bet': 'Regras de Cash Out na Plataforma 2bet Apostas | 2bet',
  'Tennis Betting Rules & Retirement Settlement | 2Bet': 'Regras de Tênis para 2bet Apostas e Torneios | 2bet',
  'Outright Betting Rules & Tournament Futures | 2Bet': 'Apostas Futuras de Campeão em 2bet Bet Online | 2bet',
  'Badminton Betting Rules & Settlement Standards | 2Bet': 'Regras de Badminton em 2bet Apostas Esportivas | 2bet',
  'General Sports Betting Rules & Settlement Standards | 2Bet': 'Regras Gerais para 2bet Apostas e Mercados Online | 2bet',
  'Football / Soccer Betting Rules & Settlement | 2Bet': 'Regras de Futebol para 2bet Apostas e Linhas | 2bet',
  'Basketball Betting Rules (NBA, PBA & FIBA) | 2Bet': 'Regras de Basquete para 2bet Apostas e Odds | 2bet',
  'Table Tennis Betting Rules & Match Settlement | 2Bet': 'Regras de Tênis de Mesa ITTF em 2bet Apostas | 2bet',
  'Baseball Betting Rules (MLB, NPB & KBO) | 2Bet Sports': 'Regras de Beisebol MLB e NPB em 2bet Apostas | 2bet',
  'Responsible Gaming & Player Protection | 2Bet Brasil': 'Jogo Responsável e Proteção Segura ao Jogador | 2bet',
  'Bonuses & USDT Promotions | 2bet': 'Bônus de Cassino e Promoções Exclusivas em USDT | 2bet',
}

const SEO_DESCRIPTIONS_PT: Record<string, string> = {
  'Experience top-tier gaming on 2Bet Casino. We provide competitive odds and a vast selection of digital casino titles for every visitor.':
    'Aproveite os melhores jogos no Cassino 2bet Brasil. Oferecemos odds competitivas, slots com jackpot em R$ e cassino ao vivo para você.',
  'Download the official 2Bet mobile app for Android and iOS devices. Enjoy real-time sports odds, seamless live casino streams, and lightning-fast deposits.':
    'Baixe o aplicativo oficial da 2bet para Android e iOS. Aproveite odds esportivas ao vivo, cassino em HD e pagamentos rápidos no celular.',
  'Contact 2Bet 24/7 Customer Support for fast assistance with deposits, withdrawals, promotions, and account verification. Chat live with us anytime.':
    'Fale com o suporte ao cliente 24/7 da 2bet para ajuda rápida com depósitos, saques, bônus e verificação de conta. Atendimento ao vivo.',
  'Manage your 2Bet account profile, security settings, VIP tier status, and transaction history. Fast, secure account management on 2Bet Brasil.':
    'Gerencie o perfil da sua conta na 2bet Brasil, configurações de segurança, nível VIP e histórico de transações com proteção e rapidez.',
  'Deposit funds securely to your 2Bet wallet using GCash, Maya, ShopeePay, or online banking. Instant processing and zero transaction fees 24/7.':
    'Deposite fundos com segurança na sua carteira 2bet usando métodos de pagamento rápidos. Processamento imediato e zero taxas 24 horas.',
  'Withdraw your winnings quickly and securely from 2Bet via GCash, Maya, or direct bank transfer. High limits, zero fees, and 24/7 processing.':
    'Saque seus ganhos com rapidez e segurança na 2bet Brasil. Aproveite limites altos, zero tarifas extras e processamento rápido 24 horas.',
  'Explore top-tier online slots at 2Bet. Play progressive jackpots, Megaways, and classic fruit games from world-class gaming providers.':
    'Explore os melhores slots online na 2bet Brasil. Jogue jackpots progressivos em R$, Megaways e caça-níqueis dos maiores provedores.',
  'Play live dealer baccarat, blackjack, roulette, and gameshows in HD. Experience authentic casino action with real-time streaming on 2Bet.':
    'Jogue bacará, blackjack, roleta e game shows com crupiês ao vivo em HD. Viva a emoção autêntica do cassino em tempo real na 2bet Brasil.',
  'Bet on live in-play and pre-match sports at 2Bet. Competitive odds, real-time match tracking, and comprehensive betting markets.':
    'Aposte em esportes ao vivo e pré-jogo na 2bet Brasil. Odds competitivas, estatísticas em tempo real e mercados completos de apostas.',
}

const PT_TITLE_EXTENSIONS = [
  ' — Cassino e Apostas Online no Brasil',
  ' — Apostas e Cassino Online no Brasil',
  ' — Apostas e Jogos Online no Brasil',
  ' — Cassino Online e Apostas Brasil',
  ' — Plataforma Oficial no Brasil',
  ' — Cassino e Apostas no Brasil',
  ' — Jogos e Apostas no Brasil',
  ' — Cassino Online no Brasil',
  ' — Apostas Online no Brasil',
  ' no Cassino Online Brasil',
  ' na Plataforma Oficial',
  ' — Cassino no Brasil',
  ' no Cassino Online',
  ' — Brasil Oficial',
  ' Online no Brasil',
  ' — Jogos Online',
  ' no Cassino',
  ' no Brasil',
  ' Online',
  ' Brasil',
]

const trimTextWithinRange = (text: string, minLen: number, maxLen: number): string => {
  const s = text.trim()
  if (s.length <= maxLen) return s
  const slice = s.slice(0, maxLen + 1)
  const lastSpace = slice.lastIndexOf(' ')
  if (lastSpace >= minLen) {
    const candidate = slice.slice(0, lastSpace).replace(/[\s—\-–,:;|•]+$/, '').trim()
    if (candidate.length >= minLen && candidate.length <= maxLen) {
      return candidate
    }
  }
  return s.slice(0, maxLen).replace(/[\s—\-–,:;|•]+$/, '').trim()
}

const enforcePtBaseTitleLength = (baseTitle: string, minLen: number, maxLen: number): string => {
  let clean = baseTitle.replace(/\s{2,}/g, ' ').replace(/[\s—\-–,:;|•]+$/, '').trim()
  if (clean.length >= minLen && clean.length <= maxLen) {
    return clean
  }
  if (clean.length > maxLen) {
    clean = trimTextWithinRange(clean, minLen, maxLen)
    if (clean.length >= minLen && clean.length <= maxLen) {
      return clean
    }
  }
  for (const ext of PT_TITLE_EXTENSIONS) {
    const candidate = `${clean}${ext}`
    if (candidate.length >= minLen && candidate.length <= maxLen) {
      return candidate
    }
  }
  const extended = `${clean} — Cassino Online e Apostas Esportivas no Brasil Oficial`
  let result = trimTextWithinRange(extended, minLen, maxLen)
  while (result.length < minLen) {
    result = `${result} Brasil`.slice(0, maxLen).trim()
  }
  return result
}

const enforcePtDescriptionLength = (rawDesc: string, minLen: number = 125, maxLen: number = 140): string => {
  let desc = rawDesc.replace(/\s{2,}/g, ' ').trim()
  if (!/[.!?]$/.test(desc)) {
    desc = `${desc}.`
  }
  if (desc.length >= minLen && desc.length <= maxLen) {
    return desc
  }
  if (desc.length < minLen) {
    desc = `${desc} Aproveite odds competitivas, bônus exclusivos, suporte 24/7 e pagamentos rápidos em BRL na plataforma oficial da 2bet Brasil.`
      .replace(/\s{2,}/g, ' ')
      .trim()
  }
  if (desc.length > maxLen) {
    const limit = maxLen - 1
    const slice = desc.slice(0, limit + 1)
    const lastSpace = slice.lastIndexOf(' ')
    if (lastSpace >= minLen - 1) {
      const candidate = slice.slice(0, lastSpace).replace(/[\s.,;:\-—–|•]+$/, '').trim()
      if (candidate.length + 1 >= minLen && candidate.length + 1 <= maxLen) {
        return `${candidate}.`
      }
    }
    const hard = desc.slice(0, limit).replace(/[\s.,;:\-—–|•]+$/, '').trim()
    return `${hard}.`
  }
  return desc
}

const translateTitleToPt = (raw: string): string => {
  const trimmed = raw.trim()
  if (SEO_TITLES_PT[trimmed]) return SEO_TITLES_PT[trimmed]

  const withoutBrand = trimmed.replace(/\s*\|\s*(?:2Bet|ByBet)(?:\s+[^|]*)?$/i, '').trim()
  if (SEO_TITLES_PT[withoutBrand]) return SEO_TITLES_PT[withoutBrand]

  return trimmed
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
  siteName: string = '2bet',
  includeSiteName: boolean = true,
  locale: string = 'pt',
): string => {
  const cleanSiteName = (siteName || '2bet').trim().replace(/^['"]+|['"]+$/g, '')
  let raw = (rawTitle || '').trim()
  if (!raw) {
    raw = locale === 'pt'
      ? 'Apostas Esportivas, Cassino ao Vivo e Slots Online'
      : `${cleanSiteName} — Online Casino, Slots & Sports Betting`
  }

  if (locale === 'pt') {
    raw = translateTitleToPt(raw)
  }

  if (!includeSiteName) {
    if (locale === 'pt') {
      return enforcePtBaseTitleLength(raw, 50, 60)
    }
    return raw
  }

  const escapedSite = escapeRegExp(cleanSiteName)
  const trailingBrandRegex = new RegExp(
    `\\s*\\|\\s*(?:${escapedSite}(?:\\s+[^|]*)?|ByBet(?:\\s+[^|]*)?|2Bet(?:\\s+[^|]*)?)\\s*$`,
    'i',
  )
  let baseTitle = raw.replace(trailingBrandRegex, '').trim()

  if (!baseTitle || baseTitle.toLowerCase() === cleanSiteName.toLowerCase()) {
    baseTitle = locale === 'pt'
      ? 'Apostas Esportivas, Cassino ao Vivo e Slots Online'
      : 'Online Casino, Live Dealer Tables & Sports Betting'
  }

  const suffix = ` | ${cleanSiteName}`
  if (locale === 'pt') {
    const minBase = Math.max(10, 50 - suffix.length)
    const maxBase = Math.max(minBase, 60 - suffix.length)
    baseTitle = enforcePtBaseTitleLength(baseTitle, minBase, maxBase)
  }

  return `${baseTitle}${suffix}`
}

export const isHomepageRoute = (routePath?: string): boolean => {
  const cleanPath = (routePath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  return cleanPath === '/'
}

export const formatSeoDescription = (
  rawDescription: string | undefined,
  siteName: string = '2bet',
  isHomepage: boolean = false,
  includeCheckMore: boolean = false,
  locale: string = 'pt',
): string => {
  const cleanSiteName = (siteName || '2bet').trim().replace(/^['"]+|['"]+$/g, '')
  let raw = (rawDescription || '').trim()
  const fallback = locale === 'pt'
    ? `Jogue no cassino online ${cleanSiteName} Brasil com slots de alto RTP, jackpots em R$, cassino ao vivo em HD e apostas esportivas com saques rápidos.`
    : `${cleanSiteName} — Premier Online Gaming, Live Casino, Sports Betting, and Slots.`

  if (locale === 'pt' && raw) {
    if (SEO_DESCRIPTIONS_PT[raw]) {
      raw = SEO_DESCRIPTIONS_PT[raw]
    } else {
      raw = raw
        .replace(/in the Philippines\.?/gi, 'no Brasil.')
        .replace(/2Bet Philippines/gi, '2bet Brasil')
        .replace(/Explore fishing, mahjong, poker, Bull Bull, baccarat and more games on 2Bet\. Browse games by category and provider\./gi, 'Explore jogos de pesca, mahjong, pôquer, Bull Bull, bacará e muito mais na 2bet Brasil. Navegue por categoria e provedor oficial.')
        .replace(/Explore (.*?) games on 2Bet\. Browse games by category and provider\./gi, 'Explore jogos de $1 na 2bet Brasil. Navegue por categoria e provedor com mesas dinâmicas, bônus exclusivos e pagamentos rápidos.')
        .replace(/Bet on (.*?) on 2Bet\. High odds, live coverage and fast payouts\./gi, 'Aposte em $1 na 2bet Brasil. Aproveite odds competitivas, cobertura ao vivo em tempo real e pagamentos rápidos 24 horas por dia.')
        .replace(/Check back soon for something new\./gi, 'Volte em breve para conferir novidades e lançamentos exclusivos na 2bet Brasil.')
        .replace(/\s{2,}/g, ' ')
        .trim()
    }
  }

  let base = raw || fallback

  if (includeCheckMore && !isHomepage) {
    const suffix = locale === 'pt' ? `confira mais em ${cleanSiteName}` : `check more at ${cleanSiteName}`
    const escapedSuffix = escapeRegExp(suffix)
    if (!new RegExp(escapedSuffix, 'i').test(base)) {
      const separator = /[.!?]$/.test(base) ? ' ' : '. '
      base = `${base}${separator}${suffix}`
    }
  }

  if (locale === 'pt') {
    return enforcePtDescriptionLength(base, 125, 140)
  }

  return base
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
    return String(config.public.siteName || '2bet')
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
    return false
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
    return `${siteName.value}, sports betting, online casino, slots, live casino, Brasil gaming`
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

