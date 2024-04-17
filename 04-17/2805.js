//
let input = require("fs").readFileSync(0).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let heights = input[1].split(" ").map(Number);

function solution(N, M, heights) {
  let start = 1;
  let end = Math.max(...heights);
  let result = 0;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = 0;

    for (let height of heights) {
      if (height > mid) {
        sum += height - mid;
      }
    }

    if (sum >= M) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  console.log(result);
}

solution(N, M, heights);
