import { debouncePromise } from "./debouncePromise.js";

jest.useFakeTimers(); // Mock timers globally

describe("debouncePromise", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("should call the debounced function after the delay", async () => {
    const mockFn = jest.fn().mockResolvedValue("Success");
    const debouncedFn = debouncePromise(mockFn, 300);

    const promise = debouncedFn("test");

    expect(mockFn).not.toHaveBeenCalled(); // Should not be called immediately

    // Fast-forward all pending timers
    await jest.runAllTimersAsync();

    await expect(promise).resolves.toBe("Success");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  test("should only execute the last call when called multiple times rapidly", async () => {
    const mockFn = jest.fn().mockResolvedValue("Final Call");
    const debouncedFn = debouncePromise(mockFn, 300);

    debouncedFn("first");
    debouncedFn("second");
    const finalPromise = debouncedFn("third"); // Only this should execute

    await jest.runAllTimersAsync(); // Fast-forward all delays

    await expect(finalPromise).resolves.toBe("Final Call");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("third");
  });

  test("should return the correct result when awaited", async () => {
    const mockFn = jest.fn(async (value) => `Processed: ${value}`);
    const debouncedFn = debouncePromise(mockFn, 300);

    const promise = debouncedFn("AI");

    await jest.runAllTimersAsync(); // Process all pending timers
    await expect(promise).resolves.toBe("Processed: AI");
  });

  test("should reset the timer when called repeatedly", async () => {
    const mockFn = jest.fn().mockResolvedValue("Final Result");
    const debouncedFn = debouncePromise(mockFn, 300);

    debouncedFn("1st");
    await jest.advanceTimersByTimeAsync(200);

    debouncedFn("2nd"); // Resets the timer
    await jest.advanceTimersByTimeAsync(200);

    debouncedFn("3rd"); // Resets again
    const finalPromise = debouncedFn("Final");

    await jest.runAllTimersAsync(); // Process all pending timers

    await expect(finalPromise).resolves.toBe("Final Result");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("Final");
  });
});
