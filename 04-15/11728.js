let input = require("fs").readFileSync(0).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let A = input[1].split(" ").map(Number);
let B = input[2].split(" ").map(Number);

function solution(N, M, A, B) {
  let answer = A.concat(B);

  answer.sort((a, b) => a - b);

  console.log(answer.join(" "));
}

solution(N, M, A, B);
