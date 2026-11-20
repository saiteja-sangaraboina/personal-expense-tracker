/**
 * incomeAnalytics.js - Multi-stream income diversification and concentration risk analysis
 */

export const analyzeIncomeStreams = (transactions = []) => {
  const incomeTxs = (transactions || []).filter(
    (t) => t && t.type === 'income' && Number(t.amount) > 0
  );

  if (incomeTxs.length === 0) {
    return {
      totalIncome: 0,
      streamCount: 0,
      diversificationScore: 0,
      concentrationRisk: 'No Income Data',
      streams: [],
    };
  }

  const categoryMap = {};
  let totalIncome = 0;

  incomeTxs.forEach((t) => {
    const cat = t.category || 'Other';
    const amt = Number(t.amount);
    totalIncome += amt;
    categoryMap[cat] = (categoryMap[cat] || 0) + amt;
  });

  const streams = Object.entries(categoryMap)
    .map(([category, amount]) => {
      const percentage = totalIncome > 0 ? Math.round((amount / totalIncome) * 100) : 0;
      return {
        category,
        amount: Math.round(amount * 100) / 100,
        percentage,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  // Concentration risk assessment based on top stream percentage
  const topShare = streams[0]?.percentage || 0;
  let concentrationRisk = 'Well Diversified';
  let diversificationScore = 85;

  if (topShare >= 85) {
    concentrationRisk = 'High Concentration';
    diversificationScore = 30;
  } else if (topShare >= 65) {
    concentrationRisk = 'Moderate Concentration';
    diversificationScore = 60;
  } else if (streams.length >= 3) {
    diversificationScore = 95;
  }

  return {
    totalIncome: Math.round(totalIncome * 100) / 100,
    streamCount: streams.length,
    diversificationScore,
    concentrationRisk,
    topStream: streams[0] || null,
    streams,
  };
};
