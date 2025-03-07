const Logger = require('./Logger'); // Assuming the Logger class is exported from a file named Logger.js

describe('Logger', () => {
  let logger;

  beforeEach(() => {
    logger = new Logger('info'); // Set log level to 'info'
  });

  it('should log info messages', () => {
    console.log = jest.fn(); // Mock console.log
    logger.info('This is an info message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[INFO]: This is an info message'));
  });

  it('should log warning messages', () => {
    console.log = jest.fn();
    logger.warn('This is a warning message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[WARN]: This is a warning message'));
  });

  it('should log error messages', () => {
    console.log = jest.fn();
    logger.error('This is an error message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[ERROR]: This is an error message'));
  });

  it('should not log info messages if log level is set to warn', () => {
    const warnLogger = new Logger('warn');
    console.log = jest.fn();
    warnLogger.info('This info message should not appear');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should send logs to server when logServerUrl is provided', async () => {
    // Mock fetch to simulate sending logs to the server
    global.fetch = jest.fn().mockResolvedValue({ status: 200 });
    const loggerWithServer = new Logger('info', 'https://example.com/log');
    
    console.log = jest.fn();
    loggerWithServer.info('This log should be sent to server');
    
    await expect(fetch).toHaveBeenCalledWith('https://example.com/log', expect.objectContaining({
      method: 'POST',
      body: expect.any(String)
    }));
  });
});
