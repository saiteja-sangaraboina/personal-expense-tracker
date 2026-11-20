import { describe, it, expect } from 'vitest';
import { calculateSpendingVelocity } from '../spendingComparison';

describe('spendingComparison utility', () => {
  it('calculates daily burn rate and projected month-end spend accurately', () => {
    const result = calculateSpendingVelocity({
      totalSpent: 1500,
      currentDay: 15,
      daysInMonth: 30,
      previousMonthSpent: 2800,
    });

    expect(result.dailyBurnRate).toBe(100);
    expect(result.projectedMonthEnd).toBe(3000);
    expect(result.daysRemaining).toBe(15);
    expect(result.projectedRemainingSpend).toBe(1500);
    // (3000 - 2800) / 2800 = 7.14% -> 7%
    expect(result.momChangePercent).toBe(7);
    expect(result.trend).toBe('increasing');
  });

  it('detects decreasing spend trend when projection is lower than previous month', () => {
    const result = calculateSpendingVelocity({
      totalSpent: 600,
      currentDay: 10,
      daysInMonth: 30,
      previousMonthSpent: 2500,
    });

    expect(result.dailyBurnRate).toBe(60);
    expect(result.projectedMonthEnd).toBe(1800);
    expect(result.momChangePercent).toBe(-28);
    expect(result.trend).toBe('decreasing');
  });

  it('handles zero previous month spend gracefully', () => {
    const result = calculateSpendingVelocity({
      totalSpent: 400,
      currentDay: 5,
      daysInMonth: 30,
      previousMonthSpent: 0,
    });

    expect(result.dailyBurnRate).toBe(80);
    expect(result.projectedMonthEnd).toBe(2400);
    expect(result.momChangePercent).toBe(0);
    expect(result.trend).toBe('stable');
  });
});
