import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, X, Activity } from 'lucide-react';
import { getCurrencyTrendData } from '../utils/currencyTrends';

const CurrencyTrendsModal = ({ isOpen, onClose, from = 'USD', to = 'EUR' }) => {
  if (!isOpen) return null;

  const data = getCurrencyTrendData(from, to, 7);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Activity size={20} />
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              {from} to {to} 7-Day Exchange Trend
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-750">
            <span className="text-[10px] text-gray-400 block uppercase">Min Rate</span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{data.minRate}</span>
          </div>
          <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-750">
            <span className="text-[10px] text-gray-400 block uppercase">Average</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{data.avgRate}</span>
          </div>
          <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-750">
            <span className="text-[10px] text-gray-400 block uppercase">Max Rate</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{data.maxRate}</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48 w-full mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trendData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [v, 'Rate']} />
              <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[11px] text-gray-400 text-center">
          Estimated 7-day spread volatility: {data.volatilityPercentage}%
        </p>
      </div>
    </div>
  );
};

export default CurrencyTrendsModal;
