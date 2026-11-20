import { describe, it, expect } from 'vitest';
import { calculateLoanPayoff } from '../loanPayoffComparison';

describe('loanPayoffComparison utility', () => {
  it('calculates interest saved and time shaved off with extra monthly repayments', () => {
    const res = calculateLoanPayoff({
      principal: 15000,
      annualInterestRate: 6.0,
      monthlyPayment: 300,
      extraPayment: 100, // total 400/mo
    });

    expect(res.originalMonths).toBeGreaterThan(res.acceleratedMonths);
    expect(res.monthsSaved).toBeGreaterThan(10);
    expect(res.interestSaved).toBeGreaterThan(400);
  });

  it('handles zero extra payments as identical baseline', () => {
    const res = calculateLoanPayoff({
      principal: 10000,
      annualInterestRate: 5.0,
      monthlyPayment: 250,
      extraPayment: 0,
    });

    expect(res.monthsSaved).toBe(0);
    expect(res.interestSaved).toBe(0);
  });
});
