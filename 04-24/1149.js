//
let [N, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");

arr = arr.map((e) => e.split(" ").map(Number));

// 빨강 - 초록 - 파랑

function solution(N, arr) {
  let min = 0;

  arr.forEach((e) => {
    let red = e[0];
    let green = e[1];
    let blue = e[2];
  });
}

solution(+N, arr);
