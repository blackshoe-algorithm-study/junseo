//
// let [N, values] = require("fs").readFileSync(0).toString().split("\n");

// values = values.split(" ").map(Number);

// function solution(N, values) {
//   let target = [];
//   let min = 2000000000;
//   for (let i = 0; i < N; i++) {
//     for (let j = N - 1; i < j; j--) {
//       if (Math.abs(values[i] + values[j]) < min) {
//         min = Math.abs(values[i] + values[j]);
//         target.push(values[i], values[j]);
//       }
//     }
//   }
//   console.log(target.join(" "));
// }

// solution(+N, values);

let [N, values] = require("fs").readFileSync(0).toString().split("\n");

values = values.split(" ").map(Number);

function solution(N, values) {
  let answer = [];
  let [i, j, min] = [0, N - 1, 2000000000];
  while (i < j) {
    const sum = values[i] + values[j];
    if (Math.abs(sum) < min) {
      min = Math.abs(sum);
      answer = [values[i], values[j]];
    }
    sum < 0 ? i++ : j--;
  }
  console.log(answer.join(" "));
}

solution(+N, values);
