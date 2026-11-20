/**
 * passwordStrength.js - Password entropy and security strength evaluation
 */

const evaluatePasswordStrength = (password = '') => {
  if (typeof password !== 'string' || password.length === 0) {
    return {
      score: 0,
      label: 'Very Weak',
      isStrong: false,
      feedback: ['Please enter a password'],
    };
  }

  const feedback = [];
  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');

  if (password.length >= 12) score += 1;

  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include both lowercase and uppercase letters');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one numerical digit');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include at least one special character (!@#$%^&*)');
  }

  // Normalize score between 0 and 4
  const normalizedScore = Math.min(4, Math.max(0, Math.floor(score * 0.8)));

  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  return {
    score: normalizedScore,
    label: labels[normalizedScore],
    isStrong: normalizedScore >= 3,
    feedback,
  };
};

module.exports = { evaluatePasswordStrength };
