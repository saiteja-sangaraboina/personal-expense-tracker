/**
 * budgetAnalyzer.js - Computes envelope allocation, risk classification, and spending headroom
 */

export const calculateBudgetUtilization = (budgets = []) => {
  if (!Array.isArray(budgets) || budgets.length === 0) {
    return {
      totalBudgeted: 0,
      totalSpent: 0,
      totalRemaining: 0,
      overallUtilization: 0,
      healthyCount: 0,
      warningCount: 0,
      exceededCount: 0,
      categories: [],
    };
  }

  let totalBudgeted = 0;
  let totalSpent = 0;
  let healthyCount = 0;
  let warningCount = 0;
  let exceededCount = 0;

  const categories = budgets.map((b) => {
    const limit = Number(b.monthlyLimit) || 0;
    const spent = Number(b.spent) || 0;
    const alertThreshold = Number(b.alertThreshold) || 80;

    totalBudgeted += limit;
    totalSpent += spent;

    const percentage = limit > 0 ? Math.round((spent / limit) * 100) : 0;
    const remaining = Math.max(0, limit - spent);
    const overspent = Math.max(0, spent - limit);

    let status = 'healthy';
    if (percentage >= 100) {
      status = 'exceeded';
      exceededCount++;
    } else if (percentage >= alertThreshold) {
      status = 'warning';
      warningCount++;
    } else {
      healthyCount++;
    }

    return {
      category: b.category,
      monthlyLimit: limit,
      spent,
      remaining,
      overspent,
      percentage,
      status,
    };
  });

  const totalRemaining = Math.max(0, totalBudgeted - totalSpent);
  const overallUtilization = totalBudgeted > 0 ? Math.round((totalSpent / totalBudgeted) * 100) : 0;

  return {
    totalBudgeted,
    totalSpent,
    totalRemaining,
    overallUtilization,
    healthyCount,
    warningCount,
    exceededCount,
    categories,
  };
};
