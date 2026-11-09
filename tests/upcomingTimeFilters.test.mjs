import test, { describe } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

// Simulation of Upcoming.vue time filter logic
const timeFilters = ['1hours', '3hours', '6hours', '12hours', '24hours']

function getEventStartTimestamp(event) {
  const raw = event.commence_time ?? event.start_time ?? event.startTime
  if (raw == null || raw === '') return null
  const value = typeof raw === 'number' ? raw : Date.parse(raw)
  return Number.isNaN(value) ? null : value
}

function isWithinTimeFilter(event, filter, now) {
  if (!filter) return true
  const startTimestamp = getEventStartTimestamp(event)
  if (startTimestamp == null) return false
  const hours = Number.parseInt(filter, 10)
  const lowerBound = now
  const upperBound = lowerBound + (hours * 60 * 60 * 1000)
  return startTimestamp > lowerBound && startTimestamp <= upperBound
}

function computeDisplayedFilters(events, isPopular, now) {
  const available = timeFilters.filter(filter =>
    events.some(event => isWithinTimeFilter(event, filter, now)),
  )
  return isPopular ? available.filter(filter => filter !== '1hours') : available
}

describe('Upcoming Time Filter Pills Suite', () => {
  const now = 1700000000000 // Fixed reference time

  test('Case 1: When earliest upcoming match is 4 hours away, 3hours pill does not appear in popular', () => {
    const events = [
      { id: '1', commence_time: new Date(now + 4 * 3600000).toISOString() }, // in 4 hours
      { id: '2', commence_time: new Date(now + 8 * 3600000).toISOString() }, // in 8 hours
    ]

    const pills = computeDisplayedFilters(events, true, now)
    assert.deepEqual(pills, ['6hours', '12hours', '24hours'])
    assert.equal(pills.includes('3hours'), false, '3hours must not appear when there are no events in 3 hours')
  })

  test('Case 2: When an event starts in 2 hours, 3hours pill appears in popular', () => {
    const events = [
      { id: '1', commence_time: new Date(now + 2 * 3600000).toISOString() }, // in 2 hours
      { id: '2', commence_time: new Date(now + 10 * 3600000).toISOString() },
    ]

    const pills = computeDisplayedFilters(events, true, now)
    assert.deepEqual(pills, ['3hours', '6hours', '12hours', '24hours'])
    assert.equal(pills.includes('3hours'), true, '3hours must appear when an event is within 3 hours')
  })

  test('Case 3: In popular mode, 1hours is excluded even if an event starts in 30 minutes', () => {
    const events = [
      { id: '1', commence_time: new Date(now + 0.5 * 3600000).toISOString() }, // in 30 mins
      { id: '2', commence_time: new Date(now + 2 * 3600000).toISOString() },
    ]

    const popularPills = computeDisplayedFilters(events, true, now)
    assert.deepEqual(popularPills, ['3hours', '6hours', '12hours', '24hours'])
    assert.equal(popularPills.includes('1hours'), false, '1hours must not appear in popular')

    const regularPills = computeDisplayedFilters(events, false, now)
    assert.equal(regularPills.includes('1hours'), true, '1hours must appear in non-popular mode')
  })

  test('Case 4: When there are no upcoming events at all, displayedTimeFilters is empty', () => {
    const events = []
    const pills = computeDisplayedFilters(events, true, now)
    assert.deepEqual(pills, [])
  })

  test('Case 5: Past or completed events are not counted as upcoming within time window', () => {
    const events = [
      { id: '1', commence_time: new Date(now - 1 * 3600000).toISOString() }, // 1 hour ago
      { id: '2', commence_time: new Date(now).toISOString() }, // exactly now
    ]

    const pills = computeDisplayedFilters(events, true, now)
    assert.deepEqual(pills, [], 'Past events must not create time filter pills')
  })

  test('Case 6: components/sports/tabs/Upcoming.vue declares displayedTimeFilters before syncSelectedFilter and immediate watchers', () => {
    const upcomingSource = fs.readFileSync(path.resolve('components/sports/tabs/Upcoming.vue'), 'utf-8')
    const displayedIndex = upcomingSource.indexOf('const displayedTimeFilters =')
    const syncIndex = upcomingSource.indexOf('const syncSelectedFilter =')
    const watchRouteIndex = upcomingSource.indexOf('watch(() => route.params.hours')
    const watchDisplayedIndex = upcomingSource.indexOf('watch(displayedTimeFilters')

    assert.ok(displayedIndex !== -1, 'displayedTimeFilters must be declared in Upcoming.vue')
    assert.ok(syncIndex !== -1, 'syncSelectedFilter must be declared in Upcoming.vue')
    assert.ok(watchRouteIndex !== -1, 'watch(() => route.params.hours) must be declared in Upcoming.vue')
    assert.ok(watchDisplayedIndex !== -1, 'watch(displayedTimeFilters) must be declared in Upcoming.vue')

    assert.ok(
      displayedIndex < syncIndex,
      'displayedTimeFilters must be declared before syncSelectedFilter to avoid Temporal Dead Zone (TDZ) ReferenceError',
    )
    assert.ok(
      displayedIndex < watchRouteIndex,
      'displayedTimeFilters must be declared before watch(() => route.params.hours) with immediate execution',
    )
    assert.ok(
      displayedIndex < watchDisplayedIndex,
      'displayedTimeFilters must be declared before watch(displayedTimeFilters)',
    )
  })

  test('Case 7: Direct visit to /upcoming/:hours retains the route hour pill even if matches start later', () => {
    const events = [
      { id: '1', commence_time: new Date(now + 16 * 3600000).toISOString() }, // in 16 hours
    ]

    function computeDisplayedFiltersWithRoute(eventsList, isPopularMode, refNow, routeHour) {
      const available = timeFilters.filter(filter =>
        eventsList.some(event => isWithinTimeFilter(event, filter, refNow)),
      )
      let filters = isPopularMode ? available.filter(filter => filter !== '1hours') : available
      if (routeHour && !filters.includes(routeHour)) {
        filters = [...filters, routeHour].sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))
      }
      if (!filters.length && eventsList.length > 0) {
        filters = isPopularMode ? ['3hours', '6hours', '12hours', '24hours'] : ['1hours', '3hours', '6hours', '12hours', '24hours']
      }
      return filters
    }

    const pills = computeDisplayedFiltersWithRoute(events, true, now, '3hours')
    assert.deepEqual(pills, ['3hours', '24hours'])
    assert.ok(pills.includes('3hours'), '3hours pill must be present when requested via route')
  })

  test('Case 8: When selected time filter has no events within narrow window, fall back to matchingEvents so page is never blank', () => {
    const events = [
      { id: '1', sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: new Date(now + 16 * 3600000).toISOString() },
    ]

    function resolveFilteredEvents(eventsList, selectedFilter, refNow) {
      const withinFilter = selectedFilter
        ? eventsList.filter(event => isWithinTimeFilter(event, selectedFilter, refNow))
        : []
      return withinFilter.length > 0 ? withinFilter : eventsList
    }

    const result = resolveFilteredEvents(events, '3hours', now)
    assert.equal(result.length, 1, 'Should fall back to available upcoming events rather than returning empty')
    assert.equal(result[0].id, '1')
  })

  test('Case 9: components/SportsPopular.vue and upcoming pages provide safe defaults and await SSR fetching', () => {
    const popularSource = fs.readFileSync(path.resolve('components/SportsPopular.vue'), 'utf-8')
    assert.ok(popularSource.includes('await useFetch(\'/api/sports\''), 'SportsPopular must await useFetch for SSR rendering')
    assert.ok(popularSource.includes('effectiveSelectedSports'), 'SportsPopular must compute effectiveSelectedSports fallback')

    const popularHoursSource = fs.readFileSync(path.resolve('pages/explore/sports/popular/upcoming/[hours].vue'), 'utf-8')
    assert.ok(popularHoursSource.includes('selectedSports?: string[]'), 'popular upcoming [hours].vue must support optional selectedSports')

    const sportHoursSource = fs.readFileSync(path.resolve('pages/explore/sports/[sport]/upcoming/[hours].vue'), 'utf-8')
    assert.ok(sportHoursSource.includes('effectiveSports'), 'sport upcoming [hours].vue must compute effectiveSports')
  })
})
