import { ShieldCheck, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { calculateFinancialHealthScore } from '../utils/healthScore';

const FinancialHealthScoreCard = ({ summary, budgets = [] }) => {
  const health = calculateFinancialHealthScore({
    totalIncome: summary?.totalIncome || 0,
    totalExpenses: summary?.totalExpenses || 0,
    budgets,
    emergencyFundAmount: summary?.balance > 0 ? summary.balance * 0.4 : 0,
  });

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/60 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Financial Health Score
          </h3>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${health.color}20`, color: health.color }}
        >
          {health.tier}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 text-center">
          <div className="text-4xl font-extrabold tracking-tight" style={{ color: health.color }}>
            {health.score}
            <span className="text-xs text-gray-400 font-normal">/100</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Health Index</span>
        </div>

        {/* Sub-Metrics */}
        <div className="sm:col-span-2 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <TrendingUp size={13} className="text-emerald-500" /> Savings Rate
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              {health.metrics.savingsRate}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(health.metrics.savingsRate * 4, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <CheckCircle2 size={13} className="text-indigo-500" /> Budget Discipline
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              {health.metrics.budgetAdherence}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all"
              style={{ width: `${health.metrics.budgetAdherence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-xl border border-indigo-100/60 dark:border-indigo-900/40 text-xs">
        <p className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
          <AlertCircle size={13} /> Recommendation:
        </p>
        <p className="text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
          {health.recommendations[0]}
        </p>
      </div>
    </div>
  );
};

export default FinancialHealthScoreCard;
