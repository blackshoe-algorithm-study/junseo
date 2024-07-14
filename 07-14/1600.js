//
let [K, WH, ...nums] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [W, H] = WH.split(" ").map(Number);
nums = nums.map((e) => e.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const horseDir = [
  [2, 1],
  [2, -1],
  [1, 2],
  [1, -2],
  [-2, 1],
  [-2, -1],
  [-1, 2],
  [-1, -2],
];

function solution(K) {
  let answer = -1;
  const isVisited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(K + 1).fill(false))
  );
  isVisited[0][0][K] = true;
  const queue = [[0, 0, K, 0]]; // [x, y, remaining horse moves, move count]

  while (queue.length) {
    const [curX, curY, remainingK, moveCount] = queue.shift();

    if (curX === H - 1 && curY === W - 1) {
      answer = moveCount;
      break;
    }

    // Normal moves
    for (const [dx, dy] of directions) {
      const nx = curX + dx;
      const ny = curY + dy;
      if (
        nx >= 0 &&
        nx < H &&
        ny >= 0 &&
        ny < W &&
        !isVisited[nx][ny][remainingK] &&
        nums[nx][ny] === 0
      ) {
        isVisited[nx][ny][remainingK] = true;
        queue.push([nx, ny, remainingK, moveCount + 1]);
      }
    }

    // Horse moves
    if (remainingK > 0) {
      for (const [d2x, d2y] of horseDir) {
        const nx = curX + d2x;
        const ny = curY + d2y;
        if (
          nx >= 0 &&
          nx < H &&
          ny >= 0 &&
          ny < W &&
          !isVisited[nx][ny][remainingK - 1] &&
          nums[nx][ny] === 0
        ) {
          isVisited[nx][ny][remainingK - 1] = true;
          queue.push([nx, ny, remainingK - 1, moveCount + 1]);
        }
      }
    }
  }

  console.log(answer);
}

solution(+K);
