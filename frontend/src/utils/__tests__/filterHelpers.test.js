import { describe, it, expect } from 'vitest';
import { filterTransactions, sortTransactions, paginateItems } from '../filterHelpers';

describe('Filter and Sort Helpers', () => {
  const sampleTransactions = [
    { _id: '1', type: 'income', amount: 5000, category: 'Salary', description: 'Tech company paycheck', date: '2026-11-01' },
    { _id: '2', type: 'expense', amount: 150, category: 'Food', description: 'Weekly groceries', date: '2026-11-05' },
    { _id: '3', type: 'expense', amount: 45, category: 'Transportation', description: 'Subway pass', date: '2026-11-10' },
    { _id: '4', type: 'expense', amount: 80, category: 'Food', description: 'Dinner dining out', date: '2026-11-15' },
  ];

  it('filters by transaction type (income vs expense)', () => {
    const expenses = filterTransactions(sampleTransactions, { type: 'expense' });
    expect(expenses).toHaveLength(3);
    const income = filterTransactions(sampleTransactions, { type: 'income' });
    expect(income).toHaveLength(1);
  });

  it('filters by category', () => {
    const foodItems = filterTransactions(sampleTransactions, { category: 'Food' });
    expect(foodItems).toHaveLength(2);
  });

  it('filters by search term in description or category', () => {
    const searchResult = filterTransactions(sampleTransactions, { search: 'subway' });
    expect(searchResult).toHaveLength(1);
    expect(searchResult[0]._id).toBe('3');
  });

  it('sorts by amount ascending and descending', () => {
    const asc = sortTransactions(sampleTransactions, 'amount', 'asc');
    expect(asc[0].amount).toBe(45);

    const desc = sortTransactions(sampleTransactions, 'amount', 'desc');
    expect(desc[0].amount).toBe(5000);
  });

  it('paginates items correctly', () => {
    const page1 = paginateItems(sampleTransactions, 1, 2);
    expect(page1).toHaveLength(2);
    expect(page1[0]._id).toBe('1');

    const page2 = paginateItems(sampleTransactions, 2, 2);
    expect(page2).toHaveLength(2);
    expect(page2[0]._id).toBe('3');
  });
});
