/**
 * notificationRules.js - Evaluates user notification preferences and threshold alerts
 */

export const shouldTriggerBudgetAlert = (spent, monthlyLimit, thresholdPercent = 80) => {
  const s = Number(spent) || 0;
  const l = Number(monthlyLimit) || 0;
  if (l <= 0) return false;
  const ratio = (s / l) * 100;
  return ratio >= thresholdPercent;
};

export const filterAlertsByPreferences = (alerts = [], preferences = { email: true, inApp: true }) => {
  if (!Array.isArray(alerts)) return [];
  return alerts.filter((alert) => {
    if (alert.channel === 'email' && !preferences.email) return false;
    if (alert.channel === 'inApp' && !preferences.inApp) return false;
    return true;
  });
};
