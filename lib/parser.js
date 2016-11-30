const P = require('parsimmon')

const NEWLINE = P.string('\n').atLeast(1).or(P.eof)

const INDENT = P.regex(/[\t\s]+/)

const STRING = P.regex(/[^:\n]+/)

const PROJECT = P.regex(/^([^\n]+?):/m, 1).skip(NEWLINE)
  .map((value) => ({ type: 'project', value }))
  .desc('Project definition')

const TASK = P.regex(/^- ([^\n]+?)\n/m, 1)
  .map((value) => ({ type: 'task', value }))
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

const parser = block().many()

const result = parser.parse('hi:\n  yo:\n  - ma\n')
console.log('result:', require('util').inspect(result, { depth: null, colors: true }))
