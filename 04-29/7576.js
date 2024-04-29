//
let [count, ...boxes] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

let [M, N] = count.split(" ").map(Number);
boxes = boxes.map((e) => e.split(" ").map(Number));

let ripe = [...Array(N)].map((e) => Array(M).fill(0));
console.log(ripe);
const ds = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solution(M, N, boxes) {
  let queue = [];

  for (let i = 0; i < N; i++) {
    let x = boxes[i].filter((tomato) => tomato === 1);
    if (x !== -1) queue.push([i, x]);
  }

  // 토마토가 모두 익지 못하는 상황
  if (!queue.length) console.log(-1);

  // 토마토가 모두 익어있는 상태
  if (queue.length === N * M) console.log(0);

  while (queue.length) {
    const [curY, curX] = queue.shift();

    // for (let i = 0; i < 4; i++) {}

    // 다음 위치가 상자 밖으로 벗어나지 않고 토마토가 익지 않았으면(0)
    // if (ny >= 0 && ny < N && nx >= 0 && nx < M && boxes[ny][nx] === 0) {
    //   boxes[ny][nx] = 1; // 익음 처리
    // }
  }
}

solution(M, N, boxes);
