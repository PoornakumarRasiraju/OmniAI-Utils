import { promiseRetry } from "./promiseRetry.js";

describe("promiseRetry", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers to avoid real delays
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should resolve immediately if function succeeds", async () => {
    const mockFn = jest.fn().mockResolvedValue("Success");

    const result = await promiseRetry(mockFn, { retries: 3 });

    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should retry on failure and eventually succeed", async () => {
    let attempts = 0;
    const mockFn = jest.fn(async () => {
      attempts++;
      if (attempts < 2) throw new Error("Temporary failure");
      return "Success";
    });

    const promise = promiseRetry(mockFn, { retries: 3, initialDelay: 10 });

    await jest.advanceTimersByTimeAsync(10); // First retry
    await jest.advanceTimersByTimeAsync(20); // Second retry

    const result = await promise;
    expect(result).toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(2); // 1 failure + 1 success
  });
});
