// 문제
// N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 자연수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -231 보다 크거나 같고 231보다 작다.

// 출력
// M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.

let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, comp, M, arr] = input;

comp = comp
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
arr = arr.split(" ").map(Number);

function solution(N, comp, M, arr) {
  let answer = "";

  arr.forEach((target) => {
    let left = 0;
    let right = N - 1;
    let result = false;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (target > comp[mid]) {
        left = mid + 1;
      } else if (target < comp[mid]) {
        right = mid - 1;
      } else {
        result = true;
        break;
      }
    }
    if (result === true) {
      answer += 1 + "\n";
    } else {
      answer += 0 + "\n";
    }
  });

  console.log(answer.trim());
}

solution(+N, comp, +M, arr);

// 숏코딩 해답
// let input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");

// let [N, comp, M, arr] = input;

// comp = comp
//   .split(" ")
//   .map(Number)
//   .sort((a, b) => a - b);
// arr = arr.split(" ").map(Number);

// function solution(N, comp, M, arr) {
//   comp = new Set(comp);
//   let answer = arr.map((target) => comp.has(target) ? 1 : 0);
//   console.log(answer.join("\n"));
// }

// solution(+N, comp, +M, arr);
