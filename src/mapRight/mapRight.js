export function mapRight(array, callback) {
	if (!Array.isArray(array)) throw new TypeError("Expected an array");
	if (typeof callback !== "function") throw new TypeError("Expected a function");

	const result = [];
	for (let i = array.length - 1; i >= 0; i--) {
			result.push(callback(array[i], i, array));
	}
	return result;
}