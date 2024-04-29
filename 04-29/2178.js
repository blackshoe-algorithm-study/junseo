//
let [count, ...maze] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
let [N, M] = count.split(" ").map(Number);
maze = maze.map((e) => e.split("").map(Number));

const [goalY, goalX] = [N - 1, M - 1];
const ds = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
]; // 인접(좌우상하)한 칸들

function solution(N, M, maze) {
  let queue = [[0, 0, 1]]; // 좌표 및 움직인 칸 수

  while (queue.length) {
    const [curY, curX, move] = queue.shift();
    // 현재 위치가 도착 지점에 도달하면 움직인 칸 수 반환
    if (goalY === curY && goalX === curX) console.log(move);

    // 다음 이동할 인접 위치 탐색을 위한 반복문
    for (let i = 0; i < 4; i++) {
      const ny = curY + ds[i][1];
      const nx = curX + ds[i][0];

      // 다음 위치가 미로 밖으로 벗어나지 않고 길이 있는 곳(1)이면
      if (ny >= 0 && ny < N && nx >= 0 && nx < M && maze[ny][nx]) {
        maze[ny][nx] = 0; // 방문 처리
        queue.push([ny, nx, move + 1]); // 다음 위치넣고 한 칸 이동
      }
    }
  }
}

solution(N, M, maze);
