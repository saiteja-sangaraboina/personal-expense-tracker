import { describe, it, expect } from 'vitest';
import { calculateBudgetUtilization } from '../budgetAnalyzer';

describe('budgetAnalyzer utility', () => {
  it('returns zeroes for empty budgets array', () => {
    const result = calculateBudgetUtilization([]);
    expect(result.totalBudgeted).toBe(0);
    expect(result.overallUtilization).toBe(0);
    expect(result.categories.length).toBe(0);
  });

  it('accurately categorizes healthy, warning, and exceeded budgets', () => {
    const mockBudgets = [
      { category: 'Groceries', monthlyLimit: 500, spent: 250, alertThreshold: 80 }, // 50% healthy
      { category: 'Dining', monthlyLimit: 200, spent: 170, alertThreshold: 80 }, // 85% warning
      { category: 'Shopping', monthlyLimit: 100, spent: 130, alertThreshold: 80 }, // 130% exceeded
    ];

    const res = calculateBudgetUtilization(mockBudgets);

    expect(res.totalBudgeted).toBe(800);
    expect(res.totalSpent).toBe(550);
    expect(res.totalRemaining).toBe(250);
    expect(res.overallUtilization).toBe(69); // 550 / 800 = 68.75% -> 69%
    expect(res.healthyCount).toBe(1);
    expect(res.warningCount).toBe(1);
    expect(res.exceededCount).toBe(1);
    expect(res.categories[2].overspent).toBe(30);
  });
});
