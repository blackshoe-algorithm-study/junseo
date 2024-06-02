//
let [N, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
arr = arr.map((e) => e.split(""));

const offset = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);

function solution(N, arr) {
  const dfs = (curX, curY) => {
    visited[curX][curY] = true;
    for (const [dx, dy] of offset) {
      const nx = curX + dx;
      const ny = curY + dy;

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;
      if (arr[curX][curY] === arr[nx][ny]) dfs(nx, ny);
    }
  };

  // const bfs = (curX, curY) => {
  //   const queue = [[curX, curY]];
  //   while (queue.length) {
  //     const [curX, curY] = queue.shift();
  //     for (const [dx, dy] of offset) {
  //       const nx = curX + dx;
  //       const ny = curY + dy;
  //       if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;
  //       if (arr[curX][curY] === arr[nx][ny]) {
  //         visited[nx][ny] = true;
  //         queue.push([nx, ny]);
  //       }
  //     }
  //   }
  // };

  // 적록색약 아닌 경우
  let rgb = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        dfs(i, j);
        rgb++;
      }
    }
  }

  // visited 배열 초기화
  visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );

  // 해당 값이 적색인 경우 녹색으로 바꿔줌 (적록 구분 못하므로 녹색으로 통일)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] == "R") arr[i][j] = "G";
    }
  }

  // 적록색약인 경우
  let gb = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        dfs(i, j);
        gb++;
      }
    }
  }

  console.log(rgb, gb);
}

solution(+N, arr);
