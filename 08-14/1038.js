//
const N = +require("fs").readFileSync(0).toString().trim();

let descentNumbers = [];
let queue = [];

for (let i = 0; i < 10; i++) {
  queue.push(i);
  descentNumbers.push(i);
  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

while (queue.length) {
  let current = queue.shift();

  // 꺼내온 숫자 마지막 자릿수 Ex) 321 -> 1
  let lastDigit = current % 10;

  for (let i = 0; i < lastDigit; i++) {
    // lastDigit보다 작은 i 뒤에 붙여서 새로운 숫자 생성 Ex) 321 + 0
    let nextNumber = current * 10 + i;

    // 내리막 숫자 최대 범위 초과 시 종료
    if (nextNumber > 9876543210) break;

    queue.push(nextNumber);
    descentNumbers.push(nextNumber);
  }
}

descentNumbers.sort((a, b) => a - b);
if (N < descentNumbers.length) console.log(descentNumbers[N]);
else console.log(-1);
