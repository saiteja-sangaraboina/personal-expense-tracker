import { describe, it, expect } from 'vitest';
import { analyzeIncomeStreams } from '../incomeAnalytics';

describe('incomeAnalytics utility', () => {
  it('returns baseline when no income transactions are present', () => {
    const res = analyzeIncomeStreams([]);
    expect(res.totalIncome).toBe(0);
    expect(res.streamCount).toBe(0);
    expect(res.concentrationRisk).toBe('No Income Data');
  });

  it('detects high concentration when single employer accounts for majority of income', () => {
    const transactions = [
      { type: 'income', category: 'Salary', amount: 5000 },
      { type: 'income', category: 'Freelance', amount: 300 },
      { type: 'expense', category: 'Rent', amount: 1200 },
    ];

    const res = analyzeIncomeStreams(transactions);
    expect(res.totalIncome).toBe(5300);
    expect(res.streamCount).toBe(2);
    expect(res.topStream.category).toBe('Salary');
    expect(res.topStream.percentage).toBeGreaterThan(90);
    expect(res.concentrationRisk).toBe('High Concentration');
    expect(res.diversificationScore).toBe(30);
  });

  it('recognizes well-diversified multiple revenue streams', () => {
    const transactions = [
      { type: 'income', category: 'Salary', amount: 3000 },
      { type: 'income', category: 'Freelance', amount: 2000 },
      { type: 'income', category: 'Dividends', amount: 1500 },
    ];

    const res = analyzeIncomeStreams(transactions);
    expect(res.totalIncome).toBe(6500);
    expect(res.streamCount).toBe(3);
    expect(res.topStream.percentage).toBeLessThan(50);
    expect(res.concentrationRisk).toBe('Well Diversified');
    expect(res.diversificationScore).toBe(95);
  });
});
