/**
 * Throttles an async function, ensuring it executes at most once within a specified interval.
 * If a function is already running, it will return the same promise instead of executing again.
 * @param {Function} fn - The async function to throttle.
 * @param {number} interval - The minimum time (in milliseconds) between function calls.
 * @returns {Function} - Returns a throttled version of the function.
 */
export function throttlePromise(fn, interval = 1000) {
  let lastCallTime = 0;
  let lastPromise = null;
  let isExecuting = false; // Ensures only one execution at a time

  return async (...args) => {
    const now = Date.now();

    if (isExecuting) {
      return lastPromise; // If the function is still executing, return the ongoing promise
    }

    if (now - lastCallTime >= interval) {
      lastCallTime = now;
      isExecuting = true;

      try {
        lastPromise = fn(...args);
        return await lastPromise;
      } finally {
        isExecuting = false; // Mark execution as completed
      }
    }

    return lastPromise; // Return the last resolved promise if interval hasn't passed
  };
}
