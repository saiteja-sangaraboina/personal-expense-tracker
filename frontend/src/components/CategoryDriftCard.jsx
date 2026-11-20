import React from 'react';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import { calculateCategoryDrift } from '../utils/categoryAnalytics';

const CategoryDriftCard = ({ currentSpend = {}, previousSpend = {} }) => {
  const drift = calculateCategoryDrift(currentSpend, previousSpend);

  if (!drift.categories.length) return null;

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <Flame size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Category Spending Velocity & Drift
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Month-over-month category budget movement and surge alerts
            </p>
          </div>
        </div>

        {drift.hasMajorSurges && (
          <span className="text-xs px-2.5 py-1 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-semibold rounded-lg border border-rose-200 dark:border-rose-800">
            {drift.surgingCount} Surging Category(s)
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {drift.categories.slice(0, 6).map((item) => {
          const isSurging = item.direction === 'surging';
          const isDeclining = item.direction === 'declining';

          return (
            <div
              key={item.category}
              className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{item.category}</span>
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-bold ${
                    isSurging
                      ? 'text-rose-600'
                      : isDeclining
                      ? 'text-emerald-600'
                      : 'text-gray-400'
                  }`}
                >
                  {isSurging ? <TrendingUp size={12} /> : isDeclining ? <TrendingDown size={12} /> : <Minus size={12} />}
                  {item.percentageChange > 0 ? `+${item.percentageChange}%` : `${item.percentageChange}%`}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Now: ${item.currentSpend.toLocaleString()}</span>
                <span>Prior: ${item.previousSpend.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDriftCard;
