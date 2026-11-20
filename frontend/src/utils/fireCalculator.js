/**
 * fireCalculator.js
 * Financial Independence, Retire Early (FIRE) metrics and milestone projector.
 */

/**
 * Calculate FIRE target amount, current progress percentage, and estimated years to independence.
 * Uses standard 4% Safe Withdrawal Rule (25x annual expenses).
 * @param {number} annualExpenses
 * @param {number} currentNetWorth
 * @param {number} annualSavings
 * @param {number} expectedReturnRate - default 7% (real return)
 * @returns {{
 *   fireTarget: number,
 *   currentProgressPct: number,
 *   yearsToFire: number,
 *   monthlySavingsTarget: number
 * }}
 */
export function calculateFireMilestones(
  annualExpenses = 48000,
  currentNetWorth = 50000,
  annualSavings = 24000,
  expectedReturnRate = 0.07
) {
  const expenses = Math.max(1, Number(annualExpenses) || 1);
  const fireTarget = Math.round(expenses * 25); // 4% rule
  const netWorth = Math.max(0, Number(currentNetWorth) || 0);
  const savings = Math.max(0, Number(annualSavings) || 0);

  const currentProgressPct = Math.min(100, Number(((netWorth / fireTarget) * 100).toFixed(1)));

  let balance = netWorth;
  let years = 0;
  const maxYears = 50;

  if (balance >= fireTarget) {
    return {
      fireTarget,
      currentProgressPct: 100,
      yearsToFire: 0,
      monthlySavingsTarget: 0,
    };
  }

  while (balance < fireTarget && years < maxYears) {
    years += 1;
    balance = balance * (1 + expectedReturnRate) + savings;
  }

  return {
    fireTarget,
    currentProgressPct,
    yearsToFire: years,
    monthlySavingsTarget: Math.round(savings / 12),
  };
}

/**
 * Classify FIRE style (LeanFIRE, Standard FIRE, FatFIRE).
 * @param {number} annualExpenses
 * @returns {'Lean FIRE' | 'Regular FIRE' | 'Fat FIRE'}
 */
export function classifyFireType(annualExpenses = 40000) {
  if (annualExpenses <= 40000) return 'Lean FIRE';
  if (annualExpenses >= 100000) return 'Fat FIRE';
  return 'Regular FIRE';
}
