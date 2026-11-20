import React, { useState } from 'react';
import { Landmark, HelpCircle, FileCheck2, Calculator } from 'lucide-react';
import { estimateFederalTax, STANDARD_DEDUCTION_2024_SINGLE } from '../utils/taxEstimator';

const TaxEstimatorCard = ({ annualIncome = 75000 }) => {
  const [gross, setGross] = useState(annualIncome);
  const result = estimateFederalTax(gross, STANDARD_DEDUCTION_2024_SINGLE);

  return (
    <div className="card bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
          <Landmark size={20} />
          <h3 className="text-gray-900 dark:text-white text-base">Annual Tax Projection</h3>
        </div>
        <span className="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full font-medium">
          IRS 2024 Brackets
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="p-3.5 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
          <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Estimated Tax</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${result.totalTax.toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
          <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Effective Rate</span>
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {result.effectiveRate}%
          </span>
        </div>

        <div className="p-3.5 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
          <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Marginal Bracket</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {result.marginalRate}%
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
        <span>Standard Deduction applied: <strong>${STANDARD_DEDUCTION_2024_SINGLE.toLocaleString()}</strong></span>
        <span>Taxable Basis: <strong>${result.taxableIncome.toLocaleString()}</strong></span>
      </div>
    </div>
  );
};

export default TaxEstimatorCard;
