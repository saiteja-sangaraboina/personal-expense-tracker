/**
 * taxWithholdingCalculator.js - Paycheck withholding, FICA, and net take-home estimation
 */

export const estimatePaycheckWithholding = ({
  annualGross = 65000,
  filingStatus = 'single',
  payFrequency = 'biweekly',
  preTaxDeductions = 0,
}) => {
  const gross = Math.max(0, Number(annualGross) || 0);
  const deductions = Math.max(0, Number(preTaxDeductions) || 0);
  const taxableAnnual = Math.max(0, gross - deductions);

  // Pay periods per year
  const periods = payFrequency === 'monthly' ? 12 : payFrequency === 'weekly' ? 52 : 26;
  const grossPerPaycheck = Math.round((gross / periods) * 100) / 100;
  const taxablePerPaycheck = Math.round((taxableAnnual / periods) * 100) / 100;

  // FICA: 6.2% Social Security + 1.45% Medicare = 7.65%
  const socialSecurity = Math.round(grossPerPaycheck * 0.062 * 100) / 100;
  const medicare = Math.round(grossPerPaycheck * 0.0145 * 100) / 100;
  const totalFica = Math.round((socialSecurity + medicare) * 100) / 100;

  // Approximate Federal income tax bracket deduction
  const effectiveFederalRate = taxableAnnual > 100000 ? 0.18 : taxableAnnual > 50000 ? 0.12 : 0.08;
  const federalTax = Math.round(taxablePerPaycheck * effectiveFederalRate * 100) / 100;

  // State tax estimate (average 4%)
  const stateTax = Math.round(taxablePerPaycheck * 0.04 * 100) / 100;

  const totalWithholding = Math.round((federalTax + stateTax + totalFica) * 100) / 100;
  const netTakeHome = Math.max(0, Math.round((grossPerPaycheck - totalWithholding) * 100) / 100);

  return {
    grossPerPaycheck,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    totalWithholding,
    netTakeHome,
    payFrequency,
    periodsPerYear: periods,
  };
};
