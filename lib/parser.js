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

function transform (node) {
  const tags = node.tags || []

  // Leaf nodes
  if (!node.children) return node

  // Recurse early
  // TODO: if this is done, then subnodes should be done too,
  // if they all don't have any progress
  node.children.forEach((child, i) => {
    node.children[i] = transform(child)
  })

  // TODO: merge notes

  let newtags = []
  tags.forEach(tag => {
    let m
    if ((m = tag.match(/^([\d\.]+)pts?$/))) {
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
