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
  { id: 'vip-sports-rebate', tone: 'sports', bannerImage: '/images/promotions/homepage-v2/sports.webp', title: 'VIP Sports Rebate', description: 'Your Reward to End the Day', slug: 'vip-sports-rebate', accentColor: '#10b981' },
  { id: 'slot-loss-rebate', tone: 'slots', bannerImage: '/images/promotions/homepage-v2/slots.webp', title: 'Slot Loss Rebate', description: 'Turn Spins into Wins', slug: 'slot-loss-rebate', accentColor: '#f59e0b' },
  { id: 'vip-live-casino-rebate', tone: 'live-casino', bannerImage: '/images/promotions/homepage-v2/live-casino.webp', title: 'VIP Live Casino Rebate', description: 'Live Dealer Protection', slug: 'vip-live-casino-rebate', accentColor: '#ec4899' },
  { id: 'lucky-rankings', tone: 'rankings', bannerImage: '/images/promotions/homepage-v2/rankings.webp', title: 'Lucky Rankings', description: 'Climb the Ranks & Win', slug: 'lucky-rankings', accentColor: '#8b5cf6' },
]

export const HOMEPAGE_PROMOTIONS = presentation.map(visual => {
  const match = FEATURED_PROMOTIONS.find(promotion => promotion.id === visual.id)
  return {
    ...visual,
    ...(match || {}),
    bannerImage: visual.bannerImage,
    tone: visual.tone,
  }
})

