//
let [N, arr] = require("fs").readFileSync(0).toString().trim().split("\n");
arr = arr.split(" ").map(Number);

let dp = new Array(+N).fill(1);

for (let i = 1; i < N; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i] && max < dp[j]) {
      max = dp[j];
    }
  }
  dp[i] = max + 1;
}

console.log(Math.max(...dp));
