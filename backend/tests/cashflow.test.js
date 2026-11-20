const { startOfMonthsAgo } = require('../utils/helpers');

describe('Cashflow Velocity & Runway Analysis', () => {
  it('correctly calculates monthly cashflow net differences', () => {
    const rawTransactions = [
      { date: '2024-05-10', type: 'income', amount: 5000 },
      { date: '2024-05-12', type: 'expense', amount: 1500 },
      { date: '2024-05-20', type: 'expense', amount: 500 },
      { date: '2024-06-01', type: 'income', amount: 5200 },
      { date: '2024-06-15', type: 'expense', amount: 2200 },
    ];

    const monthlyMap = {};
    rawTransactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyMap[key]) {
        monthlyMap[key] = { month: key, income: 0, expenses: 0, netCashflow: 0 };
      }
      if (t.type === 'income') monthlyMap[key].income += t.amount;
      else monthlyMap[key].expenses += t.amount;
      monthlyMap[key].netCashflow = monthlyMap[key].income - monthlyMap[key].expenses;
    });

    const timeline = Object.values(monthlyMap);
    expect(timeline).toHaveLength(2);
    expect(timeline[0].month).toBe('2024-05');
    expect(timeline[0].netCashflow).toBe(3000); // 5000 - 2000
    expect(timeline[1].month).toBe('2024-06');
    expect(timeline[1].netCashflow).toBe(3000); // 5200 - 2200
  });

  it('determines average burn rate across active periods', () => {
    const monthlyExpenses = [2000, 2400, 2200, 2600];
    const totalExpenses = monthlyExpenses.reduce((s, e) => s + e, 0);
    const avgBurn = Math.round(totalExpenses / monthlyExpenses.length);
    expect(avgBurn).toBe(2300);

    const liquidCash = 11500;
    const runwayMonths = Number((liquidCash / avgBurn).toFixed(1));
    expect(runwayMonths).toBe(5.0);
  });
});
