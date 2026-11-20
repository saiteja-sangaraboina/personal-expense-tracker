import React from 'react';
import { Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import { generateInsights } from '../utils/spendingInsights';

const SpendingInsightsCard = ({ currentTransactions = [], previousTransactions = [] }) => {
  const insights = generateInsights(currentTransactions, previousTransactions);

  if (!insights || insights.length === 0) {
    return (
      <div className="card bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/60 p-5 rounded-2xl border border-indigo-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-semibold">
          <Lightbulb size={20} />
          <h3>Spending Insights</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add more transactions across months to generate AI-driven smart financial insights.
        </p>
      </div>
    );
  }

  return (
    <div className="card bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 p-5 rounded-2xl border border-indigo-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
          <Sparkles size={18} />
          <h3 className="text-base text-gray-900 dark:text-white">Smart Spending Insights</h3>
        </div>
        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">
          Automated
        </span>
      </div>

      <div className="space-y-2.5">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 bg-white/80 dark:bg-slate-700/50 rounded-xl border border-indigo-50 dark:border-slate-600/50 shadow-xs"
          >
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-lg shrink-0 mt-0.5">
              <TrendingUp size={14} />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingInsightsCard;
