import test, { describe } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import {
  buildBybetRedirectUrl,
  getEnvRedirectCode,
  getEnvRedirectUrl,
  getSportsTabRedirectPath,
  resolveSportsTabRedirectUrl,
  resolveTennisRedirectUrl,
} from '../utils/sportsRedirect.ts'

describe('Sports Navigation External Redirects Suite', () => {
  test('Case 1: popular > smart pick redirects to sportEvents/hotGame/smartPick with p parameter', () => {
    const pathResult = getSportsTabRedirectPath('popular', 'smart-pick')
    assert.equal(pathResult, 'sportEvents/hotGame/smartPick')

    const urlDefault = resolveSportsTabRedirectUrl('popular', 'smart-pick')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/hotGame/smartPick?p=xjSD')

    const urlCustom = resolveSportsTabRedirectUrl('popular', 'smart-pick', 'https://bybet.ph/', 'PROMO99')
    assert.equal(urlCustom, 'https://bybet.ph/sportEvents/hotGame/smartPick?p=PROMO99')
  })

  test('Case 2: popular > outright redirects to sportEvents/hotGame/outright with p parameter', () => {
    const pathResult = getSportsTabRedirectPath('popular', 'outright')
    assert.equal(pathResult, 'sportEvents/hotGame/outright')

    const urlDefault = resolveSportsTabRedirectUrl('popular', 'outright')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/hotGame/outright?p=xjSD')
  })

  test('Case 3: basketball > parlay redirects to sportEvents/parlay/basketball/interval/inplay with p parameter', () => {
    const pathParlay = getSportsTabRedirectPath('basketball', 'parlay')
    const pathSmartPick = getSportsTabRedirectPath('basketball', 'smart-pick')
    assert.equal(pathParlay, 'sportEvents/parlay/basketball/interval/inplay')
    assert.equal(pathSmartPick, 'sportEvents/parlay/basketball/interval/inplay')

    const urlDefault = resolveSportsTabRedirectUrl('basketball', 'smart-pick')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/parlay/basketball/interval/inplay?p=xjSD')
  })

  test('Case 4: basketball > outright redirects to sportEvents/outright/basketball with p parameter', () => {
    const pathResult = getSportsTabRedirectPath('basketball', 'outright')
    assert.equal(pathResult, 'sportEvents/outright/basketball')

    const urlDefault = resolveSportsTabRedirectUrl('basketball', 'outright')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/outright/basketball?p=xjSD')
  })

  test('Case 5: soccer > parlay redirects to sportEvents/parlay/football/interval/parlayPromotion with p parameter', () => {
    const pathParlay = getSportsTabRedirectPath('soccer', 'parlay')
    const pathSmartPick = getSportsTabRedirectPath('soccer', 'smart-pick')
    assert.equal(pathParlay, 'sportEvents/parlay/football/interval/parlayPromotion')
    assert.equal(pathSmartPick, 'sportEvents/parlay/football/interval/parlayPromotion')

    const urlDefault = resolveSportsTabRedirectUrl('soccer', 'smart-pick')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/parlay/football/interval/parlayPromotion?p=xjSD')
  })

  test('Case 6: soccer > outright redirects to sportEvents/outright/football with p parameter', () => {
    const pathResult = getSportsTabRedirectPath('soccer', 'outright')
    assert.equal(pathResult, 'sportEvents/outright/football')

    const urlDefault = resolveSportsTabRedirectUrl('soccer', 'outright')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/outright/football?p=xjSD')
  })

  test('Case 7: soccer > replay redirects to sportEvents/gameResult/football/regular/today with p parameter', () => {
    const pathResult = getSportsTabRedirectPath('soccer', 'replay')
    assert.equal(pathResult, 'sportEvents/gameResult/football/regular/today')

    const urlDefault = resolveSportsTabRedirectUrl('soccer', 'replay')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/gameResult/football/regular/today?p=xjSD')
  })

  test('Case 8: live > all esports redirects to sportEvents/liveGame/eSportBallGroup with p parameter', () => {
    const pathEsports = getSportsTabRedirectPath('live', 'esports')
    const pathAllEsports = getSportsTabRedirectPath('live', 'all esports')
    assert.equal(pathEsports, 'sportEvents/liveGame/eSportBallGroup')
    assert.equal(pathAllEsports, 'sportEvents/liveGame/eSportBallGroup')

    const urlDefault = resolveSportsTabRedirectUrl('live', 'esports')
    assert.equal(urlDefault, 'https://bybet.com/sportEvents/liveGame/eSportBallGroup?p=xjSD')
  })

  test('Case 9: buildBybetRedirectUrl handles formatting, slashes, and custom query params cleanly', () => {
    assert.equal(
      buildBybetRedirectUrl('sportEvents/hotGame/smartPick', 'https://bybet.com/', 'xjSD'),
      'https://bybet.com/sportEvents/hotGame/smartPick?p=xjSD',
    )
    assert.equal(
      buildBybetRedirectUrl('/sportEvents/hotGame/smartPick', 'https://bybet.com///', 'customCode'),
      'https://bybet.com/sportEvents/hotGame/smartPick?p=customCode',
    )
  })

  test('Case 10: components/SportsPopular.vue wires tab destination and external redirect', () => {
    const source = fs.readFileSync(path.resolve('components/SportsPopular.vue'), 'utf-8')
    assert.match(source, /getTabDestination\(tab\.key\)/, 'SportsPopular must bind getTabDestination to tab :to')
    assert.match(source, /:external="redirectsToByBet\(tab\.key\)"/, 'SportsPopular must mark redirects as external')
    assert.match(source, /getSportsTabRedirectPath/, 'SportsPopular must use getSportsTabRedirectPath')
  })

  test('Case 11: pages/explore/sports/live.vue includes All eSports tab pointing to sportEvents/liveGame/eSportBallGroup', () => {
    const source = fs.readFileSync(path.resolve('pages/explore/sports/live.vue'), 'utf-8')
    assert.match(source, /sportEvents\/liveGame\/eSportBallGroup/, 'live.vue must contain live esports redirect path')
    assert.match(source, /All eSports/, 'live.vue must define All eSports tab label')
    assert.match(source, /:external="Boolean\(tab\.external\)"/, 'live.vue must bind external attribute on tabs')
  })

  test('Case 12: components/sports/MobileSportsNav.vue routes esports in live mode to sportEvents/liveGame/eSportBallGroup', () => {
    const source = fs.readFileSync(path.resolve('components/sports/MobileSportsNav.vue'), 'utf-8')
    assert.match(
      source,
      /isLive\.value\s*&&\s*\(sport\.key === 'esports'[\s\S]*?sportEvents\/liveGame\/eSportBallGroup/,
      'MobileSportsNav must route esports to sportEvents/liveGame/eSportBallGroup when isLive is true',
    )
  })

  test('Case 13: utils/sportsRedirect.ts uses .env values when arguments are omitted', () => {
    // Both resolve to the configured .env values: https://bybet.com and xjSD
    assert.equal(getEnvRedirectUrl(), 'https://bybet.com')
    assert.equal(getEnvRedirectCode(), 'xjSD')

    // Calling without explicit bybetRedirectUrl or redirectCode parameters
    assert.equal(
      buildBybetRedirectUrl('sportEvents/hotGame/smartPick'),
      'https://bybet.com/sportEvents/hotGame/smartPick?p=xjSD',
    )
    assert.equal(
      resolveTennisRedirectUrl(),
      'https://bybet.com/sportEvents/inplay/tennis?p=xjSD',
    )
    assert.equal(
      resolveSportsTabRedirectUrl('basketball', 'parlay'),
      'https://bybet.com/sportEvents/parlay/basketball/interval/inplay?p=xjSD',
    )
  })

  test('Case 14: Dynamic changes to process.env BYBET_REDIRECT_URL and BYBET_REDIRECT_CODE immediately update URLs', () => {
    const origUrl = process.env.BYBET_REDIRECT_URL
    const origCode = process.env.BYBET_REDIRECT_CODE

    try {
      process.env.BYBET_REDIRECT_URL = 'https://custom-env-test.bybet.com/'
      process.env.BYBET_REDIRECT_CODE = 'PROMO_FROM_ENV'

      assert.equal(getEnvRedirectUrl(), 'https://custom-env-test.bybet.com/')
      assert.equal(getEnvRedirectCode(), 'PROMO_FROM_ENV')

      assert.equal(
        buildBybetRedirectUrl('sportEvents/hotGame/smartPick'),
        'https://custom-env-test.bybet.com/sportEvents/hotGame/smartPick?p=PROMO_FROM_ENV',
      )
      assert.equal(
        resolveSportsTabRedirectUrl('soccer', 'replay'),
        'https://custom-env-test.bybet.com/sportEvents/gameResult/football/regular/today?p=PROMO_FROM_ENV',
      )
    } finally {
      process.env.BYBET_REDIRECT_URL = origUrl
      process.env.BYBET_REDIRECT_CODE = origCode
    }
  })
})
