//
let [MN, ...boxes] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const offset = [
  [-1, 0], // 위로 이동
  [1, 0], // 아래로 이동
  [0, 1], // 오른쪽으로 이동
  [0, -1], // 왼쪽으로 이동
];
const [M, N] = MN.split(" ").map(Number);
let queue = [];
let visit = [...Array(N)].map(() => Array(M).fill(0));
let count = M * N;
let answer;

// 초기 상태 세팅
for (let i = 0; i < N; i++) {
  let box = boxes[i].split(" ").map(Number);
  box.forEach((tomato, idx) => {
    if (tomato === 1) {
      queue.push([i, idx, 0]);
      visit[i][idx] = 1;
      count--;
    } else if (tomato === -1) {
      visit[i][idx] = 1;
      count--;
    }
  });
}

let idx = 0;
while (queue.length != idx) {
  const [x, y, day] = queue[idx];

  for (let i = 0; i < 4; i++) {
    const nx = x + offset[i][0];
    const ny = y + offset[i][1];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
    if (!visit[nx][ny]) {
      visit[nx][ny] = 1;
      queue.push([nx, ny, day + 1]);
      count--;
    }
  }
  idx++;
  answer = day;
}
console.log(count ? -1 : answer);
