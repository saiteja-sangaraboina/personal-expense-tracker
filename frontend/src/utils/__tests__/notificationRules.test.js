import { describe, it, expect } from 'vitest';
import { shouldTriggerBudgetAlert, filterAlertsByPreferences } from '../notificationRules';

describe('notificationRules utility', () => {
  it('triggers budget alert when threshold percentage is reached or exceeded', () => {
    expect(shouldTriggerBudgetAlert(80, 100, 80)).toBe(true);
    expect(shouldTriggerBudgetAlert(85, 100, 80)).toBe(true);
    expect(shouldTriggerBudgetAlert(75, 100, 80)).toBe(false);
    expect(shouldTriggerBudgetAlert(100, 0, 80)).toBe(false);
  });

  it('filters notifications matching user channel preferences', () => {
    const alerts = [
      { id: 1, channel: 'email', title: 'Monthly digest' },
      { id: 2, channel: 'inApp', title: 'Budget alert' },
    ];

    // User disabled email notifications
    const filtered = filterAlertsByPreferences(alerts, { email: false, inApp: true });
    expect(filtered.length).toBe(1);
    expect(filtered[0].channel).toBe('inApp');
  });
});
