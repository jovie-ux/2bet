import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parse } from '@vue/compiler-dom'

const documents = [
  ['sports-betting', 12, 0],
  ['football', 2, 29],
  ['basketball', 2, 43],
  ['tennis', 2, 44],
  ['baseball', 2, 10],
  ['parlays', 3, 14],
  ['cash-out', 3, 3],
  ['outright', 2, 0],
  ['table-tennis', 2, 12],
  ['badminton', 2, 11],
]

const textContent = node => node.type === 2 ? node.content : (node.children ?? []).map(textContent).join('')

function findElements(node, predicate, result = []) {
  if (node.type === 1 && predicate(node)) result.push(node)
  for (const child of node.children ?? []) findElements(child, predicate, result)
  return result
}

for (const [name, sections, subsections] of documents) {
  test(`${name} has a document title and an ordered heading hierarchy`, async () => {
    const data = await import(`../data/${name}-rules.ts`)
    const ast = parse(Object.values(data)[0], { onError: () => {} })
    const headings = findElements(ast, node => /^h[1-6]$/.test(node.tag))
    assert.equal(headings.filter(node => node.tag === 'h1').length, 1)
    assert.equal(headings.filter(node => node.tag === 'h2').length, sections)
    assert.equal(headings.filter(node => node.tag === 'h3').length, subsections)
    assert.ok(headings.every(node => ['h1', 'h2', 'h3'].includes(node.tag)))
    assert.ok(headings.every(node => textContent(node).trim()))
    assert.ok(headings.every(node => !node.props.some(prop => prop.name === 'role' && prop.value?.content === 'presentation')))
    assert.ok(headings.filter(node => node.tag === 'h2').every(node =>
      node.props.some(prop => prop.name === 'style' && /background-color:#e1e1e1/.test(prop.value?.content ?? '')),
    ))
  })
}

test('Tennis Winner is a subsection heading followed by its rules', async () => {
  const { tennisRulesHtml } = await import('../data/tennis-rules.ts')
  const ast = parse(tennisRulesHtml, { onError: () => {} })
  const winner = findElements(ast, node => node.tag === 'h3' && textContent(node).trim() === 'Winner')
  assert.ok(winner.length > 0)
  for (const heading of winner) assert.ok(tennisRulesHtml.slice(heading.loc.end.offset).startsWith('<ul'))
})

test('Cash Out example headings exclude their explanatory paragraphs', async () => {
  const { cashOutRulesHtml } = await import('../data/cash-out-rules.ts')
  const ast = parse(cashOutRulesHtml, { onError: () => {} })
  const headings = findElements(ast, node => node.tag === 'h3')
  assert.deepEqual(headings.map(node => textContent(node).trim()), [
    'Single Bets – Fully Cashed Out',
    'Single Bet – Partially Cashed Out',
    'Multiples Bets – when a selection event is cancelled.',
  ])
  for (const heading of headings) {
    assert.ok(cashOutRulesHtml.slice(heading.loc.end.offset).startsWith('<p'))
  }
})
