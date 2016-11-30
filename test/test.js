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

test('progress, done', t => {
  result = parse('- task1 @done')
  t.deepEqual(result.children[0].progress, 1)
  t.end()
})

test('progress, in progress', t => {
  result = parse('- task1 @in_progress')
  t.deepEqual(result.children[0].progress, 0.5)
  t.end()
})

test('progress, percentage', t => {
  result = parse('- task1 @20%')
  t.deepEqual(result.children[0].progress, 0.2)
  t.end()
})

test('progress, inferrence (0%)', t => {
  result = parse('- task1\n- task2')
  t.deepEqual(result.points, 2)
  t.deepEqual(result.progress, 0)

  t.end()
})

test('progress, inferrence (50%)', t => {
  result = parse('- task1 @done\n- task2')
  t.deepEqual(result.points, 2)
  t.deepEqual(result.progress, 0.5)

  t.end()
})

test('progress, inferrence (25%)', t => {
  result = parse('- task1 @50%\n- task2')
  t.deepEqual(result.points, 2)
  t.deepEqual(result.progress, 0.25)

  t.end()
})

test('progress, inferrence with points', t => {
  result = parse('- task1 @50% @8pts\n- task2')
  t.deepEqual(result.progress, 4 / 9)

  t.end()
})
