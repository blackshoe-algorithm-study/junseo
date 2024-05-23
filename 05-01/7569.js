//
let [MNH, ...boxes] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [M, N, H] = MNH.split(" ").map(Number);
const queue = [];

const offset = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

let visited = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(0))
);
let count = H * N * M;

// 초기 상태 세팅
for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    let box = boxes.shift().split(" ").map(Number);
    for (let m = 0; m < M; m++) {
      if (box[m] === 1) {
        queue.push([h, n, m, 0]);
        visited[h][n][m] = 1;
        count--;
      } else if (box[m] === -1) {
        visited[h][n][m] = 1;
        count--;
      }
    }
  }
}

let answer = 0;
let idx = 0;
while (idx < queue.length) {
  const [z, x, y, day] = queue[idx];
  for (const [dz, dx, dy] of offset) {
    const nz = z + dz;
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nz < 0 || nx >= N || ny >= M || nz >= H) continue;
    if (!visited[nz][nx][ny]) {
      visited[nz][nx][ny] = 1;
      queue.push([nz, nx, ny, day + 1]);
      count--;
    }
  }
  idx++;
  answer = day;
}
console.log(count ? -1 : answer);
