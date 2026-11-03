import type { H3Event } from 'h3'
import { writeJackpotFile, type JackpotData } from '~/server/utils/jackpotStore'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<Partial<JackpotData>>(event)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
  }
  const updated = await writeJackpotFile(body)
  return { success: true, data: updated }
})

