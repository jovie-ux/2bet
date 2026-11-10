import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  AFFILIATE_COMMISSION_PAY_DESCRIPTION,
  AFFILIATE_COMMISSION_PROGRAMS,
  AFFILIATE_CURRENCY_CODES,
  AFFILIATE_VALID_MEMBERS_DESCRIPTION,
  formatAffiliateProfitRange,
  isAffiliateCurrencyCode,
} from '../data/affiliate.ts'

// Member thresholds, inclusive profit ranges, and rates transcribed from the currency references.
const referenceRows = {
  INR: [
    [5, '100~150000', 30],
    [15, '150001~7000000', 35],
    [30, '7000001~45000000', 45],
    [50, '45000001~9999999999', 55],
  ],
  BRL: [
    [5, '1~10000', 30],
    [15, '10001~500000', 35],
    [30, '500001~3000000', 45],
    [50, '3000001~9999999999', 55],
  ],
  USDT: [
    [5, '1~40000', 30],
    [10, '40001~150000', 35],
    [15, '150001~300000', 40],
    [25, '300001~500000', 45],
    [35, '500001~1000000', 50],
    [50, '1000001 and above', 55],
  ],
}

for (const [currency, expectedRows] of Object.entries(referenceRows)) {
  test(`${currency} commission tiers match the reference`, () => {
    const actualRows = AFFILIATE_COMMISSION_PROGRAMS[currency].tiers.map(tier => [
      tier.validMembers,
      formatAffiliateProfitRange(tier),
      tier.commission,
    ])
    assert.deepEqual(actualRows, expectedRows)
  })

  test(`${currency} profit ranges are contiguous and disjoint`, () => {
    const tiers = AFFILIATE_COMMISSION_PROGRAMS[currency].tiers
    for (const [index, tier] of tiers.entries()) {
      assert.ok(Number.isSafeInteger(tier.minimumProfit) && tier.minimumProfit > 0)
      if (tier.maximumProfit !== null) {
        assert.ok(Number.isSafeInteger(tier.maximumProfit))
        assert.ok(tier.maximumProfit >= tier.minimumProfit)
      }
      if (index === 0) continue
      const previous = tiers[index - 1]
      assert.notEqual(previous.maximumProfit, null, 'only the final tier may be open-ended')
      assert.equal(tier.minimumProfit, previous.maximumProfit + 1)
      assert.ok(tier.validMembers > previous.validMembers)
      assert.ok(tier.commission > previous.commission)
    }
  })
}

test('only USDT has an adjustment notice and an open-ended final tier', () => {
  for (const currency of AFFILIATE_CURRENCY_CODES) {
    const program = AFFILIATE_COMMISSION_PROGRAMS[currency]
    const openTiers = program.tiers.filter(tier => tier.maximumProfit === null)
    if (currency === 'USDT') {
      assert.match(program.adjustmentNotice, /automatically adjusted based on the monthly net profit/)
      assert.match(program.adjustmentNotice, /active members and profit targets/)
      assert.equal(openTiers.length, 1)
      assert.equal(openTiers[0], program.tiers.at(-1))
      assert.equal(formatAffiliateProfitRange(openTiers[0]), '1000001 and above')
    } else {
      assert.equal(program.adjustmentNotice, undefined)
      assert.equal(openTiers.length, 0)
    }
  }
})

test('fiat programs share their introduction while USDT has its own introduction', () => {
  const { INR, BRL, USDT } = AFFILIATE_COMMISSION_PROGRAMS
  assert.deepEqual(INR.title, BRL.title)
  assert.deepEqual(INR.introduction, BRL.introduction)
  assert.equal(BRL.title.length, 2)
  assert.equal(USDT.title.length, 1)
  assert.notDeepEqual(USDT.title, BRL.title)
  assert.notDeepEqual(USDT.introduction, BRL.introduction)
  for (const program of Object.values(AFFILIATE_COMMISSION_PROGRAMS)) {
    assert.equal(program.introduction.length, 2)
  }
})

test('affiliate currency selection accepts only INR, BRL, and USDT', () => {
  assert.deepEqual(AFFILIATE_CURRENCY_CODES, ['INR', 'BRL', 'USDT'])
  assert.deepEqual(Object.keys(AFFILIATE_COMMISSION_PROGRAMS).sort(), ['BRL', 'INR', 'USDT'])
  for (const code of AFFILIATE_CURRENCY_CODES) assert.equal(isAffiliateCurrencyCode(code), true)
  for (const code of ['PHP', 'USD', 'all', 'usdt', '', '__proto__']) {
    assert.equal(isAffiliateCurrencyCode(code), false, `${code} must not select an affiliate program`)
  }
})

test('shared qualification and payment terms match the reference', () => {
  assert.match(AFFILIATE_VALID_MEMBERS_DESCRIPTION, /at least 100 USDT in valid deposits/)
  assert.match(AFFILIATE_VALID_MEMBERS_DESCRIPTION, /at least 500 USDT in valid bets/)
  assert.match(AFFILIATE_VALID_MEMBERS_DESCRIPTION, /at least 5 valid members per month/)
  assert.match(AFFILIATE_VALID_MEMBERS_DESCRIPTION, /paid on the 5th of each month/)
  assert.match(AFFILIATE_COMMISSION_PAY_DESCRIPTION, /between the 2nd and 3rd of each month/)
  assert.match(AFFILIATE_COMMISSION_PAY_DESCRIPTION, /registered wallet on the 5th/)
})
