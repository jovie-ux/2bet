import { defineEventHandler, setResponseHeader, type H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const config = useRuntimeConfig(event)
  const isIndexFollow = Boolean(config.public.indexFollow)
  const siteUrl = String(config.public.siteUrl || 'https://bybet.com').replace(/\/+$/, '')

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  if (isIndexFollow) {
    return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  }

  return `User-agent: *\nDisallow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
})
