import { describe, it, expect } from 'vitest';
import {
  calculateTotalBalance,
  groupAccountsByType,
  maskAccountId,
} from '../accountHelpers';

describe('accountHelpers utility', () => {
  const sampleAccounts = [
    { name: 'Primary Checking', type: 'bank', balance: 3200 },
    { name: 'Emergency Fund', type: 'savings', balance: 10000 },
    { name: 'Credit Card', type: 'credit_card', balance: 1200 },
    { name: 'Wallet Cash', type: 'cash', balance: 150 },
  ];

  it('accurately calculates net consolidated balance factoring liabilities', () => {
    // 3200 + 10000 - 1200 + 150 = 12150
    expect(calculateTotalBalance(sampleAccounts)).toBe(12150);
  });

  it('groups account balances by category type', () => {
    const groups = groupAccountsByType(sampleAccounts);
    expect(groups.bank).toBe(3200);
    expect(groups.savings).toBe(10000);
    expect(groups.credit_card).toBe(1200);
    expect(groups.cash).toBe(150);
  });

  it('masks account strings securely', () => {
    expect(maskAccountId('1234567890123456')).toBe('•••• 3456');
    expect(maskAccountId('999')).toBe('999');
  });
});
