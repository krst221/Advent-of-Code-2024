const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split(/\r?\n/)
  .map((row) => row.split(""));

function findNodes(input) {
  const rows = input.length;
  const cols = input[0].length;
  const locations = new Map();
  const seen = new Set();
  let nodes = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const char = input[i][j];
      if (char !== ".") {
        locations.set(char, [...(locations.get(char) || []), { i, j }]);
      }
    }
  }

  for (const coords of locations.values()) {
    for (let i = 0; i < coords.length - 1; i++) {
      const coord1 = coords[i];
      for (let j = i + 1; j < coords.length; j++) {
        const coord2 = coords[j];

        const di = coord1.i - coord2.i;
        const dj = coord1.j - coord2.j;

        const points = [
          { i: coord1.i + di, j: coord1.j + dj },
          { i: coord2.i - di, j: coord2.j - dj },
        ];

        for (const point of points) {
          if (
            point.i >= 0 &&
            point.i < rows &&
            point.j >= 0 &&
            point.j < cols
          ) {
            const key = `${point.i},${point.j}`;
            if (!seen.has(key) && input[point.i][point.j] !== "#") {
              nodes++;
              seen.add(key);
              if (input[point.i][point.j] === ".") {
                input[point.i][point.j] = "#";
              }
            }
          }
        }
      }
    }
  }

  return nodes;
}

function isInBounds(i, j, rows, cols) {
  return i >= 0 && i < rows && j >= 0 && j < cols;
}

function collectPoints(startI, startJ, di, dj, rows, cols) {
  const points = [];
  let ci = startI;
  let cj = startJ;

  while (isInBounds(ci, cj, rows, cols)) {
    const nextI = ci + di;
    const nextJ = cj + dj;
    if (isInBounds(nextI, nextJ, rows, cols)) {
      points.push({ i: nextI, j: nextJ });
    }
    ci = nextI;
    cj = nextJ;
  }
  return points;
}

function findNodes2(input) {
  const rows = input.length;
  const cols = input[0].length;
  const locations = new Map();
  const seen = new Set();
  let nodes = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const char = input[i][j];
      if (char !== ".") {
        locations.set(char, [...(locations.get(char) || []), { i, j }]);
      }
    }
  }

  for (const coords of locations.values()) {
    for (let i = 0; i < coords.length - 1; i++) {
      const coord1 = coords[i];
      for (let j = i + 1; j < coords.length; j++) {
        const coord2 = coords[j];

        const di = coord1.i - coord2.i;
        const dj = coord1.j - coord2.j;

        const points = [
          ...collectPoints(coord1.i, coord1.j, di, dj, rows, cols),
          ...collectPoints(coord1.i, coord1.j, -di, -dj, rows, cols),
          ...collectPoints(coord2.i, coord2.j, -di, -dj, rows, cols),
          ...collectPoints(coord2.i, coord2.j, di, dj, rows, cols),
        ];

        for (const point of points) {
          const key = `${point.i},${point.j}`;
          if (!seen.has(key) && input[point.i][point.j] !== "#") {
            nodes++;
            seen.add(key);
            if (input[point.i][point.j] === ".") {
              input[point.i][point.j] = "#";
            }
          }
        }
      }
    }
  }

  return nodes;
}

console.log(findNodes(input))
console.log(findNodes2(input))
