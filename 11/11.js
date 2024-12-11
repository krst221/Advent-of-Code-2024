const input = '5910927 0 1 47 261223 94788 545 7771'

let array = input.split(" ").map(Number)
let iterations = 0

while (iterations < 25) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) {
      newArray.push(1);
      continue;
    }

    const numStr = array[i].toString();
    const digitsLength = numStr.length;

    if (digitsLength % 2 === 0) {
      const midPoint = digitsLength / 2;
      const l = parseInt(numStr.slice(0, midPoint), 10);
      const r = parseInt(numStr.slice(midPoint), 10);
      newArray.push(l, r);
    } else {
      newArray.push(array[i] * 2024);
    }
  }
  array = newArray;
  iterations++;
}

console.log(array.length)