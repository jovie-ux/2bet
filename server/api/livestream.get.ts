import type { H3Event } from 'h3'
import { getKadarioCatalog } from '~/server/utils/kadarioApi'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig(event)
  return getKadarioCatalog(config.kadarioApi, config.kadarioSite, true)
})
