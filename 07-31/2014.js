const fs = require("fs");

function solve() {
  const input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s+/); // 공백으로 split
  const K = parseInt(input[0], 10);
  const N = parseInt(input[1], 10);
  const primes = input.slice(2).map(Number);

  // 소수 배열 오름차순 정렬 (혹시 입력이 정렬되어 있지 않을 수도 있으므로)
  primes.sort((a, b) => a - b);

  // 다중 포인터(DP) 방식에 필요한 구조
  const result = new Array(N + 1); // result[0] ~ result[N]
  const idx = new Array(K).fill(0); // 각 소수마다 가리키는 인덱스
  const candidate = new Array(K); // 각 소수가 만들 '다음 후보 값'

  // 초기값 설정
  result[0] = 1; // 0번째 값(실제로는 '시작점' 개념)
  for (let j = 0; j < K; j++) {
    candidate[j] = primes[j] * result[0]; // = primes[j] * 1
  }

  // 이제 result[1]부터 result[N]까지 채워나감
  for (let i = 1; i <= N; i++) {
    // 1) candidate에서 최솟값 찾기
    let minVal = Infinity;
    for (let j = 0; j < K; j++) {
      if (candidate[j] < minVal) {
        minVal = candidate[j];
      }
    }

    // 2) i번째 수 확정
    result[i] = minVal;

    // 3) 이 minVal을 만들어 낸 모든 j에 대해 idx[j]를 하나 늘린 뒤, 새 candidate[j] 계산
    for (let j = 0; j < K; j++) {
      if (candidate[j] === minVal) {
        idx[j] += 1;
        // 오버플로 방지 (문제 조건: 2^31 미만)
        const next = result[idx[j]] * primes[j];
        candidate[j] = next < 2 ** 31 ? next : Infinity;
        console.log(
          `result[${i}] = ${result[i]}, idx[${j}] = ${idx[j]}, candidate[${j}] = ${candidate[j]}`
        );
      }
    }
  }

  // 우리가 구해야 하는 값은 result[N]
  // (result[0]=1은 버려진 시작 값이므로, 실제 1번째 ~ N번째는 result[1]~result[N])
  console.log(result[N]);
}

solve();
