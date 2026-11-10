import { defineEventHandler, setResponseHeader, type H3Event } from 'h3'
import { buildLlmsTxtContent } from '~/scripts/generate-llms-txt.mjs'

export default defineEventHandler((event: H3Event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || 'https://2bet.com').replace(/\/+$/, '')
  const siteName = String(config.public.siteName || '2bet')

  setResponseHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=14400')

  return buildLlmsTxtContent(siteUrl, siteName)
})
