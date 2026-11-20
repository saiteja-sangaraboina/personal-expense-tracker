/**
 * accountHelpers.js
 * Multi-account portfolio balance calculator and type classification helpers.
 */

export const ACCOUNT_TYPES = {
  bank: { label: 'Bank Account', icon: 'Building2', color: '#6366f1' },
  cash: { label: 'Physical Cash', icon: 'Banknote', color: '#10b981' },
  credit_card: { label: 'Credit Card', icon: 'CreditCard', color: '#ef4444' },
  investment: { label: 'Brokerage / Stocks', icon: 'TrendingUp', color: '#8b5cf6' },
  savings: { label: 'High-Yield Savings', icon: 'PiggyBank', color: '#06b6d4' },
  crypto: { label: 'Crypto Wallet', icon: 'Coins', color: '#f59e0b' },
};

/**
 * Calculate net consolidated balance across all accounts.
 * Credit card balances are subtracted as liabilities.
 * @param {Array<{ type: string, balance: number }>} accounts
 * @returns {number} Net balance
 */
export function calculateTotalBalance(accounts = []) {
  return accounts.reduce((acc, a) => {
    const val = Number(a.balance) || 0;
    if (a.type === 'credit_card') {
      return acc - val;
    }
    return acc + val;
  }, 0);
}

/**
 * Group accounts by type and calculate aggregated value.
 * @param {Array<{ type: string, balance: number }>} accounts
 * @returns {Record<string, number>}
 */
export function groupAccountsByType(accounts = []) {
  const result = {};
  for (const a of accounts) {
    const type = a.type || 'bank';
    const val = Number(a.balance) || 0;
    result[type] = (result[type] || 0) + val;
  }
  return result;
}

/**
 * Format account number / ID masking (e.g. "•••• 4242")
 * @param {string} id
 * @returns {string}
 */
export function maskAccountId(id = '') {
  const str = String(id);
  if (str.length <= 4) return str;
  return `•••• ${str.slice(-4)}`;
}
