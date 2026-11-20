import React from 'react';
import { Sparkles, Calendar, TrendingUp, Trophy, X, Compass } from 'lucide-react';
import { generateYearInReview } from '../utils/yearInReview';

const YearInReviewModal = ({ isOpen, onClose, transactions = [], year = new Date().getFullYear() }) => {
  if (!isOpen) return null;

  const data = generateYearInReview(transactions, year);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 text-white rounded-3xl w-full max-w-lg p-7 shadow-2xl border border-indigo-500/30 overflow-hidden">
        {/* Glow decorations */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <Sparkles size={20} className="text-amber-400" />
              <span>{year} Financial Wrapped</span>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black tracking-tight">Your Year in Review</h2>
            <p className="text-xs text-indigo-200/80 mt-1">
              Highlights and financial milestones achieved throughout {year}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 uppercase font-semibold tracking-wider block mb-1">
                Total Outflow
              </span>
              <span className="text-2xl font-extrabold text-white">
                ${data.totalSpent.toLocaleString()}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 uppercase font-semibold tracking-wider block mb-1">
                Net Saved
              </span>
              <span className="text-2xl font-extrabold text-emerald-400">
                ${data.netSavings.toLocaleString()}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 uppercase font-semibold tracking-wider block mb-1">
                Top Category
              </span>
              <span className="text-lg font-bold text-amber-300 truncate block">
                {data.topCategory.name}
              </span>
              <span className="text-xs text-indigo-200/80">${data.topCategory.amount.toLocaleString()}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="text-[11px] text-indigo-200 uppercase font-semibold tracking-wider block mb-1">
                Savings Rate
              </span>
              <span className="text-2xl font-extrabold text-indigo-300">
                {data.savingsRate}%
              </span>
            </div>
          </div>

          {data.biggestExpense.amount > 0 && (
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-indigo-200/70 block">Biggest Single Purchase</span>
                <span className="text-sm font-bold text-white">{data.biggestExpense.description}</span>
              </div>
              <span className="text-base font-extrabold text-rose-300">
                ${data.biggestExpense.amount.toLocaleString()}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white text-indigo-950 font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Done Celebrating
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearInReviewModal;
