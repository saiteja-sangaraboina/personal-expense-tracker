/**
 * Calculates a comprehensive Financial Health Score (0 - 100)
 * Evaluates:
 * 1. Savings Rate (40 pts)
 * 2. Budget Adherence (30 pts)
 * 3. Emergency Cushion (30 pts)
 */
export const calculateFinancialHealthScore = ({
  totalIncome = 0,
  totalExpenses = 0,
  budgets = [],
  emergencyFundAmount = 0,
}) => {
  if (totalIncome <= 0 && totalExpenses <= 0) {
    return {
      score: 70,
      tier: 'Good',
      color: '#10b981',
      metrics: { savingsRate: 0, budgetAdherence: 100, emergencyMonths: 0 },
      recommendations: ['Record your income and expenses to receive real-time financial health analytics.'],
    };
  }

  // 1. Savings Rate Score (0 - 40 points)
  // 20% or higher savings rate gives maximum points
  const netSavings = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;
  const savingsPoints = Math.min(40, Math.round((savingsRate / 20) * 40));

  // 2. Budget Adherence Score (0 - 30 points)
  let budgetPoints = 30;
  if (budgets.length > 0) {
    const overBudgetCount = budgets.filter((b) => b.isOverBudget).length;
    const overBudgetRatio = overBudgetCount / budgets.length;
    budgetPoints = Math.max(0, Math.round((1 - overBudgetRatio) * 30));
  }

  // 3. Emergency Cushion Score (0 - 30 points)
  // Target: 3 to 6 months of expenses
  const monthlyExpenses = totalExpenses > 0 ? totalExpenses : 1000;
  const emergencyMonths = emergencyFundAmount / monthlyExpenses;
  const emergencyPoints = Math.min(30, Math.round((emergencyMonths / 3) * 30));

  const totalScore = Math.min(100, Math.max(0, savingsPoints + budgetPoints + emergencyPoints));

  let tier = 'Needs Attention';
  let color = '#ef4444';

  if (totalScore >= 80) {
    tier = 'Excellent';
    color = '#10b981';
  } else if (totalScore >= 65) {
    tier = 'Good';
    color = '#6366f1';
  } else if (totalScore >= 50) {
    tier = 'Fair';
    color = '#f59e0b';
  }

  const recommendations = [];
  if (savingsRate < 15) {
    recommendations.push('Aim to boost your monthly savings rate to at least 15-20% of your net income.');
  }
  if (budgets.some((b) => b.isOverBudget)) {
    recommendations.push('Review categories with budget overages and adjust discretionary spending.');
  }
  if (emergencyMonths < 3) {
    recommendations.push('Build towards a 3-month emergency fund to buffer unexpected expenses.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Great job! You are maintaining strong savings habits and disciplined spending.');
  }

  return {
    score: totalScore,
    tier,
    color,
    metrics: {
      savingsRate: Math.round(savingsRate),
      budgetAdherence: Math.round((budgetPoints / 30) * 100),
      emergencyMonths: Math.round(emergencyMonths * 10) / 10,
    },
    recommendations,
  };
};
