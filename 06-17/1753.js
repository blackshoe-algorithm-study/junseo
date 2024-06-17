//
let [VE, K, ...numbers] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [V, E] = VE.split(" ").map(Number);
numbers = numbers.map((e) => e.split(" ").map(Number));

const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 0; i < E; i++) {
  const [u, v, w] = numbers[i];
  graph[u].push([v, w]);
}

function dijkstra(start) {
  const distances = Array(V + 1).fill(Infinity);
  distances[start] = 0;

  const queue = [[0, start]];
  while (queue.length) {
    const [currentDistance, currentNode] = queue.shift();
    if (currentDistance > distances[currentNode]) continue;
    for (const [nextNode, weight] of graph) {
      const distance = currentDistance + weight;
      if (distance < distances[nextNode]) {
        distances[nextNode] = distance;
        queue.push([distance, nextNode]);
      }
    }
  }
}

const distances = dijkstra(+K);

for (let i = 1; i <= V; i++) {
  if (distances[i] !== Infinity) console.log(distances[i]);
  else console.log("INF");
}
