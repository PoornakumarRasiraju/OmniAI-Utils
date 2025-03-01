import { sleep } from './sleep';

describe("sleep function", () => {
	jest.useFakeTimers();
	
	afterEach(() => {
    jest.clearAllTimers();
  });

  test("should delay execution for the specified time", async () => {
    const start = Date.now();
    const sleepPromise = sleep(1000);
    
    // Fast-forward time
    jest.advanceTimersByTime(1000);
    await sleepPromise;
    
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });

  test("should resolve successfully", async () => {
		const sleepPromise = sleep(500);
		
		// Run all pending timers to force resolution
		jest.runAllTimers();
	
		await expect(sleepPromise).resolves.toBeUndefined();
	});

  test("should throw an error for invalid inputs", async () => {
    expect(() => sleep(-100)).toThrow("Sleep duration must be a positive number.");
    expect(() => sleep("1000")).toThrow("Sleep duration must be a positive number.");
    expect(() => sleep(null)).toThrow("Sleep duration must be a positive number.");
  });
});