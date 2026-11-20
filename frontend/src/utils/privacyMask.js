/**
 * privacyMask.js - Sensitive financial data masking and privacy view helpers
 */

export const maskCurrencyAmount = (amount, isPrivacyEnabled = false) => {
  if (!isPrivacyEnabled) {
    const num = Number(amount) || 0;
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return '••••••';
};

export const maskAccountNumber = (accountNumber = '') => {
  if (!accountNumber || typeof accountNumber !== 'string') return '••••';
  const clean = accountNumber.replace(/\s+/g, '');
  if (clean.length <= 4) return clean;
  return `•••• ${clean.slice(-4)}`;
};
