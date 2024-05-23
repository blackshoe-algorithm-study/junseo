//
let [NM, ...maps] = require("fs").readFileSync(0).toString().trim().split("\n");
let [N, M] = NM.split(" ").map(Number);
maps = maps.map((e) => e.split("").map(Number));

const offset = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [0, 0])
);

function solution(N, M, maps) {
  let answer = -1;
  let idx = 0;
  const queue = [[0, 0, 1, 1]];
  while (idx < queue.length) {
    let [curX, curY, distance, chance] = queue[idx];
    if (curX === N - 1 && curY === M - 1) {
      answer = distance;
      break;
    }
    for (const [dx, dy] of offset) {
      const nx = curX + dx;
      const ny = curY + dy;
      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        // 벽을 부수지 않고 이동하는 경우
        if (maps[nx][ny] === 0 && !visited[nx][ny][chance]) {
          visited[nx][ny][chance] = 1;
          queue.push([nx, ny, distance + 1, chance]);
        }
        // 벽을 부수고 이동하는 경우
        if (maps[nx][ny] === 1 && chance && !visited[nx][ny][0]) {
          visited[nx][ny][0] = 1;
          queue.push([nx, ny, distance + 1, 0]);
        }
      }
    }
    idx++;
  }
  console.log(answer);
}

solution(N, M, maps);
