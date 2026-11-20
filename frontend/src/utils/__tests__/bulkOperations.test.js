import { describe, it, expect } from 'vitest';
import {
  bulkUpdateCategory,
  bulkAddTag,
  bulkRemoveTransactions,
} from '../bulkOperations';

describe('bulkOperations utility', () => {
  const sampleTxs = [
    { _id: '1', title: 'Coffee', category: 'Food', tags: ['daily'] },
    { _id: '2', title: 'Uber', category: 'Transportation', tags: [] },
    { _id: '3', title: 'Lunch', category: 'Food', tags: ['daily'] },
  ];

  it('updates category for targeted transaction IDs', () => {
    const updated = bulkUpdateCategory(sampleTxs, ['1', '2'], 'Dining');
    expect(updated[0].category).toBe('Dining');
    expect(updated[1].category).toBe('Dining');
    expect(updated[2].category).toBe('Food'); // untouched
  });

  it('adds tags to targeted transactions without duplicates', () => {
    const updated = bulkAddTag(sampleTxs, ['1', '2'], 'tax-exempt');
    expect(updated[0].tags).toContain('tax-exempt');
    expect(updated[1].tags).toContain('tax-exempt');

    // Adding existing tag shouldn't duplicate
    const reAdded = bulkAddTag(updated, ['1'], 'tax-exempt');
    expect(reAdded[0].tags.filter((t) => t === 'tax-exempt').length).toBe(1);
  });

  it('removes matching transactions by ID array', () => {
    const remaining = bulkRemoveTransactions(sampleTxs, ['2']);
    expect(remaining.length).toBe(2);
    expect(remaining.find((t) => t._id === '2')).toBeUndefined();
  });
});
