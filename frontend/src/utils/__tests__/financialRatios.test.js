import { describe, it, expect } from 'vitest';
import { calculateFinancialRatios } from '../financialRatios';

describe('financialRatios utility', () => {
  it('accurately calculates healthy financial ratios and benchmarks', () => {
    const res = calculateFinancialRatios({
      monthlyIncome: 6000,
      monthlyExpenses: 3600,
      monthlyDebtService: 600,
      totalDebt: 15000,
      totalAssets: 60000,
      liquidCash: 18000,
    });

    expect(res.savingsRate).toBe(40); // (6000 - 3600) / 6000 = 40%
    expect(res.savingsStatus).toBe('Optimal');
    expect(res.dti).toBe(10); // 600 / 6000 = 10%
    expect(res.dtiStatus).toBe('Healthy');
    expect(res.liquidityMonths).toBe(5); // 18000 / 3600 = 5
    expect(res.liquidityStatus).toBe('Target Met');
    expect(res.solvencyRatio).toBe(75); // (60000 - 15000) / 60000 = 75%
    expect(res.grade).toBe('A+');
  });

  it('correctly handles low liquidity and high debt pressure', () => {
    const res = calculateFinancialRatios({
      monthlyIncome: 3000,
      monthlyExpenses: 2800,
      monthlyDebtService: 1500,
      totalDebt: 45000,
      totalAssets: 20000,
      liquidCash: 500,
    });

    expect(res.savingsRate).toBe(7);
    expect(res.savingsStatus).toBe('Needs Focus');
    expect(res.dti).toBe(50);
    expect(res.dtiStatus).toBe('High Risk');
    expect(res.liquidityMonths).toBeCloseTo(0.2, 1);
    expect(res.liquidityStatus).toBe('Low Buffer');
    expect(res.compositeScore).toBeLessThan(40);
  });
});
