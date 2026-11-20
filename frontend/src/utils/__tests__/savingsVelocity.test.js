import { describe, it, expect } from 'vitest';
import { calculateSavingsVelocity } from '../savingsVelocity';

describe('savingsVelocity utility', () => {
  it('calculates savings rate and assigned financial grade', () => {
    const res = calculateSavingsVelocity({
      monthlyIncome: 5000,
      monthlyExpenses: 3500,
      currentSavings: 7000,
    });

    expect(res.netSavingsPerMonth).toBe(1500);
    expect(res.savingsRate).toBe(30);
    expect(res.grade).toBe('A');
  });

  it('calculates milestone projections accurately', () => {
    const res = calculateSavingsVelocity({
      monthlyIncome: 6000,
      monthlyExpenses: 3000,
      currentSavings: 9000, // 3 months already saved
    });

    // 3-month target is 9000, so already achieved
    expect(res.milestones[0].isAchieved).toBe(true);
    expect(res.milestones[0].monthsToTarget).toBe(0);

    // 6-month target is 18000, remaining 9000 at 3000/mo = 3 months
    expect(res.milestones[1].isAchieved).toBe(false);
    expect(res.milestones[1].monthsToTarget).toBe(3);
  });

  it('handles negative cashflow gracefully', () => {
    const res = calculateSavingsVelocity({
      monthlyIncome: 2000,
      monthlyExpenses: 2500,
      currentSavings: 1000,
    });

    expect(res.netSavingsPerMonth).toBe(-500);
    expect(res.savingsRate).toBe(-25);
    expect(res.grade).toBe('D');
    expect(res.milestones[0].monthsToTarget).toBe(Infinity);
  });
});
