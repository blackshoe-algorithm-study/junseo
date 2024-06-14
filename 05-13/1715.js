//
let [N, ...cards] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    while (idx > 1) {
      const parentIdx = Math.floor(idx / 2);
      if (this.heap[parentIdx] > this.heap[idx]) {
        [this.heap[parentIdx], this.heap[idx]] = [
          this.heap[idx],
          this.heap[parentIdx],
        ];
        idx = parentIdx;
      } else break;
    }
  }

  remove() {
    const removeItem = this.heap[1];
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1];
      this.heap.pop();
      let idx = 1;
      let leftChild = idx * 2;
      let rightChild = idx * 2 + 1;
      while (this.heap[leftChild]) {
        let CompareChild = leftChild;
        if (this.heap[rightChild]) {
          if (this.heap[leftChild] > this.heap[rightChild]) {
            CompareChild = rightChild;
          }
        }
        if (this.heap[CompareChild] < this.heap[idx]) {
          [this.heap[CompareChild], this.heap[idx]] = [
            this.heap[idx],
            this.heap[CompareChild],
          ];
          idx = CompareChild;
        } else break;
        leftChild = idx * 2;
        rightChild = idx * 2 + 1;
      }
    } else if (this.heap.length === 2) {
      this.heap.pop();
    } else {
      return 0;
    }
    return removeItem;
  }

  getSize() {
    return this.heap.length - 1;
  }
}

function solution(N, cards) {
  let answer = 0;
  const minHeap = new MinHeap();
  cards.forEach((card) => minHeap.push(card));
  while (minHeap.getSize() > 1) {
    const sum = minHeap.remove() + minHeap.remove();
    answer += sum;
    minHeap.push(sum);
  }
  console.log(answer);
}

solution(N, cards);
