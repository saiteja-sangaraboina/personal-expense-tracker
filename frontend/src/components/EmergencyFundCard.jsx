import React from 'react';
import { ShieldAlert, ShieldCheck, HeartHandshake, Umbrella } from 'lucide-react';
import { calculateEmergencyFundTargets } from '../utils/emergencyFundCalculator';

const EmergencyFundCard = ({ monthlyEssential = 2200, currentSavings = 8800 }) => {
  const result = calculateEmergencyFundTargets(monthlyEssential, currentSavings);

  const healthColors = {
    critical: 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900',
    moderate: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900',
    secure: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900',
    robust: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900',
  };

  const progressPct = Math.min(100, Math.round((currentSavings / result.sixMonths) * 100));

  return (
    <div className="card bg-gradient-to-br from-teal-50/40 via-white to-emerald-50/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border border-teal-100 dark:border-slate-700 p-6 rounded-2xl shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold">
          <Umbrella size={20} />
          <h3 className="text-gray-900 dark:text-white text-base">Emergency Safety Net</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${healthColors[result.targetHealth]}`}>
          {result.targetHealth} Reserve
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="p-3.5 bg-white/80 dark:bg-slate-700/60 rounded-xl border border-teal-100/70 dark:border-slate-600">
          <span className="text-xs text-gray-400 block mb-1">Funded Runway</span>
          <span className="text-xl font-extrabold text-teal-600 dark:text-teal-400">
            {result.fundedMonths} Months
          </span>
        </div>

        <div className="p-3.5 bg-white/80 dark:bg-slate-700/60 rounded-xl border border-teal-100/70 dark:border-slate-600">
          <span className="text-xs text-gray-400 block mb-1">3-Month Target</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${result.threeMonths.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 bg-white/80 dark:bg-slate-700/60 rounded-xl border border-teal-100/70 dark:border-slate-600">
          <span className="text-xs text-gray-400 block mb-1">6-Month Ideal</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ${result.sixMonths.toLocaleString()}
          </span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
          <span>6-Month Target Funded</span>
          <span className="font-bold text-gray-800 dark:text-gray-200">{progressPct}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyFundCard;
