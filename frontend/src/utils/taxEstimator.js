/**
 * taxEstimator.js
 * Progressive income tax, self-employment tax, and deduction estimator.
 */

// 2024 Standard IRS Tax Brackets for Single Filers
export const FEDERAL_BRACKETS_SINGLE = [
  { max: 11600, rate: 0.10 },
  { max: 47150, rate: 0.12 },
  { max: 100525, rate: 0.22 },
  { max: 191950, rate: 0.24 },
  { max: 243725, rate: 0.32 },
  { max: 609350, rate: 0.35 },
  { max: Infinity, rate: 0.37 },
];

export const STANDARD_DEDUCTION_2024_SINGLE = 14600;

/**
 * Calculate progressive federal income tax.
 * @param {number} grossIncome
 * @param {number} deductions
 * @returns {{
 *   taxableIncome: number,
 *   totalTax: number,
 *   effectiveRate: number,
 *   marginalRate: number
 * }}
 */
export function estimateFederalTax(grossIncome = 0, deductions = STANDARD_DEDUCTION_2024_SINGLE) {
  const gross = Math.max(0, Number(grossIncome) || 0);
  const ded = Math.max(0, Number(deductions) || 0);
  const taxableIncome = Math.max(0, gross - ded);

  if (taxableIncome === 0) {
    return { taxableIncome: 0, totalTax: 0, effectiveRate: 0, marginalRate: 0 };
  }

  let totalTax = 0;
  let prevMax = 0;
  let marginalRate = 0.10;

  for (const bracket of FEDERAL_BRACKETS_SINGLE) {
    if (taxableIncome > prevMax) {
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - prevMax;
      totalTax += taxableInBracket * bracket.rate;
      marginalRate = bracket.rate;
      prevMax = bracket.max;
    } else {
      break;
    }
  }

  const effectiveRate = gross > 0 ? Number(((totalTax / gross) * 100).toFixed(1)) : 0;

  return {
    taxableIncome: Math.round(taxableIncome),
    totalTax: Math.round(totalTax),
    effectiveRate,
    marginalRate: Math.round(marginalRate * 100),
  };
}

/**
 * Estimate annual self-employment / 1099 tax (15.3% on 92.35% of net profit).
 * @param {number} freelanceIncome
 * @returns {number}
 */
export function estimateSelfEmploymentTax(freelanceIncome = 0) {
  const income = Math.max(0, Number(freelanceIncome) || 0);
  const taxablePortion = income * 0.9235;
  return Math.round(taxablePortion * 0.153);
}
