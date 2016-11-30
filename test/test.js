const test = require('tape')
const parse = require('../lib/parser')

let result, expected

test('points, inferrence', t => {
  result = parse('- task1\n- task2')
  t.deepEqual(result.points, 2)
  t.deepEqual(result.progress, 0)

  t.end()
})

test('points, default', t => {
  result = parse('- task1')
  t.deepEqual(result.children[0].points, 1)

  t.end()
})

test('points, overriding', t => {
  result = parse('- task1 @3pts')
  t.deepEqual(result.children[0].points, 3)

  t.end()
})

test('points, overriding and inferrence', t => {
  result = parse('- task1 @3pts\n- task2')
  t.deepEqual(result.points, 4)

  t.end()
})
