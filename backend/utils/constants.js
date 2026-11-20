/**
 * constants.js
 * Shared backend constants used across the application.
 */

// Transaction types
const TRANSACTION_TYPES = Object.freeze(['income', 'expense']);

// Default expense categories
const DEFAULT_CATEGORIES = Object.freeze([
  'Food',
  'Shopping',
  'Transportation',
  'Education',
  'Entertainment',
  'Healthcare',
  'Bills',
  'Travel',
  'Salary',
  'Freelance',
  'Subscription',
  'Investment',
  'Other',
]);

// Budget period options
const BUDGET_PERIODS = Object.freeze(['monthly', 'weekly', 'yearly']);

// Recurrence frequencies
const RECURRENCE_FREQUENCIES = Object.freeze(['daily', 'weekly', 'monthly', 'yearly']);

// Goal statuses
const GOAL_STATUSES = Object.freeze(['active', 'completed', 'paused', 'cancelled']);

// Pagination defaults
const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
});

// JWT expiry
const JWT_EXPIRY = '7d';
const REFRESH_TOKEN_EXPIRY = '30d';

// Rate limiter defaults (requests per window)
const RATE_LIMITS = Object.freeze({
  AUTH_WINDOW_MS: 15 * 60 * 1000,  // 15 minutes
  AUTH_MAX: 10,
  API_WINDOW_MS: 15 * 60 * 1000,
  API_MAX: 200,
});

// HTTP status codes (commonly used)
const HTTP = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
});

// Sort options
const SORT_FIELDS = Object.freeze({
  transactions: ['date', 'amount', 'category', 'createdAt'],
  budgets: ['name', 'amount', 'createdAt'],
  goals: ['targetDate', 'targetAmount', 'createdAt'],
});

// File export formats
const EXPORT_FORMATS = Object.freeze(['csv', 'json']);

// Email templates
const EMAIL_SUBJECTS = Object.freeze({
  MONTHLY_SUMMARY: 'Your Monthly Expense Summary',
  BUDGET_ALERT: 'Budget Alert - Limit Approaching',
  GOAL_ACHIEVED: 'Congratulations! Goal Achieved',
  WELCOME: 'Welcome to Personal Expense Tracker',
  PASSWORD_RESET: 'Password Reset Request',
});

module.exports = {
  TRANSACTION_TYPES,
  DEFAULT_CATEGORIES,
  BUDGET_PERIODS,
  RECURRENCE_FREQUENCIES,
  GOAL_STATUSES,
  PAGINATION,
  JWT_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  RATE_LIMITS,
  HTTP,
  SORT_FIELDS,
  EXPORT_FORMATS,
  EMAIL_SUBJECTS,
};
