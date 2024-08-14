//
let [T, ...testcases] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
T = +T;
testcases = testcases.map((e) => e.split(" ").map(Number));

testcases.forEach(([input, output]) => {
  //
});
