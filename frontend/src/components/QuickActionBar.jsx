import React, { useState } from 'react';
import { Plus, X, ArrowUpRight, ArrowDownLeft, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActionBar = ({ onOpenTransactionModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating expanded menu */}
      {isOpen && (
        <div className="mb-3 flex flex-col items-end space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenTransactionModal && onOpenTransactionModal('expense');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 font-medium text-xs shadow-lg border border-red-100 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-slate-700/80 transition-colors"
          >
            <span>Log Expense</span>
            <div className="w-6 h-6 rounded-lg bg-red-100 dark:bg-red-950/60 flex items-center justify-center">
              <ArrowDownLeft size={14} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenTransactionModal && onOpenTransactionModal('income');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-medium text-xs shadow-lg border border-emerald-100 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700/80 transition-colors"
          >
            <span>Add Income</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
              <ArrowUpRight size={14} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              navigate('/budgets');
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-medium text-xs shadow-lg border border-indigo-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700/80 transition-colors"
          >
            <span>Plan Budget</span>
            <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center">
              <Target size={14} />
            </div>
          </button>
        </div>
      )}

      {/* Main trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick Actions"
        className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-200 ${
          isOpen
            ? 'bg-gray-800 dark:bg-slate-700 text-white rotate-45'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95'
        }`}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default QuickActionBar;
