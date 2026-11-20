import React from 'react';
import { PieChart, ShieldCheck, AlertCircle, AlertOctagon } from 'lucide-react';
import { calculateBudgetUtilization } from '../utils/budgetAnalyzer';

const BudgetUtilizationCard = ({ budgets = [] }) => {
  const data = calculateBudgetUtilization(budgets);

  if (!budgets.length) return null;

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <PieChart size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Monthly Budget Health & Envelope Utilization
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.exceededCount > 0 ? (
                <span className="text-red-500 font-semibold">{data.exceededCount} category envelope(s) exceeded</span>
              ) : data.warningCount > 0 ? (
                <span className="text-amber-500 font-semibold">{data.warningCount} category envelope(s) near limit</span>
              ) : (
                'All spending envelopes are well within targets'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-750 border border-gray-100 dark:border-gray-700 text-right">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Total Spent</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ${data.totalSpent.toFixed(2)} / ${data.totalBudgeted.toFixed(2)}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-right">
            <span className="text-[10px] text-indigo-400 uppercase tracking-wider block">Remaining Buffer</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
              ${data.totalRemaining.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Utilization Overall Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span className="text-gray-600 dark:text-gray-300">Envelope Capacity</span>
          <span className={data.overallUtilization > 100 ? 'text-red-500' : 'text-indigo-600 dark:text-indigo-400'}>
            {data.overallUtilization}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              data.overallUtilization > 100
                ? 'bg-red-500'
                : data.overallUtilization > 80
                ? 'bg-amber-500'
                : 'bg-indigo-600'
            }`}
            style={{ width: `${Math.min(data.overallUtilization, 100)}%` }}
          />
        </div>
      </div>

      {/* Breakdown Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-lg">
          <ShieldCheck size={14} /> {data.healthyCount} on track
        </div>
        {data.warningCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-lg">
            <AlertCircle size={14} /> {data.warningCount} near threshold
          </div>
        )}
        {data.exceededCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg font-medium">
            <AlertOctagon size={14} /> {data.exceededCount} over budget
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetUtilizationCard;
