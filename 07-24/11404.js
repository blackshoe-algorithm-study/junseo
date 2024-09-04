//
let [n, m, ...buses] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
n = +n;
m = +m;
buses = buses.map((e) => e.split(" ").map(Number));

const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

for (let i = 0; i < n; i++) {
  dist[i][i] = 0;
}

// 주어진 버스 정보를 통해 초기 경로 설정
buses.forEach(([a, b, c]) => {
  a -= 1;
  b -= 1;
  // 같은 경로에 여러 개의 버스가 있을 수 있으므로, 최소 비용으로 갱신
  dist[a][b] = Math.min(dist[a][b], c);
});

// 플로이드-워셜 알고리즘 적용
for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
}

dist.forEach((row) => {
  console.log(row.map((x) => (x === Infinity ? 0 : x)).join(" "));
});
