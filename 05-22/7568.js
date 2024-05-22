//
let [N, ...peoples] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

peoples = peoples.map((e) => e.split(" ").map(Number));

function solution(N, peoples) {
  let answer = [];
  for (let i = 0; i < N; i++) {
    let rank = 1;
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      if (peoples[i][0] < peoples[j][0] && peoples[i][1] < peoples[j][1]) {
        rank++;
      }
    }
    answer.push(rank);
  }
  console.log(answer.join(" "));
}

solution(+N, peoples);
