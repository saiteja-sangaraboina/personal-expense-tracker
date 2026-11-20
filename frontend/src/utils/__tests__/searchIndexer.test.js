import { describe, it, expect } from 'vitest';
import {
  tokenizeQuery,
  scoreTransactionMatch,
  filterTransactionsByQuery,
} from '../searchIndexer';

describe('searchIndexer utility', () => {
  it('tokenizes search queries including tags and price thresholds', () => {
    const query = 'groceries #essentials >50 <200';
    const parsed = tokenizeQuery(query);

    expect(parsed.tokens).toEqual(['groceries']);
    expect(parsed.tags).toEqual(['essentials']);
    expect(parsed.minAmount).toBe(50);
    expect(parsed.maxAmount).toBe(200);
  });

  it('filters transactions matching search terms and tags', () => {
    const transactions = [
      { id: 1, title: 'Weekly Groceries', category: 'Food', amount: 85, tags: ['essentials'] },
      { id: 2, title: 'Movie Night', category: 'Entertainment', amount: 30, tags: ['leisure'] },
      { id: 3, title: 'Expensive Dinner', category: 'Food', amount: 220, tags: ['dining'] },
    ];

    // Search for food with amount < 100
    const results = filterTransactionsByQuery(transactions, 'food <100');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);

    // Search by hashtag
    const tagResults = filterTransactionsByQuery(transactions, '#leisure');
    expect(tagResults.length).toBe(1);
    expect(tagResults[0].id).toBe(2);
  });

  it('ranks exact matches higher than partial matches', () => {
    const transactions = [
      { id: 1, title: 'Coffee and snacks', category: 'Food', amount: 8 },
      { id: 2, title: 'Coffee', category: 'Food', amount: 4 },
    ];

    const results = filterTransactionsByQuery(transactions, 'coffee');
    expect(results.length).toBe(2);
    expect(results[0].id).toBe(2); // exact title match gets higher score
  });
});
