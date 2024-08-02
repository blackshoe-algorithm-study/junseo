//
let [N, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");

const K = +input.shift();
let apples = [];

for (let i = 0; i < K; i++) {
  const [row, col] = input[i].split(" ").map(Number);
  apples.push([row - 1, col - 1]);
}

const L = +input[K];
let directions = [];

for (let j = K + 1; j < K + 1 + L; j++) {
  const [X, C] = input[j].split(" ");
  directions.push([+X, C]);
}

const directionOffsets = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

function solution(N, apples, L, directions) {
  let sec = 0;
  let direction = 0;
  let snake = [[0, 0]];
  let currentDirIdx = 0;

  const board = Array.from({ length: N }, () => Array(N).fill(0));

  apples.forEach(([x, y]) => {
    board[x][y] = 1;
  });

  while (true) {
    sec++;
    const [headX, headY] = snake[snake.length - 1];
    const [dx, dy] = directionOffsets[direction];
    const nextX = headX + dx;
    const nextY = headY + dy;

    if (
      nextX < 0 ||
      nextX >= N ||
      nextY < 0 ||
      nextY >= N ||
      // 뱀의 몸과 충돌 여부 검사 => 하나라도 겹치면 true 반환
      snake.some(([x, y]) => x === nextX && y === nextY)
    ) {
      return sec;
    }

    // 머리 이동
    snake.push([nextX, nextY]);

    if (board[nextX][nextY] === 1) {
      board[nextX][nextY] = 0; // 사과 먹기
    } else {
      snake.shift(); // 꼬리 제거
    }

    // 처리할 방향 정보 남아 있는지 확인 && 현재 시간이 다음 방향 전환 시간과 같은지 확인
    if (currentDirIdx < L && sec === directions[currentDirIdx][0]) {
      direction =
        directions[currentDirIdx][1] === "D"
          ? (direction + 1) % 4 // 오른쪽 => 시계 방향
          : (direction + 3) % 4; // 왼쪽 => 반시계 방향
      currentDirIdx++;
    }
  }
}

console.log(solution(+N, apples, L, directions));
