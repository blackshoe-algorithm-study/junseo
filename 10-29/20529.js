//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");
T = +T;

const answer = [];

function calculateDist(str1, str2) {
  let dist = 0;
  for (let i = 0; i < 4; i++) {
    if (str1[i] !== str2[i]) dist++;
  }
  return dist;
}

function solution(N, str) {
  // 학생 수가 32명 이상인 경우, 중복된 MBTI 유형이 있을 가능성이 높으므로
  // 조합 계산 대신 MBTI 유형이 같은 3명 찾기 시도를 통해 빠르게 처리
  if (N > 32) {
    const mbtiCount = {};
    for (const mbti of str) {
      if (mbtiCount[mbti]) {
        mbtiCount[mbti]++;
        if (mbtiCount[mbti] >= 3) {
          answer.push(0);
          return;
        }
      } else {
        mbtiCount[mbti] = 1;
      }
    }
  }

  let minDist = Infinity;

  // 최소 거리를 찾기 위해 세 사람 조합을 모두 비교
  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        // 세 개의 심리 거리 합 계산
        const dist =
          calculateDist(str[i], str[j]) +
          calculateDist(str[j], str[k]) +
          calculateDist(str[i], str[k]);
        minDist = Math.min(minDist, dist);
      }
    }
  }

  answer.push(minDist);
}

// 기본 입력
let idx = 0;
for (let i = 0; i < T; i++) {
  const N = +input[idx++];
  const str = input[idx++].split(" ");
  solution(N, str);
}

console.log(answer.join("\n"));
