import { describe, it, expect } from 'vitest';
import { calculateCategoryDrift } from '../categoryAnalytics';

describe('categoryAnalytics utility', () => {
  it('detects category spending surges and decreases accurately', () => {
    const current = { Food: 600, Shopping: 100, Utilities: 200 };
    const previous = { Food: 400, Shopping: 250, Utilities: 200 };

    const res = calculateCategoryDrift(current, previous);

    // Food grew from 400 to 600 (+50%)
    const foodDrift = res.categories.find((c) => c.category === 'Food');
    expect(foodDrift.percentageChange).toBe(50);
    expect(foodDrift.direction).toBe('surging');
    expect(foodDrift.isSurging).toBe(true);

    // Shopping dropped from 250 to 100 (-60%)
    const shoppingDrift = res.categories.find((c) => c.category === 'Shopping');
    expect(shoppingDrift.percentageChange).toBe(-60);
    expect(shoppingDrift.direction).toBe('declining');

    // Utilities is flat
    const utilsDrift = res.categories.find((c) => c.category === 'Utilities');
    expect(utilsDrift.percentageChange).toBe(0);
    expect(utilsDrift.direction).toBe('flat');

    expect(res.surgingCount).toBe(1);
    expect(res.hasMajorSurges).toBe(true);
  });
});
