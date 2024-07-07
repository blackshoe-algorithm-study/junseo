//
let [N, S] = require("fs").readFileSync(0).toString().split("\n");
S = S.split(" ").map(Number);

let sums = new Set();

function findSums(idx, currentSum) {
  if (idx === +N) {
    sums.add(currentSum);
    return;
  }
  // 현재 원소를 포함하지 않는 경우
  findSums(idx + 1, currentSum);
  // 현재 원소를 포함하는 경우
  findSums(idx + 1, currentSum + S[idx]);
}

findSums(0, 0);

for (let i = 1; ; i++) {
  if (!sums.has(i)) {
    console.log(i);
    break;
  }
}
