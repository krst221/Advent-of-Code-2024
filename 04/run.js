const fs = require("fs")

const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
const data = input.split(/\r?\n/).map((row) => row.split(""))

const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
]

const checkWord = (row, col, dRow, dCol, grid) => {
  const word = "XMAS"
  for (let i = 1; i < word.length; i++) {
    const nRow = row + i * dRow
    const nCol = col + i * dCol
    if (
      nRow < 0 ||
      nRow >= grid.length ||
      nCol < 0 ||
      nCol >= grid[0].length ||
      grid[nRow][nCol] !== word[i]
    ) {
      return false
    }
  }
  return true
}

const part1 = (grid) => {
  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "X") {
        for (const [dRow, dCol] of directions) if (checkWord(row, col, dRow, dCol, grid)) count++
      }
    }
  }
  return count
}

const part2 = (grid) => {
  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  for (let x = 1; x < rows - 1; x++) {
    const row = grid[x]
    const rowAbove = grid[x - 1]
    const rowBelow = grid[x + 1]

    for (let y = 1; y < cols - 1; y++) {
      if (row[y] !== "A") continue

      const tl = rowAbove[y - 1]
      const tr = rowAbove[y + 1]
      const bl = rowBelow[y - 1]
      const br = rowBelow[y + 1]

      if (
        ((tl === "M" && br === "S") || (tl === "S" && br === "M")) &&
        ((tr === "M" && bl === "S") || (tr === "S" && bl === "M"))
      )
        count++
    }
  }

  return count
}

console.log("Part 1:", part1(data))
console.log("Part 2:", part2(data))
