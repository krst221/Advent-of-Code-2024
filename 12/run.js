const fs = require("fs")

function parseInput(input) {
  const lines = input.split(/\r?\n/)
  const grid = new Map()
  lines.forEach((line, i) => {
    [...line].forEach((c, j) => {
      grid.set(`${i},${j}`, c)
    })
  })
  return {
    grid,
    cols: lines.length,
    rows: lines[0].length,
  }
}

const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
const { grid, cols, rows } = parseInput(input)

const seen = new Set()
let p1 = 0, p2 = 0

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

function isInvalid(i, j) {
  return i < 0 || i >= cols || j < 0 || j >= rows
}

function findSides(region) {
  const points = [...region].map((p) => p.split(",").map(Number))
  const is = new Set(points.map(([i, _]) => i))
  const js = new Set(points.map(([_, j]) => j))

  let corners = new Set()
  let double = 0

  const minI = Math.min(...is)
  const maxI = Math.max(...is)
  const minJ = Math.min(...js)
  const maxJ = Math.max(...js)

  for (let i = minI; i <= maxI + 1; i++) {
    for (let j = minJ; j <= maxJ + 1; j++) {
      const index =
        region.has(`${i - 1},${j - 1}`) * 1 +
        region.has(`${i - 1},${j}`) * 2 +
        region.has(`${i},${j - 1}`) * 4 +
        region.has(`${i},${j}`) * 8;

      if (![0, 3, 5, 10, 12, 15].includes(index)) corners.add(`${i},${j}`);
      if ([6, 9].includes(index)) double++;
    }
  }

  return corners.size + double
}

function evaluate(di, dj, grid) {
  const region = new Set()
  let area = 0, perimeter = 0
  const stack = [[di, dj]]
  const letter = grid.get(`${di},${dj}`)

  while (stack.length > 0) {
    const [i, j] = stack.pop()
    if (isInvalid(i, j)) continue

    const key = `${i},${j}`
    if (region.has(key)) continue

    region.add(key)
    area++

    for (const [di, dj] of dirs) {
      const ni = i + di
      const nj = j + dj

      if (isInvalid(ni, nj)) {
        perimeter++
        continue
      }

      const newKey = `${ni},${nj}`

      if (grid.get(newKey) === letter) stack.push([ni, nj])
      else perimeter++
    }
  }
  return [area, perimeter, region]
}

for (const [pos, _] of grid) {
  if (!seen.has(pos)) {
    const [i, j] = pos.split(",").map(Number)
    const [area, perimeter, region] = evaluate(i, j, grid, cols, rows)

    for (const p of region) seen.add(p)
    p1 += area * perimeter
    p2 += area * findSides(region)
  }
}

console.log("Part 1:", p1)
console.log("Part 2:", p2)
