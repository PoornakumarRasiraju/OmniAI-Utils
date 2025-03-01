/**
 * Delays execution for a given time.
 * @param {number} ms - Delay time in milliseconds.
 * @returns {Promise<void>} - Resolves after the specified time.
 * @throws {Error} - Throws an error if `ms` is not a positive number.
 */
export function sleep(ms) {
  if (typeof ms !== 'number' || ms < 0) {
    throw new Error('Sleep duration must be a positive number.');
  }

  return new Promise(resolve => setTimeout(resolve, ms));
}