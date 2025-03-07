function gradientDescent(X, y, learningRate = 0.01, iterations = 1000) {
  const m = X.length; // Number of data points
  const n = X[0].length; // Number of features
  let theta = new Array(n).fill(0); // Initialize weights to 0
  let costHistory = [];

  for (let i = 0; i < iterations; i++) {
    let predictions = X.map((row, index) => row.reduce((sum, value, idx) => sum + value * theta[idx], 0));
    let errors = predictions.map((pred, index) => pred - y[index]);

    for (let j = 0; j < n; j++) {
      const gradient = errors.reduce((sum, error, index) => sum + error * X[index][j], 0) / m;
      theta[j] -= learningRate * gradient;
    }

    // Calculate cost (Mean Squared Error)
    const cost = errors.reduce((sum, error) => sum + error * error, 0) / (2 * m);
    costHistory.push(cost);
  }

  return { theta, costHistory };
}


