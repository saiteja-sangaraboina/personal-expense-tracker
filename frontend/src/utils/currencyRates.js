/**
 * Fixed exchange rate tables relative to base USD
 * Can be replaced by a live forex API endpoint in production
 */
export const EXCHANGE_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 154.2,
  CAD: 1.36,
  AUD: 1.52,
};

/**
 * Convert an amount from one currency to another
 * @param {number} amount
 * @param {string} fromCurrency - e.g. 'USD'
 * @param {string} toCurrency - e.g. 'INR'
 * @returns {number}
 */
export const convertCurrency = (amount = 0, fromCurrency = 'USD', toCurrency = 'USD') => {
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1.0;
  const toRate = EXCHANGE_RATES[toCurrency] || 1.0;

  if (fromCurrency === toCurrency) return Number(amount);

  // Convert to base USD first, then to target
  const amountInUSD = Number(amount) / fromRate;
  const converted = amountInUSD * toRate;

  return Math.round(converted * 100) / 100;
};

/**
 * Get formatted exchange rate pair text (e.g. 1 USD = 83.50 INR)
 */
export const getExchangeRateText = (fromCurrency, toCurrency) => {
  const rate = convertCurrency(1, fromCurrency, toCurrency);
  return `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`;
};
