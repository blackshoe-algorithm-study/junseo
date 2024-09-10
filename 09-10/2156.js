//
const [N, ...wines] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

if (N === 1) {
  console.log(wines[0]);
  return;
}

const dp = Array(N).fill(0);

// 첫 번째 잔 마신 경우
dp[0] = wines[0];

// 두 번째 잔까지 고려
if (N > 1) {
  dp[1] = wines[0] + wines[1];
}

// 세 번째 잔까지 고려
if (N > 2) {
  dp[2] = Math.max(dp[1], wines[0] + wines[2], wines[1] + wines[2]);
}

// 나머지 잔들에 대해 DP 적용
for (let i = 3; i < N; i++) {
  dp[i] = Math.max(
    dp[i - 1], // i번째 포도주를 마시지 않는 경우
    dp[i - 2] + wines[i], // i번째 포도주만 마시는 경우
    dp[i - 3] + wines[i - 1] + wines[i] // i-1번째와 i번째를 모두 마시는 경우
  );
}

// 마지막 잔까지 고려한 최대 포도주 양 출력
console.log(dp[N - 1]);
