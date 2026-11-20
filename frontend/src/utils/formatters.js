/**
 * Format a numeric amount into a localized currency string
 * @param {number} amount
 * @param {string} currency - e.g. 'USD', 'EUR', 'INR'
 * @returns {string}
 */
export const formatCurrency = (amount = 0, currency = 'USD') => {
  const currencyLocales = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    INR: 'en-IN',
    JPY: 'ja-JP',
    CAD: 'en-CA',
    AUD: 'en-AU',
  };

  const locale = currencyLocales[currency] || 'en-US';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
};

/**
 * Format a date string into readable formats
 */
export const formatDate = (dateString, formatType = 'medium') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  if (formatType === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (formatType === 'full') {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate percentage and cap at 100
 */
export const calculatePercentage = (current, target) => {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round(((current || 0) / target) * 100));
};

/**
 * Abbreviate large numbers (e.g. 1.2K, 3.4M)
 */
export const abbreviateNumber = (num = 0) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
