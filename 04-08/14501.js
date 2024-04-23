//
let [N, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");

arr = arr.map((e) => e.split(" ").map(Number));

function solution(N, arr) {
  let dp = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    // 1일부터 7일까지

    const [period, profit] = arr[i];

    if (i + period > N) continue;
    // 현재 날짜 + 기간이 N 초과 시 넘김

    dp[i] = dp[i] + profit;
    // 금액 누산

    for (let j = i + period; j < N; j++) {
      // 1일차 다음 4일차부터 7일까지 순회
      dp[j] = Math.max(dp[j], dp[i]);
    }
  }
  return Math.max(...dp);
}

console.log(solution(+N, arr));
