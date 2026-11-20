import React, { useState } from 'react';
import { FastForward, DollarSign, CalendarCheck } from 'lucide-react';
import { calculateLoanPayoff } from '../utils/loanPayoffComparison';

const LoanPayoffCard = () => {
  const [principal, setPrincipal] = useState('18000');
  const [rate, setRate] = useState('6.5');
  const [monthlyPayment, setMonthlyPayment] = useState('350');
  const [extraPayment, setExtraPayment] = useState('100');

  const payoff = calculateLoanPayoff({
    principal: Number(principal) || 0,
    annualInterestRate: Number(rate) || 0,
    monthlyPayment: Number(monthlyPayment) || 0,
    extraPayment: Number(extraPayment) || 0,
  });

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <FastForward size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Loan Payoff Accelerator & Early Elimination
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Calculate interest savings by applying extra principal payments each month
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="text-[11px] font-semibold text-gray-500 block mb-1">Principal ($)</label>
          <input
            type="number"
            className="input-field py-1 text-xs"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-gray-500 block mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            className="input-field py-1 text-xs"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-gray-500 block mb-1">Base Payment ($)</label>
          <input
            type="number"
            className="input-field py-1 text-xs"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-indigo-600 block mb-1">Extra Monthly ($)</label>
          <input
            type="number"
            className="input-field py-1 text-xs border-indigo-300"
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Timeline Shaved</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            {payoff.monthsSaved} Months Faster
          </span>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-800/40">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
            Total Interest Saved
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            ${payoff.interestSaved.toLocaleString()}
          </span>
        </div>

        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            New Debt-Free In
          </span>
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-300">
            {payoff.acceleratedMonths} Months
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanPayoffCard;
