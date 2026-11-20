import { describe, it, expect } from 'vitest';
import { getDaysUntil, classifyBillUrgency, analyzeUpcomingBills } from '../reminderEngine';

describe('reminderEngine utility', () => {
  const refDate = new Date('2026-06-15T12:00:00Z');

  it('correctly calculates days until a bill date', () => {
    expect(getDaysUntil('2026-06-15T00:00:00Z', refDate)).toBe(0);
    expect(getDaysUntil('2026-06-18T00:00:00Z', refDate)).toBe(3);
    expect(getDaysUntil('2026-06-12T00:00:00Z', refDate)).toBe(-3);
    expect(getDaysUntil(null, refDate)).toBe(null);
  });

  it('classifies bill urgency accurately', () => {
    expect(classifyBillUrgency('2026-06-10', refDate)).toBe('overdue');
    expect(classifyBillUrgency('2026-06-15', refDate)).toBe('due-today');
    expect(classifyBillUrgency('2026-06-17', refDate)).toBe('due-soon');
    expect(classifyBillUrgency('2026-06-20', refDate)).toBe('upcoming');
    expect(classifyBillUrgency('2026-07-01', refDate)).toBe('future');
  });

  it('aggregates bill counts and amounts correctly', () => {
    const mockBills = [
      { name: 'Netflix', amount: 15, nextDueDate: '2026-06-12', isActive: true }, // overdue
      { name: 'Gym', amount: 50, nextDueDate: '2026-06-17', isActive: true }, // in 2 days
      { name: 'Electricity', amount: 85, nextDueDate: '2026-06-25', isActive: true }, // in 10 days
      { name: 'Annual VPN', amount: 60, nextDueDate: '2026-06-16', isActive: false }, // inactive, ignored
    ];

    const result = analyzeUpcomingBills(mockBills, refDate);

    expect(result.overdueCount).toBe(1);
    expect(result.overdueTotal).toBe(15);
    expect(result.dueWithin7DaysCount).toBe(1);
    expect(result.dueWithin7DaysTotal).toBe(50);
    expect(result.dueWithin30DaysCount).toBe(2);
    expect(result.dueWithin30DaysTotal).toBe(135);
    expect(result.hasUrgentAlerts).toBe(true);
    expect(result.bills.length).toBe(3);
  });
});
