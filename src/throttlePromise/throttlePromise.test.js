import { throttlePromise } from "./throttlePromise.js";

jest.useFakeTimers(); // Mock timers to speed up tests

describe("throttlePromise", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("should execute immediately on first call", async () => {
    const mockFn = jest.fn().mockResolvedValue("Success");
    const throttledFn = throttlePromise(mockFn, 1000);

    const result = throttledFn("test");

    expect(mockFn).toHaveBeenCalledTimes(1);
    await expect(result).resolves.toBe("Success");
  });

  test("should throttle multiple calls within interval and return same promise", async () => {
    const mockFn = jest.fn().mockResolvedValue("Throttled Result");
    const throttledFn = throttlePromise(mockFn, 1000);

    const firstPromise = throttledFn("first");
    const secondPromise = throttledFn("second");
    const thirdPromise = throttledFn("third");

    await jest.runAllTimersAsync(); // Fast-forward time

    expect(mockFn).toHaveBeenCalledTimes(1); // Should only execute once
    await expect(firstPromise).resolves.toBe("Throttled Result");
    await expect(secondPromise).resolves.toBe("Throttled Result");
    await expect(thirdPromise).resolves.toBe("Throttled Result");
  });

  test("should execute again after interval has passed", async () => {
    const mockFn = jest.fn().mockResolvedValue("Re-executed");
    const throttledFn = throttlePromise(mockFn, 1000);

    throttledFn("first");

    await jest.advanceTimersByTimeAsync(1000); // Fast-forward time

    const secondPromise = throttledFn("second"); // Should execute now

    expect(mockFn).toHaveBeenCalledTimes(2); // Two executions should happen
    await expect(secondPromise).resolves.toBe("Re-executed");
  });
});
