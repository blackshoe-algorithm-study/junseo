//
let [N, M, ...computers] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
computers = computers.map((e) => e.split(" ").map(Number));

const network = Array.from({ length: +N + 1 }, () => []);

// DFS
function solution(N, pair, computers) {
  let answer = 0;
  for (let i = 0; i < pair; i++) {
    const [parent, child] = computers[i];
    network[parent].push(child);
    network[child].push(parent);
  }
  const visited = Array(N + 1).fill(false);
  function dfs(node) {
    visited[node] = true;
    for (const neighbor of network[node]) {
      if (!visited[neighbor]) {
        answer++;
        dfs(neighbor);
      }
    }
  }
  dfs(1);
  console.log(answer);
}

// BFS
// function solution(N, pair, computers) {
//   let answer = 0;
//   for (let i = 0; i < pair; i++) {
//     const [parent, child] = computers[i];
//     network[parent].push(child);
//     network[child].push(parent);
//   }
//   const visited = Array(N + 1).fill(false);
//   visited[1] = true;
//   const queue = [[1]];
//   let idx = 0;
//   while (idx < queue.length) {
//     const node = queue[idx];
//     for (const neighbor of network[node]) {
//       if (!visited[neighbor]) {
//         visited[neighbor] = true;
//         queue.push([neighbor]);
//         answer++;
//       }
//     }
//     idx++;
//   }
//   console.log(answer);
// }

solution(+N, +M, computers);
