//
let input = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.split(" ").map(Number));

const N = 5;

let bingo = [],
  chairman = [];

// 입력 분리: 빙고판과 사회자가 부르는 숫자들
for (let i = 0; i < input.length; i++) {
  if (i < N) bingo.push(input[i]);
  else chairman.push(...input[i]); // 사회자가 부르는 숫자들을 일렬로 배열에 담음
}

const visited = Array.from({ length: N }, () => Array(N).fill(false));

// 숫자를 체크하는 함수
function addBingo(target) {
  bingo.forEach((row, rowIdx) => {
    row.forEach((num, colIdx) => {
      if (num === target) visited[rowIdx][colIdx] = true;
    });
  });
}

// 빙고 3줄이 완성되었는지 체크하는 함수
function checkBingo() {
  let bingoCount = 0;

  // 가로 줄 체크
  for (let r = 0; r < N; r++) {
    if (visited[r].every((v) => v)) bingoCount++;
  }

  // 세로 줄 체크
  for (let c = 0; c < N; c++) {
    if (visited.every((row) => row[c])) bingoCount++;
  }

  // 대각선 체크 (왼쪽 위 -> 오른쪽 아래)
  if (visited.every((row, idx) => row[idx])) bingoCount++;

  // 대각선 체크 (오른쪽 위 -> 왼쪽 아래)
  if (visited.every((row, idx) => row[N - 1 - idx])) bingoCount++;

  return bingoCount >= 3; // 빙고가 3줄 이상이면 true 반환
}

let count = 0;
let result = -1;

// 사회자가 숫자를 부를 때마다 처리
for (let i = 0; i < chairman.length; i++) {
  addBingo(chairman[i]); // 숫자 체크
  count++;

  // 5번째 숫자부터 빙고를 체크하기 시작
  if (count >= 5 && checkBingo()) {
    result = count; // 몇 번째 숫자인지 저장
    break;
  }
}

console.log(result);
