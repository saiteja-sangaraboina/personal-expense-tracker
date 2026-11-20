import React from 'react';
import { Percent, CheckCircle2, AlertCircle, ShieldAlert, Award } from 'lucide-react';
import { calculateFinancialRatios } from '../utils/financialRatios';

const FinancialRatiosCard = ({
  monthlyIncome = 5000,
  monthlyExpenses = 3200,
  monthlyDebtService = 450,
  totalDebt = 12000,
  totalAssets = 48000,
  liquidCash = 14000,
}) => {
  const ratios = calculateFinancialRatios({
    monthlyIncome,
    monthlyExpenses,
    monthlyDebtService,
    totalDebt,
    totalAssets,
    liquidCash,
  });

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <Award size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Financial Health Ratios & Solvency
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Institutional ratios benchmarking savings, debt, liquidity, and solvency
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-bold rounded-lg border border-indigo-100 dark:border-indigo-800">
            Overall Rating: {ratios.grade} ({ratios.compositeScore}/100)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Savings Ratio</span>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-base font-bold text-gray-900 dark:text-white">{ratios.savingsRate}%</span>
            <span className="text-[11px] font-semibold text-emerald-600">{ratios.savingsStatus}</span>
          </div>
          <span className="text-[10px] text-gray-400 block mt-1">Target: &ge; 20%</span>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Debt-to-Income (DTI)</span>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-base font-bold text-gray-900 dark:text-white">{ratios.dti}%</span>
            <span className="text-[11px] font-semibold text-indigo-600">{ratios.dtiStatus}</span>
          </div>
          <span className="text-[10px] text-gray-400 block mt-1">Target: &le; 35%</span>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Liquidity Cushion</span>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-base font-bold text-gray-900 dark:text-white">{ratios.liquidityMonths} mos</span>
            <span className="text-[11px] font-semibold text-emerald-600">{ratios.liquidityStatus}</span>
          </div>
          <span className="text-[10px] text-gray-400 block mt-1">Target: &ge; 3.0 mos</span>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Solvency Ratio</span>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-base font-bold text-gray-900 dark:text-white">{ratios.solvencyRatio}%</span>
            <span className="text-[11px] font-semibold text-indigo-600">{ratios.solvencyStatus}</span>
          </div>
          <span className="text-[10px] text-gray-400 block mt-1">Target: &ge; 50%</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialRatiosCard;
