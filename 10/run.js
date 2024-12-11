const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const array = input.split(/\r?\n/).map((line) => line.split("").map(Number));

const rows = array.length;
const cols = array[0].length;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const target = 9;
const trailheads = new Set();
let answer1 = 0,
  answer2 = 0,
  count,
  current,
  stack,
  trailhead,
  dir,
  i,
  j;
let found = new Set();

for (i = 0; i < rows; i++) {
  for (j = 0; j < cols; j++) {
    if (array[i][j] === 0) {
      trailheads.add({ i, j, val: array[i][j] });
    }
  }
}

for (trailhead of trailheads) {
  found = new Set();
  count = 0;
  stack = [trailhead];

  while (stack.length > 0) {
    current = stack.pop();
    if (current.val === target) {
      found.add(current.i * rows + current.j);
      count++;
      continue;
    }

    for (dir of directions) {
      i = current.i + dir[0];
      j = current.j + dir[1];

      if (
        i > -1 &&
        i < rows &&
        j > -1 &&
        j < cols &&
        array[i][j] === current.val + 1
      ) {
        stack.push({ i, j, val: array[i][j] });
      }
    }
  }

  answer1 += found.size;
  answer2 += count;
}

console.log(`Part 1: ${answer1}, Part 2: ${answer2}`);