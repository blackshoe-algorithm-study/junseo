//
let [N, numbers, M, ...SE] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
N = +N;
numbers = numbers.split(" ").map(Number);
M = +M;
SE = SE.map((e) => e.split(" ").map(Number));

// dp 테이블 초기화
let dp = Array.from({ length: N }, () => Array(N).fill(false));

// 길이가 1인 부분 배열은 항상 팰린드롬
for (let i = 0; i < N; i++) {
  dp[i][i] = true;
}

// 길이가 2인 부분 배열 처리
for (let i = 0; i < N - 1; i++) {
  if (numbers[i] === numbers[i + 1]) {
    dp[i][i + 1] = true;
  }
}

// 길이가 3 이상인 부분 배열 처리
for (let length = 3; length <= N; length++) {
  for (let i = 0; i <= N - length; i++) {
    let j = i + length - 1;
    if (numbers[i] === numbers[j] && dp[i + 1][j - 1]) {
      dp[i][j] = true;
    }
  }
}

// 각 질문에 대해 결과 출력
let result = [];
SE.forEach(([S, E]) => {
  result.push(dp[S - 1][E - 1] ? 1 : 0);
});

console.log(result.join("\n"));
