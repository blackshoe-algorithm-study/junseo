//
let [N, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
N = +N;
arr = arr.map((e) => e.split("").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let houseCount = [];
const visited = Array.from({ length: N }, () => Array(N).fill(false));

function bfs(r, c, count) {
  visited[r][c] = true;
  const queue = [[r, c, count]];
  while (queue.length) {
    const [curX, curY] = queue.shift();
    for (const [dx, dy] of directions) {
      const nx = curX + dx;
      const ny = curY + dy;

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;
      if (arr[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, ++count]);
      }
    }
  }
  houseCount.push(count);
}

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (arr[r][c] && !visited[r][c]) bfs(r, c, 1);
  }
}

console.log(houseCount.length);
houseCount = houseCount.sort((a, b) => a - b);
houseCount.forEach((e) => {
  console.log(e);
});
