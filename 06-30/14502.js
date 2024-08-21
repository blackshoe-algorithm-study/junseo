//
let [NM, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [R, C] = NM.split(" ").map(Number);
const originalMap = input.map((e) => e.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
let maxSafeArea = 0;

function spreadVirus(map) {
  const virusedMap = JSON.parse(JSON.stringify(map));
  const queue = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (virusedMap[r][c] === 2) queue.push([r, c]);
    }
  }

  while (queue.length) {
    const [curX, curY] = queue.shift();
    for ([dx, dy] of directions) {
      const nx = curX + dx,
        ny = curY + dy;
      if (nx >= 0 && nx < R && ny >= 0 && ny < C && virusedMap[nx][ny] === 0) {
        virusedMap[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  return virusedMap.reduce(
    (acc, row) => acc + row.filter((cell) => cell === 0).length,
    0
  );
}

function setWalls(count, map) {
  if (count === 3) {
    maxSafeArea = Math.max(maxSafeArea, spreadVirus(map));
    return;
  }

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (map[r][c] === 0) {
        map[r][c] = 1;
        setWalls(count + 1, map);
        map[r][c] = 0;
      }
    }
  }
}

setWalls(0, originalMap);
console.log(maxSafeArea);
