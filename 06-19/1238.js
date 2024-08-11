//
const fs = require("fs");
let [NMX, ...Ti] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, X] = NMX.split(" ").map(Number);
Ti = Ti.map((e) => e.split(" ").map(Number));

// 단방향 그래프와 반대 방향 그래프 초기화
const graph = Array.from({ length: N + 1 }, () => []);
const reverseGraph = Array.from({ length: N + 1 }, () => []);

Ti.forEach(([start, end, time]) => {
  graph[start].push([end, time]);
  reverseGraph[end].push([start, time]); // 반대 방향 추가
});

function dijkstra(start) {
  const distances = Array(N + 1).fill(Infinity); // 인덱스 0을 사용하지 않으므로 N+1로 설정
  const pq = [[0, start]]; // [비용, 노드]
  let idx = 0;

  distances[start] = 0;

  while (idx < pq.length) {
    const [time, node] = pq[idx++];

    if (distances[node] < time) continue;

    graph[node].forEach(([nextNode, nextTime]) => {
      if (distances[nextNode] > time + nextTime) {
        distances[nextNode] = time + nextTime;
        pq.push([distances[nextNode], nextNode]);
      }
    });
  }

  return distances;
}

// X에서 각 마을로 돌아가는 최소 거리
const distancesFromX = dijkstra(X);

// 각 마을에서 X로 가는 최소 거리
const maxDistance = Array.from({ length: N + 1 }, () => 0);
for (let i = 1; i <= N; i++) {
  const distancesToX = dijkstra(i);
  // 왕복 거리 계산
  maxDistance[i] = distancesToX[X] + distancesFromX[i];
}

console.log(Math.max(...maxDistance.slice(1))); // 최대 왕복 시간 계산
