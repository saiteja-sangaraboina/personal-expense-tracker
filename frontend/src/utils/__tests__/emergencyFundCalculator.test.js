import { describe, it, expect } from 'vitest';
import {
  analyzeEssentialExpenses,
  calculateEmergencyFundTargets,
} from '../emergencyFundCalculator';

describe('emergencyFundCalculator utility', () => {
  const sampleTransactions = [
    { type: 'expense', category: 'Rent', amount: 1500 },
    { type: 'expense', category: 'Food', amount: 500 },
    { type: 'expense', category: 'Shopping', amount: 400 },
    { type: 'expense', category: 'Entertainment', amount: 200 },
    { type: 'income', category: 'Salary', amount: 4000 },
  ];

  it('correctly isolates essential survival expenditures', () => {
    const res = analyzeEssentialExpenses(sampleTransactions);
    expect(res.essentialTotal).toBe(2000); // 1500 (rent) + 500 (food)
    expect(res.discretionaryTotal).toBe(600); // 400 + 200
    expect(res.essentialPercentage).toBe(77); // 2000 / 2600
  });

  it('computes 3, 6, and 12-month emergency safety reserves', () => {
    const targets = calculateEmergencyFundTargets(2000, 8000);
    expect(targets.threeMonths).toBe(6000);
    expect(targets.sixMonths).toBe(12000);
    expect(targets.twelveMonths).toBe(24000);
    expect(targets.fundedMonths).toBe(4.0);
    expect(targets.targetHealth).toBe('moderate');
  });

  it('marks secure health when funded beyond 6 months', () => {
    const targets = calculateEmergencyFundTargets(2000, 15000);
    expect(targets.fundedMonths).toBe(7.5);
    expect(targets.targetHealth).toBe('secure');
  });
});
