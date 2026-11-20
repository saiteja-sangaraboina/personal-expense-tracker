import { describe, it, expect } from 'vitest';
import {
  extractHashtags,
  filterTransactionsByTags,
} from '../tagHelpers';

describe('tagHelpers utility', () => {
  it('extracts hashtags cleanly from transaction descriptions', () => {
    const text = 'Flight booking to Tokyo #vacation #travel2024 with airline miles';
    const tags = extractHashtags(text);
    expect(tags).toEqual(['vacation', 'travel2024']);
  });

  it('handles descriptions without hashtags gracefully', () => {
    expect(extractHashtags('Standard grocery run')).toEqual([]);
    expect(extractHashtags('')).toEqual([]);
  });

  it('filters transactions matching any search tag', () => {
    const transactions = [
      { id: 1, description: 'Client dinner #business', tags: ['work'] },
      { id: 2, description: 'Hotel stay #vacation', tags: ['holiday'] },
      { id: 3, description: 'Coffee run', tags: [] },
    ];

    const results = filterTransactionsByTags(transactions, ['business', 'other'], 'any');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(1);
  });
});
