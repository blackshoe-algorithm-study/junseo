//
let [N, M, nums] = require("fs").readFileSync(0).toString().split("\n");

nums = nums.split(" ").map(Number);
nums.sort((a, b) => a - b);

function solution(N, M) {
  let start = 0;
  let end = nums.length - 1;
  let answer = 0;

  while (start < end) {
    let sum = nums[start] + nums[end];
    if (sum === M) {
      answer++;
      start++;
    } else if (sum < M) start++;
    else end--;
  }

  console.log(answer);
}

solution(+N, +M);
