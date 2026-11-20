import { describe, it, expect } from 'vitest';
import { getCurrencySymbol, formatWithSymbol } from '../currencySymbols';

describe('currencySymbols utility', () => {
  it('maps standard ISO currency codes to symbols', () => {
    expect(getCurrencySymbol('USD')).toBe('$');
    expect(getCurrencySymbol('EUR')).toBe('€');
    expect(getCurrencySymbol('GBP')).toBe('£');
    expect(getCurrencySymbol('INR')).toBe('₹');
    expect(getCurrencySymbol('JPY')).toBe('¥');
  });

  it('formats amounts with correct symbol prefix', () => {
    expect(formatWithSymbol(150, 'USD')).toBe('$150.00');
    expect(formatWithSymbol(2500, 'EUR')).toBe('€2,500.00');
  });
});
