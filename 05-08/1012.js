//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
let M, N, K, graph;

const offset = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const dfs = (curX, curY) => {
  graph[curX][curY] = 0;

  for (const [dx, dy] of offset) {
    const nx = curX + dx;
    const ny = curY + dy;

    if (nx >= 0 && nx < N && ny >= 0 && ny < M && graph[nx][ny]) {
      dfs(nx, ny);
    }
  }
};

function solution() {
  let answer = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j]) {
        dfs(i, j);
        answer++;
      }
    }
  }
  console.log(answer);
}

for (let i = 0; i < +T; i++) {
  [M, N, K] = input.shift().split(" ").map(Number);

  graph = Array.from(Array(N), () => Array(M).fill(0));

  for (let j = 0; j < K; j++) {
    const [x, y] = input[j].split(" ").map(Number);
    graph[y][x] = 1;
  }
  solution();

  input = input.slice(K);
}
