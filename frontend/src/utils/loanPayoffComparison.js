/**
 * loanPayoffComparison.js - Extra principal repayment accelerator and interest savings engine
 */

export const calculateLoanPayoff = ({
  principal = 20000,
  annualInterestRate = 6.5,
  monthlyPayment = 400,
  extraPayment = 100,
}) => {
  const p = Math.max(0, Number(principal) || 0);
  const r = Math.max(0, (Number(annualInterestRate) || 0) / 100 / 12);
  const basePayment = Math.max(1, Number(monthlyPayment) || 1);
  const extra = Math.max(0, Number(extraPayment) || 0);

  // 1. Baseline Schedule without extra payments
  let balanceStandard = p;
  let totalInterestStandard = 0;
  let monthsStandard = 0;

  while (balanceStandard > 0 && monthsStandard < 360) {
    monthsStandard++;
    const interest = balanceStandard * r;
    totalInterestStandard += interest;
    balanceStandard = balanceStandard + interest - basePayment;
  }

  // 2. Accelerated Schedule with extra payments
  let balanceAccelerated = p;
  let totalInterestAccelerated = 0;
  let monthsAccelerated = 0;
  const acceleratedPayment = basePayment + extra;

  while (balanceAccelerated > 0 && monthsAccelerated < 360) {
    monthsAccelerated++;
    const interest = balanceAccelerated * r;
    totalInterestAccelerated += interest;
    balanceAccelerated = balanceAccelerated + interest - acceleratedPayment;
  }

  const interestSaved = Math.max(0, Math.round((totalInterestStandard - totalInterestAccelerated) * 100) / 100);
  const monthsSaved = Math.max(0, monthsStandard - monthsAccelerated);

  return {
    originalMonths: monthsStandard,
    acceleratedMonths: monthsAccelerated,
    monthsSaved,
    totalInterestStandard: Math.round(totalInterestStandard * 100) / 100,
    totalInterestAccelerated: Math.round(totalInterestAccelerated * 100) / 100,
    interestSaved,
  };
};
