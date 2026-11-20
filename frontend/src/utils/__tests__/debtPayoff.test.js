import { describe, it, expect } from 'vitest';
import { simulateDebtPayoff } from '../debtPayoff';

describe('debtPayoff simulator utility', () => {
  const sampleDebts = [
    { name: 'Credit Card', balance: 3000, interestRate: 18.99, minPayment: 100 },
    { name: 'Car Loan', balance: 8000, interestRate: 5.5, minPayment: 200 },
  ];

  it('handles empty debts gracefully', () => {
    const res = simulateDebtPayoff([], 100, 'avalanche');
    expect(res.monthsToDebtFree).toBe(0);
    expect(res.totalInterestPaid).toBe(0);
  });

  it('accelerates debt payoff when extra monthly payment is provided', () => {
    const slowPlan = simulateDebtPayoff(sampleDebts, 0, 'avalanche');
    const fastPlan = simulateDebtPayoff(sampleDebts, 300, 'avalanche');

    expect(fastPlan.monthsToDebtFree).toBeLessThan(slowPlan.monthsToDebtFree);
    expect(fastPlan.totalInterestPaid).toBeLessThan(slowPlan.totalInterestPaid);
  });

  it('runs avalanche and snowball strategies', () => {
    const avalanche = simulateDebtPayoff(sampleDebts, 200, 'avalanche');
    const snowball = simulateDebtPayoff(sampleDebts, 200, 'snowball');

    expect(avalanche.monthsToDebtFree).toBeGreaterThan(0);
    expect(snowball.monthsToDebtFree).toBeGreaterThan(0);
    // Avalanche should result in equal or lower total interest than snowball
    expect(avalanche.totalInterestPaid).toBeLessThanOrEqual(snowball.totalInterestPaid);
  });
});
