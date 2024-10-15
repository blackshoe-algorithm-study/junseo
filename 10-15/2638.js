//
let [NM, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
const [N, M] = NM.split(" ").map(Number);
const arr = input.map((e) => e.split(" ").map(Number));

const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let time = 0;
