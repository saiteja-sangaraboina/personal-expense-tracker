/**
 * validator.js - Request input validation and XSS tag sanitization middleware
 */

const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const validateTransaction = (req, res, next) => {
  const { title, description, amount, type, category } = req.body;

  const itemTitle = title || description;

  if (!itemTitle || typeof itemTitle !== 'string' || itemTitle.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid transaction title or description',
    });
  }

  if (itemTitle.trim().length > 120) {
    return res.status(400).json({
      success: false,
      message: 'Transaction title cannot exceed 120 characters',
    });
  }

  const numAmount = Number(amount);
  if (amount === undefined || isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Transaction amount must be a positive number greater than 0',
    });
  }

  if (type && !['income', 'expense'].includes(type)) {
    return res.status(400).json({
      success: false,
      message: 'Transaction type must be either income or expense',
    });
  }

  // Sanitize fields against embedded HTML tags
  if (req.body.title) req.body.title = sanitizeString(req.body.title);
  if (req.body.description) req.body.description = sanitizeString(req.body.description);
  if (req.body.notes) req.body.notes = sanitizeString(req.body.notes);
  if (req.body.category) req.body.category = sanitizeString(req.body.category);

  next();
};

module.exports = {
  sanitizeString,
  validateTransaction,
};
