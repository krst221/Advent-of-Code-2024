const fs = require("fs")
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")

function calculateChecksum1() {
  const map = []

  for (let i = 0; i < input.length; i += 2) {
    const num = +input[i]
    if (isNaN(num)) continue
    const dots = i + 1 < input.length ? +input[i + 1] : 0
    map.push(...Array(num).fill(i >> 1), ...Array(dots).fill("."))
  }

  let dotIdx = map.indexOf(".")
  while (dotIdx !== -1) {
    let numIdx = map.findIndex((val, idx) => idx > dotIdx && val !== ".")
    if (numIdx === -1) break

    let lastNumIdx = map.length - 1
    while (lastNumIdx >= 0 && map[lastNumIdx] === ".") lastNumIdx--

    if (lastNumIdx <= dotIdx) break

    [map[dotIdx], map[lastNumIdx]] = [map[lastNumIdx], map[dotIdx]]
    dotIdx = map.indexOf(".", dotIdx + 1)
  }

  let checksum = 0
  for (let i = 0; i < map.length && map[i] !== "."; i++) checksum += i * map[i]

  return checksum
}

function calculateChecksum2() {
  const map = []
  for (let i = 0; i < input.length; i += 2) {
    const num = +input[i]
    if (isNaN(num)) continue
    const dots = i + 1 < input.length ? +input[i + 1] : 0
    map.push(...Array(num).fill(i >> 1), ...Array(dots).fill("."))
  }

  let pos = map.length - 1

  while (pos >= 0) {
    while (pos >= 0 && map[pos] === ".") pos--
    if (pos < 0) break

    const val = map[pos]
    const blockEnd = pos
    while (pos > 0 && map[pos - 1] === val) pos--
    const blockStart = pos
    const blockSize = blockEnd - blockStart + 1

    let targetPos = -1
    let dotCount = 0
    for (let i = 0; i < blockStart; i++) {
      if (map[i] === ".") {
        if (++dotCount === blockSize) {
          targetPos = i - blockSize + 1
          break
        }
      } else {
        dotCount = 0
      }
    }

    if (targetPos >= 0) {
      map.copyWithin(targetPos, blockStart, blockEnd + 1)
      map.fill(".", blockStart, blockEnd + 1)
    }

    pos = blockStart - 1
  }

  let checksum = 0
  for (let i = 0; i < map.length; i++) {
    if (map[i] !== ".") checksum += i * map[i]
  }
  
  return checksum
}

console.log("Part 1:", calculateChecksum1(input))
console.log("Part 2:", calculateChecksum2(input))
