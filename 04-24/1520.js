//
let [MN, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
let [M, N] = MN.split(" ").map(Number);

arr = arr.map((e) => e.split(" ").map(Number));

const offset = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const dp = [...Array(M)].map(() => Array(N).fill(-1));

dp[M - 1][N - 1] = 1;

const dfs = (x, y) => {
  console.log(`dfs called with x: ${x}, y: ${y}`);

  if (dp[x][y] !== -1) {
    console.log(`Returning memoized result for dp[${x}][${y}]:`, dp[x][y]);
    return dp[x][y];
  }

  let count = 0;
  console.log(`Initial count for dp[${x}][${y}]: ${count}`);

  for (let i = 0; i < 4; i++) {
    const nx = x + offset[i][0];
    const ny = y + offset[i][1];
    if (nx >= 0 && nx < M && ny >= 0 && ny < N && arr[nx][ny] < arr[x][y]) {
      console.log(`Moving from (${x}, ${y}) to (${nx}, ${ny})`);
      count += dfs(nx, ny);
      console.log(
        `Updated count for dp[${x}][${y}] after moving to (${nx}, ${ny}): ${count}`
      );
    }
  }

  dp[x][y] = count;
  console.log(`Setting dp[${x}][${y}] to ${count}`);
  return count;
};

// 출발 지점 (0, 0)에서 시작하여 도착 지점 (M-1, N-1)까지의 경로 수를 계산합니다.
console.log(dfs(0, 0));
console.log("Final dp table:", dp);

// Final dp table: [
//   [3, 2, 1, 1, 1],
//   [0, 1, 0, 1, 0],
//   [0, 1, 1, 1, 0],
//   [1, 1, 1, 1, 1]
// ]
