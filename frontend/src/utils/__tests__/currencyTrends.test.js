import { describe, it, expect } from 'vitest';
import { getCurrencyTrendData } from '../currencyTrends';

describe('currencyTrends utility', () => {
  it('generates multi-day trend dataset for given currency pair', () => {
    const trend = getCurrencyTrendData('USD', 'EUR', 7);

    expect(trend.from).toBe('USD');
    expect(trend.to).toBe('EUR');
    expect(trend.trendData.length).toBe(7);
    expect(trend.currentRate).toBeGreaterThan(0);
    expect(trend.minRate).toBeLessThanOrEqual(trend.maxRate);
    expect(trend.avgRate).toBeGreaterThan(0);
    expect(trend.volatilityPercentage).toBeGreaterThanOrEqual(0);
  });

  it('handles custom day intervals within constraints', () => {
    const trend = getCurrencyTrendData('USD', 'GBP', 5);
    expect(trend.trendData.length).toBe(5);
  });
});
