//
const N = +require("fs").readFileSync(0).toString();

const MOD = 1000000000;

const dp = Array.from({ length: N + 1 }, () => new Array(10).fill(0));
dp[1] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
dp[2] = [1, 1, 2, 2, 2, 2, 2, 2, 2, 1];

for (let i = 3; i <= N; i++) {
  for (let j = 0; j < 10; j++) {
    if (j === 0) {
      // 0으로 끝날 때
      dp[i][j] = dp[i - 1][j + 1] % MOD;
    } else if (j === 9) {
      // 9로 끝날 때
      dp[i][j] = dp[i - 1][j - 1] % MOD;
    } else {
      // 1~8로 끝날 때
      dp[i][j] = dp[i - 1][j - 1] + (dp[i - 1][j + 1] % MOD);
    }
  }
}
console.log(dp[N].reduce((a, c) => a + c) % MOD);
