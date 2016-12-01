const test = require('tape')
const parse = require('../lib/parser')

let result, expected

test('points, inferrence', t => {
  result = parse('- task1\n- task2')
  t.deepEqual(result.points, 2, 'points')
  t.deepEqual(result.progress, 0, 'progress')
  t.end()
})

test('points, default', t => {
  result = parse('- task1')
  t.deepEqual(result.children[0].points, 1, 'points')
  t.end()
})

test('points, overriding', t => {
  result = parse('- task1 @3pts')
  t.deepEqual(result.children[0].points, 3, 'points')
  t.end()
})

test('points, fractional points (no zero)', t => {
  result = parse('- task1 @.5pts')
  t.deepEqual(result.children[0].points, 0.5, 'points')
  t.end()
})

test('points, fractional points', t => {
  result = parse('- task1 @0.5pts')
  t.deepEqual(result.children[0].points, 0.5, 'points')
  t.end()
})

test('points, overriding and inferrence', t => {
  result = parse('- task1 @3pts\n- task2')
  t.deepEqual(result.points, 4, 'points')
  t.end()
})

test('progress, done', t => {
  result = parse('- task1 @done')
  t.deepEqual(result.children[0].progress, 1, 'progress')
  t.end()
})

test('progress, in progress', t => {
  result = parse('- task1 @in_progress')
  t.deepEqual(result.children[0].progress, 0.5, 'progress')
  t.end()
})

test('progress, percentage', t => {
  result = parse('- task1 @20%')
  t.deepEqual(result.children[0].progress, 0.2, 'progress')
  t.end()
})

test('progress, inferrence (0%)', t => {
  result = parse('- task1\n- task2')
  t.deepEqual(result.points, 2, 'points')
  t.deepEqual(result.progress, 0, 'progress')

  t.end()
})

test('progress, inferrence (50%)', t => {
  result = parse('- task1 @done\n- task2')
  t.deepEqual(result.points, 2, 'points')
  t.deepEqual(result.progress, 0.5, 'progress')

  t.end()
})

test('progress, inferrence (25%)', t => {
  result = parse('- task1 @50%\n- task2')
  t.deepEqual(result.points, 2, 'points')
  t.deepEqual(result.progress, 0.25, 'progress')

  t.end()
})

test('progress, inferrence with points', t => {
  result = parse('- task1 @50% @8pts\n- task2')
  t.deepEqual(result.progress, 4 / 9, 'progress')

  t.end()
})
