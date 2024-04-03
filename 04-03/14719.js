// 문제
// 2차원 세계에 블록이 쌓여있다. 비가 오면 블록 사이에 빗물이 고인다.

// 비는 충분히 많이 온다. 고이는 빗물의 총량은 얼마일까?

// 입력
// 첫 번째 줄에는 2차원 세계의 세로 길이 H과 2차원 세계의 가로 길이 W가 주어진다. (1 ≤ H, W ≤ 500)

// 두 번째 줄에는 블록이 쌓인 높이를 의미하는 0이상 H이하의 정수가 2차원 세계의 맨 왼쪽 위치부터 차례대로 W개 주어진다.

// 따라서 블록 내부의 빈 공간이 생길 수 없다. 또 2차원 세계의 바닥은 항상 막혀있다고 가정하여도 좋다.

// 출력
// 2차원 세계에서는 한 칸의 용량은 1이다. 고이는 빗물의 총량을 출력하여라.

// 빗물이 전혀 고이지 않을 경우 0을 출력하여라.

let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [height, width] = input[0].split(" ").map(Number);

let blockHeight = input[1].split(" ").map(Number);

function solution(height, width, blockHeight) {
  let answer = 0;
  for (let w = 0; w < width; w++) {
    // 현재 블록 기준 좌우 최대 높이 블록 찾기
    let leftMax = Math.max(...blockHeight.slice(0, w + 1));
    let rightMax = Math.max(...blockHeight.slice(w));
    // 좌우 최대 높이 블록 중 작은 블록 찾기
    let minBlock = Math.min(leftMax, rightMax);
    answer += minBlock - blockHeight[w];
  }
  console.log(answer);
}

solution(height, width, blockHeight);
