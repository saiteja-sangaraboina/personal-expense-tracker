import { describe, it, expect } from 'vitest';
import { isValidEmail, validatePasswordStrength, validateTransactionInput } from '../validators';

describe('Validators Utility', () => {
  it('validates correct and incorrect email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@sub.domain.org')).toBe(true);
    expect(isValidEmail('plainaddress')).toBe(false);
    expect(isValidEmail('@missingusername.com')).toBe(false);
    expect(isValidEmail('user@.com')).toBe(false);
  });

  it('checks password length and number requirement', () => {
    const strong = validatePasswordStrength('password123');
    expect(strong.valid).toBe(true);
    expect(strong.errors).toHaveLength(0);

    const tooShort = validatePasswordStrength('p1');
    expect(tooShort.valid).toBe(false);

    const noNumber = validatePasswordStrength('passwordonly');
    expect(noNumber.valid).toBe(false);
  });

  it('validates transaction input object completeness', () => {
    const valid = validateTransactionInput({
      amount: 45.5,
      category: 'Food',
      date: '2026-11-20',
    });
    expect(valid.isValid).toBe(true);

    const invalid = validateTransactionInput({
      amount: 0,
      category: '',
      date: '',
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.amount).toBeTruthy();
    expect(invalid.errors.category).toBeTruthy();
    expect(invalid.errors.date).toBeTruthy();
  });
});
