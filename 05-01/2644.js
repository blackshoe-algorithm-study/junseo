//
const input = require("fs").readFileSync(0).toString().trim().split("\n");

const n = parseInt(input[0]);
const [p, q] = input[1].split(" ").map(Number);
const m = Number(input[2]);
const graph = [...Array(n + 1)].map((e) => []);

for (let i = 3; i < n; i++) {
  let [parent, child] = input[i].split(" ").map(Number);
  graph[parent].push(child);
  graph[child].push(parent);
}

function solution(graph, startNode, targetNode) {
  // 방문 노드 저장할 배열 초기화
  const visited = [];

  // 시작 노드, 해당 노드까지의 거리
  let queue = [[startNode, 0]];

  while (queue.length) {
    const [node, count] = queue.shift();

    // 탐색이 목표 노드 도달 시 거리 반환
    if (node === targetNode) return count;

    // 현재 노드 방문하지 않았다면
    if (!visited.includes(node)) {
      // 해당 노드 방문 표시
      visited.push(node);

      // 현재 노드와 연결 노드 탐색하면서, 해당 노드까지 거리 함께 큐에 추가
      let nodes = graph[node].map((e) => [e, count + 1]);

      // 다음 탐색할 노드들을 큐에 추가
      queue = [...queue, ...nodes];
    }
  }

  // 목표 노드 도달 실패
  return -1;
}

console.log(solution(graph, p, q));
