//
let [VE, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [V, E] = VE.split(" ").map(Number);
input = input.map((e) => e.split(" ").map(Number));

const dist = Array.from({ length: V }, () => Array(V).fill(Infinity));

input.forEach(([a, b, c]) => {
  a -= 1;
  b -= 1;
  dist[a][b] = Math.min(dist[a][b], c);
});

for (let k = 0; k < V; k++) {
  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
}

let answer = Infinity;

for (let i = 0; i < V; i++) {
  if (dist[i][i] !== Infinity) answer = Math.min(answer, dist[i][i]);
}

console.log(answer === Infinity ? -1 : answer);
