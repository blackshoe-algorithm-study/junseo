//
let [RCT, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [R, C, T] = RCT.split(" ").map(Number);
let Arc = input.map((e) => e.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let airCleaner = [];
// 초기 세팅
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (Arc[r][c] === -1) airCleaner.push([r, c]);
  }
}

const purifyAir = () => {
  const [[topAirX, topAirY], [botAirX, botAirY]] = airCleaner;

  // 위쪽 공기청정기
  for (let r = topAirX - 1; r > 0; r--) Arc[r][0] = Arc[r - 1][0];
  for (let c = 0; c < C - 1; c++) Arc[0][c] = Arc[0][c + 1];
  for (let r = 0; r < topAirX; r++) Arc[r][C - 1] = Arc[r + 1][C - 1];
  for (let c = C - 1; c > 1; c--) Arc[topAirX][c] = Arc[topAirX][c - 1];
  Arc[topAirX][1] = 0;

  // 아래쪽 공기청정기
  for (let r = botAirX + 1; r < R - 1; r++) Arc[r][0] = Arc[r + 1][0];
  for (let c = 0; c < C - 1; c++) Arc[R - 1][c] = Arc[R - 1][c + 1];
  for (let r = R - 1; r > botAirX; r--) Arc[r][C - 1] = Arc[r - 1][C - 1];
  for (let c = C - 1; c > 1; c--) Arc[botAirX][c] = Arc[botAirX][c - 1];
  Arc[botAirX][1] = 0;
};

const spreadDust = () => {
  const newArc = Array.from({ length: R }, () => Array(C).fill(0));
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (Arc[r][c] > 0) {
        let spreadAmount = Math.floor(Arc[r][c] / 5);
        let spreadCount = 0;
        for (let [dx, dy] of directions) {
          const nx = r + dx;
          const ny = c + dy;
          if (nx >= 0 && nx < R && ny >= 0 && ny < C && Arc[nx][ny] !== -1) {
            newArc[nx][ny] += spreadAmount;
            spreadCount++;
          }
        }
        newArc[r][c] += Arc[r][c] - spreadAmount * spreadCount;
      }
    }
  }

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (Arc[r][c] !== -1) Arc[r][c] = newArc[r][c];
    }
  }
};

let time = 0;
while (time < T) {
  spreadDust();
  purifyAir();
  time++;
}

let totalFineDust = 0;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (Arc[r][c] !== -1) totalFineDust += Arc[r][c];
  }
}

console.log(totalFineDust);
