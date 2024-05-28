//
let [N, ...heights] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
heights = heights.map((e) => e.split(" ").map(Number));

const offset = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function solution(N, heights) {
  let maxSafeArea = 0;

  // 높이에 따라 물에 잠기는 지역을 고려하여 안전 영역의 개수를 구하는 함수
  function getSafeArea(height) {
    const flooded = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => false)
    );
    let safeAreaCount = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!flooded[i][j] && heights[i][j] > height) {
          // 물에 잠기지 않은 지역이라면 DFS 수행
          dfs(i, j, height, flooded);
          safeAreaCount++;
        }
      }
    }
    return safeAreaCount;
  }

  // DFS 함수
  function dfs(x, y, height, flooded) {
    flooded[x][y] = true;
    for (const [dx, dy] of offset) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (!flooded[nx][ny] && heights[nx][ny] > height) {
        dfs(nx, ny, height, flooded);
      }
    }
  }

  // 각 높이에 대해 안전 영역의 개수를 구하고, 최대값을 찾음
  for (let h = 0; h <= 100; h++) {
    const safeAreaCount = getSafeArea(h);
    maxSafeArea = Math.max(maxSafeArea, safeAreaCount);
  }

  console.log(maxSafeArea);
}

solution(N, heights);
