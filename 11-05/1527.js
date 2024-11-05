//
const [A, B] = require("fs").readFileSync(0).toString().split(" ").map(Number);

let answer = 0;

function generateMinsu(num) {
  if (num > B) return; // 범위를 벗어나면 중단
  if (num >= A) answer++; // A와 B 사이에 있는 민수 숫자면 카운트 증가

  // "4"와 "7"을 추가하여 다음 민수 숫자 생성
  generateMinsu(num * 10 + 4);
  generateMinsu(num * 10 + 7);
}

generateMinsu(0);
console.log(answer);
