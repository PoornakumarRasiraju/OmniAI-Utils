// observability.js
class Observability {
  constructor({ logLevel = 'info', isProduction = false }) {
    this.logLevel = logLevel;
    this.isProduction = isProduction;
    this.errorEndpoint = 'https://your-error-tracking-endpoint.com'; // Customize this endpoint for error reporting
  }

  // Utility to log messages
  log(level, message, data = {}) {
    const levels = ['debug', 'info', 'warn', 'error'];
    if (levels.indexOf(level) >= levels.indexOf(this.logLevel)) {
      console[level](message, data);
    }
  }

  // Log an info message
  info(message, data = {}) {
    this.log('info', message, data);
  }

  // Log a warning message
  warn(message, data = {}) {
    this.log('warn', message, data);
  }

  // Log an error message
  error(message, data = {}) {
    this.log('error', message, data);
    if (this.isProduction) {
      this.sendError(message, data);
    }
  }

  // Helper to measure function execution time
  measureExecutionTime(func, label = '') {
    const start = performance.now();
    try {
      const result = func();
      const end = performance.now();
      const duration = end - start;
      this.info(`Execution time for ${label}`, { duration });
      return result;
    } catch (error) {
      this.error(`Error executing ${label}`, { error });
    }
  }

  // Sending error data to an error reporting endpoint
  async sendError(message, data) {
    try {
      const payload = {
        message,
        data,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(this.errorEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        this.warn('Error report failed to send', { message, data });
      }
    } catch (error) {
      this.warn('Error reporting failed', { error });
    }
  }

  // Track a custom event (this can be extended for more sophisticated tracking)
  trackEvent(eventName, eventData) {
    this.info(`Event tracked: ${eventName}`, eventData);
    // You could send this data to an analytics or monitoring platform (e.g., Google Analytics, Mixpanel, etc.)
  }
}

const observability = new Observability({ logLevel: 'debug', isProduction: false });

// Expose the utility to global scope for easy usage
window.observability = observability;

export default observability;

