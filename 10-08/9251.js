//
const [str1, str2] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const len1 = str1.length;
const len2 = str2.length;

// DP 테이블 생성 (문자열 길이에 맞춰 2차원 배열)
const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

for (let i = 1; i <= len1; i++) {
  for (let j = 1; j <= len2; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      // 문자가 같으면, 이전 값에서 +1
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      // 문자가 다르면, 왼쪽 또는 위쪽 값 중 큰 값을 취함
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[len1][len2]);
