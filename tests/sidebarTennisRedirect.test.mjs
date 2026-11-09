import test, { describe } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { resolveTennisRedirectUrl } from '../utils/sportsRedirect.ts'

describe('Sidebar Tennis External Redirect Suite', () => {
  test('Case 1: Standard URL correctly resolves to inplay tennis path with p=xjSD parameter', () => {
    const result = resolveTennisRedirectUrl('https://bybet.com')
    assert.equal(result, 'https://bybet.com/sportEvents/inplay/tennis?p=xjSD')
  })

  test('Case 2: Trailing slashes are stripped cleanly and p=xjSD parameter is preserved', () => {
    const result = resolveTennisRedirectUrl('https://bybet.com/')
    assert.equal(result, 'https://bybet.com/sportEvents/inplay/tennis?p=xjSD')

    const multiSlashResult = resolveTennisRedirectUrl('https://bybet.com///')
    assert.equal(multiSlashResult, 'https://bybet.com/sportEvents/inplay/tennis?p=xjSD')
  })

  test('Case 3: Custom domain or staging redirect URL is supported with p=xjSD parameter', () => {
    const result = resolveTennisRedirectUrl('https://staging.bybet.com/')
    assert.equal(result, 'https://staging.bybet.com/sportEvents/inplay/tennis?p=xjSD')
  })

  test('Case 4: Empty or undefined bybetRedirectUrl falls back to https://bybet.com/sportEvents/inplay/tennis?p=xjSD', () => {
    assert.equal(resolveTennisRedirectUrl(''), 'https://bybet.com/sportEvents/inplay/tennis?p=xjSD')
    assert.equal(resolveTennisRedirectUrl(undefined), 'https://bybet.com/sportEvents/inplay/tennis?p=xjSD')
  })

  test('Case 5: data/homepage.ts defines Tennis item using inline inplay tennis URL with external flag', () => {
    const homepageSource = fs.readFileSync(path.resolve('data/homepage.ts'), 'utf-8')
    assert.match(
      homepageSource,
      /label:\s*'Tennis'[\s\S]*?to:\s*`\${\(bybetRedirectUrl[\s\S]*?\/sportEvents\/inplay\/tennis[\s\S]*?external:\s*true/,
      'Tennis submenu item must link inline to tennis redirect url with external: true',
    )
  })

  test('Case 6: components/AppSidebar.vue handles external submenu items', () => {
    const sidebarSource = fs.readFileSync(path.resolve('components/AppSidebar.vue'), 'utf-8')
    assert.match(
      sidebarSource,
      /getSubmenuItemAttributes/,
      'AppSidebar must use getSubmenuItemAttributes to bind external link attributes',
    )
    assert.match(
      sidebarSource,
      /external:\s*true/,
      'AppSidebar getSubmenuItemAttributes must include external: true for external links',
    )
  })

  test('Case 7: Custom BYBET_REDIRECT_CODE parameter is respected when passed', () => {
    const result = resolveTennisRedirectUrl('https://bybet.com', 'PROMO2026')
    assert.equal(result, 'https://bybet.com/sportEvents/inplay/tennis?p=PROMO2026')
  })

  test('Case 8: data/homepage.ts defines History, Deposit, Withdraw, and VIP items using /login redirect URL with external: true', () => {
    const homepageSource = fs.readFileSync(path.resolve('data/homepage.ts'), 'utf-8')
    assert.match(
      homepageSource,
      /label:\s*'History'[\s\S]*?to:\s*`\${\(bybetRedirectUrl[\s\S]*?\/login\?p=\${redirectCode[\s\S]*?external:\s*true/,
      'History submenu item must link inline to /login redirect url with external: true',
    )
    assert.match(
      homepageSource,
      /label:\s*'Deposit'[\s\S]*?to:\s*`\${\(bybetRedirectUrl[\s\S]*?\/login\?p=\${redirectCode[\s\S]*?external:\s*true/,
      'Deposit item must link inline to /login redirect url with external: true',
    )
    assert.match(
      homepageSource,
      /label:\s*'Withdraw'[\s\S]*?to:\s*`\${\(bybetRedirectUrl[\s\S]*?\/login\?p=\${redirectCode[\s\S]*?external:\s*true/,
      'Withdraw item must link inline to /login redirect url with external: true',
    )
    assert.match(
      homepageSource,
      /label:\s*'VIP'[\s\S]*?to:\s*`\${\(bybetRedirectUrl[\s\S]*?\/login\?p=\${redirectCode[\s\S]*?external:\s*true/,
      'VIP item must link inline to /login redirect url with external: true',
    )
  })

  test('Case 9: components/sports/MobileSportsNav.vue supports custom external URLs in MobileSportNavItem', () => {
    const navSource = fs.readFileSync(path.resolve('components/sports/MobileSportsNav.vue'), 'utf-8')
    assert.match(
      navSource,
      /interface\s+MobileSportNavItem[\s\S]*?url\?:/m,
      'MobileSportNavItem interface must declare url?: string',
    )
    assert.match(
      navSource,
      /key:\s*'table-tennis'[\s\S]*?url:\s*'sportEvents\/incoming\/tableTennis'/,
      'Table Tennis item in MobileSportsNav must support custom url',
    )
    assert.match(
      navSource,
      /resolveExternalSportUrl/,
      'MobileSportsNav must contain resolveExternalSportUrl helper to format paths',
    )
  })
})
