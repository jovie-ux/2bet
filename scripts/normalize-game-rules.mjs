import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from '@vue/compiler-dom'

const documents = [
  ['sports-betting-rules', 'sports-betting'],
  ['football', 'football'],
  ['basketball', 'basketball'],
  ['tennis', 'tennis'],
  ['baseball', 'baseball'],
  ['parlays-multiples', 'parlays'],
  ['cash-out', 'cash-out'],
  ['outright', 'outright'],
  ['table-tennis', 'table-tennis'],
  ['badminton', 'badminton'],
]

const footballMarkets = new Set([
  'Handicap', 'Handicap - 1st Half', 'European Handicap', 'In-Play Handicap',
  'Extra Time - Handicap', 'Extra Time - Handicap - 1st Half', '15 Minute Goals (Handicap)',
  'Goals - Over / Under', 'Goals: Over / Under', 'Goals: Over / Under - 1st Half',
  'European Goals: Over/Under', 'European Goals: Over/Under - 1st Half', 'In-Play Over / Under Goals',
  'Extra Time - Goals: Over / Under', 'Extra Time - Goals: Over / Under - 1st Half',
  'European Extra Time: Over/Under', 'Team Goals - Over / Under',
  'Extra Time - Team Goals - Over / Under', '15 Minute Goals (Including Injury Time)(Over / Under)',
  '10 Minute Goals (Including Injury Time)(Over / Under)', '5 Minute Goals (Including Injury Time)(Over / Under)',
  'First X Minutes - Over/Under', 'Extra Time - 5 Minute Goals (Over / Under)',
  '1 X 2 (Match Betting)', '1 X 2', '1 X 2 - 1st Half', 'In-Play 1 X 2',
])

const readAst = html => parse(html, { onError: () => {} })
const textContent = node => node.type === 2 ? node.content : (node.children ?? []).map(textContent).join('')
const compactText = node => textContent(node).replace(/\s+/g, '')
const styleOf = node => node.props?.find(prop => prop.name === 'style')?.value?.content ?? ''
const isBar = node => /background-color:\s*#e1e1e1\b/i.test(styleOf(node))

function walk(node, visit, parents = []) {
  visit(node, parents)
  for (const child of node.children ?? []) walk(child, visit, [...parents, node])
}

function headingMarkup(node, tag) {
  return node.loc.source
    .replace(/^<\w+/, `<${tag}`)
    .replace(/\srole="presentation"/g, '')
    .replace(/<\/(?:p|h[1-6])>$/, `</${tag}>`)
}

function normalize(html, name) {
  const ast = readAst(html)
  const editor = ast.children.find(node => node.tag === 'div')
  if (!editor) throw new Error(`${name}: editor container is missing`)
  const title = editor.children.find(node => node.type === 1 && textContent(node).trim())
  if (!title) throw new Error(`${name}: document title is missing`)
  const edits = []
  const replace = (node, value) => edits.push({ start: node.loc.start.offset, end: node.loc.end.offset, value })

  for (const node of editor.children) {
    if (node === title) break
    if (node.type === 1 && !textContent(node).trim()) replace(node, '')
  }

  walk(editor, (node, parents) => {
    if (node.type !== 1) return
    if (node === title) {
      replace(node, headingMarkup(node, 'h1').replace(/(<h1\b[^>]*>)\s*(?:<br\s*\/?>\s*)+/i, '$1'))
    } else if (node.tag === 'p' && isBar(node)) {
      replace(node, headingMarkup(node, 'h2'))
    } else if (node.tag === 'h4' && name === 'cash-out') {
      const spans = node.children.find(child => child.tag === 'strong')?.children.filter(child => child.tag === 'span') ?? []
      const [label, ...body] = spans.filter(span => textContent(span).trim())
      if (!label) throw new Error('Cash Out example title is missing')
      replace(node, `<h3>${label.loc.source}</h3>${body.map(span => `<p style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">${span.loc.source}</p>`).join('')}`)
    } else if (node.tag === 'h4') {
      replace(node, headingMarkup(node, 'h3'))
    } else if (name === 'football' && node.tag === 'p'
      && !parents.some(parent => ['li', 'td', 'th'].includes(parent.tag))
      && footballMarkets.has(textContent(node).trim())) {
      replace(node, headingMarkup(node, 'h3'))
    }
  })

  let normalized = html
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    normalized = normalized.slice(0, edit.start) + edit.value + normalized.slice(edit.end)
  }
  const normalizedAst = readAst(normalized)
  if (compactText(ast) !== compactText(normalizedAst)) throw new Error(`${name}: normalization changed the rule text`)
  for (const tag of ['ul', 'ol', 'li', 'table', 'tr', 'td', 'th']) {
    const count = tree => {
      let total = 0
      walk(tree, node => { if (node.tag === tag) total++ })
      return total
    }
    if (count(ast) !== count(normalizedAst)) throw new Error(`${name}: normalization changed ${tag} structure`)
  }
  return normalized
}

const write = process.argv.includes('--write')
for (const [page, name] of documents) {
  const dataPath = fileURLToPath(new URL(`../data/${name}-rules.ts`, import.meta.url))
  const source = readFileSync(dataPath, 'utf8')
  const match = source.match(/export const (\w+)\s*=\s*("(?:\\.|[^"\\])*")\s*;?/s)
  if (!match) throw new Error(`${name}: rules export was not found`)
  const html = JSON.parse(match[2])
  const normalized = normalize(html, name)
  const headings = [...normalized.matchAll(/<h([123])\b/g)].map(match => match[1])
  if (headings.filter(level => level === '1').length !== 1) throw new Error(`${name}: expected one document title`)
  const previousBars = (html.match(/background-color:#e1e1e1/g) ?? []).length
  if (headings.filter(level => level === '2').length !== previousBars) throw new Error(`${name}: section bars were lost`)
  if (write) {
    writeFileSync(dataPath, `${source.replace(match[0], `export const ${match[1]} = ${JSON.stringify(normalized)};`).trimEnd()}\n`)
    const pagePath = fileURLToPath(new URL(`../pages/game-rules/${page}.vue`, import.meta.url))
    const pageSource = readFileSync(pagePath, 'utf8')
    const script = pageSource.slice(0, pageSource.indexOf('</script>') + '</script>'.length)
      .replace("import GameRulesNav from '~/components/game-rules/GameRulesNav.vue'", "import GameRulesDocument from '~/components/game-rules/GameRulesDocument.vue'")
    const htmlBinding = page === 'parlays-multiples' ? 'formattedRulesHtml' : match[1]
    writeFileSync(pagePath, `${script}\n\n<template>\n  <GameRulesDocument :html="${htmlBinding}" />\n</template>\n`)
  }
  console.log(`${page}: ${headings.filter(level => level === '1').length} H1, ${headings.filter(level => level === '2').length} H2, ${headings.filter(level => level === '3').length} H3; rule text preserved`)
}
