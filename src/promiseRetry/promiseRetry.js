/**
 * A robust function to retry a promise-based operation with exponential backoff and jitter.
 * @param {Function} fn - The function returning a promise.
 * @param {Object} options - Configuration options.
 * @param {number} [options.retries=3] - Maximum number of retry attempts.
 * @param {number} [options.initialDelay=1000] - Initial delay in milliseconds.
 * @param {number} [options.factor=2] - Exponential backoff multiplier.
 * @param {number} [options.maxDelay=30000] - Maximum delay allowed between retries.
 * @param {boolean} [options.jitter=true] - Adds random jitter to prevent synchronized retries.
 * @param {Function} [options.shouldRetry] - Custom function to determine if an error should trigger a retry.
 * @returns {Promise<any>} - Resolves with the function result or rejects after max retries.
 */
export async function promiseRetry(fn, {
  retries = 3,
  initialDelay = 1000,
  factor = 2,
  maxDelay = 30000,
  jitter = true,
  shouldRetry = (error) => true // Default: Retry on all errors
} = {}) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries || !shouldRetry(error)) {
        throw error; // Stop retrying if max retries reached or error is non-retriable
      }

      attempt++;
      let waitTime = Math.min(initialDelay * Math.pow(factor, attempt), maxDelay);

      if (jitter) {
        const jitterFactor = Math.random() + 0.5; // Adds 50%-150% randomness
        waitTime *= jitterFactor;
      }

      console.warn(`Retry ${attempt}/${retries} failed. Retrying in ${Math.round(waitTime)}ms...`, error.message);

      await new Promise(res => setTimeout(res, waitTime));
    }
  }
}