/**
 * systemTelemetry.js - System runtime performance, memory usage, and uptime telemetry
 */
const os = require('os');

const getSystemTelemetry = () => {
  const memoryUsage = process.memoryUsage();

  return {
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    platform: process.platform,
    cpuCount: os.cpus().length,
    freeMemoryMb: Math.round(os.freemem() / (1024 * 1024)),
    totalMemoryMb: Math.round(os.totalmem() / (1024 * 1024)),
    processMemory: {
      rssMb: Math.round(memoryUsage.rss / (1024 * 1024)),
      heapTotalMb: Math.round(memoryUsage.heapTotal / (1024 * 1024)),
      heapUsedMb: Math.round(memoryUsage.heapUsed / (1024 * 1024)),
    },
    timestamp: new Date().toISOString(),
  };
};

module.exports = { getSystemTelemetry };
