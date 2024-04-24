//
const X = +require("fs").readFileSync(0).toString();

// 1 연산 최솟값 = 0
function dp(X, memo = [0, 0]) {
  let i = 2;
  while (i <= X) {
    // -1 연산 시 이전 값보다 연산 1회 추가
    memo[i] = memo[i - 1] + 1;
    if (i % 3 === 0) {
      // -1 연산과 %3 연산 시 횟수 비교
      memo[i] = Math.min(memo[i], memo[i / 3] + 1);
    }
    if (i % 2 === 0) {
      // -1 연산과 %2 연산 시 횟수 비교
      memo[i] = Math.min(memo[i], memo[i / 2] + 1);
    }
    i++;
  }
  return memo[X];
}

console.log(dp(X));
