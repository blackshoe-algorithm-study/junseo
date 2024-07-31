//
let [KN, ...lanCables] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [K, N] = KN.split(" ").map(Number);
lanCables = lanCables.map(Number);

let left = 1;
let right = Math.max(...lanCables);
let result = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  let count = 0;

  for (let cable of lanCables) {
    count += Math.floor(cable / mid);
  }

  if (count >= N) {
    result = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(result);
