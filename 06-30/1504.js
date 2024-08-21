//
let [NE, ...abc] = require("fs").readFileSync(0).toString().trim().split("\n");
const [N, E] = NE.split(" ").map(Number);
const integers = abc.map((e) => e.split(" ").map(Number));
const [v1, v2] = integers.pop();

const graph = Array.from({ length: N + 1 }, () => []);
integers.forEach(([a, b, c]) => {
  graph[a].push([b, c]);
  graph[b].push([a, c]);
});

function dijkstra(start) {
  const distances = Array(N + 1).fill(Infinity);
  distances[start] = 0;

  const queue = [[0, start]];

  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [dist, node] = queue.shift();

    if (distances[node] < dist) continue;

    for (const [nextNode, nextDist] of graph[node]) {
      const newDist = dist + nextDist;

      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        queue.push([newDist, nextNode]);
      }
    }
  }

  return distances;
}

const distancesFromStart = dijkstra(1);
const distancesFromV1 = dijkstra(v1);
const distancesFromV2 = dijkstra(v2);

const route1 =
  distancesFromStart[v1] + distancesFromV1[v2] + distancesFromV2[N];
const route2 =
  distancesFromStart[v2] + distancesFromV2[v1] + distancesFromV1[N];

const answer = Math.min(route1, route2);

console.log(answer === Infinity ? -1 : answer);
