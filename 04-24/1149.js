//
let [N, ...costs] = require("fs").readFileSync(0).toString().trim().split("\n");

costs = costs.map((e) => e.split(" ").map(Number));

function solution(N, costs) {
  for (let i = 1; i < N; i++) {
    costs[i][0] += Math.min(costs[i - 1][1], costs[i - 1][2]);
    costs[i][1] += Math.min(costs[i - 1][0], costs[i - 1][2]);
    costs[i][2] += Math.min(costs[i - 1][0], costs[i - 1][1]);
  }
  console.log(Math.min(...costs[N - 1]));
}

solution(+N, costs);
