import type { RawKadarioToolItem } from '~/server/types/dailyPredictions'

const DEFAULT_TIMEOUT_MS = 12000
const MAX_RETRIES = 2

interface KadarioToolsResponse {
  code: number
  msg?: string
  data?: {
    list?: RawKadarioToolItem[]
    total?: number
    page?: number
    page_size?: number
  }
}

/**
 * Executes a single fetch to Kadario tools endpoint for one numeric match ID.
 */
export async function fetchKadarioPredictionsForMatch(
  apiBase: string,
  numericMatchId: number,
  pageSize = 100,
): Promise<RawKadarioToolItem[]> {
  const url = `${apiBase.replace(/\/+$/, '')}/api/v1/kadario/tools`
  const body = JSON.stringify({ match_id: numericMatchId, page_size: pageSize })
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId))

      if (!response.ok) {
        if (attempt < MAX_RETRIES && response.status >= 500) {
          const backoff = 500 * (attempt + 1)
          await new Promise(r => setTimeout(r, backoff))
          continue
        }
        console.warn(`[kadarioTools] HTTP ${response.status} for match ${numericMatchId}`)
        return []
      }

      const json = await response.json() as KadarioToolsResponse
      if (json && json.data && Array.isArray(json.data.list)) {
        return json.data.list
      }

      return []
    } catch (err: any) {
      if (attempt < MAX_RETRIES) {
        const backoff = 500 * (attempt + 1)
        await new Promise(r => setTimeout(r, backoff))
        continue
      }
      console.warn(`[kadarioTools] Failed to fetch predictions for match ${numericMatchId}:`, err?.message || err)
      return []
    }
  }

  return []
}

/**
 * Concurrently fetches prediction details for multiple matches with bounded concurrency.
 */
export async function fetchPredictionsWithConcurrency(
  apiBase: string,
  matchIds: number[],
  concurrency = 3,
): Promise<Map<number, RawKadarioToolItem[]>> {
  const results = new Map<number, RawKadarioToolItem[]>()
  if (matchIds.length === 0) return results

  const queue = [...matchIds]
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const matchId = queue.shift()
      if (matchId == null) break
      const items = await fetchKadarioPredictionsForMatch(apiBase, matchId)
      results.set(matchId, items)
    }
  })

  await Promise.all(workers)
  return results
}
