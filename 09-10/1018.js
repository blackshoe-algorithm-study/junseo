//
let [NM, ...board] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

let [N, M] = NM.split(" ").map(Number);

board = board.map((e) => e.split(""));

let minimum = 64;

// 8씩 감소 시키는 이유는, 8 * 8 짜리 1판만 필요 하기 때문에 여분을 미리 제거
for (let i = 0; i <= N - 8; i++) {
  for (let j = 0; j <= M - 8; j++) {
    let typeWhite = 0; // 왼쪽 상단이 white로 시작하는 것
    let typeBlack = 0; // 왼쪽 상단이 black으로 시작하는 것

    // i, j는 8 * 8 만큼의 크기를 제외한 변수이기에 i ~ i + 8 까지는 8*8 체스판을 이동시킬 수 있고
    // 이를 통해 가장 적은 오류를 가진 체스판을 찾을 수 있다.

    for (let k = i; k < i + 8; k++) {
      for (let l = j; l < j + 8; l++) {
        if ((k + l) % 2 === 0) {
          // (0,0) (0,2) (1,1) 등 짝수 자리가
          //  white라면, 좌측 상단이 백색으로 시작하는 것이고
          if (board[k][l] === "W") {
            typeWhite++;
            // (0,1) (0,3) (1,0) 등 홀수 자리가
            //  white라면, 좌측 상단이 흑색으로 시작하는 것이다.
          } else {
            typeBlack++;
          }
        } else {
          // (0,1) (0,3) (1,0) 등 홀수 자리가
          //  black라면, 좌측 상단이 백색으로 시작하는 것이고
          if (board[k][l] === "B") {
            typeWhite++;
          }
          // (0,0) (0,2) (1,1) 등 짝수 자리가
          //  white라면, 좌측 상단이 흑색으로 시작하는 것이다.
          else {
            typeBlack++;
          }
        }
      }
    }

    if (minimum > typeWhite) minimum = typeWhite;
    if (minimum > typeBlack) minimum = typeBlack;
  }
}

console.log(minimum);
