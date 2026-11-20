import { describe, it, expect } from 'vitest';
import { parseTransactionCsv } from '../csvParser';

describe('CSV Parser Utility', () => {
  it('returns empty array for invalid or empty text', () => {
    expect(parseTransactionCsv('')).toEqual([]);
    expect(parseTransactionCsv(null)).toEqual([]);
    expect(parseTransactionCsv('Header only\n')).toEqual([]);
  });

  it('correctly parses standard bank CSV rows', () => {
    const sampleCsv = `Date,Description,Amount,Category,Type
2026-11-01,Monthly Salary,5000,Salary,income
2026-11-02,Grocery Store,125.50,Food,expense
2026-11-05,Coffee,4.75,Food,expense`;

    const result = parseTransactionCsv(sampleCsv);
    expect(result).toHaveLength(3);
    expect(result[0].amount).toBe(5000);
    expect(result[0].type).toBe('income');
    expect(result[1].description).toBe('Grocery Store');
    expect(result[1].amount).toBe(125.50);
  });

  it('handles negative numbers as positive amounts with appropriate types', () => {
    const sampleCsv = `Date,Description,Amount,Category
2026-11-10,Gas Station,-45.00,Transportation`;

    const result = parseTransactionCsv(sampleCsv);
    expect(result).toHaveLength(1);
    expect(result[0].amount).toBe(45);
    expect(result[0].category).toBe('Transportation');
  });
});
