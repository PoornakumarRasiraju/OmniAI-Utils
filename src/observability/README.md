# Observability Utility for JavaScript

A simple, lightweight JavaScript utility designed to help developers monitor and observe their applications with basic logging, execution time tracking, error reporting, and event tracking. It provides a basic structure to track logs and errors, as well as measure execution times of functions.

## Key Features

- **Logging**: Handles logging at various levels (`debug`, `info`, `warn`, `error`), and sends logs based on the configured log level.
- **Execution Time Measurement**: Measures how long a specific function or code block takes to execute.
- **Error Reporting**: Sends errors to a remote server if the application is in production. You can customize the error endpoint to fit your needs.
- **Custom Event Tracking**: Tracks custom events that you can use to send to analytics or monitoring platforms.
- **Easy to Use**: Can be instantiated and used throughout the application for consistent observability.

## Installation

To use this utility in your project, simply copy the `observability.js` file into your project or install it via npm or yarn once it is available in a public repository (e.g., GitHub).

## Usage Example

```javascript
// In your app
import observability from './observability.js';

// Track an event
observability.trackEvent('user_login', { userId: '12345' });

// Measure the time taken by a function
observability.measureExecutionTime(() => {
  // some code to measure
  setTimeout(() => {
    console.log('Execution complete');
  }, 500);
}, 'Sample Timeout');

// Log information
observability.info('User logged in', { userId: '12345' });

// Log an error (this will also be sent to a remote error tracker if in production)
observability.error('Failed to fetch user data', { userId: '12345', error: '404 Not Found' });
