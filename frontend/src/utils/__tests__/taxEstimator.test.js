import { describe, it, expect } from 'vitest';
import {
  estimateFederalTax,
  estimateSelfEmploymentTax,
  STANDARD_DEDUCTION_2024_SINGLE,
} from '../taxEstimator';

describe('taxEstimator utility', () => {
  it('calculates federal tax for income below standard deduction as zero', () => {
    const res = estimateFederalTax(12000, STANDARD_DEDUCTION_2024_SINGLE);
    expect(res.taxableIncome).toBe(0);
    expect(res.totalTax).toBe(0);
    expect(res.effectiveRate).toBe(0);
  });

  it('calculates progressive tax brackets accurately', () => {
    // Gross 60,000 - 14,600 = 45,400 taxable
    // First 11,600 @ 10% = 1,160
    // Remaining (45,400 - 11,600) = 33,800 @ 12% = 4,056
    // Total = 5,216
    const res = estimateFederalTax(60000, STANDARD_DEDUCTION_2024_SINGLE);
    expect(res.taxableIncome).toBe(45400);
    expect(res.totalTax).toBe(5216);
    expect(res.marginalRate).toBe(12);
    expect(res.effectiveRate).toBe(8.7);
  });

  it('estimates self employment tax accurately', () => {
    const seTax = estimateSelfEmploymentTax(20000);
    // 20000 * 0.9235 * 0.153 = 2825.91 => 2826
    expect(seTax).toBe(2826);
  });
});
