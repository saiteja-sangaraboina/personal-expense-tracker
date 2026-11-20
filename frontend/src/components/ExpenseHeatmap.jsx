import { useMemo } from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const ExpenseHeatmap = ({ transactions = [] }) => {
  const days = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 29);
    const dateRange = eachDayOfInterval({ start: thirtyDaysAgo, end: today });

    // Group expenses by date string (yyyy-MM-dd)
    const expensesMap = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const dStr = format(new Date(t.date), 'yyyy-MM-dd');
        expensesMap[dStr] = (expensesMap[dStr] || 0) + Number(t.amount);
      });

    return dateRange.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const amount = expensesMap[dateStr] || 0;
      return {
        date,
        dateStr,
        amount,
        formatted: format(date, 'MMM d'),
      };
    });
  }, [transactions]);

  const maxExpense = Math.max(...days.map((d) => d.amount), 1);

  const getIntensityClass = (amount) => {
    if (amount === 0) return 'bg-gray-100 dark:bg-gray-800 text-transparent';
    const ratio = amount / maxExpense;
    if (ratio < 0.25) return 'bg-indigo-200 dark:bg-indigo-950 text-indigo-900';
    if (ratio < 0.5) return 'bg-indigo-400 dark:bg-indigo-800 text-white';
    if (ratio < 0.75) return 'bg-indigo-600 dark:bg-indigo-600 text-white';
    return 'bg-indigo-800 dark:bg-indigo-500 text-white font-bold';
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Daily Spending Heatmap (Last 30 Days)
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-gray-800" />
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-200 dark:bg-indigo-950" />
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-400 dark:bg-indigo-800" />
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 dark:bg-indigo-600" />
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-800 dark:bg-indigo-500" />
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5">
        {days.map((day) => (
          <div
            key={day.dateStr}
            title={`${day.formatted}: $${day.amount.toFixed(2)}`}
            className={`h-9 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110 ${getIntensityClass(
              day.amount
            )}`}
          >
            <span className="text-[10px] opacity-80">{format(day.date, 'd')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseHeatmap;
