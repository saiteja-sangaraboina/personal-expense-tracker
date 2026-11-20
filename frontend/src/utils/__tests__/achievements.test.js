import { describe, it, expect } from 'vitest';
import { calculateUserAchievements } from '../achievements';

describe('User Achievements Engine', () => {
  it('locks all advanced achievements for brand new empty accounts', () => {
    const result = calculateUserAchievements({ transactionCount: 0, totalSaved: 0 });
    expect(result.unlockedCount).toBe(0);
    expect(result.achievements[0].isUnlocked).toBe(false);
  });

  it('unlocks First Step and Budget Master upon reaching milestones', () => {
    const result = calculateUserAchievements({
      transactionCount: 5,
      budgetCount: 2,
      goalCount: 1,
      totalSaved: 6000,
    });
    expect(result.unlockedCount).toBe(4); // First step, budget, goal, wealth builder
    expect(result.achievements.find((a) => a.id === 'wealth_builder').isUnlocked).toBe(true);
    expect(result.achievements.find((a) => a.id === 'century_club').isUnlocked).toBe(false);
  });
});
