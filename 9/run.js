const input = '2333133121414131402'

let map = ''
let id = -1

for (let i = 0; i < input.length; i++) {
  const char = +input[i]
  if (i % 2 === 0) {
    id++
    map += id.toString().repeat(char)
  } else map += '.'.repeat(char)
}
let dotIdx = map.indexOf('.')
let numIdx = map.slice(dotIdx).search(/[0-9]/d)

while (numIdx !== -1 ) {
  const reversedMap = map.split("").reverse().join("")
  const lastNum = reversedMap.search(/[0-9]/)
  let newMap = map.substring(0, dotIdx) + map[map.length - 1 - lastNum] + map.substring(dotIdx + 1)
  newMap = newMap.substring(0, (map.length - 1 - lastNum)) + '.' + newMap.substring((map.length - lastNum))
  map = newMap
  dotIdx = map.indexOf('.')
  numIdx = map.slice(dotIdx).search(/[0-9]/d)
}