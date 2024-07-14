//
const fs = require("fs");
let [NM, ...cities] = fs.readFileSync(0).toString().trim().split("\n");

const [N, M] = NM.split(" ").map(Number);
cities = cities.map((e) => e.split(" ").map(Number));

function getCombinations(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]);
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });
  return results;
}

function calculateChickenDistance(houses, chickenHouses) {
  let totalDistance = 0;
  houses.forEach(([hx, hy]) => {
    let minDistance = Infinity;
    chickenHouses.forEach(([cx, cy]) => {
      const distance = Math.abs(hx - cx) + Math.abs(hy - cy);
      if (distance < minDistance) minDistance = distance;
    });
    totalDistance += minDistance;
  });
  return totalDistance;
}

function solution() {
  let houses = [];
  let chickenHouses = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (cities[i][j] === 1) houses.push([i, j]);
      else if (cities[i][j] === 2) chickenHouses.push([i, j]);
    }
  }

  const chickenCombinations = getCombinations(chickenHouses, M);
  let minChickenDistance = Infinity;

  chickenCombinations.forEach((combination) => {
    const chickenDistance = calculateChickenDistance(houses, combination);
    if (chickenDistance < minChickenDistance)
      minChickenDistance = chickenDistance;
  });

  console.log(minChickenDistance);
}

solution();
