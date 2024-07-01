//
let [NM, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [N, M] = NM.split(" ").map(Number);
input = input.map((e) => e.split(" ").map(Number));

// 그래프와 진입 차수 배열 초기화
const graph = Array.from({ length: N + 1 }, () => []);
const inDegree = Array(N + 1).fill(0);

for (const [A, B] of input) {
  graph[A].push(B);
  inDegree[B]++;
}

// 우선순위 큐(최소 힙) 초기화
class MinHeap {
  constructor() {
    this.heap = [];
  }
  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx] >= this.heap[parentIdx]) break;
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];
      idx = parentIdx;
    }
  }
  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }
  bubbleDown(idx) {
    const length = this.heap.length;
    const element = this.heap[idx];
    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let left, right;
      let swapIdx = null;

      if (leftIdx < length) {
        left = this.heap[leftIdx];
        if (left < element) {
          swapIdx = leftIdx;
        }
      }
      if (rightIdx < length) {
        right = this.heap[rightIdx];
        if (
          (swapIdx === null && right < element) ||
          (swapIdx !== null && right < left)
        ) {
          swapIdx = rightIdx;
        }
      }
      if (swapIdx === null) break;
      [this.heap[idx], this.heap[swapIdx]] = [
        this.heap[swapIdx],
        this.heap[idx],
      ];
      idx = swapIdx;
    }
  }
}

const minHeap = new MinHeap();

// 진입 차수가 0인 노드를 우선순위 큐에 삽입
for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) {
    minHeap.insert(i);
  }
}

const result = [];
// 위상 정렬 수행
while (minHeap.heap.length > 0) {
  const current = minHeap.extractMin();
  result.push(current);
  for (const next of graph[current]) {
    inDegree[next]--;
    if (inDegree[next] === 0) {
      minHeap.insert(next);
    }
  }
}

console.log(result.join(" "));
