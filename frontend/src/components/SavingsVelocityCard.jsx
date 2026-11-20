import React from 'react';
import { Zap, Award, Target, CheckCircle2 } from 'lucide-react';
import { calculateSavingsVelocity } from '../utils/savingsVelocity';

const SavingsVelocityCard = ({
  monthlyIncome = 0,
  monthlyExpenses = 0,
  currentSavings = 0,
}) => {
  const data = calculateSavingsVelocity({
    monthlyIncome,
    monthlyExpenses,
    currentSavings,
  });

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Savings Velocity & Milestones
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Net savings pace: ${data.netSavingsPerMonth.toLocaleString()}/mo · Efficiency Grade: {data.grade}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-bold rounded-lg border border-indigo-100 dark:border-indigo-800">
            {data.savingsRate}% Savings Rate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.milestones.map((m) => (
          <div
            key={m.label}
            className={`p-3.5 rounded-xl border transition-all ${
              m.isAchieved
                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                : 'bg-gray-50 dark:bg-gray-750 border-gray-100 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{m.label}</span>
              {m.isAchieved ? (
                <CheckCircle2 size={15} className="text-emerald-600" />
              ) : (
                <Target size={15} className="text-gray-400" />
              )}
            </div>
            <div className="text-base font-bold text-gray-900 dark:text-white mb-1">
              ${m.targetAmount.toLocaleString()}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">
              {m.isAchieved
                ? 'Goal Achieved!'
                : m.monthsToTarget === Infinity
                ? 'Increase savings pace'
                : `~${m.monthsToTarget} month(s) away`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsVelocityCard;
