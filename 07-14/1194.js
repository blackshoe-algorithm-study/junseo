//
let [NE, ...mazes] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [R, C] = NE.split(" ").map(Number);
mazes = mazes.map((row) => row.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const queue = [];
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => Array(64).fill(false))
);

for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (mazes[r][c] === "0") {
      queue.push([r, c, 0, 0]); // 초기 위치, 초기 열쇠 상태(0)
      visited[r][c][0] = true;
    }
  }
}

let answer = -1;

while (queue.length) {
  const [curX, curY, dist, keyState] = queue.shift();

  if (mazes[curX][curY] === "1") {
    answer = dist;
    break;
  }

  for (const [dx, dy] of directions) {
    const nx = curX + dx;
    const ny = curY + dy;

    if (nx < 0 || nx >= R || ny < 0 || ny >= C || mazes[nx][ny] === "#") {
      continue;
    }

    let newKeyState = keyState;
    const cell = mazes[nx][ny];

    if (cell >= "a" && cell <= "f") {
      // 열쇠를 발견한 경우, 키 상태를 갱신 | 'a'의 유니코드 = 97 | '000001'
      newKeyState |= 1 << (cell.charCodeAt(0) - 97);
      // (A |= B) === (A = A | B) -> OR 연산자, 두 비트 중 하나라로 1이면 결과 비트가 1이 되도록 함
    }

    if (cell >= "A" && cell <= "F") {
      // 문을 만난 경우, 해당 열쇠가 있는지 확인 | 'A'의 유니코드 = 65
      if (!(keyState & (1 << (cell.charCodeAt(0) - 65)))) continue;
    }

    if (!visited[nx][ny][newKeyState]) {
      visited[nx][ny][newKeyState] = true;
      queue.push([nx, ny, dist + 1, newKeyState]);
    }
  }
}

console.log(answer);
