//
let [N, solutions] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
N = +N;
solutions = solutions
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let closestSum = Infinity;
let answer = [];

for (let i = 0; i < N - 2; i++) {
  let start = i + 1;
  let end = N - 1;

  while (start < end) {
    let sum = solutions[i] + solutions[start] + solutions[end];

    if (Math.abs(sum) < Math.abs(closestSum)) {
      closestSum = sum;
      answer = [solutions[i], solutions[start], solutions[end]];
    }

    if (sum < 0) {
      start++;
    } else {
      end--;
    }
  }
}

console.log(answer.join(" "));
