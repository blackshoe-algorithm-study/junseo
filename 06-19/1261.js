//
let [MN, ...mazes] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [M, N] = MN.split(" ").map(Number);
mazes = mazes.map((e) => e.split("").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function dijkstra([distance, curX, curY]) {
  let visited = Array.from({ length: N }, () => Array(M).fill(false));
  const breaked = Array.from({ length: N }, () => Array(M).fill(Infinity));
  breaked[0][0] = 0;

  const queue = [[distance, curX, curY]];
  while (queue.length) {
    const [distance, curX, curY] = queue.shift();
    for (const [dx, dy] of directions) {
      const nx = curX + dx;
      const ny = curY + dy;

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      // 벽이 있으면 거리 업데이트
      let newDistance = distance;
      if (mazes[nx][ny] === 1) newDistance += 1;

      // 첫 방문
      if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        breaked[nx][ny] = newDistance;
        queue.push([newDistance, nx, ny]);
      }
      // 새로운 루트가 기존 벽 개수보다 적을 때
      else {
        if (newDistance < breaked[nx][ny]) {
          breaked[nx][ny] = newDistance;
          queue.push([newDistance, nx, ny]);
        }
      }
    }
  }
  return breaked;
}

const breaked = dijkstra([0, 0, 0]);
console.log(breaked[N - 1][M - 1]);
