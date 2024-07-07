//
let [SP, DNA, mins] = require("fs").readFileSync(0).toString().split("\n");

const [S, P] = SP.split(" ").map(Number);
DNA = DNA.split("");
mins = mins.split(" ").map(Number);

const countCurrent = { A: 0, C: 0, G: 0, T: 0 };
const countMin = { A: mins[0], C: mins[1], G: mins[2], T: mins[3] };

let countValid = 0;

// 초기 윈도우 설정
for (let i = 0; i < P; i++) {
  countCurrent[DNA[i]]++;
}

// 초기 윈도우의 유효성 검사
function isValid() {
  return (
    countCurrent["A"] >= countMin["A"] &&
    countCurrent["C"] >= countMin["C"] &&
    countCurrent["G"] >= countMin["G"] &&
    countCurrent["T"] >= countMin["T"]
  );
}

if (isValid()) countValid++;

// 슬라이딩 윈도우를 사용해 문자열을 검사
for (let i = P; i < S; i++) {
  countCurrent[DNA[i]]++;
  countCurrent[DNA[i - P]]--;
  if (isValid()) countValid++;
}

console.log(countValid);
