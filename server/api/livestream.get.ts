import type { H3Event } from 'h3'
import { getKadarioCatalog } from '~/server/utils/kadarioApi'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig(event)
  const livestreamUrl = (config.livestreamApi as string) || 'https://live88.eu.cc/api/v1/hoopslive/basketball/games/live?site=YBa-BnymZ6iN8pkfAUFTWIKn'
  return getKadarioCatalog(config.kadarioApi, config.kadarioSite, true, ['basketball'], livestreamUrl)
})
