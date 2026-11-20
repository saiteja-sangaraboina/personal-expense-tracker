/**
 * querySanitizer.js - Recursively strips MongoDB operator keys (starting with $) to prevent NoSQL injection
 */

const sanitizeMongoQuery = (target) => {
  if (!target || typeof target !== 'object') {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map((item) => sanitizeMongoQuery(item));
  }

  const clean = {};
  for (const [key, value] of Object.entries(target)) {
    // Strip keys starting with $ (e.g. $where, $gt, $ne, $regex)
    if (!key.startsWith('$')) {
      clean[key] = sanitizeMongoQuery(value);
    }
  }

  return clean;
};

const querySanitizerMiddleware = (req, res, next) => {
  if (req.body) req.body = sanitizeMongoQuery(req.body);
  if (req.query) req.query = sanitizeMongoQuery(req.query);
  if (req.params) req.params = sanitizeMongoQuery(req.params);
  next();
};

module.exports = {
  sanitizeMongoQuery,
  querySanitizerMiddleware,
};
