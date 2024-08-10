//
let [N, M, ...buses] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
N = +N;
buses = buses.map((e) => e.split(" ").map(Number));
const [start, end] = buses.pop();

const graph = Array.from({ length: N + 1 }, () => []);
buses.forEach(([u, v, w]) => {
  graph[u].push([v, w]);
});

const dist = Array(N + 1).fill(Infinity);
dist[start] = 0;

const pq = [[0, start]];

let idx = 0;
while (idx < pq.length) {
  const [cost, node] = pq[idx++];

  if (dist[node] < cost) continue;

  for (const [nextNode, nextCost] of graph[node]) {
    if (dist[nextNode] > cost + nextCost) {
      dist[nextNode] = cost + nextCost;
      pq.push([dist[nextNode], nextNode]);
    }
  }
}

console.log(dist[end]);
