//
const input = require("fs").readFileSync(0).toString().trim().split("\n");

const n = parseInt(input[0]);
const [p, q] = input[1].split(" ").map(Number);
const m = Number(input[2]);
const graph = [...Array(n + 1)].map((e) => []);

for (let i = 3; i < m + 3; i++) {
  let [parent, child] = input[i].split(" ").map(Number);
  graph[parent].push(child);
  graph[child].push(parent);
}

function solution(graph, startNode, targetNode) {
  const visited = [];
  let queue = [[startNode, 0]];
  while (queue.length) {
    const [node, count] = queue.shift();
    if (node === targetNode) return count;
    if (!visited.includes(node)) {
      visited.push(node);
      let nodes = graph[node].map((e) => [e, count + 1]);
      queue = [...queue, ...nodes];
    }
  }

  return -1;
}

console.log(solution(graph, p, q));
