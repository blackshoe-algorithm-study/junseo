//
let [NK, ...input] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [N, K] = NK.split(" ").map(Number);

const jewels = [];
for (let i = 0; i < N; i++) {
  const [Mi, Vi] = input[i].split(" ").map(Number);
  jewels.push({ weight: Mi, value: Vi });
}
jewels.sort((a, b) => a.weight - b.weight);

const bags = [];
for (let j = N; j < N + K; j++) {
  bags.push(Number(input[j]));
}
bags.sort((a, b) => a - b);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return max;
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

let maxValue = 0;
let jewelIndex = 0;
const pq = new MaxHeap();

for (let i = 0; i < K; i++) {
  const currentBag = bags[i];
  while (jewelIndex < N && jewels[jewelIndex].weight <= currentBag) {
    pq.insert(jewels[jewelIndex].value);
    jewelIndex++;
  }
  if (pq.heap.length > 0) {
    maxValue += pq.extractMax();
  }
}

console.log(maxValue);
