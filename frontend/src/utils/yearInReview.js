/**
 * yearInReview.js
 * Generates an annual financial retrospective and wrapped recap from transactions.
 */

/**
 * Generate year-in-review summary metrics.
 * @param {Array<{ amount: number, type: string, category: string, date: string, description?: string }>} transactions
 * @param {number} year
 * @returns {{
 *   year: number,
 *   totalSpent: number,
 *   totalEarned: number,
 *   netSavings: number,
 *   savingsRate: number,
 *   topCategory: { name: string, amount: number },
 *   biggestExpense: { description: string, amount: number, date: string },
 *   activeDaysCount: number
 * }}
 */
export function generateYearInReview(transactions = [], year = new Date().getFullYear()) {
  const filtered = transactions.filter((t) => {
    if (!t.date) return false;
    return new Date(t.date).getFullYear() === year;
  });

  let totalSpent = 0;
  let totalEarned = 0;
  const categoryTotals = {};
  let biggestExpense = { description: 'None', amount: 0, date: '' };
  const uniqueDays = new Set();

  for (const t of filtered) {
    const amount = Number(t.amount) || 0;
    const dateStr = t.date.split('T')[0];
    uniqueDays.add(dateStr);

    if (t.type === 'expense') {
      totalSpent += amount;
      const cat = t.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;

      if (amount > biggestExpense.amount) {
        biggestExpense = {
          description: t.description || t.category || 'Expense',
          amount,
          date: dateStr,
        };
      }
    } else if (t.type === 'income') {
      totalEarned += amount;
    }
  }

  let topCategory = { name: 'None', amount: 0 };
  for (const [name, amount] of Object.entries(categoryTotals)) {
    if (amount > topCategory.amount) {
      topCategory = { name, amount: Math.round(amount) };
    }
  }

  const netSavings = Math.round(totalEarned - totalSpent);
  const savingsRate = totalEarned > 0 ? Math.round((netSavings / totalEarned) * 100) : 0;

  return {
    year,
    totalSpent: Math.round(totalSpent),
    totalEarned: Math.round(totalEarned),
    netSavings,
    savingsRate,
    topCategory,
    biggestExpense,
    activeDaysCount: uniqueDays.size,
  };
}
