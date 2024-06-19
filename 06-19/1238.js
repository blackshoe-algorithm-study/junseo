//
let [NMX, ...Ti] = require("fs").readFileSync(0).toString().trim().split("\n");

const [N, M, X] = NMX.split(" ").map(Number);
Ti = Ti.map((e) => e.split(" ").map(Number));

// 단방향 리스트 초기화
const graph = Array.from({ length: N + 1 }, () => []);
Ti.forEach(([start, end, time]) => {
  graph[start].push([end, time]);
});

function dijkstra(start) {
  const distances = Array(N).fill(Infinity);
}

const distances = dijkstra(1);
