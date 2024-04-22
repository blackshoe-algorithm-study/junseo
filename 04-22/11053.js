//
let [N, arr] = require("fs").readFileSync(0).toString().trim().split("\n");
arr = arr.split(" ").map(Number);

let dp = new Array(+N);
dp[0] = 1;

for (let i = 1; i < N; i++) {
  let max = 0;
  for (let j = 0; j <= i; j++) {
    if (arr[j] < arr[i]) {
      // 10
      // 10 20
      // 10 20 10
      // 10 20 10 30
      max = Math.max(max, dp[j]);
    }
  }
  dp[i] = max + 1;
}

console.log(Math.max(...dp));
