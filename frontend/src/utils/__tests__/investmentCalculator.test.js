import { describe, it, expect } from 'vitest';
import { calculateCompoundInterest, calculateTimeToTarget } from '../investmentCalculator';

describe('investmentCalculator utility', () => {
  it('correctly calculates compound interest over 5 years', () => {
    const result = calculateCompoundInterest({
      principal: 1000,
      annualRate: 10,
      monthlyContribution: 100,
      years: 5,
    });

    expect(result.initialPrincipal).toBe(1000);
    expect(result.years).toBe(5);
    // Principal (1000) + 5 years * 12 months * 100 = 7000 deposited
    expect(result.totalDeposited).toBe(7000);
    expect(result.finalBalance).toBeGreaterThan(8500);
    expect(result.totalGrowth).toBeGreaterThan(1500);
    expect(result.schedule.length).toBe(5);
    expect(result.schedule[4].year).toBe(5);
  });

  it('handles zero monthly contribution', () => {
    const result = calculateCompoundInterest({
      principal: 1000,
      annualRate: 10,
      monthlyContribution: 0,
      years: 1,
    });

    expect(result.totalDeposited).toBe(1000);
    // 1000 * (1 + 0.10/12)^12 approx 1104.71
    expect(result.finalBalance).toBeCloseTo(1104.71, 0);
  });

  it('calculates time to reach savings target', () => {
    const timeRes = calculateTimeToTarget({
      targetAmount: 10000,
      initialDeposit: 1000,
      monthlyDeposit: 300,
      annualReturn: 6,
    });

    expect(timeRes.achieved).toBe(true);
    expect(timeRes.months).toBeGreaterThan(20);
    expect(timeRes.months).toBeLessThan(35);
  });
});
