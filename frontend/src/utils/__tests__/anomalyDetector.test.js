import { describe, it, expect } from 'vitest';
import { detectTransactionAnomalies } from '../anomalyDetector';

describe('anomalyDetector utility', () => {
  it('returns empty results when fewer than 3 transactions exist', () => {
    const res = detectTransactionAnomalies([
      { type: 'expense', amount: 50, category: 'Food' },
    ]);
    expect(res.alertLevel).toBe('none');
    expect(res.anomalies.length).toBe(0);
  });

  it('detects outlier purchases exceeding category thresholds', () => {
    const mockTxs = [
      { id: '1', title: 'Coffee', type: 'expense', amount: 5, category: 'Food' },
      { id: '2', title: 'Lunch', type: 'expense', amount: 15, category: 'Food' },
      { id: '3', title: 'Groceries', type: 'expense', amount: 30, category: 'Food' },
      { id: '4', title: 'Luxury Tasting Menu', type: 'expense', amount: 350, category: 'Food' }, // outlier!
    ];

    const res = detectTransactionAnomalies(mockTxs);

    expect(res.anomalies.length).toBe(1);
    expect(res.anomalies[0].title).toBe('Luxury Tasting Menu');
    expect(res.anomalies[0].amount).toBe(350);
    expect(res.anomalies[0].severity).toBe('high');
    expect(res.alertLevel).toBe('high');
  });

  it('ignores transactions with type income', () => {
    const mockTxs = [
      { id: '1', title: 'Salary', type: 'income', amount: 5000, category: 'Salary' },
      { id: '2', title: 'Coffee', type: 'expense', amount: 5, category: 'Food' },
      { id: '3', title: 'Lunch', type: 'expense', amount: 10, category: 'Food' },
      { id: '4', title: 'Dinner', type: 'expense', amount: 20, category: 'Food' },
    ];

    const res = detectTransactionAnomalies(mockTxs);
    expect(res.anomalies.length).toBe(0);
    expect(res.alertLevel).toBe('none');
  });
});
