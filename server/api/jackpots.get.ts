import type { H3Event } from 'h3'
import { readJackpotFile } from '~/server/utils/jackpotStore'

export default defineEventHandler(async (_event: H3Event) => {
  return readJackpotFile()
})

