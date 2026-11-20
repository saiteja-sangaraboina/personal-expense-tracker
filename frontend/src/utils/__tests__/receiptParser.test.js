import { describe, it, expect } from 'vitest';
import { parseReceiptData } from '../receiptParser';

describe('Receipt Parser Utility', () => {
  it('identifies grocery vendors and assigns Food category', () => {
    const result = parseReceiptData('trader_joes_receipt.jpg', 45.2);
    expect(result.vendor).toBe('Grocery Mart');
    expect(result.category).toBe('Food');
    expect(result.amount).toBe(45.2);
    expect(result.tax).toBeCloseTo(3.62, 1);
  });

  it('identifies transportation and gas vendors', () => {
    const result = parseReceiptData('uber_trip_receipt.png', 18.5);
    expect(result.vendor).toBe('Transportation / Gas');
    expect(result.category).toBe('Transportation');
  });

  it('assigns generic fallback values for unspecified filenames', () => {
    const result = parseReceiptData('scan_001.pdf', 99.0);
    expect(result.vendor).toBe('Retail Merchant');
    expect(result.category).toBe('Shopping');
    expect(result.amount).toBe(99.0);
  });
});
