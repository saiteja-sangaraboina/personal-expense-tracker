/**
 * Projects next month's spending based on historical monthly transaction data
 * @param {Array<{ name: string, income: number, expenses: number }>} monthlyData
 */
export const forecastNextMonth = (monthlyData = []) => {
  const activeMonths = monthlyData.filter((m) => m.expenses > 0 || m.income > 0);

  if (activeMonths.length === 0) {
    return {
      forecastExpense: 0,
      forecastIncome: 0,
      confidence: 'low',
      trend: 'flat',
    };
  }

  // Calculate weighted moving average (recent months have higher weight)
  let totalExpenseWeight = 0;
  let weightedExpenseSum = 0;
  let totalIncomeWeight = 0;
  let weightedIncomeSum = 0;

  activeMonths.forEach((month, index) => {
    const weight = index + 1; // Later months get progressively higher weight
    weightedExpenseSum += month.expenses * weight;
    totalExpenseWeight += weight;

    weightedIncomeSum += month.income * weight;
    totalIncomeWeight += weight;
  });

  const forecastExpense = Math.round((weightedExpenseSum / totalExpenseWeight) * 100) / 100;
  const forecastIncome = Math.round((weightedIncomeSum / totalIncomeWeight) * 100) / 100;

  // Detect trend
  let trend = 'flat';
  if (activeMonths.length >= 2) {
    const lastMonth = activeMonths[activeMonths.length - 1].expenses;
    const prevMonth = activeMonths[activeMonths.length - 2].expenses;
    if (lastMonth > prevMonth * 1.05) trend = 'increasing';
    else if (lastMonth < prevMonth * 0.95) trend = 'decreasing';
  }

  return {
    forecastExpense,
    forecastIncome,
    projectedSavings: Math.max(0, forecastIncome - forecastExpense),
    confidence: activeMonths.length >= 3 ? 'high' : 'medium',
    trend,
  };
};
