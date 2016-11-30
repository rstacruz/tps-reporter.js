const Table = require('cli-table')
const chalk = require('chalk')
const num = require('number-formatter')

const SYMBOLS = {
  unstarted: chalk.gray('·'),
  finished: chalk.green('✓'),
  inProgress: chalk.blue('•'),
  progressFg: chalk.blue('─'),
  progressBg: chalk.black('─')
}

const FORMAT = {
  project: chalk.bold,
  task: chalk.reset
}

function format (node) {
  const table = new Table({
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
           , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
           , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
           , 'right': '' , 'right-mid': '' , 'middle': ' ' },
    colWidths: [70, 15, 5]
  })

  function push (node) {
    if (node.type === 'task' || node.type === 'project') {
      const ind = Array(node.depth).join('  ')
      const isLeaf = node.children.length === 0

      const status =
        node.progress === 0
          ? SYMBOLS.unstarted
        : node.progress === 1
          ? SYMBOLS.finished
          : SYMBOLS.inProgress

      const fmt = FORMAT[node.type]
      const done = node.points * node.progress
      const depth = node.depth

      const barLength = depth === 1 ? 13 : depth === 2 ? 8 : 5
      const count = Math.floor(node.progress * barLength)
      const bar =
        Array(1 + count).join(SYMBOLS.progressFg) +
        Array(1 + barLength - count).join(SYMBOLS.progressBg)

      table.push([
        ind + status + ' ' + fmt(node.value),
        isLeaf ? '' : bar,
        isLeaf ? '' : `${num('#.##', node.points) || 0}`])
    }

    if (node.children) {
      node.children.forEach(child => {
        push(child)
      })
    }
  }

  push(node)

  return '\n' + table.toString() + '\n'
}

module.exports = format
