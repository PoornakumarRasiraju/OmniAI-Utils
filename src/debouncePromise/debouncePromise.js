/**
 * Debounces an async function, ensuring it is only executed after a delay.
 * @param {Function} fn - The async function to debounce.
 * @param {number} delay - The delay in milliseconds before executing the function.
 * @returns {Function} - Returns a debounced version of the function.
 */
export function debouncePromise(fn, delay = 300) {
  let timer = null;
  let lastPromise = null;

  return (...args) => {
    if (timer) clearTimeout(timer);

    return new Promise((resolve, reject) => {
      timer = setTimeout(async () => {
        try {
          lastPromise = fn(...args);
          resolve(await lastPromise);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
