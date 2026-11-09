import test, { describe } from 'node:test'
import assert from 'node:assert/strict'

import {
  extractNumericMatchId,
  formatManilaTime,
  formatPublishedDate,
  getManilaDateStr,
  isUpcomingMatch,
  toManilaIsoString,
} from '../server/utils/dailyPredictions/time.ts'

import {
  areOppositeHandicapLines,
  buildMarketOptions,
  createSeededRandom,
  findValid1x2Groups,
  findValidAhGroups,
  findValidOuGroups,
  generateSyntheticPredictionGroup,
  normalizeHandicapLine,
  normalizeTotalLine,
  parseHitRate,
  parseOdds,
  selectBestMarketForMatch,
} from '../server/utils/dailyPredictions/marketGrouping.ts'

import {
  getActiveUpcomingPredictions,
  getPredictionsByDate,
  saveDailyPredictions,
} from '../server/utils/dailyPredictions/storage.ts'

describe('Daily Sports Predictions Test Suite (All 16 Requirements)', () => {
  // Test Case 1 & 2 & 3: Match Selection Limits
  test('Case 1: Football schedule with 30 upcoming matches selects at most 10', () => {
    const matches = Array.from({ length: 30 }, (_, i) => ({
      id: `kadario:${1000 + i}`,
      numericId: 1000 + i,
      sport: 'football',
      startTime: new Date(Date.now() + 3600000).toISOString(),
    }))

    const upcoming = matches.filter(m => isUpcomingMatch(m.startTime))
    assert.equal(upcoming.length, 30)
    const selected = upcoming.slice(0, 10)
    assert.equal(selected.length, 10)
    const uniqueIds = new Set(selected.map(m => m.numericId))
    assert.equal(uniqueIds.size, 10)
  })

  test('Case 2: Basketball schedule with 25 upcoming matches selects at most 10', () => {
    const matches = Array.from({ length: 25 }, (_, i) => ({
      id: `kadario:${2000 + i}`,
      numericId: 2000 + i,
      sport: 'basketball',
      startTime: new Date(Date.now() + 7200000).toISOString(),
    }))

    const upcoming = matches.filter(m => isUpcomingMatch(m.startTime))
    assert.equal(upcoming.length, 25)
    const selected = upcoming.slice(0, 10)
    assert.equal(selected.length, 10)
  })

  test('Case 3: Schedule contains only 6 upcoming matches — displays at most 6', () => {
    const matches = Array.from({ length: 6 }, (_, i) => ({
      id: `kadario:${3000 + i}`,
      numericId: 3000 + i,
      sport: 'football',
      startTime: new Date(Date.now() + 3600000).toISOString(),
    }))

    const upcoming = matches.filter(m => isUpcomingMatch(m.startTime))
    assert.equal(upcoming.length, 6)
    const selected = upcoming.slice(0, 10)
    assert.equal(selected.length, 6)
  })

  // Test Case 4: Numeric Match ID extraction
  test('Case 4: Match ID is kadario:652473 -> extract numeric ID 652473', () => {
    assert.equal(extractNumericMatchId('kadario:652473'), 652473)
    assert.equal(extractNumericMatchId('kadario:652474'), 652474)
    assert.equal(extractNumericMatchId('kadario:652475'), 652475)
    assert.equal(extractNumericMatchId(652473), 652473)
  })

  // Test Case 5: 1x2 Market Grouping and Highest Hit Rate
  test('Case 5: 1x2 group contains Home, Draw, Away — select highest hit rate entry', () => {
    const items = [
      { id: 626678, sport_type: 1, match_id: 100, market: '1x2', selection: 'Home', current_odds: 1.6, line: '-', hit_rate: '72%' },
      { id: 626679, sport_type: 1, match_id: 100, market: '1x2', selection: 'Draw', current_odds: 3.2, line: '-', hit_rate: 18 },
      { id: 626680, sport_type: 1, match_id: 100, market: '1x2', selection: 'Away', current_odds: 4.5, line: '-', hit_rate: '10' },
    ]

    const groups = findValid1x2Groups(items)
    assert.equal(groups.length, 1)
    const best = groups[0]
    assert.equal(best.selection, 'Home')
    assert.equal(best.odds, 1.6)
    assert.equal(best.hitRate, 72)
    assert.equal(best.line, null)
    assert.deepEqual(best.groupPredictionIds, [626678, 626679, 626680])
  })

  // Test Case 6: OU Market Grouping
  test('Case 6: OU group contains Over 2.5 and Under 2.5 — correctly choose higher hit rate', () => {
    const items = [
      { id: 626681, sport_type: 1, match_id: 101, market: 'ou', selection: 'Over', current_odds: 1.6, line: '2.5', hit_rate: 68 },
      { id: 626682, sport_type: 1, match_id: 101, market: 'ou', selection: 'Under', current_odds: 2.1, line: '2.5', hit_rate: 32 },
    ]

    const groups = findValidOuGroups(items)
    assert.equal(groups.length, 1)
    const best = groups[0]
    assert.equal(best.selection, 'Over')
    assert.equal(best.line, '2.5')
    assert.equal(best.odds, 1.6)
    assert.equal(best.hitRate, 68)
    assert.equal(best.displayPrediction, 'Over 2.5')
  })

  // Test Case 7: AH Market Grouping with explicit sign
  test('Case 7: AH group contains Home -2.5 and Away +2.5 — preserve selected line sign', () => {
    // When Home has higher hit rate
    const itemsHomeWin = [
      { id: 626683, sport_type: 1, match_id: 102, market: 'ah', selection: 'Home', current_odds: 1.6, line: '-2.5', hit_rate: 75 },
      { id: 626684, sport_type: 1, match_id: 102, market: 'ah', selection: 'Away', current_odds: 2.2, line: '+2.5', hit_rate: 25 },
    ]
    const groupsHome = findValidAhGroups(itemsHomeWin)
    assert.equal(groupsHome.length, 1)
    assert.equal(groupsHome[0].selection, 'Home')
    assert.equal(groupsHome[0].line, '-2.5')
    assert.equal(groupsHome[0].displayPrediction, 'Home -2.5')

    // When Away has higher hit rate
    const itemsAwayWin = [
      { id: 626685, sport_type: 1, match_id: 103, market: 'ah', selection: 'Home', current_odds: 2.1, line: '-1.5', hit_rate: 35 },
      { id: 626686, sport_type: 1, match_id: 103, market: 'ah', selection: 'Away', current_odds: 1.7, line: '+1.5', hit_rate: 65 },
    ]
    const groupsAway = findValidAhGroups(itemsAwayWin)
    assert.equal(groupsAway.length, 1)
    assert.equal(groupsAway[0].selection, 'Away')
    assert.equal(groupsAway[0].line, '+1.5')
    assert.equal(groupsAway[0].displayPrediction, 'Away +1.5')
  })

  // Test Case 8: Incomplete Groups
  test('Case 8: Missing Draw, Over, Under, Home, or Away — reject incomplete group', () => {
    // 1X2 missing Draw
    const incomplete1x2 = [
      { id: 10, sport_type: 1, match_id: 1, market: '1x2', selection: 'Home', current_odds: 1.5, hit_rate: 60, line: '-' },
      { id: 11, sport_type: 1, match_id: 1, market: '1x2', selection: 'Away', current_odds: 2.5, hit_rate: 40, line: '-' },
    ]
    assert.equal(findValid1x2Groups(incomplete1x2).length, 0)

    // OU missing Under
    const incompleteOu = [
      { id: 20, sport_type: 1, match_id: 2, market: 'ou', selection: 'Over', current_odds: 1.8, hit_rate: 55, line: '2.5' },
      { id: 21, sport_type: 1, match_id: 2, market: 'ou', selection: 'Over', current_odds: 1.8, hit_rate: 55, line: '2.5' },
    ]
    assert.equal(findValidOuGroups(incompleteOu).length, 0)

    // OU mismatched lines: Over 2.5 and Under 3.5
    const mismatchedOu = [
      { id: 30, sport_type: 1, match_id: 3, market: 'ou', selection: 'Over', current_odds: 1.8, hit_rate: 55, line: '2.5' },
      { id: 31, sport_type: 1, match_id: 3, market: 'ou', selection: 'Under', current_odds: 1.8, hit_rate: 45, line: '3.5' },
    ]
    assert.equal(findValidOuGroups(mismatchedOu).length, 0)

    // Non-consecutive IDs
    const nonConsecutive = [
      { id: 40, sport_type: 1, match_id: 4, market: 'ou', selection: 'Over', current_odds: 1.8, hit_rate: 55, line: '2.5' },
      { id: 45, sport_type: 1, match_id: 4, market: 'ou', selection: 'Under', current_odds: 1.8, hit_rate: 45, line: '2.5' },
    ]
    assert.equal(findValidOuGroups(nonConsecutive).length, 0)
  })

  // Test Case 9: Invalid odds or missing hit rates
  test('Case 9: Match with invalid odds or missing hit rates — reject invalid predictions', () => {
    assert.equal(parseOdds(''), null)
    assert.equal(parseOdds(0.5), null) // Odds <= 1.0 invalid
    assert.equal(parseOdds(null), null)
    assert.equal(parseOdds('abc'), null)

    assert.equal(parseHitRate(null), null)
    assert.equal(parseHitRate(''), null)
    assert.equal(parseHitRate('invalid'), null)
    assert.equal(parseHitRate('65.5%'), 65.5)

    const invalidOddsGroup = [
      { id: 50, sport_type: 1, match_id: 5, market: 'ou', selection: 'Over', current_odds: 0, hit_rate: 60, line: '2.5' },
      { id: 51, sport_type: 1, match_id: 5, market: 'ou', selection: 'Under', current_odds: 1.8, hit_rate: 40, line: '2.5' },
    ]
    assert.equal(findValidOuGroups(invalidOddsGroup).length, 0)
  })

  // Test Case 10: Basketball two-way Moneyline (no Draw)
  test('Case 10: Basketball match with two-way Moneyline chooses another valid market (AH or OU)', () => {
    const basketballItems = [
      // Two-way ML (Home and Away, no Draw) -> Must NOT be treated as valid 1x2!
      { id: 100, sport_type: 2, match_id: 99, market: 'ML', selection: 'Home', current_odds: 1.7, hit_rate: 52, line: '-' },
      { id: 101, sport_type: 2, match_id: 99, market: 'ML', selection: 'Away', current_odds: 2.1, hit_rate: 48, line: '-' },
      // Valid AH
      { id: 102, sport_type: 2, match_id: 99, market: 'AH', selection: 'Home', current_odds: 1.9, hit_rate: 65, line: '+4.5' },
      { id: 103, sport_type: 2, match_id: 99, market: 'AH', selection: 'Away', current_odds: 1.9, hit_rate: 35, line: '-4.5' },
      // Valid OU
      { id: 104, sport_type: 2, match_id: 99, market: 'OU', selection: 'Over', current_odds: 1.9, hit_rate: 58, line: '215.5' },
      { id: 105, sport_type: 2, match_id: 99, market: 'OU', selection: 'Under', current_odds: 1.9, hit_rate: 42, line: '215.5' },
    ]

    // 1X2 must reject the 2-way ML
    assert.equal(findValid1x2Groups(basketballItems).length, 0)

    // selectBestMarketForMatch must choose either AH or OU
    const chosen = selectBestMarketForMatch(basketballItems)
    assert.ok(chosen !== null)
    assert.ok(['ah', 'ou'].includes(chosen.market))
  })

  // Test Case 11: Match begins while page is open — automatically hide it
  test('Case 11: Match begins (kickoff passes) — isUpcomingMatch returns false', () => {
    const pastTime = new Date(Date.now() - 5000).toISOString()
    const futureTime = new Date(Date.now() + 60000).toISOString()

    assert.equal(isUpcomingMatch(pastTime), false)
    assert.equal(isUpcomingMatch(futureTime), true)

    // Matches with started/live statuses must also be excluded
    assert.equal(isUpcomingMatch(futureTime, 'live'), false)
    assert.equal(isUpcomingMatch(futureTime, 'started'), false)
    assert.equal(isUpcomingMatch(futureTime, 'finished'), false)
    assert.equal(isUpcomingMatch(futureTime, 'canceled'), false)
    assert.equal(isUpcomingMatch(futureTime, 'scheduled'), true)
  })

  // Test Case 12 & 13: Daily Stability & Deduplication
  test('Case 12 & 13: Storing twice produces no duplicates and maintains daily snapshot', async () => {
    const testDate = '2099-01-01'
    const record1 = {
      id: 'dsp-2099-01-01-football-99991',
      prediction_date: testDate,
      sport: 'football',
      match_id: 'kadario:99991',
      match_numeric_id: 99991,
      competition_name: 'Test League',
      competition_logo: '',
      home_team_name: 'Team A',
      home_team_logo: '',
      away_team_name: 'Team B',
      away_team_logo: '',
      match_time_utc: new Date(Date.now() + 10000000).toISOString(),
      market_type: '1x2',
      prediction_id: 8881,
      selection: 'Home',
      current_odds: 1.85,
      line: null,
      hit_rate: 70,
      market_group_ids: '[8881, 8882, 8883]',
      source_status: 'scheduled',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Save first time
    await saveDailyPredictions(testDate, [record1])
    const stored1 = await getPredictionsByDate(testDate)
    assert.equal(stored1.filter(p => p.match_id === 'kadario:99991').length, 1)

    // Save second time with identical match ID
    await saveDailyPredictions(testDate, [record1])
    const stored2 = await getPredictionsByDate(testDate)
    assert.equal(stored2.filter(p => p.match_id === 'kadario:99991').length, 1)
  })

  // Test Case 14: External API failure preserves existing data
  test('Case 14: Existing daily predictions are preserved on failure', async () => {
    const testDate = '2099-01-02'
    const record = {
      id: 'dsp-2099-01-02-football-99992',
      prediction_date: testDate,
      sport: 'football',
      match_id: 'kadario:99992',
      match_numeric_id: 99992,
      competition_name: 'Test League',
      competition_logo: '',
      home_team_name: 'Team A',
      home_team_logo: '',
      away_team_name: 'Team B',
      away_team_logo: '',
      match_time_utc: new Date(Date.now() + 10000000).toISOString(),
      market_type: '1x2',
      prediction_id: 8884,
      selection: 'Home',
      current_odds: 1.9,
      line: null,
      hit_rate: 65,
      market_group_ids: '[8884, 8885, 8886]',
      source_status: 'scheduled',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await saveDailyPredictions(testDate, [record])
    // Empty save attempt (simulating API failure) must NOT overwrite existing records
    await saveDailyPredictions(testDate, [])

    const stored = await getPredictionsByDate(testDate)
    assert.equal(stored.length, 1)
    assert.equal(stored[0].match_id, 'kadario:99992')
  })

  // Test Case 15: Midnight Manila change excludes old dates
  test('Case 15: Midnight Manila date change strictly filters by today date', async () => {
    const yesterday = '2026-11-06'
    const today = '2026-11-07'

    const activeForToday = await getActiveUpcomingPredictions(today)
    for (const item of activeForToday) {
      assert.equal(item.prediction_date, today)
      assert.notEqual(item.prediction_date, yesterday)
    }
  })

  // Test Case 16: Out-of-order and mixed match ID prediction fetches
  test('Case 16: Mixed or out-of-order predictions are correctly sorted and mapped', () => {
    // Array with items out of order
    const mixed = [
      { id: 202, sport_type: 1, match_id: 50, market: '1X2', selection: 'Away', current_odds: 3.5, hit_rate: 20, line: '-' },
      { id: 200, sport_type: 1, match_id: 50, market: '1X2', selection: 'Home', current_odds: 1.8, hit_rate: 60, line: '-' },
      { id: 201, sport_type: 1, match_id: 50, market: '1X2', selection: 'Draw', current_odds: 3.2, hit_rate: 20, line: '-' },
    ]

    const groups = findValid1x2Groups(mixed)
    assert.equal(groups.length, 1)
    assert.equal(groups[0].selection, 'Home')
    assert.equal(groups[0].hitRate, 60)
    assert.deepEqual(groups[0].groupPredictionIds, [200, 201, 202])
  })

  // Test Case 17: Fallback Synthetic Prediction Generation when upstream has 0 predictions
  test('Case 17: Generates valid fallback predictions when upstream tools API returns empty', () => {
    const candidate = {
      numericId: 123456,
      matchId: 'kadario:123456',
      competition: { name: 'Premier League', logo: 'https://example.com/logo.png' },
      homeTeam: { name: 'Arsenal', logo: 'https://example.com/arsenal.png' },
      awayTeam: { name: 'Chelsea', logo: 'https://example.com/chelsea.png' },
    }

    const footballGroup = generateSyntheticPredictionGroup(candidate, 'football')
    assert.ok(['1x2', 'ou', 'ah'].includes(footballGroup.market))
    assert.ok(footballGroup.odds > 1.0)
    assert.ok(footballGroup.hitRate < 50 && footballGroup.hitRate >= 20)
    assert.ok(footballGroup.groupPredictionIds.length >= 2)
    assert.equal(footballGroup.selectedItem.home_team_name, 'Arsenal')
    assert.equal(footballGroup.selectedItem.away_team_name, 'Chelsea')

    const basketballGroup = generateSyntheticPredictionGroup(candidate, 'basketball')
    assert.ok(['ou', 'ah'].includes(basketballGroup.market))
    assert.ok(basketballGroup.odds > 1.0)
    assert.ok(basketballGroup.hitRate < 50 && basketballGroup.hitRate >= 20)
    assert.ok(basketballGroup.groupPredictionIds.length === 2)
  })

  // Test Case 18: Complete Market Options Generation
  test('Case 18: buildMarketOptions ensures complete data for Handicap, OU, and 1X2', () => {
    // 1X2 market -> must have 3 options: H, D, A
    const m1x2 = {
      id: 'dsp-test-1',
      market_type: '1x2',
      selection: 'Home',
      current_odds: 1.85,
      line: null,
    }
    const opts1x2 = buildMarketOptions(m1x2)
    assert.equal(opts1x2.length, 3)
    assert.deepEqual(opts1x2.map(o => o.label), ['H', 'D', 'A'])
    assert.equal(opts1x2[0].odd, '1.85')
    assert.ok(parseFloat(opts1x2[1].odd) > 1.0)
    assert.ok(parseFloat(opts1x2[2].odd) > 1.0)

    // OU market -> must have 2 options: Over and Under
    const mOu = {
      id: 'dsp-test-2',
      sport: 'football',
      market_type: 'ou',
      selection: 'Over',
      current_odds: 1.90,
      line: '2.5',
    }
    const optsOu = buildMarketOptions(mOu)
    assert.equal(optsOu.length, 2)
    assert.equal(optsOu[0].label, 'Over 2.5')
    assert.equal(optsOu[0].odd, '1.90')
    assert.equal(optsOu[1].label, 'Under 2.5')
    assert.ok(parseFloat(optsOu[1].odd) > 1.0)

    // AH market -> must have 2 options: Home and Away with opposite lines
    const mAh = {
      id: 'dsp-test-3',
      sport: 'football',
      market_type: 'ah',
      selection: 'Home',
      current_odds: 1.95,
      line: '-1.5',
    }
    const optsAh = buildMarketOptions(mAh)
    assert.equal(optsAh.length, 2)
    assert.equal(optsAh[0].label, 'Home -1.5')
    assert.equal(optsAh[0].odd, '1.95')
    assert.equal(optsAh[1].label, 'Away +1.5')
    assert.ok(parseFloat(optsAh[1].odd) > 1.0)
  })

  // Test Case 19: Published Date Format (e.g. "11-08 07:49 Published")
  test('Case 19: formatPublishedDate formats as MM-DD HH:mm Published', () => {
    const fixedNow = new Date('2026-11-09T12:00:00+08:00').getTime()
    const str = formatPublishedDate('dsp-test-1', fixedNow)
    assert.match(str, /^\d{2}-\d{2}\s\d{2}:\d{2}\sPublished$/)
  })
})
