//
let input = require("fs").readFileSync(0).toString().trim().split("\n");

const ds = [
  [-1, 0], // 위로 이동
  [1, 0], // 아래로 이동
  [0, 1], // 오른쪽으로 이동
  [0, -1], // 왼쪽으로 이동
];
const [M, N] = input[0].split(" ").map(Number);
let queue = [];
let visit = [...Array(N)].map((e) => Array(M).fill(0));
let count = M * N;
let answer;

// 초기 상태 세팅
for (let i = 1; i < input.length; i++) {
  let box = input[i].split(" ").map(Number);
  box.forEach((tomato, idx) => {
    if (tomato === 1) {
      // 익은 토마토의 위치와 날짜(0) 큐에 추가하고, 방문 여부 표시
      queue.push([i - 1, idx, 0]);
      visit[i - 1][idx] = 1;

      // 미익은 토마토 개수를 줄입니다.
      count--;
    } else if (tomato === -1) {
      // 토마토가 들어있지 않은 칸의 경우 방문 여부 표시
      visit[i - 1][idx] = 1;
      // 미익은 토마토 개수를 줄입니다.
      count--;
    }
  });
}

let idx = 0;
while (queue.length != idx) {
  const [x, y, day] = queue[idx];
  for (let i = 0; i < 4; i++) {
    const xPos = x + ds[i][0];
    const yPos = y + ds[i][1];
    if (xPos < 0 || yPos < 0 || xPos >= N || yPos >= M) continue;
    if (!visit[xPos][yPos]) {
      visit[xPos][yPos] = 1;
      queue.push([xPos, yPos, day + 1]);
      count--;
    }
  }

  idx++;
  answer = day;
}

console.log(count ? -1 : answer);
