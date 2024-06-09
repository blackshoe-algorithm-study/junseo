//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");

function solution(n, students) {
  let visited = Array(n + 1).fill(false);
  let finished = Array(n + 1).fill(false);
  let teamCount = 0;
  const dfs = (node) => {
    visited[node] = true; // 현재 노드를 방문했다고 표시
    const next = students[node]; // 현재 노드가 가리키는 다음 노드
    if (!visited[next]) {
      // 다음 노드를 아직 방문하지 않았다면
      dfs(next); // 다음 노드에 대해 DFS 수행
    } else if (!finished[next]) {
      // 다음 노드를 이미 방문했지만 DFS가 끝나지 않았다면
      // 사이클이 형성됨을 의미
      let cycleNode = next;
      while (cycleNode !== node) {
        // 사이클의 모든 노드를 카운트
        teamCount++;
        cycleNode = students[cycleNode]; // 다음 노드로 이동
      }
      teamCount++; // 현재 노드도 사이클에 포함되므로 카운트
    }
    finished[node] = true; // 현재 노드에 대한 DFS가 끝났음을 표시
  };

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }
  console.log(n - teamCount);
}

let idx = 0;
for (let i = 0; i < T; i++) {
  let n = +input[idx++];
  let students = [0, ...input[idx++].split(" ").map(Number)];
  solution(n, students);
}
