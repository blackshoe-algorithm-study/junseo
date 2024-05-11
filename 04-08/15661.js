// DFS
let [N, ...player] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");
N = +N;
player = player.map((e) => e.split(" ").map(Number));

let minDiff = Infinity;

function calc(team) {
  let ability = 0;
  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {
      ability += player[team[i]][team[j]] + player[team[j]][team[i]];
    }
  }
  return ability;
}

function dfs(index, team1) {
  if (index === N) {
    if (team1.length === 0) return; // 팀1에 한 명도 속하지 않은 경우
    const team2 = [];
    for (let i = 0; i < N; i++) {
      if (!team1.includes(i)) {
        team2.push(i);
      }
    }
    const ability1 = calc(team1);
    const ability2 = calc(team2);
    minDiff = Math.min(minDiff, Math.abs(ability1 - ability2));
    return;
  }

  dfs(index + 1, [...team1, index]); // 포함
  dfs(index + 1, team1); // 포함하지 않음
}

dfs(0, []);

console.log(minDiff);
