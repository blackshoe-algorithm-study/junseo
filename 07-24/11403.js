//
let [N, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
N = +N;
const dist = input.map((e) => e.split(" ").map(Number));

// 플로이드-워셜 알고리즘 적용
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (dist[i][k] && dist[k][j]) {
        dist[i][j] = 1; // 경로가 존재하면 1로 표시
      }
    }
  }
}

dist.forEach((row) => console.log(row.join(" ")));
