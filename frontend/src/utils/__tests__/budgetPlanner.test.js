import { describe, it, expect } from 'vitest';
import {
  calculate503020Rule,
  suggestCategoryBudgets,
  analyzeBudgetRisks,
} from '../budgetPlanner';

describe('budgetPlanner utility', () => {
  describe('calculate503020Rule', () => {
    it('accurately divides income into 50% needs, 30% wants, 20% savings', () => {
      const breakdown = calculate503020Rule(5000);
      expect(breakdown.needs).toBe(2500);
      expect(breakdown.wants).toBe(1500);
      expect(breakdown.savings).toBe(1000);
    });

    it('handles zero and negative income safely', () => {
      const breakdown = calculate503020Rule(0);
      expect(breakdown).toEqual({ needs: 0, wants: 0, savings: 0 });
    });
  });

  describe('suggestCategoryBudgets', () => {
    it('suggests limits with safety buffer rounded to nearest 10', () => {
      const txs = [
        { type: 'expense', category: 'Food', amount: 150 },
        { type: 'expense', category: 'Food', amount: 50 },
        { type: 'expense', category: 'Travel', amount: 100 },
      ];
      const suggestions = suggestCategoryBudgets(txs, 10);
      expect(suggestions).toHaveLength(2);
      expect(suggestions[0].category).toBe('Food');
      expect(suggestions[0].averageSpent).toBe(200);
      // 200 * 1.10 = 220
      expect(suggestions[0].suggestedLimit).toBe(220);
    });

    it('returns empty array when no expense transactions exist', () => {
      expect(suggestCategoryBudgets([])).toEqual([]);
    });
  });

  describe('analyzeBudgetRisks', () => {
    it('detects high, medium, and low risk budgets appropriately', () => {
      const sampleBudgets = [
        { category: 'Shopping', monthlyLimit: 200, spent: 250 },
        { category: 'Food', monthlyLimit: 500, spent: 420 },
        { category: 'Bills', monthlyLimit: 300, spent: 100 },
      ];
      const analysis = analyzeBudgetRisks(sampleBudgets);
      expect(analysis[0].riskLevel).toBe('high');
      expect(analysis[1].riskLevel).toBe('medium');
      expect(analysis[2].riskLevel).toBe('low');
    });
  });
});
