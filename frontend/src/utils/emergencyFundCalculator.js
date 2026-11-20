/**
 * emergencyFundCalculator.js
 * Essential baseline expenditure analyzer and emergency safety net calculator.
 */

export const ESSENTIAL_CATEGORIES = new Set([
  'housing',
  'rent',
  'mortgage',
  'food',
  'groceries',
  'utilities',
  'bills',
  'healthcare',
  'insurance',
  'transportation',
]);

/**
 * Filter and sum monthly essential survival expenses.
 * @param {Array<{ category: string, amount: number, type?: string }>} transactions
 * @returns {{ essentialTotal: number, discretionaryTotal: number, essentialPercentage: number }}
 */
export function analyzeEssentialExpenses(transactions = []) {
  let essentialTotal = 0;
  let discretionaryTotal = 0;

  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    const cat = String(t.category || '').toLowerCase();
    const amount = Number(t.amount) || 0;

    if (ESSENTIAL_CATEGORIES.has(cat)) {
      essentialTotal += amount;
    } else {
      discretionaryTotal += amount;
    }
  }

  const grandTotal = essentialTotal + discretionaryTotal;
  const essentialPercentage = grandTotal > 0 ? Math.round((essentialTotal / grandTotal) * 100) : 0;

  return {
    essentialTotal: Math.round(essentialTotal),
    discretionaryTotal: Math.round(discretionaryTotal),
    essentialPercentage,
  };
}

/**
 * Calculate recommended 3-month, 6-month, and 12-month emergency reserves.
 * @param {number} monthlyEssentialExpenses
 * @param {number} currentSavedAmount
 * @returns {{
 *   threeMonths: number,
 *   sixMonths: number,
 *   twelveMonths: number,
 *   fundedMonths: number,
 *   targetHealth: 'critical' | 'moderate' | 'secure' | 'robust'
 * }}
 */
export function calculateEmergencyFundTargets(monthlyEssentialExpenses = 2500, currentSavedAmount = 7500) {
  const monthly = Math.max(1, Number(monthlyEssentialExpenses) || 1);
  const saved = Math.max(0, Number(currentSavedAmount) || 0);

  const threeMonths = monthly * 3;
  const sixMonths = monthly * 6;
  const twelveMonths = monthly * 12;

  const fundedMonths = Number((saved / monthly).toFixed(1));

  let targetHealth = 'critical';
  if (fundedMonths >= 12) targetHealth = 'robust';
  else if (fundedMonths >= 6) targetHealth = 'secure';
  else if (fundedMonths >= 3) targetHealth = 'moderate';

  return {
    threeMonths,
    sixMonths,
    twelveMonths,
    fundedMonths,
    targetHealth,
  };
}
