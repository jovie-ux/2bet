import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import {
  PROMO_CATEGORIES,
  PROMOTION_SECTIONS,
  PROMOTIONS,
  getItemCategories,
  promotionHasCategory,
} from '../data/promotions.ts'

test('Promo categories list includes all expected categories', () => {
  const keys = PROMO_CATEGORIES.map(c => c.key)
  assert.ok(keys.includes('all'))
  assert.ok(keys.includes('most-popular'))
  assert.ok(keys.includes('deposit'))
  assert.ok(keys.includes('sports'))
  assert.ok(keys.includes('live-casino'))
  assert.ok(keys.includes('slots'))
  assert.ok(keys.includes('new-member'))
  assert.ok(keys.includes('others'))
})

test('PROMOTION_SECTIONS includes a section for every non-all category in PROMO_CATEGORIES', () => {
  const expectedKeys = PROMO_CATEGORIES.filter(c => c.key !== 'all').map(c => c.key)
  const sectionCategories = PROMOTION_SECTIONS.map(s => s.category)
  
  for (const key of expectedKeys) {
    assert.ok(
      sectionCategories.includes(key),
      `Missing section for category key: ${key}`
    )
  }

  assert.equal(PROMOTION_SECTIONS.length, expectedKeys.length)
})

test('promotionHasCategory respects manually set categories on firstDeposit', () => {
  const firstDeposit = PROMOTIONS.find(p => p.slug === 'seu-primeiro-deposito')
  assert.ok(firstDeposit, 'seu-primeiro-deposito must exist')

  assert.equal(promotionHasCategory(firstDeposit, 'all'), true)
  assert.equal(promotionHasCategory(firstDeposit, 'most-popular'), true)
  assert.equal(promotionHasCategory(firstDeposit, 'deposit'), true)
  assert.equal(promotionHasCategory(firstDeposit, 'new-member'), true)
  assert.equal(promotionHasCategory(firstDeposit, 'others'), true)

  // Verify excluded categories
  assert.equal(promotionHasCategory(firstDeposit, 'slots'), false)
  assert.equal(promotionHasCategory(firstDeposit, 'sports'), false)
  assert.equal(promotionHasCategory(firstDeposit, 'live-casino'), false)
})

test('promotionHasCategory respects manually set categories on dailyRecovery', () => {
  const dailyRecovery = PROMOTIONS.find(p => p.slug === 'bonus-diario-de-recuperacao')
  assert.ok(dailyRecovery, 'bonus-diario-de-recuperacao must exist')

  assert.equal(promotionHasCategory(dailyRecovery, 'all'), true)
  assert.equal(promotionHasCategory(dailyRecovery, 'slots'), true)
  assert.equal(promotionHasCategory(dailyRecovery, 'live-casino'), true)
  assert.equal(promotionHasCategory(dailyRecovery, 'sports'), true)
  assert.equal(promotionHasCategory(dailyRecovery, 'most-popular'), true)

  // Verify excluded categories
  assert.equal(promotionHasCategory(dailyRecovery, 'deposit'), false)
  assert.equal(promotionHasCategory(dailyRecovery, 'new-member'), false)
  assert.equal(promotionHasCategory(dailyRecovery, 'others'), false)
})

test('getItemCategories correctly extracts and de-duplicates categories', () => {
  const mockItemWithCategories = {
    id: 'test-1',
    slug: 'test-1',
    title: 'Test',
    description: 'Test',
    category: 'slots',
    categories: ['deposit', 'new-member'],
  }
  assert.deepEqual(getItemCategories(mockItemWithCategories), ['deposit', 'new-member'])

  const mockItemWithSingleCategory = {
    id: 'test-2',
    slug: 'test-2',
    title: 'Test',
    description: 'Test',
    category: 'live-casino',
  }
  assert.deepEqual(getItemCategories(mockItemWithSingleCategory), ['live-casino'])

  const mockItemWithMostPopularFlag = {
    id: 'test-3',
    slug: 'test-3',
    title: 'Test',
    description: 'Test',
    category: 'sports',
    mostPopular: true,
  }
  assert.deepEqual(getItemCategories(mockItemWithMostPopularFlag), ['sports', 'most-popular'])
})

test('Deposit section contains seu-primeiro-deposito in PROMOTION_SECTIONS', () => {
  const depositSection = PROMOTION_SECTIONS.find(s => s.category === 'deposit')
  assert.ok(depositSection, 'Deposit section must exist')
  assert.ok(depositSection.items.some(p => p.slug === 'seu-primeiro-deposito'))
})

test('New Member section contains seu-primeiro-deposito in PROMOTION_SECTIONS', () => {
  const newMemberSection = PROMOTION_SECTIONS.find(s => s.category === 'new-member')
  assert.ok(newMemberSection, 'New Member section must exist')
  assert.ok(newMemberSection.items.some(p => p.slug === 'seu-primeiro-deposito'))
})
