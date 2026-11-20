import React from 'react';
import { Flame, Clock, Award, TrendingUp } from 'lucide-react';
import { calculateFireMilestones, classifyFireType } from '../utils/fireCalculator';

const FireCalculatorCard = ({
  annualExpenses = 42000,
  netWorth = 85000,
  annualSavings = 22000,
}) => {
  const fireData = calculateFireMilestones(annualExpenses, netWorth, annualSavings);
  const fireStyle = classifyFireType(annualExpenses);

  return (
    <div className="card bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border border-amber-100 dark:border-slate-700 p-6 rounded-2xl shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
          <Flame size={20} />
          <h3 className="text-gray-900 dark:text-white text-base">FIRE Financial Freedom Target</h3>
        </div>
        <span className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full font-semibold">
          {fireStyle}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="p-3.5 bg-white/80 dark:bg-slate-700/60 rounded-xl border border-amber-100 dark:border-slate-600">
          <span className="text-xs text-gray-400 block mb-1">Target Nest Egg</span>
          <span className="text-xl font-extrabold text-gray-900 dark:text-white">
            ${fireData.fireTarget.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 bg-white/80 dark:bg-slate-700/60 rounded-xl border border-amber-100 dark:border-slate-600">
          <span className="text-xs text-gray-400 block mb-1">Estimated Freedom In</span>
          <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
            {fireData.yearsToFire} Years
          </span>
        </div>

        <div className="p-3.5 bg-white/80 dark:bg-slate-700/60 rounded-xl border border-amber-100 dark:border-slate-600">
          <span className="text-xs text-gray-400 block mb-1">Current Progress</span>
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {fireData.currentProgressPct}%
          </span>
        </div>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${fireData.currentProgressPct}%` }}
        />
      </div>
    </div>
  );
};

export default FireCalculatorCard;
