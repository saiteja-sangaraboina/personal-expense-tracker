/**
 * investmentCalculator.js - Compound interest and investment portfolio projection
 */

export const calculateCompoundInterest = ({
  principal = 1000,
  annualRate = 7,
  monthlyContribution = 100,
  years = 10,
  compoundFrequency = 12,
}) => {
  const p = Math.max(0, Number(principal) || 0);
  const r = Math.max(0, (Number(annualRate) || 0) / 100);
  const pmt = Math.max(0, Number(monthlyContribution) || 0);
  const y = Math.max(1, Math.min(50, Math.floor(Number(years) || 1)));
  const n = Math.max(1, Number(compoundFrequency) || 12);

  const schedule = [];
  let currentBalance = p;
  let totalDeposited = p;

  const ratePerPeriod = r / n;
  const periodsPerMonth = n / 12;

  for (let year = 1; year <= y; year++) {
    for (let month = 1; month <= 12; month++) {
      currentBalance += pmt;
      totalDeposited += pmt;
      // Compound for each period in this month
      currentBalance = currentBalance * Math.pow(1 + ratePerPeriod, periodsPerMonth);
    }

    const interestEarned = Math.max(0, currentBalance - totalDeposited);
    schedule.push({
      year,
      totalDeposited: Math.round(totalDeposited * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      balance: Math.round(currentBalance * 100) / 100,
    });
  }

  const finalBalance = Math.round(currentBalance * 100) / 100;
  const totalGrowth = Math.max(0, Math.round((finalBalance - totalDeposited) * 100) / 100);

  return {
    initialPrincipal: p,
    totalDeposited: Math.round(totalDeposited * 100) / 100,
    totalGrowth,
    finalBalance,
    years: y,
    annualRate,
    schedule,
  };
};

export const calculateTimeToTarget = ({
  targetAmount = 50000,
  initialDeposit = 5000,
  monthlyDeposit = 500,
  annualReturn = 7,
}) => {
  const target = Number(targetAmount) || 0;
  let balance = Math.max(0, Number(initialDeposit) || 0);
  const monthly = Math.max(0, Number(monthlyDeposit) || 0);
  const monthlyRate = Math.max(0, (Number(annualReturn) || 0) / 100 / 12);

  if (balance >= target) return { months: 0, years: 0, achieved: true };
  if (monthly === 0 && monthlyRate === 0) return { months: Infinity, years: Infinity, achieved: false };

  let months = 0;
  const maxMonths = 1200; // 100 years cutoff

  while (balance < target && months < maxMonths) {
    months++;
    balance += monthly;
    balance *= 1 + monthlyRate;
  }

  return {
    months,
    years: Math.round((months / 12) * 10) / 10,
    achieved: balance >= target,
    finalEstimate: Math.round(balance),
  };
};
