//
let [NMKX, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [N, M, K, X] = NMKX.split(" ").map(Number);
input = input.map((e) => e.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

input.forEach((e) => {
  graph[e[0]].push(e[1]);
});

function dijkstra(X) {
  const distances = Array(N + 1).fill(Infinity);
  distances[X] = 0;

  const queue = [[0, X]];

  let idx = 0;
  while (idx < queue.length) {
    const [currentDistance, currentNode] = queue[idx];

    if (currentDistance > distances[currentNode]) continue;

    for (const next of graph[currentNode]) {
      const distance = currentDistance + 1;
      if (distance < distances[next]) {
        distances[next] = distance;
        queue.push([distance, next]);
      }
    }
    idx++;
  }
  return distances;
}

const distances = dijkstra(X);

const answer = [];
for (let i = 1; i <= N; i++) {
  if (distances[i] === K) {
    answer.push(i);
  }
}

if (answer.length) {
  answer.sort((a, b) => a - b).forEach((city) => console.log(city));
} else {
  console.log(-1);
}
