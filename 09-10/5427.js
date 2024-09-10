//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
T = +T;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let answer = "IMPOSSIBLE";

function escape(w, h, map) {
  const fire = Array.from({ length: h }, () => Array(w).fill(false));

  const queue = [];

  // 상근이 위치 찾기
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (map[r][c] === "@") queue.push([r, c]);
      else if (map[r][c] === "*") fire[r][c] = true;
    }
  }

  // 탈출
  let time = 0;
  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = curX + dx;
      const ny = curY + dy;

      if (map[nx][ny] === "#") continue;

      // 지도 밖으로 나갈 경우 탈출 성공
      if (nx < 0 || nx >= h || ny < 0 || ny >= w) {
        answer = time;
        break;
      }

      if (fire[curX][curY]) continue;

      // 불 확산
      fire[nx][ny] = true;

      time++;
      queue.push([nx, ny]);
    }
  }
}

for (let i = 0; i < T; i++) {
  let map = [];
  const [w, h] = input.shift().split(" ").map(Number);
  for (let j = 0; j < h; j++) {
    map.push(input.shift().split(""));
  }
  escape(w, h, map);
}

console.log(answer);
