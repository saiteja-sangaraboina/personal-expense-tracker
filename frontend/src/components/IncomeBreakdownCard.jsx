import React from 'react';
import { Briefcase, ShieldAlert, CheckCircle, PieChart } from 'lucide-react';
import { analyzeIncomeStreams } from '../utils/incomeAnalytics';

const IncomeBreakdownCard = ({ transactions = [] }) => {
  const analysis = analyzeIncomeStreams(transactions);

  if (!analysis.streams.length) return null;

  const isHighRisk = analysis.concentrationRisk === 'High Concentration';
  const isModerate = analysis.concentrationRisk === 'Moderate Concentration';

  return (
    <div className="card p-5 border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-xl">
            <Briefcase size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Income Diversification & Streams
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {analysis.streamCount} active revenue source(s) · Total: ${analysis.totalIncome.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold ${
              isHighRisk
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                : isModerate
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
            }`}
          >
            {isHighRisk ? <ShieldAlert size={14} /> : <CheckCircle size={14} />}
            {analysis.concentrationRisk} ({analysis.diversificationScore}/100)
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {analysis.streams.map((stream) => (
          <div key={stream.category} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {stream.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ${stream.amount.toLocaleString()} ({stream.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stream.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeBreakdownCard;
