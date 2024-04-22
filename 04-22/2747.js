//
let n = +require("fs").readFileSync(0).toString().trim();

let arr = new Array(46).fill(null);
arr[0] = 0;
arr[1] = 1;

function solution(n) {
  if (arr[n] === null) {
    arr[n] = solution(n - 1) + solution(n - 2);
  }
  return arr[n];
}

console.log(solution(n));
