import { FEATURED_PROMOTIONS, type FeaturedPromo } from '~/data/promotions'

const presentation: Array<{
  id: string
  tone: string
  bannerImage: string
  title: string
  description: string
  slug: string
  accentColor: string
}> = [
  {
    id: 'seu-primeiro-deposito',
    tone: 'slots',
    bannerImage: '/images/promotions/seu_primeiro_deposito.png',
    title: 'Seu Primeiro Depósito Vale Mais!',
    description: 'Até R$ 10.000 em Bônus de Boas-Vindas',
    slug: 'seu-primeiro-deposito',
    accentColor: '#019440',
  },
  {
    id: 'bonus-diario-de-recuperacao',
    tone: 'sports',
    bannerImage: '/images/promotions/bonus_diario_de_recuperacao.png',
    title: 'Bônus Diário de Recuperação',
    description: 'Até R$ 18.888 de Volta em Perdas',
    slug: 'bonus-diario-de-recuperacao',
    accentColor: '#10b981',
  },
  {
    id: 'vip-privileges',
    tone: 'live-casino',
    bannerImage: '/images/promotions/programa_vip.png',
    title: 'Sistema de Privilégios VIP',
    description: 'Cashback e Benefícios Exclusivos',
    slug: 'vip-privileges',
    accentColor: '#8b5cf6',
  },
  {
    id: 'share-and-earn',
    tone: 'rankings',
    bannerImage: '/images/promotions/share_and_earn.png',
    title: 'Programa Compartilhe e Ganhe',
    description: 'Comissões Contínuas por Convite',
    slug: 'share-and-earn',
    accentColor: '#019440',
  },
]

export const HOMEPAGE_PROMOTIONS = presentation.map(visual => {
  const match = FEATURED_PROMOTIONS.find(promotion => promotion.id === visual.id || promotion.slug === visual.slug)
  return {
    ...visual,
    ...(match || {}),
    bannerImage: visual.bannerImage,
    tone: visual.tone,
  }
})

