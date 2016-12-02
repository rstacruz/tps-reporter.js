const test = require('tape')
const segmentize = require('../lib/segmentize')

let result

test('segmentize()', t => {
  result = segmentize(['a', 'b', 'c'], ['a'])
  t.deepEqual(result, [[], ['a'], ['b', 'c']], 'one on')

  result = segmentize(['a', 'b', 'c'], ['a', 'b'])
  t.deepEqual(result, [[], ['a', 'b'], ['c']], 'two on')

  result = segmentize(['a', 'b', 'c'], ['a', 'b', 'c'])
  t.deepEqual(result, [[], ['a', 'b', 'c']], 'all on')

  result = segmentize(['a', 'b', 'c'], ['a', 'b', 'c', 'a', 'b'])
  t.deepEqual(result, [[], ['a', 'b', 'c']], 'duplicates')

  result = segmentize(['a', 'b', 'c'], ['c', 'b', 'a'])
  t.deepEqual(result, [[], ['a', 'b', 'c']], 'random order')

  result = segmentize(['a', 'b', 'c'], ['b'])
  t.deepEqual(result, [['a'], ['b'], ['c']], 'middle')

  result = segmentize(['a', 'b', 'c'], ['b', 'c'])
  t.deepEqual(result, [['a'], ['b', 'c']], 'middle to end')

  result = segmentize(['a', 'b', 'c'], [])
  t.deepEqual(result, [['a', 'b', 'c']], 'none')

  result = segmentize(['a', 'b', 'c'], ['d'])
  t.deepEqual(result, [['a', 'b', 'c']], 'non-existent')

  t.end()
})
