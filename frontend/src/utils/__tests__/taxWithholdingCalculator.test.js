import { describe, it, expect } from 'vitest';
import { estimatePaycheckWithholding } from '../taxWithholdingCalculator';

describe('taxWithholdingCalculator utility', () => {
  it('accurately estimates biweekly paycheck withholding and net take-home pay', () => {
    const res = estimatePaycheckWithholding({
      annualGross: 52000,
      filingStatus: 'single',
      payFrequency: 'biweekly',
    });

    expect(res.periodsPerYear).toBe(26);
    expect(res.grossPerPaycheck).toBe(2000); // 52000 / 26 = 2000
    expect(res.socialSecurity).toBe(124); // 2000 * 0.062 = 124
    expect(res.medicare).toBe(29); // 2000 * 0.0145 = 29
    expect(res.netTakeHome).toBeGreaterThan(1400);
    expect(res.netTakeHome).toBeLessThan(2000);
  });

  it('handles monthly pay schedule calculations', () => {
    const res = estimatePaycheckWithholding({
      annualGross: 120000,
      payFrequency: 'monthly',
    });

    expect(res.periodsPerYear).toBe(12);
    expect(res.grossPerPaycheck).toBe(10000);
    expect(res.netTakeHome).toBeGreaterThan(6500);
  });
});
