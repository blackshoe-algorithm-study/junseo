//
let [A, B, C, M] = require("fs")
  .readFileSync(0)
  .toString()
  .split(" ")
  .map(Number);

function solution(A, B, C, M) {
  let maxWork = 0;
  let fatigue = 0;
  let hour = 0;

  while (hour < 24) {
    if (fatigue + A <= M) {
      fatigue += A;
      maxWork += B;
    } else {
      fatigue -= C;
      if (fatigue < 0) fatigue = 0;
    }
    hour++;
  }
  console.log(maxWork);
}

solution(A, B, C, M);
