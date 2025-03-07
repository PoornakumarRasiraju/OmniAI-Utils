// Example usage:
const X = [
  [1, 1],
  [1, 2],
  [2, 2],
  [2, 3]
];
const y = [5, 7, 8, 11];
const result = gradientDescent(X, y, 0.01, 1000);
console.log(result.theta); // Output: optimized theta (weights)
console.log(result.costHistory); // The loss history over iterations