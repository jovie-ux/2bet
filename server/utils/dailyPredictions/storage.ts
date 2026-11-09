import { promises as fs } from 'node:fs'
import path from 'node:path'
import type {
  DailyPredictionRecord,
  PredictionRefreshRun,
  SportType,
} from '~/server/types/dailyPredictions'

const SQLITE_FILE = path.resolve(process.cwd(), 'data/predictions.sqlite')
const JSON_FILE = path.resolve(process.cwd(), 'data/daily-predictions.json')

let isSqliteSupported: boolean | null = null
let sqliteDbInstance: any = null

function getSqliteDb(): any | null {
  if (isSqliteSupported === false) return null
  if (sqliteDbInstance) return sqliteDbInstance

  try {
    const sqliteMod = typeof (process as any)?.getBuiltinModule === 'function'
      ? (process as any).getBuiltinModule('node:sqlite')
      : (typeof (globalThis as any).require === 'function' ? (globalThis as any).require('node:sqlite') : null)

    if (!sqliteMod?.DatabaseSync) {
      isSqliteSupported = false
      return null
    }

    const { DatabaseSync } = sqliteMod
    const db = new DatabaseSync(SQLITE_FILE)

    // Initialize Schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS daily_sports_predictions (
        id TEXT PRIMARY KEY,
        prediction_date TEXT NOT NULL,
        sport TEXT NOT NULL,
        match_id TEXT NOT NULL,
        match_numeric_id INTEGER NOT NULL,
        competition_name TEXT,
        competition_logo TEXT,
        home_team_name TEXT NOT NULL,
        home_team_logo TEXT,
        away_team_name TEXT NOT NULL,
        away_team_logo TEXT,
        match_time_utc TEXT NOT NULL,
        market_type TEXT NOT NULL,
        prediction_id INTEGER NOT NULL,
        selection TEXT NOT NULL,
        current_odds REAL NOT NULL,
        line TEXT,
        hit_rate REAL NOT NULL,
        market_group_ids TEXT,
        source_status TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        UNIQUE(prediction_date, sport, match_id)
      );
      CREATE INDEX IF NOT EXISTS idx_dsp_date_sport ON daily_sports_predictions(prediction_date, sport);
      CREATE INDEX IF NOT EXISTS idx_dsp_match_time ON daily_sports_predictions(match_time_utc);

      CREATE TABLE IF NOT EXISTS prediction_refresh_runs (
        id TEXT PRIMARY KEY,
        prediction_date TEXT NOT NULL,
        started_at TEXT NOT NULL,
        finished_at TEXT,
        status TEXT NOT NULL,
        football_count INTEGER DEFAULT 0,
        basketball_count INTEGER DEFAULT 0,
        error_summary TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_prr_date ON prediction_refresh_runs(prediction_date);
    `)

    isSqliteSupported = true
    sqliteDbInstance = db
    return db
  } catch (err) {
    console.warn('[daily-predictions-storage] node:sqlite unavailable or failed to initialize, using JSON storage:', err)
    isSqliteSupported = false
    return null
  }
}

interface JsonStorageSchema {
  predictions: DailyPredictionRecord[]
  runs: PredictionRefreshRun[]
}

async function readJsonStorage(): Promise<JsonStorageSchema> {
  try {
    const raw = await fs.readFile(JSON_FILE, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<JsonStorageSchema>
    return {
      predictions: Array.isArray(parsed.predictions) ? parsed.predictions : [],
      runs: Array.isArray(parsed.runs) ? parsed.runs : [],
    }
  } catch {
    return { predictions: [], runs: [] }
  }
}

async function writeJsonStorage(data: JsonStorageSchema): Promise<void> {
  const dir = path.dirname(JSON_FILE)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(JSON_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

/**
 * Retrieves all stored predictions for a given Manila calendar date.
 */
export async function getPredictionsByDate(dateStr: string): Promise<DailyPredictionRecord[]> {
  const db = getSqliteDb()
  if (db) {
    try {
      const stmt = db.prepare(`
        SELECT * FROM daily_sports_predictions
        WHERE prediction_date = ?
        ORDER BY sport ASC, match_time_utc ASC
      `)
      const rows = stmt.all(dateStr) as DailyPredictionRecord[]
      if (rows.length > 0) {
        return rows
      }
    } catch (err) {
      console.warn('[daily-predictions-storage] SQLite query failed, falling back to JSON:', err)
    }
  }

  const json = await readJsonStorage()
  const matching = json.predictions
    .filter(p => p.prediction_date === dateStr)
    .sort((a, b) => a.sport.localeCompare(b.sport) || a.match_time_utc.localeCompare(b.match_time_utc))

  // If found in JSON, backfill into SQLite
  if (matching.length > 0 && db) {
    try {
      await saveDailyPredictions(dateStr, matching)
    } catch {}
  }

  return matching
}

/**
 * Retrieves only active upcoming predictions for a given Manila calendar date.
 * Strictly excludes:
 * - Matches where match_time_utc <= current_time
 * - Matches with status in live, started, finished, completed, canceled, postponed
 */
export async function getActiveUpcomingPredictions(
  dateStr: string,
  nowUtc: string = new Date().toISOString(),
): Promise<DailyPredictionRecord[]> {
  const allForDate = await getPredictionsByDate(dateStr)
  const nowMs = new Date(nowUtc).getTime()

  const excludedStatuses = new Set([
    'live',
    'started',
    'finished',
    'completed',
    'closed',
    'ended',
    'canceled',
    'cancelled',
    'postponed',
    'interrupted',
    'abandoned',
  ])

  return allForDate.filter(record => {
    const matchTimeMs = new Date(record.match_time_utc).getTime()
    if (matchTimeMs <= nowMs) return false
    const status = (record.source_status || '').toLowerCase().trim()
    if (excludedStatuses.has(status)) return false
    return true
  })
}

/**
 * Saves a list of daily predictions atomically.
 * Preserves existing matches for the day if the new list doesn't include them,
 * or updates matches by (prediction_date, sport, match_id).
 */
export async function saveDailyPredictions(
  dateStr: string,
  records: DailyPredictionRecord[],
  replaceForDate: boolean = false,
): Promise<void> {
  if (records.length === 0) return

  const db = getSqliteDb()
  if (db) {
    try {
      db.exec('BEGIN TRANSACTION;')
      if (replaceForDate) {
        db.prepare('DELETE FROM daily_sports_predictions WHERE prediction_date = ?').run(dateStr)
      }
      const insertStmt = db.prepare(`
        INSERT INTO daily_sports_predictions (
          id, prediction_date, sport, match_id, match_numeric_id,
          competition_name, competition_logo, home_team_name, home_team_logo,
          away_team_name, away_team_logo, match_time_utc, market_type,
          prediction_id, selection, current_odds, line, hit_rate,
          market_group_ids, source_status, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?
        )
        ON CONFLICT(prediction_date, sport, match_id) DO UPDATE SET
          competition_name = excluded.competition_name,
          competition_logo = excluded.competition_logo,
          home_team_name = excluded.home_team_name,
          home_team_logo = excluded.home_team_logo,
          away_team_name = excluded.away_team_name,
          away_team_logo = excluded.away_team_logo,
          match_time_utc = excluded.match_time_utc,
          market_type = excluded.market_type,
          prediction_id = excluded.prediction_id,
          selection = excluded.selection,
          current_odds = excluded.current_odds,
          line = excluded.line,
          hit_rate = excluded.hit_rate,
          market_group_ids = excluded.market_group_ids,
          source_status = excluded.source_status,
          updated_at = excluded.updated_at
      `)

      for (const r of records) {
        insertStmt.run(
          r.id, r.prediction_date, r.sport, r.match_id, r.match_numeric_id,
          r.competition_name, r.competition_logo, r.home_team_name, r.home_team_logo,
          r.away_team_name, r.away_team_logo, r.match_time_utc, r.market_type,
          r.prediction_id, r.selection, r.current_odds, r.line, r.hit_rate,
          r.market_group_ids, r.source_status, r.created_at, r.updated_at,
        )
      }
      db.exec('COMMIT;')
    } catch (err) {
      try { db.exec('ROLLBACK;') } catch {}
      console.error('[daily-predictions-storage] SQLite save failed:', err)
    }
  }

  // Also sync to JSON storage
  try {
    const json = await readJsonStorage()
    let baseList = json.predictions
    if (replaceForDate) {
      baseList = baseList.filter(item => item.prediction_date !== dateStr)
    }
    const map = new Map<string, DailyPredictionRecord>()
    for (const item of baseList) {
      map.set(`${item.prediction_date}:${item.sport}:${item.match_id}`, item)
    }
    for (const item of records) {
      map.set(`${item.prediction_date}:${item.sport}:${item.match_id}`, item)
    }
    json.predictions = Array.from(map.values())
    await writeJsonStorage(json)
  } catch (err) {
    console.error('[daily-predictions-storage] JSON sync failed:', err)
  }
}

/**
 * Records a refresh run entry.
 */
export async function recordRefreshRun(run: PredictionRefreshRun): Promise<void> {
  const db = getSqliteDb()
  if (db) {
    try {
      const stmt = db.prepare(`
        INSERT INTO prediction_refresh_runs (
          id, prediction_date, started_at, finished_at, status,
          football_count, basketball_count, error_summary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          finished_at = excluded.finished_at,
          status = excluded.status,
          football_count = excluded.football_count,
          basketball_count = excluded.basketball_count,
          error_summary = excluded.error_summary
      `)
      stmt.run(
        run.id, run.prediction_date, run.started_at, run.finished_at, run.status,
        run.football_count, run.basketball_count, run.error_summary,
      )
    } catch (err) {
      console.warn('[daily-predictions-storage] SQLite record run failed:', err)
    }
  }

  try {
    const json = await readJsonStorage()
    const idx = json.runs.findIndex(r => r.id === run.id)
    if (idx >= 0) {
      json.runs[idx] = run
    } else {
      json.runs.unshift(run)
    }
    // Keep last 100 runs
    if (json.runs.length > 100) json.runs = json.runs.slice(0, 100)
    await writeJsonStorage(json)
  } catch (err) {
    console.error('[daily-predictions-storage] JSON record run failed:', err)
  }
}
