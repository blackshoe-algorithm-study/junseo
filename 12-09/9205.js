//
let [t, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
t = +t;

function solution(cx, cy, store, festival) {
  const queue = [[cx, cy]];
  const visited = Array(store.length).fill(false);
  let flag = false;
  while (queue.length) {
    const [x, y] = queue.shift();
    if (Math.abs(x - festival[0]) + Math.abs(y - festival[1]) <= 1000) {
      flag = true;
      break;
    }
    for (let i = 0; i < store.length; i++) {
      if (visited[i]) continue;
      if (Math.abs(x - store[i][0]) + Math.abs(y - store[i][1]) <= 1000) {
        visited[i] = true;
        queue.push(store[i]);
      }
    }
  }
  console.log(flag ? "happy" : "sad");
}

let idx = 0;
for (let i = 0; i < t; i++) {
  const n = +input[idx++];
  let [cx, cy] = input[idx++].split(" ").map(Number);
  let store = [];
  for (let j = 0; j < n; j++) {
    store.push(input[idx++].split(" ").map(Number));
  }
  let festival = input[idx++].split(" ").map(Number);
  solution(cx, cy, store, festival);
}
