import { defineEventHandler, setResponseHeader, type H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const config = useRuntimeConfig(event)
  const isIndexFollow = Boolean(config.public.indexFollow)

  setResponseHeader(event, 'content-type', 'text/plain')

  if (isIndexFollow) {
    return 'User-agent: *\nAllow: /\n'
  }

  return 'User-agent: *\nDisallow: /\n'
})
