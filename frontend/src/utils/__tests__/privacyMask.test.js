import { describe, it, expect } from 'vitest';
import { maskCurrencyAmount, maskAccountNumber } from '../privacyMask';

describe('privacyMask utility', () => {
  it('masks currency amounts when privacy mode is active', () => {
    expect(maskCurrencyAmount(1250.5, true)).toBe('••••••');
    expect(maskCurrencyAmount(1250.5, false)).toBe('$1,250.50');
  });

  it('masks account numbers to only show last 4 digits', () => {
    expect(maskAccountNumber('123456789012')).toBe('•••• 9012');
    expect(maskAccountNumber('4521')).toBe('4521');
    expect(maskAccountNumber(null)).toBe('••••');
  });
});
