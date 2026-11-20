import { describe, it, expect } from 'vitest';
import {
  calculateNetWorth,
  calculateAssetAllocation,
  calculateRunway,
} from '../netWorthCalculator';

describe('netWorthCalculator utility', () => {
  const sampleAssets = [
    { name: 'Checking Account', category: 'Cash', value: 5000 },
    { name: 'Index Funds', category: 'Investments', value: 20000 },
    { name: 'Vehicle', category: 'Physical', value: 15000 },
  ];

  const sampleLiabilities = [
    { name: 'Credit Card', category: 'Revolving', value: 2000 },
    { name: 'Auto Loan', category: 'Installment', value: 8000 },
  ];

  it('calculates net worth, totals, and debt-to-asset ratio accurately', () => {
    const res = calculateNetWorth(sampleAssets, sampleLiabilities);
    expect(res.totalAssets).toBe(40000);
    expect(res.totalLiabilities).toBe(10000);
    expect(res.netWorth).toBe(30000);
    expect(res.debtToAssetRatio).toBe(25);
    expect(res.solvencyStatus).toBe('excellent');
  });

  it('marks caution and warning status when debt ratio is elevated', () => {
    const highDebt = [{ name: 'Mortgage', value: 90000 }];
    const lowAssets = [{ name: 'Cash', value: 100000 }];
    const res = calculateNetWorth(lowAssets, highDebt);
    expect(res.debtToAssetRatio).toBe(90);
    expect(res.solvencyStatus).toBe('warning');
  });

  it('calculates asset class allocation percentages', () => {
    const allocation = calculateAssetAllocation(sampleAssets);
    expect(allocation.Cash.total).toBe(5000);
    expect(allocation.Investments.percentage).toBe(50); // 20k / 40k = 50%
  });

  it('computes financial runway months accurately', () => {
    expect(calculateRunway(15000, 3000)).toBe(5.0);
    expect(calculateRunway(0, 2000)).toBe(0);
    expect(calculateRunway(5000, 0)).toBe(999);
  });
});
