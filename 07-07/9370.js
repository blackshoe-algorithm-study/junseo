//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
T = +T;

function dijkstra(n, start, graph) {
  const distances = Array.from({ length: n + 1 }, () => Infinity);
  distances[start] = 0;

  const queue = [[0, start]];

  while (queue.length) {
    queue.sort((a, b) => b[0] - a[0]);
    const [dist, node] = queue.pop();

    if (distances[node] < dist) continue;

    for (const [nextNode, nextDist] of graph[node]) {
      const newDist = dist + nextDist;
      if (distances[nextNode] > newDist) {
        distances[nextNode] = newDist;
        queue.push([newDist, nextNode]);
      }
    }
  }

  return distances;
}

for (let i = 0; i < T; i++) {
  const [n, m, t] = input.shift().split(" ").map(Number);
  const [s, g, h] = input.shift().split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  const candidates = [];

  for (let j = 0; j < m; j++) {
    const [a, b, d] = input.shift().split(" ").map(Number);
    graph[a].push([b, d]);
    graph[b].push([a, d]);
  }

  for (let j = 0; j < t; j++) {
    candidates.push(Number(input.shift()));
  }

  const distFromStart = dijkstra(n, s, graph);
  const distFromG = dijkstra(n, g, graph);
  const distFromH = dijkstra(n, h, graph);

  const result = [];

  for (const x of candidates) {
    const throughGtoH = distFromStart[g] + distFromG[h] + distFromH[x];
    const throughHtoG = distFromStart[h] + distFromH[g] + distFromG[x];
    const shortestDist = distFromStart[x];

    if (
      (throughGtoH === shortestDist || throughHtoG === shortestDist) &&
      distFromG[h] !== Infinity &&
      distFromStart[x] !== Infinity
    ) {
      result.push(x);
    }
  }

  result.sort((a, b) => a - b);
  console.log(result.join(" "));
}
