import { describe, it, expect } from 'vitest';
import { generateReceiptVoucherHtml } from '../receiptGenerator';

describe('receiptGenerator utility', () => {
  it('generates well-structured HTML receipt voucher with price and metadata', () => {
    const tx = {
      title: 'Espresso Bar',
      amount: 4.75,
      category: 'Food',
      type: 'expense',
      paymentMethod: 'Credit Card',
      date: '2026-06-15',
    };

    const html = generateReceiptVoucherHtml(tx);

    expect(html).toContain('Expense Receipt Voucher');
    expect(html).toContain('Espresso Bar');
    expect(html).toContain('$4.75');
    expect(html).toContain('Credit Card');
  });

  it('handles null transactions gracefully', () => {
    expect(generateReceiptVoucherHtml(null)).toBe('');
  });
});
