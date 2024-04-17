//
let input = require("fs").readFileSync(0).toString().trim().split("\n");
let arr = input[1].split(" ").map(Number);
let target = input[3].split(" ").map(Number);

function solution(arr, target) {
  let answer = "";

  arr = new Set(arr);

  target.forEach((e) => {
    arr.has(e) ? (answer += 1 + "\n") : (answer += 0 + "\n");
  });

  console.log(answer.trim());
}

solution(arr, target);
