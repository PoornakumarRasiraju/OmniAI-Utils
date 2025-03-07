class ErrorTracker {
  constructor(logServerUrl = '') {
    this.logServerUrl = logServerUrl;
  }

  trackError(error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `${timestamp} - ERROR: ${error.message}\nStack Trace: ${error.stack}`;
    console.error(errorMessage);

    if (this.logServerUrl) {
      fetch(this.logServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          timestamp
        })
      }).catch(err => console.error('Failed to send error to server:', err));
    }
  }

  handleError(error) {
    this.trackError(error);
    // Optionally rethrow the error for further handling
    throw error;
  }
}

// Example usage:
const errorTracker = new ErrorTracker('https://example.com/error-log');
try {
  // Simulating an error
  throw new Error('Something went wrong');
} catch (error) {
  errorTracker.handleError(error);
}
