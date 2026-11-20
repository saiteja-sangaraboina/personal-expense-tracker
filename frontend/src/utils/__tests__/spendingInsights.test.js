import { describe, it, expect } from 'vitest';
import {
  sumByCategory,
  categoryChanges,
  topCategories,
  generateInsights,
} from '../spendingInsights';

describe('spendingInsights utility', () => {
  const currentMonthTransactions = [
    { type: 'expense', category: 'Food', amount: 150 },
    { type: 'expense', category: 'Food', amount: 50 },
    { type: 'expense', category: 'Shopping', amount: 300 },
    { type: 'expense', category: 'Bills', amount: 100 },
    { type: 'income', category: 'Salary', amount: 2000 },
  ];

  const previousMonthTransactions = [
    { type: 'expense', category: 'Food', amount: 100 },
    { type: 'expense', category: 'Shopping', amount: 150 },
    { type: 'expense', category: 'Bills', amount: 100 },
  ];

  it('calculates sum by category accurately', () => {
    const sums = sumByCategory(currentMonthTransactions);
    expect(sums.Food).toBe(200);
    expect(sums.Shopping).toBe(300);
    expect(sums.Bills).toBe(100);
    expect(sums.Salary).toBeUndefined();
  });

  it('determines category changes and percentages', () => {
    const changes = categoryChanges(currentMonthTransactions, previousMonthTransactions);
    expect(changes).toBeDefined();
    expect(changes.length).toBeGreaterThan(0);

    const shoppingChange = changes.find((c) => c.category === 'Shopping');
    expect(shoppingChange.change).toBe(150);
    expect(shoppingChange.pct).toBe(100);
    expect(shoppingChange.direction).toBe('up');
  });

  it('extracts top categories in descending order', () => {
    const top = topCategories(currentMonthTransactions, 2);
    expect(top).toHaveLength(2);
    expect(top[0].category).toBe('Shopping');
    expect(top[0].total).toBe(300);
    expect(top[1].category).toBe('Food');
    expect(top[1].total).toBe(200);
  });

  it('generates natural language insights array', () => {
    const insights = generateInsights(currentMonthTransactions, previousMonthTransactions);
    expect(Array.isArray(insights)).toBe(true);
    expect(insights.length).toBeGreaterThan(0);
    expect(insights.some((msg) => msg.includes('Shopping'))).toBe(true);
  });
});
