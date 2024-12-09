//
const [doc, word] = require("fs").readFileSync(0).toString().split("\n");

let count = 0;

for (let i = 0; i < doc.length; i++) {
  if (doc.slice(i, i + word.length) === word) {
    count++;
    i += word.length - 1;
  }
}

console.log(count);
