//
let [nk, ...coins] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [n, k] = nk.split(" ").map(Number);
coins = coins.map(Number);

const dp = Array(k + 1).fill(0);
dp[0] = 1;

for (let i = 0; i < n; i++) {
  for (let j = coins[i]; j <= k; j++) {
    dp[j] += dp[j - coins[i]];
  }
}

console.log(dp[k]);
