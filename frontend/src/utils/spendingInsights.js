/**
 * spendingInsights.js
 * Generates natural-language spending insights from transaction history.
 */

/**
 * Group transactions by category and sum amounts.
 * @param {Array} transactions
 * @returns {Object} { category: totalAmount }
 */
export function sumByCategory(transactions) {
  return transactions.reduce((acc, t) => {
    if (t.type !== 'expense') return acc;
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
}

/**
 * Compare current month spending vs previous month spending per category.
 * @param {Array} current  - transactions this month
 * @param {Array} previous - transactions last month
 * @returns {Array} [{ category, change, pct, direction }]
 */
export function categoryChanges(current, previous) {
  const curr = sumByCategory(current);
  const prev = sumByCategory(previous);

  const allCategories = new Set([...Object.keys(curr), ...Object.keys(prev)]);
  const changes = [];

  for (const cat of allCategories) {
    const c = curr[cat] || 0;
    const p = prev[cat] || 0;
    if (p === 0 && c === 0) continue;

    const change = c - p;
    const pct = p === 0 ? 100 : Math.round((change / p) * 100);
    changes.push({ category: cat, change, pct, direction: change >= 0 ? 'up' : 'down' });
  }

  return changes.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));
}

/**
 * Find top spending categories from a list of transactions.
 * @param {Array} transactions
 * @param {number} limit
 * @returns {Array} [{ category, total }]
 */
export function topCategories(transactions, limit = 3) {
  const sums = sumByCategory(transactions);
  return Object.entries(sums)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

/**
 * Generate human-readable insight strings.
 * @param {Array} current  - this month's transactions
 * @param {Array} previous - last month's transactions
 * @returns {Array<string>} Array of insight messages
 */
export function generateInsights(current, previous) {
  const insights = [];

  // Insight 1: Total spending comparison
  const totalCurr = current.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalPrev = previous.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  if (totalPrev > 0) {
    const diff = totalCurr - totalPrev;
    const pct = Math.abs(Math.round((diff / totalPrev) * 100));
    if (diff > 0) {
      insights.push(`You spent ${pct}% more this month compared to last month.`);
    } else if (diff < 0) {
      insights.push(`Great job! You spent ${pct}% less this month than last month.`);
    } else {
      insights.push('Your total spending this month matches last month exactly.');
    }
  }

  // Insight 2: Biggest category change
  const changes = categoryChanges(current, previous);
  if (changes.length > 0) {
    const top = changes[0];
    const dir = top.direction === 'up' ? 'increased' : 'decreased';
    insights.push(`Your ${top.category} spending ${dir} by ${Math.abs(top.pct)}% this month.`);
  }

  // Insight 3: Top spending category this month
  const tops = topCategories(current, 1);
  if (tops.length > 0) {
    insights.push(`${tops[0].category} is your biggest expense this month at $${tops[0].total.toFixed(2)}.`);
  }

  // Insight 4: Savings rate
  const totalIncome = current.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  if (totalIncome > 0) {
    const savingsRate = Math.round(((totalIncome - totalCurr) / totalIncome) * 100);
    if (savingsRate >= 20) {
      insights.push(`You're saving ${savingsRate}% of your income — excellent financial discipline!`);
    } else if (savingsRate > 0) {
      insights.push(`Your savings rate this month is ${savingsRate}%. Aim for 20%+ for financial health.`);
    } else {
      insights.push('You spent more than you earned this month. Consider reviewing your budget.');
    }
  }

  return insights.slice(0, 4);
}

export default { generateInsights, categoryChanges, topCategories, sumByCategory };
