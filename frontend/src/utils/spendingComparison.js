/**
 * spendingComparison.js - Spending velocity, burn rate, and month-over-month trajectory
 */

export const calculateSpendingVelocity = ({
  totalSpent = 0,
  currentDay = new Date().getDate(),
  daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
  previousMonthSpent = 0,
}) => {
  const spent = Math.max(0, Number(totalSpent) || 0);
  const day = Math.max(1, Math.min(31, Number(currentDay) || 1));
  const totalDays = Math.max(day, Number(daysInMonth) || 30);
  const prevSpent = Math.max(0, Number(previousMonthSpent) || 0);

  const dailyBurnRate = Math.round((spent / day) * 100) / 100;
  const projectedMonthEnd = Math.round(dailyBurnRate * totalDays);

  let momChangePercent = 0;
  if (prevSpent > 0) {
    momChangePercent = Math.round(((projectedMonthEnd - prevSpent) / prevSpent) * 100);
  }

  let trend = 'stable';
  if (momChangePercent > 5) trend = 'increasing';
  else if (momChangePercent < -5) trend = 'decreasing';

  const daysRemaining = totalDays - day;
  const projectedRemainingSpend = Math.max(0, projectedMonthEnd - spent);

  return {
    dailyBurnRate,
    projectedMonthEnd,
    daysRemaining,
    projectedRemainingSpend,
    momChangePercent,
    trend,
    currentDay: day,
    totalDaysInMonth: totalDays,
  };
};
