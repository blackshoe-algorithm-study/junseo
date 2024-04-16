let input = require("fs").readFileSync(0).toString().trim().split("\n");

let [N, K] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

function solution(N, K, arr) {
  let answer = 0;

  console.log(arr);

  console.log(answer);
}

solution(N, K, arr);
