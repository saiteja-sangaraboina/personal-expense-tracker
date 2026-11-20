import { describe, it, expect } from 'vitest';
import { forecastNextMonth } from '../forecasting';

describe('Spending Forecast Engine', () => {
  it('returns zeroes for empty historical monthly data', () => {
    const result = forecastNextMonth([]);
    expect(result.forecastExpense).toBe(0);
    expect(result.confidence).toBe('low');
  });

  it('correctly weighs more recent months higher in weighted moving average', () => {
    const historical = [
      { name: 'Jan', income: 5000, expenses: 1000 },
      { name: 'Feb', income: 5000, expenses: 2000 },
    ];
    const result = forecastNextMonth(historical);
    // Jan weight 1 (1000), Feb weight 2 (4000) -> 5000 / 3 = 1666.67
    expect(result.forecastExpense).toBeGreaterThan(1500);
    expect(result.forecastExpense).toBeLessThan(2000);
    expect(result.trend).toBe('increasing');
  });
});
