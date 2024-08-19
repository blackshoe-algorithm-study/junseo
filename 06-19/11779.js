//
let [n, m, ...buses] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
n = +n;
m = +m;
buses = buses.map((e) => e.split(" ").map(Number));
const [start, end] = buses.pop();

const graph = Array.from({ length: n + 1 }, () => []);
buses.forEach(([start, end, cost]) => {
  graph[start].push([end, cost]);
});

function dijkstra(start) {
  const distances = Array(n + 1).fill(Infinity);
  const cities = Array(n + 1).fill([]);
  cities[start] = [start];
  distances[start] = 0;
  const queue = [[0, start]];

  while (queue.length) {
    const [cost, node] = queue.shift();

    if (distances[node] < cost) continue;

    graph[node].forEach(([nextNode, nextCost]) => {
      if (distances[nextNode] > cost + nextCost) {
        distances[nextNode] = cost + nextCost;
        cities[nextNode] = [...cities[node], nextNode];
        queue.push([distances[nextNode], nextNode]);
      }
    });
  }

  return [distances, cities];
}

const [distances, cities] = dijkstra(start);
console.log(distances[end]);
console.log(cities[end].length);
console.log(...cities[end]);
