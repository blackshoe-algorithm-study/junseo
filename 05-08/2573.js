//
let [NM, ...Eisbergs] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [N, M] = NM.split(" ").map(Number);
Eisbergs = Eisbergs.map((e) => e.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function meltIcebergs(Eisbergs) {
  const melted = Eisbergs.map((row) => row.slice());

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (Eisbergs[x][y] > 0) {
        let seaCount = 0;
        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;
          if (
            nx >= 0 &&
            nx < N &&
            ny >= 0 &&
            ny < M &&
            Eisbergs[nx][ny] === 0
          ) {
            seaCount++;
          }
        }
        melted[x][y] = Math.max(0, Eisbergs[x][y] - seaCount);
      }
    }
  }
  return melted;
}

function countIcebergChunks(Eisbergs) {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let chunkCount = 0;

  const dfs = (x, y) => {
    const stack = [[x, y]];
    while (stack.length) {
      const [curX, curY] = stack.pop();
      for (const [dx, dy] of directions) {
        const nx = curX + dx;
        const ny = curY + dy;
        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < M &&
          !visited[nx][ny] &&
          Eisbergs[nx][ny] > 0
        ) {
          visited[nx][ny] = true;
          stack.push([nx, ny]);
        }
      }
    }
  };

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (Eisbergs[x][y] > 0 && !visited[x][y]) {
        visited[x][y] = true;
        dfs(x, y);
        chunkCount++;
      }
    }
  }
  return chunkCount;
}

function solution(N, M, Eisbergs) {
  let year = 0;
  while (true) {
    const chunks = countIcebergChunks(Eisbergs);
    if (chunks >= 2) {
      console.log(year);
      return;
    }
    if (chunks === 0) {
      console.log(0);
      return;
    }
    Eisbergs = meltIcebergs(Eisbergs);
    year++;
  }
}

solution(N, M, Eisbergs);
