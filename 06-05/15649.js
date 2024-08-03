//
const [N, M] = require("fs").readFileSync(0).toString().split(" ").map(Number);

const result = [];
const visited = Array(N + 1).fill(false);

function backtrack(depth) {
  if (depth === M) {
    console.log(result.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      result.push(i);
      backtrack(depth + 1);
      result.pop(); // backtrack
      visited[i] = false; // reset visited status
    }
  }
}

backtrack(0);
