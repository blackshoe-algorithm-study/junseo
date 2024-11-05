//
let [NMK, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M, K] = NMK.split(" ").map(Number);
const board = input.map((line) => line.split(" ").map(Number));

// 교차하는 한 칸 좌표 찾기
function oneCheck(board, N, M) {
  const dx = [1, -1];
  const dy = [1, -1];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 0) continue;
      let checkX = false;
      let checkY = false;
      for (let i = 0; i < 2; i++) {
        const nx = x + dx[i];
        if (nx >= 0 && nx < M && board[y][nx] === 1) checkX = true;
        const ny = y + dy[i];
        if (ny >= 0 && ny < N && board[ny][x] === 1) checkY = true;
      }
      if (checkX && checkY) return `${y + 1} ${x + 1}`;
    }
  }
  return null;
}

let seed = 0;
for (const row of board) {
  for (const cell of row) {
    if (cell === 1) seed += 1;
  }
}

if (2 * K === seed) {
  console.log(0);
  process.exit(0);
}

console.log(2 * K - seed);

if (K === 1) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 1) {
        console.log(`${y + 1} ${x + 1}`);
        process.exit(0);
      }
    }
  }
}

if (2 * K - 1 === seed) {
  const check = oneCheck(board, N, M);
  if (check !== null) {
    console.log(check);
    process.exit(0);
  }
}

let startX = 2001,
  startY = 2001;
let endX = -1,
  endY = -1;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 1) {
      startX = Math.min(x, startX);
      startY = Math.min(y, startY);
      endX = Math.max(x, endX);
      endY = Math.max(y, endY);
    }
  }
}

if (startX === endX) {
  for (let i = 0; i < 2 * K - seed; i++) {
    console.log(`${startY + seed - K + i + 1} ${startX + 1}`);
  }
  process.exit(0);
}
if (startY === endY) {
  for (let i = 0; i < 2 * K - seed; i++) {
    console.log(`${startY + 1} ${startX + seed - K + i + 1}`);
  }
  process.exit(0);
}
