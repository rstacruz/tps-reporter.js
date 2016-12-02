function segmentize (master, list) {
  let current = []
  let result = []
  let dir = false

  master.forEach(item => {
    let isOn = list.indexOf(item) !== -1
    if (dir === isOn) {
      current.push(item)
    } else {
      result.push(current)
      current = [item]
      dir = isOn
    }
  })

  result.push(current)
  return result
}

module.exports = segmentize
