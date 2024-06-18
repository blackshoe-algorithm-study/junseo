//
let [VE, K, ...numbers] = require("fs")
  .readFileSync(0)
  .toString()
  .trim()
  .split("\n");

const [V, E] = VE.split(" ").map(Number);
numbers = numbers.map((e) => e.split(" ").map(Number));

const graph = Array.from({ length: V + 1 }, () => []);
numbers.forEach(([u, v, w]) => {
  graph[u].push([v, w]);
});

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
    while (idx) {
      let newItem = this.heap[idx];
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];
      if (parent[0] <= newItem[0]) break;
      this.heap[idx] = parent;
      this.heap[parentIdx] = newItem;
      idx = parentIdx;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(idx) {
    const length = this.heap.length;
    const sinkTarget = this.heap[0];
    while (1) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild[0] < sinkTarget[0]) swap = leftChildIdx;
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (rightChild[0] < sinkTarget[0]) swap = rightChildIdx;
      }
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = sinkTarget;
      idx = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function dijkstra(start) {
  const distances = Array(V + 1).fill(Infinity);
  distances[start] = 0;

  const pq = new MinHeap();
  pq.insert([0, start]);

  while (!pq.isEmpty()) {
    const [currentDistance, currentNode] = pq.extractMin();

    if (currentDistance > distances[currentNode]) continue;

    for (const [nextNode, weight] of graph[currentNode]) {
      const distance = currentDistance + weight;
      if (distance < distances[nextNode]) {
        distances[nextNode] = distance;
        pq.insert([distance, nextNode]);
      }
    }
  }
  return distances;
}

const distances = dijkstra(+K);

for (let i = 1; i <= V; i++) {
  if (distances[i] === Infinity) console.log("INF");
  else console.log(distances[i]);
}
