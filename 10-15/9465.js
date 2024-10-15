//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");

const result = [];
let idx = 0;

for (let i = 0; i < T; i++) {
  const n = +input[idx++];
  const arr = Array.from({ length: 2 }, () => []);
  arr[0] = input[idx++].split(" ").map(Number);
  arr[1] = input[idx++].split(" ").map(Number);

  const dp = Array.from({ length: 2 }, () => Array(n).fill(0));

  // 첫 번째 열 초기값
  dp[0][0] = arr[0][0];
  dp[1][0] = arr[1][0];

  if (n > 1) {
    // 두 번째 열까지 초기값
    dp[0][1] = arr[0][1] + dp[1][0];
    dp[1][1] = arr[1][1] + dp[0][0];

    // 나머지 열에 대해 dp 계산
    for (let j = 2; j < n; j++) {
      dp[0][j] = arr[0][j] + Math.max(dp[1][j - 1], dp[1][j - 2]);
      dp[1][j] = arr[1][j] + Math.max(dp[0][j - 1], dp[0][j - 2]);
    }
  }

  // 마지막 열 두 줄 중 최대값 계산
  result.push(Math.max(dp[0][n - 1], dp[1][n - 1]));
}

console.log(result.join("\n"));
