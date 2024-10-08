//
let [str1, str2] = require("fs").readFileSync(0).toString().split("\n");
str1 = str1.split("");
str2 = str2.split("");

const dp = Array.from({ length: Math.min(str1.length, str2.length) }, () => []);
