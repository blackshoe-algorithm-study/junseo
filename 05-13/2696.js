//
let [T, ...input] = require("fs").readFileSync(0).toString().trim().split("\n");

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return top;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest])
        smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest])
        smallest = right;

      if (smallest === index) break;
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      index = smallest;
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return top;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] >= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let largest = index;

      if (left < length && this.heap[left] > this.heap[largest]) largest = left;
      if (right < length && this.heap[right] > this.heap[largest])
        largest = right;

      if (largest === index) break;
      [this.heap[largest], this.heap[index]] = [
        this.heap[index],
        this.heap[largest],
      ];
      index = largest;
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

function solution(T, input) {
  let idx = 0;

  for (let i = 0; i < T; i++) {
    const N = +input[idx++];
    let nums = [];
    while (nums.length < N) {
      nums = nums.concat(input[idx++].split(" ").map(Number));
    }

    const maxHeap = new MaxHeap();
    const minHeap = new MinHeap();
    const result = [];

    for (let j = 0; j < N; j++) {
      if (maxHeap.size() === 0 || nums[j] <= maxHeap.peek()) {
        maxHeap.push(nums[j]);
      } else {
        minHeap.push(nums[j]);
      }

      if (maxHeap.size() > minHeap.size() + 1) {
        minHeap.push(maxHeap.pop());
      } else if (minHeap.size() > maxHeap.size()) {
        maxHeap.push(minHeap.pop());
      }

      if (j % 2 === 0) {
        result.push(maxHeap.peek());
      }
    }

    let output = [];
    output.push(result.length);
    for (let k = 0; k < result.length; k += 10) {
      output.push(result.slice(k, k + 10).join(" "));
    }
  }

  console.log(output.join("\n"));
}

solution(+T, input);
