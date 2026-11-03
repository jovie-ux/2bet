import { promises as fs } from 'node:fs'
import path from 'node:path'

export interface JackpotData {
  mega: number
  jdb: number
  jili: number
  cq9: number
  grand?: number
  major?: number
  minor?: number
  updatedAt?: string
}

export const DEFAULT_JACKPOTS: JackpotData = {
  mega: 1_008_450.25,
  jdb: 3_015.46,
  jili: 7_854.20,
  cq9: 6_328.50,
  grand: 354_120.50,
  major: 86_410.20,
  minor: 12_740.10,
  updatedAt: new Date().toISOString(),
}

const getJackpotFilePath = (): string => path.resolve(process.cwd(), 'data/jackpots.json')

export async function readJackpotFile(): Promise<JackpotData> {
  const filePath = getJackpotFilePath()
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<JackpotData>
    return {
      mega: typeof parsed.mega === 'number' && !Number.isNaN(parsed.mega) ? parsed.mega : DEFAULT_JACKPOTS.mega,
      jdb: typeof parsed.jdb === 'number' && !Number.isNaN(parsed.jdb) ? parsed.jdb : DEFAULT_JACKPOTS.jdb,
      jili: typeof parsed.jili === 'number' && !Number.isNaN(parsed.jili) ? parsed.jili : DEFAULT_JACKPOTS.jili,
      cq9: typeof parsed.cq9 === 'number' && !Number.isNaN(parsed.cq9) ? parsed.cq9 : DEFAULT_JACKPOTS.cq9,
      grand: typeof parsed.grand === 'number' ? parsed.grand : DEFAULT_JACKPOTS.grand,
      major: typeof parsed.major === 'number' ? parsed.major : DEFAULT_JACKPOTS.major,
      minor: typeof parsed.minor === 'number' ? parsed.minor : DEFAULT_JACKPOTS.minor,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    }
  } catch {
    await writeJackpotFile(DEFAULT_JACKPOTS).catch(() => {})
    return { ...DEFAULT_JACKPOTS }
  }
}

export async function writeJackpotFile(data: Partial<JackpotData>): Promise<JackpotData> {
  const filePath = getJackpotFilePath()
  const current = await readJackpotFile().catch(() => ({ ...DEFAULT_JACKPOTS }))
  const round2 = (val: number) => Math.round(val * 100) / 100

  const updated: JackpotData = {
    ...current,
    ...(typeof data.mega === 'number' && !Number.isNaN(data.mega) ? { mega: round2(data.mega) } : {}),
    ...(typeof data.jdb === 'number' && !Number.isNaN(data.jdb) ? { jdb: round2(data.jdb) } : {}),
    ...(typeof data.jili === 'number' && !Number.isNaN(data.jili) ? { jili: round2(data.jili) } : {}),
    ...(typeof data.cq9 === 'number' && !Number.isNaN(data.cq9) ? { cq9: round2(data.cq9) } : {}),
    ...(typeof data.grand === 'number' && !Number.isNaN(data.grand) ? { grand: round2(data.grand) } : {}),
    ...(typeof data.major === 'number' && !Number.isNaN(data.major) ? { major: round2(data.major) } : {}),
    ...(typeof data.minor === 'number' && !Number.isNaN(data.minor) ? { minor: round2(data.minor) } : {}),
    updatedAt: new Date().toISOString(),
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`, 'utf-8')
  return updated
}

