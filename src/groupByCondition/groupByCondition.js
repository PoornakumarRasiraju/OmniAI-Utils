/**
 * Groups elements of an array based on a custom condition function.
 * @param {Array} arr - The array to group.
 * @param {Function} condition - The function to determine the group key.
 * @returns {Object} - Returns an object with grouped elements.
 */
export function groupByCondition(arr, condition) {
  const acc = Object.create(null); // No prototype overhead
  for (const item of arr) {
    const key = condition(item);
    (acc[key] ||= []).push(item); // Efficient key check and assignment
  }
  return acc;
}
