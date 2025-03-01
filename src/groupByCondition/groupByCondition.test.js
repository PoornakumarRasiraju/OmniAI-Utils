import { groupByCondition } from './groupByCondition';

describe("groupByCondition", () => {
  test("groups numbers into even and odd", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = groupByCondition(numbers, n => (n % 2 === 0 ? "even" : "odd"));
    expect(result).toEqual({
      even: [2, 4, 6, 8],
      odd: [1, 3, 5, 7, 9]
    });
  });

  test("groups strings by length", () => {
    const words = ["apple", "bat", "car", "dog", "elephant"];
    const result = groupByCondition(words, word => word.length);
    expect(result).toEqual({
      3: ["bat", "car", "dog"],
      5: ["apple"],
      8: ["elephant"]
    });
  });

  test("returns an empty object when given an empty array", () => {
    const result = groupByCondition([], x => x);
    expect(result).toEqual({});
  });

  test("groups duplicate values correctly", () => {
    const items = ["apple", "banana", "apple", "orange"];
    const result = groupByCondition(items, fruit => fruit);
    expect(result).toEqual({
      apple: ["apple", "apple"],
      banana: ["banana"],
      orange: ["orange"]
    });
  });

  test("groups objects based on a property", () => {
    const users = [
      { id: 1, role: "admin" },
      { id: 2, role: "user" },
      { id: 3, role: "admin" },
      { id: 4, role: "user" }
    ];
    const result = groupByCondition(users, user => user.role);
    expect(result).toEqual({
      admin: [{ id: 1, role: "admin" }, { id: 3, role: "admin" }],
      user: [{ id: 2, role: "user" }, { id: 4, role: "user" }]
    });
  });

  test("groups numbers by remainder when divided by 10", () => {
    const numbers = [10, 15, 20, 25, 30];
    const result = groupByCondition(numbers, n => n % 10);
    expect(result).toEqual({
      0: [10, 20, 30],
      5: [15, 25]
    });
  });

  test("handles grouping with complex conditions", () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = groupByCondition(numbers, n => (n < 5 ? "small" : "large"));
    expect(result).toEqual({
      small: [1, 2, 3, 4],
      large: [5, 6, 7, 8, 9]
    });
  });

  test("groups mixed data types correctly", () => {
    const mixedArray = [1, "one", 2, "two", 3, "three"];
    const result = groupByCondition(mixedArray, item => typeof item);
    expect(result).toEqual({
      number: [1, 2, 3],
      string: ["one", "two", "three"]
    });
  });
});
