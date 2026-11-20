/**
 * currencySymbols.js - Currency symbol lookup and formatting helper
 */

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
};

export const getCurrencySymbol = (currencyCode = 'USD') => {
  if (!currencyCode) return '$';
  return CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode.toUpperCase();
};

export const formatWithSymbol = (amount, currencyCode = 'USD') => {
  const symbol = getCurrencySymbol(currencyCode);
  const num = Number(amount) || 0;
  return `${symbol}${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
