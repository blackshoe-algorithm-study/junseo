//
let [SP, DNA, mins] = require("fs").readFileSync(0).toString().split("\n");

const [S, P] = SP.split(" ").map(Number);
DNA = DNA.split("");
mins = mins.split(" ").map(Number);

const password = [];
for (let i = 0; i < S; i++) {
  let string = DNA[i];
  for (let j = i + 1; j < S; j++) {
    if (string.length <= P) string += DNA[j];
    if (string.length === P) {
      password.push(string);
      break;
    }
  }
}

let count = 0;
password.forEach((pwd) => {
  let [A, C, G, T] = mins;
  // pwd = 'CCTGGATT', 'CTGGATTG'
  const chars = pwd.split("");
  chars.forEach((char) => {
    // char = 'C', 'C', 'T', ...
    switch (char) {
      case "A":
        A--;
        break;
      case "C":
        C--;
        break;
      case "G":
        G--;
        break;
      case "T":
        T--;
        break;
      default:
        break;
    }
  });
  if (A <= 0 && C <= 0 && G <= 0 && T <= 0) count++;
});

console.log(count);
