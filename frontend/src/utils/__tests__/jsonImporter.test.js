import { describe, it, expect } from 'vitest';
import { validateBackupArchive } from '../jsonImporter';

describe('jsonImporter utility', () => {
  it('validates a well-formed GDPR backup JSON file', () => {
    const validJson = JSON.stringify({
      exportedAt: '2026-06-15T12:00:00.000Z',
      account: { name: 'Alice Smith', email: 'alice@example.com' },
      data: {
        transactions: [{ title: 'Groceries', amount: 80 }],
        budgets: [{ category: 'Food', monthlyLimit: 500 }],
        goals: [],
      },
    });

    const res = validateBackupArchive(validJson);
    expect(res.isValid).toBe(true);
    expect(res.accountName).toBe('Alice Smith');
    expect(res.counts.transactions).toBe(1);
    expect(res.counts.budgets).toBe(1);
    expect(res.counts.goals).toBe(0);
  });

  it('rejects invalid JSON syntax or missing timestamp', () => {
    expect(validateBackupArchive('{ not valid json').isValid).toBe(false);
    expect(validateBackupArchive('{"data": {}}').isValid).toBe(false);
  });
});
