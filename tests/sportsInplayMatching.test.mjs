import test, { describe } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { matchesSportsSelection } from '../utils/sportsSelection.ts'
import { getSportsTabRedirectPath, resolveSportsTabRedirectUrl } from '../utils/sportsRedirect.ts'
import { useSportsRouteBase } from '../composables/useSportsRouteBase.ts'

describe('Sports In-Play Matching & Football Route Suite', () => {
  const kadarioBasketballEvent = {
    id: '214032414',
    leagueId: '10858',
    sport: 'basketball',
    sport_key: '10858',
    sport_title: 'Philippine National League',
    commence_time: '2026-11-09T07:30:00Z',
    home_team: 'Avalanche',
    away_team: 'Juggernauts',
    completed: false,
    scores: [
      { name: 'Avalanche', score: '33' },
      { name: 'Juggernauts', score: '39' },
    ],
  }

  const kadarioFootballEvent = {
    id: '275487930',
    leagueId: '717572',
    sport: 'football',
    sport_key: '717572',
    sport_title: 'CWL 1',
    commence_time: '2026-11-09T07:00:00Z',
    home_team: 'Qingdao West Coast(w)',
    away_team: 'Wuhan Sports University(w)',
    completed: false,
    scores: [
      { name: 'Qingdao West Coast(w)', score: '0' },
      { name: 'Wuhan Sports University(w)', score: '2' },
    ],
  }

  test('Case 1: Live Kadario basketball event matches Basketball selection without tournaments', () => {
    const matches = matchesSportsSelection(kadarioBasketballEvent, ['Basketball'])
    assert.equal(matches, true)
  })

  test('Case 2: Live Kadario basketball event matches Basketball selection even when selectedTournaments has Odds API keys', () => {
    const selectedTournaments = {
      Basketball: ['basketball_nba', 'basketball_preseason', 'basketball_euroleague'],
    }
    const matches = matchesSportsSelection(kadarioBasketballEvent, ['Basketball'], selectedTournaments)
    assert.equal(matches, true)
  })

  test('Case 3: Live Kadario football event matches Soccer and Football selection without tournaments', () => {
    assert.equal(matchesSportsSelection(kadarioFootballEvent, ['Soccer']), true)
    assert.equal(matchesSportsSelection(kadarioFootballEvent, ['Football']), true)
  })

  test('Case 4: Live Kadario football event matches Soccer selection even when selectedTournaments has Odds API keys', () => {
    const selectedTournaments = {
      Soccer: ['soccer_epl', 'soccer_uefa_champs_league', 'soccer_uefa_champions_league'],
    }
    assert.equal(matchesSportsSelection(kadarioFootballEvent, ['Soccer'], selectedTournaments), true)
  })

  test('Case 5: Live Kadario basketball event does not match Soccer, Tennis, or Baseball', () => {
    assert.equal(matchesSportsSelection(kadarioBasketballEvent, ['Soccer']), false)
    assert.equal(matchesSportsSelection(kadarioBasketballEvent, ['Tennis']), false)
    assert.equal(matchesSportsSelection(kadarioBasketballEvent, ['Baseball']), false)
  })

  test('Case 6: Live Kadario football event does not match Basketball, Tennis, or Baseball', () => {
    assert.equal(matchesSportsSelection(kadarioFootballEvent, ['Basketball']), false)
    assert.equal(matchesSportsSelection(kadarioFootballEvent, ['Tennis']), false)
    assert.equal(matchesSportsSelection(kadarioFootballEvent, ['Baseball']), false)
  })

  test('Case 7: Numeric tournament key filtering is respected when explicit numeric keys are specified', () => {
    assert.equal(
      matchesSportsSelection(kadarioBasketballEvent, ['Basketball'], { Basketball: ['10858'] }),
      true,
    )
    assert.equal(
      matchesSportsSelection(kadarioBasketballEvent, ['Basketball'], { Basketball: ['99999'] }),
      false,
    )
  })

  test('Case 8: Standard Odds API pre-match tournament keys still filter strictly', () => {
    const preMatchNba = {
      sport: 'basketball',
      sport_key: 'basketball_nba',
      commence_time: '2026-11-10T12:00:00Z',
    }
    assert.equal(
      matchesSportsSelection(preMatchNba, ['Basketball'], { Basketball: ['basketball_nba'] }),
      true,
    )
    assert.equal(
      matchesSportsSelection(preMatchNba, ['Basketball'], { Basketball: ['basketball_euroleague'] }),
      false,
    )
  })

  test('Case 9: Football redirects in utils/sportsRedirect.ts mirror Soccer redirects', () => {
    assert.equal(
      getSportsTabRedirectPath('football', 'smart-pick'),
      'sportEvents/parlay/football/interval/parlayPromotion',
    )
    assert.equal(
      getSportsTabRedirectPath('football', 'parlay'),
      'sportEvents/parlay/football/interval/parlayPromotion',
    )
    assert.equal(
      getSportsTabRedirectPath('football', 'outright'),
      'sportEvents/outright/football',
    )
    assert.equal(
      getSportsTabRedirectPath('football', 'replay'),
      'sportEvents/gameResult/football/regular/today',
    )
    assert.equal(
      resolveSportsTabRedirectUrl('football', 'replay'),
      'https://bybet.com/sportEvents/gameResult/football/regular/today?p=xjSD',
    )
  })

  test('Case 10: composables/useSportsRouteBase.ts recognizes football route base', () => {
    const routeBaseSource = fs.readFileSync(
      path.resolve(process.cwd(), 'composables/useSportsRouteBase.ts'),
      'utf-8',
    )
    assert.match(routeBaseSource, /football/)
  })

  test('Case 11: pages/explore/sports/[sport].vue includes football in validation, names, and popularLeagues', () => {
    const pageSource = fs.readFileSync(
      path.resolve(process.cwd(), 'pages/explore/sports/[sport].vue'),
      'utf-8',
    )
    assert.match(pageSource, /football:\s*['"]Soccer['"]/)
    assert.match(pageSource, /football:\s*\[/)
    assert.match(pageSource, /['"]football['"]/)
  })

  test('Case 12: components/SportsPopular.vue filters inplay events by effectiveSelectedSports without tournament mismatch', () => {
    const popularSource = fs.readFileSync(
      path.resolve(process.cwd(), 'components/SportsPopular.vue'),
      'utf-8',
    )
    assert.match(
      popularSource,
      /matchesSportsSelection\(event,\s*effectiveSelectedSports\.value\)/,
    )
    assert.match(popularSource, /football:\s*['"]Soccer['"]/)
  })
})
