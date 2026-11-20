import { describe, it, expect } from 'vitest';
import {
  splitBillEqually,
  splitBillByPercentages,
} from '../billSplitter';

describe('billSplitter utility', () => {
  it('splits bill equally among participants with tip and tax', () => {
    // 100 subtotal, 15% tip ($15), 10% tax ($10) => $125 grandTotal
    // 4 people => $31.25 each
    const res = splitBillEqually(100, 4, 15, 10);
    expect(res.subtotal).toBe(100);
    expect(res.tipAmount).toBe(15);
    expect(res.taxAmount).toBe(10);
    expect(res.grandTotal).toBe(125);
    expect(res.perPerson).toBe(31.25);
  });

  it('handles single participant and zero tips safely', () => {
    const res = splitBillEqually(50, 1, 0, 0);
    expect(res.grandTotal).toBe(50);
    expect(res.perPerson).toBe(50);
  });

  it('splits bills accurately by custom percentages', () => {
    const shares = [
      { name: 'Alice', percentage: 60 },
      { name: 'Bob', percentage: 40 },
    ];
    const res = splitBillByPercentages(200, shares);
    expect(res[0].amount).toBe(120);
    expect(res[1].amount).toBe(80);
  });
});
