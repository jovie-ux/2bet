import { defineEventHandler, setResponseHeader, type H3Event } from 'h3'
import { generateSitemapXml } from '~/server/utils/sitemap'

export default defineEventHandler((event: H3Event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || 'https://2bet.com').replace(/\/+$/, '')

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=14400')

  return generateSitemapXml(siteUrl)
})

