/**
 * netWorthCalculator.js
 * Comprehensive Net Worth, Asset Allocation, and Financial Solvency Calculator.
 */

/**
 * Calculate total assets, total liabilities, and net worth.
 * @param {Array<{ name: string, category: string, value: number }>} assets
 * @param {Array<{ name: string, category: string, value: number }>} liabilities
 * @returns {{
 *   totalAssets: number,
 *   totalLiabilities: number,
 *   netWorth: number,
 *   debtToAssetRatio: number,
 *   solvencyStatus: 'excellent' | 'good' | 'caution' | 'warning'
 * }}
 */
export function calculateNetWorth(assets = [], liabilities = []) {
  const totalAssets = assets.reduce((sum, a) => sum + Math.max(0, Number(a.value) || 0), 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + Math.max(0, Number(l.value) || 0), 0);
  const netWorth = totalAssets - totalLiabilities;

  const debtToAssetRatio = totalAssets > 0
    ? Math.round((totalLiabilities / totalAssets) * 100)
    : totalLiabilities > 0 ? 100 : 0;

  let solvencyStatus = 'excellent';
  if (debtToAssetRatio > 80) solvencyStatus = 'warning';
  else if (debtToAssetRatio > 50) solvencyStatus = 'caution';
  else if (debtToAssetRatio > 25) solvencyStatus = 'good';

  return {
    totalAssets,
    totalLiabilities,
    netWorth,
    debtToAssetRatio,
    solvencyStatus,
  };
}

/**
 * Breakdown assets by major classes (Cash/Liquid, Investments, Real Estate/Physical, Other)
 * @param {Array<{ name: string, category: string, value: number }>} assets
 * @returns {Record<string, { total: number, percentage: number }>}
 */
export function calculateAssetAllocation(assets = []) {
  const total = assets.reduce((s, a) => s + (Number(a.value) || 0), 0);
  if (total === 0) return {};

  const groups = {};
  for (const a of assets) {
    const cat = a.category || 'Other';
    groups[cat] = (groups[cat] || 0) + (Number(a.value) || 0);
  }

  const allocation = {};
  for (const [cat, val] of Object.entries(groups)) {
    allocation[cat] = {
      total: val,
      percentage: Math.round((val / total) * 100),
    };
  }

  return allocation;
}

/**
 * Calculate financial runway in months based on liquid cash and average monthly burn rate.
 * @param {number} liquidCash
 * @param {number} monthlyExpenses
 * @returns {number} runway in months (rounded to 1 decimal place)
 */
export function calculateRunway(liquidCash = 0, monthlyExpenses = 0) {
  const cash = Math.max(0, Number(liquidCash) || 0);
  const burn = Math.max(0, Number(monthlyExpenses) || 0);
  if (burn === 0) return cash > 0 ? 999 : 0;
  return Number((cash / burn).toFixed(1));
}
