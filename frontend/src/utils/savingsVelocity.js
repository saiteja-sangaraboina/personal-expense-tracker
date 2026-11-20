/**
 * savingsVelocity.js - Savings rate speed, runway milestones, and emergency cushion projections
 */

export const calculateSavingsVelocity = ({
  monthlyIncome = 0,
  monthlyExpenses = 0,
  currentSavings = 0,
}) => {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  const expenses = Math.max(0, Number(monthlyExpenses) || 0);
  const savings = Math.max(0, Number(currentSavings) || 0);

  const netSavingsPerMonth = income - expenses;
  const savingsRate = income > 0 ? Math.round((netSavingsPerMonth / income) * 100) : 0;

  let grade = 'C';
  if (savingsRate >= 35) grade = 'A+';
  else if (savingsRate >= 20) grade = 'A';
  else if (savingsRate >= 10) grade = 'B';
  else if (savingsRate < 0) grade = 'D';

  const milestones = [
    { label: '3-Month Buffer', target: expenses * 3 },
    { label: '6-Month Runway', target: expenses * 6 },
    { label: '1-Year Freedom', target: expenses * 12 },
  ].map((m) => {
    const remaining = Math.max(0, m.target - savings);
    let monthsToTarget = 0;
    if (remaining === 0) {
      monthsToTarget = 0;
    } else if (netSavingsPerMonth <= 0) {
      monthsToTarget = Infinity;
    } else {
      monthsToTarget = Math.ceil(remaining / netSavingsPerMonth);
    }

    return {
      label: m.label,
      targetAmount: Math.round(m.target),
      remainingAmount: Math.round(remaining),
      monthsToTarget,
      isAchieved: remaining === 0,
    };
  });

  return {
    netSavingsPerMonth: Math.round(netSavingsPerMonth * 100) / 100,
    savingsRate,
    grade,
    currentSavings: savings,
    monthlyExpenses: expenses,
    milestones,
  };
};
