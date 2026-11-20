/**
 * Validate email address format
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

/**
 * Validate password strength
 * Returns { valid: boolean, errors: string[] }
 */
export const validatePasswordStrength = (password) => {
  const errors = [];
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate transaction input
 */
export const validateTransactionInput = (data) => {
  const errors = {};
  if (!data.amount || isNaN(data.amount) || Number(data.amount) <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }
  if (!data.category || !data.category.trim()) {
    errors.category = 'Category is required';
  }
  if (!data.date) {
    errors.date = 'Date is required';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
