//
const [E, S, M] = require("fs")
  .readFileSync(0)
  .toString()
  .split(" ")
  .map(Number);

let year = E;

while (true) {
  if ((year - S) % 28 === 0 && (year - M) % 19 === 0) {
    console.log(year);
    break;
  }
  year += 15;
}

// node js로는 메모리 초과를 해결할 수 없는 문제
