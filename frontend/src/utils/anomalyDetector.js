/**
 * anomalyDetector.js - Unusually large transactions and category spike detection
 */

export const detectTransactionAnomalies = (transactions = [], multiplier = 2.5) => {
  const expenseTxs = (transactions || []).filter(
    (t) => t && t.type === 'expense' && Number(t.amount) > 0
  );

  if (expenseTxs.length < 3) {
    return {
      anomalies: [],
      totalAnomalousSpend: 0,
      alertLevel: 'none',
      message: 'Insufficient transaction history for anomaly analysis',
    };
  }

  // Calculate overall average expense
  const totalSpend = expenseTxs.reduce((sum, t) => sum + Number(t.amount), 0);
  const averageSpend = totalSpend / expenseTxs.length;

  // Category averages
  const categoryTotals = {};
  const categoryCounts = {};

  expenseTxs.forEach((t) => {
    const cat = t.category || 'Other';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount);
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoryAverages = {};
  Object.keys(categoryTotals).forEach((cat) => {
    categoryAverages[cat] = categoryTotals[cat] / categoryCounts[cat];
  });

  const anomalies = [];
  let totalAnomalousSpend = 0;

  expenseTxs.forEach((t) => {
    const amount = Number(t.amount);
    const cat = t.category || 'Other';
    const catAvg = categoryAverages[cat] || averageSpend;

    const threshold = catAvg * multiplier;
    if (amount >= threshold && amount >= 50) {
      const timesAboveAverage = Math.round((amount / catAvg) * 10) / 10;
      anomalies.push({
        _id: t._id || t.id,
        title: t.title || t.description || 'Unnamed Expense',
        category: cat,
        amount,
        date: t.date,
        timesAboveAverage,
        severity: timesAboveAverage >= 3 ? 'high' : 'medium',
      });
      totalAnomalousSpend += amount;
    }
  });

  // Sort descending by amount
  anomalies.sort((a, b) => b.amount - a.amount);

  let alertLevel = 'none';
  if (anomalies.some((a) => a.severity === 'high')) {
    alertLevel = 'high';
  } else if (anomalies.length > 0) {
    alertLevel = 'medium';
  }

  return {
    anomalies,
    totalAnomalousSpend: Math.round(totalAnomalousSpend * 100) / 100,
    averageSpend: Math.round(averageSpend * 100) / 100,
    alertLevel,
  };
};
