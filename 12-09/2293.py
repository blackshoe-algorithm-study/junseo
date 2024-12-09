# 

import sys
input = sys.stdin.read
data = input().splitlines()

n, k = map(int, data[0].split())
coins = list(map(int, data[1:]))

dp = [0] * (k + 1)
dp[0] = 1 

for coin in coins:
    for j in range(coin, k + 1):
        dp[j] += dp[j - coin]

print(dp[k])
