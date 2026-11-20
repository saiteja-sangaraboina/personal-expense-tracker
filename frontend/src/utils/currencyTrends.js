/**
 * currencyTrends.js - Historical rate trends, volatility estimation, and foreign exchange range analysis
 */
import { convertCurrency } from './currencyRates';

export const getCurrencyTrendData = (from = 'USD', to = 'EUR', days = 7) => {
  const currentRate = convertCurrency(1, from, to);
  const data = [];
  const count = Math.max(3, Math.min(30, Number(days) || 7));

  // Volatility factors (simulated +/- variations centered on currentRate)
  const multipliers = [0.992, 0.995, 0.998, 1.002, 0.997, 1.004, 1.000];

  let minRate = Infinity;
  let maxRate = -Infinity;
  let sumRate = 0;

  for (let i = count - 1; i >= 0; i--) {
    const multIndex = i % multipliers.length;
    const rate = Math.round(currentRate * multipliers[multIndex] * 10000) / 10000;
    const dayLabel = i === 0 ? 'Today' : `${i}d ago`;

    if (rate < minRate) minRate = rate;
    if (rate > maxRate) maxRate = rate;
    sumRate += rate;

    data.push({
      day: dayLabel,
      rate,
    });
  }

  const avgRate = Math.round((sumRate / count) * 10000) / 10000;
  const spread = Math.round((maxRate - minRate) * 10000) / 10000;
  const volatilityPercentage = avgRate > 0 ? Math.round((spread / avgRate) * 10000) / 100 : 0;

  return {
    from,
    to,
    currentRate,
    minRate,
    maxRate,
    avgRate,
    volatilityPercentage,
    trendData: data,
  };
};
