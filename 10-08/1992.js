//
let [N, ...arr] = require("fs").readFileSync(0).toString().trim().split("\n");
N = +N;
arr = arr.map((e) => e.split("").map(Number));

function quadTree(x, y, size) {
  // 해당 구역이 모두 같은 숫자인지 확인
  const first = arr[x][y];
  let isSame = true;

  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (arr[i][j] !== first) {
        isSame = false;
        break;
      }
    }
    if (!isSame) break;
  }

  // 모두 같은 숫자라면 해당 숫자 반환
  if (isSame) {
    return first.toString();
  }

  // 그렇지 않다면 4개의 사분면으로 나누어 재귀 호출
  const half = size / 2;
  const topLeft = quadTree(x, y, half);
  const topRight = quadTree(x, y + half, half);
  const bottomLeft = quadTree(x + half, y, half);
  const bottomRight = quadTree(x + half, y + half, half);

  // 4개의 결과를 합쳐서 반환
  return `(${topLeft}${topRight}${bottomLeft}${bottomRight})`;
}

// 결과 출력
const result = quadTree(0, 0, N);
console.log(result);
