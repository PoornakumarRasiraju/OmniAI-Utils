class PerformanceTracker {
  constructor() {
    this.startTimes = {};
  }

  start(name) {
    this.startTimes[name] = performance.now();
  }

  stop(name) {
    if (!this.startTimes[name]) {
      console.warn(`Timer for "${name}" was not started.`);
      return;
    }
    const endTime = performance.now();
    const duration = endTime - this.startTimes[name];
    console.log(`Performance for "${name}": ${duration}ms`);

    //Optionally send the data to a server for monitoring
    // Integrate with SDK or 3rd party
    // fetch('https://example.com/track-performance', { 
    //   method: 'POST',
    //   body: JSON.stringify({ name, duration })
    // });

    delete this.startTimes[name];
  }
}

// Example usage:
const perfTracker = new PerformanceTracker();
perfTracker.start('dataProcessing');

// Simulate some operation
setTimeout(() => {
  perfTracker.stop('dataProcessing');
}, 500);
