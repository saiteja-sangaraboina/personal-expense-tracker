import React, { useState } from 'react';
import { DollarSign, Shield, ReceiptText } from 'lucide-react';
import { estimatePaycheckWithholding } from '../utils/taxWithholdingCalculator';

const TaxWithholdingCard = () => {
  const [annualGross, setAnnualGross] = useState('75000');
  const [payFrequency, setPayFrequency] = useState('biweekly');

  const estimate = estimatePaycheckWithholding({
    annualGross: Number(annualGross) || 0,
    payFrequency,
  });

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-xl">
            <ReceiptText size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Paycheck & Tax Withholding Estimator
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Project net take-home salary after FICA, federal, and state withholdings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value)}
            className="input-field py-1 text-xs"
          >
            <option value="weekly">Weekly (52x)</option>
            <option value="biweekly">Bi-weekly (26x)</option>
            <option value="monthly">Monthly (12x)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Gross Paycheck</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ${estimate.grossPerPaycheck.toLocaleString()}
          </span>
        </div>

        <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-800/40">
          <span className="text-[10px] text-rose-500 uppercase tracking-wider block">Total Deductions</span>
          <span className="text-base font-bold text-rose-600 dark:text-rose-400">
            -${estimate.totalWithholding.toLocaleString()}
          </span>
        </div>

        <div className="sm:col-span-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/40">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold tracking-wider block">
            Net Take-Home Pay
          </span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ${estimate.netTakeHome.toLocaleString()} / check
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaxWithholdingCard;
