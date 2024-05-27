//
let [N, arr, M] = require("fs").readFileSync(0).toString().split("\n");
arr = arr
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution(N, arr, M) {
  let low = 1;
  let high = arr[N - 1];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2); // 현재 상한액
    const sum = arr.reduce((a, c) => a + (c <= mid ? c : mid));
    if (sum <= M) low = mid + 1;
    else high = mid - 1;
  }
  console.log(high);
}

solution(+N, arr, +M);
