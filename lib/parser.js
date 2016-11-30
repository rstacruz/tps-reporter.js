const P = require('parsimmon')

// New line
const NEWLINE = P.string('\n').atLeast(1).or(P.eof)

/*
 * Indentation
 */

const INDENT = P.regex(/[\t\s]+/)

/*
 * Project definition
 */

const PROJECT = P.regex(/^([^\n]+?):/m, 1)
  .skip(NEWLINE)
  .map((value) => ({ type: 'project', value }))
  .desc('Project definition')

/*
 * Task tag
 *     @done
 */

const TASKTAG = P.regex(/^@([^\s\n]+)/, 1)

/*
 * Task definition
 *     "- hello @done"
 */

const TASK = P.seq(
  P.string('- '),
  P.regex(/^(?:[^@\n][^\s\n]*)(?:\s+[^@\n][^\s\n]*)*/m),
  P.optWhitespace,
  P.sepBy(TASKTAG, P.whitespace))
  .skip(NEWLINE)
  .map(([_, value, __, tags]) => ({ type: 'task', value, tags }))
  .desc('Task definition')

/*
 * Note definition
 */

const NOTE = P.regex(/^[^\n]+\n*/)
  .map(value => ({ type: 'note', value }))
  .desc('Note definition')

/*
 * A block
 */

function block (level = 0, prefix = '') {
  return parentBlock(level, prefix).or(leafBlock(level, prefix))
}

function leafBlock (level = 0, prefix = '') {
  return P.seq(
    P.string(prefix),
    level === 0 ? P.string('') : INDENT,
    NOTE)
    // Consolidate into one node
    .map(([_, __, value]) => value)
    .atLeast(1)
    .map(notes => ({ type: 'note', value: notes.map(n => n.value).join('') }))
}

function parentBlock (level = 0, prefix = '') {
  return P.seq(
    P.string(prefix),
    level === 0 ? P.string('') : INDENT,
    PROJECT.or(TASK))
    .chain(([prefix, indent, item]) => {
      return block(level + 1, prefix + indent).many()
      .map(children => {
        let out = item
        out.children = children
        return out
      })
    })
}

const parser = block().many()

/*
 * Let's parse something
 */

function parse (str) {
  const out = parser.parse(str)
  return out
}
const result = parse('hi:\n  yo:\n  - ma @done @50%\n    thats right\n\n    :)\n')
console.log('result:', require('util').inspect(result, { depth: null, colors: true }))
