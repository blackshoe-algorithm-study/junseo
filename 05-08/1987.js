//
let [RC, ...alphabets] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [R, C] = RC.split(" ").map(Number);
alphabets = alphabets.map((row) => row.split(""));
alphabets = alphabets.map((row) => row.map((a) => a.charCodeAt(0) - 65));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function solution(R, C, alphabets) {
  const visited = Array(26).fill(false);

  const dfs = (x, y, count) => {
    let maxCount = count;
    visited[alphabets[x][y]] = true;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < R && ny >= 0 && ny < C && !visited[alphabets[nx][ny]])
        maxCount = Math.max(maxCount, dfs(nx, ny, count + 1));
    }

    visited[alphabets[x][y]] = false;
    return maxCount;
  };

  console.log(dfs(0, 0, 1));
}

solution(R, C, alphabets);
