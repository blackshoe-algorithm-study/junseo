//
let [NM, ...relations] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
let [N, M] = NM.split(" ").map(Number);
relations = relations.map((e) => e.split(" ").map(Number));

function solution(N, M, relations) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const hackableCounts = Array(N + 1).fill(0);

  relations.forEach(([A, B]) => {
    graph[B].push(A);
  });

  const dfs = (node, visited) => {
    visited[node] = true;
    let count = 1;

    for (const next of graph[node]) {
      if (!visited[next]) {
        count += dfs(next, visited);
      }
    }

    return count;
  };

  let maxHackable = 0;

  for (let i = 1; i <= N; i++) {
    const visited = Array(N + 1).fill(false);
    const count = dfs(i, visited);
    hackableCounts[i] = count;
    maxHackable = Math.max(maxHackable, count);
  }

  const result = [];
  for (let i = 1; i <= N; i++) {
    if (hackableCounts[i] === maxHackable) {
      result.push(i);
    }
  }

  console.log(result.join(" "));
}

solution(N, M, relations);
