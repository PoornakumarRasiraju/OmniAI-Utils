class HealthCheck {
  constructor(services) {
    this.services = services;
  }

  async check() {
    const results = await Promise.all(this.services.map(async (service) => {
      try {
        const response = await fetch(service.url);
        if (response.ok) {
          return { service: service.name, status: 'Healthy' };
        } else {
          return { service: service.name, status: 'Unhealthy', error: `Status Code: ${response.status}` };
        }
      } catch (error) {
        return { service: service.name, status: 'Unhealthy', error: error.message };
      }
    }));

    console.log('Health Check Results:');
    results.forEach(result => {
      if (result.status === 'Healthy') {
        console.log(`${result.service}: ${result.status}`);
      } else {
        console.error(`${result.service}: ${result.status} - ${result.error}`);
      }
    });
  }
}

// Example usage:
const services = [
  { name: 'Database', url: 'https://example.com/db-health' },
  { name: 'API', url: 'https://jsonplaceholder.typicode.com/posts' }
];
const healthCheck = new HealthCheck(services);
healthCheck.check();
