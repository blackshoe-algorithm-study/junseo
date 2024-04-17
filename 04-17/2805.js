//
let input = require("fs").readFileSync(0).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let height = input[1].split(" ").map(Number);

function solution(N, M, height) {
  let answer = 0;
  height.sort((a, b) => b - a);
  // height = new Set(height);
  // 나무 높이 평균 찾기
  let mid = height.reduce((a, c) => a + c) / N;

  // 나무 최대, 최소 초기화
  let high = height[0];
  let low = height[N - 1];

  // 자른 나무 높이 총합
  let sum = 0;
  while (sum <= M) {
    for (let i = 0; i < N; i++) {
      if (height[i] > mid) sum += height[i] - mid;
    }
    if (sum > M) {
      // 만약 총합이 목표보다 높으면
      low = mid;
      mid = (high + mid) / 2;
      sum = 0;
    } else if (sum < M) {
      // 만약 총합이 목표보다 낮으면
      high = mid;
      mid = (low + mid) / 2;
      sum = 0;
    } else {
      answer = mid;
      break;
    }
  }
  console.log(answer);
}

solution(N, M, height);
