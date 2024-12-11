const fs = require("fs")
const [rules, rows] = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(/\r\n/g, "\n")
  .split("\n\n")

// Part 1
function processRules(rules) {
  const ruleMap = new Map()
  const rulesArr = rules.trim().split("\n")

  for (const rule of rulesArr) {
    const [first, second] = rule.split("|")
    if (!ruleMap.has(first)) {
      ruleMap.set(first, new Set())
    }
    ruleMap.get(first).add(second)
  }
  return ruleMap
}

function validateAndSum(rows, ruleMap) {
  const processedRows = rows
    .trim()
    .split("\n")
    .map((row) => row.split(","))

  let sum = 0

  rowLoop: for (const row of processedRows) {
    const indexMap = new Map()
    row.forEach((val, idx) => indexMap.set(val, idx))

    for (const [first, seconds] of ruleMap) {
      const firstIdx = indexMap.get(first)
      if (firstIdx === undefined) continue

      for (const second of seconds) {
        const secondIdx = indexMap.get(second)
        if (secondIdx !== undefined && firstIdx > secondIdx) {
          if (firstIdx > secondIdx) wrongRows.add(processedRows.indexOf(row))
          continue rowLoop
        }
      }
    }
    const midValue = +row[Math.floor(row.length / 2)]
    sum += midValue
  }

  return sum
}

const wrongRows = new Set()

function calculateSum(rules, rows) {
  const ruleMap = processRules(rules)
  return validateAndSum(rows, ruleMap)
}

console.log(calculateSum(rules, rows))

// Part 2
const wrongRowsArr = rows
  .trim()
  .split('\n')
  .map(row => row.split(','))
  .map((row, index) => wrongRows.has(index) ? row : null)
  .filter(Boolean)

  function validateAndSum2(rows, ruleMap) {
    let sum = 0
    
    for (const row of rows) {
        // Create index map once
        const positions = new Map()
        for (let i = 0; i < row.length; i++) {
            positions.set(row[i], i)
        }
        
        // Sort row based on rules
        let swapped
        do {
            swapped = false
            for (const [first, seconds] of ruleMap) {
                const firstPos = positions.get(first)
                if (firstPos === undefined) continue
                
                for (const second of seconds) {
                    const secondPos = positions.get(second)
                    if (secondPos === undefined) continue
                    
                    if (firstPos > secondPos) {
                        // Swap elements and update positions
                        [row[firstPos], row[secondPos]] = [row[secondPos], row[firstPos]]
                        positions.set(first, secondPos)
                        positions.set(second, firstPos)
                        swapped = true
                    }
                }
            }
        } while (swapped)
        
        // Get middle value
        sum += +row[Math.floor(row.length / 2)]
    }
    
    return sum
}

  function calculateSum2(rules, rows) {
    const ruleMap = processRules(rules)
    return validateAndSum2(rows, ruleMap)
  }

console.log(calculateSum2(rules, wrongRowsArr));