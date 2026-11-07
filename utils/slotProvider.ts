export const normalizeSlotProvider = (provider: string): string => {
  const p = (provider || '').trim().toLowerCase()
  if (p === 'pp' || p === 'pragmatic play' || p === 'pragmatic') return 'pp'
  if (p === 'pg' || p === 'pg soft') return 'pg'
  if (p === 'jdb' || p === 'jpg') return 'jdb'
  if (p === 'jili') return 'jili'
  if (p === 'cq9') return 'cq9'
  if (p === 'red tiger' || p === 'redtiger' || p === 'unknown') return 'red tiger'
  if (p === '2bet' || p === 'ai casino' || p === 'aicasino') return '2bet'
  if (p === 'lgd' || p === 'lgd gaming') return 'lgd'
  if (p === 'mg+' || p === 'mg' || p === 'microgaming') return 'mg+'
  if (p === 'netent') return 'netent'
  if (p === 'choice' || p === 'choice gaming') return 'choice'
  if (p === 'bs' || p === 'betsoft') return 'bs'
  return p
}

