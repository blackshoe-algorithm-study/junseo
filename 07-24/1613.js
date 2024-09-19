//
let [nk, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [n, k] = nk.split(" ").map(Number);

const dist = Array.from({ length: n }, () => Array(n).fill(0));

for (let i = 0; i < k; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  dist[a - 1][b - 1] = 1; // a가 b보다 먼저 발생함
}

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dist[i][k] === 1 && dist[k][j] === 1) {
        dist[i][j] = 1; // i -> k -> j로 갈 수 있으면 i는 j보다 먼저 일어남
      }
    }
  }
}

const s = +input[k];
const questions = input.slice(k + 1).map((e) => e.split(" ").map(Number));

questions.forEach(([a, b]) => {
  a -= 1;
  b -= 1;

  if (dist[a][b] === 1) {
    console.log(-1); // a가 b보다 먼저 일어남
  } else if (dist[b][a] === 1) {
    console.log(1); // b가 a보다 먼저 일어남
  } else {
    console.log(0); // 선후 관계를 알 수 없음
  }
});
