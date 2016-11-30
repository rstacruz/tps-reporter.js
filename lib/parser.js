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
  .map(([_, value, __, tags]) => otrim({ type: 'task', value, tags }))
  .desc('Task definition')

function block (level = 0, prefix = '') {
  return P.seq(
    P.string(prefix),
    level === 0 ? P.string('') : INDENT,
    PROJECT.or(TASK))
    .chain(([prefix, indent, item]) => {
      return block(level + 1, prefix + indent).many()
      .map(children => {
        let out = item
        if (children.length) out.children = children
        return out
      })
    })
    // .map(([_pre, _ind, value]) => ({ type: 'project', value }))
}

function otrim (obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  })

  return obj
}

const parser = block().many()

const result = parser.parse('hi:\n  yo:\n  - ma @done @50%\n')
console.log('result:', require('util').inspect(result, { depth: null, colors: true }))
