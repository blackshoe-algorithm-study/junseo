//
let [NSM, Vi] = require("fs").readFileSync(0).toString().trim().split("\n");
const [N, S, M] = NSM.split(" ").map(Number);
Vi = Vi.split(" ").map(Number);

let answer = -1;

// 시작 볼륨 S
// 볼륨 0 ~ M 사이값

const dp = Array(N).fill(0);

function isOver(minus, plus) {
  if (minus < 0 || minus > M) {
  }

  if (plus < 0 || plus > M) {
  }
}

Vi.forEach((gap, i) => {
  // 첫 번째 곡 볼륨 최댓값
  let minus = S - gap;
  let plus = S + gap;

  // 두 번째 곡 볼륨 최댓값
});
