//
let N = parseInt(require("fs").readFileSync(0).toString().trim());

function isPrime(n) {
  let arr = Array(n + 1)
    .fill(true)
    .fill(false, 0, 2);

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (arr[i]) {
      // i의 배수 false로 변경
      for (let j = i * i; j <= N; j += i) {
        arr[j] = false;
      }
    }
  }
  return arr;
}

function solution(N) {
  let answer = 0;

  let primes = isPrime(N)
    .map((e, idx) => (e ? idx : 0))
    .filter((e) => e);

  let sum = 0;
  let left = 0;
  let right = 0;

  // 투 포인터 알고리즘을 이용한 소수의 합 계산
  while (true) {
    if (sum >= N) sum -= primes[left++];
    else if (right === primes.length) break;
    else sum += primes[right++];

    if (sum === N) answer++;
  }
  console.log(answer);
}

solution(N);
