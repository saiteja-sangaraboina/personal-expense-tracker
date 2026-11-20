import { describe, it, expect } from 'vitest';
import { formatBudgetAllocationData } from '../budgetChartData';

describe('budgetChartData utility', () => {
  it('handles empty budget lists cleanly', () => {
    const result = formatBudgetAllocationData([]);
    expect(result.chartData).toEqual([]);
    expect(result.totalBudget).toBe(0);
    expect(result.topCategory).toBe(null);
  });

  it('normalizes budget items and calculates percentage shares', () => {
    const mockBudgets = [
      { category: 'Food', monthlyLimit: 500, spent: 300 },
      { category: 'Rent', monthlyLimit: 1000, spent: 1000 },
      { category: 'Utilities', monthlyLimit: 500, spent: 200 },
    ];

    const result = formatBudgetAllocationData(mockBudgets);

    expect(result.totalBudget).toBe(2000);
    expect(result.totalSpent).toBe(1500);
    expect(result.topCategory.name).toBe('Rent');
    expect(result.topCategory.value).toBe(1000);
    expect(result.topCategory.percentage).toBe(50); // 1000 / 2000 = 50%
    expect(result.chartData[1].percentage).toBe(25);
  });
});
