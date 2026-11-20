import { describe, it, expect } from 'vitest';
import {
  calculateFireMilestones,
  classifyFireType,
} from '../fireCalculator';

describe('fireCalculator utility', () => {
  it('calculates 4% rule target as 25x annual expenses', () => {
    const res = calculateFireMilestones(40000, 100000, 20000, 0.07);
    expect(res.fireTarget).toBe(1000000); // 40,000 * 25 = 1,000,000
    expect(res.currentProgressPct).toBe(10.0);
    expect(res.yearsToFire).toBeGreaterThan(0);
    expect(res.yearsToFire).toBeLessThan(35);
  });

  it('recognizes when user has already reached FIRE target', () => {
    const res = calculateFireMilestones(40000, 1200000, 10000, 0.07);
    expect(res.currentProgressPct).toBe(100);
    expect(res.yearsToFire).toBe(0);
  });

  it('classifies FIRE categories properly', () => {
    expect(classifyFireType(35000)).toBe('Lean FIRE');
    expect(classifyFireType(65000)).toBe('Regular FIRE');
    expect(classifyFireType(120000)).toBe('Fat FIRE');
  });
});
