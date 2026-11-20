/**
 * budgetPlanner.js
 * Intelligent budget planning and automated limit suggestion engine.
 */

/**
 * Calculates 50/30/20 budget breakdown based on net monthly income.
 * 50% Needs, 30% Wants, 20% Savings
 * @param {number} monthlyIncome
 * @returns {{ needs: number, wants: number, savings: number }}
 */
export function calculate503020Rule(monthlyIncome) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  return {
    needs: Math.round(income * 0.5),
    wants: Math.round(income * 0.3),
    savings: Math.round(income * 0.2),
  };
}

/**
 * Suggest recommended budget limits for categories based on past expense history.
 * Adds a configurable safety margin (default 10%).
 * @param {Array<{ category: string, amount: number, type?: string }>} transactions
 * @param {number} safetyBufferPercent (e.g. 10 for +10%)
 * @returns {Array<{ category: string, averageSpent: number, suggestedLimit: number, transactionCount: number }>}
 */
export function suggestCategoryBudgets(transactions = [], safetyBufferPercent = 10) {
  const expenses = transactions.filter((t) => t.type === 'expense' || !t.type);
  if (expenses.length === 0) return [];

  const categoryMap = {};

  for (const t of expenses) {
    const cat = t.category || 'Other';
    if (!categoryMap[cat]) {
      categoryMap[cat] = { total: 0, count: 0 };
    }
    categoryMap[cat].total += Number(t.amount) || 0;
    categoryMap[cat].count += 1;
  }

  const bufferMultiplier = 1 + Math.max(0, safetyBufferPercent) / 100;

  return Object.entries(categoryMap).map(([category, data]) => {
    const averageSpent = Math.round(data.total);
    const buffered = Math.round(data.total * bufferMultiplier);
    const suggestedLimit = Math.ceil(buffered / 10) * 10;
    return {
      category,
      averageSpent,
      suggestedLimit,
      transactionCount: data.count,
    };
  }).sort((a, b) => b.suggestedLimit - a.suggestedLimit);
}

/**
 * Analyze existing budgets and highlight potential risks (e.g. limit too tight or already near limit).
 * @param {Array<{ category: string, monthlyLimit: number, spent: number }>} budgets
 * @returns {Array<{ category: string, riskLevel: 'high' | 'medium' | 'low', advice: string }>}
 */
export function analyzeBudgetRisks(budgets = []) {
  return budgets.map((b) => {
    const limit = Number(b.monthlyLimit) || 1;
    const spent = Number(b.spent) || 0;
    const pct = Math.round((spent / limit) * 100);

    if (pct >= 100) {
      return {
        category: b.category,
        riskLevel: 'high',
        advice: `Exceeded budget by ${(pct - 100)}%. Consider increasing allocation or pausing discretionary expenses.`,
      };
    } else if (pct >= 80) {
      return {
        category: b.category,
        riskLevel: 'medium',
        advice: `Used ${pct}% of budget. Approaching cap with only $${(limit - spent).toFixed(2)} remaining.`,
      };
    } else {
      return {
        category: b.category,
        riskLevel: 'low',
        advice: `Healthy spending pace at ${pct}% of limit.`,
      };
    }
  });
}
