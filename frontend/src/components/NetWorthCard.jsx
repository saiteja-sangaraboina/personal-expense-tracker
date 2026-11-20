import React from 'react';
import { DollarSign, Shield, TrendingUp, AlertCircle, PieChart } from 'lucide-react';
import { calculateNetWorth, calculateRunway } from '../utils/netWorthCalculator';

const NetWorthCard = ({
  assets = [
    { name: 'Bank Accounts', category: 'Cash', value: 12500 },
    { name: 'Stock Portfolio', category: 'Investments', value: 34000 },
    { name: 'Emergency Fund', category: 'Cash', value: 8000 },
  ],
  liabilities = [
    { name: 'Credit Cards', category: 'Revolving', value: 2400 },
    { name: 'Student Loan', category: 'Installment', value: 9800 },
  ],
  monthlyBurn = 2600,
}) => {
  const result = calculateNetWorth(assets, liabilities);
  const runwayMonths = calculateRunway(
    assets.filter((a) => a.category === 'Cash').reduce((s, a) => s + a.value, 0),
    monthlyBurn
  );

  const statusColors = {
    excellent: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
    good: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800',
    caution: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
    warning: 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800',
  };

  return (
    <div className="card bg-gradient-to-br from-white via-gray-50/50 to-indigo-50/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border border-gray-100 dark:border-slate-700 p-6 rounded-2xl shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">
            Total Net Worth
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            ${result.netWorth.toLocaleString()}
          </h2>
        </div>
        <div className={`px-3 py-1.5 rounded-full border text-xs font-semibold capitalize flex items-center gap-1.5 ${statusColors[result.solvencyStatus]}`}>
          <Shield size={14} />
          {result.solvencyStatus} Solvency
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium block">Total Assets</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ${result.totalAssets.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40">
          <span className="text-xs text-rose-700 dark:text-rose-400 font-medium block">Total Liabilities</span>
          <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
            ${result.totalLiabilities.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-xs text-indigo-700 dark:text-indigo-400 font-medium block">Liquid Runway</span>
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {runwayMonths} mos
          </span>
        </div>
      </div>

      {/* Debt to Asset Progress */}
      <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
          <span>Debt-to-Asset Leverage Ratio</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">{result.debtToAssetRatio}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              result.debtToAssetRatio > 50 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(result.debtToAssetRatio, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;
