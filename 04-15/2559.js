//
let input = require("fs").readFileSync(0).toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

function solution(totalDays, linkedDays, arr) {
  let result = [];

  for (let i = 0; i < totalDays; i++) {
    if (arr[i + linkedDays - 1] === undefined) break;
    let sum = 0;
    for (let j = i; j < i + linkedDays; j++) {
      sum += arr[j];
    }
    result.push(sum);
  }

  console.log(Math.max(...result));
}

solution(N, K, arr);
