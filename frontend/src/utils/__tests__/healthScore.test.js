import { describe, it, expect } from 'vitest';
import { calculateFinancialHealthScore } from '../healthScore';

describe('Financial Health Score Engine', () => {
  it('returns default baseline score for new accounts without data', () => {
    const result = calculateFinancialHealthScore({ totalIncome: 0, totalExpenses: 0 });
    expect(result.score).toBe(70);
    expect(result.tier).toBe('Good');
    expect(result.recommendations).toHaveLength(1);
  });

  it('calculates high score for healthy savings rate and intact budgets', () => {
    const result = calculateFinancialHealthScore({
      totalIncome: 10000,
      totalExpenses: 6000,
      budgets: [{ isOverBudget: false }, { isOverBudget: false }],
      emergencyFundAmount: 18000, // 3 months
    });
    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.tier).toBe('Excellent');
    expect(result.metrics.savingsRate).toBe(40);
  });

  it('lowers score and produces warning recommendations when over budget', () => {
    const result = calculateFinancialHealthScore({
      totalIncome: 3000,
      totalExpenses: 3200, // spending > income
      budgets: [{ isOverBudget: true }],
      emergencyFundAmount: 500,
    });
    expect(result.score).toBeLessThan(50);
    expect(result.tier).toBe('Needs Attention');
    expect(result.recommendations.length).toBeGreaterThanOrEqual(2);
  });
});
