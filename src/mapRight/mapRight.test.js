import { mapRight } from './mapRight';

describe("mapRight function", () => {
	test("should map values from right to left", () => {
		const result = mapRight([1, 2, 3, 4], x => x * 2);
		expect(result).toEqual([8, 6, 4, 2]);
	});

	test("should return an empty array when input is empty", () => {
		expect(mapRight([], x => x * 2)).toEqual([]);
	});

	test("should throw an error if input is not an array", () => {
		const invalidCallbacks = [null, "not a function", 123, {}, [], undefined];

    invalidCallbacks.forEach(callback => {
      expect(() => mapRight([1, 2, 3], callback)).toThrow(TypeError);
    });
	});
});