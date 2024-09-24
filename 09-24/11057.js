//
const N = +require("fs").readFileSync(0).toString().trim();
const DIVIDER = 10007;

// dp[i][j]: 길이가 i이고, 마지막 자릿수가 j인 오르막 수의 개수
const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

// 길이가 1일 때는 각 숫자 자체가 오르막 수
for (let j = 0; j < 10; j++) {
  dp[1][j] = 1;
}

// 길이가 2 이상일 때의 경우 계산
for (let i = 2; i <= N; i++) {
  for (let j = 0; j < 10; j++) {
    // j보다 작은 숫자를 뒤에 사용할 수 없으므로, 0부터 j까지의 합을 구한다.
    for (let k = 0; k <= j; k++) {
      // 점화식
      dp[i][j] = (dp[i][j] + dp[i - 1][k]) % DIVIDER;
    }
  }
}

// 길이가 N인 오르막 수의 총합 계산
let result = 0;
for (let j = 0; j < 10; j++) {
  result = (result + dp[N][j]) % DIVIDER;
}

console.log(result);
