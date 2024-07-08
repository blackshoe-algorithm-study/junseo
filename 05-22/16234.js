//

let [NLR, ...A] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, L, R] = NLR.split(" ").map(Number);
A = A.map((e) => e.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (startX, startY, isVisited) => {
  const queue = [[startX, startY]];
  const united = [[startX, startY]];
  let totalPopulation = A[startX][startY];
  isVisited[startX][startY] = true;

  while (queue.length) {
    const [curX, curY] = queue.shift();
    for (const [dx, dy] of directions) {
      const nx = curX + dx;
      const ny = curY + dy;
      if (nx >= 0 && nx < N && ny >= 0 && ny < N && !isVisited[nx][ny]) {
        const diff = Math.abs(A[nx][ny] - A[curX][curY]);
        if (diff >= L && diff <= R) {
          isVisited[nx][ny] = true;
          queue.push([nx, ny]);
          united.push([nx, ny]);
          totalPopulation += A[nx][ny];
        }
      }
    }
  }

  const newPopulation = Math.floor(totalPopulation / united.length);
  for (const [x, y] of united) {
    A[x][y] = newPopulation;
  }

  return united.length > 1; // 연합이 형성되었는지 여부 반환
};

function solution() {
  let days = 0;

  while (true) {
    let isMoved = false;
    let isVisited = Array.from({ length: N }, () => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!isVisited[i][j]) {
          if (bfs(i, j, isVisited)) {
            isMoved = true;
          }
        }
      }
    }
    if (!isMoved) break;
    days++;
  }
  console.log(days);
}

solution();
