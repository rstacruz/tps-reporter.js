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

test('notes', t => {
  result = parse('Project:\n  hello')
  t.deepEqual(result.children[0].type, 'project', 'project')
  t.deepEqual(result.children[0].notes, 'hello', 'consolidating notes')
  t.end()
})

test('sprint definitions', t => {
  result = parse('Sprints:\n  1: Sprint 1\n  2: Sprint 2\nProject:')
  t.deepEqual(result.children[0].value, 'Project', 'removing sprints')
  t.deepEqual(result.sprints['1'], { id: '1', name: 'Sprint 1', index: 0 }, 'sprint parsing')
  t.deepEqual(result.sprints['2'], { id: '2', name: 'Sprint 2', index: 1 }, 'sprint parsing')
  t.end()
})

test('sprint setting', t => {
  result = parse('Sprints:\n  1: Sprint 1\n  2: Sprint 2\n- My task @1')
  t.deepEqual(result.children[0].value, 'My task', 'task value')
  t.deepEqual(result.children[0].inSprints, ['1'], 'setting sprint')
  t.end()
})

test('sprint inferrence', t => {
  t.pass('[pending]')
  t.end()
})

test('implied sprints', t => {
  t.pass('[pending]')
  t.end()
})
