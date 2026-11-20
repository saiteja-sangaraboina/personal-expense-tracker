/**
 * helpers.js
 * Shared backend utility functions used across controllers and middleware.
 */

/**
 * Parse pagination query params with safe defaults.
 * @param {Object} query - Express req.query
 * @returns {{ page: number, limit: number, skip: number }}
 */
function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

/**
 * Build a MongoDB date range filter from startDate / endDate query params.
 * @param {Object} query - Express req.query
 * @returns {Object} Mongo $gte/$lte filter or empty object
 */
function buildDateFilter(query) {
  const filter = {};
  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) {
      const end = new Date(query.endDate);
      end.setHours(23, 59, 59, 999);
      filter.date.$lte = end;
    }
  }
  return filter;
}

/**
 * Remove undefined / null keys from an object (useful before saving to Mongo).
 * @param {Object} obj
 * @returns {Object}
 */
function stripUndefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)
  );
}

/**
 * Calculate start of the current month (UTC midnight).
 * @returns {Date}
 */
function startOfMonth() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

/**
 * Calculate start of N months ago (UTC midnight).
 * @param {number} n
 * @returns {Date}
 */
function startOfMonthsAgo(n) {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - n, 1));
}

/**
 * Format a number as USD currency string.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

/**
 * Capitalize first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generate a random alphanumeric token of given length.
 * @param {number} length
 * @returns {string}
 */
function randomToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Sleep for a given number of milliseconds (async).
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  parsePagination,
  buildDateFilter,
  stripUndefined,
  startOfMonth,
  startOfMonthsAgo,
  formatCurrency,
  capitalize,
  randomToken,
  clamp,
  sleep,
};
