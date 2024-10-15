//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
input = input.map((e) => e.split(" ").map(Number));

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const calculateLcm = (a, b) => (a * b) / gcd(a, b);

const result = [];
input.forEach(([M, N, x, y]) => {
  const limit = calculateLcm(M, N);
  let answer = -1;

  for (let k = x; k <= limit; k += M) {
    if (((k - 1) % N) + 1 === y) {
      answer = k;
      break;
    }
  }

  result.push(answer);
});

console.log(result.join("\n"));
