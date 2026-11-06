import type { EffectiveTheme } from '~/composables/useSitePreferences'

const lightProviderLogoByDefault: Readonly<Record<string, string>> = {
  '/images/providers/pg.webp': '/images/providers/light/pg.webp',
  '/images/providers/jili.webp': '/images/providers/light/jili.webp',
  '/images/providers/pp.webp': '/images/providers/light/pp.webp',
  '/images/providers/cq9.webp': '/images/providers/light/cq9.webp',
  '/images/providers/jdb.webp': '/images/providers/light/jdb.webp',
  '/images/providers/red-tiger.webp': '/images/providers/light/red-tiger.webp',
  '/images/providers/choice.webp': '/images/providers/light/choice.webp',
  '/images/providers/bs.webp': '/images/providers/light/bs.webp',
  '/images/providers/netent.webp': '/images/providers/light/netent.webp',
  '/images/providers/lgd.webp': '/images/providers/light/lgd.webp',
  '/images/providers/mg.webp': '/images/providers/light/mg.webp',
  '/images/providers/mg-plus.webp': '/images/providers/light/mg.webp',
  '/images/providers/2bet.webp': '/images/providers/light/2bet.webp',
  '/images/providers/ai-casino.webp': '/images/providers/light/ai-casino.webp',
  '/images/providers/db.webp': '/images/providers/light/db.webp',
  '/images/providers/ky.webp': '/images/providers/light/ky.webp',
  '/images/providers/v8.webp': '/images/providers/light/v8.webp',
  '/images/providers/ks.webp': '/images/providers/light/ks.webp',
  // PNG fallbacks
  '/images/providers/pg.png': '/images/providers/light/pg.png',
  '/images/providers/jili.png': '/images/providers/light/jili.png',
  '/images/providers/pp.png': '/images/providers/light/pp.png',
  '/images/providers/cq9.png': '/images/providers/light/cq9.png',
  '/images/providers/jdb.png': '/images/providers/light/jdb.png',
  '/images/providers/red-tiger.png': '/images/providers/light/red-tiger.png',
  '/images/providers/choice.png': '/images/providers/light/choice.png',
  '/images/providers/bs.png': '/images/providers/light/bs.png',
  '/images/providers/netent.png': '/images/providers/light/netent.png',
  '/images/providers/lgd.png': '/images/providers/light/lgd.png',
  '/images/providers/mg.png': '/images/providers/light/mg.png',
  '/images/providers/mg-plus.png': '/images/providers/light/mg-plus.png',
  '/images/providers/2bet.png': '/images/providers/light/2bet.png',
  '/images/providers/ai-casino.png': '/images/providers/light/ai-casino.png',
  '/images/providers/db.png': '/images/providers/light/db.png',
  '/images/providers/ky.png': '/images/providers/light/ky.png',
  '/images/providers/v8.png': '/images/providers/light/v8.png',
  '/images/providers/ks.png': '/images/providers/light/ks.png',
}

export const getProviderLogoForTheme = (
  providerLogo: string | undefined,
  theme: EffectiveTheme,
): string => {
  if (!providerLogo || theme !== 'light') {
    return providerLogo ?? ''
  }

  return lightProviderLogoByDefault[providerLogo] ?? providerLogo
}
