const { Kafka } = require('kafkajs');

class MetricsStreamer {
  constructor(brokerList, topic, batchSize = 100, flushInterval = 10000) {
    this.kafka = new Kafka({
      clientId: 'metrics-producer',
      brokers: brokerList, // List of Kafka brokers
    });
    this.producer = this.kafka.producer();
    this.topic = topic;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
    this.metricsQueue = [];
    this.isProducerReady = false;
  }

  // Initialize the Kafka producer
  async init() {
    await this.producer.connect();
    this.isProducerReady = true;
    console.log('Kafka producer connected.');
    this.startBatching();
  }

  // Add metric to the queue
  addMetric(metric) {
    if (!this.isProducerReady) {
      console.error('Producer is not ready yet.');
      return;
    }

    this.metricsQueue.push(metric);

    // If batch size is reached, send the metrics to Kafka
    if (this.metricsQueue.length >= this.batchSize) {
      this.flushMetrics();
    }
  }

  // Send the queued metrics to Kafka
  async flushMetrics() {
    if (this.metricsQueue.length === 0) return;

    console.log(`Sending batch of ${this.metricsQueue.length} metrics to Kafka...`);

    try {
      await this.producer.send({
        topic: this.topic,
        messages: this.metricsQueue.map((metric) => ({
          value: JSON.stringify(metric), // Send metrics as JSON strings
        })),
      });
      console.log(`Batch sent. ${this.metricsQueue.length} metrics were sent.`);

      // Reset the queue after sending
      this.metricsQueue = [];
    } catch (err) {
      console.error('Error sending metrics to Kafka:', err);
    }
  }

  // Start the batch sending process at regular intervals (flushInterval)
  startBatching() {
    setInterval(() => {
      if (this.metricsQueue.length > 0) {
        this.flushMetrics();
      }
    }, this.flushInterval); // Flush metrics based on the provided interval
  }

  // Close the producer gracefully
  async close() {
    await this.producer.disconnect();
    console.log('Kafka producer disconnected.');
  }
}

// Usage example:
(async () => {
  const metricsStreamer = new MetricsStreamer(
    ['localhost:9092'],   // Kafka brokers
    'metrics-topic',      // Kafka topic
    50,                   // Batch size (configurable)
    5000                  // Flush interval (configurable, in milliseconds)
  );

  await metricsStreamer.init();

  // Example: Simulating continuous metric generation
  setInterval(() => {
    const metric = {
      timestamp: new Date().toISOString(),
      metric_name: 'cpu_usage',
      value: Math.random() * 100, // Simulating random CPU usage percentage
    };

    metricsStreamer.addMetric(metric);
  }, 100); // Add a new metric every 100ms

  // Gracefully shutdown the producer when needed
  process.on('SIGINT', async () => {
    await metricsStreamer.close();
    process.exit(0);
  });
})();
