import { describe, it, expect } from 'vitest';
import { generateYearInReview } from '../yearInReview';

describe('yearInReview retrospective utility', () => {
  const sampleData = [
    { date: '2024-03-10', type: 'expense', category: 'Travel', amount: 800, description: 'Weekend trip' },
    { date: '2024-05-15', type: 'expense', category: 'Food', amount: 150, description: 'Dinner' },
    { date: '2024-05-15', type: 'expense', category: 'Travel', amount: 400, description: 'Train tickets' },
    { date: '2024-01-01', type: 'income', category: 'Salary', amount: 5000, description: 'Paycheck' },
    { date: '2023-11-20', type: 'expense', category: 'Food', amount: 999, description: 'Last year' },
  ];

  it('filters data strictly for target year and finds top category', () => {
    const recap = generateYearInReview(sampleData, 2024);
    expect(recap.year).toBe(2024);
    expect(recap.totalSpent).toBe(1350); // 800 + 150 + 400
    expect(recap.totalEarned).toBe(5000);
    expect(recap.netSavings).toBe(3650);
    expect(recap.topCategory.name).toBe('Travel');
    expect(recap.topCategory.amount).toBe(1200);
  });

  it('identifies biggest single purchase and active tracking days', () => {
    const recap = generateYearInReview(sampleData, 2024);
    expect(recap.biggestExpense.amount).toBe(800);
    expect(recap.biggestExpense.description).toBe('Weekend trip');
    expect(recap.activeDaysCount).toBe(3); // 2024-03-10, 2024-05-15, 2024-01-01
  });
});
