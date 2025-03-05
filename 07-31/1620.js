//
let [NM, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [N, M] = NM.split(" ").map(Number);

let pocketmons = input.slice(0, N);
let quest = input.slice(N);

const pocketmonMap = new Map(pocketmons.map((e, idx) => [e, idx + 1]));

const answer = [];
quest.forEach((e) => {
  if (pocketmonMap.get(e)) answer.push(pocketmonMap.get(e));
  else answer.push(pocketmons[+e - 1]);
});

console.log(answer.join("\n"));
