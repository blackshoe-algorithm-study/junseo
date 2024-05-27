//
let [N, A, BC] = require("fs").readFileSync(0).toString().split("\n");
A = A.split(" ").map(Number);
const [B, C] = BC.split(" ").map(Number);

function solution(N, A, B, C) {
  let count = 0;
  A.forEach((Ai) => {
    count++;
    Ai -= B;
    if (Ai > 0) count += Math.ceil(Ai / C);
  });
  console.log(count);
}

solution(+N, A, B, C);
