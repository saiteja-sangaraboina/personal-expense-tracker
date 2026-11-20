import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

const BudgetSuggestionCard = ({ suggestions = [], onApplySuggestion }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="card bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border border-purple-100 dark:border-slate-700 p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
          <Sparkles size={18} />
          <h3 className="text-base text-gray-900 dark:text-white">AI Budget Recommendations</h3>
        </div>
        <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-medium">
          +10% Buffer
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Based on your actual spending patterns, here are recommended monthly limits to keep your finances balanced:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {suggestions.slice(0, 6).map((item) => (
          <div
            key={item.category}
            className="flex flex-col justify-between p-3 bg-white/90 dark:bg-slate-700/60 rounded-xl border border-purple-50 dark:border-slate-600 shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.category}
                </span>
                <span className="text-xs text-gray-400">
                  {item.transactionCount} txs
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Avg spent: <span className="font-medium text-gray-700 dark:text-gray-300">${item.averageSpent}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-600/50 mt-1">
              <div>
                <span className="text-xs text-gray-400 block">Suggested</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  ${item.suggestedLimit}
                </span>
              </div>
              {onApplySuggestion && (
                <button
                  type="button"
                  onClick={() => onApplySuggestion(item)}
                  className="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 hover:text-indigo-600"
                  title="Apply this suggested limit"
                >
                  Apply <ArrowRight size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSuggestionCard;
