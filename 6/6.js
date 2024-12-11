const fs = require("fs")

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]; // up, right, down, left

function run(board, startY, startX) {
  const seen = new Set()
  let dir = 0
  let y = startY
  let x = startX

  while (true) {
    seen.add(`${y},${x}`)
    let [dy, dx] = directions[dir]

    // Check if next position is out of bounds
    if (!inRange(y + dy, board.length) || !inRange(x + dx, board[0].length)) break

    // Turn right while hitting walls
    while (board[y + dy][x + dx] === "#") {
      dir = (dir + 1) % 4;
      [dy, dx] = directions[dir]
    }

    y += dy
    x += dx

    // Check if new position is out of bounds
    if (!inRange(y, board.length) || !inRange(x, board[0].length)) break
  }

  return seen
}

function run2(board, startY, startX) {
  const seen = new Set()
  let dir = 0
  let y = startY
  let x = startX

  while (true) {
    const state = `${y},${x},${dir}`
    if (seen.has(state)) return true; // Found loop
    seen.add(state)

    let [dy, dx] = directions[dir]
    if (!inRange(y + dy, board.length) || !inRange(x + dx, board[0].length)) break

    while (board[y + dy][x + dx] === "#") {
      dir = (dir + 1) % 4;
      [dy, dx] = directions[dir]
    }

    y += dy
    x += dx

    if (!inRange(y, board.length) || !inRange(x, board[0].length)) break
  }

  return false
}

function inRange(val, max) {
  return val >= 0 && val < max
}

function main(input, part2 = false) {
  const board = input
    .trim()
    .split("\n")
    .map((line) => line.split(""))
  let startY, startX

  // Find starting position
  for (let y = 0; y < board.length; y++) {
    const x = board[y].indexOf("^")
    if (x !== -1) {
      startY = y
      startX = x
      break
    }
  }

  const seen = run(board, startY, startX)
  if (!part2) return seen.size

  // Part 2: Try adding walls and count loops
  let result = 0
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] === "." && seen.has(`${y},${x}`)) {
        const before = board[y][x]
        board[y][x] = "#"
        if (run2(board, startY, startX)) result++
        board[y][x] = before
      }
    }
  }

  return result
}

const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
console.log("Part 1:", main(input))
console.log("Part 2:", main(input, true))
