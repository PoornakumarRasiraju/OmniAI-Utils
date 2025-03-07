class Logger {
  constructor(logLevel = 'info', logServerUrl = '') {
    this.logLevel = logLevel;
    this.logServerUrl = logServerUrl;
    this.levels = ['info', 'warn', 'error'];
  }

  // Helper function to check log level
  shouldLog(level) {
    return this.levels.indexOf(level) >= this.levels.indexOf(this.logLevel);
  }

  log(message, level = 'info') {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      console.log(logMessage);

      if (this.logServerUrl) {
        // Send the log message to a remote logging server
        fetch(this.logServerUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: logMessage, level, timestamp })
        }).catch(err => console.error('Failed to send log to server:', err));
      }
    }
  }

  info(message) {
    this.log(message, 'info');
  }

  warn(message) {
    this.log(message, 'warn');
  }

  error(message) {
    this.log(message, 'error');
  }
}

// Example usage:
const logger = new Logger('warn', 'https://example.com/log');
logger.info('This is an info message');  // Will not log, because the log level is 'warn'
logger.warn('This is a warning message');
logger.error('This is an error message');
