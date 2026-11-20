import React from 'react';
import { Flame, TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';
import { calculateSpendingVelocity } from '../utils/spendingComparison';

const SpendingVelocityCard = ({
  currentMonthSpent = 0,
  previousMonthSpent = 0,
}) => {
  const velocity = calculateSpendingVelocity({
    totalSpent: currentMonthSpent,
    previousMonthSpent,
  });

  const isIncreasing = velocity.trend === 'increasing';
  const isDecreasing = velocity.trend === 'decreasing';

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300 rounded-xl">
            <Flame size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Spending Velocity & Burn Rate
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Day {velocity.currentDay} of {velocity.totalDaysInMonth} · Pace analysis vs last month
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${
              isIncreasing
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                : isDecreasing
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {isIncreasing ? (
              <TrendingUp size={13} />
            ) : isDecreasing ? (
              <TrendingDown size={13} />
            ) : (
              <Minus size={13} />
            )}
            {velocity.momChangePercent > 0 ? `+${velocity.momChangePercent}%` : `${velocity.momChangePercent}%`} pace
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Daily Burn Rate</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ${velocity.dailyBurnRate.toFixed(2)}/day
          </span>
        </div>

        <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
          <span className="text-[10px] text-indigo-400 uppercase tracking-wider block">Projected Month-End</span>
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-300">
            ${velocity.projectedMonthEnd.toLocaleString()}
          </span>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Days Remaining</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {velocity.daysRemaining} days (${velocity.projectedRemainingSpend.toLocaleString()} est.)
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpendingVelocityCard;
