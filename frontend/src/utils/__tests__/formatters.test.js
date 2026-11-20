import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, calculatePercentage, abbreviateNumber } from '../formatters';

describe('Formatters Utility', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(1234.5, 'USD')).toMatch(/1,234\.50/);
  });

  it('formats zero and negative currency amounts', () => {
    expect(formatCurrency(0, 'USD')).toMatch(/0\.00/);
    expect(formatCurrency(-50, 'USD')).toMatch(/50\.00/);
  });

  it('formats dates consistently', () => {
    const testDate = '2026-11-20T10:00:00Z';
    expect(formatDate(testDate, 'short')).toBeTruthy();
    expect(formatDate(testDate, 'full')).toBeTruthy();
    expect(formatDate(null)).toBe('');
  });

  it('calculates percentages capped at 100', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(150, 100)).toBe(100);
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(50, 0)).toBe(0);
  });

  it('abbreviates thousands and millions correctly', () => {
    expect(abbreviateNumber(500)).toBe('500');
    expect(abbreviateNumber(1500)).toBe('1.5K');
    expect(abbreviateNumber(2400000)).toBe('2.4M');
  });
});
