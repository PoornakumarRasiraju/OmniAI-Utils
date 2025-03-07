const ErrorTracker = require('./ErrorTracker'); // Assuming the ErrorTracker class is exported from a file

describe('ErrorTracker', () => {
  let errorTracker;

  beforeEach(() => {
    errorTracker = new ErrorTracker('https://example.com/error-log');
  });

  it('should track and log an error with stack trace', () => {
    const error = new Error('Test error');
    console.error = jest.fn(); // Mock console.error

    errorTracker.trackError(error);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('ERROR: Test error'));
  });

  it('should send error data to server', async () => {
    const error = new Error('Test error');
    global.fetch = jest.fn().mockResolvedValue({ status: 200 });

    errorTracker.trackError(error);
    
    await expect(fetch).toHaveBeenCalledWith('https://example.com/error-log', expect.objectContaining({
      method: 'POST',
      body: expect.any(String),
    }));
  });

  it('should handle error and rethrow it', () => {
    const error = new Error('Test error');
    console.error = jest.fn();

    expect(() => errorTracker.handleError(error)).toThrow('Test error');
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('ERROR: Test error'));
  });
});
