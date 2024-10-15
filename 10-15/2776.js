//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");

const result = [];
function checkRemember(N, integers, M, notes) {
  const integerSet = new Set(integers);
  notes.forEach((note) => {
    result.push(integerSet.has(note) ? 1 : 0);
  });
}

let idx = 0;
for (let i = 0; i < T; i++) {
  const N = +input[idx++];
  const integers = input[idx++].split(" ").map(Number);
  const M = +input[idx++];
  const notes = input[idx++].split(" ").map(Number);
  checkRemember(N, integers, M, notes);
}

console.log(result.join("\n"));
