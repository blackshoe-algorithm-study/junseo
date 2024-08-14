//
let [TW, ...trees] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [T, W] = TW.split(" ").map(Number);
trees = trees.map(Number);

// dp[t][w]: 시간 t에서 w번 움직인 후 받을 수 있는 자두의 최대 개수
let dp = Array.from({ length: T + 1 }, () => Array(W + 1).fill(0));

// 초기 위치는 1번 나무 아래, 초기 자두 개수 계산 (움직임 횟수 0일 때)
for (let t = 1; t <= T; t++) {
  dp[t][0] = dp[t - 1][0] + (trees[t - 1] === 1 ? 1 : 0);
}

// DP 계산
for (let w = 1; w <= W; w++) {
  for (let t = 1; t <= T; t++) {
    // 해당 초에 자두가 떨어지는 나무의 번호
    let currentTree = trees[t - 1];

    // 현재 위치와 나무가 같으면 자두를 받을 수 있음
    // 자두가 이동할 때마다 위치가 바뀌므로, 짝수 번 움직였으면 1번 위치, 홀수 번 움직였으면 2번 위치
    let catchIfSame = dp[t - 1][w] + (currentTree === (w % 2) + 1 ? 1 : 0);

    // 이동을 고려한 경우
    let catchIfMoved = dp[t - 1][w - 1] + (currentTree === (w % 2) + 1 ? 1 : 0);
    dp[t][w] = Math.max(catchIfSame, catchIfMoved);
  }
}
console.log(dp);
// 결과 찾기: 최대 자두 수 찾기
let maxPlums = 0;
for (let w = 0; w <= W; w++) {
  // 모든 가능한 움직임 횟수에 대한 최댓값 비교
  maxPlums = Math.max(maxPlums, dp[T][w]);
}

console.log(maxPlums);
