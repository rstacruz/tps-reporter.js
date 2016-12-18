const parseTaskpaper = require('taskpaper/es5')

// TODO: sprint planning
// TODO: scale points of children

function parseTasks (input) {
  let ast = parseTaskpaper(input)
  ast = transform(ast)
  return ast
}

/*
 * Transform
 */

function transform (node, ctx) {
  // Context for the root node
  if (!ctx) ctx = { root: node }

  node = transformNotes(node, ctx)
  node = transformSprints(node, ctx)
  node = transformRecurse(node, ctx)
  node = transformTags(node, ctx)
  return node
}

function transformTags (node, ctx) {
  const tags = node.tags || []
  const sprints = ctx.root.sprints || {}

  node.sprintIds = []

  let newtags = []
  tags.forEach(tag => {
    let m
    if (sprints[tag] && node.sprintIds.indexOf(tag) === -1) {
      node.sprintIds.push(tag)
    } else if ((m = tag.match(/^([\d\.]+)pts?$/))) {
      node.points = +m[1]
    } else if ((m = tag.match(/^(\d+)%$/))) {
      node.progress = +m[1] / 100
    } else if (tag === 'done') {
      node.progress = 1
    } else if (tag === 'in_progress') {
      node.progress = 0.5
    } else {
      newtags.push(tag)
    }
  })

  // Remove the "processed" tags
  node.tags = newtags

  if (node.points === undefined) {
    node.points = inferPoints(node)
  }

  if (node.progress === undefined) {
    node.progress = inferProgress(node)
  }

  return node
}

/*
 * Moves notes from `node.children` into `node.notes`
 */

function transformNotes (node) {
  if (!node.children) return node

  let notes = []

  // Get notes
  notes = node.children
    .filter(c => c.type === 'note')
    .map(c => c.value.trim())

  // Remove notes
  node.children = node.children
    .filter(c => c.type !== 'note')

  node.notes = notes.length
    ? notes.join('\n\n')
    : null

  return node
}

/*
 * Do the same for children
 */

function transformRecurse (node, ctx) {
  node.children.forEach((child, i) => {
    node.children[i] = transform(child, ctx)
  })
  return node
}

/*
 * Gets sprints
 */

function transformSprints (node) {
  if (node.type !== 'document') return node

  node.sprints = {}

  // Find sprints
  var sprintIdx = node.children
    .findIndex(c => c.type === 'project' && c.value === 'Sprints')
  if (sprintIdx === -1) return node

  // Get sprint and remove it
  let sprint = node.children[sprintIdx]
  node.children.splice(sprintIdx, 1)

  // Gather its notes
  sprint = transformNotes(sprint)
  const notes = sprint.notes || ''

  // Save it
  let index = 0
  node.sprints = notes.split(/\n+/).reduce((sprints, line) => {
    let m = line.match(/^([^:]+): (.*)$/)
    if (m) sprints[m[1]] = { id: m[1], name: m[2], index: index++ }
    return sprints
  }, {})

  return node
}

/*
 * Infers a node's points based on its subnode's points
 */

function inferPoints (node) {
  const subtasks = node.children
    .filter(n => n.type === 'project' || n.type === 'task')

  if (subtasks.length === 0) return 1

  return subtasks
    .map(n => n.points)
    .reduce((total, i) => total + i, 0)
}

/*
 * Infer a node's progress based on its subnode's progress
 */

function inferProgress (node) {
  const subtasks = node.children
    .filter(n => n.type === 'project' || n.type === 'task')

  if (subtasks.length === 0) return 0

  const total = inferPoints(node)
  const points = subtasks
    .map(n => n.progress * n.points)
    .reduce((total, i) => total + i, 0)

  return points / total
}

module.exports = parseTasks
