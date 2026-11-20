import { describe, it, expect } from 'vitest';
import { convertCurrency, getExchangeRateText, EXCHANGE_RATES } from '../currencyRates';

describe('Currency Rates Utility', () => {
  it('returns same amount when currencies are identical', () => {
    expect(convertCurrency(100, 'USD', 'USD')).toBe(100);
    expect(convertCurrency(50, 'EUR', 'EUR')).toBe(50);
  });

  it('converts USD to target currencies accurately', () => {
    expect(convertCurrency(10, 'USD', 'INR')).toBe(835);
    expect(convertCurrency(100, 'USD', 'EUR')).toBe(92);
  });

  it('handles cross-currency conversion correctly (e.g. EUR to GBP)', () => {
    const converted = convertCurrency(100, 'EUR', 'GBP');
    expect(converted).toBeGreaterThan(0);
    expect(typeof converted).toBe('number');
  });

  it('returns valid rate description text', () => {
    const text = getExchangeRateText('USD', 'INR');
    expect(text).toContain('1 USD =');
    expect(text).toContain('INR');
  });
});
