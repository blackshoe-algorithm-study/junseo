//
let [N, ...files] = require("fs").readFileSync(0).toString().trim().split("\n");

const obj = {};
const set = new Set();

files.forEach((file) => {
  const extension = file.split(".")[1];
  set.add(extension);
  if (obj[extension]) obj[extension]++;
  else obj[extension] = 1;
});

let arr = [...set];
arr = arr.sort();

arr.forEach((e) => {
  console.log(e + " " + obj[e]);
});
