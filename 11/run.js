function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = args.join(",");
    if (!cache.has(key)) cache.set(key, fn(...args));
    console.log(cache)
    return cache.get(key);
  };
}

const count = memoize((x, d = 6) => {
  if (d === 0) return 1;
  if (x === 0) return count(1, d - 1);

  const l = Math.floor(Math.log10(x)) + 1;
  if (l % 2 === 1) return count(x * 2024, d - 1);

  const power = Math.pow(10, Math.floor(l / 2));
  return count(Math.floor(x / power), d - 1) + count(x % power, d - 1);
});

const input = "125 17";
const result = input
  .split(" ")
  .map(Number)
  .map((x) => count(x))
  .reduce((a, b) => a + b, 0);

console.log(result);
