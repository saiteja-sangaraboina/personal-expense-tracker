import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';
import { calculateCompoundInterest } from '../utils/investmentCalculator';

const InvestmentGrowthCard = () => {
  const [principal, setPrincipal] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('250');
  const [annualRate, setAnnualRate] = useState('8');
  const [years, setYears] = useState('10');

  const projection = calculateCompoundInterest({
    principal: Number(principal),
    annualRate: Number(annualRate),
    monthlyContribution: Number(monthlyContribution),
    years: Number(years),
  });

  return (
    <div className="card p-6 border border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-br from-white via-white to-indigo-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-indigo-950/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-xl">
            <TrendingUp size={22} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Compound Growth & Investment Simulator
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Project future wealth accumulation across stocks, bonds, or high-yield accounts
            </p>
          </div>
        </div>
      </div>

      {/* Control Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
            Initial Principal ($)
          </label>
          <input
            type="number"
            min="0"
            className="input-field py-1.5 px-3 text-sm"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
            Monthly Addition ($)
          </label>
          <input
            type="number"
            min="0"
            className="input-field py-1.5 px-3 text-sm"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
            Estimated Return (%/yr)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            className="input-field py-1.5 px-3 text-sm"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
            Time Horizon (Years)
          </label>
          <input
            type="number"
            min="1"
            max="40"
            className="input-field py-1.5 px-3 text-sm"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-750 border border-gray-100 dark:border-gray-700">
          <span className="text-[11px] text-gray-400 block">Total Deposited</span>
          <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
            ${projection.totalDeposited.toLocaleString()}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">Compound Growth</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            +${projection.totalGrowth.toLocaleString()}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/40">
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block">Estimated Future Value</span>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300">
            ${projection.finalBalance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress & Milestone Bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Deposits ({Math.round((projection.totalDeposited / projection.finalBalance) * 100 || 0)}%)</span>
          <span className="text-emerald-600 font-semibold">
            Interest Gains ({Math.round((projection.totalGrowth / projection.finalBalance) * 100 || 0)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-indigo-500 h-full"
            style={{ width: `${(projection.totalDeposited / projection.finalBalance) * 100}%` }}
          />
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${(projection.totalGrowth / projection.finalBalance) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentGrowthCard;
