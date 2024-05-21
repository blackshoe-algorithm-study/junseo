//
let [N, K] = require("fs").readFileSync(0).toString().split(" ").map(Number);

const visited = Array(100001).fill(false);

function solution(start, goal) {
  const queue = [[start, 0]];
  let head = 0;
  while (head < queue.length) {
    const [curPos, sec] = queue[head];
    head++;
    const move = [curPos + 1, curPos - 1, curPos * 2];

    if (visited[curPos]) continue;
    if (curPos === goal) return sec;

    for (const pos of move) {
      if (!visited[pos] && pos >= 0 && pos <= 100000) {
        visited[curPos] = true;
        queue.push([pos, sec + 1]);
      }
    }
  }
}

console.log(solution(N, K));
