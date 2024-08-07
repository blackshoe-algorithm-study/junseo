//
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const board = input.map((row) => row.split(" ").map(Number));

const directions = [
  [0, 1], // 오른쪽
  [1, 0], // 아래
  [1, 1], // 오른쪽 아래 대각선
  [-1, 1], // 오른쪽 위 대각선
];

function checkWin(x, y) {
  let current = board[x][y];

  for (const [dx, dy] of directions) {
    let count = 1;
    let nx = x + dx;
    let ny = y + dy;

    // 현재 방향으로 연속된 돌 세기
    while (
      nx >= 0 &&
      nx < 19 &&
      ny >= 0 &&
      ny < 19 &&
      board[nx][ny] === current
    ) {
      count++;
      nx += dx;
      ny += dy;
    }

    // 반대 방향으로 이전 돌 검사 (6목 이상 방지)
    nx = x - dx;
    ny = y - dy;
    if (nx >= 0 && nx < 19 && ny >= 0 && ny < 19 && board[nx][ny] === current) {
      continue; // 6목 이상이면 스킵
    }

    // 정확히 5목인 경우
    if (count === 5) {
      return `${current}\n${x + 1} ${y + 1}`;
    }
  }
}

function solution() {
  for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 19; j++) {
      if (board[i][j] !== 0) {
        const result = checkWin(i, j);
        if (result) {
          console.log(result);
          return;
        }
      }
    }
  }
  console.log(0); // 승부가 결정되지 않았을 경우
}

solution();
