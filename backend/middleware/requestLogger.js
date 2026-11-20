/**
 * requestLogger.js
 * Express middleware for structured API request logging, latency measurement, and client attribution.
 */

const requestLogger = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl || req.url,
      status: res.statusCode,
      durationMs: `${durationMs}ms`,
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
      userAgent: req.headers['user-agent'] || 'unknown',
    };

    if (process.env.NODE_ENV !== 'test') {
      console.log(`[REQ] ${logEntry.method} ${logEntry.path} -> ${logEntry.status} (${logEntry.durationMs})`);
    }
  });

  next();
};

module.exports = requestLogger;
