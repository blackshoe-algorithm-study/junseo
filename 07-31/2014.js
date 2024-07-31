//
let [KN, primes] = require("fs").readFileSync(0).toString().split("\n");
const [K, N] = KN.split(" ").map(Number);
primes = primes.split(" ").map(Number);

const max = 541;
const isPrime = Array(max).fill(true);
isPrime.fill(false, 0, 2);

// 소수 판정법 - 에라토스테네스의 체
for (let i = 2; i < Math.sqrt(max); i++) {
  for (let j = i * i; j < max; j += i) {
    isPrime[j] = false;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {}

  heapifyUp() {}

  heapifyDown() {}

  peek() {}
}

const minHeap = new MinHeap();
const visited = new Set();
