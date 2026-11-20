/**
 * budgetChartData.js - Prepares normalized category budget allocation and progress for visual charts
 */

export const formatBudgetAllocationData = (budgets = []) => {
  if (!Array.isArray(budgets) || budgets.length === 0) {
    return {
      chartData: [],
      totalBudget: 0,
      totalSpent: 0,
      topCategory: null,
    };
  }

  let totalBudget = 0;
  let totalSpent = 0;

  const chartData = budgets.map((b) => {
    const limit = Number(b.monthlyLimit) || 0;
    const spent = Number(b.spent) || 0;
    totalBudget += limit;
    totalSpent += spent;

    return {
      name: b.category || 'General',
      value: limit,
      spent,
      remaining: Math.max(0, limit - spent),
      percentage: 0, // calculated below
    };
  });

  // Calculate percentage shares
  chartData.forEach((item) => {
    item.percentage = totalBudget > 0 ? Math.round((item.value / totalBudget) * 100) : 0;
  });

  // Sort descending by budget value
  chartData.sort((a, b) => b.value - a.value);

  return {
    chartData,
    totalBudget,
    totalSpent,
    topCategory: chartData[0] || null,
  };
};
