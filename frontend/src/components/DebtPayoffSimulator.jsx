import React, { useState } from 'react';
import { Zap, Calendar, TrendingDown, DollarSign } from 'lucide-react';
import { simulateDebtPayoff } from '../utils/debtPayoff';

const DebtPayoffSimulator = () => {
  const [strategy, setStrategy] = useState('avalanche');
  const [extraPayment, setExtraPayment] = useState(150);

  const initialDebts = [
    { name: 'Credit Card', balance: 2800, interestRate: 19.5, minPayment: 90 },
    { name: 'Personal Loan', balance: 5400, interestRate: 9.8, minPayment: 140 },
  ];

  const result = simulateDebtPayoff(initialDebts, Number(extraPayment) || 0, strategy);

  return (
    <div className="card bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap size={20} className="text-amber-500" />
            Debt Freedom Simulator
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Compare Avalanche vs Snowball debt elimination strategies.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setStrategy('avalanche')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              strategy === 'avalanche'
                ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Avalanche (Fastest)
          </button>
          <button
            type="button"
            onClick={() => setStrategy('snowball')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              strategy === 'snowball'
                ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Snowball (Motivation)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-xs text-indigo-600 dark:text-indigo-300 font-medium block">Time to Debt-Free</span>
          <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
            {result.monthsToDebtFree} Months
          </span>
        </div>

        <div className="p-4 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/40">
          <span className="text-xs text-amber-700 dark:text-amber-400 font-medium block">Total Interest Paid</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
            ${result.totalInterestPaid.toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium block">Principal Repaid</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ${result.totalPrincipalPaid.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Extra Monthly Contribution ($):
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="1000"
            step="25"
            value={extraPayment}
            onChange={(e) => setExtraPayment(Number(e.target.value))}
            className="w-40 accent-indigo-600"
          />
          <span className="text-sm font-bold text-gray-900 dark:text-white w-16 text-right">
            ${extraPayment}/mo
          </span>
        </div>
      </div>
    </div>
  );
};

export default DebtPayoffSimulator;
