import { describe, it, expect } from 'vitest';
import { getDateRangePreset } from '../dateRangePresets';

describe('dateRangePresets utility', () => {
  const ref = new Date('2026-06-15T10:00:00Z');

  it('generates correct start and end date for this_month', () => {
    const res = getDateRangePreset('this_month', ref);
    expect(res.preset).toBe('this_month');
    expect(new Date(res.startDate).getMonth()).toBe(5); // June is month index 5
    expect(new Date(res.startDate).getDate()).toBe(1);
  });

  it('generates correct boundary for year_to_date', () => {
    const res = getDateRangePreset('year_to_date', ref);
    expect(new Date(res.startDate).getMonth()).toBe(0); // January 1
    expect(new Date(res.startDate).getDate()).toBe(1);
    expect(new Date(res.startDate).getFullYear()).toBe(2026);
  });
});
