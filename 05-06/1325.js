//
let [NM, ...relations] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = NM.split(" ").map(Number);
relations = relations.map((e) => e.split(" ").map(Number));

function solution(N, M, relations) {
  const graph = Array.from({ length: N + 1 }, () => []);
  relations.forEach(([A, B]) => {
    graph[B].push(A);
  });

  console.log("Graph:", graph);

  let max = 0; // 최대 해킹 컴퓨터 수
  let answer = [];

  const dfs = (n) => {
    let hacked = new Array(N + 1).fill(0);
    let count = 1; // 해킹된 컴퓨터 수
    let stack = [n]; // DFS 탐색 스택

    console.log(`Starting DFS for node ${n}`);
    hacked[n] = 1;
    console.log("Initial hacked array:", hacked);

    while (stack.length) {
      const value = stack.pop();
      console.log(`Popped ${value} from stack`);
      for (let i = 0; i < graph[value].length; i++) {
        if (!hacked[graph[value][i]]) {
          count += 1;
          hacked[graph[value][i]] = 1;
          stack.push(graph[value][i]);
          console.log(`Hacked ${graph[value][i]} and added to stack`);
        }
      }
    }

    console.log(`Total hacked count from node ${n}:`, count);

    if (max < count) {
      max = count;
      answer = [n];
      console.log(`New max found: ${max}, answer updated:`, answer);
    } else if (max === count) {
      answer.push(n);
      console.log(`Max matched: ${max}, answer updated:`, answer);
    }
  };

  for (let i = 1; i <= N; i++) {
    dfs(i);
  }

  console.log(answer.join(" "));
}

solution(N, M, relations);
